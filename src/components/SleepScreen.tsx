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



    </div>
  );
};

export default SleepScreen;
