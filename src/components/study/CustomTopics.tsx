import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Check } from "lucide-react";
import { type AppLang, t, ui } from "@/lib/i18n";
import { type CustomTopic } from "@/hooks/useStudyProgress";

interface Props {
  lang: AppLang;
  topics: CustomTopic[];
  onAdd: (name: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const CustomTopics = ({ lang, topics, onAdd, onToggle, onRemove }: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const lk = (item: { en: string; ta: string; hi: string }) => t(lang, item.en, item.ta, item.hi);

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
      setShowInput(false);
    }
  };

  return (
    <motion.div
      className="glass-card p-4 mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
          ✏️ {lk(ui.customTopics)}
        </h4>
        <motion.button
          onClick={() => setShowInput(!showInput)}
          className="flex items-center gap-1 text-xs font-display font-semibold text-primary bg-primary/10 px-2.5 py-1.5 rounded-xl"
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={14} />
          {lk(ui.addTopic)}
        </motion.button>
      </div>

      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-3"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder={lk(ui.enterTopicName)}
                className="flex-1 bg-muted/50 border border-border/30 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground font-display focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
              <motion.button
                onClick={handleAdd}
                className="bg-primary text-primary-foreground px-3 py-2 rounded-xl text-sm font-display font-semibold"
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {topics.length > 0 && (
        <div className="space-y-1.5">
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              className="flex items-center gap-3 glass-card p-3"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              layout
            >
              <motion.button
                onClick={() => onToggle(topic.id)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  topic.completed
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted border border-border/50"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {topic.completed && <Check size={14} />}
              </motion.button>
              <span className={`font-display text-sm flex-1 ${topic.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {topic.name}
              </span>
              <motion.button
                onClick={() => onRemove(topic.id)}
                className="text-muted-foreground hover:text-destructive"
                whileTap={{ scale: 0.9 }}
              >
                <X size={14} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CustomTopics;
