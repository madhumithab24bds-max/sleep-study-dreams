import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Building2,
  Calendar,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Moon,
  Brain,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import {
  syllabusCourses,
  type SyllabusCourse,
  type AcademicYear,
  type Semester,
  type Subject,
  type Topic,
  getAudioProfileForTopic,
} from "@/lib/syllabusData";

interface MyStudyScreenProps {
  onNavigateToSleep?: (subject: string, audioProfile: string) => void;
  onNavigateToQuiz?: (subject: string, topics: string[]) => void;
}

type Step = "course" | "university" | "year" | "syllabus";

const MyStudyScreen = ({ onNavigateToSleep, onNavigateToQuiz }: MyStudyScreenProps) => {
  const [step, setStep] = useState<Step>("course");
  const [selectedCourse, setSelectedCourse] = useState<SyllabusCourse | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<AcademicYear | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  // Load completed topics from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("thukkam_completed_topics");
      if (saved) setCompletedTopics(JSON.parse(saved));
    } catch {}
  }, []);

  const saveCompleted = (topics: string[]) => {
    setCompletedTopics(topics);
    localStorage.setItem("thukkam_completed_topics", JSON.stringify(topics));
  };

  const toggleTopicComplete = (topicId: string) => {
    const updated = completedTopics.includes(topicId)
      ? completedTopics.filter((t) => t !== topicId)
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
    const uni = selectedCourse?.universities.find((u) => u.id === uniId);
    if (uni) toast.success(`${uni.shortName} selected`);
  };

  const handleYearSelect = (year: AcademicYear) => {
    setSelectedYear(year);
    setStep("syllabus");
    setExpandedSemester(year.semesters[0]?.id || null);
    toast.success(`${year.label} loaded`);
  };

  const handleBack = () => {
    if (step === "syllabus") setStep("year");
    else if (step === "year") setStep("university");
    else if (step === "university") setStep("course");
  };

  const handleSleepRevision = (topic: Topic, subjectTitle: string) => {
    const audioProfile = getAudioProfileForTopic(topic.audioKeywords);
    toast.success(`🌙 "${topic.title}" added to sleep revision`);
    onNavigateToSleep?.(subjectTitle, audioProfile);
  };

  const handleQuizTopic = (subject: Subject) => {
    const topicTitles = subject.topics.map((t) => t.title);
    toast.success(`🧠 Quiz ready for ${subject.title}`);
    onNavigateToQuiz?.(subject.title, topicTitles);
  };

  const getSubjectProgress = (subject: Subject) => {
    const completed = subject.topics.filter((t) => completedTopics.includes(t.id)).length;
    return { completed, total: subject.topics.length, percent: Math.round((completed / subject.topics.length) * 100) };
  };

  const getSemesterProgress = (semester: Semester) => {
    const allTopics = semester.subjects.flatMap((s) => s.topics);
    const completed = allTopics.filter((t) => completedTopics.includes(t.id)).length;
    return { completed, total: allTopics.length, percent: allTopics.length ? Math.round((completed / allTopics.length) * 100) : 0 };
  };

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {step !== "course" && (
          <button onClick={handleBack} className="glass-card p-2 rounded-xl">
            <ArrowLeft size={18} className="text-muted-foreground" />
          </button>
        )}
        <h1 className="text-2xl font-display font-bold text-foreground">📘 My Study</h1>
      </div>

      {/* Breadcrumb */}
      {step !== "course" && (
        <motion.div className="glass-card p-3 mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {selectedCourse && <span className="text-foreground font-semibold">{selectedCourse.emoji} {selectedCourse.label}</span>}
          {selectedUniversity && (
            <>
              <ChevronRight size={12} />
              <span className="text-foreground font-semibold">{selectedCourse?.universities.find(u => u.id === selectedUniversity)?.shortName}</span>
            </>
          )}
          {selectedYear && (
            <>
              <ChevronRight size={12} />
              <span className="text-foreground font-semibold">{selectedYear.label}</span>
            </>
          )}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Course Selection */}
        {step === "course" && (
          <motion.div key="course" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="glass-card p-4 mb-4 flex items-center gap-3">
              <GraduationCap size={20} className="text-primary" />
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground">Select Your Degree Course</h3>
                <p className="text-xs text-muted-foreground">Choose your program to load the complete syllabus</p>
              </div>
            </div>
            <div className="space-y-2">
              {syllabusCourses.map((course, i) => (
                <motion.button
                  key={course.id}
                  onClick={() => handleCourseSelect(course)}
                  className="glass-card p-4 flex items-center gap-3 w-full text-left group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <span className="text-2xl w-10 text-center">{course.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-sm text-foreground">{course.label}</h4>
                    <p className="text-xs text-muted-foreground">{course.duration}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: University Selection */}
        {step === "university" && selectedCourse && (
          <motion.div key="university" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="glass-card p-4 mb-4 flex items-center gap-3">
              <Building2 size={20} className="text-secondary" />
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground">Select University / Board</h3>
                <p className="text-xs text-muted-foreground">Your syllabus will be customized accordingly</p>
              </div>
            </div>
            <div className="space-y-2">
              {selectedCourse.universities.map((uni, i) => (
                <motion.button
                  key={uni.id}
                  onClick={() => handleUniversitySelect(uni.id)}
                  className="glass-card p-4 flex items-center gap-3 w-full text-left group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                    <Building2 size={18} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-sm text-foreground">{uni.shortName}</h4>
                    <p className="text-xs text-muted-foreground">{uni.name}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Year Selection */}
        {step === "year" && selectedCourse && (
          <motion.div key="year" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="glass-card p-4 mb-4 flex items-center gap-3">
              <Calendar size={20} className="text-accent" />
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground">Select Academic Year</h3>
                <p className="text-xs text-muted-foreground">View semester-wise syllabus</p>
              </div>
            </div>
            <div className="space-y-2">
              {selectedCourse.years.map((year, i) => (
                <motion.button
                  key={year.id}
                  onClick={() => handleYearSelect(year)}
                  className="glass-card p-4 flex items-center gap-3 w-full text-left group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-dream/20 flex items-center justify-center">
                    <Calendar size={18} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-sm text-foreground">{year.label}</h4>
                    <p className="text-xs text-muted-foreground">{year.semesters.length} semester{year.semesters.length > 1 ? "s" : ""}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Syllabus View */}
        {step === "syllabus" && selectedYear && (
          <motion.div key="syllabus" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="space-y-4">
              {selectedYear.semesters.map((semester) => {
                const semProgress = getSemesterProgress(semester);
                const isExpanded = expandedSemester === semester.id;

                return (
                  <div key={semester.id}>
                    <button
                      onClick={() => setExpandedSemester(isExpanded ? null : semester.id)}
                      className="glass-card p-4 w-full flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen size={18} className="text-primary" />
                        <div className="text-left">
                          <h3 className="font-display font-semibold text-sm text-foreground">{semester.label}</h3>
                          <p className="text-xs text-muted-foreground">
                            {semester.subjects.length} subjects • {semProgress.completed}/{semProgress.total} topics done
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {semProgress.percent > 0 && (
                          <span className="text-xs font-display font-bold text-primary">{semProgress.percent}%</span>
                        )}
                        <ChevronDown size={16} className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
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
                          <div className="space-y-3 mt-3 ml-2">
                            {semester.subjects.map((subject) => {
                              const subProgress = getSubjectProgress(subject);
                              const isSubExpanded = expandedSubject === subject.id;

                              return (
                                <div key={subject.id} className="glass-card overflow-hidden">
                                  <button
                                    onClick={() => setExpandedSubject(isSubExpanded ? null : subject.id)}
                                    className="p-3.5 w-full flex items-center gap-3"
                                  >
                                    <span className="text-xl">{subject.emoji}</span>
                                    <div className="flex-1 text-left">
                                      <h4 className="font-display font-semibold text-sm text-foreground">{subject.title}</h4>
                                      <div className="flex items-center gap-2 mt-1">
                                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                          <div
                                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                                            style={{ width: `${subProgress.percent}%` }}
                                          />
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-display">{subProgress.completed}/{subProgress.total}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={(e) => { e.stopPropagation(); handleQuizTopic(subject); }}
                                        className="p-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                                        title="Take Quiz"
                                      >
                                        <Brain size={14} className="text-accent" />
                                      </button>
                                      <ChevronDown size={14} className={`text-muted-foreground transition-transform ${isSubExpanded ? "rotate-180" : ""}`} />
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
                                        <div className="px-3.5 pb-3 space-y-2">
                                          {subject.topics.map((topic) => {
                                            const isDone = completedTopics.includes(topic.id);
                                            return (
                                              <div
                                                key={topic.id}
                                                className={`p-3 rounded-xl border transition-colors ${isDone ? "border-primary/30 bg-primary/5" : "border-border/20 bg-muted/30"}`}
                                              >
                                                <div className="flex items-start gap-2">
                                                  <button onClick={() => toggleTopicComplete(topic.id)} className="mt-0.5 shrink-0">
                                                    <CheckCircle2
                                                      size={16}
                                                      className={isDone ? "text-primary fill-primary/20" : "text-muted-foreground"}
                                                    />
                                                  </button>
                                                  <div className="flex-1 min-w-0">
                                                    <h5 className={`text-xs font-display font-semibold ${isDone ? "text-primary" : "text-foreground"}`}>
                                                      {topic.title}
                                                    </h5>
                                                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{topic.description}</p>
                                                  </div>
                                                </div>
                                                <div className="flex gap-1.5 mt-2 ml-6">
                                                  <button
                                                    onClick={() => handleSleepRevision(topic, subject.title)}
                                                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-dream/10 hover:bg-dream/20 transition-colors text-[10px] font-display text-dream"
                                                  >
                                                    <Moon size={10} /> Sleep Revision
                                                  </button>
                                                  <button
                                                    onClick={() => { handleQuizTopic(subject); }}
                                                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors text-[10px] font-display text-accent"
                                                  >
                                                    <Brain size={10} /> Quiz
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

            {/* Integration tip */}
            <motion.div
              className="glass-card p-4 mt-6 border-l-4 border-dream"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs text-muted-foreground">
                🌙 <span className="text-foreground font-semibold">Sleep Learning:</span> Tap "Sleep Revision" on any topic to convert it into a soft audio module for your sleep cycle. Topics marked complete will generate morning quizzes automatically.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyStudyScreen;
