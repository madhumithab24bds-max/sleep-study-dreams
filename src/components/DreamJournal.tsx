import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Moon, Sparkles, Trash2 } from "lucide-react";

interface DreamEntry {
  id: string;
  date: string;
  time: string;
  content: string;
  tags: string[];
}

const STORAGE_KEY = "thookam_dream_journal";

const DreamJournal = ({ onBack }: { onBack: () => void }) => {
  const [entries, setEntries] = useState<DreamEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setEntries(JSON.parse(saved));
    } catch {}
  }, []);

  const save = (updated: DreamEntry[]) => {
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addEntry = () => {
    if (!newContent.trim()) return;
    const now = new Date();
    const entry: DreamEntry = {
      id: Date.now().toString(),
      date: now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      content: newContent.trim(),
      tags: newTags.split(",").map(t => t.trim()).filter(Boolean),
    };
    save([entry, ...entries]);
    setNewContent("");
    setNewTags("");
    setShowForm(false);
  };

  const deleteEntry = (id: string) => save(entries.filter(e => e.id !== id));

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={18} className="text-muted-foreground" />
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground">🌙 Dream Journal</h1>
      </div>

      <motion.div className="glass-card p-4 mb-4 border-l-4 border-dream" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="text-xs text-muted-foreground">
          <Sparkles size={12} className="inline text-dream mr-1" />
          Record your dreams after waking up. Dreams related to study topics can reinforce memory consolidation.
        </p>
      </motion.div>

      {!showForm && (
        <motion.button
          onClick={() => { setShowForm(true); setTimeout(() => textareaRef.current?.focus(), 100); }}
          className="glass-card p-4 w-full flex items-center gap-3 mb-4"
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 rounded-xl bg-dream/20 flex items-center justify-center">
            <Plus size={18} className="text-dream" />
          </div>
          <span className="font-display font-semibold text-sm text-foreground">Record a Dream</span>
        </motion.button>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="glass-card p-4 space-y-3">
              <textarea
                ref={textareaRef}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Describe your dream..."
                className="w-full bg-muted/30 rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground font-display resize-none min-h-[120px] border border-border/20 focus:outline-none focus:border-dream/40"
              />
              <input
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="Tags (comma separated): study, anatomy, exam..."
                className="w-full bg-muted/30 rounded-xl p-3 text-xs text-foreground placeholder:text-muted-foreground font-display border border-border/20 focus:outline-none focus:border-dream/40"
              />
              <div className="flex gap-2">
                <button onClick={addEntry} className="flex-1 py-2.5 rounded-xl bg-dream text-dream-foreground text-xs font-display font-bold">
                  Save Dream
                </button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl glass-card text-xs font-display text-muted-foreground">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {entries.length === 0 && !showForm && (
          <div className="text-center py-12 text-muted-foreground">
            <Moon size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-display">No dreams recorded yet</p>
            <p className="text-xs mt-1">Tap "Record a Dream" after waking up</p>
          </div>
        )}
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            className="glass-card p-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-display">
                <span>📅 {entry.date}</span>
                <span>🕐 {entry.time}</span>
              </div>
              <button onClick={() => deleteEntry(entry.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-sm text-foreground font-display leading-relaxed">{entry.content}</p>
            {entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {entry.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-dream/10 text-dream text-[10px] font-display">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DreamJournal;
