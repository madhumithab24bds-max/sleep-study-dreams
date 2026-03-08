import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Play, Pause, Volume2, Timer, Plus, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { revisionBySubject } from "@/lib/revisionData";
import { loadVoiceSettings, type VoiceGender } from "@/lib/voiceEngine";
import { playAudio, stopAudio } from "@/lib/audioEngine";

const ALL_SUBJECTS = Object.keys(revisionBySubject);

const DURATION_OPTIONS = [
  { label: "10 min", seconds: 600 },
  { label: "20 min", seconds: 1200 },
  { label: "30 min", seconds: 1800 },
  { label: "45 min", seconds: 2700 },
  { label: "1 hour", seconds: 3600 },
];

function buildRevisionScript(subjects: string[]): string[] {
  const lines: string[] = [];
  for (const subject of subjects) {
    const items = revisionBySubject[subject];
    if (!items || items.length === 0) continue;
    lines.push(`Now let's revise ${subject}.`);
    for (const item of items) {
      // Clean emoji from back text for cleaner TTS
      const cleanBack = item.back.replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]/gu, "").trim();
      const cleanFront = item.front.replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]/gu, "").trim();
      if (cleanFront.includes("?") || cleanFront.includes("=")) {
        lines.push(`${cleanFront} The answer is: ${cleanBack}.`);
      } else {
        lines.push(`${cleanFront}. ${cleanBack}.`);
      }
    }
    lines.push(`That completes ${subject}. Great job remembering!`);
  }
  return lines;
}

const AudioLearning = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showTopicPicker, setShowTopicPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [bgVolume, setBgVolume] = useState(20);
  const [durationIdx, setDurationIdx] = useState(1);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const linesRef = useRef<string[]>([]);
  const playingRef = useRef(false);

  const duration = DURATION_OPTIONS[durationIdx];

  const filteredSubjects = ALL_SUBJECTS.filter(
    (s) => s.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedTopics.includes(s)
  );

  const addTopic = (topic: string) => {
    setSelectedTopics((prev) => [...prev, topic]);
    setSearchQuery("");
  };

  const removeTopic = (topic: string) => {
    setSelectedTopics((prev) => prev.filter((t) => t !== topic));
  };

  const stopPlayback = useCallback(() => {
    playingRef.current = false;
    speechSynthesis.cancel();
    stopAudio();
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsPlaying(false);
    setProgress(0);
    setCurrentLineIdx(0);
  }, []);

  const speakLine = useCallback((lines: string[], index: number) => {
    if (!playingRef.current || index >= lines.length) {
      // Loop back if still within duration
      const elapsed = Date.now() - startTimeRef.current;
      if (playingRef.current && elapsed < duration.seconds * 1000) {
        speakLine(lines, 0);
        return;
      }
      stopPlayback();
      toast.success("Audio learning session completed! 🎉");
      return;
    }

    const elapsed = Date.now() - startTimeRef.current;
    if (elapsed >= duration.seconds * 1000) {
      stopPlayback();
      toast.success("Audio learning session completed! 🎉");
      return;
    }

    setCurrentLineIdx(index);
    setProgress(Math.min(100, (elapsed / (duration.seconds * 1000)) * 100));

    const voiceSettings = loadVoiceSettings();
    const utterance = new SpeechSynthesisUtterance(lines[index]);
    utterance.volume = Math.max(0, Math.min(1, volume / 100));
    utterance.rate = 0.85; // Slow and calm for sleep
    utterance.pitch = voiceSettings.gender === "female" ? 1.05 : 0.85;

    // Try to pick a voice
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith("en"));
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onend = () => {
      if (!playingRef.current) return;
      // Pause between lines for relaxation
      timerRef.current = setTimeout(() => {
        speakLine(lines, index + 1);
      }, 1500);
    };

    utterance.onerror = () => {
      if (!playingRef.current) return;
      timerRef.current = setTimeout(() => {
        speakLine(lines, index + 1);
      }, 1000);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [volume, duration, stopPlayback]);

  const startPlayback = useCallback(() => {
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic to revise");
      return;
    }

    const lines = buildRevisionScript(selectedTopics);
    if (lines.length === 0) {
      toast.error("No revision content available for selected topics");
      return;
    }

    linesRef.current = lines;
    playingRef.current = true;
    startTimeRef.current = Date.now();
    setIsPlaying(true);
    setCurrentLineIdx(0);

    // Start soft background music
    playAudio("lullaby", bgVolume);

    // Begin speaking after a short delay
    setTimeout(() => {
      speakLine(lines, 0);
    }, 2000);

    toast.success(`Audio learning started for ${duration.label}`);
  }, [selectedTopics, bgVolume, duration, speakLine]);

  // Update background volume while playing
  useEffect(() => {
    if (isPlaying) {
      playAudio("lullaby", bgVolume);
    }
  }, [bgVolume, isPlaying]);

  // Progress updater
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min(100, (elapsed / (duration.seconds * 1000)) * 100));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      playingRef.current = false;
      speechSynthesis.cancel();
      stopAudio();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <BookOpen size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-display font-bold text-foreground">📚 Audio Learning</h3>
            <p className="text-xs text-muted-foreground">Revise today's topics while you sleep</p>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="space-y-2">
          <label className="text-xs font-display text-muted-foreground">What did you study today?</label>

          {/* Selected topics */}
          {selectedTopics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTopics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/15 text-primary text-xs font-display font-medium"
                >
                  {topic}
                  <button onClick={() => removeTopic(topic)} className="hover:text-destructive">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add topic button */}
          <button
            onClick={() => setShowTopicPicker(!showTopicPicker)}
            className="w-full flex items-center gap-2 p-3 rounded-xl border border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <Plus size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-display">Add topics you studied</span>
            <ChevronDown size={14} className={`ml-auto text-muted-foreground transition-transform ${showTopicPicker ? "rotate-180" : ""}`} />
          </button>

          {/* Topic picker dropdown */}
          <AnimatePresence>
            {showTopicPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-border/50 bg-card/50 p-2 space-y-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search subjects..."
                    className="w-full px-3 py-2 rounded-lg bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground border-none outline-none font-display"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    {filteredSubjects.slice(0, 15).map((subject) => (
                      <button
                        key={subject}
                        onClick={() => addTopic(subject)}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-display text-foreground hover:bg-primary/10 transition-colors"
                      >
                        {subject}
                      </button>
                    ))}
                    {filteredSubjects.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-2 font-display">No subjects found</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Play/Pause Control */}
      {selectedTopics.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 space-y-4">
          {/* Progress bar */}
          {isPlaying && (
            <div className="space-y-2">
              <div className="w-full h-1.5 rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-muted-foreground font-display text-center">
                🎧 Reading: {linesRef.current[currentLineIdx]?.slice(0, 60)}...
              </p>
            </div>
          )}

          {/* Play button */}
          <button
            onClick={isPlaying ? stopPlayback : startPlayback}
            className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl font-display font-bold text-sm transition-all ${
              isPlaying
                ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? "Stop Audio Learning" : "Start Audio Learning"}
          </button>

          {/* Controls */}
          <div className="space-y-3">
            {/* Voice Volume */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Volume2 size={14} className="text-primary" />
                <span className="text-xs font-display text-foreground">Voice</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 accent-primary"
                />
                <span className="text-xs text-muted-foreground font-display w-8 text-right">{volume}%</span>
              </div>
            </div>

            {/* Background Music Volume */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎵</span>
                <span className="text-xs font-display text-foreground">Music</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={bgVolume}
                  onChange={(e) => setBgVolume(Number(e.target.value))}
                  className="w-20 accent-secondary"
                />
                <span className="text-xs text-muted-foreground font-display w-8 text-right">{bgVolume}%</span>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Timer size={14} className="text-secondary" />
                <span className="text-xs font-display text-foreground">Duration</span>
              </div>
              <div className="flex gap-1">
                {DURATION_OPTIONS.map((opt, i) => (
                  <button
                    key={opt.label}
                    onClick={() => setDurationIdx(i)}
                    disabled={isPlaying}
                    className={`px-2 py-1 rounded-md text-[10px] font-display transition-all ${
                      i === durationIdx
                        ? "bg-primary/20 text-primary font-bold"
                        : "text-muted-foreground hover:bg-muted/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AudioLearning;
