import { motion } from "framer-motion";
import { Settings, Moon, Globe, Bell, CreditCard, LogOut, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";

const menuItems = [
  { icon: Globe, label: "Language", value: "Tamil / English" },
  { icon: Bell, label: "Notifications", value: "On" },
  { icon: Moon, label: "Sleep Schedule", value: "10PM - 6AM" },
  { icon: CreditCard, label: "Subscription", value: "Basic ₹50/mo" },
  { icon: Settings, label: "Settings", value: "" },
];

const ProfileScreen = () => {
  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">👤 Profile</h1>

      {/* User Card */}
      <motion.div
        className="glass-card p-6 flex items-center gap-4 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <img src={logo} alt="Avatar" className="w-16 h-16 rounded-2xl bg-muted" />
        <div>
          <h2 className="font-display font-bold text-foreground">Student</h2>
          <p className="text-xs text-muted-foreground">Basic Plan · 5 day streak 🔥</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-primary">42h</p>
          <p className="text-xs text-muted-foreground font-display">Sleep Learning</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-secondary">156</p>
          <p className="text-xs text-muted-foreground font-display">Items Learned</p>
        </div>
      </div>

      {/* Dream Journal Preview */}
      <div className="glass-card p-4 mb-6">
        <h3 className="font-display font-semibold text-foreground mb-3">✍️ Dream Journal</h3>
        <div className="space-y-2">
          <div className="bg-muted/50 rounded-xl p-3">
            <p className="text-xs text-muted-foreground font-display">Mar 8, 2026</p>
            <p className="text-sm text-foreground mt-1">Dreamed about solving math equations in a galaxy... 🌌</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3">
            <p className="text-xs text-muted-foreground font-display">Mar 7, 2026</p>
            <p className="text-sm text-foreground mt-1">Tamil words were floating in clouds ☁️</p>
          </div>
        </div>
        <button className="w-full mt-3 py-2 rounded-xl border border-border text-sm font-display text-muted-foreground hover:text-foreground transition-colors">
          + Add Dream Entry
        </button>
      </div>

      {/* Menu */}
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="glass-card p-4 flex items-center gap-3 w-full group"
            >
              <Icon size={18} className="text-primary" />
              <span className="flex-1 text-sm font-display text-foreground text-left">{item.label}</span>
              {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
              <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          );
        })}
      </div>

      <button className="w-full mt-6 glass-card p-4 flex items-center gap-3 text-destructive">
        <LogOut size={18} />
        <span className="text-sm font-display font-semibold">Log Out</span>
      </button>
    </div>
  );
};

export default ProfileScreen;
