import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Moon, BookOpen, Activity, HelpCircle, IndianRupee, Copy, ExternalLink } from "lucide-react";
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


const quickActions: { emoji: string; label: string; tab: TabId; note?: string }[] = [
  { emoji: "😴", label: "Sleep Now", tab: "sleep" },
  { emoji: "📖", label: "Study", tab: "study" },
  { emoji: "🧠", label: "Quiz", tab: "memory" },
  { emoji: "🎯", label: "Exam Boost", tab: "study", note: "Exam Boost opened inside Study." },
];

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const [menuPage, setMenuPage] = useState<MenuPage>(null);
  const [showPayment, setShowPayment] = useState(false);

  const UPI_ID = "madhukrr2006@oksbi";
  const UPI_AMOUNT = "50";
  const UPI_QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${UPI_ID}&pn=ThookamTutor&am=${UPI_AMOUNT}&cu=INR&tn=ThookamTutor%20Subscription`)}`;

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success("UPI ID copied!");
  };

  const handleQuickAction = (tab: TabId, note?: string) => {
    onNavigate(tab);
    if (note) toast.success(note);
  };

  const openMenuPage = (page: MenuPage) => {
    setMenuPage(page);
  };

  // If a menu page is active, render it full-screen
  if (menuPage === "dream") return <DreamJournal onBack={() => setMenuPage(null)} />;
  if (menuPage === "journal") return <DailyJournal onBack={() => setMenuPage(null)} />;
  if (menuPage === "activity") return <ActivityScreen onBack={() => setMenuPage(null)} />;
  if (menuPage === "help") return <HelpCenter onBack={() => setMenuPage(null)} />;

  return (
    <div className="min-h-screen pb-24">
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
        <h2 className="mb-4 text-lg font-display font-bold text-foreground">Explore</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "dream" as MenuPage, label: "Dream Journal", icon: <Moon size={22} className="text-dream" />, desc: "Record your dreams" },
            { id: "journal" as MenuPage, label: "Daily Journal", icon: <BookOpen size={22} className="text-secondary" />, desc: "Write daily notes" },
            { id: "activity" as MenuPage, label: "Activity", icon: <Activity size={22} className="text-primary" />, desc: "Track your progress" },
            { id: "help" as MenuPage, label: "Help Center", icon: <HelpCircle size={22} className="text-accent" />, desc: "Get support" },
          ].map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => setMenuPage(item.id)}
              className="glass-card p-4 flex flex-col items-center gap-2 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-sm font-display font-semibold text-foreground">{item.label}</h3>
              <p className="text-[10px] text-muted-foreground">{item.desc}</p>
            </motion.button>
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
            <p>✅ All study materials (LKG–12 + College)</p>
            <p>✅ AI Tutor conversations</p>
            <p>✅ Sleep learning sessions</p>
            <p>✅ Quizzes & flashcards</p>
            <p>✅ Trilingual support (EN/TA/HI)</p>
          </div>
          <button
            onClick={() => setShowPayment(true)}
            className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-display font-bold text-primary-foreground transition hover:opacity-90"
          >
            Subscribe Now – ₹50/month
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

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPayment(false)}
          >
            <motion.div
              className="glass-card w-full max-w-sm p-6 space-y-5 relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPayment(false)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>

              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <IndianRupee size={24} className="text-primary" />
                </div>
                <h2 className="font-display font-bold text-lg text-foreground">Subscribe to ThukkamTutor</h2>
                <p className="text-xs text-muted-foreground mt-1">Unlock all premium features</p>
              </div>

              <div className="glass-card p-4 space-y-2 bg-primary/5 border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-display text-foreground font-semibold">Basic Plan</span>
                  <span className="text-lg font-display font-bold text-primary">₹50<span className="text-xs text-muted-foreground font-normal">/month</span></span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✅ All study materials (LKG–12 + College)</li>
                  <li>✅ AI Tutor conversations</li>
                  <li>✅ Sleep learning sessions</li>
                  <li>✅ Quizzes & flashcards</li>
                  <li>✅ Trilingual support (EN/TA/HI)</li>
                </ul>
              </div>

              <div className="text-center space-y-3">
                <p className="text-xs font-display text-muted-foreground">Scan QR code to pay via UPI</p>
                <div className="inline-block p-3 bg-white rounded-2xl">
                  <img src={UPI_QR_URL} alt="UPI QR Code" className="w-48 h-48" loading="lazy" />
                </div>
              </div>

              <div className="glass-card p-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground font-display">UPI ID</p>
                  <p className="text-sm font-display font-semibold text-foreground">{UPI_ID}</p>
                </div>
                <button
                  onClick={copyUpiId}
                  className="glass-card px-3 py-1.5 flex items-center gap-1.5 text-xs font-display text-primary hover:text-foreground transition-colors"
                >
                  <Copy size={12} /> Copy
                </button>
              </div>

              <a
                href={`upi://pay?pa=${UPI_ID}&pn=ThukkamTutor&am=${UPI_AMOUNT}&cu=INR&tn=ThukkamTutor%20Subscription`}
                className="w-full rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm py-3 flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <ExternalLink size={14} /> Open UPI App to Pay ₹50
              </a>

              <p className="text-[10px] text-muted-foreground text-center">
                After payment, share screenshot to confirm subscription activation
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
