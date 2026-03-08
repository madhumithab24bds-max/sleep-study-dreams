export type Board = "state" | "cbse";
export type Medium = "english" | "tamil";

export interface Chapter {
  id: string;
  en: string;
  ta: string;
}

export interface Subject {
  id: string;
  en: string;
  ta: string;
  emoji: string;
  color: string;
  chapters: Chapter[];
}

export interface Grade {
  id: string;
  en: string;
  ta: string;
  emoji: string;
  subjects: {
    state: Subject[];
    cbse: Subject[];
  };
}

const mathChaptersState = (grade: number): Chapter[] => {
  if (grade <= 2) return [
    { id: "m1", en: "Numbers", ta: "எண்கள்" },
    { id: "m2", en: "Addition", ta: "கூட்டல்" },
    { id: "m3", en: "Subtraction", ta: "கழித்தல்" },
    { id: "m4", en: "Shapes", ta: "வடிவங்கள்" },
    { id: "m5", en: "Patterns", ta: "வடிவமைப்புகள்" },
  ];
  if (grade <= 5) return [
    { id: "m1", en: "Numbers & Operations", ta: "எண்களும் செயல்பாடுகளும்" },
    { id: "m2", en: "Fractions", ta: "பின்னங்கள்" },
    { id: "m3", en: "Measurement", ta: "அளவீடு" },
    { id: "m4", en: "Geometry", ta: "வடிவியல்" },
    { id: "m5", en: "Data Handling", ta: "தரவு கையாளுதல்" },
    { id: "m6", en: "Money", ta: "பணம்" },
    { id: "m7", en: "Time & Calendar", ta: "நேரம் & நாட்காட்டி" },
  ];
  if (grade <= 8) return [
    { id: "m1", en: "Number System", ta: "எண் முறை" },
    { id: "m2", en: "Algebra", ta: "இயற்கணிதம்" },
    { id: "m3", en: "Geometry", ta: "வடிவியல்" },
    { id: "m4", en: "Mensuration", ta: "அளவீடு" },
    { id: "m5", en: "Statistics", ta: "புள்ளியியல்" },
    { id: "m6", en: "Ratio & Proportion", ta: "விகிதமும் விகிதாசாரமும்" },
    { id: "m7", en: "Profit & Loss", ta: "லாபமும் நஷ்டமும்" },
    { id: "m8", en: "Simple Interest", ta: "தனிவட்டி" },
  ];
  if (grade <= 10) return [
    { id: "m1", en: "Real Numbers", ta: "மெய் எண்கள்" },
    { id: "m2", en: "Polynomials", ta: "பல்லுறுப்புக்கோவைகள்" },
    { id: "m3", en: "Linear Equations", ta: "நேரியல் சமன்பாடுகள்" },
    { id: "m4", en: "Quadratic Equations", ta: "இருபடி சமன்பாடுகள்" },
    { id: "m5", en: "Coordinate Geometry", ta: "ஆய முறை வடிவியல்" },
    { id: "m6", en: "Trigonometry", ta: "முக்கோணவியல்" },
    { id: "m7", en: "Statistics & Probability", ta: "புள்ளியியல் & நிகழ்தகவு" },
    { id: "m8", en: "Circles", ta: "வட்டங்கள்" },
    { id: "m9", en: "Surface Area & Volume", ta: "பரப்பளவு & கனஅளவு" },
  ];
  return [
    { id: "m1", en: "Sets & Functions", ta: "கணங்கள் & சார்புகள்" },
    { id: "m2", en: "Trigonometry", ta: "முக்கோணவியல்" },
    { id: "m3", en: "Algebra", ta: "இயற்கணிதம்" },
    { id: "m4", en: "Calculus", ta: "நுண்கணிதம்" },
    { id: "m5", en: "Matrices & Determinants", ta: "அணிகள் & அணிக்கோவைகள்" },
    { id: "m6", en: "Probability", ta: "நிகழ்தகவு" },
    { id: "m7", en: "Vectors", ta: "வெக்டர்கள்" },
    { id: "m8", en: "Differential Equations", ta: "வகைநிலைச் சமன்பாடுகள்" },
  ];
};

const scienceChapters = (grade: number): Chapter[] => {
  if (grade <= 5) return [
    { id: "s1", en: "Living & Non-living", ta: "உயிருள்ளவை & உயிரற்றவை" },
    { id: "s2", en: "Plants", ta: "தாவரங்கள்" },
    { id: "s3", en: "Animals", ta: "விலங்குகள்" },
    { id: "s4", en: "Our Body", ta: "நமது உடல்" },
    { id: "s5", en: "Water & Air", ta: "நீர் & காற்று" },
    { id: "s6", en: "Food & Nutrition", ta: "உணவு & ஊட்டச்சத்து" },
  ];
  if (grade <= 8) return [
    { id: "s1", en: "Measurement", ta: "அளவீடு" },
    { id: "s2", en: "Force & Motion", ta: "விசை & இயக்கம்" },
    { id: "s3", en: "Heat & Temperature", ta: "வெப்பம் & வெப்பநிலை" },
    { id: "s4", en: "Light", ta: "ஒளி" },
    { id: "s5", en: "Electricity", ta: "மின்சாரம்" },
    { id: "s6", en: "Plant Kingdom", ta: "தாவர உலகம்" },
    { id: "s7", en: "Human Body Systems", ta: "மனித உடல் அமைப்புகள்" },
    { id: "s8", en: "Acids & Bases", ta: "அமிலங்கள் & காரங்கள்" },
  ];
  if (grade <= 10) return [
    { id: "s1", en: "Laws of Motion", ta: "இயக்க விதிகள்" },
    { id: "s2", en: "Atomic Structure", ta: "அணு அமைப்பு" },
    { id: "s3", en: "Chemical Reactions", ta: "வேதியியல் வினைகள்" },
    { id: "s4", en: "Heredity & Evolution", ta: "மரபியல் & பரிணாமம்" },
    { id: "s5", en: "Optics", ta: "ஒளியியல்" },
    { id: "s6", en: "Electricity & Magnetism", ta: "மின்சாரம் & காந்தவியல்" },
    { id: "s7", en: "Carbon Compounds", ta: "கார்பன் சேர்மங்கள்" },
    { id: "s8", en: "Reproduction", ta: "இனப்பெருக்கம்" },
  ];
  return [];
};

const tamilChapters = (grade: number): Chapter[] => {
  if (grade <= 5) return [
    { id: "t1", en: "Tamil Alphabets", ta: "தமிழ் எழுத்துக்கள்" },
    { id: "t2", en: "Simple Words", ta: "எளிய சொற்கள்" },
    { id: "t3", en: "Sentences", ta: "வாக்கியங்கள்" },
    { id: "t4", en: "Poems", ta: "பாடல்கள்" },
    { id: "t5", en: "Stories", ta: "கதைகள்" },
  ];
  if (grade <= 8) return [
    { id: "t1", en: "Prose", ta: "உரைநடை" },
    { id: "t2", en: "Poetry", ta: "கவிதை" },
    { id: "t3", en: "Grammar", ta: "இலக்கணம்" },
    { id: "t4", en: "Comprehension", ta: "படிப்புணர்வு" },
    { id: "t5", en: "Letter Writing", ta: "கடிதம் எழுதுதல்" },
    { id: "t6", en: "Essay", ta: "கட்டுரை" },
  ];
  return [
    { id: "t1", en: "Prose", ta: "உரைநடை" },
    { id: "t2", en: "Poetry", ta: "கவிதை" },
    { id: "t3", en: "Grammar - Phonetics", ta: "இலக்கணம் - ஒலியியல்" },
    { id: "t4", en: "Grammar - Syntax", ta: "இலக்கணம் - தொடரியல்" },
    { id: "t5", en: "Literature", ta: "இலக்கியம்" },
    { id: "t6", en: "Essay & Letter", ta: "கட்டுரை & கடிதம்" },
  ];
};

const englishChapters = (grade: number): Chapter[] => {
  if (grade <= 5) return [
    { id: "e1", en: "Alphabets & Phonics", ta: "எழுத்துக்கள் & ஒலிப்பு" },
    { id: "e2", en: "Reading Comprehension", ta: "வாசிப்புப் புரிதல்" },
    { id: "e3", en: "Simple Grammar", ta: "எளிய இலக்கணம்" },
    { id: "e4", en: "Vocabulary", ta: "சொல்வளம்" },
    { id: "e5", en: "Stories & Poems", ta: "கதைகள் & கவிதைகள்" },
  ];
  if (grade <= 8) return [
    { id: "e1", en: "Prose", ta: "உரைநடை" },
    { id: "e2", en: "Poetry", ta: "கவிதை" },
    { id: "e3", en: "Grammar", ta: "இலக்கணம்" },
    { id: "e4", en: "Writing Skills", ta: "எழுதும் திறன்" },
    { id: "e5", en: "Comprehension", ta: "புரிதல்" },
    { id: "e6", en: "Vocabulary", ta: "சொல்வளம்" },
  ];
  return [
    { id: "e1", en: "Prose", ta: "உரைநடை" },
    { id: "e2", en: "Poetry", ta: "கவிதை" },
    { id: "e3", en: "Grammar & Usage", ta: "இலக்கணம் & பயன்பாடு" },
    { id: "e4", en: "Writing", ta: "எழுத்து" },
    { id: "e5", en: "Literature", ta: "இலக்கியம்" },
  ];
};

const socialChapters = (grade: number): Chapter[] => {
  if (grade <= 5) return [
    { id: "ss1", en: "My Family", ta: "எனது குடும்பம்" },
    { id: "ss2", en: "My Neighbourhood", ta: "எனது அக்கம்பக்கம்" },
    { id: "ss3", en: "Our Country India", ta: "நமது நாடு இந்தியா" },
    { id: "ss4", en: "Festivals", ta: "திருவிழாக்கள்" },
    { id: "ss5", en: "Maps & Directions", ta: "வரைபடங்கள் & திசைகள்" },
  ];
  if (grade <= 8) return [
    { id: "ss1", en: "History - Ancient India", ta: "வரலாறு - பண்டைய இந்தியா" },
    { id: "ss2", en: "History - Medieval India", ta: "வரலாறு - இடைக்கால இந்தியா" },
    { id: "ss3", en: "Geography", ta: "புவியியல்" },
    { id: "ss4", en: "Civics", ta: "குடிமையியல்" },
    { id: "ss5", en: "Economics", ta: "பொருளியல்" },
  ];
  return [
    { id: "ss1", en: "Indian National Movement", ta: "இந்திய தேசிய இயக்கம்" },
    { id: "ss2", en: "World History", ta: "உலக வரலாறு" },
    { id: "ss3", en: "Indian Geography", ta: "இந்திய புவியியல்" },
    { id: "ss4", en: "Indian Constitution", ta: "இந்திய அரசியலமைப்பு" },
    { id: "ss5", en: "Economics", ta: "பொருளியல்" },
    { id: "ss6", en: "Disaster Management", ta: "பேரிடர் மேலாண்மை" },
  ];
};

const evsChapters: Chapter[] = [
  { id: "ev1", en: "Plants Around Us", ta: "நம்மைச் சுற்றிய தாவரங்கள்" },
  { id: "ev2", en: "Animals Around Us", ta: "நம்மைச் சுற்றிய விலங்குகள்" },
  { id: "ev3", en: "Weather & Seasons", ta: "வானிலை & பருவங்கள்" },
  { id: "ev4", en: "Clean Environment", ta: "சுத்தமான சுற்றுச்சூழல்" },
  { id: "ev5", en: "Our Helpers", ta: "நமது உதவியாளர்கள்" },
];

const preSchoolSubjects = (board: Board): Subject[] => [
  { id: "alphabets", en: "Alphabets (A-Z)", ta: "ஆங்கில எழுத்துக்கள்", emoji: "🔤", color: "from-primary/20 to-accent/20", chapters: [
    { id: "a1", en: "Letters A-F", ta: "எழுத்துக்கள் A-F" },
    { id: "a2", en: "Letters G-L", ta: "எழுத்துக்கள் G-L" },
    { id: "a3", en: "Letters M-R", ta: "எழுத்துக்கள் M-R" },
    { id: "a4", en: "Letters S-Z", ta: "எழுத்துக்கள் S-Z" },
  ]},
  { id: "numbers", en: "Numbers (1-20)", ta: "எண்கள் (1-20)", emoji: "🔢", color: "from-secondary/20 to-primary/20", chapters: [
    { id: "n1", en: "Numbers 1-5", ta: "எண்கள் 1-5" },
    { id: "n2", en: "Numbers 6-10", ta: "எண்கள் 6-10" },
    { id: "n3", en: "Numbers 11-20", ta: "எண்கள் 11-20" },
  ]},
  { id: "tamil-basic", en: "Tamil Basics", ta: "தமிழ் அடிப்படை", emoji: "🇮🇳", color: "from-dream/20 to-secondary/20", chapters: [
    { id: "tb1", en: "Vowels (உயிர் எழுத்துக்கள்)", ta: "உயிர் எழுத்துக்கள்" },
    { id: "tb2", en: "Consonants (மெய் எழுத்துக்கள்)", ta: "மெய் எழுத்துக்கள்" },
    { id: "tb3", en: "Simple Words", ta: "எளிய சொற்கள்" },
  ]},
  { id: "colors-shapes", en: "Colors & Shapes", ta: "வண்ணங்கள் & வடிவங்கள்", emoji: "🎨", color: "from-accent/20 to-dream/20", chapters: [
    { id: "cs1", en: "Primary Colors", ta: "அடிப்படை வண்ணங்கள்" },
    { id: "cs2", en: "Shapes", ta: "வடிவங்கள்" },
  ]},
  { id: "rhymes", en: "Rhymes & Songs", ta: "பாடல்கள்", emoji: "🎵", color: "from-primary/20 to-dream/20", chapters: [
    { id: "r1", en: "English Rhymes", ta: "ஆங்கில பாடல்கள்" },
    { id: "r2", en: "Tamil Rhymes", ta: "தமிழ் பாடல்கள்" },
  ]},
];

function buildSubjects(grade: number, board: Board): Subject[] {
  if (grade <= 2) {
    return [
      { id: "tamil", en: "Tamil", ta: "தமிழ்", emoji: "🇮🇳", color: "from-primary/20 to-accent/20", chapters: tamilChapters(grade) },
      { id: "english", en: "English", ta: "ஆங்கிலம்", emoji: "🇬🇧", color: "from-secondary/20 to-primary/20", chapters: englishChapters(grade) },
      { id: "maths", en: "Mathematics", ta: "கணிதம்", emoji: "📐", color: "from-dream/20 to-secondary/20", chapters: mathChaptersState(grade) },
      { id: "evs", en: "EVS", ta: "சுற்றுச்சூழல் அறிவியல்", emoji: "🌿", color: "from-accent/20 to-dream/20", chapters: evsChapters },
    ];
  }
  if (grade <= 5) {
    return [
      { id: "tamil", en: "Tamil", ta: "தமிழ்", emoji: "🇮🇳", color: "from-primary/20 to-accent/20", chapters: tamilChapters(grade) },
      { id: "english", en: "English", ta: "ஆங்கிலம்", emoji: "🇬🇧", color: "from-secondary/20 to-primary/20", chapters: englishChapters(grade) },
      { id: "maths", en: "Mathematics", ta: "கணிதம்", emoji: "📐", color: "from-dream/20 to-secondary/20", chapters: mathChaptersState(grade) },
      { id: "science", en: "Science", ta: "அறிவியல்", emoji: "🔬", color: "from-accent/20 to-dream/20", chapters: scienceChapters(grade) },
      { id: "social", en: "Social Science", ta: "சமூக அறிவியல்", emoji: "🌍", color: "from-primary/20 to-dream/20", chapters: socialChapters(grade) },
    ];
  }
  if (grade <= 10) {
    return [
      { id: "tamil", en: "Tamil", ta: "தமிழ்", emoji: "🇮🇳", color: "from-primary/20 to-accent/20", chapters: tamilChapters(grade) },
      { id: "english", en: "English", ta: "ஆங்கிலம்", emoji: "🇬🇧", color: "from-secondary/20 to-primary/20", chapters: englishChapters(grade) },
      { id: "maths", en: "Mathematics", ta: "கணிதம்", emoji: "📐", color: "from-dream/20 to-secondary/20", chapters: mathChaptersState(grade) },
      { id: "science", en: "Science", ta: "அறிவியல்", emoji: "🔬", color: "from-accent/20 to-dream/20", chapters: scienceChapters(grade) },
      { id: "social", en: "Social Science", ta: "சமூக அறிவியல்", emoji: "🌍", color: "from-primary/20 to-dream/20", chapters: socialChapters(grade) },
    ];
  }
  // 11-12
  const base: Subject[] = [
    { id: "tamil", en: "Tamil / English", ta: "தமிழ் / ஆங்கிலம்", emoji: "📝", color: "from-primary/20 to-accent/20", chapters: tamilChapters(grade) },
    { id: "physics", en: "Physics", ta: "இயற்பியல்", emoji: "⚛️", color: "from-secondary/20 to-primary/20", chapters: [
      { id: "p1", en: "Kinematics", ta: "இயக்கவியல்" },
      { id: "p2", en: "Laws of Motion", ta: "இயக்க விதிகள்" },
      { id: "p3", en: "Work, Energy & Power", ta: "வேலை, ஆற்றல் & திறன்" },
      { id: "p4", en: "Gravitation", ta: "ஈர்ப்பு விசை" },
      { id: "p5", en: "Waves", ta: "அலைகள்" },
      { id: "p6", en: "Optics", ta: "ஒளியியல்" },
      { id: "p7", en: "Electrostatics", ta: "மின்னியல்" },
      { id: "p8", en: "Current Electricity", ta: "மின்னோட்டம்" },
    ]},
    { id: "chemistry", en: "Chemistry", ta: "வேதியியல்", emoji: "🧪", color: "from-dream/20 to-secondary/20", chapters: [
      { id: "c1", en: "Atomic Structure", ta: "அணு அமைப்பு" },
      { id: "c2", en: "Chemical Bonding", ta: "வேதிப்பிணைப்பு" },
      { id: "c3", en: "Thermodynamics", ta: "வெப்பவியக்கவியல்" },
      { id: "c4", en: "Solutions", ta: "கரைசல்கள்" },
      { id: "c5", en: "Organic Chemistry", ta: "கரிம வேதியியல்" },
      { id: "c6", en: "Electrochemistry", ta: "மின்வேதியியல்" },
    ]},
  ];
  if (board === "state") {
    base.push(
      { id: "maths", en: "Mathematics", ta: "கணிதம்", emoji: "📐", color: "from-accent/20 to-dream/20", chapters: mathChaptersState(grade) },
      { id: "biology", en: "Biology", ta: "உயிரியல்", emoji: "🧬", color: "from-primary/20 to-dream/20", chapters: [
        { id: "b1", en: "Cell Biology", ta: "உயிரணு உயிரியல்" },
        { id: "b2", en: "Plant Biology", ta: "தாவர உயிரியல்" },
        { id: "b3", en: "Human Physiology", ta: "மனித உடலியல்" },
        { id: "b4", en: "Genetics", ta: "மரபியல்" },
        { id: "b5", en: "Ecology", ta: "சூழலியல்" },
      ]},
      { id: "cs", en: "Computer Science", ta: "கணினி அறிவியல்", emoji: "💻", color: "from-secondary/20 to-dream/20", chapters: [
        { id: "cs1", en: "Introduction to Computers", ta: "கணினி அறிமுகம்" },
        { id: "cs2", en: "Programming in C++/Python", ta: "C++/Python நிரலாக்கம்" },
        { id: "cs3", en: "Data Structures", ta: "தரவு கட்டமைப்புகள்" },
        { id: "cs4", en: "Boolean Algebra", ta: "பூலியன் இயற்கணிதம்" },
      ]}
    );
  } else {
    base.push(
      { id: "maths", en: "Mathematics", ta: "கணிதம்", emoji: "📐", color: "from-accent/20 to-dream/20", chapters: mathChaptersState(grade) },
      { id: "biology", en: "Biology", ta: "உயிரியல்", emoji: "🧬", color: "from-primary/20 to-dream/20", chapters: [
        { id: "b1", en: "Diversity of Living Organisms", ta: "உயிரினங்களின் பன்முகத்தன்மை" },
        { id: "b2", en: "Structural Organisation", ta: "கட்டமைப்பு அமைப்பு" },
        { id: "b3", en: "Cell Biology", ta: "உயிரணு உயிரியல்" },
        { id: "b4", en: "Plant Physiology", ta: "தாவர உடலியல்" },
        { id: "b5", en: "Human Physiology", ta: "மனித உடலியல்" },
        { id: "b6", en: "Genetics & Evolution", ta: "மரபியல் & பரிணாமம்" },
        { id: "b7", en: "Biotechnology", ta: "உயிர்தொழில்நுட்பம்" },
        { id: "b8", en: "Ecology", ta: "சூழலியல்" },
      ]},
    );
  }
  return base;
}

function buildGrade(num: number, label: string, labelTa: string, emoji: string): Grade {
  return {
    id: `grade-${num}`,
    en: label,
    ta: labelTa,
    emoji,
    subjects: {
      state: num === 0 ? preSchoolSubjects("state") : buildSubjects(num, "state"),
      cbse: num === 0 ? preSchoolSubjects("cbse") : buildSubjects(num, "cbse"),
    },
  };
}

export const indianGrades: Grade[] = [
  buildGrade(0, "LKG", "எல்.கே.ஜி", "🧒"),
  buildGrade(0, "UKG", "யு.கே.ஜி", "👦"),
  buildGrade(1, "1st Std", "1ஆம் வகுப்பு", "1️⃣"),
  buildGrade(2, "2nd Std", "2ஆம் வகுப்பு", "2️⃣"),
  buildGrade(3, "3rd Std", "3ஆம் வகுப்பு", "3️⃣"),
  buildGrade(4, "4th Std", "4ஆம் வகுப்பு", "4️⃣"),
  buildGrade(5, "5th Std", "5ஆம் வகுப்பு", "5️⃣"),
  buildGrade(6, "6th Std", "6ஆம் வகுப்பு", "6️⃣"),
  buildGrade(7, "7th Std", "7ஆம் வகுப்பு", "7️⃣"),
  buildGrade(8, "8th Std", "8ஆம் வகுப்பு", "8️⃣"),
  buildGrade(9, "9th Std", "9ஆம் வகுப்பு", "9️⃣"),
  buildGrade(10, "10th Std", "10ஆம் வகுப்பு", "🔟"),
  buildGrade(11, "11th Std", "11ஆம் வகுப்பு", "🎓"),
  buildGrade(12, "12th Std", "12ஆம் வகுப்பு", "🏫"),
];

// LKG and UKG share the same structure, fix IDs
indianGrades[0].id = "lkg";
indianGrades[1].id = "ukg";
