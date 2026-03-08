import { motion } from "framer-motion";
import { type AppLang, t, ui } from "@/lib/i18n";

interface SubjectProgress {
  name: string;
  emoji: string;
  percent: number;
  color: string;
}

interface Props {
  lang: AppLang;
  subjects: SubjectProgress[];
  overallPercent: number;
}

const barColors = [
  "from-primary to-accent",
  "from-secondary to-primary",
  "from-accent to-primary",
  "from-primary to-secondary",
];

const StudyProgressDashboard = ({ lang, subjects, overallPercent }: Props) => {
  const lk = (item: { en: string; ta: string; hi: string }) => t(lang, item.en, item.ta, item.hi);

  const motivationMsg = overallPercent >= 80
    ? lk(ui.motivation3)
    : overallPercent >= 50
    ? lk(ui.motivation1)
    : overallPercent > 0
    ? lk(ui.motivation2)
    : "";

  return (
    <motion.div
      className="glass-card p-5 mb-5"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
          📊 {lk(ui.studyProgress)}
        </h3>
        <span className="text-lg font-display font-bold text-primary">{overallPercent}%</span>
      </div>

      {/* Overall bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">{lk(ui.overallProgress)}</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${overallPercent}%` }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>
      </div>

      {/* Per-subject bars */}
      {subjects.length > 0 && (
        <div className="space-y-2.5">
          {subjects.map((subj, i) => (
            <div key={subj.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-foreground font-display font-medium truncate flex items-center gap-1.5">
                  {subj.emoji} {subj.name}
                </span>
                <span className="text-xs font-display font-bold text-primary">{subj.percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${barColors[i % barColors.length]}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${subj.percent}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Motivation */}
      {motivationMsg && overallPercent > 0 && (
        <motion.p
          className="text-xs text-center text-accent font-display font-semibold mt-4 py-2 rounded-xl bg-accent/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          ✨ {motivationMsg}
        </motion.p>
      )}
    </motion.div>
  );
};

export default StudyProgressDashboard;
