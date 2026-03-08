import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, BookOpen, Moon, Brain, Upload, Mic, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQ {
  q: string;
  a: string;
  icon: React.ReactNode;
}

const faqs: FAQ[] = [
  {
    q: "How does Sleep Learning work?",
    a: "ThookamTutor plays gentle audio cues of study material during your light sleep phases. Research shows this can reinforce memory consolidation. Simply select a subject, go to Sleep mode, and place your phone nearby while sleeping.",
    icon: <Moon size={16} className="text-dream" />,
  },
  {
    q: "How do I take a Memory Quiz?",
    a: "Go to the Memory tab, select your quiz source (current subject, studied subjects, or weak topics), set the number of questions, and tap Start Quiz. The app will test your recall with MCQs, True/False, and clinical scenario questions.",
    icon: <Brain size={16} className="text-accent" />,
  },
  {
    q: "How do I use Voice Mode in quizzes?",
    a: "In the Memory section, tap the 'Voice' button at the top. You can enable voice mode, choose Male/Female voice, adjust volume and speed. The app will read questions aloud and explain answers like a teacher.",
    icon: <Mic size={16} className="text-primary" />,
  },
  {
    q: "How do I upload study material?",
    a: "Go to Memory → Upload tab. You can upload PDFs or photos of your notes. The AI will analyze the content and generate personalized quiz questions based on your study material.",
    icon: <Upload size={16} className="text-secondary" />,
  },
  {
    q: "What is the Study section for?",
    a: "The Study section lets you select your course and subject, then review flashcard-style revision material. Completing revisions unlocks subject-specific quizzes in the Memory section.",
    icon: <BookOpen size={16} className="text-primary" />,
  },
  {
    q: "What is the Dream Journal?",
    a: "The Dream Journal lets you record dreams after waking up. Dreams related to study topics can indicate your brain is processing and consolidating that information during sleep.",
    icon: <Moon size={16} className="text-dream" />,
  },
  {
    q: "How does the Daily Journal work?",
    a: "The Daily Journal is a chat-style text box where you can write your daily study reflections, ideas, or experiences. Each entry is automatically timestamped with date and time.",
    icon: <BookOpen size={16} className="text-secondary" />,
  },
  {
    q: "What languages are supported?",
    a: "ThukkamTutor supports Tamil and English. You can switch between languages in the Study section using the language toggle at the top.",
    icon: <HelpCircle size={16} className="text-primary" />,
  },
];

const HelpCenter = ({ onBack }: { onBack: () => void }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={18} className="text-muted-foreground" />
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground">❓ Help Center</h1>
      </div>

      <motion.div className="glass-card p-5 mb-6 text-center" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <HelpCircle size={32} className="mx-auto text-primary mb-2" />
        <h3 className="font-display font-bold text-foreground mb-1">How can we help?</h3>
        <p className="text-xs text-muted-foreground">Browse FAQs below to learn how to use ThukkamTutor effectively</p>
      </motion.div>

      <div className="space-y-2">
        {faqs.map((faq, i) => {
          const isOpen = expanded === i;
          return (
            <motion.div
              key={i}
              className="glass-card overflow-hidden"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="p-4 w-full flex items-center gap-3 text-left"
              >
                {faq.icon}
                <span className="flex-1 text-sm font-display font-semibold text-foreground">{faq.q}</span>
                <ChevronDown size={14} className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  className="px-4 pb-4"
                >
                  <p className="text-xs text-muted-foreground font-display leading-relaxed pl-7">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div className="glass-card p-5 mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <p className="text-xs text-muted-foreground font-display">
          Still need help? Contact us at <span className="text-primary font-semibold">support@thukkamtutor.app</span>
        </p>
      </motion.div>
    </div>
  );
};

export default HelpCenter;
