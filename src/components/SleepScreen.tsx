import { motion } from "framer-motion";
import { Moon, Volume2, Timer, Settings, Music, CloudRain, Waves, Wind, Bird, Radio } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { playAudio, stopAudio } from "@/lib/audioEngine";

const audioTypes = [
  { id: "whisper", label: "Whisper", icon: Volume2, emoji: "🤫" },
  { id: "rain", label: "Rain Sounds", icon: CloudRain, emoji: "🌧️" },
  { id: "ocean", label: "Ocean Waves", icon: Waves, emoji: "🌊" },
  { id: "wind", label: "Wind", icon: Wind, emoji: "🍃" },
  { id: "nature", label: "Nature", icon: Bird, emoji: "🐦" },
  { id: "white-noise", label: "White Noise", icon: Radio, emoji: "📻" },
  { id: "lullaby", label: "Lullaby", icon: Music, emoji: "🎵" },
];

const durationOptions = ["30 min", "1 hour", "2 hours", "4 hours", "8 hours"];

const SleepScreen = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState("whisper");
  const [showAudioPicker, setShowAudioPicker] = useState(false);
  const [volume, setVolume] = useState(35);
  const [durationIndex, setDurationIndex] = useState(4);

  const currentAudio = audioTypes.find((a) => a.id === selectedAudio)!;

  const startAudio = useCallback(() => {
    playAudio(selectedAudio, volume);
  }, [selectedAudio, volume]);

  const handleSleepToggle = () => {
    const nextState = !isActive;
    setIsActive(nextState);
    if (nextState) {
      startAudio();
      toast.success(`Sleep mode started with ${currentAudio.label}`);
    } else {
      stopAudio();
      toast.success("Sleep mode stopped");
    }
  };

  // Update audio when volume or type changes while active
  useEffect(() => {
    if (isActive) {
      playAudio(selectedAudio, volume);
    }
  }, [selectedAudio, volume, isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAudio();
  }, []);

  const handleDurationCycle = () => {
    setDurationIndex((prev) => {
      const next = (prev + 1) % durationOptions.length;
      toast.success(`Duration set to ${durationOptions[next]}`);
      return next;
    });
  };

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 flex flex-col">
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">😴 Sleep Mode</h1>

      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <motion.div
          className="relative"
          animate={isActive ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {isActive && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                style={{ margin: "-20px" }}
                animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                style={{ margin: "-20px" }}
                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
            </>
          )}
          <button
            onClick={handleSleepToggle}
            className={`w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${
              isActive ? "bg-primary/20 glow-primary" : "glass-card hover:bg-primary/10"
            }`}
          >
            <Moon size={48} className={`mb-2 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
            <span className="font-display font-bold text-lg text-foreground">{isActive ? "Active" : "Start"}</span>
            <span className="text-xs text-muted-foreground mt-1">{isActive ? "Tap to stop" : "Tap to begin"}</span>
          </button>
        </motion.div>

        {isActive && (
          <motion.div className="mt-8 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm text-muted-foreground font-display">
              {currentAudio.emoji} Playing {currentAudio.label}...
            </p>
            <p className="text-xs text-muted-foreground mt-1">🔊 Audio is playing through your speakers</p>
          </motion.div>
        )}
      </div>

      <div className="space-y-3 mt-4">
        <div className="glass-card p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Volume2 size={18} className="text-primary" />
            <span className="text-sm font-display text-foreground">Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 accent-primary"
            />
            <span className="text-xs text-muted-foreground font-display w-9 text-right">{volume}%</span>
          </div>
        </div>

        <button onClick={handleDurationCycle} className="glass-card p-4 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Timer size={18} className="text-secondary" />
            <span className="text-sm font-display text-foreground">Duration</span>
          </div>
          <span className="text-sm text-muted-foreground font-display">{durationOptions[durationIndex]}</span>
        </button>

        <button onClick={() => setShowAudioPicker(!showAudioPicker)} className="glass-card p-4 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Settings size={18} className="text-accent" />
            <span className="text-sm font-display text-foreground">Audio Type</span>
          </div>
          <span className="text-sm text-muted-foreground font-display">
            {currentAudio.emoji} {currentAudio.label}
          </span>
        </button>

        {showAudioPicker && (
          <motion.div className="glass-card p-3 space-y-1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            {audioTypes.map((audio) => {
              const Icon = audio.icon;
              const isSelected = selectedAudio === audio.id;
              return (
                <button
                  key={audio.id}
                  onClick={() => {
                    setSelectedAudio(audio.id);
                    setShowAudioPicker(false);
                    toast.success(`${audio.label} selected`);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isSelected ? "bg-primary/20 border border-primary/30" : "hover:bg-muted/50"
                  }`}
                >
                  <span className="text-lg">{audio.emoji}</span>
                  <Icon size={16} className={isSelected ? "text-primary" : "text-muted-foreground"} />
                  <span className={`text-sm font-display ${isSelected ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                    {audio.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SleepScreen;
