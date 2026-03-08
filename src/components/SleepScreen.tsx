import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { playAudio, stopAudio } from "@/lib/audioEngine";
import { subjectAudioMap } from "@/lib/quizData";
import AudioLearning from "./AudioLearning";

const audioTypes = [
  { id: "whisper", label: "Whisper", emoji: "🤫" },
  { id: "rain", label: "Rain Sounds", emoji: "🌧️" },
  { id: "ocean", label: "Ocean Waves", emoji: "🌊" },
  { id: "wind", label: "Wind", emoji: "🍃" },
  { id: "nature", label: "Nature", emoji: "🐦" },
  { id: "white-noise", label: "White Noise", emoji: "📻" },
  { id: "lullaby", label: "Lullaby", emoji: "🎵" },
  { id: "alpha-waves", label: "Alpha Waves", emoji: "🧠" },
  { id: "gamma-waves", label: "Gamma Waves", emoji: "⚡" },
  { id: "ground-noise", label: "Ground Noise", emoji: "🌍" },
  { id: "sleep-music", label: "Sleep Music", emoji: "🎶" },
  { id: "deep-focus", label: "Deep Focus", emoji: "🎯" },
];

interface SleepScreenProps {
  selectedSubject?: string | null;
}

const SleepScreen = ({ selectedSubject }: SleepScreenProps) => {
  const [isActive, setIsActive] = useState(false);
  const [volume] = useState(35);

  const defaultAudio = useMemo(() => {
    if (selectedSubject && subjectAudioMap[selectedSubject]) {
      return subjectAudioMap[selectedSubject];
    }
    return "whisper";
  }, [selectedSubject]);

  const [selectedAudio, setSelectedAudio] = useState(defaultAudio);

  useEffect(() => {
    if (selectedSubject && subjectAudioMap[selectedSubject]) {
      setSelectedAudio(subjectAudioMap[selectedSubject]);
    }
  }, [selectedSubject]);

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

  useEffect(() => {
    if (isActive) {
      playAudio(selectedAudio, volume);
    }
  }, [selectedAudio, volume, isActive]);

  useEffect(() => {
    return () => stopAudio();
  }, []);

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 flex flex-col">
      <h1 className="text-2xl font-display font-bold text-foreground mb-4">😴 Sleep Mode</h1>

      <AudioLearning />

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
    </div>
  );
};

export default SleepScreen;
