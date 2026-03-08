import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Trash2, BookOpen } from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  time: string;
  content: string;
}

const STORAGE_KEY = "thukkam_daily_journal";

const DailyJournal = ({ onBack }: { onBack: () => void }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setEntries(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const save = (updated: JournalEntry[]) => {
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      content: input.trim(),
    };
    save([...entries, entry]);
    setInput("");
  };

  const deleteEntry = (id: string) => save(entries.filter(e => e.id !== id));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Group entries by date
  const grouped = entries.reduce<Record<string, JournalEntry[]>>((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={18} className="text-muted-foreground" />
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground">📓 Daily Journal</h1>
      </div>

      {/* Chat-style entries */}
      <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[60vh]">
        {Object.keys(grouped).length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-display">Start your daily journal</p>
            <p className="text-xs mt-1">Write about your study experiences and reflections</p>
          </div>
        )}
        {Object.entries(grouped).map(([date, dayEntries]) => (
          <div key={date}>
            <div className="text-center mb-3">
              <span className="px-3 py-1 rounded-full bg-muted/50 text-[10px] font-display text-muted-foreground">
                {date}
              </span>
            </div>
            <div className="space-y-2">
              {dayEntries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  className="glass-card p-3 ml-4 relative group"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                  <p className="text-sm text-foreground font-display leading-relaxed pr-6">{entry.content}</p>
                  <p className="text-[10px] text-muted-foreground font-display mt-1.5">{entry.time}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="glass-card p-2 flex items-end gap-2 sticky bottom-20">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your thoughts..."
          className="flex-1 bg-muted/30 rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground font-display resize-none min-h-[44px] max-h-[120px] border border-border/20 focus:outline-none focus:border-primary/40"
          rows={1}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="p-3 rounded-xl bg-primary text-primary-foreground disabled:opacity-30 transition-opacity"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default DailyJournal;
