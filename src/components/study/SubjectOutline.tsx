import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowDown, BookOpen, Layers } from "lucide-react";
import { type Chapter } from "@/lib/indianSyllabus";
import { type AppLang, t } from "@/lib/i18n";
import { getRevisionItems } from "@/lib/revisionData";

interface SubjectOutlineProps {
  chapters: Chapter[];
  subjectName: string;
  subjectEmoji: string;
  subjectColor: string;
  lang: AppLang;
  completedTopics: Set<string>;
  onStudy: (englishName: string, displayName: string) => void;
}

const SubjectOutline = ({
  chapters,
  subjectName,
  subjectEmoji,
  subjectColor,
  lang,
  completedTopics,
  onStudy,
}: SubjectOutlineProps) => {
  const lk = (item: { en: string; ta: string; hi: string }) =>
    t(lang, item.en, item.ta, item.hi);

  const completedCount = chapters.filter((ch) => completedTopics.has(ch.id)).length;
  const progressPercent = chapters.length > 0 ? Math.round((completedCount / chapters.length) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass-card p-4 mt-2 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subjectColor} flex items-center justify-center text-xl shrink-0`}
        >
          {subjectEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-bold text-sm text-foreground">
            {subjectName} — Learning Path
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <span className="text-[10px] font-display font-bold text-primary">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Flowchart */}
      <div className="relative ml-5">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-border" />

        {chapters.map((ch, i) => {
          const isCompleted = completedTopics.has(ch.id);
          const cardCount = getRevisionItems(ch.en).length;
          const isLast = i === chapters.length - 1;

          return (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="relative flex items-start gap-3 pb-4 last:pb-0"
            >
              {/* Node */}
              <div className="relative z-10 shrink-0 mt-0.5">
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2
                      size={22}
                      className="text-accent drop-shadow-sm"
                      fill="hsl(var(--accent))"
                      strokeWidth={0}
                    />
                  </motion.div>
                ) : (
                  <div
                    className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center text-[9px] font-display font-bold ${
                      i === 0 && !isCompleted
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-muted-foreground/30 bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                )}
              </div>

              {/* Content card */}
              <button
                onClick={() => onStudy(ch.en, lk(ch))}
                className={`flex-1 rounded-xl p-3 text-left transition-all active:scale-[0.98] ${
                  isCompleted
                    ? "bg-accent/5 border border-accent/20"
                    : "bg-muted/30 border border-border/30 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-display text-sm font-semibold ${
                      isCompleted
                        ? "text-accent line-through"
                        : "text-foreground"
                    }`}
                  >
                    {lk(ch)}
                  </span>
                  <BookOpen
                    size={14}
                    className={
                      isCompleted ? "text-accent/50" : "text-primary/60"
                    }
                  />
                </div>
                {cardCount > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Layers size={10} className="text-accent/70" />
                    <span className="text-[9px] font-display text-muted-foreground">
                      {cardCount} flashcards
                    </span>
                  </div>
                )}
              </button>

              {/* Arrow connector */}
              {!isLast && (
                <div className="absolute left-[7px] bottom-0 z-10">
                  <ArrowDown size={10} className="text-muted-foreground/40" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Summary footer */}
      <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between">
        <span className="text-[10px] font-display text-muted-foreground">
          {completedCount}/{chapters.length} completed
        </span>
        {completedCount === chapters.length && chapters.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[10px] font-display font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full"
          >
            ✨ Mastered!
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

export default SubjectOutline;
