import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronLeft, ChevronRight, BookOpen, X } from "lucide-react";
import { useState } from "react";
import { revisionBySubject } from "@/lib/revisionData";

interface Props {
  subject: string;
  onClose: () => void;
  onCompleted?: () => void;
}

const RevisionView = ({ subject, onClose }: Props) => {
  const items = revisionBySubject[subject] || [];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  if (items.length === 0) {
    return (
      <motion.div className="glass-card p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <BookOpen size={40} className="mx-auto text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground font-display">No revision cards available for {subject} yet.</p>
        <button onClick={onClose} className="mt-4 text-xs text-primary font-display font-semibold">Go Back</button>
      </motion.div>
    );
  }

  const current = items[index];
  const progress = ((completed.size / items.length) * 100).toFixed(0);

  const goNext = () => {
    setCompleted((prev) => new Set(prev).add(index));
    setFlipped(false);
    if (index < items.length - 1) setIndex((i) => i + 1);
  };

  const goPrev = () => {
    setFlipped(false);
    if (index > 0) setIndex((i) => i - 1);
  };

  const restart = () => {
    setIndex(0);
    setFlipped(false);
    setCompleted(new Set());
  };

  const allDone = completed.size === items.length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-foreground text-sm">📚 {subject} — Revision</h3>
        <button onClick={onClose} className="glass-card p-2 rounded-lg">
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-xs font-display font-bold text-primary">{progress}%</span>
      </div>

      {/* Card counter */}
      <p className="text-xs text-muted-foreground font-display text-center">
        Card {index + 1} of {items.length}
      </p>

      {/* Flashcard */}
      {!allDone ? (
        <motion.button
          key={`${index}-${flipped}`}
          onClick={() => setFlipped(!flipped)}
          className="glass-card w-full p-8 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-[10px] text-muted-foreground font-display mb-3 uppercase tracking-wider">
            {flipped ? "Answer" : "Question"}
          </p>
          <p className={`font-display font-bold text-foreground ${flipped ? "text-xl text-primary" : "text-2xl"}`}>
            {flipped ? current.back : current.front}
          </p>
          <p className="text-[10px] text-muted-foreground mt-4 font-display">
            {flipped ? "Tap to flip back" : "Tap to reveal answer"}
          </p>
        </motion.button>
      ) : (
        <motion.div
          className="glass-card p-8 text-center glow-primary"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <p className="text-4xl mb-3">🎉</p>
          <h3 className="text-xl font-display font-bold text-foreground mb-2">All Done!</h3>
          <p className="text-sm text-muted-foreground font-display mb-4">
            You've reviewed all {items.length} cards for {subject}
          </p>
          <button onClick={restart} className="flex items-center gap-2 mx-auto bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-display font-semibold">
            <RotateCcw size={14} /> Review Again
          </button>
        </motion.div>
      )}

      {/* Navigation */}
      {!allDone && (
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={goPrev}
            disabled={index === 0}
            className="glass-card p-3 rounded-xl disabled:opacity-30 transition-opacity"
          >
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <button
            onClick={() => setFlipped(!flipped)}
            className="flex-1 glass-card py-3 rounded-xl text-sm font-display font-semibold text-foreground text-center"
          >
            {flipped ? "Hide Answer" : "Show Answer"}
          </button>
          <button
            onClick={goNext}
            className="glass-card p-3 rounded-xl bg-primary/10"
          >
            <ChevronRight size={18} className="text-primary" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default RevisionView;
