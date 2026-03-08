import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Settings, Globe, Bell, LogOut,
  User, Vibrate, Clock, Palette, Pencil, Check, Smartphone, Camera, X
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import logo from "@/assets/logo.png";
import { themes, applyTheme, loadSavedTheme } from "@/lib/themeEngine";

const languages = [
  { value: "tamil", label: "Tamil", flag: "🇮🇳" },
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "hindi", label: "Hindi", flag: "🇮🇳" },
  { value: "french", label: "French", flag: "🇫🇷" },
  { value: "spanish", label: "Spanish", flag: "🇪🇸" },
  { value: "japanese", label: "Japanese", flag: "🇯🇵" },
];

const academicLevels = [
  { group: "School", items: [
    "LKG", "UKG",
    ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`),
  ]},
  { group: "Professional Courses", items: [
    "🦷 BDS", "🩺 MBBS", "🎓 B.Ed", "⚙ Engineering",
    "📖 Arts & Science", "🧬 Allied Health Science",
    "💊 Pharmacy", "👩‍⚕ Nursing", "🏃 Physiotherapy",
  ]},
];

const presetAvatars = [
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Felix",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Luna",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Mia",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Leo",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Zoe",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Max",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Bella",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Sam",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Aria",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Kai",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Nova",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Finn",
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
  const [selectedTheme, setSelectedTheme] = useState(loadSavedTheme());
  const [academicLevel, setAcademicLevel] = useState("Class 10");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    applyTheme(selectedTheme);
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("display_name, username, academic_level, language, avatar_url")
          .eq("user_id", session.user.id)
          .maybeSingle();
        if (data) {
          if (data.display_name) setName(data.display_name);
          if (data.username) setUsername(data.username);
          if (data.academic_level) setAcademicLevel(data.academic_level);
          if (data.language) { setLanguage(data.language); onLanguageChange?.(data.language); }
          if (data.avatar_url) setAvatarUrl(data.avatar_url);
        }
      }
    };
    loadProfile();
  }, []);

  const handleSave = async (field: string, value: string, column: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    const { error } = await supabase.from("profiles").update({ [column]: value }).eq("user_id", session.user.id);
    if (error) { toast.error(`Failed to update ${field}`); return; }
    toast.success(`${field} updated`);
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    applyTheme(themeId);
    const t = themes.find(th => th.id === themeId);
    toast.success(`Theme: ${t?.label}`);
  };

  const selectAvatar = async (url: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: url })
      .eq("user_id", session.user.id);
    if (error) { toast.error("Failed to update avatar"); return; }
    setAvatarUrl(url);
    setShowAvatarPicker(false);
    toast.success("Avatar updated!");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    setUploadingAvatar(true);
    const ext = file.name.split(".").pop();
    const path = `${session.user.id}/avatar.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) { toast.error("Upload failed"); setUploadingAvatar(false); return; }
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = urlData.publicUrl + "?t=" + Date.now();
    await selectAvatar(publicUrl);
    setUploadingAvatar(false);
  };

  return (
    <div className="min-h-screen pb-28 pt-6 px-4 space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-2">
        <p className="text-xs text-muted-foreground font-display tracking-widest">🌙 ThookamTutor</p>
        <h1 className="text-2xl font-display font-bold text-foreground">👤 Profile</h1>
      </motion.div>

      {/* User Card */}
      <motion.div className="glass-card p-5 flex items-center gap-4" custom={0} initial="hidden" animate="visible" variants={sectionVariants}>
        <button className="relative" onClick={() => setShowAvatarPicker(true)}>
          <img src={avatarUrl || logo} alt="Avatar" className="w-16 h-16 rounded-2xl bg-muted glow-moonlight object-cover" />
          <span className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
            <Camera size={12} />
          </span>
        </button>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-bold text-foreground text-lg truncate">{name}</h2>
          <p className="text-xs text-muted-foreground font-display">@{username}</p>
          <p className="text-xs text-primary font-display mt-1">5 day streak 🔥</p>
        </div>
      </motion.div>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => setShowAvatarPicker(false)}
        >
          <motion.div
            className="glass-card w-full max-w-sm p-5 space-y-4 relative max-h-[70vh] overflow-y-auto"
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground">Choose Avatar</h3>
              <button onClick={() => setShowAvatarPicker(false)} className="text-muted-foreground"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {presetAvatars.map((url) => (
                <button
                  key={url}
                  onClick={() => selectAvatar(url)}
                  className={`rounded-2xl p-1 border-2 transition-all ${avatarUrl === url ? "border-primary glow-primary" : "border-transparent hover:border-border"}`}
                >
                  <img src={url} alt="Avatar option" className="w-full aspect-square rounded-xl bg-muted" />
                </button>
              ))}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="w-full glass-card p-3 flex items-center justify-center gap-2 text-sm font-display font-semibold text-primary"
            >
              <Camera size={16} /> {uploadingAvatar ? "Uploading…" : "Upload Your Photo"}
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Profile Settings */}
      <motion.div className="glass-card p-4 space-y-4" custom={1} initial="hidden" animate="visible" variants={sectionVariants}>
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <User size={16} className="text-primary" /> Profile Settings
        </h3>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-display">🪪 Name</label>
          <div className="flex gap-2">
            <Input value={name} onChange={(e) => setName(e.target.value)} disabled={!editingName}
              className="bg-muted/50 border-border/50 text-foreground font-display h-9 text-sm rounded-xl" />
            <button onClick={() => { if (editingName) handleSave("Name", name, "display_name"); setEditingName(!editingName); }}
              className="glass-card px-3 flex items-center text-primary hover:text-foreground transition-colors">
              {editingName ? <Check size={16} /> : <Pencil size={14} />}
            </button>
          </div>
        </div>

        {/* Username */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-display">👤 Username</label>
          <div className="flex gap-2">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} disabled={!editingUsername}
              className="bg-muted/50 border-border/50 text-foreground font-display h-9 text-sm rounded-xl" />
            <button onClick={() => { if (editingUsername) handleSave("Username", username, "username"); setEditingUsername(!editingUsername); }}
              className="glass-card px-3 flex items-center text-primary hover:text-foreground transition-colors">
              {editingUsername ? <Check size={16} /> : <Pencil size={14} />}
            </button>
          </div>
        </div>

        {/* Combined Academic Level (Grade + Course) */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-display">🎓 Grade / Course</label>
          <Select value={academicLevel} onValueChange={(v) => { setAcademicLevel(v); handleSave("Grade", v, "academic_level"); }}>
            <SelectTrigger className="bg-muted/50 border-border/50 text-foreground font-display h-9 text-sm rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border max-h-64">
              {academicLevels.map((group) => (
                <div key={group.group}>
                  <p className="px-2 py-1.5 text-[10px] font-display font-bold text-muted-foreground uppercase tracking-wider">{group.group}</p>
                  {group.items.map((item) => (
                    <SelectItem key={item} value={item} className="font-display text-sm">{item}</SelectItem>
                  ))}
                </div>
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
          <Select value={language} onValueChange={(v) => { setLanguage(v); onLanguageChange?.(v); handleSave("Language", v, "language"); }}>
            <SelectTrigger className="w-32 bg-muted/50 border-border/50 text-foreground font-display h-8 text-xs rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {languages.map((l) => (
                <SelectItem key={l.value} value={l.value} className="font-display text-sm">{l.flag} {l.label}</SelectItem>
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
          <Switch checked={notificationsOn} onCheckedChange={(v) => { setNotificationsOn(v); toast.success(`Notifications ${v ? "on" : "off"}`); }} />
        </div>

        <div className="border-t border-border/30" />

        {/* Vibration */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Vibrate size={18} className="text-primary" />
            <span className="text-sm font-display text-foreground">Vibration</span>
          </div>
          <Switch checked={vibrationOn} onCheckedChange={(v) => { setVibrationOn(v); toast.success(`Vibration ${v ? "on" : "off"}`); }} />
        </div>
      </motion.div>

      {/* Screen Time */}
      <motion.div className="glass-card p-4" custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
          <Smartphone size={16} className="text-primary" /> Screen Time
        </h3>
        <div className="glass-card bg-muted/30 p-4 rounded-xl text-center space-y-2">
          <Smartphone size={28} className="mx-auto text-muted-foreground" />
          <p className="text-xs text-muted-foreground font-display">
            Screen time data requires the native mobile app. Install this app on your device to track usage automatically from your phone's Digital Wellbeing / Screen Time settings.
          </p>
          <p className="text-[10px] text-primary font-display font-semibold">Coming soon with native app</p>
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
          <Switch checked={sleepReminderOn} onCheckedChange={(v) => { setSleepReminderOn(v); toast.success(`Sleep reminder ${v ? "on" : "off"}`); }} />
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div className="glass-card p-4" custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
          <Palette size={16} className="text-primary" /> Theme
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`rounded-xl p-2 text-center transition-all ${
                selectedTheme === theme.id ? "ring-2 ring-primary glow-primary" : "ring-1 ring-border/30"
              }`}
            >
              <div className={`w-full h-8 rounded-lg bg-gradient-to-br ${theme.preview} mb-1.5`} />
              <span className="text-sm">{theme.emoji}</span>
              <p className="text-[9px] text-muted-foreground font-display mt-0.5 leading-tight">{theme.label}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Logout */}
      <motion.button
        onClick={async () => {
          await supabase.auth.signOut();
          toast.success("Logged out successfully");
        }}
        className="w-full glass-card p-4 flex items-center justify-center gap-3 text-destructive"
        custom={6} initial="hidden" animate="visible" variants={sectionVariants}
        whileTap={{ scale: 0.97 }}
      >
        <LogOut size={18} />
        <span className="text-sm font-display font-semibold">Log Out</span>
      </motion.button>
    </div>
  );
};

export default ProfileScreen;
