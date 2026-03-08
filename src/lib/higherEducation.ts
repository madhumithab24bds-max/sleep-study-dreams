export interface HETopic {
  id: string;
  en: string;
  ta: string;
  hi: string;
}

export interface HESubject {
  id: string;
  en: string;
  ta: string;
  hi: string;
  emoji: string;
  color: string;
  topics: HETopic[];
}

export interface HEYear {
  id: string;
  en: string;
  ta: string;
  hi: string;
  subjects: HESubject[];
}

export interface HEDepartment {
  id: string;
  en: string;
  ta: string;
  hi: string;
  emoji: string;
  years: HEYear[];
}

export interface HECourse {
  id: string;
  en: string;
  ta: string;
  hi: string;
  emoji: string;
  departments: HEDepartment[];
}

// ── Helper to build years ──
function yr(num: number): { id: string; en: string; ta: string; hi: string } {
  const ordEn = ["1st", "2nd", "3rd", "4th", "5th"];
  const ordTa = ["1ஆம்", "2ஆம்", "3ஆம்", "4ஆம்", "5ஆம்"];
  const ordHi = ["प्रथम", "द्वितीय", "तृतीय", "चतुर्थ", "पंचम"];
  return {
    id: `y${num}`,
    en: `${ordEn[num - 1]} Year`,
    ta: `${ordTa[num - 1]} ஆண்டு`,
    hi: `${ordHi[num - 1]} वर्ष`,
  };
}

// ═══════════════════════════════════════════
// BDS
// ═══════════════════════════════════════════
const bdsCourse: HECourse = {
  id: "bds",
  en: "BDS",
  ta: "BDS",
  hi: "BDS",
  emoji: "🦷",
  departments: [
    {
      id: "bds-gen",
      en: "Dental Surgery",
      ta: "பல் அறுவை சிகிச்சை",
      hi: "दंत शल्य चिकित्सा",
      emoji: "🦷",
      years: [
        {
          ...yr(1),
          subjects: [
            { id: "bds-anat", en: "Anatomy", ta: "உடற்கூறியல்", hi: "शरीर रचना विज्ञान", emoji: "🦴", color: "from-primary/20 to-accent/20", topics: [
              { id: "ba1", en: "General Anatomy", ta: "பொது உடற்கூறியல்", hi: "सामान्य शरीर रचना" },
              { id: "ba2", en: "Head & Neck", ta: "தலை & கழுத்து", hi: "सिर और गर्दन" },
              { id: "ba3", en: "Osteology", ta: "எலும்பியல்", hi: "अस्थि विज्ञान" },
              { id: "ba4", en: "Histology", ta: "திசுவியல்", hi: "ऊतक विज्ञान" },
            ]},
            { id: "bds-physio", en: "Physiology", ta: "உடலியல்", hi: "शरीर क्रिया विज्ञान", emoji: "❤️", color: "from-secondary/20 to-primary/20", topics: [
              { id: "bp1", en: "General Physiology", ta: "பொது உடலியல்", hi: "सामान्य शरीर क्रिया" },
              { id: "bp2", en: "Blood & Body Fluids", ta: "இரத்தம் & உடல் திரவங்கள்", hi: "रक्त और शरीर के तरल पदार्थ" },
              { id: "bp3", en: "Nerve & Muscle", ta: "நரம்பு & தசை", hi: "तंत्रिका और मांसपेशी" },
            ]},
            { id: "bds-biochem", en: "Biochemistry", ta: "உயிர் வேதியியல்", hi: "जैव रसायन", emoji: "🧪", color: "from-dream/20 to-secondary/20", topics: [
              { id: "bb1", en: "Carbohydrate Metabolism", ta: "கார்போஹைட்ரேட் வளர்சிதை மாற்றம்", hi: "कार्बोहाइड्रेट चयापचय" },
              { id: "bb2", en: "Protein Chemistry", ta: "புரத வேதியியல்", hi: "प्रोटीन रसायन" },
              { id: "bb3", en: "Enzymology", ta: "நொதியியல்", hi: "एंजाइमोलॉजी" },
            ]},
          ],
        },
        {
          ...yr(2),
          subjects: [
            { id: "bds-patho", en: "Pathology", ta: "நோயியல்", hi: "रोग विज्ञान", emoji: "🔬", color: "from-accent/20 to-dream/20", topics: [
              { id: "bpa1", en: "General Pathology", ta: "பொது நோயியல்", hi: "सामान्य रोग विज्ञान" },
              { id: "bpa2", en: "Oral Pathology", ta: "வாய்வழி நோயியல்", hi: "मौखिक रोग विज्ञान" },
            ]},
            { id: "bds-pharma", en: "Pharmacology", ta: "மருந்தியல்", hi: "औषध विज्ञान", emoji: "💊", color: "from-primary/20 to-dream/20", topics: [
              { id: "bph1", en: "General Pharmacology", ta: "பொது மருந்தியல்", hi: "सामान्य औषध विज्ञान" },
              { id: "bph2", en: "Dental Pharmacology", ta: "பல் மருந்தியல்", hi: "दंत औषध विज्ञान" },
            ]},
            { id: "bds-micro", en: "Microbiology", ta: "நுண்ணுயிரியல்", hi: "सूक्ष्म जीव विज्ञान", emoji: "🦠", color: "from-secondary/20 to-accent/20", topics: [
              { id: "bm1", en: "General Microbiology", ta: "பொது நுண்ணுயிரியல்", hi: "सामान्य सूक्ष्म जीव विज्ञान" },
              { id: "bm2", en: "Oral Microbiology", ta: "வாய்வழி நுண்ணுயிரியல்", hi: "मौखिक सूक्ष्म जीव विज्ञान" },
            ]},
          ],
        },
        {
          ...yr(3),
          subjects: [
            { id: "bds-prosth", en: "Prosthodontics", ta: "செயற்கை பல் சிகிச்சை", hi: "कृत्रिम दंत विज्ञान", emoji: "🦷", color: "from-dream/20 to-primary/20", topics: [
              { id: "bpr1", en: "Complete Dentures", ta: "முழு பல் செட்", hi: "पूर्ण दंत सेट" },
              { id: "bpr2", en: "Removable Partial Dentures", ta: "நீக்கக்கூடிய பகுதி பல்", hi: "हटाने योग्य आंशिक दंत" },
            ]},
            { id: "bds-ortho", en: "Orthodontics", ta: "பல் சீரமைப்பு", hi: "दंत कतार विज्ञान", emoji: "😁", color: "from-accent/20 to-primary/20", topics: [
              { id: "bo1", en: "Growth & Development", ta: "வளர்ச்சி & மேம்பாடு", hi: "वृद्धि और विकास" },
              { id: "bo2", en: "Fixed Appliances", ta: "நிலையான கருவிகள்", hi: "स्थिर उपकरण" },
            ]},
          ],
        },
        {
          ...yr(4),
          subjects: [
            { id: "bds-surg", en: "Oral Surgery", ta: "வாய் அறுவை சிகிச்சை", hi: "मौखिक शल्य चिकित्सा", emoji: "🏥", color: "from-primary/20 to-secondary/20", topics: [
              { id: "bs1", en: "Exodontia", ta: "பல் பிடுங்குதல்", hi: "दांत निकालना" },
              { id: "bs2", en: "Maxillofacial Surgery", ta: "முக அறுவை சிகிச்சை", hi: "मुख शल्य चिकित्सा" },
            ]},
            { id: "bds-perio", en: "Periodontics", ta: "ஈறு சிகிச்சை", hi: "मसूड़ा विज्ञान", emoji: "🩺", color: "from-secondary/20 to-dream/20", topics: [
              { id: "bpe1", en: "Periodontal Diseases", ta: "ஈறு நோய்கள்", hi: "मसूड़ा रोग" },
              { id: "bpe2", en: "Periodontal Therapy", ta: "ஈறு சிகிச்சை முறை", hi: "मसूड़ा चिकित्सा" },
            ]},
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════
// MBBS
// ═══════════════════════════════════════════
const mbbsCourse: HECourse = {
  id: "mbbs",
  en: "MBBS",
  ta: "MBBS",
  hi: "MBBS",
  emoji: "🩺",
  departments: [
    {
      id: "mbbs-gen",
      en: "Medicine & Surgery",
      ta: "மருத்துவம் & அறுவை சிகிச்சை",
      hi: "चिकित्सा एवं शल्य चिकित्सा",
      emoji: "🩺",
      years: [
        {
          ...yr(1),
          subjects: [
            { id: "mb-anat", en: "Anatomy", ta: "உடற்கூறியல்", hi: "शरीर रचना विज्ञान", emoji: "🦴", color: "from-primary/20 to-accent/20", topics: [
              { id: "ma1", en: "General Anatomy", ta: "பொது உடற்கூறியல்", hi: "सामान्य शरीर रचना" },
              { id: "ma2", en: "Upper Limb", ta: "மேல் கை", hi: "ऊपरी अंग" },
              { id: "ma3", en: "Lower Limb", ta: "கீழ் கை", hi: "निचला अंग" },
              { id: "ma4", en: "Thorax", ta: "மார்பு", hi: "वक्ष" },
              { id: "ma5", en: "Abdomen", ta: "வயிறு", hi: "उदर" },
              { id: "ma6", en: "Neuroanatomy", ta: "நரம்பு உடற்கூறியல்", hi: "तंत्रिका शरीर रचना" },
            ]},
            { id: "mb-physio", en: "Physiology", ta: "உடலியல்", hi: "शरीर क्रिया विज्ञान", emoji: "❤️", color: "from-secondary/20 to-primary/20", topics: [
              { id: "mp1", en: "Cell Physiology", ta: "உயிரணு உடலியல்", hi: "कोशिका शरीर क्रिया" },
              { id: "mp2", en: "Cardiovascular System", ta: "இருதய அமைப்பு", hi: "हृदय प्रणाली" },
              { id: "mp3", en: "Respiratory System", ta: "சுவாச அமைப்பு", hi: "श्वसन प्रणाली" },
              { id: "mp4", en: "Renal Physiology", ta: "சிறுநீரக உடலியல்", hi: "गुर्दा शरीर क्रिया" },
            ]},
            { id: "mb-biochem", en: "Biochemistry", ta: "உயிர் வேதியியல்", hi: "जैव रसायन", emoji: "🧪", color: "from-dream/20 to-secondary/20", topics: [
              { id: "mbc1", en: "Amino Acids & Proteins", ta: "அமினோ அமிலங்கள்", hi: "अमीनो अम्ल और प्रोटीन" },
              { id: "mbc2", en: "Lipid Metabolism", ta: "கொழுப்பு வளர்சிதை மாற்றம்", hi: "लिपिड चयापचय" },
              { id: "mbc3", en: "Molecular Biology", ta: "மூலக்கூறு உயிரியல்", hi: "आणविक जीव विज्ञान" },
            ]},
          ],
        },
        {
          ...yr(2),
          subjects: [
            { id: "mb-patho", en: "Pathology", ta: "நோயியல்", hi: "रोग विज्ञान", emoji: "🔬", color: "from-accent/20 to-dream/20", topics: [
              { id: "mpa1", en: "General Pathology", ta: "பொது நோயியல்", hi: "सामान्य रोग विज्ञान" },
              { id: "mpa2", en: "Systemic Pathology", ta: "தொகுதி நோயியல்", hi: "प्रणालीगत रोग विज्ञान" },
              { id: "mpa3", en: "Hematology", ta: "இரத்தவியல்", hi: "रक्त विज्ञान" },
            ]},
            { id: "mb-micro", en: "Microbiology", ta: "நுண்ணுயிரியல்", hi: "सूक्ष्म जीव विज्ञान", emoji: "🦠", color: "from-primary/20 to-dream/20", topics: [
              { id: "mmi1", en: "Bacteriology", ta: "பாக்டீரியாவியல்", hi: "जीवाणु विज्ञान" },
              { id: "mmi2", en: "Virology", ta: "வைரஸ் இயல்", hi: "विषाणु विज्ञान" },
              { id: "mmi3", en: "Immunology", ta: "நோய்த்தடுப்பு இயல்", hi: "प्रतिरक्षा विज्ञान" },
            ]},
            { id: "mb-pharma", en: "Pharmacology", ta: "மருந்தியல்", hi: "औषध विज्ञान", emoji: "💊", color: "from-secondary/20 to-accent/20", topics: [
              { id: "mph1", en: "General Pharmacology", ta: "பொது மருந்தியல்", hi: "सामान्य औषध विज्ञान" },
              { id: "mph2", en: "Chemotherapy", ta: "வேதிசிகிச்சை", hi: "कीमोथेरेपी" },
              { id: "mph3", en: "CNS Pharmacology", ta: "நரம்பு மருந்தியல்", hi: "सी.एन.एस. औषध विज्ञान" },
            ]},
            { id: "mb-fmed", en: "Forensic Medicine", ta: "தடயவியல் மருத்துவம்", hi: "न्यायिक चिकित्सा", emoji: "🔍", color: "from-dream/20 to-primary/20", topics: [
              { id: "mfm1", en: "Thanatology", ta: "மரண இயல்", hi: "मृत्यु विज्ञान" },
              { id: "mfm2", en: "Toxicology", ta: "நச்சுயியல்", hi: "विष विज्ञान" },
            ]},
          ],
        },
        {
          ...yr(3),
          subjects: [
            { id: "mb-med", en: "General Medicine", ta: "பொது மருத்துவம்", hi: "सामान्य चिकित्सा", emoji: "🏥", color: "from-primary/20 to-secondary/20", topics: [
              { id: "mgm1", en: "Cardiology", ta: "இருதயவியல்", hi: "हृदय रोग" },
              { id: "mgm2", en: "Pulmonology", ta: "நுரையீரல் இயல்", hi: "फेफड़ा विज्ञान" },
              { id: "mgm3", en: "Gastroenterology", ta: "இரைப்பை குடலியல்", hi: "गैस्ट्रोएंटरोलॉजी" },
            ]},
            { id: "mb-surg", en: "General Surgery", ta: "பொது அறுவை சிகிச்சை", hi: "सामान्य शल्य चिकित्सा", emoji: "🔪", color: "from-accent/20 to-primary/20", topics: [
              { id: "mgs1", en: "Wound Healing", ta: "காயம் ஆறுதல்", hi: "घाव भरना" },
              { id: "mgs2", en: "Surgical Infections", ta: "அறுவை நோய்த்தொற்றுகள்", hi: "शल्य संक्रमण" },
            ]},
            { id: "mb-obg", en: "OBG", ta: "மகப்பேறு மருத்துவம்", hi: "प्रसूति एवं स्त्री रोग", emoji: "👶", color: "from-secondary/20 to-dream/20", topics: [
              { id: "mob1", en: "Normal Labour", ta: "இயல்பான பிரசவம்", hi: "सामान्य प्रसव" },
              { id: "mob2", en: "High-Risk Pregnancy", ta: "அதிக ஆபத்து கர்ப்பம்", hi: "उच्च जोखिम गर्भावस्था" },
            ]},
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════
// ENGINEERING
// ═══════════════════════════════════════════
function engDept(id: string, en: string, ta: string, hi: string, emoji: string, subjects: HEYear[]): HEDepartment {
  return { id, en, ta, hi, emoji, years: subjects };
}

function engYear(num: number, subs: HESubject[]): HEYear {
  return { ...yr(num), subjects: subs };
}

const engineeringCourse: HECourse = {
  id: "engineering",
  en: "Engineering",
  ta: "பொறியியல்",
  hi: "इंजीनियरिंग",
  emoji: "⚙️",
  departments: [
    engDept("cse", "Computer Science (CSE)", "கணினி அறிவியல்", "कंप्यूटर विज्ञान", "💻", [
      engYear(1, [
        { id: "eng-math1", en: "Engineering Mathematics I", ta: "பொறியியல் கணிதம் I", hi: "इंजीनियरिंग गणित I", emoji: "📐", color: "from-primary/20 to-accent/20", topics: [
          { id: "em1", en: "Matrices", ta: "அணிகள்", hi: "मैट्रिक्स" },
          { id: "em2", en: "Calculus", ta: "நுண்கணிதம்", hi: "कलन" },
          { id: "em3", en: "Differential Equations", ta: "வகைநிலைச் சமன்பாடுகள்", hi: "अवकल समीकरण" },
        ]},
        { id: "eng-phy", en: "Engineering Physics", ta: "பொறியியல் இயற்பியல்", hi: "इंजीनियरिंग भौतिकी", emoji: "⚛️", color: "from-secondary/20 to-primary/20", topics: [
          { id: "ep1", en: "Optics", ta: "ஒளியியல்", hi: "प्रकाशिकी" },
          { id: "ep2", en: "Quantum Mechanics", ta: "குவாண்டம் இயக்கவியல்", hi: "क्वांटम यांत्रिकी" },
        ]},
        { id: "eng-chem", en: "Engineering Chemistry", ta: "பொறியியல் வேதியியல்", hi: "इंजीनियरिंग रसायन", emoji: "🧪", color: "from-dream/20 to-secondary/20", topics: [
          { id: "ec1", en: "Water Chemistry", ta: "நீர் வேதியியல்", hi: "जल रसायन" },
          { id: "ec2", en: "Polymers", ta: "பாலிமர்கள்", hi: "बहुलक" },
        ]},
      ]),
      engYear(2, [
        { id: "cse-ds", en: "Data Structures", ta: "தரவு கட்டமைப்புகள்", hi: "डेटा संरचना", emoji: "📊", color: "from-accent/20 to-dream/20", topics: [
          { id: "ds1", en: "Arrays & Linked Lists", ta: "அணிகள் & இணைப்பு பட்டியல்", hi: "ऐरे और लिंक्ड लिस्ट" },
          { id: "ds2", en: "Trees & Graphs", ta: "மரங்கள் & வரைபடங்கள்", hi: "ट्री और ग्राफ" },
          { id: "ds3", en: "Sorting & Searching", ta: "வரிசைப்படுத்தல்", hi: "सॉर्टिंग और सर्चिंग" },
        ]},
        { id: "cse-oops", en: "Object Oriented Programming", ta: "பொருள் சார்ந்த நிரலாக்கம்", hi: "ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग", emoji: "🧩", color: "from-primary/20 to-dream/20", topics: [
          { id: "oop1", en: "Classes & Objects", ta: "வகுப்புகள் & பொருள்கள்", hi: "क्लास और ऑब्जेक्ट" },
          { id: "oop2", en: "Inheritance & Polymorphism", ta: "மரபுரிமை & பலவடிவம்", hi: "इनहेरिटेंस और पॉलिमॉर्फिज्म" },
        ]},
        { id: "cse-dbms", en: "Database Systems", ta: "தரவுத்தள அமைப்புகள்", hi: "डेटाबेस सिस्टम", emoji: "🗄️", color: "from-secondary/20 to-accent/20", topics: [
          { id: "db1", en: "SQL", ta: "SQL", hi: "SQL" },
          { id: "db2", en: "Normalization", ta: "இயல்பாக்கம்", hi: "नॉर्मलाइजेशन" },
          { id: "db3", en: "Transactions", ta: "பரிவர்த்தனைகள்", hi: "ट्रांजैक्शन" },
        ]},
      ]),
      engYear(3, [
        { id: "cse-os", en: "Operating Systems", ta: "இயக்க முறைமைகள்", hi: "ऑपरेटिंग सिस्टम", emoji: "🖥️", color: "from-dream/20 to-primary/20", topics: [
          { id: "os1", en: "Process Management", ta: "செயல்முறை மேலாண்மை", hi: "प्रक्रिया प्रबंधन" },
          { id: "os2", en: "Memory Management", ta: "நினைவக மேலாண்மை", hi: "मेमोरी प्रबंधन" },
          { id: "os3", en: "File Systems", ta: "கோப்பு அமைப்புகள்", hi: "फाइल सिस्टम" },
        ]},
        { id: "cse-cn", en: "Computer Networks", ta: "கணினி வலையமைப்புகள்", hi: "कंप्यूटर नेटवर्क", emoji: "🌐", color: "from-accent/20 to-secondary/20", topics: [
          { id: "cn1", en: "OSI Model", ta: "OSI மாதிரி", hi: "OSI मॉडल" },
          { id: "cn2", en: "TCP/IP", ta: "TCP/IP", hi: "TCP/IP" },
          { id: "cn3", en: "Network Security", ta: "வலை பாதுகாப்பு", hi: "नेटवर्क सुरक्षा" },
        ]},
      ]),
      engYear(4, [
        { id: "cse-ml", en: "Machine Learning", ta: "இயந்திர கற்றல்", hi: "मशीन लर्निंग", emoji: "🤖", color: "from-primary/20 to-accent/20", topics: [
          { id: "ml1", en: "Supervised Learning", ta: "மேற்பார்வை கற்றல்", hi: "सुपरवाइज्ड लर्निंग" },
          { id: "ml2", en: "Neural Networks", ta: "நரம்பு வலையமைப்புகள்", hi: "न्यूरल नेटवर्क" },
          { id: "ml3", en: "Deep Learning", ta: "ஆழ் கற்றல்", hi: "डीप लर्निंग" },
        ]},
        { id: "cse-project", en: "Project Work", ta: "திட்ட பணி", hi: "प्रोजेक्ट कार्य", emoji: "📋", color: "from-secondary/20 to-dream/20", topics: [
          { id: "pw1", en: "Research & Development", ta: "ஆராய்ச்சி & மேம்பாடு", hi: "अनुसंधान और विकास" },
        ]},
      ]),
    ]),
    engDept("ece", "Electronics & Comm (ECE)", "மின்னணுவியல் & தொடர்பு", "इलेक्ट्रॉनिक्स एवं संचार", "📡", [
      engYear(1, [
        { id: "ece-circuits", en: "Circuit Theory", ta: "சுற்று கோட்பாடு", hi: "सर्किट सिद्धांत", emoji: "⚡", color: "from-primary/20 to-accent/20", topics: [
          { id: "ct1", en: "Network Analysis", ta: "வலையமைப்பு பகுப்பாய்வு", hi: "नेटवर्क विश्लेषण" },
          { id: "ct2", en: "AC Circuits", ta: "AC சுற்றுகள்", hi: "AC सर्किट" },
        ]},
      ]),
      engYear(2, [
        { id: "ece-signals", en: "Signals & Systems", ta: "சமிக்ஞைகள் & அமைப்புகள்", hi: "सिग्नल और सिस्टम", emoji: "📈", color: "from-secondary/20 to-primary/20", topics: [
          { id: "ss1", en: "Fourier Transform", ta: "ஃபூரியர் உருமாற்றம்", hi: "फूरियर ट्रांसफॉर्म" },
          { id: "ss2", en: "Laplace Transform", ta: "லாப்லாஸ் உருமாற்றம்", hi: "लाप्लास ट्रांसफॉर्म" },
        ]},
        { id: "ece-analog", en: "Analog Electronics", ta: "அனலாக் மின்னணுவியல்", hi: "एनालॉग इलेक्ट्रॉनिक्स", emoji: "🔌", color: "from-dream/20 to-accent/20", topics: [
          { id: "ae1", en: "Transistors", ta: "திரான்சிஸ்டர்கள்", hi: "ट्रांजिस्टर" },
          { id: "ae2", en: "Amplifiers", ta: "மிகைப்பிகள்", hi: "एम्पलीफायर" },
        ]},
      ]),
      engYear(3, [
        { id: "ece-comm", en: "Communication Systems", ta: "தொடர்பு அமைப்புகள்", hi: "संचार प्रणाली", emoji: "📻", color: "from-accent/20 to-primary/20", topics: [
          { id: "cs1", en: "Analog Communication", ta: "அனலாக் தொடர்பு", hi: "एनालॉग संचार" },
          { id: "cs2", en: "Digital Communication", ta: "டிஜிட்டல் தொடர்பு", hi: "डिजिटल संचार" },
        ]},
      ]),
    ]),
    engDept("mech", "Mechanical Engineering", "இயந்திரவியல்", "मैकेनिकल इंजीनियरिंग", "🔧", [
      engYear(1, [
        { id: "me-draw", en: "Engineering Drawing", ta: "பொறியியல் வரைதல்", hi: "इंजीनियरिंग ड्राइंग", emoji: "📏", color: "from-primary/20 to-secondary/20", topics: [
          { id: "ed1", en: "Orthographic Projections", ta: "செங்குத்து படமிடல்", hi: "ऑर्थोग्राफिक प्रोजेक्शन" },
          { id: "ed2", en: "Isometric Views", ta: "ஐசோமெட்ரிக் காட்சிகள்", hi: "आइसोमेट्रिक व्यू" },
        ]},
      ]),
      engYear(2, [
        { id: "me-thermo", en: "Thermodynamics", ta: "வெப்பவியக்கவியல்", hi: "ऊष्मागतिकी", emoji: "🌡️", color: "from-dream/20 to-accent/20", topics: [
          { id: "th1", en: "Laws of Thermodynamics", ta: "வெப்பவியக்க விதிகள்", hi: "ऊष्मागतिकी के नियम" },
          { id: "th2", en: "Heat Engines", ta: "வெப்ப இயந்திரங்கள்", hi: "ताप इंजन" },
        ]},
        { id: "me-som", en: "Strength of Materials", ta: "பொருள் வலிமை", hi: "सामग्री की मजबूती", emoji: "🏗️", color: "from-secondary/20 to-primary/20", topics: [
          { id: "sm1", en: "Stress & Strain", ta: "அழுத்தம் & திரிபு", hi: "प्रतिबल और विकृति" },
          { id: "sm2", en: "Bending Moments", ta: "வளைவு நிமிடங்கள்", hi: "बेंडिंग मोमेंट" },
        ]},
      ]),
    ]),
  ],
};

// ═══════════════════════════════════════════
// PHARMACY
// ═══════════════════════════════════════════
const pharmacyCourse: HECourse = {
  id: "pharmacy",
  en: "Pharmacy",
  ta: "மருந்தகவியல்",
  hi: "फार्मेसी",
  emoji: "💊",
  departments: [{
    id: "bpharm",
    en: "B.Pharm",
    ta: "B.Pharm",
    hi: "B.Pharm",
    emoji: "💊",
    years: [
      {
        ...yr(1),
        subjects: [
          { id: "ph-pchem", en: "Pharmaceutical Chemistry", ta: "மருந்து வேதியியல்", hi: "औषधीय रसायन", emoji: "🧪", color: "from-primary/20 to-accent/20", topics: [
            { id: "pc1", en: "Organic Chemistry", ta: "கரிம வேதியியல்", hi: "कार्बनिक रसायन" },
            { id: "pc2", en: "Inorganic Chemistry", ta: "கனிம வேதியியல்", hi: "अकार्बनिक रसायन" },
          ]},
          { id: "ph-anat", en: "Human Anatomy", ta: "மனித உடற்கூறியல்", hi: "मानव शरीर रचना", emoji: "🦴", color: "from-secondary/20 to-primary/20", topics: [
            { id: "ha1", en: "Skeletal System", ta: "எலும்பு அமைப்பு", hi: "कंकाल तंत्र" },
            { id: "ha2", en: "Muscular System", ta: "தசை அமைப்பு", hi: "पेशीय तंत्र" },
          ]},
          { id: "ph-pharma", en: "Pharmaceutics", ta: "மருந்தியல்", hi: "फार्मास्यूटिक्स", emoji: "💊", color: "from-dream/20 to-secondary/20", topics: [
            { id: "ph1", en: "Dosage Forms", ta: "மருந்தளவு வடிவங்கள்", hi: "खुराक के रूप" },
            { id: "ph2", en: "Drug Delivery", ta: "மருந்து விநியோகம்", hi: "दवा वितरण" },
          ]},
        ],
      },
      {
        ...yr(2),
        subjects: [
          { id: "ph-pcol", en: "Pharmacology", ta: "மருந்தியல்", hi: "औषध विज्ञान", emoji: "💉", color: "from-accent/20 to-dream/20", topics: [
            { id: "pcol1", en: "Autonomic Pharmacology", ta: "தன்னிலை மருந்தியல்", hi: "स्वायत्त औषध विज्ञान" },
            { id: "pcol2", en: "CNS Pharmacology", ta: "நரம்பு மருந்தியல்", hi: "सी.एन.एस. औषध विज्ञान" },
          ]},
          { id: "ph-pcog", en: "Pharmacognosy", ta: "மருந்துப்பொருளியல்", hi: "फार्माकोग्नॉसी", emoji: "🌿", color: "from-primary/20 to-dream/20", topics: [
            { id: "pcog1", en: "Plant-Based Drugs", ta: "தாவர மருந்துகள்", hi: "पादप आधारित दवाएं" },
            { id: "pcog2", en: "Phytochemistry", ta: "தாவர வேதியியல்", hi: "फाइटोकेमिस्ट्री" },
          ]},
        ],
      },
    ],
  }],
};

// ═══════════════════════════════════════════
// NURSING
// ═══════════════════════════════════════════
const nursingCourse: HECourse = {
  id: "nursing",
  en: "Nursing",
  ta: "செவிலியம்",
  hi: "नर्सिंग",
  emoji: "👩‍⚕️",
  departments: [{
    id: "bsc-nursing",
    en: "B.Sc Nursing",
    ta: "B.Sc செவிலியம்",
    hi: "B.Sc नर्सिंग",
    emoji: "👩‍⚕️",
    years: [
      {
        ...yr(1),
        subjects: [
          { id: "nr-anat", en: "Anatomy & Physiology", ta: "உடற்கூறியல் & உடலியல்", hi: "शरीर रचना एवं क्रिया विज्ञान", emoji: "🦴", color: "from-primary/20 to-accent/20", topics: [
            { id: "na1", en: "Cell & Tissues", ta: "உயிரணு & திசுக்கள்", hi: "कोशिका और ऊतक" },
            { id: "na2", en: "Body Systems", ta: "உடல் அமைப்புகள்", hi: "शारीरिक तंत्र" },
          ]},
          { id: "nr-fund", en: "Fundamentals of Nursing", ta: "செவிலிய அடிப்படைகள்", hi: "नर्सिंग के मूल सिद्धांत", emoji: "💉", color: "from-secondary/20 to-primary/20", topics: [
            { id: "nf1", en: "Patient Care", ta: "நோயாளி பராமரிப்பு", hi: "रोगी देखभाल" },
            { id: "nf2", en: "Vital Signs", ta: "முக்கிய அறிகுறிகள்", hi: "जीवन संकेत" },
          ]},
          { id: "nr-nutr", en: "Nutrition", ta: "ஊட்டச்சத்து", hi: "पोषण", emoji: "🥗", color: "from-dream/20 to-secondary/20", topics: [
            { id: "nn1", en: "Macro & Micronutrients", ta: "மேக்ரோ & நுண் ஊட்டச்சத்துக்கள்", hi: "मैक्रो और सूक्ष्म पोषक तत्व" },
            { id: "nn2", en: "Diet Therapy", ta: "உணவு சிகிச்சை", hi: "आहार चिकित्सा" },
          ]},
        ],
      },
      {
        ...yr(2),
        subjects: [
          { id: "nr-medsurg", en: "Medical-Surgical Nursing", ta: "மருத்துவ-அறுவை செவிலியம்", hi: "चिकित्सा-शल्य नर्सिंग", emoji: "🏥", color: "from-accent/20 to-dream/20", topics: [
            { id: "ms1", en: "Cardiovascular Nursing", ta: "இருதய செவிலியம்", hi: "हृदय नर्सिंग" },
            { id: "ms2", en: "Respiratory Nursing", ta: "சுவாச செவிலியம்", hi: "श्वसन नर्सिंग" },
          ]},
          { id: "nr-comm", en: "Community Health Nursing", ta: "சமூக சுகாதார செவிலியம்", hi: "सामुदायिक स्वास्थ्य नर्सिंग", emoji: "🌍", color: "from-primary/20 to-dream/20", topics: [
            { id: "ch1", en: "Epidemiology", ta: "தொற்றுநோயியல்", hi: "महामारी विज्ञान" },
            { id: "ch2", en: "Family Health", ta: "குடும்ப சுகாதாரம்", hi: "परिवार स्वास्थ्य" },
          ]},
        ],
      },
    ],
  }],
};

// ═══════════════════════════════════════════
// PHYSIOTHERAPY
// ═══════════════════════════════════════════
const physiotherapyCourse: HECourse = {
  id: "physiotherapy",
  en: "Physiotherapy",
  ta: "இயன்முறை மருத்துவம்",
  hi: "फिजियोथेरेपी",
  emoji: "🏃",
  departments: [{
    id: "bpt",
    en: "BPT",
    ta: "BPT",
    hi: "BPT",
    emoji: "🏃",
    years: [
      {
        ...yr(1),
        subjects: [
          { id: "pt-anat", en: "Anatomy", ta: "உடற்கூறியல்", hi: "शरीर रचना", emoji: "🦴", color: "from-primary/20 to-accent/20", topics: [
            { id: "pa1", en: "Musculoskeletal Anatomy", ta: "தசை எலும்பு உடற்கூறியல்", hi: "मस्कुलोस्केलेटल एनाटॉमी" },
            { id: "pa2", en: "Neuroanatomy", ta: "நரம்பு உடற்கூறியல்", hi: "न्यूरोएनाटॉमी" },
          ]},
          { id: "pt-physio", en: "Physiology", ta: "உடலியல்", hi: "शरीर क्रिया विज्ञान", emoji: "❤️", color: "from-secondary/20 to-primary/20", topics: [
            { id: "pp1", en: "Exercise Physiology", ta: "உடற்பயிற்சி உடலியல்", hi: "व्यायाम शरीर क्रिया" },
            { id: "pp2", en: "Cardiopulmonary Physiology", ta: "இருதய நுரையீரல் உடலியல்", hi: "हृदय फुफ्फुसीय शरीर क्रिया" },
          ]},
        ],
      },
      {
        ...yr(2),
        subjects: [
          { id: "pt-exercise", en: "Exercise Therapy", ta: "உடற்பயிற்சி சிகிச்சை", hi: "व्यायाम चिकित्सा", emoji: "🏋️", color: "from-dream/20 to-secondary/20", topics: [
            { id: "et1", en: "Therapeutic Exercises", ta: "சிகிச்சை உடற்பயிற்சிகள்", hi: "चिकित्सीय व्यायाम" },
            { id: "et2", en: "Manual Therapy", ta: "கைமுறை சிகிச்சை", hi: "मैनुअल थेरेपी" },
          ]},
          { id: "pt-electro", en: "Electrotherapy", ta: "மின் சிகிச்சை", hi: "इलेक्ट्रोथेरेपी", emoji: "⚡", color: "from-accent/20 to-dream/20", topics: [
            { id: "el1", en: "Ultrasound Therapy", ta: "அல்ட்ராசவுண்ட் சிகிச்சை", hi: "अल्ट्रासाउंड चिकित्सा" },
            { id: "el2", en: "TENS", ta: "TENS", hi: "TENS" },
          ]},
        ],
      },
    ],
  }],
};

// ═══════════════════════════════════════════
// ARTS AND SCIENCE
// ═══════════════════════════════════════════
const artsScienceCourse: HECourse = {
  id: "arts-science",
  en: "Arts & Science",
  ta: "கலை & அறிவியல்",
  hi: "कला एवं विज्ञान",
  emoji: "📖",
  departments: [
    {
      id: "as-physics",
      en: "Physics",
      ta: "இயற்பியல்",
      hi: "भौतिक विज्ञान",
      emoji: "⚛️",
      years: [
        {
          ...yr(1),
          subjects: [
            { id: "asp-mech", en: "Mechanics", ta: "இயக்கவியல்", hi: "यांत्रिकी", emoji: "🔧", color: "from-primary/20 to-accent/20", topics: [
              { id: "pm1", en: "Newton's Laws", ta: "நியூட்டன் விதிகள்", hi: "न्यूटन के नियम" },
              { id: "pm2", en: "Rotational Motion", ta: "சுழற்சி இயக்கம்", hi: "घूर्णी गति" },
            ]},
            { id: "asp-waves", en: "Waves & Optics", ta: "அலைகள் & ஒளியியல்", hi: "तरंग एवं प्रकाशिकी", emoji: "🌊", color: "from-secondary/20 to-primary/20", topics: [
              { id: "wo1", en: "Wave Motion", ta: "அலை இயக்கம்", hi: "तरंग गति" },
              { id: "wo2", en: "Interference & Diffraction", ta: "குறுக்கீடு & விளிம்பு வளைவு", hi: "व्यतिकरण और विवर्तन" },
            ]},
          ],
        },
      ],
    },
    {
      id: "as-chemistry",
      en: "Chemistry",
      ta: "வேதியியல்",
      hi: "रसायन विज्ञान",
      emoji: "🧪",
      years: [
        {
          ...yr(1),
          subjects: [
            { id: "asc-inorg", en: "Inorganic Chemistry", ta: "கனிம வேதியியல்", hi: "अकार्बनिक रसायन", emoji: "⚗️", color: "from-dream/20 to-accent/20", topics: [
              { id: "ic1", en: "Atomic Structure", ta: "அணு அமைப்பு", hi: "परमाणु संरचना" },
              { id: "ic2", en: "Chemical Bonding", ta: "வேதிப்பிணைப்பு", hi: "रासायनिक बंधन" },
            ]},
            { id: "asc-org", en: "Organic Chemistry", ta: "கரிம வேதியியல்", hi: "कार्बनिक रसायन", emoji: "🧬", color: "from-primary/20 to-secondary/20", topics: [
              { id: "oc1", en: "Hydrocarbons", ta: "ஹைட்ரோகார்பன்கள்", hi: "हाइड्रोकार्बन" },
              { id: "oc2", en: "Reaction Mechanisms", ta: "வினை வழிமுறைகள்", hi: "अभिक्रिया तंत्र" },
            ]},
          ],
        },
      ],
    },
    {
      id: "as-maths",
      en: "Mathematics",
      ta: "கணிதம்",
      hi: "गणित",
      emoji: "📐",
      years: [
        {
          ...yr(1),
          subjects: [
            { id: "asm-algebra", en: "Algebra", ta: "இயற்கணிதம்", hi: "बीजगणित", emoji: "📊", color: "from-accent/20 to-primary/20", topics: [
              { id: "al1", en: "Group Theory", ta: "குழு கோட்பாடு", hi: "समूह सिद्धांत" },
              { id: "al2", en: "Ring Theory", ta: "வளைய கோட்பாடு", hi: "रिंग सिद्धांत" },
            ]},
            { id: "asm-calc", en: "Calculus", ta: "நுண்கணிதம்", hi: "कलन", emoji: "∞", color: "from-secondary/20 to-dream/20", topics: [
              { id: "ca1", en: "Real Analysis", ta: "மெய் பகுப்பாய்வு", hi: "वास्तविक विश्लेषण" },
              { id: "ca2", en: "Complex Analysis", ta: "சிக்கல் பகுப்பாய்வு", hi: "सम्मिश्र विश्लेषण" },
            ]},
          ],
        },
      ],
    },
    {
      id: "as-english",
      en: "English Literature",
      ta: "ஆங்கில இலக்கியம்",
      hi: "अंग्रेजी साहित्य",
      emoji: "📚",
      years: [
        {
          ...yr(1),
          subjects: [
            { id: "ase-lit", en: "English Literature", ta: "ஆங்கில இலக்கியம்", hi: "अंग्रेजी साहित्य", emoji: "📖", color: "from-dream/20 to-primary/20", topics: [
              { id: "el1", en: "Shakespeare", ta: "ஷேக்ஸ்பியர்", hi: "शेक्सपियर" },
              { id: "el2", en: "Romantic Poetry", ta: "காதல் கவிதை", hi: "रोमांटिक कविता" },
              { id: "el3", en: "Modern Fiction", ta: "நவீன புனைவு", hi: "आधुनिक कथा साहित्य" },
            ]},
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════
// ALLIED HEALTH SCIENCES
// ═══════════════════════════════════════════
const alliedHealthCourse: HECourse = {
  id: "allied-health",
  en: "Allied Health Sciences",
  ta: "துணை சுகாதார அறிவியல்",
  hi: "संबद्ध स्वास्थ्य विज्ञान",
  emoji: "🧬",
  departments: [
    {
      id: "ah-mlt",
      en: "Medical Lab Technology",
      ta: "மருத்துவ ஆய்வக தொழில்நுட்பம்",
      hi: "चिकित्सा प्रयोगशाला प्रौद्योगिकी",
      emoji: "🔬",
      years: [
        {
          ...yr(1),
          subjects: [
            { id: "mlt-anat", en: "Anatomy & Physiology", ta: "உடற்கூறியல் & உடலியல்", hi: "शरीर रचना एवं क्रिया विज्ञान", emoji: "🦴", color: "from-primary/20 to-accent/20", topics: [
              { id: "mla1", en: "Basic Anatomy", ta: "அடிப்படை உடற்கூறியல்", hi: "मूल शरीर रचना" },
              { id: "mla2", en: "Organ Systems", ta: "உறுப்பு அமைப்புகள்", hi: "अंग प्रणालियां" },
            ]},
            { id: "mlt-biochem", en: "Clinical Biochemistry", ta: "மருத்துவ உயிர் வேதியியல்", hi: "नैदानिक जैव रसायन", emoji: "🧪", color: "from-secondary/20 to-primary/20", topics: [
              { id: "cb1", en: "Blood Chemistry", ta: "இரத்த வேதியியல்", hi: "रक्त रसायन" },
              { id: "cb2", en: "Liver Function Tests", ta: "கல்லீரல் செயல்பாட்டு சோதனைகள்", hi: "लिवर फंक्शन टेस्ट" },
            ]},
          ],
        },
      ],
    },
    {
      id: "ah-radiology",
      en: "Radiology & Imaging",
      ta: "கதிர்வியல் & படமெடுப்பு",
      hi: "रेडियोलॉजी एवं इमेजिंग",
      emoji: "📷",
      years: [
        {
          ...yr(1),
          subjects: [
            { id: "rad-phy", en: "Radiation Physics", ta: "கதிர்வீச்சு இயற்பியல்", hi: "विकिरण भौतिकी", emoji: "☢️", color: "from-dream/20 to-accent/20", topics: [
              { id: "rp1", en: "X-ray Production", ta: "X-கதிர் உற்பத்தி", hi: "X-रे उत्पादन" },
              { id: "rp2", en: "Radiation Safety", ta: "கதிர் பாதுகாப்பு", hi: "विकिरण सुरक्षा" },
            ]},
            { id: "rad-anat", en: "Radiographic Anatomy", ta: "கதிர்வீச்சு உடற்கூறியல்", hi: "रेडियोग्राफिक शरीर रचना", emoji: "🦴", color: "from-accent/20 to-primary/20", topics: [
              { id: "ra1", en: "Skeletal Imaging", ta: "எலும்பு படமெடுப்பு", hi: "कंकाल इमेजिंग" },
              { id: "ra2", en: "Chest X-ray", ta: "மார்பு X-கதிர்", hi: "छाती X-रे" },
            ]},
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════
// LAW
// ═══════════════════════════════════════════
const lawCourse: HECourse = {
  id: "law",
  en: "Law",
  ta: "சட்டம்",
  hi: "विधि",
  emoji: "⚖️",
  departments: [{
    id: "ballb",
    en: "BA LLB / LLB",
    ta: "BA LLB / LLB",
    hi: "BA LLB / LLB",
    emoji: "⚖️",
    years: [
      {
        ...yr(1),
        subjects: [
          { id: "law-const", en: "Constitutional Law", ta: "அரசியலமைப்பு சட்டம்", hi: "संवैधानिक विधि", emoji: "📜", color: "from-primary/20 to-accent/20", topics: [
            { id: "cl1", en: "Fundamental Rights", ta: "அடிப்படை உரிமைகள்", hi: "मौलिक अधिकार" },
            { id: "cl2", en: "Directive Principles", ta: "வழிகாட்டு நெறிமுறைகள்", hi: "निदेशक सिद्धांत" },
            { id: "cl3", en: "Judicial Review", ta: "நீதித்துறை மறுஆய்வு", hi: "न्यायिक समीक्षा" },
          ]},
          { id: "law-contract", en: "Law of Contracts", ta: "ஒப்பந்தச் சட்டம்", hi: "संविदा विधि", emoji: "📝", color: "from-secondary/20 to-primary/20", topics: [
            { id: "lc1", en: "Formation of Contract", ta: "ஒப்பந்த உருவாக்கம்", hi: "संविदा का निर्माण" },
            { id: "lc2", en: "Breach & Remedies", ta: "மீறல் & தீர்வுகள்", hi: "भंग और उपचार" },
          ]},
          { id: "law-juris", en: "Jurisprudence", ta: "சட்டவியல்", hi: "विधिशास्त्र", emoji: "🏛️", color: "from-dream/20 to-secondary/20", topics: [
            { id: "ju1", en: "Schools of Jurisprudence", ta: "சட்டவியல் பள்ளிகள்", hi: "विधिशास्त्र के स्कूल" },
            { id: "ju2", en: "Legal Concepts", ta: "சட்ட கருத்துக்கள்", hi: "विधिक अवधारणाएं" },
          ]},
        ],
      },
      {
        ...yr(2),
        subjects: [
          { id: "law-crim", en: "Criminal Law", ta: "குற்றவியல் சட்டம்", hi: "दंड विधि", emoji: "🔒", color: "from-accent/20 to-dream/20", topics: [
            { id: "cr1", en: "IPC (BNS)", ta: "IPC (BNS)", hi: "IPC (BNS)" },
            { id: "cr2", en: "CrPC (BNSS)", ta: "CrPC (BNSS)", hi: "CrPC (BNSS)" },
          ]},
          { id: "law-family", en: "Family Law", ta: "குடும்ப சட்டம்", hi: "पारिवारिक विधि", emoji: "👨‍👩‍👧", color: "from-primary/20 to-dream/20", topics: [
            { id: "fl1", en: "Hindu Law", ta: "இந்து சட்டம்", hi: "हिंदू विधि" },
            { id: "fl2", en: "Muslim Law", ta: "முஸ்லிம் சட்டம்", hi: "मुस्लिम विधि" },
            { id: "fl3", en: "Marriage & Divorce", ta: "திருமணம் & விவாகரத்து", hi: "विवाह और तलाक" },
          ]},
        ],
      },
      {
        ...yr(3),
        subjects: [
          { id: "law-prop", en: "Property Law", ta: "சொத்து சட்டம்", hi: "संपत्ति विधि", emoji: "🏠", color: "from-secondary/20 to-accent/20", topics: [
            { id: "pl1", en: "Transfer of Property", ta: "சொத்து மாற்றம்", hi: "संपत्ति का हस्तांतरण" },
            { id: "pl2", en: "Easement Act", ta: "எளிமையாக்கல் சட்டம்", hi: "सुखाचार अधिनियम" },
          ]},
          { id: "law-admin", en: "Administrative Law", ta: "நிர்வாக சட்டம்", hi: "प्रशासनिक विधि", emoji: "🏛️", color: "from-dream/20 to-primary/20", topics: [
            { id: "al1", en: "Delegated Legislation", ta: "ஒதுக்கப்பட்ட சட்டம்", hi: "प्रत्यायोजित विधान" },
            { id: "al2", en: "Judicial Control", ta: "நீதித்துறை கட்டுப்பாடு", hi: "न्यायिक नियंत्रण" },
          ]},
        ],
      },
    ],
  }],
};

export const higherEdCourses: HECourse[] = [
  mbbsCourse,
  bdsCourse,
  engineeringCourse,
  pharmacyCourse,
  nursingCourse,
  physiotherapyCourse,
  artsScienceCourse,
  alliedHealthCourse,
  lawCourse,
];
