import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trophy, Volume2, VolumeX, BookOpen, Upload, BarChart3, Target, RefreshCw, Zap, FileText, Camera, Mic, MicOff, User, Settings2, MessageCircle, Brain, Lightbulb, TrendingUp, Clock, ChevronRight, Sparkles } from "lucide-react";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { quizBySubject, quizByCourse, subjectAudioMap, getRandomQuiz, getWeakTopicQuiz, type QuizQuestion } from "@/lib/quizData";
import { revisionBySubject } from "@/lib/revisionData";
import { playAudio, stopAudio, playSfx } from "@/lib/audioEngine";
import ConversationMode from "./ConversationMode";
import RevisionView from "./RevisionView";
import StudyMaterialUpload from "./StudyMaterialUpload";
import { recordQuizResult, loadPerformance, getWeakSubjects, getOverallAccuracy, getSubjectAccuracy } from "@/lib/performanceTracker";
import {
  loadVoiceSettings,
  saveVoiceSettings,
  speak,
  stopVoice,
  readQuestion,
  explainAnswer,
  preloadVoices,
  isSpeaking,
  type VoiceGender,
} from "@/lib/voiceEngine";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Props {
  selectedCourse: string | null;
  selectedSubject: string | null;
  studiedSubjects: string[];
}

type MainTab = "revision" | "chat" | "quiz" | "upload";
type QuizMode = "current" | "studied" | "weak" | "upload";

const MemoryScreen = ({ selectedCourse, selectedSubject, studiedSubjects }: Props) => {
  const [mainTab, setMainTab] = useState<MainTab>("revision");
  const [quizSource, setQuizSource] = useState<QuizMode>("current");
  const [studiedPick, setStudiedPick] = useState<string | null>(null);
  const [quizCount, setQuizCount] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);

  const activeQuizSubject = quizSource === "studied" ? studiedPick : selectedSubject;

  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  const [roundHistory, setRoundHistory] = useState<{ correct: boolean; question: string }[]>([]);

  // Voice state
  const [voiceSettings, setVoiceSettings] = useState(loadVoiceSettings);
  const [showVoicePanel, setShowVoicePanel] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [waitingForExplanation, setWaitingForExplanation] = useState(false);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Performance data
  const [perfData, setPerfData] = useState(loadPerformance());
  const weakSubjects = useMemo(() => getWeakSubjects(3), [perfData]);

  // Revision state
  const [revisionSubject, setRevisionSubject] = useState<string | null>(null);
  const [showSmartInsights, setShowSmartInsights] = useState(true);

  // Upload state
  const [extractedText, setExtractedText] = useState("");

  // Preload speech synthesis voices
  useEffect(() => {
    preloadVoices();
  }, []);

  const updateVoiceSetting = <K extends keyof ReturnType<typeof loadVoiceSettings>>(
    key: K,
    value: ReturnType<typeof loadVoiceSettings>[K]
  ) => {
    setVoiceSettings((prev) => {
      const next = { ...prev, [key]: value };
      saveVoiceSettings(next);
      return next;
    });
  };

  const label = activeQuizSubject || (selectedCourse ? selectedCourse.charAt(0).toUpperCase() + selectedCourse.slice(1) : "General");

  const audioType = useMemo(() => {
    if (activeQuizSubject && subjectAudioMap[activeQuizSubject]) return subjectAudioMap[activeQuizSubject];
    return "whisper";
  }, [activeQuizSubject]);

  const toggleAudio = useCallback(() => {
    if (audioPlaying) { stopAudio(); setAudioPlaying(false); }
    else { playAudio(audioType, 30); setAudioPlaying(true); }
  }, [audioPlaying, audioType]);

  const startQuiz = useCallback((source: QuizMode) => {
    let questions: QuizQuestion[] = [];

    if (source === "weak" && weakSubjects.length > 0) {
      questions = getWeakTopicQuiz(weakSubjects, quizCount);
    } else if (source === "studied" && studiedPick) {
      questions = getRandomQuiz(studiedPick, quizCount);
    } else if (activeQuizSubject) {
      questions = getRandomQuiz(activeQuizSubject, quizCount);
    } else if (selectedCourse && quizByCourse[selectedCourse]) {
      const pool = [...quizByCourse[selectedCourse]].sort(() => Math.random() - 0.5);
      questions = pool.slice(0, Math.min(quizCount, pool.length));
    } else {
      questions = getRandomQuiz("Mathematics", quizCount);
    }

    if (questions.length === 0) {
      toast.error("No questions available for this topic");
      return;
    }

    setQuizzes(questions);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setRoundHistory([]);
    setQuizStarted(true);
    setWaitingForExplanation(false);
  }, [quizSource, activeQuizSubject, selectedCourse, quizCount, weakSubjects, studiedPick]);

  // Auto-read question when it changes
  useEffect(() => {
    if (quizStarted && !done && quizzes.length > 0 && voiceSettings.enabled) {
      const q = quizzes[current];
      const fullText = `Question ${current + 1}. ${q.q}`;
      setVoiceActive(true);
      readQuestion(fullText, voiceSettings, () => setVoiceActive(false));
    }
  }, [current, quizStarted, done, quizzes.length]);

  useEffect(() => {
    return () => {
      stopAudio();
      stopVoice();
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const advanceToNext = useCallback(() => {
    setWaitingForExplanation(false);
    if (current < quizzes.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setDone(true);
      if (audioPlaying) { stopAudio(); setAudioPlaying(false); }
      const finalScore = score;
      const subj = activeQuizSubject || selectedCourse || "General";
      const updated = recordQuizResult(subj, quizzes.length, finalScore);
      setPerfData(updated);
    }
  }, [current, quizzes.length, audioPlaying, score, activeQuizSubject, selectedCourse]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setTappedIdx(idx);
    setSelected(idx);
    const isCorrect = idx === quizzes[current].answer;
    playSfx(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);
    setRoundHistory((prev) => [...prev, { correct: isCorrect, question: quizzes[current].q }]);

    if (voiceSettings.enabled) {
      setWaitingForExplanation(true);
      setVoiceActive(true);
      setTimeout(() => {
        explainAnswer(
          quizzes[current].q,
          quizzes[current].options[quizzes[current].answer],
          isCorrect,
          voiceSettings,
          () => {
            setVoiceActive(false);
            setTappedIdx(null);
            advanceTimerRef.current = setTimeout(() => {
              if (current < quizzes.length - 1) {
                setCurrent((c) => c + 1);
                setSelected(null);
                setWaitingForExplanation(false);
              } else {
                setDone(true);
                setWaitingForExplanation(false);
                if (audioPlaying) { stopAudio(); setAudioPlaying(false); }
                const finalScore = isCorrect ? score + 1 : score;
                const subj = activeQuizSubject || selectedCourse || "General";
                const updated = recordQuizResult(subj, quizzes.length, finalScore);
                setPerfData(updated);
              }
            }, 600);
          }
        );
      }, 400);
    } else {
      setTimeout(() => {
        setTappedIdx(null);
        if (current < quizzes.length - 1) {
          setCurrent((c) => c + 1);
          setSelected(null);
        } else {
          setDone(true);
          if (audioPlaying) { stopAudio(); setAudioPlaying(false); }
          const finalScore = isCorrect ? score + 1 : score;
          const subj = activeQuizSubject || selectedCourse || "General";
          const updated = recordQuizResult(subj, quizzes.length, finalScore);
          setPerfData(updated);
        }
      }, 1000);
    }
  };

  const handleNextRound = () => {
    stopVoice();
    startQuiz(quizSource);
  };

  const overallAccuracy = getOverallAccuracy();

  const getTypeLabel = (type?: string) => {
    switch (type) {
      case "true-false": return "T/F";
      case "clinical": return "🏥 Clinical";
      default: return "MCQ";
    }
  };

  const getDifficultyColor = (d?: string) => {
    switch (d) {
      case "easy": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "hard": return "text-red-400";
      default: return "text-muted-foreground";
    }
  };

  const skipExplanation = () => {
    stopVoice();
    setVoiceActive(false);
    setWaitingForExplanation(false);
    setTappedIdx(null);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceToNext();
  };

  // Get available revision subjects
  const availableRevisionSubjects = useMemo(() => {
    const allSubjects = Object.keys(revisionBySubject);
    // Prioritize studied subjects, then weak, then all
    const prioritized: string[] = [];
    studiedSubjects.forEach(s => { if (allSubjects.includes(s) && !prioritized.includes(s)) prioritized.push(s); });
    weakSubjects.forEach(s => { if (allSubjects.includes(s) && !prioritized.includes(s)) prioritized.push(s); });
    allSubjects.forEach(s => { if (!prioritized.includes(s)) prioritized.push(s); });
    return prioritized;
  }, [studiedSubjects, weakSubjects]);

  // Smart recommendations
  const recommendations = useMemo(() => {
    const recs: { icon: React.ReactNode; title: string; desc: string; action: () => void; color: string }[] = [];

    if (weakSubjects.length > 0) {
      recs.push({
        icon: <Target size={16} />,
        title: `Focus on ${weakSubjects[0]}`,
        desc: `${getSubjectAccuracy(weakSubjects[0])}% accuracy — needs practice`,
        action: () => { setMainTab("quiz"); setQuizSource("weak"); },
        color: "text-destructive",
      });
    }

    if (studiedSubjects.length > 0) {
      const lastStudied = studiedSubjects[studiedSubjects.length - 1];
      if (revisionBySubject[lastStudied]) {
        recs.push({
          icon: <BookOpen size={16} />,
          title: `Revise ${lastStudied}`,
          desc: "Recently studied — revise before sleep",
          action: () => { setMainTab("revision"); setRevisionSubject(lastStudied); },
          color: "text-primary",
        });
      }
    }

    if (perfData.totalQuizzesTaken > 0) {
      recs.push({
        icon: <TrendingUp size={16} />,
        title: "Take a quiz",
        desc: `${overallAccuracy}% overall — keep improving!`,
        action: () => setMainTab("quiz"),
        color: "text-accent",
      });
    }

    if (recs.length === 0) {
      recs.push({
        icon: <Sparkles size={16} />,
        title: "Start learning",
        desc: "Begin with revision cards to build your memory",
        action: () => setMainTab("revision"),
        color: "text-primary",
      });
    }

    return recs;
  }, [weakSubjects, studiedSubjects, perfData, overallAccuracy]);

  const tabIcons = [
    { id: "revision" as MainTab, label: "📚 Revision", icon: BookOpen },
    { id: "chat" as MainTab, label: "💬 Chat", icon: MessageCircle },
    { id: "quiz" as MainTab, label: "📝 Quiz", icon: Zap },
    { id: "upload" as MainTab, label: "📤 Upload", icon: Upload },
  ];

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain size={22} className="text-accent" />
          <h1 className="text-xl font-display font-bold text-foreground">Memory</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVoicePanel(!showVoicePanel)}
            className={`glass-card px-2.5 py-1.5 flex items-center gap-1.5 text-xs font-display transition-colors ${
              voiceSettings.enabled ? "text-accent border-accent/30" : "text-muted-foreground"
            }`}
          >
            {voiceSettings.enabled ? <Mic size={14} /> : <MicOff size={14} />}
          </button>
          <button
            onClick={toggleAudio}
            className={`glass-card px-2.5 py-1.5 flex items-center gap-1.5 text-xs font-display transition-colors ${
              audioPlaying ? "text-primary border-primary/30" : "text-muted-foreground"
            }`}
          >
            {audioPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </div>
      </div>

      {/* Smart Insights Banner */}
      {showSmartInsights && mainTab === "revision" && !revisionSubject && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 space-y-2"
        >
          {/* Quick stats row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="glass-card p-2.5 text-center">
              <p className="text-lg font-display font-bold text-primary">{overallAccuracy}%</p>
              <p className="text-[9px] text-muted-foreground font-display">Accuracy</p>
            </div>
            <div className="glass-card p-2.5 text-center">
              <p className="text-lg font-display font-bold text-secondary">{perfData.totalQuizzesTaken}</p>
              <p className="text-[9px] text-muted-foreground font-display">Quizzes</p>
            </div>
            <div className="glass-card p-2.5 text-center">
              <p className="text-lg font-display font-bold text-accent">{perfData.streak}🔥</p>
              <p className="text-[9px] text-muted-foreground font-display">Streak</p>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="glass-card p-3">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={14} className="text-accent" />
              <span className="text-xs font-display font-bold text-foreground">Smart Suggestions</span>
            </div>
            <div className="space-y-1.5">
              {recommendations.map((rec, i) => (
                <motion.button
                  key={i}
                  onClick={rec.action}
                  className="w-full flex items-center gap-3 p-2 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all text-left"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 ${rec.color}`}>
                    {rec.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-display font-semibold text-foreground truncate">{rec.title}</p>
                    <p className="text-[10px] text-muted-foreground font-display truncate">{rec.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Voice Control Panel */}
      <AnimatePresence>
        {showVoicePanel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="glass-card p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-display font-bold text-foreground flex items-center gap-2">
                  <Settings2 size={14} className="text-accent" />
                  Voice Settings
                </h3>
                <Switch
                  checked={voiceSettings.enabled}
                  onCheckedChange={(v) => {
                    updateVoiceSetting("enabled", v);
                    if (!v) stopVoice();
                    toast(v ? "🎙️ Voice enabled" : "🔇 Voice disabled");
                  }}
                />
              </div>
              {voiceSettings.enabled && (
                <>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-display mb-2">Voice Type</p>
                    <div className="grid grid-cols-2 gap-2">
                      {(["female", "male"] as VoiceGender[]).map((g) => (
                        <button
                          key={g}
                          onClick={() => {
                            updateVoiceSetting("gender", g);
                            speak("Hello! I'll be your study companion.", { ...voiceSettings, gender: g });
                          }}
                          className={`py-2.5 rounded-xl text-xs font-display font-semibold transition-all flex items-center justify-center gap-2 ${
                            voiceSettings.gender === g
                              ? "bg-accent/20 text-accent border border-accent/30"
                              : "glass-card text-muted-foreground"
                          }`}
                        >
                          <User size={12} />
                          {g === "female" ? "👩‍🏫 Female" : "👨‍🏫 Male"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-muted-foreground font-display">Volume</p>
                      <span className="text-[10px] text-accent font-display font-bold">{voiceSettings.volume}%</span>
                    </div>
                    <Slider
                      value={[voiceSettings.volume]}
                      onValueChange={([v]) => updateVoiceSetting("volume", v)}
                      min={10} max={100} step={5} className="w-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-muted-foreground font-display">Speed</p>
                      <span className="text-[10px] text-accent font-display font-bold">{voiceSettings.rate}x</span>
                    </div>
                    <Slider
                      value={[voiceSettings.rate * 100]}
                      onValueChange={([v]) => updateVoiceSetting("rate", v / 100)}
                      min={50} max={150} step={5} className="w-full"
                    />
                  </div>
                  <button
                    onClick={() => speak("This is how I will read questions and explain answers during your quiz.", voiceSettings)}
                    className="w-full py-2 rounded-xl bg-accent/10 text-accent text-xs font-display font-semibold border border-accent/20"
                  >
                    🔊 Test Voice
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speaking indicator */}
      {quizStarted && !done && voiceActive && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 flex items-center justify-center gap-2"
        >
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-accent rounded-full"
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <span className="text-[10px] text-accent font-display font-semibold">
            {waitingForExplanation ? "Explaining answer..." : "Reading question..."}
          </span>
          {waitingForExplanation && (
            <button onClick={skipExplanation} className="text-[10px] text-muted-foreground font-display underline ml-1">
              Skip
            </button>
          )}
        </motion.div>
      )}

      {/* Main 4 Tab Navigation */}
      <div className="flex gap-1 mb-4">
        {tabIcons.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setMainTab(t.id);
              stopVoice();
              if (t.id !== "quiz") { setQuizStarted(false); setDone(false); }
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-display font-semibold transition-all ${
              mainTab === t.id ? "bg-primary text-primary-foreground shadow-lg" : "glass-card text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════ REVISION TAB ═══════════════════ */}
      {mainTab === "revision" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {revisionSubject ? (
            <RevisionView
              subject={revisionSubject}
              onClose={() => setRevisionSubject(null)}
              onCompleted={() => toast.success(`🎉 ${revisionSubject} revision complete! Great memory work.`)}
            />
          ) : (
            <div className="space-y-4">
              {/* Weak areas banner */}
              {weakSubjects.length > 0 && (
                <div className="glass-card p-3 border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={14} className="text-destructive" />
                    <span className="text-xs font-display font-bold text-foreground">Needs More Revision</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {weakSubjects.map((subj) => (
                      <button
                        key={subj}
                        onClick={() => revisionBySubject[subj] ? setRevisionSubject(subj) : toast.info("No revision cards available yet")}
                        className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-[11px] font-display font-semibold transition-all hover:bg-destructive/20"
                      >
                        🎯 {subj} ({getSubjectAccuracy(subj)}%)
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recently studied */}
              {studiedSubjects.length > 0 && (
                <div className="glass-card p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className="text-secondary" />
                    <span className="text-xs font-display font-bold text-foreground">Recently Studied</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {studiedSubjects.slice(-6).reverse().map((subj) => (
                      <button
                        key={subj}
                        onClick={() => revisionBySubject[subj] ? setRevisionSubject(subj) : toast.info("No revision cards for this topic")}
                        className="px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-[11px] font-display font-semibold transition-all hover:bg-secondary/20"
                      >
                        ✅ {subj}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* All subjects for revision */}
              <div>
                <h3 className="text-sm font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen size={14} className="text-primary" />
                  All Revision Topics
                </h3>
                <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                  {availableRevisionSubjects.map((subj) => {
                    const cards = revisionBySubject[subj];
                    if (!cards || cards.length === 0) return null;
                    const acc = getSubjectAccuracy(subj);
                    const isWeak = weakSubjects.includes(subj);
                    const isStudied = studiedSubjects.includes(subj);
                    return (
                      <motion.button
                        key={subj}
                        onClick={() => setRevisionSubject(subj)}
                        className={`glass-card p-3 text-left transition-all ${
                          isWeak ? "border-destructive/20" : isStudied ? "border-primary/20" : ""
                        }`}
                        whileTap={{ scale: 0.97 }}
                      >
                        <p className="text-xs font-display font-semibold text-foreground truncate">{subj}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-[10px] text-muted-foreground font-display">{cards.length} cards</span>
                          {acc > 0 && (
                            <span className={`text-[10px] font-display font-bold ${acc >= 70 ? "text-green-400" : acc >= 40 ? "text-yellow-400" : "text-destructive"}`}>
                              {acc}%
                            </span>
                          )}
                        </div>
                        {isWeak && <span className="text-[9px] text-destructive font-display">⚠ Weak</span>}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════ CHAT TAB ═══════════════════ */}
      {mainTab === "chat" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <ConversationMode
            subject={activeQuizSubject || (selectedCourse ? selectedCourse.charAt(0).toUpperCase() + selectedCourse.slice(1) : null)}
            onBack={() => setMainTab("revision")}
          />
        </motion.div>
      )}

      {/* ═══════════════════ UPLOAD TAB ═══════════════════ */}
      {mainTab === "upload" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Upload component */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Upload size={18} className="text-primary" />
              <h3 className="font-display font-bold text-foreground text-sm">Upload Study Material</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4 font-display">
              Upload PDFs or images. AI will extract text and generate summaries & quizzes from your notes.
            </p>
            <StudyMaterialUpload onTextExtracted={setExtractedText} />
          </div>

          {/* Extracted content preview */}
          {extractedText && (
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={14} className="text-accent" />
                <span className="text-xs font-display font-bold text-foreground">Extracted Content</span>
              </div>
              <div className="bg-muted/30 rounded-xl p-3 max-h-40 overflow-y-auto">
                <p className="text-[11px] text-foreground/80 font-display leading-relaxed whitespace-pre-wrap">
                  {extractedText.slice(0, 1000)}{extractedText.length > 1000 ? "..." : ""}
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    setMainTab("quiz");
                    toast.info("💡 Enable Lovable Cloud for AI-powered quiz generation from uploads", { duration: 5000 });
                  }}
                  className="flex-1 py-2 rounded-xl bg-primary/10 text-primary text-xs font-display font-semibold"
                >
                  📝 Generate Quiz
                </button>
                <button
                  onClick={() => toast.info("💡 Enable Lovable Cloud for AI-powered summaries", { duration: 5000 })}
                  className="flex-1 py-2 rounded-xl bg-accent/10 text-accent text-xs font-display font-semibold"
                >
                  📋 Summarize
                </button>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="glass-card p-3">
            <p className="text-[10px] text-muted-foreground font-display text-center">
              💡 Tip: Upload your textbook pages or handwritten notes. AI will analyze them to create personalized revision material and quizzes.
            </p>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ QUIZ TAB ═══════════════════ */}
      {mainTab === "quiz" && (
        <>
          {/* Quiz source selector */}
          {!quizStarted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Performance summary */}
              <div className="grid grid-cols-3 gap-2">
                <div className="glass-card p-2.5 text-center">
                  <p className="text-lg font-display font-bold text-primary">{overallAccuracy}%</p>
                  <p className="text-[9px] text-muted-foreground font-display">Accuracy</p>
                </div>
                <div className="glass-card p-2.5 text-center">
                  <p className="text-lg font-display font-bold text-secondary">{perfData.totalQuizzesTaken}</p>
                  <p className="text-[9px] text-muted-foreground font-display">Quizzes</p>
                </div>
                <div className="glass-card p-2.5 text-center">
                  <p className="text-lg font-display font-bold text-accent">{perfData.streak}🔥</p>
                  <p className="text-[9px] text-muted-foreground font-display">Streak</p>
                </div>
              </div>

              {/* Voice info banner */}
              {voiceSettings.enabled && (
                <div className="glass-card p-3 flex items-center gap-3 border-accent/20">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Mic size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-semibold text-foreground">🎙️ Voice Mode Active</p>
                    <p className="text-[10px] text-muted-foreground">
                      {voiceSettings.gender === "female" ? "👩‍🏫" : "👨‍🏫"} voice will read questions & explain answers
                    </p>
                  </div>
                </div>
              )}

              {/* Source buttons */}
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: "current" as QuizMode, label: "📖 Current Topic", desc: label },
                  { id: "studied" as QuizMode, label: "✅ What I Studied", desc: `${studiedSubjects.length} topics` },
                  { id: "weak" as QuizMode, label: "🎯 Weak Areas", desc: `${weakSubjects.length} topics` },
                  { id: "upload" as QuizMode, label: "📤 From Upload", desc: "AI generated" },
                ]).map((s) => (
                  <motion.button
                    key={s.id}
                    onClick={() => {
                      if (s.id === "upload") { setMainTab("upload"); return; }
                      setQuizSource(s.id);
                    }}
                    className={`glass-card p-3 text-left transition-all ${
                      quizSource === s.id ? "border-primary/40 bg-primary/10" : "border-transparent"
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    <p className="text-xs font-display font-semibold text-foreground">{s.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
                  </motion.button>
                ))}
              </div>

              {/* Studied picker */}
              {quizSource === "studied" && (
                <div className="space-y-2">
                  {studiedSubjects.length === 0 ? (
                    <div className="glass-card p-4 text-center">
                      <BookOpen size={24} className="mx-auto text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground font-display">Complete revision cards first</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {studiedSubjects.map((subj) => (
                        <button
                          key={subj}
                          onClick={() => setStudiedPick(subj)}
                          className={`px-3 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
                            studiedPick === subj ? "bg-primary text-primary-foreground" : "glass-card text-foreground"
                          }`}
                        >
                          ✅ {subj}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Weak areas detail */}
              {quizSource === "weak" && weakSubjects.length > 0 && (
                <div className="glass-card p-3">
                  <p className="text-[10px] text-muted-foreground font-display mb-2">Weak topics detected:</p>
                  {weakSubjects.map((subj) => (
                    <div key={subj} className="flex items-center gap-2 py-1">
                      <Target size={12} className="text-destructive" />
                      <span className="text-xs text-foreground font-display flex-1">{subj}</span>
                      <span className="text-[10px] text-destructive font-display font-bold">{getSubjectAccuracy(subj)}%</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Question count selector */}
              <div className="glass-card p-4">
                <p className="text-xs text-muted-foreground font-display mb-2">Number of questions:</p>
                <div className="flex gap-2">
                  {[5, 10, 15, 20].map((n) => (
                    <button
                      key={n}
                      onClick={() => setQuizCount(n)}
                      className={`flex-1 py-2 rounded-xl text-xs font-display font-bold transition-all ${
                        quizCount === n ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start button */}
              <motion.button
                onClick={() => startQuiz(quizSource)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-display font-bold text-sm glow-primary"
                whileTap={{ scale: 0.97 }}
              >
                <Zap size={16} className="inline mr-2" />
                Start Unlimited Quiz
              </motion.button>
            </motion.div>
          )}

          {/* Active Quiz */}
          {quizStarted && !done && quizzes.length > 0 && (
            <>
              <div className="flex items-center gap-1.5 mb-4">
                {quizzes.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i < current ? "bg-primary" : i === current ? "bg-primary/60" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground font-display">
                  📚 {label} {quizSource === "weak" ? "(Weak Areas)" : ""}
                </span>
                <span className="text-xs font-display font-bold text-primary">
                  {score}/{current} correct
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`q-${current}`}
                  className="glass-card p-5"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-muted-foreground font-display">Q{current + 1}/{quizzes.length}</span>
                    <span className={`text-[10px] font-display font-semibold px-1.5 py-0.5 rounded-md bg-muted/50 ${getDifficultyColor(quizzes[current].difficulty)}`}>
                      {quizzes[current].difficulty || "easy"}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-display bg-muted/50 px-1.5 py-0.5 rounded-md">
                      {getTypeLabel(quizzes[current].type)}
                    </span>
                    {voiceSettings.enabled && (
                      <button
                        onClick={() => {
                          setVoiceActive(true);
                          readQuestion(quizzes[current].q, voiceSettings, () => setVoiceActive(false));
                        }}
                        className="ml-auto text-accent"
                      >
                        <Volume2 size={14} />
                      </button>
                    )}
                  </div>

                  <h2 className="text-base font-display font-bold text-foreground mb-5 leading-snug">
                    {quizzes[current].q}
                  </h2>

                  <div className="space-y-2.5">
                    {quizzes[current].options.map((opt, i) => {
                      const isCorrect = i === quizzes[current].answer;
                      const isSelected = i === selected;
                      const isTapped = i === tappedIdx;
                      let style = "glass-card";
                      if (selected !== null) {
                        if (isCorrect) style = "bg-green-500/20 border border-green-500/40";
                        else if (isSelected) style = "bg-destructive/20 border border-destructive/40";
                      }
                      return (
                        <motion.button
                          key={i}
                          onClick={() => { playSfx("tap"); handleAnswer(i); }}
                          className={`w-full p-3 rounded-xl text-left text-sm font-display font-semibold text-foreground transition-all ${style}`}
                          animate={isTapped ? { scale: [1, 0.95, 1.02, 1] } : {}}
                          transition={{ duration: 0.3 }}
                          whileTap={{ scale: 0.96 }}
                          disabled={selected !== null}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
                              {quizzes[current].type === "true-false" ? (i === 0 ? "T" : "F") : String.fromCharCode(65 + i)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {selected !== null && isCorrect && <CheckCircle size={16} className="ml-auto text-green-400 shrink-0" />}
                            {selected !== null && isSelected && !isCorrect && <XCircle size={16} className="ml-auto text-destructive shrink-0" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {selected !== null && voiceSettings.enabled && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 rounded-xl bg-accent/10 border border-accent/20"
                    >
                      <p className="text-xs font-display text-accent font-semibold mb-1">
                        {selected === quizzes[current].answer ? "✅ Correct!" : "❌ Incorrect"}
                      </p>
                      <p className="text-xs text-foreground/80 font-display">
                        The answer is: <strong>{quizzes[current].options[quizzes[current].answer]}</strong>
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          )}

          {/* Results */}
          {quizStarted && done && (
            <motion.div
              className="space-y-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="glass-card p-6 text-center glow-moonlight">
                <Trophy size={40} className="mx-auto text-moonlight mb-3" />
                <h2 className="text-xl font-display font-bold text-foreground mb-1">
                  {score === quizzes.length ? "Perfect Score! 🌟" : score >= quizzes.length * 0.7 ? "Great Job! 💪" : "Keep Practicing! 📚"}
                </h2>
                <p className="text-3xl font-display font-bold text-primary my-3">
                  {score}/{quizzes.length}
                </p>
                <p className="text-sm text-muted-foreground font-display">
                  Accuracy: {Math.round((score / quizzes.length) * 100)}%
                </p>
              </div>

              <div className="glass-card p-4 max-h-48 overflow-y-auto">
                <h4 className="text-xs font-display font-semibold text-foreground mb-2">Review:</h4>
                {roundHistory.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5 border-b border-border/20 last:border-0">
                    {r.correct ? <CheckCircle size={12} className="text-green-400 mt-0.5 shrink-0" /> : <XCircle size={12} className="text-destructive mt-0.5 shrink-0" />}
                    <span className="text-[11px] text-muted-foreground font-display">{r.question}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={handleNextRound}
                  className="py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.96 }}
                >
                  <RefreshCw size={14} /> Next Round
                </motion.button>
                <motion.button
                  onClick={() => { setQuizStarted(false); setDone(false); stopVoice(); }}
                  className="py-3 rounded-xl glass-card text-foreground font-display font-semibold text-sm"
                  whileTap={{ scale: 0.96 }}
                >
                  ← Back to Menu
                </motion.button>
              </div>

              {/* Recommendation after quiz */}
              {score < quizzes.length * 0.7 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-3 border-accent/20"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb size={14} className="text-accent" />
                    <span className="text-xs font-display font-bold text-foreground">💡 Suggestion</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-display mt-1">
                    Try revising the flashcards for this topic before attempting another quiz. Revision + Sleep = Better Memory! 🌙
                  </p>
                  <button
                    onClick={() => {
                      const subj = activeQuizSubject || "Mathematics";
                      if (revisionBySubject[subj]) {
                        setMainTab("revision");
                        setRevisionSubject(subj);
                        setQuizStarted(false);
                        setDone(false);
                      } else {
                        setMainTab("revision");
                        setQuizStarted(false);
                        setDone(false);
                      }
                    }}
                    className="mt-2 w-full py-2 rounded-xl bg-accent/10 text-accent text-xs font-display font-semibold"
                  >
                    📚 Go to Revision
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default MemoryScreen;
