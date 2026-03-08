import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, BookOpen, Activity, HelpCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import nightSkyBg from "@/assets/night-sky-bg.jpg";
import { toast } from "sonner";
import DreamJournal from "./DreamJournal";
import DailyJournal from "./DailyJournal";
import ActivityScreen from "./ActivityScreen";
import HelpCenter from "./HelpCenter";

type TabId = "home" | "study" | "sleep" | "memory" | "profile";
type MenuPage = null | "dream" | "journal" | "activity" | "help";

interface HomeScreenProps {
  onNavigate: (tab: TabId) => void;
}

const features = [
  { title: "Study Before Sleep", desc: "Review vocabulary, formulas & concepts", emoji: "📖" },
  { title: "Sleep Learning Mode", desc: "Gentle audio cues while you rest", emoji: "😴" },
  { title: "Morning Memory Test", desc: "Quick quizzes to check retention", emoji: "🧠" },
  { title: "Dream Journal", desc: "Record your dreams after waking", emoji: "✍️" },
  { title: "Exam Boost Mode", desc: "Intensive revision for exam prep", emoji: "🎯" },
];

const quickActions: { emoji: string; label: string; tab: TabId; note?: string }[] = [
  { emoji: "😴", label: "Sleep Now", tab: "sleep" },
  { emoji: "📖", label: "Study", tab: "study" },
  { emoji: "🧠", label: "Quiz", tab: "memory" },
  { emoji: "🎯", label: "Exam Boost", tab: "study", note: "Exam Boost opened inside Study." },
];

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPage, setMenuPage] = useState<MenuPage>(null);

  const handleQuickAction = (tab: TabId, note?: string) => {
    onNavigate(tab);
    if (note) toast.success(note);
  };

  const openMenuPage = (page: MenuPage) => {
    setMenuPage(page);
    setMenuOpen(false);
  };

  // If a menu page is active, render it full-screen
  if (menuPage === "dream") return <DreamJournal onBack={() => setMenuPage(null)} />;
  if (menuPage === "journal") return <DailyJournal onBack={() => setMenuPage(null)} />;
  if (menuPage === "activity") return <ActivityScreen onBack={() => setMenuPage(null)} />;
  if (menuPage === "help") return <HelpCenter onBack={() => setMenuPage(null)} />;

  return (
    <div className="min-h-screen pb-24">
      {/* Menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-full bg-card border-l border-border/20 p-6"
              initial={{ x: 264 }}
              animate={{ x: 0 }}
              exit={{ x: 264 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display font-bold text-foreground">Menu</h3>
                <button onClick={() => setMenuOpen(false)} className="text-muted-foreground">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { id: "dream" as MenuPage, label: "Dream Journal", icon: <Moon size={18} className="text-dream" />, emoji: "🌙" },
                  { id: "journal" as MenuPage, label: "Daily Journal", icon: <BookOpen size={18} className="text-secondary" />, emoji: "📓" },
                  { id: "activity" as MenuPage, label: "Activity", icon: <Activity size={18} className="text-primary" />, emoji: "📊" },
                  { id: "help" as MenuPage, label: "Help Center", icon: <HelpCircle size={18} className="text-accent" />, emoji: "❓" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => openMenuPage(item.id)}
                    className="w-full glass-card p-3.5 flex items-center gap-3 text-left group"
                  >
                    {item.icon}
                    <span className="font-display font-semibold text-sm text-foreground">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative overflow-hidden rounded-b-3xl">
        <img src={nightSkyBg} alt="Night sky" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        <div className="relative z-10 flex flex-col items-center px-6 pb-10 pt-12 text-center">
          <motion.img
            src={logo}
            alt="ThukkamTutor Logo"
            className="mb-4 h-28 w-28 drop-shadow-2xl"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.h1
            className="mb-2 text-3xl font-display font-bold text-gradient-dream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ThukkamTutor
          </motion.h1>
          <motion.p
            className="text-sm font-display italic text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            "Learn Smart… Even While You Sleep"
          </motion.p>
        </div>
      </div>

      <div className="relative z-10 -mt-4 px-4">
        <div className="glass-card glow-primary flex items-center justify-around p-4">
          {quickActions.map((action) => (
            <QuickAction
              key={action.label}
              emoji={action.emoji}
              label={action.label}
              onClick={() => handleQuickAction(action.tab, action.note)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 px-4">
        <h2 className="mb-4 text-lg font-display font-bold text-foreground">Core Features</h2>
        <div className="space-y-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass-card flex items-center gap-4 p-4"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-2xl">
                {feature.emoji}
              </div>
              <div>
                <h3 className="text-sm font-display font-semibold text-foreground">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 px-4">
        <h2 className="mb-4 text-lg font-display font-bold text-foreground">Powered By</h2>
        <div className="grid grid-cols-3 gap-3">
          <TechCard icon="🧠" label="AI Learning" />
          <TechCard icon="🎙" label="Audio Cues" />
          <TechCard icon="📱" label="Sensors" />
          <TechCard icon="📈" label="Tracker" />
          <TechCard icon="☁️" label="Cloud" />
          <TechCard icon="🔒" label="Secure" />
        </div>
      </div>

      <div className="mt-8 px-4">
        <h2 className="mb-4 text-lg font-display font-bold text-foreground">Subscription</h2>
        <motion.div
          className="glass-card glow-moonlight p-6 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="mb-2 text-3xl">⭐</div>
          <h3 className="text-lg font-display font-bold text-foreground">Basic Plan</h3>
          <p className="my-2 text-3xl font-display font-bold text-primary">
            ₹50<span className="text-sm text-muted-foreground">/month</span>
          </p>
          <div className="mt-4 space-y-2 text-left text-sm text-muted-foreground">
            <p>✅ Sleep Learning Mode</p>
            <p>✅ Memory Quizzes</p>
            <p>✅ Study Tracker</p>
            <p>✅ Dream Journal</p>
          </div>
          <button
            onClick={() => toast.success("Demo subscription started")}
            className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-display font-bold text-primary-foreground transition hover:opacity-90"
          >
            Start Free Trial
          </button>
        </motion.div>
      </div>

      <div className="mb-8 mt-8 px-4">
        <div className="glass-card p-6">
          <h2 className="mb-3 text-lg font-display font-bold text-gradient-dream">🚀 Why ThukkamTutor?</h2>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">The Problem:</span> Students forget 70% of what they study overnight. Traditional revision is time-consuming and exhausting.
            </p>
            <p>
              <span className="font-semibold text-foreground">Our Solution:</span> ThukkamTutor uses scientifically-backed sleep learning techniques — playing gentle audio cues during light sleep phases to reinforce memory consolidation.
            </p>
            <p>
              <span className="font-semibold text-foreground">Market:</span> 300M+ students in India alone. Sleep learning is a ₹500Cr untapped market.
            </p>
            <p>
              <span className="font-semibold text-foreground">Traction:</span> Built with AI-powered personalization, phone sensor integration, and Tamil/English bilingual support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ emoji, label, onClick }: { emoji: string; label: string; onClick: () => void }) => (
  <button type="button" onClick={onClick} className="group flex flex-col items-center gap-1">
    <span className="text-2xl transition-transform group-hover:scale-110">{emoji}</span>
    <span className="text-[10px] font-display font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
      {label}
    </span>
  </button>
);

const TechCard = ({ icon, label }: { icon: string; label: string }) => (
  <div className="glass-card flex flex-col items-center gap-1 p-3 text-center">
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] font-display font-semibold text-muted-foreground">{label}</span>
  </div>
);

export default HomeScreen;
