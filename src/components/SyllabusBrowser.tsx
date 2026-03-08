import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Building2, Calendar, ChevronRight, ChevronDown,
  BookOpen, Moon, Brain, CheckCircle2, ArrowLeft, Search,
} from "lucide-react";
import { toast } from "sonner";
import {
  syllabusCourses, type SyllabusCourse, type AcademicYear,
  type Semester, type Subject, type Topic, getAudioProfileForTopic,
} from "@/lib/syllabusData";

interface SyllabusBrowserProps {
  onNavigateToSleep?: (subject: string, audioProfile: string) => void;
  onNavigateToQuiz?: (subject: string, topics: string[]) => void;
  onSubjectStudied?: (subject: string) => void;
}

type Step = "course" | "university" | "year" | "syllabus";

const COMPLETED_KEY = "thukkam_completed_topics";

const SyllabusBrowser = ({ onNavigateToSleep, onNavigateToQuiz, onSubjectStudied }: SyllabusBrowserProps) => {
  const [step, setStep] = useState<Step>("course");
  const [selectedCourse, setSelectedCourse] = useState<SyllabusCourse | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<AcademicYear | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_KEY);
      if (saved) setCompletedTopics(JSON.parse(saved));
    } catch {}
  }, []);

  const saveCompleted = (topics: string[]) => {
    setCompletedTopics(topics);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(topics));
  };

  const toggleTopicComplete = (topicId: string) => {
    const updated = completedTopics.includes(topicId)
      ? completedTopics.filter(t => t !== topicId)
      : [...completedTopics, topicId];
    saveCompleted(updated);
  };

  const handleCourseSelect = (course: SyllabusCourse) => {
    setSelectedCourse(course);
    setStep("university");
    toast.success(`${course.emoji} ${course.label} selected`);
  };

  const handleUniversitySelect = (uniId: string) => {
    setSelectedUniversity(uniId);
    setStep("year");
    const uni = selectedCourse?.universities.find(u => u.id === uniId);
    if (uni) toast.success(`${uni.shortName} selected`);
  };

  const handleYearSelect = (year: AcademicYear) => {
    setSelectedYear(year);
    setStep("syllabus");
    setExpandedSemester(year.semesters[0]?.id || null);
    toast.success(`${year.label} loaded`);
  };

  const handleBack = () => {
    if (step === "syllabus") { setStep("year"); setSearchQuery(""); }
    else if (step === "year") setStep("university");
    else if (step === "university") setStep("course");
  };

  const handleSleepRevision = (topic: Topic, subjectTitle: string) => {
    const audioProfile = getAudioProfileForTopic(topic.audioKeywords);
    toast.success(`🌙 "${topic.title}" added to sleep revision`);
    onNavigateToSleep?.(subjectTitle, audioProfile);
  };

  const handleQuizTopic = (subject: Subject) => {
    const topicTitles = subject.topics.map(t => t.title);
    toast.success(`🧠 Quiz ready for ${subject.title}`);
    onSubjectStudied?.(subject.title);
    onNavigateToQuiz?.(subject.title, topicTitles);
  };

  const getSubjectProgress = (subject: Subject) => {
    const completed = subject.topics.filter(t => completedTopics.includes(t.id)).length;
    return { completed, total: subject.topics.length, percent: Math.round((completed / subject.topics.length) * 100) };
  };

  const getSemesterProgress = (semester: Semester) => {
    const allTopics = semester.subjects.flatMap(s => s.topics);
    const completed = allTopics.filter(t => completedTopics.includes(t.id)).length;
    return { completed, total: allTopics.length, percent: allTopics.length ? Math.round((completed / allTopics.length) * 100) : 0 };
  };

  // Filter courses by search
  const filteredCourses = searchQuery
    ? syllabusCourses.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : syllabusCourses;

  return (
    <div className="space-y-4">
      {/* Breadcrumb + Back */}
      {step !== "course" && (
        <div className="flex items-center gap-2">
          <button onClick={handleBack} className="glass-card p-2 rounded-xl shrink-0">
            <ArrowLeft size={16} className="text-muted-foreground" />
          </button>
          <div className="glass-card p-2.5 flex-1 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground font-display overflow-hidden">
            {selectedCourse && <span className="text-foreground font-semibold truncate">{selectedCourse.emoji} {selectedCourse.label}</span>}
            {selectedUniversity && step !== "university" && (
              <><ChevronRight size={10} /><span className="text-foreground font-semibold">{selectedCourse?.universities.find(u => u.id === selectedUniversity)?.shortName}</span></>
            )}
            {selectedYear && step === "syllabus" && (
              <><ChevronRight size={10} /><span className="text-foreground font-semibold">{selectedYear.label}</span></>
            )}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ─── COURSE SELECTION ─── */}
        {step === "course" && (
          <motion.div key="course" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="glass-card p-3 mb-3 flex items-center gap-2">
              <Search size={14} className="text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground font-display outline-none"
              />
            </div>
            <div className="glass-card p-3.5 mb-3 flex items-center gap-3">
              <GraduationCap size={18} className="text-primary shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-xs text-foreground">Select Your Degree Course</h3>
                <p className="text-[10px] text-muted-foreground">{syllabusCourses.length} courses available</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {filteredCourses.map((course, i) => (
                <motion.button
                  key={course.id}
                  onClick={() => handleCourseSelect(course)}
                  className="glass-card p-3 flex items-center gap-3 w-full text-left group"
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <span className="text-xl w-8 text-center">{course.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-xs text-foreground truncate">{course.label}</h4>
                    <p className="text-[10px] text-muted-foreground">{course.duration}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── UNIVERSITY SELECTION ─── */}
        {step === "university" && selectedCourse && (
          <motion.div key="university" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="glass-card p-3.5 mb-3 flex items-center gap-3">
              <Building2 size={18} className="text-secondary shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-xs text-foreground">Select University / Board</h3>
                <p className="text-[10px] text-muted-foreground">Syllabus customized per university</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {selectedCourse.universities.map((uni, i) => (
                <motion.button
                  key={uni.id}
                  onClick={() => handleUniversitySelect(uni.id)}
                  className="glass-card p-3 flex items-center gap-3 w-full text-left group"
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center shrink-0">
                    <Building2 size={16} className="text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-xs text-foreground">{uni.shortName}</h4>
                    <p className="text-[10px] text-muted-foreground truncate">{uni.name}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── YEAR SELECTION ─── */}
        {step === "year" && selectedCourse && (
          <motion.div key="year" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="glass-card p-3.5 mb-3 flex items-center gap-3">
              <Calendar size={18} className="text-accent shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-xs text-foreground">Select Academic Year</h3>
                <p className="text-[10px] text-muted-foreground">{selectedCourse.years.length} year{selectedCourse.years.length > 1 ? "s" : ""} available</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {selectedCourse.years.map((year, i) => (
                <motion.button
                  key={year.id}
                  onClick={() => handleYearSelect(year)}
                  className="glass-card p-3 flex items-center gap-3 w-full text-left group"
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-dream/20 flex items-center justify-center shrink-0">
                    <Calendar size={16} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-xs text-foreground">{year.label}</h4>
                    <p className="text-[10px] text-muted-foreground">{year.semesters.length} semester{year.semesters.length > 1 ? "s" : ""}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── SYLLABUS VIEW ─── */}
        {step === "syllabus" && selectedYear && (
          <motion.div key="syllabus" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            {/* Search within syllabus */}
            <div className="glass-card p-2.5 mb-3 flex items-center gap-2">
              <Search size={14} className="text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground font-display outline-none"
              />
            </div>

            <div className="space-y-3">
              {selectedYear.semesters.map(semester => {
                const semProgress = getSemesterProgress(semester);
                const isExpanded = expandedSemester === semester.id;

                // Filter subjects/topics by search
                const filteredSubjects = searchQuery
                  ? semester.subjects.map(s => ({
                      ...s,
                      topics: s.topics.filter(t =>
                        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.description.toLowerCase().includes(searchQuery.toLowerCase())
                      ),
                    })).filter(s => s.topics.length > 0 || s.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  : semester.subjects;

                if (searchQuery && filteredSubjects.length === 0) return null;

                return (
                  <div key={semester.id}>
                    <button
                      onClick={() => setExpandedSemester(isExpanded ? null : semester.id)}
                      className="glass-card p-3.5 w-full flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen size={16} className="text-primary shrink-0" />
                        <div className="text-left">
                          <h3 className="font-display font-semibold text-xs text-foreground">{semester.label}</h3>
                          <p className="text-[10px] text-muted-foreground">
                            {semester.subjects.length} subjects • {semProgress.completed}/{semProgress.total} done
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {semProgress.percent > 0 && (
                          <span className="text-[10px] font-display font-bold text-primary">{semProgress.percent}%</span>
                        )}
                        <ChevronDown size={14} className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 mt-2 ml-1.5">
                            {filteredSubjects.map(subject => {
                              const subProgress = getSubjectProgress(subject);
                              const isSubExpanded = expandedSubject === subject.id;

                              return (
                                <div key={subject.id} className="glass-card overflow-hidden">
                                  <button
                                    onClick={() => setExpandedSubject(isSubExpanded ? null : subject.id)}
                                    className="p-3 w-full flex items-center gap-2.5"
                                  >
                                    <span className="text-lg">{subject.emoji}</span>
                                    <div className="flex-1 text-left min-w-0">
                                      <h4 className="font-display font-semibold text-xs text-foreground truncate">{subject.title}</h4>
                                      <div className="flex items-center gap-2 mt-1">
                                        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                                          <div
                                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                                            style={{ width: `${subProgress.percent}%` }}
                                          />
                                        </div>
                                        <span className="text-[9px] text-muted-foreground font-display">{subProgress.completed}/{subProgress.total}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                      <button
                                        onClick={e => { e.stopPropagation(); handleQuizTopic(subject); }}
                                        className="p-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                                        title="Take Quiz"
                                      >
                                        <Brain size={12} className="text-accent" />
                                      </button>
                                      <ChevronDown size={12} className={`text-muted-foreground transition-transform ${isSubExpanded ? "rotate-180" : ""}`} />
                                    </div>
                                  </button>

                                  <AnimatePresence>
                                    {isSubExpanded && (
                                      <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-3 pb-3 space-y-1.5">
                                          {(searchQuery
                                            ? subject.topics.filter(t =>
                                                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                t.description.toLowerCase().includes(searchQuery.toLowerCase())
                                              )
                                            : subject.topics
                                          ).map(topic => {
                                            const isDone = completedTopics.includes(topic.id);
                                            return (
                                              <div
                                                key={topic.id}
                                                className={`p-2.5 rounded-xl border transition-colors ${isDone ? "border-primary/30 bg-primary/5" : "border-border/20 bg-muted/20"}`}
                                              >
                                                <div className="flex items-start gap-2">
                                                  <button onClick={() => toggleTopicComplete(topic.id)} className="mt-0.5 shrink-0">
                                                    <CheckCircle2 size={14} className={isDone ? "text-primary fill-primary/20" : "text-muted-foreground"} />
                                                  </button>
                                                  <div className="flex-1 min-w-0">
                                                    <h5 className={`text-[11px] font-display font-semibold ${isDone ? "text-primary" : "text-foreground"}`}>
                                                      {topic.title}
                                                    </h5>
                                                    <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">{topic.description}</p>
                                                  </div>
                                                </div>
                                                <div className="flex gap-1.5 mt-1.5 ml-5">
                                                  <button
                                                    onClick={() => handleSleepRevision(topic, subject.title)}
                                                    className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-dream/10 hover:bg-dream/20 transition-colors text-[9px] font-display text-dream"
                                                  >
                                                    <Moon size={9} /> Sleep Audio
                                                  </button>
                                                  <button
                                                    onClick={() => handleQuizTopic(subject)}
                                                    className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors text-[9px] font-display text-accent"
                                                  >
                                                    <Brain size={9} /> Quiz
                                                  </button>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <motion.div
              className="glass-card p-3.5 mt-4 border-l-4 border-dream"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-[10px] text-muted-foreground font-display">
                🌙 <span className="text-foreground font-semibold">Sleep Learning:</span> Tap "Sleep Audio" on any topic to auto-convert it into a soft revision module. Completed topics generate morning quizzes automatically.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SyllabusBrowser;
