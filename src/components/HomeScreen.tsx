import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import nightSkyBg from "@/assets/night-sky-bg.jpg";
import { BookOpen, Moon, Brain, Target, Pen } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Study Before Sleep", desc: "Review vocabulary, formulas & concepts", emoji: "📖" },
  { icon: Moon, title: "Sleep Learning Mode", desc: "Gentle audio cues while you rest", emoji: "😴" },
  { icon: Brain, title: "Morning Memory Test", desc: "Quick quizzes to check retention", emoji: "🧠" },
  { icon: Pen, title: "Dream Journal", desc: "Record your dreams after waking", emoji: "✍️" },
  { icon: Target, title: "Exam Boost Mode", desc: "Intensive revision for exam prep", emoji: "🎯" },
];

const HomeScreen = () => {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-b-3xl">
        <img
          src={nightSkyBg}
          alt="Night sky"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        <div className="relative z-10 flex flex-col items-center pt-12 pb-10 px-6 text-center">
          <motion.img
            src={logo}
            alt="ThukkamTutor Logo"
            className="w-28 h-28 mb-4 drop-shadow-2xl"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.h1
            className="text-3xl font-display font-bold text-gradient-dream mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ThukkamTutor
          </motion.h1>
          <motion.p
            className="text-sm text-muted-foreground font-display italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            "Learn Smart… Even While You Sleep"
          </motion.p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="glass-card p-4 flex justify-around items-center glow-primary">
          <QuickAction emoji="😴" label="Sleep Now" />
          <QuickAction emoji="📖" label="Study" />
          <QuickAction emoji="🧠" label="Quiz" />
          <QuickAction emoji="🎯" label="Exam Boost" />
        </div>
      </div>

      {/* Features */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-display font-bold text-foreground mb-4">Core Features</h2>
        <div className="space-y-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card p-4 flex items-center gap-4"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-2xl shrink-0">
                {f.emoji}
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-display font-bold text-foreground mb-4">Powered By</h2>
        <div className="grid grid-cols-3 gap-3">
          <TechCard icon="🧠" label="AI Learning" />
          <TechCard icon="🎙" label="Audio Cues" />
          <TechCard icon="📱" label="Sensors" />
          <TechCard icon="📈" label="Tracker" />
          <TechCard icon="☁️" label="Cloud" />
          <TechCard icon="🔒" label="Secure" />
        </div>
      </div>

      {/* Pricing */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-display font-bold text-foreground mb-4">Subscription</h2>
        <motion.div
          className="glass-card p-6 text-center glow-moonlight"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-3xl mb-2">⭐</div>
          <h3 className="font-display font-bold text-lg text-foreground">Basic Plan</h3>
          <p className="text-3xl font-display font-bold text-primary my-2">₹50<span className="text-sm text-muted-foreground">/month</span></p>
          <div className="space-y-2 text-sm text-muted-foreground mt-4 text-left">
            <p>✅ Sleep Learning Mode</p>
            <p>✅ Memory Quizzes</p>
            <p>✅ Study Tracker</p>
            <p>✅ Dream Journal</p>
          </div>
          <button className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm transition hover:opacity-90">
            Start Free Trial
          </button>
        </motion.div>
      </div>

      {/* Pitch Section */}
      <div className="px-4 mt-8 mb-8">
        <div className="glass-card p-6">
          <h2 className="text-lg font-display font-bold text-gradient-dream mb-3">🚀 Why ThukkamTutor?</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              <span className="text-foreground font-semibold">The Problem:</span> Students forget 70% of what they study overnight. Traditional revision is time-consuming and exhausting.
            </p>
            <p>
              <span className="text-foreground font-semibold">Our Solution:</span> ThukkamTutor uses scientifically-backed sleep learning techniques — playing gentle audio cues during light sleep phases to reinforce memory consolidation.
            </p>
            <p>
              <span className="text-foreground font-semibold">Market:</span> 300M+ students in India alone. Sleep learning is a ₹500Cr untapped market.
            </p>
            <p>
              <span className="text-foreground font-semibold">Traction:</span> Built with AI-powered personalization, phone sensor integration, and Tamil/English bilingual support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ emoji, label }: { emoji: string; label: string }) => (
  <button className="flex flex-col items-center gap-1 group">
    <span className="text-2xl group-hover:scale-110 transition-transform">{emoji}</span>
    <span className="text-[10px] font-display font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
  </button>
);

const TechCard = ({ icon, label }: { icon: string; label: string }) => (
  <div className="glass-card p-3 flex flex-col items-center gap-1 text-center">
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] font-display font-semibold text-muted-foreground">{label}</span>
  </div>
);

export default HomeScreen;
