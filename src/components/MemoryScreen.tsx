import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trophy, Volume2, VolumeX, BookOpen, Upload, BarChart3, Target, RefreshCw, Zap, FileText, Camera, Mic, MicOff, User, Settings2, MessageCircle } from "lucide-react";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { quizBySubject, quizByCourse, subjectAudioMap, getRandomQuiz, getWeakTopicQuiz, type QuizQuestion } from "@/lib/quizData";
import { playAudio, stopAudio, playSfx } from "@/lib/audioEngine";
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

type QuizMode = "current" | "studied" | "weak" | "upload";
type TabView = "quiz" | "performance" | "upload";

const MemoryScreen = ({ selectedCourse, selectedSubject, studiedSubjects }: Props) => {
  const [tabView, setTabView] = useState<TabView>("quiz");
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
  const [voiceActive, setVoiceActive] = useState(false); // is currently speaking
  const [waitingForExplanation, setWaitingForExplanation] = useState(false);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Performance data
  const [perfData, setPerfData] = useState(loadPerformance());
  const weakSubjects = useMemo(() => getWeakSubjects(3), [perfData]);

  // Upload state
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string }[]>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, quizStarted, done, quizzes.length]);

  useEffect(() => {
    return () => {
      stopAudio();
      stopVoice();
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const label = activeQuizSubject || (selectedCourse ? selectedCourse.charAt(0).toUpperCase() + selectedCourse.slice(1) : "General");

  const audioType = useMemo(() => {
    if (activeQuizSubject && subjectAudioMap[activeQuizSubject]) return subjectAudioMap[activeQuizSubject];
    return "whisper";
  }, [activeQuizSubject]);

  const toggleAudio = useCallback(() => {
    if (audioPlaying) { stopAudio(); setAudioPlaying(false); }
    else { playAudio(audioType, 30); setAudioPlaying(true); }
  }, [audioPlaying, audioType]);

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

    // Voice explanation
    if (voiceSettings.enabled) {
      setWaitingForExplanation(true);
      setVoiceActive(true);
      // Small delay so SFX plays first
      setTimeout(() => {
        explainAnswer(
          quizzes[current].q,
          quizzes[current].options[quizzes[current].answer],
          isCorrect,
          voiceSettings,
          () => {
            setVoiceActive(false);
            setTappedIdx(null);
            // Advance after explanation ends
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
      // No voice — advance after delay
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

  const handleUploadFile = (type: "pdf" | "image") => {
    const name = type === "pdf" ? `StudyNotes_${Date.now()}.pdf` : `Photo_${Date.now()}.jpg`;
    setUploadedFiles((prev) => [...prev, { name, type }]);
    toast.success(`${type === "pdf" ? "PDF" : "Image"} uploaded! AI will analyze it for quiz generation.`);
    toast.info("💡 Enable Lovable Cloud for AI-powered quiz generation from your uploads", { duration: 5000 });
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

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-display font-bold text-foreground">🧠 Smart Quiz</h1>
        <div className="flex items-center gap-2">
          {/* Voice toggle */}
          <button
            onClick={() => setShowVoicePanel(!showVoicePanel)}
            className={`glass-card px-3 py-1.5 flex items-center gap-1.5 text-xs font-display transition-colors ${
              voiceSettings.enabled ? "text-accent border-accent/30" : "text-muted-foreground"
            }`}
          >
            {voiceSettings.enabled ? <Mic size={14} /> : <MicOff size={14} />}
            Voice
          </button>
          {/* Ambient audio toggle */}
          <button
            onClick={toggleAudio}
            className={`glass-card px-3 py-1.5 flex items-center gap-1.5 text-xs font-display transition-colors ${
              audioPlaying ? "text-primary border-primary/30" : "text-muted-foreground"
            }`}
          >
            {audioPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </div>
      </div>

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
                  {/* Gender */}
                  <div>
                    <p className="text-[10px] text-muted-foreground font-display mb-2">Voice Type</p>
                    <div className="grid grid-cols-2 gap-2">
                      {(["female", "male"] as VoiceGender[]).map((g) => (
                        <button
                          key={g}
                          onClick={() => {
                            updateVoiceSetting("gender", g);
                            // Preview the voice
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

                  {/* Volume */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-muted-foreground font-display">Volume</p>
                      <span className="text-[10px] text-accent font-display font-bold">{voiceSettings.volume}%</span>
                    </div>
                    <Slider
                      value={[voiceSettings.volume]}
                      onValueChange={([v]) => updateVoiceSetting("volume", v)}
                      min={10}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Speed */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-muted-foreground font-display">Speed</p>
                      <span className="text-[10px] text-accent font-display font-bold">{voiceSettings.rate}x</span>
                    </div>
                    <Slider
                      value={[voiceSettings.rate * 100]}
                      onValueChange={([v]) => updateVoiceSetting("rate", v / 100)}
                      min={50}
                      max={150}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Test button */}
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

      {/* Speaking indicator during quiz */}
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
            <button
              onClick={skipExplanation}
              className="text-[10px] text-muted-foreground font-display underline ml-1"
            >
              Skip
            </button>
          )}
        </motion.div>
      )}

      {/* Main Tabs */}
      <div className="flex gap-1.5 mb-4">
        {([
          { id: "quiz" as TabView, label: "📝 Quiz", icon: null },
          { id: "performance" as TabView, label: "📊 Stats", icon: null },
          { id: "upload" as TabView, label: "📤 Upload", icon: null },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => { setTabView(t.id); stopVoice(); }}
            className={`flex-1 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
              tabView === t.id ? "bg-primary text-primary-foreground" : "glass-card text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ─── UPLOAD TAB ─── */}
      {tabView === "upload" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass-card p-6 text-center">
            <Upload size={40} className="mx-auto text-primary mb-3" />
            <h3 className="font-display font-bold text-foreground mb-2">Upload Study Material</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Upload PDFs or photos of your notes. AI will extract key concepts and generate quizzes.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={() => handleUploadFile("pdf")}
                className="glass-card p-4 flex flex-col items-center gap-2"
                whileTap={{ scale: 0.95 }}
              >
                <FileText size={24} className="text-secondary" />
                <span className="text-xs font-display text-foreground">Upload PDF</span>
              </motion.button>
              <motion.button
                onClick={() => handleUploadFile("image")}
                className="glass-card p-4 flex flex-col items-center gap-2"
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={24} className="text-accent" />
                <span className="text-xs font-display text-foreground">Take Photo</span>
              </motion.button>
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="glass-card p-4">
              <h4 className="font-display font-semibold text-foreground text-sm mb-3">📁 Uploaded Files</h4>
              <div className="space-y-2">
                {uploadedFiles.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-muted/50 rounded-xl p-3">
                    {f.type === "pdf" ? <FileText size={16} className="text-secondary" /> : <Camera size={16} className="text-accent" />}
                    <span className="text-xs text-foreground font-display flex-1 truncate">{f.name}</span>
                    <span className="text-[10px] text-muted-foreground">Analyzing...</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-3 text-center">
                ⚡ Enable Lovable Cloud for real AI analysis
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── PERFORMANCE TAB ─── */}
      {tabView === "performance" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Overview */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card p-3 text-center">
              <p className="text-2xl font-display font-bold text-primary">{overallAccuracy}%</p>
              <p className="text-[10px] text-muted-foreground font-display">Accuracy</p>
            </div>
            <div className="glass-card p-3 text-center">
              <p className="text-2xl font-display font-bold text-secondary">{perfData.totalQuizzesTaken}</p>
              <p className="text-[10px] text-muted-foreground font-display">Quizzes</p>
            </div>
            <div className="glass-card p-3 text-center">
              <p className="text-2xl font-display font-bold text-accent">{perfData.streak}🔥</p>
              <p className="text-[10px] text-muted-foreground font-display">Streak</p>
            </div>
          </div>

          {/* Weak Topics */}
          {weakSubjects.length > 0 && (
            <div className="glass-card p-4">
              <h4 className="font-display font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                <Target size={14} className="text-destructive" /> Weak Areas — Focus Here
              </h4>
              <div className="space-y-2">
                {weakSubjects.map((subj) => {
                  const acc = getSubjectAccuracy(subj);
                  return (
                    <div key={subj} className="flex items-center gap-3">
                      <span className="text-xs text-foreground font-display flex-1">{subj}</span>
                      <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${acc < 50 ? "bg-destructive" : "bg-yellow-500"}`}
                          style={{ width: `${acc}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">{acc}%</span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  setQuizSource("weak");
                  setTabView("quiz");
                  startQuiz("weak");
                }}
                className="w-full mt-3 py-2 rounded-xl bg-destructive/20 text-destructive text-xs font-display font-semibold"
              >
                🎯 Practice Weak Topics
              </button>
            </div>
          )}

          {/* Subject-wise breakdown */}
          <div className="glass-card p-4">
            <h4 className="font-display font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <BarChart3 size={14} className="text-primary" /> Subject Performance
            </h4>
            {Object.values(perfData.subjects).length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">Take a quiz to see your stats!</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.values(perfData.subjects)
                  .sort((a, b) => b.attempts - a.attempts)
                  .map((s) => {
                    const acc = s.totalQuestions > 0 ? Math.round((s.correctAnswers / s.totalQuestions) * 100) : 0;
                    return (
                      <div key={s.subject} className="bg-muted/30 rounded-xl p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-display text-foreground font-semibold">{s.subject}</span>
                          <span className="text-[10px] text-muted-foreground">{s.attempts} attempts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full rounded-full ${acc >= 80 ? "bg-green-500" : acc >= 50 ? "bg-yellow-500" : "bg-destructive"}`}
                              style={{ width: `${acc}%` }}
                            />
                          </div>
                          <span className="text-xs text-foreground font-bold w-10 text-right">{acc}%</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── QUIZ TAB ─── */}
      {tabView === "quiz" && (
        <>
          {/* Quiz source selector */}
          {!quizStarted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Voice info banner */}
              {voiceSettings.enabled && (
                <div className="glass-card p-3 flex items-center gap-3 border-accent/20">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Mic size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-semibold text-foreground">
                      🎙️ Voice Mode Active
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {voiceSettings.gender === "female" ? "👩‍🏫" : "👨‍🏫"} {voiceSettings.gender.charAt(0).toUpperCase() + voiceSettings.gender.slice(1)} voice will read questions & explain answers
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
                      if (s.id === "upload") { setTabView("upload"); return; }
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
                      <p className="text-xs text-muted-foreground font-display">Complete revision cards in Study tab first</p>
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
              {/* Progress bar */}
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

              {/* Score badge */}
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
                  {/* Question meta */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-muted-foreground font-display">
                      Q{current + 1}/{quizzes.length}
                    </span>
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
                        title="Re-read question"
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

                  {/* Explanation text shown while voice explains */}
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

              {/* Round review */}
              <div className="glass-card p-4 max-h-48 overflow-y-auto">
                <h4 className="text-xs font-display font-semibold text-foreground mb-2">Review:</h4>
                {roundHistory.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5 border-b border-border/20 last:border-0">
                    {r.correct ? <CheckCircle size={12} className="text-green-400 mt-0.5 shrink-0" /> : <XCircle size={12} className="text-destructive mt-0.5 shrink-0" />}
                    <span className="text-[11px] text-muted-foreground font-display">{r.question}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
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
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default MemoryScreen;
