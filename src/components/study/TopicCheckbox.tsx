import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  completed: boolean;
  onToggle: () => void;
}

const TopicCheckbox = ({ completed, onToggle }: Props) => (
  <motion.button
    onClick={(e) => { e.stopPropagation(); onToggle(); }}
    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
      completed
        ? "bg-primary text-primary-foreground"
        : "bg-muted border border-border/50"
    }`}
    whileTap={{ scale: 0.85 }}
  >
    {completed && <Check size={12} />}
  </motion.button>
);

export default TopicCheckbox;
