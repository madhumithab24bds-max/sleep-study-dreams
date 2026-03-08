export type AppLang = "english" | "tamil" | "hindi";

export function t(lang: AppLang, en: string, ta: string, hi: string): string {
  if (lang === "tamil") return ta;
  if (lang === "hindi") return hi;
  return en;
}

// Common UI strings
export const ui = {
  study: { en: "Study", ta: "படிப்பு", hi: "अध्ययन" },
  school: { en: "School (LKG-12)", ta: "பள்ளி (LKG-12)", hi: "स्कूल (LKG-12)" },
  college: { en: "Higher Education", ta: "உயர் கல்வி", hi: "उच्च शिक्षा" },
  selectBoard: { en: "Select Board", ta: "வாரியத்தைத் தேர்ந்தெடுக்கவும்", hi: "बोर्ड चुनें" },
  selectGrade: { en: "Select Your Grade", ta: "வகுப்பைத் தேர்ந்தெடுக்கவும்", hi: "अपनी कक्षा चुनें" },
  subjects: { en: "Subjects", ta: "பாடங்கள்", hi: "विषय" },
  chapters: { en: "chapters", ta: "பாடங்கள்", hi: "अध्याय" },
  topics: { en: "topics", ta: "தலைப்புகள்", hi: "विषय" },
  todayProgress: { en: "Today's Progress", ta: "இன்றைய முன்னேற்றம்", hi: "आज की प्रगति" },
  itemsReviewed: { en: "items reviewed", ta: "பொருட்கள் மதிப்பாய்வு செய்யப்பட்டன", hi: "आइटम समीक्षा किए गए" },
  study_btn: { en: "Study", ta: "படி", hi: "पढ़ें" },
  fullRevision: { en: "Full Revision", ta: "முழு திருத்தம்", hi: "पूर्ण संशोधन" },
  tip: { en: "Tip:", ta: "உதவிக்குறிப்பு:", hi: "सुझाव:" },
  tipText: {
    en: "Study 30 minutes before sleep for best memory consolidation results!",
    ta: "சிறந்த நினைவக ஒருங்கிணைப்பு முடிவுகளுக்கு தூக்கத்திற்கு 30 நிமிடங்களுக்கு முன் படிக்கவும்!",
    hi: "सर्वोत्तम स्मृति समेकन के लिए सोने से 30 मिनट पहले पढ़ें!",
  },
  selectCourse: { en: "Select Course", ta: "பாடத்தைத் தேர்ந்தெடுக்கவும்", hi: "पाठ्यक्रम चुनें" },
  department: { en: "Department", ta: "துறை", hi: "विभाग" },
  year: { en: "Year", ta: "ஆண்டு", hi: "वर्ष" },
  stateBoard: { en: "State Board", ta: "மாநில வாரியம்", hi: "राज्य बोर्ड" },
  startRevision: { en: "Starting revision", ta: "திருத்தம் தொடங்குகிறது", hi: "संशोधन शुरू हो रहा है" },
  selected: { en: "selected", ta: "தேர்ந்தெடுக்கப்பட்டது", hi: "चयनित" },
  studyProgress: { en: "Study Progress", ta: "படிப்பு முன்னேற்றம்", hi: "अध्ययन प्रगति" },
  completed: { en: "Completed", ta: "நிறைவடைந்தது", hi: "पूर्ण" },
  notCompleted: { en: "Not Completed", ta: "நிறைவடையவில்லை", hi: "अपूर्ण" },
  addTopic: { en: "Add Topic", ta: "தலைப்பு சேர்", hi: "विषय जोड़ें" },
  enterTopicName: { en: "Enter topic name...", ta: "தலைப்பு பெயரை உள்ளிடவும்...", hi: "विषय नाम दर्ज करें..." },
  customTopics: { en: "Custom Topics", ta: "தனிப்பயன் தலைப்புகள்", hi: "कस्टम विषय" },
  motivation1: { en: "Great job! Keep revising!", ta: "நல்ல வேலை! தொடர்ந்து படிக்கவும்!", hi: "बहुत बढ़िया! पढ़ते रहो!" },
  motivation2: { en: "Sleep mode will reinforce today's learning.", ta: "தூக்க பயிற்சி இன்றைய கற்றலை வலுப்படுத்தும்.", hi: "स्लीप मोड आज की पढ़ाई को मजबूत करेगा।" },
  motivation3: { en: "You're doing amazing! Almost there!", ta: "நீங்கள் அருமையாக செய்கிறீர்கள்!", hi: "आप बहुत अच्छा कर रहे हैं!" },
  overallProgress: { en: "Overall Progress", ta: "ஒட்டுமொத்த முன்னேற்றம்", hi: "समग्र प्रगति" },
} as const;
