import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import nightSkyBg from "@/assets/night-sky-bg.jpg";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

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

const languages = [
  { value: "tamil", label: "Tamil", flag: "🇮🇳" },
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "hindi", label: "Hindi", flag: "🇮🇳" },
  { value: "french", label: "French", flag: "🇫🇷" },
  { value: "spanish", label: "Spanish", flag: "🇪🇸" },
  { value: "japanese", label: "Japanese", flag: "🇯🇵" },
];

interface ProfileSetupProps {
  userId: string;
  defaultName: string;
  onComplete: () => void;
}

const ProfileSetup = ({ userId, defaultName, onComplete }: ProfileSetupProps) => {
  const [displayName, setDisplayName] = useState(defaultName);
  const [username, setUsername] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [language, setLanguage] = useState("english");
  const [saving, setSaving] = useState(false);

  const handleComplete = async () => {
    if (!displayName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!username.trim()) {
      toast.error("Please choose a username");
      return;
    }
    if (!academicLevel) {
      toast.error("Please select your grade / course");
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName.trim(),
        username: username.trim(),
        academic_level: academicLevel,
        language,
        profile_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (error) {
      // Profile may not exist yet (trigger race condition), try insert
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          user_id: userId,
          display_name: displayName.trim(),
          username: username.trim(),
          academic_level: academicLevel,
          language,
          profile_completed: true,
        });
      if (insertError) {
        toast.error("Failed to save profile: " + insertError.message);
        setSaving(false);
        return;
      }
    }

    toast.success("Profile complete! Welcome aboard 🎉");
    onComplete();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={nightSkyBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 py-10 max-w-sm w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={logo}
          alt="ThookamTutor"
          className="mb-4 h-20 w-20 drop-shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        <h1 className="text-2xl font-display font-bold text-foreground mb-1">Complete Your Profile</h1>
        <p className="text-xs text-muted-foreground mb-6">Tell us about yourself to get started</p>

        <div className="glass-card glow-primary w-full p-5 space-y-4">
          {/* Display Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-display font-semibold text-muted-foreground">Your Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
              className="w-full rounded-xl border border-border/30 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-display font-semibold text-muted-foreground">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase())}
              placeholder="choose_a_username"
              maxLength={30}
              className="w-full rounded-xl border border-border/30 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Grade / Course */}
          <div className="space-y-1.5">
            <label className="text-xs font-display font-semibold text-muted-foreground">Grade / Course</label>
            <Select value={academicLevel} onValueChange={setAcademicLevel}>
              <SelectTrigger className="w-full rounded-xl border-border/30 bg-card">
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent>
                {academicLevels.map((group) => (
                  <div key={group.group}>
                    <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground">{group.group}</div>
                    {group.items.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <label className="text-xs font-display font-semibold text-muted-foreground">Preferred Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full rounded-xl border-border/30 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.flag} {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={handleComplete}
            disabled={saving}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-display font-bold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Get Started 🚀"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
