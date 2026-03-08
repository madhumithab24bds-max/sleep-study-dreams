import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Play, Pause, RotateCcw, Volume2, VolumeX, Timer, Plus, X, ChevronDown, Music } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { revisionBySubject } from "@/lib/revisionData";
import { playAudio, stopAudio, updateVolume } from "@/lib/audioEngine";
import StudyMaterialUpload from "./StudyMaterialUpload";
import { Switch } from "./ui/switch";

const ALL_SUBJECTS = Object.keys(revisionBySubject);

const DURATION_OPTIONS = [
  { label: "15 min", seconds: 900 },
  { label: "30 min", seconds: 1800 },
  { label: "45 min", seconds: 2700 },
  { label: "1 hour", seconds: 3600 },
  { label: "2 hours", seconds: 7200 },
];

const BG_SOUND_OPTIONS = [
  { id: "alpha-waves", label: "Alpha Waves", emoji: "🧠", desc: "Relaxation & calm" },
  { id: "gamma-waves", label: "Gamma Waves", emoji: "⚡", desc: "Memory & focus" },
  { id: "white-noise", label: "White Noise", emoji: "📻", desc: "Blocks distractions" },
  { id: "ground-noise", label: "Ground Noise", emoji: "🌍", desc: "Deep rumble" },
  { id: "nature", label: "Nature Sounds", emoji: "🐦", desc: "Birds & forest" },
  { id: "rain", label: "Rain Sounds", emoji: "🌧️", desc: "Gentle rainfall" },
  { id: "sleep-music", label: "Sleep Music", emoji: "🎵", desc: "Soft chords" },
  { id: "deep-focus", label: "Deep Focus", emoji: "🎯", desc: "Theta waves + drone" },
  { id: "ocean", label: "Ocean Waves", emoji: "🌊", desc: "Wave patterns" },
  { id: "lullaby", label: "Lullaby", emoji: "🌙", desc: "Gentle melody" },
];

function buildRevisionScript(subjects: string[]): string[] {
  const lines: string[] = [];
  for (const subject of subjects) {
    const items = revisionBySubject[subject];
    if (!items || items.length === 0) continue;
    lines.push(`Now let's revise ${subject}.`);
    for (const item of items) {
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

  // Narration state
  const [narrationState, setNarrationState] = useState<"idle" | "playing" | "paused">("idle");
  const [volume, setVolume] = useState(50);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  // Background audio state
  const [bgEnabled, setBgEnabled] = useState(true);
  const [bgVolume, setBgVolume] = useState(20);
  const [bgSound, setBgSound] = useState("alpha-waves");
  const [showBgPicker, setShowBgPicker] = useState(false);

  const [durationIdx, setDurationIdx] = useState(1);
  const [customNote, setCustomNote] = useState("");
  const [uploadedText, setUploadedText] = useState("");

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const linesRef = useRef<string[]>([]);
  const playingRef = useRef(false);
  const resumeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preload voices
  useEffect(() => {
    const loadVoices = () => speechSynthesis.getVoices();
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    return () => { speechSynthesis.onvoiceschanged = null; };
  }, []);

  const duration = DURATION_OPTIONS[durationIdx];
  const currentBg = BG_SOUND_OPTIONS.find((s) => s.id === bgSound)!;

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

  // --- Background audio control ---
  useEffect(() => {
    if (bgEnabled && narrationState !== "idle") {
      playAudio(bgSound, bgVolume);
    } else {
      stopAudio();
    }
  }, [bgEnabled, bgSound, bgVolume, narrationState]);

  // --- Narration helpers ---
  const stopNarration = useCallback(() => {
    playingRef.current = false;
    speechSynthesis.cancel();
    if (timerRef.current) clearTimeout(timerRef.current);
    if (resumeIntervalRef.current) clearInterval(resumeIntervalRef.current);
    setNarrationState("idle");
    setProgress(0);
    setCurrentLineIdx(0);
    // Also stop background
    stopAudio();
  }, []);

  const speakLine = useCallback((lines: string[], index: number) => {
    if (!playingRef.current || index >= lines.length) {
      const elapsed = Date.now() - startTimeRef.current;
      if (playingRef.current && elapsed < duration.seconds * 1000) {
        speakLine(lines, 0);
        return;
      }
      stopNarration();
      toast.success("Audio learning session completed! 🎉");
      return;
    }

    const elapsed = Date.now() - startTimeRef.current;
    if (elapsed >= duration.seconds * 1000) {
      stopNarration();
      toast.success("Audio learning session completed! 🎉");
      return;
    }

    setCurrentLineIdx(index);
    setProgress(Math.min(100, (elapsed / (duration.seconds * 1000)) * 100));

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(lines[index]);
    utterance.volume = Math.max(0.1, Math.min(1, volume / 100));
    utterance.rate = 0.85;
    utterance.pitch = 1.05;

    const voices = speechSynthesis.getVoices();
    const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
    const femaleNames = ["samantha", "victoria", "karen", "fiona", "moira", "tessa", "zira", "susan", "female", "google us english", "google uk english female"];
    const femaleVoice = englishVoices.find((v) =>
      femaleNames.some((name) => v.name.toLowerCase().includes(name))
    );
    const chosenVoice = femaleVoice || englishVoices[0];
    if (chosenVoice) utterance.voice = chosenVoice;

    utterance.onend = () => {
      if (!playingRef.current) return;
      timerRef.current = setTimeout(() => speakLine(lines, index + 1), 800);
    };

    utterance.onerror = (e) => {
      console.warn("TTS error on line", index, e.error);
      if (!playingRef.current) return;
      timerRef.current = setTimeout(() => speakLine(lines, index + 1), 500);
    };

    utteranceRef.current = utterance;

    setTimeout(() => {
      if (playingRef.current) {
        speechSynthesis.speak(utterance);
      }
    }, 50);
  }, [volume, duration, stopNarration]);

  const buildLines = useCallback(() => {
    const lines: string[] = [];

    if (uploadedText.trim()) {
      lines.push("Let's begin with your uploaded study material.");
      const cleaned = uploadedText.replace(/\s+/g, " ").trim();
      const sentences = cleaned.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 2);
      if (sentences.length > 0) {
        let chunk = "";
        for (const sentence of sentences) {
          if (chunk.length + sentence.length > 150 && chunk.length > 0) {
            lines.push(chunk.trim());
            chunk = sentence;
          } else {
            chunk += (chunk ? " " : "") + sentence;
          }
        }
        if (chunk.trim()) lines.push(chunk.trim());
      }
      lines.push("That completes your uploaded material. Well done!");
    }

    const topicLines = buildRevisionScript(selectedTopics);
    lines.push(...topicLines);

    if (customNote.trim()) {
      lines.push("Now let's go through your personal study notes.");
      const sentences = customNote.split(/[.!?\n]+/).filter((s) => s.trim().length > 2);
      sentences.forEach((s) => lines.push(s.trim() + "."));
      lines.push("Those were your personal notes. Great job revising!");
    }

    return lines;
  }, [selectedTopics, customNote, uploadedText]);

  const startPlayback = useCallback(() => {
    const lines = buildLines();
    if (lines.length === 0) {
      toast.error("Please select topics, add notes, or upload study materials");
      return;
    }

    speechSynthesis.cancel();
    linesRef.current = lines;
    playingRef.current = true;
    startTimeRef.current = Date.now();
    setNarrationState("playing");
    setCurrentLineIdx(0);

    // Start background audio if enabled
    if (bgEnabled) {
      playAudio(bgSound, bgVolume);
    }

    // Chrome workaround
    resumeIntervalRef.current = setInterval(() => {
      if (speechSynthesis.speaking && speechSynthesis.paused) {
        speechSynthesis.resume();
      }
    }, 3000);

    speakLine(lines, 0);
    toast.success(`Audio learning started — ${lines.length} sections for ${duration.label}`);
  }, [buildLines, bgEnabled, bgSound, bgVolume, duration, speakLine]);

  const pauseNarration = useCallback(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
    }
    playingRef.current = false;
    if (timerRef.current) clearTimeout(timerRef.current);
    setNarrationState("paused");
  }, []);

  const resumeNarration = useCallback(() => {
    playingRef.current = true;
    setNarrationState("playing");

    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      // Re-speak from current line
      speakLine(linesRef.current, currentLineIdx);
    }

    // Restart background if enabled
    if (bgEnabled) {
      playAudio(bgSound, bgVolume);
    }
  }, [currentLineIdx, speakLine, bgEnabled, bgSound, bgVolume]);

  const replayNarration = useCallback(() => {
    speechSynthesis.cancel();
    if (timerRef.current) clearTimeout(timerRef.current);

    const lines = linesRef.current.length > 0 ? linesRef.current : buildLines();
    if (lines.length === 0) {
      toast.error("No content to replay");
      return;
    }

    linesRef.current = lines;
    playingRef.current = true;
    startTimeRef.current = Date.now();
    setNarrationState("playing");
    setCurrentLineIdx(0);
    setProgress(0);

    if (bgEnabled) {
      playAudio(bgSound, bgVolume);
    }

    speakLine(lines, 0);
    toast.success("Replaying from the beginning 🔄");
  }, [buildLines, bgEnabled, bgSound, bgVolume, speakLine]);

  // Progress updater
  useEffect(() => {
    if (narrationState !== "playing") return;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min(100, (elapsed / (duration.seconds * 1000)) * 100));
    }, 1000);
    return () => clearInterval(interval);
  }, [narrationState, duration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      playingRef.current = false;
      speechSynthesis.cancel();
      stopAudio();
      if (timerRef.current) clearTimeout(timerRef.current);
      if (resumeIntervalRef.current) clearInterval(resumeIntervalRef.current);
    };
  }, []);

  const isActive = narrationState !== "idle";

  return (
    <div className="space-y-4 mb-6">
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

        {/* Custom Study Notes */}
        <div className="space-y-2 mb-3">
          <label className="text-xs font-display text-muted-foreground">📝 What did you study today? (type or select)</label>
          <textarea
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="Type what you studied today... e.g. Photosynthesis process, Newton's 3rd law, French Revolution causes..."
            className="w-full px-3 py-2 rounded-xl bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground border border-border/30 outline-none font-display resize-none min-h-[60px] focus:border-primary/50 transition-colors"
            rows={2}
          />
        </div>

        {/* PDF/Image Upload */}
        <div className="mb-3">
          <StudyMaterialUpload onTextExtracted={setUploadedText} />
        </div>

        {/* Topic Selection */}
        <div className="space-y-2">
          <label className="text-xs font-display text-muted-foreground">📖 Or select from your subjects</label>

          {selectedTopics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTopics.map((topic) => (
                <span key={topic} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/15 text-primary text-xs font-display font-medium">
                  {topic}
                  <button onClick={() => removeTopic(topic)} className="hover:text-destructive"><X size={12} /></button>
                </span>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowTopicPicker(!showTopicPicker)}
            className="w-full flex items-center gap-2 p-3 rounded-xl border border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <Plus size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-display">Add subjects you studied</span>
            <ChevronDown size={14} className={`ml-auto text-muted-foreground transition-transform ${showTopicPicker ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {showTopicPicker && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
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
                      <button key={subject} onClick={() => addTopic(subject)} className="w-full text-left px-3 py-2 rounded-lg text-xs font-display text-foreground hover:bg-primary/10 transition-colors">
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

      {/* Narration Controls */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 space-y-4">
        {/* Progress bar */}
        {isActive && (
          <div className="space-y-2">
            <div className="w-full h-1.5 rounded-full bg-muted/30 overflow-hidden">
              <motion.div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
            </div>
            <p className="text-xs text-muted-foreground font-display text-center">
              🎧 {linesRef.current[currentLineIdx]?.slice(0, 60)}...
            </p>
          </div>
        )}

        {/* Play / Pause / Replay controls */}
        <div className="flex items-center justify-center gap-4">
          {/* Replay */}
          <motion.button
            onClick={replayNarration}
            whileTap={{ scale: 0.9 }}
            disabled={!isActive && linesRef.current.length === 0}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-muted/20 text-muted-foreground hover:bg-muted/40 disabled:opacity-30 transition-all"
            title="Replay from start"
          >
            <RotateCcw size={18} />
          </motion.button>

          {/* Main Play/Pause */}
          <motion.button
            onClick={() => {
              if (narrationState === "idle") startPlayback();
              else if (narrationState === "playing") pauseNarration();
              else resumeNarration();
            }}
            whileTap={{ scale: 0.9 }}
            animate={narrationState === "playing" ? { scale: [1, 1.05, 1] } : {}}
            transition={narrationState === "playing" ? { repeat: Infinity, duration: 2 } : { type: "spring", stiffness: 400 }}
            className={`w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-sm shadow-lg transition-all ${
              narrationState === "playing"
                ? "bg-destructive/20 text-destructive border-2 border-destructive/30"
                : "bg-primary/20 text-primary border-2 border-primary/30 hover:bg-primary/30"
            }`}
          >
            {narrationState === "playing" ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
          </motion.button>

          {/* Stop */}
          {isActive && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={stopNarration}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all"
              title="Stop"
            >
              <X size={18} />
            </motion.button>
          )}
        </div>

        {/* Background Sound Toggle + Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {bgEnabled ? <Volume2 size={14} className="text-secondary" /> : <VolumeX size={14} className="text-muted-foreground" />}
              <span className="text-xs font-display text-foreground">Background Audio</span>
            </div>
            <Switch checked={bgEnabled} onCheckedChange={setBgEnabled} />
          </div>

          {bgEnabled && (
            <>
              <button
                onClick={() => setShowBgPicker(!showBgPicker)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Music size={14} className="text-secondary" />
                  <span className="text-xs font-display text-foreground">Sound Type</span>
                </div>
                <span className="text-xs font-display text-muted-foreground">
                  {currentBg.emoji} {currentBg.label}
                </span>
              </button>

              <AnimatePresence>
                {showBgPicker && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="grid grid-cols-2 gap-1.5 p-1">
                      {BG_SOUND_OPTIONS.map((sound) => (
                        <button
                          key={sound.id}
                          onClick={() => { setBgSound(sound.id); setShowBgPicker(false); }}
                          className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all ${
                            bgSound === sound.id ? "bg-primary/20 border border-primary/30" : "bg-muted/10 hover:bg-muted/20 border border-transparent"
                          }`}
                        >
                          <span className="text-base">{sound.emoji}</span>
                          <div className="min-w-0">
                            <p className={`text-[11px] font-display font-medium truncate ${bgSound === sound.id ? "text-primary" : "text-foreground"}`}>
                              {sound.label}
                            </p>
                            <p className="text-[9px] text-muted-foreground truncate">{sound.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Background Volume */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{currentBg.emoji}</span>
                  <span className="text-xs font-display text-foreground">BG Volume</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="range" min={0} max={60} value={bgVolume} onChange={(e) => setBgVolume(Number(e.target.value))} className="w-20 accent-secondary" />
                  <span className="text-xs text-muted-foreground font-display w-8 text-right">{bgVolume}%</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Voice Volume */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Volume2 size={14} className="text-primary" />
            <span className="text-xs font-display text-foreground">Voice Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-20 accent-primary" />
            <span className="text-xs text-muted-foreground font-display w-8 text-right">{volume}%</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Timer size={14} className="text-secondary" />
            <span className="text-xs font-display text-foreground">Duration</span>
          </div>
          <div className="flex gap-1 flex-wrap justify-end">
            {DURATION_OPTIONS.map((opt, i) => (
              <button
                key={opt.label}
                onClick={() => setDurationIdx(i)}
                disabled={isActive}
                className={`px-2 py-1 rounded-md text-[10px] font-display transition-all ${
                  i === durationIdx ? "bg-primary/20 text-primary font-bold" : "text-muted-foreground hover:bg-muted/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AudioLearning;
