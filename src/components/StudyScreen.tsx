import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GraduationCap, BookOpen, Languages, School, Building2, CheckCircle2 } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import RevisionView from "./RevisionView";
import StudyProgressDashboard from "./study/StudyProgressDashboard";
import CustomTopics from "./study/CustomTopics";
import TopicCheckbox from "./study/TopicCheckbox";
import { useStudyProgress } from "@/hooks/useStudyProgress";
import { indianGrades, type Board, type Medium, type Grade, type Subject } from "@/lib/indianSyllabus";
import { higherEdCourses, type HECourse, type HEDepartment, type HEYear, type HESubject } from "@/lib/higherEducation";
import { type AppLang, t, ui } from "@/lib/i18n";

interface StudyScreenProps {
  onCourseChange?: (courseId: string) => void;
  onSubjectChange?: (subject: string | null) => void;
  onSubjectStudied?: (subject: string) => void;
  language?: string;
}

const boardIcons: Record<Board, { emoji: string; en: string; ta: string; hi: string }> = {
  state: { emoji: "🏛️", en: "State Board", ta: "மாநில வாரியம்", hi: "राज्य बोर्ड" },
  cbse: { emoji: "🇮🇳", en: "CBSE", ta: "CBSE", hi: "CBSE" },
};

const langOptions: { value: Medium; label: string; flag: string }[] = [
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "tamil", label: "தமிழ்", flag: "🇮🇳" },
  { value: "hindi", label: "हिन्दी", flag: "🇮🇳" },
];

type StudyMode = "school" | "college";

const StudyScreen = ({ onCourseChange, onSubjectChange, onSubjectStudied, language: profileLang }: StudyScreenProps) => {
  const [mode, setMode] = useState<StudyMode>("school");
  const [board, setBoard] = useState<Board>("state");
  const [medium, setMedium] = useState<Medium>((profileLang === "tamil" ? "tamil" : profileLang === "hindi" ? "hindi" : "english") as Medium);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [revisionSubject, setRevisionSubject] = useState<string | null>(null);

  // Higher ed state
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [expandedHESubject, setExpandedHESubject] = useState<string | null>(null);

  // Progress tracking
  const progress = useStudyProgress();

  const lang: AppLang = medium === "tamil" ? "tamil" : medium === "hindi" ? "hindi" : "english";
  const lk = (item: { en: string; ta: string; hi: string }) => t(lang, item.en, item.ta, item.hi);

  const currentGrade = indianGrades.find((g) => g.id === selectedGrade);
  const subjects = currentGrade ? currentGrade.subjects[board] : [];

  // Higher ed lookups
  const heCourse = higherEdCourses.find((c) => c.id === selectedCourse);
  const heDept = heCourse?.departments.find((d) => d.id === selectedDept);
  const heYear = heDept?.years.find((y) => y.id === selectedYear);

  // Calculate subject progress for dashboard
  const subjectProgressData = useMemo(() => {
    if (mode === "school" && subjects.length > 0) {
      return subjects.map(s => ({
        name: lk(s),
        emoji: s.emoji,
        percent: progress.getSubjectProgress(s.chapters.map(ch => ch.id)),
        color: s.color,
      }));
    }
    if (mode === "college" && heYear) {
      return heYear.subjects.map(s => ({
        name: lk(s),
        emoji: s.emoji,
        percent: progress.getSubjectProgress(s.topics.map(tp => tp.id)),
        color: s.color,
      }));
    }
    return [];
  }, [mode, subjects, heYear, progress.completedTopics, lang]);

  const overallPercent = useMemo(() => {
    if (subjectProgressData.length === 0) return 0;
    const sum = subjectProgressData.reduce((a, b) => a + b.percent, 0);
    return Math.round(sum / subjectProgressData.length);
  }, [subjectProgressData]);

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade.id);
    setExpandedSubject(null);
    onCourseChange?.(grade.id);
    onSubjectChange?.(null);
    toast.success(`${lk(grade)} ${lk(ui.selected)}`);
  };

  const handleSubjectClick = (subject: Subject) => {
    setExpandedSubject(expandedSubject === subject.id ? null : subject.id);
    onSubjectChange?.(subject.en);
  };

  const handleStartRevision = (englishName: string, displayName?: string) => {
    setRevisionSubject(englishName);
    toast.success(`${lk(ui.startRevision)} ${displayName || englishName}`);
  };

  const cycleMedium = () => {
    const order: Medium[] = ["english", "tamil", "hindi"];
    const idx = order.indexOf(medium);
    const next = order[(idx + 1) % order.length];
    setMedium(next);
    toast.success(`${langOptions.find((l) => l.value === next)?.label} ${lk(ui.selected)}`);
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
          📖 {lk(ui.study)}
        </h1>
        <button
          onClick={cycleMedium}
          className="glass-card px-3 py-1.5 flex items-center gap-1.5 text-xs font-display text-muted-foreground"
        >
          <Languages size={14} />
          {langOptions.find((l) => l.value === medium)?.flag}{" "}
          {langOptions.find((l) => l.value === medium)?.label}
        </button>
      </div>

      {/* School / College Toggle */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <motion.button
          onClick={() => setMode("school")}
          className={`glass-card p-3.5 flex items-center justify-center gap-2 transition-all ${
            mode === "school" ? "ring-2 ring-primary bg-primary/10" : ""
          }`}
          whileTap={{ scale: 0.97 }}
        >
          <School size={18} className={mode === "school" ? "text-primary" : "text-muted-foreground"} />
          <span className="font-display font-semibold text-xs text-foreground">{lk(ui.school)}</span>
        </motion.button>
        <motion.button
          onClick={() => setMode("college")}
          className={`glass-card p-3.5 flex items-center justify-center gap-2 transition-all ${
            mode === "college" ? "ring-2 ring-primary bg-primary/10" : ""
          }`}
          whileTap={{ scale: 0.97 }}
        >
          <Building2 size={18} className={mode === "college" ? "text-primary" : "text-muted-foreground"} />
          <span className="font-display font-semibold text-xs text-foreground">{lk(ui.college)}</span>
        </motion.button>
      </div>

      {/* Progress Dashboard */}
      <StudyProgressDashboard
        lang={lang}
        subjects={subjectProgressData}
        overallPercent={overallPercent}
      />

      {/* ═══ SCHOOL MODE ═══ */}
      {mode === "school" && (
        <>
          {/* Board Selection */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {(["state", "cbse"] as Board[]).map((b) => (
              <motion.button
                key={b}
                onClick={() => { setBoard(b); toast.success(`${boardIcons[b].en} ${lk(ui.selected)}`); }}
                className={`glass-card p-4 flex flex-col items-center gap-2 transition-all ${
                  board === b ? "ring-2 ring-primary bg-primary/10" : ""
                }`}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-2xl">{boardIcons[b].emoji}</span>
                <span className="font-display font-semibold text-sm text-foreground">{lk(boardIcons[b])}</span>
              </motion.button>
            ))}
          </div>

          {/* Grade Selector */}
          <div className="mb-4">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <GraduationCap size={16} className="text-primary" />
              {lk(ui.selectGrade)}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {indianGrades.map((grade, i) => {
                const gradeSubjects = grade.subjects[board];
                const allChapterIds = gradeSubjects.flatMap(s => s.chapters.map(ch => ch.id));
                const isGradeComplete = allChapterIds.length > 0 && allChapterIds.every(id => progress.isCompleted(id));
                return (
                  <motion.button
                    key={grade.id}
                    onClick={() => handleGradeSelect(grade)}
                    className={`glass-card p-3 flex items-center gap-2.5 text-left group transition-all ${
                      selectedGrade === grade.id ? "ring-2 ring-primary bg-primary/10" : ""
                    } ${isGradeComplete ? "ring-2 ring-accent bg-accent/10" : ""}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.02 * i }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-lg">{grade.emoji}</span>
                    <span className="font-display font-semibold text-xs text-foreground flex-1 truncate">{lk(grade)}</span>
                    {isGradeComplete && <CheckCircle2 size={16} className="text-accent shrink-0" />}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Subjects & Chapters */}
          <AnimatePresence mode="wait">
            {currentGrade && (
              <motion.div key={`${currentGrade.id}-${board}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen size={16} className="text-primary" />
                  {currentGrade.emoji} {lk(currentGrade)} — {lk(ui.subjects)}
                </h3>
                <div className="space-y-2">
                  {subjects.map((subject, i) => {
                    const isExpanded = expandedSubject === subject.id;
                    return (
                      <motion.div key={subject.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.04 * i }}>
                        <button
                          onClick={() => handleSubjectClick(subject)}
                          className={`glass-card p-3.5 flex items-center gap-3 w-full text-left group transition-all ${isExpanded ? "ring-1 ring-primary/40 bg-primary/5" : ""}`}
                        >
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-xl shrink-0`}>{subject.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display font-semibold text-sm text-foreground truncate">{lk(subject)}</h4>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground">{subject.chapters.length} {lk(ui.chapters)}</p>
                              <span className="text-xs font-display font-bold text-primary">
                                {progress.getSubjectProgress(subject.chapters.map(ch => ch.id))}%
                              </span>
                            </div>
                          </div>
                          <ChevronDown size={16} className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="pl-4 pr-2 py-2 space-y-1.5">
                                {subject.chapters.map((ch, ci) => (
                                  <motion.div key={ch.id} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.03 * ci }} className="glass-card p-3 flex items-center gap-3">
                                    <TopicCheckbox
                                      completed={progress.isCompleted(ch.id)}
                                      onToggle={() => progress.toggleTopic(ch.id)}
                                    />
                                    <span className="text-xs font-display text-primary font-bold w-6">{ci + 1}</span>
                                    <span className={`font-display text-sm flex-1 ${progress.isCompleted(ch.id) ? "line-through text-muted-foreground" : "text-foreground"}`}>{lk(ch)}</span>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleStartRevision(ch.en, lk(ch)); }}
                                      className="text-xs font-display font-semibold text-primary bg-primary/10 px-2 py-1 rounded-lg"
                                    >
                                      {lk(ui.study_btn)}
                                    </button>
                                  </motion.div>
                                ))}
                                <button
                                  onClick={() => handleStartRevision(subject.en, lk(subject))}
                                  className="w-full rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 text-xs font-display font-semibold text-primary active:scale-95 transition-transform mt-2"
                                >
                                  {lk(ui.fullRevision)} — {lk(subject)}
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
        </>
      )}

      {/* ═══ COLLEGE MODE ═══ */}
      {mode === "college" && (
        <div className="space-y-4">
          {/* Course Selector */}
          {!selectedCourse && (
            <div>
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <GraduationCap size={16} className="text-primary" />
                {lk(ui.selectCourse)}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {higherEdCourses.map((course, i) => (
                  <motion.button
                    key={course.id}
                    onClick={() => { setSelectedCourse(course.id); setSelectedDept(null); setSelectedYear(null); }}
                    className="glass-card p-4 flex flex-col items-center gap-2 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * i }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-2xl">{course.emoji}</span>
                    <span className="font-display font-semibold text-xs text-foreground">{lk(course)}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Department Selector */}
          {heCourse && !selectedDept && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => setSelectedCourse(null)} className="text-xs text-primary font-display mb-3 flex items-center gap-1">
                ← {lk(ui.selectCourse)}
              </button>
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <Building2 size={16} className="text-primary" />
                {heCourse.emoji} {lk(heCourse)} — {lk(ui.department)}
              </h3>
              <div className="space-y-2">
                {heCourse.departments.map((dept, i) => (
                  <motion.button
                    key={dept.id}
                    onClick={() => { setSelectedDept(dept.id); setSelectedYear(null); }}
                    className="glass-card p-3.5 flex items-center gap-3 w-full text-left"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.04 * i }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-xl">{dept.emoji}</span>
                    <span className="font-display font-semibold text-sm text-foreground">{lk(dept)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Year Selector */}
          {heDept && !selectedYear && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => setSelectedDept(null)} className="text-xs text-primary font-display mb-3 flex items-center gap-1">
                ← {lk(heCourse!)} / {lk(ui.department)}
              </button>
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <GraduationCap size={16} className="text-primary" />
                {lk(heDept)} — {lk(ui.year)}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {heDept.years.map((year, i) => (
                  <motion.button
                    key={year.id}
                    onClick={() => setSelectedYear(year.id)}
                    className="glass-card p-4 flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="font-display font-semibold text-sm text-foreground">{lk(year)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Subjects & Topics for selected year */}
          {heYear && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => setSelectedYear(null)} className="text-xs text-primary font-display mb-3 flex items-center gap-1">
                ← {lk(heDept!)} / {lk(ui.year)}
              </button>
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                {lk(heYear)} — {lk(ui.subjects)}
              </h3>
              <div className="space-y-2">
                {heYear.subjects.map((subject, i) => {
                  const isExpanded = expandedHESubject === subject.id;
                  return (
                    <motion.div key={subject.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.04 * i }}>
                      <button
                        onClick={() => setExpandedHESubject(isExpanded ? null : subject.id)}
                        className={`glass-card p-3.5 flex items-center gap-3 w-full text-left group transition-all ${isExpanded ? "ring-1 ring-primary/40 bg-primary/5" : ""}`}
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-xl shrink-0`}>{subject.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-semibold text-sm text-foreground truncate">{lk(subject)}</h4>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">{subject.topics.length} {lk(ui.topics)}</p>
                            <span className="text-xs font-display font-bold text-primary">
                              {progress.getSubjectProgress(subject.topics.map(tp => tp.id))}%
                            </span>
                          </div>
                        </div>
                        <ChevronDown size={16} className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="pl-4 pr-2 py-2 space-y-1.5">
                              {subject.topics.map((topic, ti) => (
                                <motion.div key={topic.id} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.03 * ti }} className="glass-card p-3 flex items-center gap-3">
                                  <TopicCheckbox
                                    completed={progress.isCompleted(topic.id)}
                                    onToggle={() => progress.toggleTopic(topic.id)}
                                  />
                                  <span className="text-xs font-display text-primary font-bold w-6">{ti + 1}</span>
                                  <span className={`font-display text-sm flex-1 ${progress.isCompleted(topic.id) ? "line-through text-muted-foreground" : "text-foreground"}`}>{lk(topic)}</span>
                                   <button
                                    onClick={(e) => { e.stopPropagation(); handleStartRevision(topic.en, lk(topic)); }}
                                    className="text-xs font-display font-semibold text-primary bg-primary/10 px-2 py-1 rounded-lg"
                                  >
                                    {lk(ui.study_btn)}
                                  </button>
                                </motion.div>
                              ))}
                              <button
                                onClick={() => handleStartRevision(subject.en, lk(subject))}
                                className="w-full rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 text-xs font-display font-semibold text-primary active:scale-95 transition-transform mt-2"
                              >
                                {lk(ui.fullRevision)} — {lk(subject)}
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
        </div>
      )}

      {/* Custom Topics */}
      <CustomTopics
        lang={lang}
        topics={progress.customTopics}
        onAdd={progress.addCustomTopic}
        onToggle={progress.toggleCustomTopic}
        onRemove={progress.removeCustomTopic}
      />

      {/* Tip */}
      {mode === "school" && !selectedGrade && (
        <motion.div className="glass-card p-4 mt-6 border-l-4 border-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <p className="text-xs text-muted-foreground">
            💡 <span className="text-foreground font-semibold">{lk(ui.tip)}</span>{" "}
            {lk(ui.tipText)}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StudyScreen;
