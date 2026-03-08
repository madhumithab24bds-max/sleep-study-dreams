import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Moon, Globe, Bell, CreditCard, LogOut, ChevronRight,
  User, Vibrate, BarChart3, Clock, Palette, GraduationCap, BookOpen,
  Pencil, Check, X, IndianRupee, Copy, ExternalLink
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import logo from "@/assets/logo.png";

const languages = [
  { value: "tamil", label: "Tamil", flag: "🇮🇳" },
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "hindi", label: "Hindi", flag: "🇮🇳" },
  { value: "french", label: "French", flag: "🇫🇷" },
  { value: "spanish", label: "Spanish", flag: "🇪🇸" },
  { value: "japanese", label: "Japanese", flag: "🇯🇵" },
];

const grades = [
  "LKG", "UKG",
  ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`),
];

const professionalCourses = [
  { value: "bds", label: "BDS", emoji: "🦷" },
  { value: "mbbs", label: "MBBS", emoji: "🩺" },
  { value: "bed", label: "B.Ed", emoji: "🎓" },
  { value: "engineering", label: "Engineering", emoji: "⚙" },
  { value: "arts-science", label: "Arts & Science", emoji: "📖" },
  { value: "allied-health", label: "Allied Health Science", emoji: "🧬" },
  { value: "pharmacy", label: "Pharmacy", emoji: "💊" },
  { value: "nursing", label: "Nursing", emoji: "👩‍⚕" },
  { value: "physiotherapy", label: "Physiotherapy", emoji: "🏃" },
];

const themes = [
  { id: "night-blue", label: "Night Blue", emoji: "🌙", color: "from-[hsl(240,35%,15%)] to-[hsl(220,55%,25%)]" },
  { id: "lavender-calm", label: "Lavender Calm", emoji: "💜", color: "from-[hsl(260,40%,20%)] to-[hsl(280,45%,30%)]" },
  { id: "dream-white", label: "Dream White", emoji: "☁", color: "from-[hsl(240,20%,25%)] to-[hsl(240,15%,35%)]" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.35 } }),
};

interface ProfileScreenProps {
  onLanguageChange?: (lang: string) => void;
}

const ProfileScreen = ({ onLanguageChange }: ProfileScreenProps) => {
  const [name, setName] = useState("Student");
  const [username, setUsername] = useState("student_123");
  const [editingName, setEditingName] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [language, setLanguage] = useState("english");
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [vibrationOn, setVibrationOn] = useState(true);
  const [sleepReminderOn, setSleepReminderOn] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("night-blue");
  const [grade, setGrade] = useState("Class 10");
  const [course, setCourse] = useState("");
  const [plan] = useState("Basic ₹50/mo");
  const [showPayment, setShowPayment] = useState(false);

  const UPI_ID = "madhukrr2006@oksbi";
  const UPI_AMOUNT = "50";
  const UPI_QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${UPI_ID}&pn=ThukkamTutor&am=${UPI_AMOUNT}&cu=INR&tn=ThukkamTutor%20Subscription`)}`;

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success("UPI ID copied!");
  };

  const screenTimeData = [
    { label: "Study", value: 65, emoji: "📱" },
    { label: "Sleep AI", value: 45, emoji: "😴" },
    { label: "Break", value: 20, emoji: "☕" },
  ];
  const maxTime = Math.max(...screenTimeData.map((d) => d.value));

  const handleSave = (field: string) => {
    toast.success(`${field} updated`);
  };

  return (
    <div className="min-h-screen pb-28 pt-6 px-4 space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-2">
        <p className="text-xs text-muted-foreground font-display tracking-widest">🌙 ThukkamTutor</p>
        <h1 className="text-2xl font-display font-bold text-foreground">👤 Profile</h1>
      </motion.div>

      {/* User Card */}
      <motion.div
        className="glass-card p-5 flex items-center gap-4"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="relative">
          <img src={logo} alt="Avatar" className="w-16 h-16 rounded-2xl bg-muted glow-moonlight" />
          <span className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
            <Pencil size={12} />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-bold text-foreground text-lg truncate">{name}</h2>
          <p className="text-xs text-muted-foreground font-display">@{username}</p>
          <p className="text-xs text-primary font-display mt-1">{plan} · 5 day streak 🔥</p>
        </div>
      </motion.div>

      {/* Profile Settings */}
      <motion.div className="glass-card p-4 space-y-4" custom={1} initial="hidden" animate="visible" variants={sectionVariants}>
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <User size={16} className="text-primary" /> Profile Settings
        </h3>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-display">🪪 Name</label>
          <div className="flex gap-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editingName}
              className="bg-muted/50 border-border/50 text-foreground font-display h-9 text-sm rounded-xl"
            />
            <button
              onClick={() => {
                if (editingName) handleSave("Name");
                setEditingName(!editingName);
              }}
              className="glass-card px-3 flex items-center text-primary hover:text-foreground transition-colors"
            >
              {editingName ? <Check size={16} /> : <Pencil size={14} />}
            </button>
          </div>
        </div>

        {/* Username */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-display">👤 Username</label>
          <div className="flex gap-2">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!editingUsername}
              className="bg-muted/50 border-border/50 text-foreground font-display h-9 text-sm rounded-xl"
            />
            <button
              onClick={() => {
                if (editingUsername) handleSave("Username");
                setEditingUsername(!editingUsername);
              }}
              className="glass-card px-3 flex items-center text-primary hover:text-foreground transition-colors"
            >
              {editingUsername ? <Check size={16} /> : <Pencil size={14} />}
            </button>
          </div>
        </div>

        {/* Grade */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-display">🎓 Grade Selection</label>
          <Select value={grade} onValueChange={(v) => { setGrade(v); toast.success(`Grade set to ${v}`); }}>
            <SelectTrigger className="bg-muted/50 border-border/50 text-foreground font-display h-9 text-sm rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {grades.map((g) => (
                <SelectItem key={g} value={g} className="font-display text-sm">{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Course */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-display">📚 Course Selection</label>
          <Select value={course} onValueChange={(v) => { setCourse(v); toast.success(`Course: ${v}`); }}>
            <SelectTrigger className="bg-muted/50 border-border/50 text-foreground font-display h-9 text-sm rounded-xl">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {professionalCourses.map((c) => (
                <SelectItem key={c.value} value={c.value} className="font-display text-sm">
                  {c.emoji} {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* General Settings */}
      <motion.div className="glass-card p-4 space-y-1" custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
          <Settings size={16} className="text-primary" /> General Settings
        </h3>

        {/* Language */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-primary" />
            <span className="text-sm font-display text-foreground">Language</span>
          </div>
          <Select value={language} onValueChange={(v) => { setLanguage(v); onLanguageChange?.(v); toast.success(`Language: ${languages.find(l => l.value === v)?.label}`); }}>
            <SelectTrigger className="w-32 bg-muted/50 border-border/50 text-foreground font-display h-8 text-xs rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {languages.map((l) => (
                <SelectItem key={l.value} value={l.value} className="font-display text-sm">
                  {l.flag} {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border-t border-border/30" />

        {/* Notifications */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-primary" />
            <span className="text-sm font-display text-foreground">Notifications</span>
          </div>
          <Switch
            checked={notificationsOn}
            onCheckedChange={(v) => { setNotificationsOn(v); toast.success(`Notifications ${v ? "on" : "off"}`); }}
          />
        </div>

        <div className="border-t border-border/30" />

        {/* Vibration */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Vibrate size={18} className="text-primary" />
            <span className="text-sm font-display text-foreground">Vibration</span>
          </div>
          <Switch
            checked={vibrationOn}
            onCheckedChange={(v) => { setVibrationOn(v); toast.success(`Vibration ${v ? "on" : "off"}`); }}
          />
        </div>

        <div className="border-t border-border/30" />

        {/* Subscription */}
        <button
          onClick={() => toast.success("Manage subscription (demo)")}
          className="flex items-center justify-between py-3 w-full group"
        >
          <div className="flex items-center gap-3">
            <CreditCard size={18} className="text-primary" />
            <div className="text-left">
              <span className="text-sm font-display text-foreground block">Subscription</span>
              <span className="text-xs text-muted-foreground">Current: {plan}</span>
            </div>
          </div>
          <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </motion.div>

      {/* Screen Time */}
      <motion.div className="glass-card p-4" custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
          <BarChart3 size={16} className="text-primary" /> Screen Time Today
        </h3>
        <div className="space-y-3">
          {screenTimeData.map((item, idx) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs font-display">
                <span className="text-muted-foreground">{item.emoji} {item.label}</span>
                <span className="text-foreground">{item.value} min</span>
              </div>
              <div className="h-3 bg-muted/50 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    idx === 0 ? "bg-primary" : idx === 1 ? "bg-secondary" : "bg-accent"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / maxTime) * 100}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Sleep Reminder */}
      <motion.div className="glass-card p-4" custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-primary" />
            <div>
              <span className="text-sm font-display text-foreground block">Sleep Reminder</span>
              <span className="text-xs text-muted-foreground">"Time to prepare for sleep learning"</span>
            </div>
          </div>
          <Switch
            checked={sleepReminderOn}
            onCheckedChange={(v) => { setSleepReminderOn(v); toast.success(`Sleep reminder ${v ? "on" : "off"}`); }}
          />
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div className="glass-card p-4" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
          <Palette size={16} className="text-primary" /> Theme
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => { setSelectedTheme(theme.id); toast.success(`Theme: ${theme.label}`); }}
              className={`rounded-xl p-3 text-center transition-all ${
                selectedTheme === theme.id
                  ? "ring-2 ring-primary glow-primary"
                  : "ring-1 ring-border/30"
              }`}
            >
              <div className={`w-full h-10 rounded-lg bg-gradient-to-br ${theme.color} mb-2`} />
              <span className="text-lg">{theme.emoji}</span>
              <p className="text-[10px] text-muted-foreground font-display mt-1">{theme.label}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div className="grid grid-cols-2 gap-3" custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-primary">42h</p>
          <p className="text-xs text-muted-foreground font-display">Sleep Learning</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-secondary">156</p>
          <p className="text-xs text-muted-foreground font-display">Items Learned</p>
        </div>
      </motion.div>

      {/* Logout */}
      <motion.button
        onClick={() => toast.success("Logged out (demo)")}
        className="w-full glass-card p-4 flex items-center justify-center gap-3 text-destructive"
        custom={7}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        whileTap={{ scale: 0.97 }}
      >
        <LogOut size={18} />
        <span className="text-sm font-display font-semibold">Log Out</span>
      </motion.button>
    </div>
  );
};

export default ProfileScreen;
