import { motion } from "framer-motion";
import { Languages, ChevronRight, ChevronDown, GraduationCap } from "lucide-react";
import { useState } from "react";

interface Course {
  id: string;
  label: string;
  emoji: string;
  subjects: { title: string; emoji: string; count: number; color: string }[];
}

const courses: Course[] = [
  {
    id: "lkg",
    label: "LKG",
    emoji: "🧒",
    subjects: [
      { title: "Alphabets (A-Z)", emoji: "🔤", count: 26, color: "from-primary/20 to-accent/20" },
      { title: "Numbers (1-10)", emoji: "🔢", count: 10, color: "from-secondary/20 to-primary/20" },
      { title: "Colors & Shapes", emoji: "🎨", count: 15, color: "from-dream/20 to-secondary/20" },
      { title: "Rhymes & Songs", emoji: "🎵", count: 20, color: "from-accent/20 to-dream/20" },
    ],
  },
  {
    id: "ukg",
    label: "UKG",
    emoji: "👦",
    subjects: [
      { title: "Tamil Letters", emoji: "🇮🇳", count: 30, color: "from-primary/20 to-accent/20" },
      { title: "English Words", emoji: "🇬🇧", count: 40, color: "from-secondary/20 to-primary/20" },
      { title: "Basic Math", emoji: "➕", count: 25, color: "from-dream/20 to-secondary/20" },
      { title: "EVS Basics", emoji: "🌿", count: 20, color: "from-accent/20 to-dream/20" },
    ],
  },
  {
    id: "primary",
    label: "1st - 5th Std",
    emoji: "📚",
    subjects: [
      { title: "Tamil", emoji: "🇮🇳", count: 80, color: "from-primary/20 to-accent/20" },
      { title: "English", emoji: "🇬🇧", count: 90, color: "from-secondary/20 to-primary/20" },
      { title: "Mathematics", emoji: "📐", count: 60, color: "from-dream/20 to-secondary/20" },
      { title: "Science", emoji: "🔬", count: 55, color: "from-accent/20 to-dream/20" },
      { title: "Social Science", emoji: "🌍", count: 45, color: "from-primary/20 to-dream/20" },
    ],
  },
  {
    id: "middle",
    label: "6th - 8th Std",
    emoji: "📖",
    subjects: [
      { title: "Tamil", emoji: "🇮🇳", count: 120, color: "from-primary/20 to-accent/20" },
      { title: "English", emoji: "🇬🇧", count: 110, color: "from-secondary/20 to-primary/20" },
      { title: "Maths", emoji: "📐", count: 95, color: "from-dream/20 to-secondary/20" },
      { title: "Science", emoji: "🔬", count: 100, color: "from-accent/20 to-dream/20" },
      { title: "Social Science", emoji: "🌍", count: 85, color: "from-primary/20 to-dream/20" },
    ],
  },
  {
    id: "high",
    label: "9th - 10th Std",
    emoji: "🎓",
    subjects: [
      { title: "Tamil", emoji: "🇮🇳", count: 150, color: "from-primary/20 to-accent/20" },
      { title: "English", emoji: "🇬🇧", count: 140, color: "from-secondary/20 to-primary/20" },
      { title: "Maths", emoji: "📐", count: 130, color: "from-dream/20 to-secondary/20" },
      { title: "Science", emoji: "🔬", count: 120, color: "from-accent/20 to-dream/20" },
      { title: "Social Science", emoji: "🌍", count: 100, color: "from-primary/20 to-dream/20" },
    ],
  },
  {
    id: "hsc",
    label: "11th - 12th Std",
    emoji: "🏫",
    subjects: [
      { title: "Tamil / English", emoji: "📝", count: 160, color: "from-primary/20 to-accent/20" },
      { title: "Physics", emoji: "⚛️", count: 140, color: "from-secondary/20 to-primary/20" },
      { title: "Chemistry", emoji: "🧪", count: 130, color: "from-dream/20 to-secondary/20" },
      { title: "Maths / Biology", emoji: "🧬", count: 150, color: "from-accent/20 to-dream/20" },
      { title: "Computer Science", emoji: "💻", count: 90, color: "from-primary/20 to-dream/20" },
    ],
  },
  {
    id: "arts",
    label: "Arts & Science",
    emoji: "🎨",
    subjects: [
      { title: "Literature", emoji: "📜", count: 180, color: "from-primary/20 to-accent/20" },
      { title: "History", emoji: "🏛️", count: 150, color: "from-secondary/20 to-primary/20" },
      { title: "Economics", emoji: "📊", count: 120, color: "from-dream/20 to-secondary/20" },
      { title: "Political Science", emoji: "⚖️", count: 110, color: "from-accent/20 to-dream/20" },
      { title: "Psychology", emoji: "🧠", count: 100, color: "from-primary/20 to-dream/20" },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    emoji: "⚙️",
    subjects: [
      { title: "Engineering Maths", emoji: "📐", count: 200, color: "from-primary/20 to-accent/20" },
      { title: "Data Structures", emoji: "🗂️", count: 150, color: "from-secondary/20 to-primary/20" },
      { title: "Thermodynamics", emoji: "🔥", count: 120, color: "from-dream/20 to-secondary/20" },
      { title: "Circuit Theory", emoji: "⚡", count: 130, color: "from-accent/20 to-dream/20" },
      { title: "Programming", emoji: "💻", count: 180, color: "from-primary/20 to-dream/20" },
    ],
  },
  {
    id: "mbbs",
    label: "MBBS",
    emoji: "🩺",
    subjects: [
      { title: "Anatomy", emoji: "🦴", count: 250, color: "from-primary/20 to-accent/20" },
      { title: "Physiology", emoji: "❤️", count: 200, color: "from-secondary/20 to-primary/20" },
      { title: "Biochemistry", emoji: "🧪", count: 180, color: "from-dream/20 to-secondary/20" },
      { title: "Pharmacology", emoji: "💊", count: 220, color: "from-accent/20 to-dream/20" },
      { title: "Pathology", emoji: "🔬", count: 190, color: "from-primary/20 to-dream/20" },
    ],
  },
  {
    id: "dental",
    label: "Dental (BDS)",
    emoji: "🦷",
    subjects: [
      { title: "Oral Anatomy", emoji: "🦴", count: 180, color: "from-primary/20 to-accent/20" },
      { title: "Dental Materials", emoji: "🔧", count: 120, color: "from-secondary/20 to-primary/20" },
      { title: "Oral Pathology", emoji: "🔬", count: 150, color: "from-dream/20 to-secondary/20" },
      { title: "Prosthodontics", emoji: "🦷", count: 140, color: "from-accent/20 to-dream/20" },
      { title: "Orthodontics", emoji: "😁", count: 130, color: "from-primary/20 to-dream/20" },
    ],
  },
  {
    id: "mba",
    label: "MBA",
    emoji: "💼",
    subjects: [
      { title: "Marketing", emoji: "📢", count: 150, color: "from-primary/20 to-accent/20" },
      { title: "Finance", emoji: "💰", count: 180, color: "from-secondary/20 to-primary/20" },
      { title: "HR Management", emoji: "👥", count: 120, color: "from-dream/20 to-secondary/20" },
      { title: "Operations", emoji: "📦", count: 110, color: "from-accent/20 to-dream/20" },
      { title: "Business Strategy", emoji: "♟️", count: 100, color: "from-primary/20 to-dream/20" },
    ],
  },
  {
    id: "bed",
    label: "B.Ed",
    emoji: "👩‍🏫",
    subjects: [
      { title: "Pedagogy", emoji: "📚", count: 130, color: "from-primary/20 to-accent/20" },
      { title: "Child Psychology", emoji: "🧒", count: 110, color: "from-secondary/20 to-primary/20" },
      { title: "Teaching Methods", emoji: "🎯", count: 100, color: "from-dream/20 to-secondary/20" },
      { title: "Classroom Mgmt", emoji: "🏫", count: 90, color: "from-accent/20 to-dream/20" },
      { title: "Assessment", emoji: "📝", count: 80, color: "from-primary/20 to-dream/20" },
    ],
  },
  {
    id: "allied",
    label: "Allied Health Science",
    emoji: "🏥",
    subjects: [
      { title: "Human Anatomy", emoji: "🦴", count: 200, color: "from-primary/20 to-accent/20" },
      { title: "Microbiology", emoji: "🦠", count: 150, color: "from-secondary/20 to-primary/20" },
      { title: "Clinical Lab", emoji: "🧫", count: 130, color: "from-dream/20 to-secondary/20" },
      { title: "Radiology", emoji: "📡", count: 110, color: "from-accent/20 to-dream/20" },
      { title: "Nursing Care", emoji: "💉", count: 140, color: "from-primary/20 to-dream/20" },
    ],
  },
];

const StudyScreen = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showCourseList, setShowCourseList] = useState(true);

  const currentCourse = courses.find((c) => c.id === selectedCourse);

  return (
    <div className="min-h-screen pb-24 pt-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">📖 Study</h1>
        <button className="glass-card px-3 py-1.5 flex items-center gap-1.5 text-xs font-display text-muted-foreground">
          <Languages size={14} />
          Tamil / English
        </button>
      </div>

      {/* Today's Progress */}
      <motion.div
        className="glass-card p-5 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="font-display font-semibold text-sm text-foreground mb-3">Today's Progress</h3>
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
        <p className="text-xs text-muted-foreground mt-2">32 of 50 items reviewed</p>
      </motion.div>

      {/* Course Selector */}
      <button
        onClick={() => { setShowCourseList(!showCourseList); setSelectedCourse(null); }}
        className="glass-card p-4 flex items-center justify-between w-full mb-4"
      >
        <div className="flex items-center gap-3">
          <GraduationCap size={18} className="text-primary" />
          <span className="font-display font-semibold text-sm text-foreground">
            {currentCourse ? `${currentCourse.emoji} ${currentCourse.label}` : "Select Your Course"}
          </span>
        </div>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform ${showCourseList ? "rotate-180" : ""}`} />
      </button>

      {showCourseList && !selectedCourse && (
        <motion.div
          className="space-y-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {courses.map((course, i) => (
            <motion.button
              key={course.id}
              onClick={() => { setSelectedCourse(course.id); setShowCourseList(false); }}
              className="glass-card p-3.5 flex items-center gap-3 w-full text-left group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.03 * i }}
            >
              <span className="text-xl w-8 text-center">{course.emoji}</span>
              <span className="font-display font-semibold text-sm text-foreground flex-1">{course.label}</span>
              <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Subjects for selected course */}
      {currentCourse && (
        <>
          <h3 className="font-display font-semibold text-foreground mb-3">
            {currentCourse.emoji} {currentCourse.label} — Subjects
          </h3>
          <div className="space-y-3">
            {currentCourse.subjects.map((s, i) => (
              <motion.button
                key={s.title}
                className="glass-card p-4 flex items-center gap-4 w-full text-left group"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl shrink-0`}>
                  {s.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-sm text-foreground">{s.title}</h4>
                  <p className="text-xs text-muted-foreground">{s.count} items to study</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </motion.button>
            ))}
          </div>
        </>
      )}

      {/* Study Tip */}
      <motion.div
        className="glass-card p-4 mt-6 border-l-4 border-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-xs text-muted-foreground">
          💡 <span className="text-foreground font-semibold">Tip:</span> Study 30 minutes before sleep for best memory consolidation results!
        </p>
      </motion.div>
    </div>
  );
};

export default StudyScreen;
