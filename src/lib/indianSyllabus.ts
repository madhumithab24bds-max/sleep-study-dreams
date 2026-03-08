export type Board = "state" | "cbse";
export type Medium = "english" | "tamil" | "hindi";

export interface Chapter {
  id: string;
  en: string;
  ta: string;
  hi: string;
}

export interface Subject {
  id: string;
  en: string;
  ta: string;
  hi: string;
  emoji: string;
  color: string;
  chapters: Chapter[];
}

export interface Grade {
  id: string;
  en: string;
  ta: string;
  hi: string;
  emoji: string;
  subjects: {
    state: Subject[];
    cbse: Subject[];
  };
}

const mathChaptersState = (grade: number): Chapter[] => {
  if (grade <= 2) return [
    { id: "m1", en: "Numbers", ta: "எண்கள்", hi: "संख्याएं" },
    { id: "m2", en: "Addition", ta: "கூட்டல்", hi: "जोड़" },
    { id: "m3", en: "Subtraction", ta: "கழித்தல்", hi: "घटाव" },
    { id: "m4", en: "Shapes", ta: "வடிவங்கள்", hi: "आकार" },
    { id: "m5", en: "Patterns", ta: "வடிவமைப்புகள்", hi: "पैटर्न" },
  ];
  if (grade <= 5) return [
    { id: "m1", en: "Numbers & Operations", ta: "எண்களும் செயல்பாடுகளும்", hi: "संख्याएं और संक्रियाएं" },
    { id: "m2", en: "Fractions", ta: "பின்னங்கள்", hi: "भिन्न" },
    { id: "m3", en: "Measurement", ta: "அளவீடு", hi: "मापन" },
    { id: "m4", en: "Geometry", ta: "வடிவியல்", hi: "ज्यामिति" },
    { id: "m5", en: "Data Handling", ta: "தரவு கையாளுதல்", hi: "आंकड़ों का प्रबंधन" },
    { id: "m6", en: "Money", ta: "பணம்", hi: "धन" },
    { id: "m7", en: "Time & Calendar", ta: "நேரம் & நாட்காட்டி", hi: "समय और कैलेंडर" },
  ];
  if (grade <= 8) return [
    { id: "m1", en: "Number System", ta: "எண் முறை", hi: "संख्या पद्धति" },
    { id: "m2", en: "Algebra", ta: "இயற்கணிதம்", hi: "बीजगणित" },
    { id: "m3", en: "Geometry", ta: "வடிவியல்", hi: "ज्यामिति" },
    { id: "m4", en: "Mensuration", ta: "அளவீடு", hi: "क्षेत्रमिति" },
    { id: "m5", en: "Statistics", ta: "புள்ளியியல்", hi: "सांख्यिकी" },
    { id: "m6", en: "Ratio & Proportion", ta: "விகிதமும் விகிதாசாரமும்", hi: "अनुपात और समानुपात" },
    { id: "m7", en: "Profit & Loss", ta: "லாபமும் நஷ்டமும்", hi: "लाभ और हानि" },
    { id: "m8", en: "Simple Interest", ta: "தனிவட்டி", hi: "साधारण ब्याज" },
  ];
  if (grade <= 10) return [
    { id: "m1", en: "Real Numbers", ta: "மெய் எண்கள்", hi: "वास्तविक संख्याएं" },
    { id: "m2", en: "Polynomials", ta: "பல்லுறுப்புக்கோவைகள்", hi: "बहुपद" },
    { id: "m3", en: "Linear Equations", ta: "நேரியல் சமன்பாடுகள்", hi: "रैखिक समीकरण" },
    { id: "m4", en: "Quadratic Equations", ta: "இருபடி சமன்பாடுகள்", hi: "द्विघात समीकरण" },
    { id: "m5", en: "Coordinate Geometry", ta: "ஆய முறை வடிவியல்", hi: "निर्देशांक ज्यामिति" },
    { id: "m6", en: "Trigonometry", ta: "முக்கோணவியல்", hi: "त्रिकोणमिति" },
    { id: "m7", en: "Statistics & Probability", ta: "புள்ளியியல் & நிகழ்தகவு", hi: "सांख्यिकी और प्रायिकता" },
    { id: "m8", en: "Circles", ta: "வட்டங்கள்", hi: "वृत्त" },
    { id: "m9", en: "Surface Area & Volume", ta: "பரப்பளவு & கனஅளவு", hi: "पृष्ठीय क्षेत्रफल और आयतन" },
  ];
  return [
    { id: "m1", en: "Sets & Functions", ta: "கணங்கள் & சார்புகள்", hi: "समुच्चय और फलन" },
    { id: "m2", en: "Trigonometry", ta: "முக்கோணவியல்", hi: "त्रिकोणमिति" },
    { id: "m3", en: "Algebra", ta: "இயற்கணிதம்", hi: "बीजगणित" },
    { id: "m4", en: "Calculus", ta: "நுண்கணிதம்", hi: "कलन" },
    { id: "m5", en: "Matrices & Determinants", ta: "அணிகள் & அணிக்கோவைகள்", hi: "मैट्रिक्स और सारणिक" },
    { id: "m6", en: "Probability", ta: "நிகழ்தகவு", hi: "प्रायिकता" },
    { id: "m7", en: "Vectors", ta: "வெக்டர்கள்", hi: "सदिश" },
    { id: "m8", en: "Differential Equations", ta: "வகைநிலைச் சமன்பாடுகள்", hi: "अवकल समीकरण" },
  ];
};

const scienceChapters = (grade: number): Chapter[] => {
  if (grade <= 5) return [
    { id: "s1", en: "Living & Non-living", ta: "உயிருள்ளவை & உயிரற்றவை", hi: "सजीव और निर्जीव" },
    { id: "s2", en: "Plants", ta: "தாவரங்கள்", hi: "पौधे" },
    { id: "s3", en: "Animals", ta: "விலங்குகள்", hi: "जानवर" },
    { id: "s4", en: "Our Body", ta: "நமது உடல்", hi: "हमारा शरीर" },
    { id: "s5", en: "Water & Air", ta: "நீர் & காற்று", hi: "जल और वायु" },
    { id: "s6", en: "Food & Nutrition", ta: "உணவு & ஊட்டச்சத்து", hi: "भोजन और पोषण" },
  ];
  if (grade <= 8) return [
    { id: "s1", en: "Measurement", ta: "அளவீடு", hi: "मापन" },
    { id: "s2", en: "Force & Motion", ta: "விசை & இயக்கம்", hi: "बल और गति" },
    { id: "s3", en: "Heat & Temperature", ta: "வெப்பம் & வெப்பநிலை", hi: "ऊष्मा और ताप" },
    { id: "s4", en: "Light", ta: "ஒளி", hi: "प्रकाश" },
    { id: "s5", en: "Electricity", ta: "மின்சாரம்", hi: "विद्युत" },
    { id: "s6", en: "Plant Kingdom", ta: "தாவர உலகம்", hi: "पादप जगत" },
    { id: "s7", en: "Human Body Systems", ta: "மனித உடல் அமைப்புகள்", hi: "मानव शरीर तंत्र" },
    { id: "s8", en: "Acids & Bases", ta: "அமிலங்கள் & காரங்கள்", hi: "अम्ल और क्षार" },
  ];
  if (grade <= 10) return [
    { id: "s1", en: "Laws of Motion", ta: "இயக்க விதிகள்", hi: "गति के नियम" },
    { id: "s2", en: "Atomic Structure", ta: "அணு அமைப்பு", hi: "परमाणु संरचना" },
    { id: "s3", en: "Chemical Reactions", ta: "வேதியியல் வினைகள்", hi: "रासायनिक अभिक्रियाएं" },
    { id: "s4", en: "Heredity & Evolution", ta: "மரபியல் & பரிணாமம்", hi: "आनुवंशिकता और विकास" },
    { id: "s5", en: "Optics", ta: "ஒளியியல்", hi: "प्रकाशिकी" },
    { id: "s6", en: "Electricity & Magnetism", ta: "மின்சாரம் & காந்தவியல்", hi: "विद्युत और चुंबकत्व" },
    { id: "s7", en: "Carbon Compounds", ta: "கார்பன் சேர்மங்கள்", hi: "कार्बन यौगिक" },
    { id: "s8", en: "Reproduction", ta: "இனப்பெருக்கம்", hi: "प्रजनन" },
  ];
  return [];
};

const tamilChapters = (grade: number): Chapter[] => {
  if (grade <= 5) return [
    { id: "t1", en: "Tamil Alphabets", ta: "தமிழ் எழுத்துக்கள்", hi: "तमिल वर्णमाला" },
    { id: "t2", en: "Simple Words", ta: "எளிய சொற்கள்", hi: "सरल शब्द" },
    { id: "t3", en: "Sentences", ta: "வாக்கியங்கள்", hi: "वाक्य" },
    { id: "t4", en: "Poems", ta: "பாடல்கள்", hi: "कविताएं" },
    { id: "t5", en: "Stories", ta: "கதைகள்", hi: "कहानियां" },
  ];
  if (grade <= 8) return [
    { id: "t1", en: "Prose", ta: "உரைநடை", hi: "गद्य" },
    { id: "t2", en: "Poetry", ta: "கவிதை", hi: "कविता" },
    { id: "t3", en: "Grammar", ta: "இலக்கணம்", hi: "व्याकरण" },
    { id: "t4", en: "Comprehension", ta: "படிப்புணர்வு", hi: "बोध" },
    { id: "t5", en: "Letter Writing", ta: "கடிதம் எழுதுதல்", hi: "पत्र लेखन" },
    { id: "t6", en: "Essay", ta: "கட்டுரை", hi: "निबंध" },
  ];
  return [
    { id: "t1", en: "Prose", ta: "உரைநடை", hi: "गद्य" },
    { id: "t2", en: "Poetry", ta: "கவிதை", hi: "कविता" },
    { id: "t3", en: "Grammar - Phonetics", ta: "இலக்கணம் - ஒலியியல்", hi: "व्याकरण - ध्वनि विज्ञान" },
    { id: "t4", en: "Grammar - Syntax", ta: "இலக்கணம் - தொடரியல்", hi: "व्याकरण - वाक्य विन्यास" },
    { id: "t5", en: "Literature", ta: "இலக்கியம்", hi: "साहित्य" },
    { id: "t6", en: "Essay & Letter", ta: "கட்டுரை & கடிதம்", hi: "निबंध और पत्र" },
  ];
};

const englishChapters = (grade: number): Chapter[] => {
  if (grade <= 5) return [
    { id: "e1", en: "Alphabets & Phonics", ta: "எழுத்துக்கள் & ஒலிப்பு", hi: "वर्णमाला और ध्वनिकी" },
    { id: "e2", en: "Reading Comprehension", ta: "வாசிப்புப் புரிதல்", hi: "पठन बोध" },
    { id: "e3", en: "Simple Grammar", ta: "எளிய இலக்கணம்", hi: "सरल व्याकरण" },
    { id: "e4", en: "Vocabulary", ta: "சொல்வளம்", hi: "शब्दावली" },
    { id: "e5", en: "Stories & Poems", ta: "கதைகள் & கவிதைகள்", hi: "कहानियां और कविताएं" },
  ];
  if (grade <= 8) return [
    { id: "e1", en: "Prose", ta: "உரைநடை", hi: "गद्य" },
    { id: "e2", en: "Poetry", ta: "கவிதை", hi: "कविता" },
    { id: "e3", en: "Grammar", ta: "இலக்கணம்", hi: "व्याकरण" },
    { id: "e4", en: "Writing Skills", ta: "எழுதும் திறன்", hi: "लेखन कौशल" },
    { id: "e5", en: "Comprehension", ta: "புரிதல்", hi: "बोध" },
    { id: "e6", en: "Vocabulary", ta: "சொல்வளம்", hi: "शब्दावली" },
  ];
  return [
    { id: "e1", en: "Prose", ta: "உரைநடை", hi: "गद्य" },
    { id: "e2", en: "Poetry", ta: "கவிதை", hi: "कविता" },
    { id: "e3", en: "Grammar & Usage", ta: "இலக்கணம் & பயன்பாடு", hi: "व्याकरण और प्रयोग" },
    { id: "e4", en: "Writing", ta: "எழுத்து", hi: "लेखन" },
    { id: "e5", en: "Literature", ta: "இலக்கியம்", hi: "साहित्य" },
  ];
};

const socialChapters = (grade: number): Chapter[] => {
  if (grade <= 5) return [
    { id: "ss1", en: "My Family", ta: "எனது குடும்பம்", hi: "मेरा परिवार" },
    { id: "ss2", en: "My Neighbourhood", ta: "எனது அக்கம்பக்கம்", hi: "मेरा पड़ोस" },
    { id: "ss3", en: "Our Country India", ta: "நமது நாடு இந்தியா", hi: "हमारा देश भारत" },
    { id: "ss4", en: "Festivals", ta: "திருவிழாக்கள்", hi: "त्योहार" },
    { id: "ss5", en: "Maps & Directions", ta: "வரைபடங்கள் & திசைகள்", hi: "मानचित्र और दिशाएं" },
  ];
  if (grade <= 8) return [
    { id: "ss1", en: "History - Ancient India", ta: "வரலாறு - பண்டைய இந்தியா", hi: "इतिहास - प्राचीन भारत" },
    { id: "ss2", en: "History - Medieval India", ta: "வரலாறு - இடைக்கால இந்தியா", hi: "इतिहास - मध्यकालीन भारत" },
    { id: "ss3", en: "Geography", ta: "புவியியல்", hi: "भूगोल" },
    { id: "ss4", en: "Civics", ta: "குடிமையியல்", hi: "नागरिक शास्त्र" },
    { id: "ss5", en: "Economics", ta: "பொருளியல்", hi: "अर्थशास्त्र" },
  ];
  return [
    { id: "ss1", en: "Indian National Movement", ta: "இந்திய தேசிய இயக்கம்", hi: "भारतीय राष्ट्रीय आंदोलन" },
    { id: "ss2", en: "World History", ta: "உலக வரலாறு", hi: "विश्व इतिहास" },
    { id: "ss3", en: "Indian Geography", ta: "இந்திய புவியியல்", hi: "भारत का भूगोल" },
    { id: "ss4", en: "Indian Constitution", ta: "இந்திய அரசியலமைப்பு", hi: "भारतीय संविधान" },
    { id: "ss5", en: "Economics", ta: "பொருளியல்", hi: "अर्थशास्त्र" },
    { id: "ss6", en: "Disaster Management", ta: "பேரிடர் மேலாண்மை", hi: "आपदा प्रबंधन" },
  ];
};

const evsChapters: Chapter[] = [
  { id: "ev1", en: "Plants Around Us", ta: "நம்மைச் சுற்றிய தாவரங்கள்", hi: "हमारे आसपास के पौधे" },
  { id: "ev2", en: "Animals Around Us", ta: "நம்மைச் சுற்றிய விலங்குகள்", hi: "हमारे आसपास के जानवर" },
  { id: "ev3", en: "Weather & Seasons", ta: "வானிலை & பருவங்கள்", hi: "मौसम और ऋतुएं" },
  { id: "ev4", en: "Clean Environment", ta: "சுத்தமான சுற்றுச்சூழல்", hi: "स्वच्छ पर्यावरण" },
  { id: "ev5", en: "Our Helpers", ta: "நமது உதவியாளர்கள்", hi: "हमारे सहायक" },
];

const preSchoolSubjects = (board: Board): Subject[] => [
  { id: "alphabets", en: "Alphabets (A-Z)", ta: "ஆங்கில எழுத்துக்கள்", hi: "अक्षर (A-Z)", emoji: "🔤", color: "from-primary/20 to-accent/20", chapters: [
    { id: "a1", en: "Letters A-F", ta: "எழுத்துக்கள் A-F", hi: "अक्षर A-F" },
    { id: "a2", en: "Letters G-L", ta: "எழுத்துக்கள் G-L", hi: "अक्षर G-L" },
    { id: "a3", en: "Letters M-R", ta: "எழுத்துக்கள் M-R", hi: "अक्षर M-R" },
    { id: "a4", en: "Letters S-Z", ta: "எழுத்துக்கள் S-Z", hi: "अक्षर S-Z" },
  ]},
  { id: "numbers", en: "Numbers (1-20)", ta: "எண்கள் (1-20)", hi: "संख्याएं (1-20)", emoji: "🔢", color: "from-secondary/20 to-primary/20", chapters: [
    { id: "n1", en: "Numbers 1-5", ta: "எண்கள் 1-5", hi: "संख्याएं 1-5" },
    { id: "n2", en: "Numbers 6-10", ta: "எண்கள் 6-10", hi: "संख्याएं 6-10" },
    { id: "n3", en: "Numbers 11-20", ta: "எண்கள் 11-20", hi: "संख्याएं 11-20" },
  ]},
  { id: "tamil-basic", en: "Tamil Basics", ta: "தமிழ் அடிப்படை", hi: "तमिल मूल", emoji: "🇮🇳", color: "from-dream/20 to-secondary/20", chapters: [
    { id: "tb1", en: "Vowels (உயிர் எழுத்துக்கள்)", ta: "உயிர் எழுத்துக்கள்", hi: "स्वर" },
    { id: "tb2", en: "Consonants (மெய் எழுத்துக்கள்)", ta: "மெய் எழுத்துக்கள்", hi: "व्यंजन" },
    { id: "tb3", en: "Simple Words", ta: "எளிய சொற்கள்", hi: "सरल शब्द" },
  ]},
  { id: "colors-shapes", en: "Colors & Shapes", ta: "வண்ணங்கள் & வடிவங்கள்", hi: "रंग और आकार", emoji: "🎨", color: "from-accent/20 to-dream/20", chapters: [
    { id: "cs1", en: "Primary Colors", ta: "அடிப்படை வண்ணங்கள்", hi: "प्राथमिक रंग" },
    { id: "cs2", en: "Shapes", ta: "வடிவங்கள்", hi: "आकार" },
  ]},
  { id: "rhymes", en: "Rhymes & Songs", ta: "பாடல்கள்", hi: "कविताएं और गीत", emoji: "🎵", color: "from-primary/20 to-dream/20", chapters: [
    { id: "r1", en: "English Rhymes", ta: "ஆங்கில பாடல்கள்", hi: "अंग्रेजी कविताएं" },
    { id: "r2", en: "Tamil Rhymes", ta: "தமிழ் பாடல்கள்", hi: "तमिल कविताएं" },
  ]},
];

function buildSubjects(grade: number, board: Board): Subject[] {
  if (grade <= 2) {
    return [
      { id: "tamil", en: "Tamil", ta: "தமிழ்", hi: "तमिल", emoji: "🇮🇳", color: "from-primary/20 to-accent/20", chapters: tamilChapters(grade) },
      { id: "english", en: "English", ta: "ஆங்கிலம்", hi: "अंग्रेजी", emoji: "🇬🇧", color: "from-secondary/20 to-primary/20", chapters: englishChapters(grade) },
      { id: "maths", en: "Mathematics", ta: "கணிதம்", hi: "गणित", emoji: "📐", color: "from-dream/20 to-secondary/20", chapters: mathChaptersState(grade) },
      { id: "evs", en: "EVS", ta: "சுற்றுச்சூழல் அறிவியல்", hi: "पर्यावरण अध्ययन", emoji: "🌿", color: "from-accent/20 to-dream/20", chapters: evsChapters },
    ];
  }
  if (grade <= 5) {
    return [
      { id: "tamil", en: "Tamil", ta: "தமிழ்", hi: "तमिल", emoji: "🇮🇳", color: "from-primary/20 to-accent/20", chapters: tamilChapters(grade) },
      { id: "english", en: "English", ta: "ஆங்கிலம்", hi: "अंग्रेजी", emoji: "🇬🇧", color: "from-secondary/20 to-primary/20", chapters: englishChapters(grade) },
      { id: "maths", en: "Mathematics", ta: "கணிதம்", hi: "गणित", emoji: "📐", color: "from-dream/20 to-secondary/20", chapters: mathChaptersState(grade) },
      { id: "science", en: "Science", ta: "அறிவியல்", hi: "विज्ञान", emoji: "🔬", color: "from-accent/20 to-dream/20", chapters: scienceChapters(grade) },
      { id: "social", en: "Social Science", ta: "சமூக அறிவியல்", hi: "सामाजिक विज्ञान", emoji: "🌍", color: "from-primary/20 to-dream/20", chapters: socialChapters(grade) },
    ];
  }
  if (grade <= 10) {
    return [
      { id: "tamil", en: "Tamil", ta: "தமிழ்", hi: "तमिल", emoji: "🇮🇳", color: "from-primary/20 to-accent/20", chapters: tamilChapters(grade) },
      { id: "english", en: "English", ta: "ஆங்கிலம்", hi: "अंग्रेजी", emoji: "🇬🇧", color: "from-secondary/20 to-primary/20", chapters: englishChapters(grade) },
      { id: "maths", en: "Mathematics", ta: "கணிதம்", hi: "गणित", emoji: "📐", color: "from-dream/20 to-secondary/20", chapters: mathChaptersState(grade) },
      { id: "science", en: "Science", ta: "அறிவியல்", hi: "विज्ञान", emoji: "🔬", color: "from-accent/20 to-dream/20", chapters: scienceChapters(grade) },
      { id: "social", en: "Social Science", ta: "சமூக அறிவியல்", hi: "सामाजिक विज्ञान", emoji: "🌍", color: "from-primary/20 to-dream/20", chapters: socialChapters(grade) },
    ];
  }
  // 11-12
  const base: Subject[] = [
    { id: "tamil", en: "Tamil / English", ta: "தமிழ் / ஆங்கிலம்", hi: "तमिल / अंग्रेजी", emoji: "📝", color: "from-primary/20 to-accent/20", chapters: tamilChapters(grade) },
    { id: "physics", en: "Physics", ta: "இயற்பியல்", hi: "भौतिक विज्ञान", emoji: "⚛️", color: "from-secondary/20 to-primary/20", chapters: [
      { id: "p1", en: "Kinematics", ta: "இயக்கவியல்", hi: "गतिविज्ञान" },
      { id: "p2", en: "Laws of Motion", ta: "இயக்க விதிகள்", hi: "गति के नियम" },
      { id: "p3", en: "Work, Energy & Power", ta: "வேலை, ஆற்றல் & திறன்", hi: "कार्य, ऊर्जा और शक्ति" },
      { id: "p4", en: "Gravitation", ta: "ஈர்ப்பு விசை", hi: "गुरुत्वाकर्षण" },
      { id: "p5", en: "Waves", ta: "அலைகள்", hi: "तरंगें" },
      { id: "p6", en: "Optics", ta: "ஒளியியல்", hi: "प्रकाशिकी" },
      { id: "p7", en: "Electrostatics", ta: "மின்னியல்", hi: "स्थिर विद्युत" },
      { id: "p8", en: "Current Electricity", ta: "மின்னோட்டம்", hi: "धारा विद्युत" },
    ]},
    { id: "chemistry", en: "Chemistry", ta: "வேதியியல்", hi: "रसायन विज्ञान", emoji: "🧪", color: "from-dream/20 to-secondary/20", chapters: [
      { id: "c1", en: "Atomic Structure", ta: "அணு அமைப்பு", hi: "परमाणु संरचना" },
      { id: "c2", en: "Chemical Bonding", ta: "வேதிப்பிணைப்பு", hi: "रासायनिक बंधन" },
      { id: "c3", en: "Thermodynamics", ta: "வெப்பவியக்கவியல்", hi: "ऊष्मागतिकी" },
      { id: "c4", en: "Solutions", ta: "கரைசல்கள்", hi: "विलयन" },
      { id: "c5", en: "Organic Chemistry", ta: "கரிம வேதியியல்", hi: "कार्बनिक रसायन" },
      { id: "c6", en: "Electrochemistry", ta: "மின்வேதியியல்", hi: "विद्युत रसायन" },
    ]},
  ];
  if (board === "state") {
    base.push(
      { id: "maths", en: "Mathematics", ta: "கணிதம்", hi: "गणित", emoji: "📐", color: "from-accent/20 to-dream/20", chapters: mathChaptersState(grade) },
      { id: "biology", en: "Biology", ta: "உயிரியல்", hi: "जीव विज्ञान", emoji: "🧬", color: "from-primary/20 to-dream/20", chapters: [
        { id: "b1", en: "Cell Biology", ta: "உயிரணு உயிரியல்", hi: "कोशिका जीव विज्ञान" },
        { id: "b2", en: "Plant Biology", ta: "தாவர உயிரியல்", hi: "पादप जीव विज्ञान" },
        { id: "b3", en: "Human Physiology", ta: "மனித உடலியல்", hi: "मानव शरीर क्रिया विज्ञान" },
        { id: "b4", en: "Genetics", ta: "மரபியல்", hi: "आनुवंशिकी" },
        { id: "b5", en: "Ecology", ta: "சூழலியல்", hi: "पारिस्थितिकी" },
      ]},
      { id: "cs", en: "Computer Science", ta: "கணினி அறிவியல்", hi: "कंप्यूटर विज्ञान", emoji: "💻", color: "from-secondary/20 to-dream/20", chapters: [
        { id: "cs1", en: "Introduction to Computers", ta: "கணினி அறிமுகம்", hi: "कंप्यूटर परिचय" },
        { id: "cs2", en: "Programming in C++/Python", ta: "C++/Python நிரலாக்கம்", hi: "C++/Python प्रोग्रामिंग" },
        { id: "cs3", en: "Data Structures", ta: "தரவு கட்டமைப்புகள்", hi: "डेटा संरचना" },
        { id: "cs4", en: "Boolean Algebra", ta: "பூலியன் இயற்கணிதம்", hi: "बूलियन बीजगणित" },
      ]}
    );
  } else {
    base.push(
      { id: "maths", en: "Mathematics", ta: "கணிதம்", hi: "गणित", emoji: "📐", color: "from-accent/20 to-dream/20", chapters: mathChaptersState(grade) },
      { id: "biology", en: "Biology", ta: "உயிரியல்", hi: "जीव विज्ञान", emoji: "🧬", color: "from-primary/20 to-dream/20", chapters: [
        { id: "b1", en: "Diversity of Living Organisms", ta: "உயிரினங்களின் பன்முகத்தன்மை", hi: "जीवों की विविधता" },
        { id: "b2", en: "Structural Organisation", ta: "கட்டமைப்பு அமைப்பு", hi: "संरचनात्मक संगठन" },
        { id: "b3", en: "Cell Biology", ta: "உயிரணு உயிரியல்", hi: "कोशिका जीव विज्ञान" },
        { id: "b4", en: "Plant Physiology", ta: "தாவர உடலியல்", hi: "पादप शरीर क्रिया विज्ञान" },
        { id: "b5", en: "Human Physiology", ta: "மனித உடலியல்", hi: "मानव शरीर क्रिया विज्ञान" },
        { id: "b6", en: "Genetics & Evolution", ta: "மரபியல் & பரிணாமம்", hi: "आनुवंशिकी और विकास" },
        { id: "b7", en: "Biotechnology", ta: "உயிர்தொழில்நுட்பம்", hi: "जैव प्रौद्योगिकी" },
        { id: "b8", en: "Ecology", ta: "சூழலியல்", hi: "पारिस्थितिकी" },
      ]}
    );
  }
  return base;
}

function buildGrade(num: number, label: string, labelTa: string, labelHi: string, emoji: string): Grade {
  return {
    id: `grade-${num}`,
    en: label,
    ta: labelTa,
    hi: labelHi,
    emoji,
    subjects: {
      state: num === 0 ? preSchoolSubjects("state") : buildSubjects(num, "state"),
      cbse: num === 0 ? preSchoolSubjects("cbse") : buildSubjects(num, "cbse"),
    },
  };
}

export const indianGrades: Grade[] = [
  buildGrade(0, "LKG", "எல்.கே.ஜி", "एल.के.जी", "🧒"),
  buildGrade(0, "UKG", "யு.கே.ஜி", "यू.के.जी", "👦"),
  buildGrade(1, "1st Std", "1ஆம் வகுப்பு", "कक्षा 1", "1️⃣"),
  buildGrade(2, "2nd Std", "2ஆம் வகுப்பு", "कक्षा 2", "2️⃣"),
  buildGrade(3, "3rd Std", "3ஆம் வகுப்பு", "कक्षा 3", "3️⃣"),
  buildGrade(4, "4th Std", "4ஆம் வகுப்பு", "कक्षा 4", "4️⃣"),
  buildGrade(5, "5th Std", "5ஆம் வகுப்பு", "कक्षा 5", "5️⃣"),
  buildGrade(6, "6th Std", "6ஆம் வகுப்பு", "कक्षा 6", "6️⃣"),
  buildGrade(7, "7th Std", "7ஆம் வகுப்பு", "कक्षा 7", "7️⃣"),
  buildGrade(8, "8th Std", "8ஆம் வகுப்பு", "कक्षा 8", "8️⃣"),
  buildGrade(9, "9th Std", "9ஆம் வகுப்பு", "कक्षा 9", "9️⃣"),
  buildGrade(10, "10th Std", "10ஆம் வகுப்பு", "कक्षा 10", "🔟"),
  buildGrade(11, "11th Std", "11ஆம் வகுப்பு", "कक्षा 11", "🎓"),
  buildGrade(12, "12th Std", "12ஆம் வகுப்பு", "कक्षा 12", "🏫"),
];

// LKG and UKG share the same structure, fix IDs
indianGrades[0].id = "lkg";
indianGrades[1].id = "ukg";
