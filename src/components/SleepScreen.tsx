import { motion } from "framer-motion";
import { Moon, Volume2, Timer, Play, Settings } from "lucide-react";
import { useState } from "react";

const SleepScreen = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 flex flex-col">
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">😴 Sleep Mode</h1>

      {/* Main Sleep Control */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <motion.div
          className="relative"
          animate={isActive ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {/* Outer glow rings */}
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
            onClick={() => setIsActive(!isActive)}
            className={`w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${
              isActive
                ? "bg-primary/20 glow-primary"
                : "glass-card hover:bg-primary/10"
            }`}
          >
            <Moon size={48} className={`mb-2 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
            <span className="font-display font-bold text-lg text-foreground">
              {isActive ? "Active" : "Start"}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {isActive ? "Tap to stop" : "Tap to begin"}
            </span>
          </button>
        </motion.div>

        {isActive && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-muted-foreground font-display">
              🎵 Playing soft audio cues...
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Monitoring sleep patterns via sensors
            </p>
          </motion.div>
        )}
      </div>

      {/* Settings */}
      <div className="space-y-3 mt-4">
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Volume2 size={18} className="text-primary" />
            <span className="text-sm font-display text-foreground">Volume</span>
          </div>
          <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="w-1/3 h-full rounded-full bg-primary" />
          </div>
        </div>
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Timer size={18} className="text-secondary" />
            <span className="text-sm font-display text-foreground">Duration</span>
          </div>
          <span className="text-sm text-muted-foreground font-display">8 hours</span>
        </div>
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings size={18} className="text-accent" />
            <span className="text-sm font-display text-foreground">Audio Type</span>
          </div>
          <span className="text-sm text-muted-foreground font-display">Whisper</span>
        </div>
      </div>
    </div>
  );
};

export default SleepScreen;
