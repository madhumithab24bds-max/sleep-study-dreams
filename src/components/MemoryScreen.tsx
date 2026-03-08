import { motion } from "framer-motion";
import { CheckCircle, XCircle, Trophy } from "lucide-react";
import { useState, useMemo } from "react";
import { quizByCourse } from "@/lib/quizData";

interface Props {
  selectedCourse: string | null;
}

const MemoryScreen = ({ selectedCourse }: Props) => {
  const quizzes = useMemo(() => {
    if (selectedCourse && quizByCourse[selectedCourse]) {
      return quizByCourse[selectedCourse];
    }
    // Default fallback quiz
    return quizByCourse["primary"];
  }, [selectedCourse]);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const courseLabel = selectedCourse
    ? selectedCourse.charAt(0).toUpperCase() + selectedCourse.slice(1)
    : "General";

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quizzes[current].answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (current < quizzes.length - 1) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setDone(true);
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
      <h1 className="text-2xl font-display font-bold text-foreground mb-2">🧠 Memory Test</h1>
      <p className="text-xs text-muted-foreground font-display mb-6">
        📚 Course: <span className="text-primary font-semibold">{courseLabel}</span>
        {!selectedCourse && " — Select a course in Study tab for specific quizzes"}
      </p>

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
            key={`${selectedCourse}-${current}`}
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
                let style = "glass-card";
                if (selected !== null) {
                  if (isCorrect) style = "bg-green-500/20 border border-green-500/40";
                  else if (isSelected) style = "bg-destructive/20 border border-destructive/40";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full p-3.5 rounded-xl text-left text-sm font-display font-semibold text-foreground transition-all ${style}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                      {selected !== null && isCorrect && <CheckCircle size={16} className="ml-auto text-green-400" />}
                      {selected !== null && isSelected && !isCorrect && <XCircle size={16} className="ml-auto text-destructive" />}
                    </div>
                  </button>
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
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm"
          >
            Try Again
          </button>
        </motion.div>
      )}

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
