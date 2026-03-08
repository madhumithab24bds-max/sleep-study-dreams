import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, GraduationCap, BookOpen, School, Languages } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import RevisionView from "./RevisionView";
import { indianGrades, type Board, type Medium, type Grade, type Subject } from "@/lib/indianSyllabus";

interface StudyScreenProps {
  onCourseChange?: (courseId: string) => void;
  onSubjectChange?: (subject: string | null) => void;
  onSubjectStudied?: (subject: string) => void;
  language?: string;
}

const boardIcons: Record<Board, { emoji: string; en: string; ta: string }> = {
  state: { emoji: "🏛️", en: "State Board", ta: "மாநில வாரியம்" },
  cbse: { emoji: "🇮🇳", en: "CBSE", ta: "CBSE" },
};

const StudyScreen = ({ onCourseChange, onSubjectChange, onSubjectStudied, language: profileLang }: StudyScreenProps) => {
  const [board, setBoard] = useState<Board>("state");
  const [medium, setMedium] = useState<Medium>((profileLang === "tamil" ? "tamil" : "english") as Medium);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [revisionSubject, setRevisionSubject] = useState<string | null>(null);

  const lang = medium === "tamil" ? "ta" : "en";
  const currentGrade = indianGrades.find((g) => g.id === selectedGrade);
  const subjects = currentGrade ? currentGrade.subjects[board] : [];

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade.id);
    setExpandedSubject(null);
    onCourseChange?.(grade.id);
    onSubjectChange?.(null);
    toast.success(medium === "tamil" ? `${grade.ta} தேர்ந்தெடுக்கப்பட்டது` : `${grade.en} selected`);
  };

  const handleSubjectClick = (subject: Subject) => {
    setExpandedSubject(expandedSubject === subject.id ? null : subject.id);
    onSubjectChange?.(subject.en);
  };

  const handleStartRevision = (subjectName: string) => {
    setRevisionSubject(subjectName);
    toast.success(medium === "tamil" ? `${subjectName} திருத்தம் தொடங்குகிறது` : `Starting revision for ${subjectName}`);
  };

  if (revisionSubject) {
    return (
      <div className="min-h-screen pb-24 pt-6 px-4">
        <RevisionView
          subject={revisionSubject}
          onClose={() => setRevisionSubject(null)}
          onCompleted={() => onSubjectStudied?.(revisionSubject)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-display font-bold text-foreground">
          📖 {medium === "tamil" ? "படிப்பு" : "Study"}
        </h1>
        {/* Medium Toggle */}
        <button
          onClick={() => {
            const next = medium === "english" ? "tamil" : "english";
            setMedium(next as Medium);
            toast.success(next === "tamil" ? "தமிழ் மொழி தேர்ந்தெடுக்கப்பட்டது" : "English medium selected");
          }}
          className="glass-card px-3 py-1.5 flex items-center gap-1.5 text-xs font-display text-muted-foreground"
        >
          <Languages size={14} />
          {medium === "english" ? "English" : "தமிழ்"}
        </button>
      </div>

      {/* Board Selection */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {(["state", "cbse"] as Board[]).map((b) => (
          <motion.button
            key={b}
            onClick={() => {
              setBoard(b);
              toast.success(`${boardIcons[b].en} selected`);
            }}
            className={`glass-card p-4 flex flex-col items-center gap-2 transition-all ${
              board === b ? "ring-2 ring-primary bg-primary/10" : ""
            }`}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-2xl">{boardIcons[b].emoji}</span>
            <span className="font-display font-semibold text-sm text-foreground">
              {medium === "tamil" ? boardIcons[b].ta : boardIcons[b].en}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Progress */}
      <motion.div className="glass-card p-5 mb-5" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h3 className="font-display font-semibold text-sm text-foreground mb-3">
          {medium === "tamil" ? "இன்றைய முன்னேற்றம்" : "Today's Progress"}
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
          </div>
          <span className="text-sm font-display font-bold text-primary">65%</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {medium === "tamil" ? "50 இல் 32 பொருட்கள் மதிப்பாய்வு செய்யப்பட்டன" : "32 of 50 items reviewed"}
        </p>
      </motion.div>

      {/* Grade Selector */}
      <div className="mb-4">
        <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
          <GraduationCap size={16} className="text-primary" />
          {medium === "tamil" ? "வகுப்பைத் தேர்ந்தெடுக்கவும்" : "Select Your Grade"}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {indianGrades.map((grade, i) => (
            <motion.button
              key={grade.id}
              onClick={() => handleGradeSelect(grade)}
              className={`glass-card p-3 flex items-center gap-2.5 text-left group transition-all ${
                selectedGrade === grade.id ? "ring-2 ring-primary bg-primary/10" : ""
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 * i }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-lg">{grade.emoji}</span>
              <span className="font-display font-semibold text-xs text-foreground flex-1 truncate">
                {lang === "ta" ? grade.ta : grade.en}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Subjects & Chapters */}
      <AnimatePresence mode="wait">
        {currentGrade && (
          <motion.div
            key={`${currentGrade.id}-${board}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen size={16} className="text-primary" />
              {currentGrade.emoji} {lang === "ta" ? currentGrade.ta : currentGrade.en} —{" "}
              {medium === "tamil" ? "பாடங்கள்" : "Subjects"}
            </h3>

            <div className="space-y-2">
              {subjects.map((subject, i) => {
                const isExpanded = expandedSubject === subject.id;
                return (
                  <motion.div
                    key={subject.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    {/* Subject Row */}
                    <button
                      onClick={() => handleSubjectClick(subject)}
                      className={`glass-card p-3.5 flex items-center gap-3 w-full text-left group transition-all ${
                        isExpanded ? "ring-1 ring-primary/40 bg-primary/5" : ""
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-xl shrink-0`}>
                        {subject.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-sm text-foreground truncate">
                          {lang === "ta" ? subject.ta : subject.en}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {subject.chapters.length} {medium === "tamil" ? "பாடங்கள்" : "chapters"}
                        </p>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Chapters */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pr-2 py-2 space-y-1.5">
                            {subject.chapters.map((ch, ci) => (
                              <motion.div
                                key={ch.id}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.03 * ci }}
                                className="glass-card p-3 flex items-center gap-3"
                              >
                                <span className="text-xs font-display text-primary font-bold w-6">{ci + 1}</span>
                                <span className="font-display text-sm text-foreground flex-1">
                                  {lang === "ta" ? ch.ta : ch.en}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartRevision(lang === "ta" ? ch.ta : ch.en);
                                  }}
                                  className="text-xs font-display font-semibold text-primary bg-primary/10 px-2 py-1 rounded-lg"
                                >
                                  {medium === "tamil" ? "படி" : "Study"}
                                </button>
                              </motion.div>
                            ))}

                            {/* Start Full Subject Revision */}
                            <button
                              onClick={() => handleStartRevision(lang === "ta" ? subject.ta : subject.en)}
                              className="w-full rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 text-xs font-display font-semibold text-primary active:scale-95 transition-transform mt-2"
                            >
                              {medium === "tamil" ? `முழு ${subject.ta} திருத்தம்` : `Full ${subject.en} Revision`}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tip */}
      {!selectedGrade && (
        <motion.div className="glass-card p-4 mt-6 border-l-4 border-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <p className="text-xs text-muted-foreground">
            💡 <span className="text-foreground font-semibold">
              {medium === "tamil" ? "உதவிக்குறிப்பு:" : "Tip:"}
            </span>{" "}
            {medium === "tamil"
              ? "சிறந்த நினைவக ஒருங்கிணைப்பு முடிவுகளுக்கு தூக்கத்திற்கு 30 நிமிடங்களுக்கு முன் படிக்கவும்!"
              : "Study 30 minutes before sleep for best memory consolidation results!"}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StudyScreen;
