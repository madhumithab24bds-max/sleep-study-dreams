import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Brain, Moon, FileText, Trophy, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "study" | "quiz" | "sleep" | "journal" | "dream" | "revision";
  title: string;
  detail: string;
  timestamp: number;
  date: string;
  time: string;
}

const STORAGE_KEY = "thookam_activity_log";

// Collect activity from all localStorage sources
function collectActivity(): ActivityItem[] {
  const items: ActivityItem[] = [];

  // Saved activity log
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) items.push(...JSON.parse(saved));
  } catch {}

  // Quiz performance data
  try {
    const perf = localStorage.getItem("thookam_performance");
    if (perf) {
      const data = JSON.parse(perf);
      Object.entries(data).forEach(([subject, info]: [string, any]) => {
        if (info.lastAttempt) {
          items.push({
            id: `quiz-${subject}-${info.lastAttempt}`,
            type: "quiz",
            title: `Quiz: ${subject}`,
            detail: `Score: ${info.totalCorrect}/${info.totalAttempted} (${Math.round((info.totalCorrect / Math.max(1, info.totalAttempted)) * 100)}%)`,
            timestamp: info.lastAttempt,
            date: new Date(info.lastAttempt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
            time: new Date(info.lastAttempt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
          });
        }
      });
    }
  } catch {}

  // Dream journal entries
  try {
    const dreams = localStorage.getItem("thookam_dream_journal");
    if (dreams) {
      JSON.parse(dreams).forEach((d: any) => {
        items.push({
          id: `dream-${d.id}`,
          type: "dream",
          title: "Dream Journal Entry",
          detail: d.content.slice(0, 60) + (d.content.length > 60 ? "..." : ""),
          timestamp: parseInt(d.id),
          date: d.date,
          time: d.time,
        });
      });
    }
  } catch {}

  // Daily journal entries
  try {
    const journal = localStorage.getItem("thookam_daily_journal");
    if (journal) {
      JSON.parse(journal).forEach((j: any) => {
        items.push({
          id: `journal-${j.id}`,
          type: "journal",
          title: "Daily Journal",
          detail: j.content.slice(0, 60) + (j.content.length > 60 ? "..." : ""),
          timestamp: parseInt(j.id),
          date: j.date,
          time: j.time,
        });
      });
    }
  } catch {}

  // Deduplicate and sort
  const unique = Array.from(new Map(items.map(i => [i.id, i])).values());
  return unique.sort((a, b) => b.timestamp - a.timestamp);
}

const iconMap: Record<string, React.ReactNode> = {
  study: <BookOpen size={16} className="text-primary" />,
  quiz: <Brain size={16} className="text-accent" />,
  sleep: <Moon size={16} className="text-dream" />,
  journal: <FileText size={16} className="text-secondary" />,
  dream: <Moon size={16} className="text-dream" />,
  revision: <Trophy size={16} className="text-primary" />,
};

const colorMap: Record<string, string> = {
  study: "border-primary/30",
  quiz: "border-accent/30",
  sleep: "border-dream/30",
  journal: "border-secondary/30",
  dream: "border-dream/30",
  revision: "border-primary/30",
};

const ActivityScreen = ({ onBack }: { onBack: () => void }) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    setActivities(collectActivity());
  }, []);

  // Group by date
  const grouped = activities.reduce<Record<string, ActivityItem[]>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={18} className="text-muted-foreground" />
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground">📊 Activity</h1>
      </div>

      <motion.div className="glass-card p-4 mb-4 flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Clock size={18} className="text-primary" />
        <div>
          <p className="text-sm font-display font-semibold text-foreground">{activities.length} activities recorded</p>
          <p className="text-xs text-muted-foreground">Complete history of your app usage</p>
        </div>
      </motion.div>

      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Clock size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-display">No activity yet</p>
          <p className="text-xs mt-1">Start studying, taking quizzes, or writing journals!</p>
        </div>
      )}

      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-display font-bold text-foreground">{date}</span>
          </div>
          <div className="ml-3 border-l-2 border-border/30 pl-4 space-y-2">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                className={`glass-card p-3 border-l-2 ${colorMap[item.type] || "border-border/30"}`}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">{iconMap[item.type]}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-display font-semibold text-foreground">{item.title}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.detail}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-display shrink-0">{item.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityScreen;
