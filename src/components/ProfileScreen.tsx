import { motion } from "framer-motion";
import { Settings, Moon, Globe, Bell, CreditCard, LogOut, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const ProfileScreen = () => {
  const [language, setLanguage] = useState<"Tamil" | "English">("English");
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [sleepSchedule, setSleepSchedule] = useState("10PM - 6AM");
  const [dreamEntries, setDreamEntries] = useState([
    { date: "Mar 8, 2026", text: "Dreamed about solving math equations in a galaxy... 🌌" },
    { date: "Mar 7, 2026", text: "Tamil words were floating in clouds ☁️" },
  ]);

  const addDreamEntry = () => {
    const today = new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
    const newEntry = {
      date: today,
      text: "I revised tonight and had a calm, focused dream session ✨",
    };

    setDreamEntries((prev) => [newEntry, ...prev]);
    toast.success("Dream entry added");
  };

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "English" ? "Tamil" : "English";
      toast.success(`Language set to ${next}`);
      return next;
    });
  };

  const toggleNotifications = () => {
    setNotificationsOn((prev) => {
      const next = !prev;
      toast.success(`Notifications ${next ? "enabled" : "disabled"}`);
      return next;
    });
  };

  const changeSleepSchedule = () => {
    setSleepSchedule((prev) => {
      const next = prev === "10PM - 6AM" ? "11PM - 7AM" : "10PM - 6AM";
      toast.success(`Sleep schedule updated to ${next}`);
      return next;
    });
  };

  const menuItems = [
    { icon: Globe, label: "Language", value: language === "English" ? "Tamil / English" : "தமிழ் / English", action: toggleLanguage },
    { icon: Bell, label: "Notifications", value: notificationsOn ? "On" : "Off", action: toggleNotifications },
    { icon: Moon, label: "Sleep Schedule", value: sleepSchedule, action: changeSleepSchedule },
    { icon: CreditCard, label: "Subscription", value: "Basic ₹50/mo", action: () => toast.success("Basic plan is active") },
    { icon: Settings, label: "Settings", value: "", action: () => toast.success("Settings opened (demo)") },
  ];

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">👤 Profile</h1>

      <motion.div className="glass-card p-6 flex items-center gap-4 mb-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <img src={logo} alt="Avatar" className="w-16 h-16 rounded-2xl bg-muted" />
        <div>
          <h2 className="font-display font-bold text-foreground">Student</h2>
          <p className="text-xs text-muted-foreground">Basic Plan · 5 day streak 🔥</p>
        </div>
      </motion.div>

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

      <div className="glass-card p-4 mb-6">
        <h3 className="font-display font-semibold text-foreground mb-3">✍️ Dream Journal</h3>
        <div className="space-y-2">
          {dreamEntries.slice(0, 3).map((entry) => (
            <div key={`${entry.date}-${entry.text}`} className="bg-muted/50 rounded-xl p-3">
              <p className="text-xs text-muted-foreground font-display">{entry.date}</p>
              <p className="text-sm text-foreground mt-1">{entry.text}</p>
            </div>
          ))}
        </div>
        <button
          onClick={addDreamEntry}
          className="w-full mt-3 py-2 rounded-xl border border-border text-sm font-display text-muted-foreground hover:text-foreground transition-colors"
        >
          + Add Dream Entry
        </button>
      </div>

      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} onClick={item.action} className="glass-card p-4 flex items-center gap-3 w-full group">
              <Icon size={18} className="text-primary" />
              <span className="flex-1 text-sm font-display text-foreground text-left">{item.label}</span>
              {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
              <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          );
        })}
      </div>

      <button
        onClick={() => toast.success("Logged out (demo)")}
        className="w-full mt-6 glass-card p-4 flex items-center gap-3 text-destructive"
      >
        <LogOut size={18} />
        <span className="text-sm font-display font-semibold">Log Out</span>
      </button>
    </div>
  );
};

export default ProfileScreen;
