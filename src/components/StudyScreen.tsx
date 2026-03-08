import { motion } from "framer-motion";
import { BookOpen, FlaskConical, Languages, ChevronRight } from "lucide-react";

const subjects = [
  { title: "Tamil Vocabulary", emoji: "🇮🇳", count: 120, color: "from-primary/20 to-accent/20" },
  { title: "English Words", emoji: "🇬🇧", count: 95, color: "from-secondary/20 to-primary/20" },
  { title: "Math Formulas", emoji: "📐", count: 45, color: "from-dream/20 to-secondary/20" },
  { title: "Science Facts", emoji: "🔬", count: 78, color: "from-accent/20 to-dream/20" },
  { title: "History Dates", emoji: "📜", count: 56, color: "from-primary/20 to-dream/20" },
];

const StudyScreen = () => {
  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">📖 Study</h1>
        <button className="glass-card px-3 py-1.5 flex items-center gap-1.5 text-xs font-display text-muted-foreground">
          <Languages size={14} />
          Tamil / English
        </button>
      </div>

      {/* Today's Progress */}
      <motion.div
        className="glass-card p-5 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="font-display font-semibold text-sm text-foreground mb-3">Today's Progress</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
          </div>
          <span className="text-sm font-display font-bold text-primary">65%</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">32 of 50 items reviewed</p>
      </motion.div>

      {/* Subjects */}
      <h3 className="font-display font-semibold text-foreground mb-3">Subjects</h3>
      <div className="space-y-3">
        {subjects.map((s, i) => (
          <motion.button
            key={s.title}
            className={`glass-card p-4 flex items-center gap-4 w-full text-left group`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * i }}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl shrink-0`}>
              {s.emoji}
            </div>
            <div className="flex-1">
              <h4 className="font-display font-semibold text-sm text-foreground">{s.title}</h4>
              <p className="text-xs text-muted-foreground">{s.count} items to study</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </motion.button>
        ))}
      </div>

      {/* Study Tip */}
      <motion.div
        className="glass-card p-4 mt-6 border-l-4 border-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-xs text-muted-foreground">
          💡 <span className="text-foreground font-semibold">Tip:</span> Study 30 minutes before sleep for best memory consolidation results!
        </p>
      </motion.div>
    </div>
  );
};

export default StudyScreen;
