import { motion } from "framer-motion";
import { CheckCircle, XCircle, Trophy, Volume2, VolumeX, BookOpen } from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { quizBySubject, quizByCourse, subjectAudioMap } from "@/lib/quizData";
import { playAudio, stopAudio, playSfx } from "@/lib/audioEngine";

interface Props {
  selectedCourse: string | null;
  selectedSubject: string | null;
  studiedSubjects: string[];
}

const MemoryScreen = ({ selectedCourse, selectedSubject, studiedSubjects }: Props) => {
  const [quizSource, setQuizSource] = useState<"current" | "studied">("current");
  const [studiedPick, setStudiedPick] = useState<string | null>(null);

  // Determine active subject for quiz
  const activeQuizSubject = quizSource === "studied" ? studiedPick : selectedSubject;

  const quizzes = useMemo(() => {
    if (activeQuizSubject && quizBySubject[activeQuizSubject]) {
      return quizBySubject[activeQuizSubject];
    }
    if (selectedCourse && quizByCourse[selectedCourse]) {
      return quizByCourse[selectedCourse];
    }
    return quizByCourse["primary"];
  }, [activeQuizSubject, selectedCourse]);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);

  // Reset quiz when source changes
  useEffect(() => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }, [activeQuizSubject, selectedCourse]);

  useEffect(() => {
    return () => stopAudio();
  }, []);

  const label = activeQuizSubject || (selectedCourse ? selectedCourse.charAt(0).toUpperCase() + selectedCourse.slice(1) : "General");

  const audioType = useMemo(() => {
    if (activeQuizSubject && subjectAudioMap[activeQuizSubject]) {
      return subjectAudioMap[activeQuizSubject];
    }
    return "whisper";
  }, [activeQuizSubject]);

  const toggleAudio = useCallback(() => {
    if (audioPlaying) {
      stopAudio();
      setAudioPlaying(false);
    } else {
      playAudio(audioType, 30);
      setAudioPlaying(true);
    }
  }, [audioPlaying, audioType]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setTappedIdx(idx);
    setSelected(idx);
    const isCorrect = idx === quizzes[current].answer;
    playSfx(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);
    setTimeout(() => {
      setTappedIdx(null);
      if (current < quizzes.length - 1) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setDone(true);
        if (audioPlaying) { stopAudio(); setAudioPlaying(false); }
      }
    }, 1000);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-display font-bold text-foreground">🧠 Memory Test</h1>
        <button
          onClick={toggleAudio}
          className={`glass-card px-3 py-1.5 flex items-center gap-1.5 text-xs font-display transition-colors ${
            audioPlaying ? "text-primary border-primary/30" : "text-muted-foreground"
          }`}
        >
          {audioPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
          {audioPlaying ? "Playing" : "Audio"}
        </button>
      </div>

      {/* Source Tabs: Current Subject vs Studied */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setQuizSource("current"); setStudiedPick(null); }}
          className={`flex-1 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
            quizSource === "current"
              ? "bg-primary text-primary-foreground"
              : "glass-card text-muted-foreground"
          }`}
        >
          📖 Current Topic
        </button>
        <button
          onClick={() => setQuizSource("studied")}
          className={`flex-1 py-2 rounded-xl text-xs font-display font-semibold transition-all relative ${
            quizSource === "studied"
              ? "bg-primary text-primary-foreground"
              : "glass-card text-muted-foreground"
          }`}
        >
          ✅ What I Studied
          {studiedSubjects.length > 0 && quizSource !== "studied" && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
              {studiedSubjects.length}
            </span>
          )}
        </button>
      </div>

      {/* Studied subjects picker */}
      {quizSource === "studied" && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          {studiedSubjects.length === 0 ? (
            <div className="glass-card p-6 text-center">
              <BookOpen size={32} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground font-display">
                No subjects studied yet!
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-display">
                Go to Study tab → select a subject → complete the revision cards
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-display">Pick a studied topic to quiz yourself:</p>
              <div className="flex flex-wrap gap-2">
                {studiedSubjects.map((subj) => (
                  <motion.button
                    key={subj}
                    onClick={() => setStudiedPick(subj)}
                    className={`px-3 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
                      studiedPick === subj
                        ? "bg-primary text-primary-foreground"
                        : "glass-card text-foreground"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✅ {subj}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Topic label */}
      <p className="text-xs text-muted-foreground font-display mb-4">
        📚 Topic: <span className="text-primary font-semibold">{label}</span>
        {quizSource === "studied" && !studiedPick && studiedSubjects.length > 0 && " — Pick a topic above"}
      </p>

      {/* Quiz content - only show if we have a valid source */}
      {(quizSource === "current" || studiedPick) && (
        <>
          {!done ? (
            <>
              <div className="flex items-center gap-2 mb-6">
                {quizzes.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= current ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <motion.div
                key={`${activeQuizSubject}-${current}`}
                className="glass-card p-6"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <p className="text-xs text-muted-foreground mb-1 font-display">
                  Question {current + 1} of {quizzes.length}
                </p>
                <h2 className="text-lg font-display font-bold text-foreground mb-6">
                  {quizzes[current].q}
                </h2>
                <div className="space-y-3">
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
                        className={`w-full p-3.5 rounded-xl text-left text-sm font-display font-semibold text-foreground transition-all ${style}`}
                        animate={isTapped ? { scale: [1, 0.95, 1.02, 1] } : {}}
                        transition={{ duration: 0.3 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                          {selected !== null && isCorrect && <CheckCircle size={16} className="ml-auto text-green-400" />}
                          {selected !== null && isSelected && !isCorrect && <XCircle size={16} className="ml-auto text-destructive" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div
              className="glass-card p-8 text-center glow-moonlight"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Trophy size={48} className="mx-auto text-moonlight mb-4" />
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                {score === quizzes.length ? "Perfect! 🌟" : "Good Job! 💪"}
              </h2>
              <p className="text-4xl font-display font-bold text-primary my-4">
                {score}/{quizzes.length}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {score === quizzes.length
                  ? "Sleep learning is working wonders!"
                  : "Keep practicing — you're getting better!"}
              </p>
              <button
                onClick={restart}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm active:scale-95 transition-transform"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="glass-card p-3 text-center">
          <p className="text-xl font-display font-bold text-primary">87%</p>
          <p className="text-[10px] text-muted-foreground font-display">Avg Score</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-xl font-display font-bold text-secondary">12</p>
          <p className="text-[10px] text-muted-foreground font-display">Tests Taken</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-xl font-display font-bold text-accent">5🔥</p>
          <p className="text-[10px] text-muted-foreground font-display">Streak</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryScreen;
