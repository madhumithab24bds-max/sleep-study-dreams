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

function yr(num: number): { id: string; en: string; ta: string; hi: string } {
  const ordEn = ["1st", "2nd", "3rd", "4th", "5th"];
  const ordTa = ["1ஆம்", "2ஆம்", "3ஆம்", "4ஆம்", "5ஆம்"];
  const ordHi = ["प्रथम", "द्वितीय", "तृतीय", "चतुर्थ", "पंचम"];
  return { id: `y${num}`, en: `${ordEn[num - 1]} Year`, ta: `${ordTa[num - 1]} ஆண்டு`, hi: `${ordHi[num - 1]} वर्ष` };
}

// ═══════════════════════════════════════════
// BDS (4 years)
// ═══════════════════════════════════════════
const bdsCourse: HECourse = {
  id: "bds", en: "BDS", ta: "BDS", hi: "BDS", emoji: "🦷",
  departments: [{
    id: "bds-gen", en: "Dental Surgery", ta: "பல் அறுவை சிகிச்சை", hi: "दंत शल्य चिकित्सा", emoji: "🦷",
    years: [
      {
        ...yr(1),
        subjects: [
          { id: "bds-biochem", en: "Biochemistry", ta: "உயிர் வேதியியல்", hi: "जैव रसायन", emoji: "🧪", color: "from-dream/20 to-secondary/20", topics: [
            { id: "bb1", en: "Carbohydrate Metabolism", ta: "கார்போஹைட்ரேட் வளர்சிதை மாற்றம்", hi: "कार्बोहाइड्रेट चयापचय" },
            { id: "bb2", en: "Protein Chemistry", ta: "புரத வேதியியல்", hi: "प्रोटीन रसायन" },
            { id: "bb3", en: "Enzymology", ta: "நொதியியல்", hi: "एंजाइमोलॉजी" },
            { id: "bb4", en: "Lipid Metabolism", ta: "கொழுப்பு வளர்சிதை மாற்றம்", hi: "लिपिड चयापचय" },
            { id: "bb5", en: "Nucleic Acid Chemistry", ta: "நியூக்ளிக் அமில வேதியியல்", hi: "न्यूक्लिक अम्ल रसायन" },
          ]},
          { id: "bds-physio", en: "Physiology", ta: "உடலியல்", hi: "शरीर क्रिया विज्ञान", emoji: "❤️", color: "from-secondary/20 to-primary/20", topics: [
            { id: "bp1", en: "General Physiology", ta: "பொது உடலியல்", hi: "सामान्य शरीर क्रिया" },
            { id: "bp2", en: "Blood & Body Fluids", ta: "இரத்தம் & உடல் திரவங்கள்", hi: "रक्त और शारीरिक तरल" },
            { id: "bp3", en: "Nerve & Muscle Physiology", ta: "நரம்பு & தசை", hi: "तंत्रिका और मांसपेशी" },
            { id: "bp4", en: "CVS Physiology", ta: "இருதய உடலியல்", hi: "हृदय शरीर क्रिया" },
            { id: "bp5", en: "GIT Physiology", ta: "இரைப்பை குடல் உடலியல்", hi: "पाचन शरीर क्रिया" },
            { id: "bp6", en: "Renal Physiology", ta: "சிறுநீரக உடலியல்", hi: "वृक्क शरीर क्रिया" },
          ]},
          { id: "bds-hanat", en: "Human Anatomy", ta: "மனித உடற்கூறியல்", hi: "मानव शरीर रचना विज्ञान", emoji: "🦴", color: "from-primary/20 to-accent/20", topics: [
            { id: "ha1", en: "General Anatomy", ta: "பொது உடற்கூறியல்", hi: "सामान्य शरीर रचना" },
            { id: "ha2", en: "Upper & Lower Limbs", ta: "மேல் & கீழ் கைகால்கள்", hi: "ऊपरी और निचले अंग" },
            { id: "ha3", en: "Head & Neck", ta: "தலை & கழுத்து", hi: "सिर और गर्दन" },
            { id: "ha4", en: "Thorax & Abdomen", ta: "மார்பு & வயிறு", hi: "वक्ष और उदर" },
            { id: "ha5", en: "Histology", ta: "திசுவியல்", hi: "ऊतक विज्ञान" },
            { id: "ha6", en: "Embryology", ta: "கருவியல்", hi: "भ्रूणविज्ञान" },
          ]},
          { id: "bds-danat", en: "Dental Anatomy", ta: "பல் உடற்கூறியல்", hi: "दंत शरीर रचना विज्ञान", emoji: "🦷", color: "from-accent/20 to-dream/20", topics: [
            { id: "da1", en: "Tooth Morphology", ta: "பல் வடிவ அமைப்பு", hi: "दांत आकृति विज्ञान" },
            { id: "da2", en: "Deciduous & Permanent Teeth", ta: "பால் & நிரந்தர பற்கள்", hi: "दूध और स्थायी दांत" },
            { id: "da3", en: "Occlusion", ta: "கடிப்பு", hi: "अवरोध" },
            { id: "da4", en: "Tooth Identification & Numbering", ta: "பல் அடையாளம் & எண்ணிடுதல்", hi: "दांत पहचान और क्रमांकन" },
            { id: "da5", en: "Root Morphology", ta: "வேர் வடிவ அமைப்பு", hi: "जड़ आकृति विज्ञान" },
          ]},
        ],
      },
      {
        ...yr(2),
        subjects: [
          { id: "bds-dmat", en: "Dental Materials", ta: "பல் பொருட்கள்", hi: "दंत सामग्री", emoji: "🔩", color: "from-accent/20 to-dream/20", topics: [
            { id: "dm1", en: "Impression Materials", ta: "அச்சு பொருட்கள்", hi: "इम्प्रेशन सामग्री" },
            { id: "dm2", en: "Restorative Materials", ta: "மறுசீரமைப்பு பொருட்கள்", hi: "पुनर्स्थापन सामग्री" },
            { id: "dm3", en: "Dental Cements", ta: "பல் சிமெண்ட்கள்", hi: "दंत सीमेंट" },
            { id: "dm4", en: "Casting Alloys", ta: "வார்ப்பு உலோகக்கலவைகள்", hi: "कास्टिंग मिश्र धातु" },
            { id: "dm5", en: "Dental Ceramics", ta: "பல் பீங்கான்கள்", hi: "दंत सिरेमिक" },
          ]},
          { id: "bds-pharma", en: "Pharmacology", ta: "மருந்தியல்", hi: "औषध विज्ञान", emoji: "💊", color: "from-dream/20 to-secondary/20", topics: [
            { id: "bph1", en: "General Pharmacology", ta: "பொது மருந்தியல்", hi: "सामान्य औषध विज्ञान" },
            { id: "bph2", en: "Dental Pharmacology", ta: "பல் மருந்தியல்", hi: "दंत औषध विज्ञान" },
            { id: "bph3", en: "Analgesics & Anaesthetics", ta: "வலி நிவாரணிகள்", hi: "दर्दनाशक और संवेदनाहारी" },
            { id: "bph4", en: "Antibiotics", ta: "நுண்ணுயிர் எதிர்ப்பிகள்", hi: "एंटीबायोटिक्स" },
            { id: "bph5", en: "Drug Interactions", ta: "மருந்து இடைவினைகள்", hi: "दवा इंटरैक्शन" },
          ]},
          { id: "bds-micro", en: "Microbiology", ta: "நுண்ணுயிரியல்", hi: "सूक्ष्म जीव विज्ञान", emoji: "🦠", color: "from-secondary/20 to-primary/20", topics: [
            { id: "bm1", en: "General Microbiology", ta: "பொது நுண்ணுயிரியல்", hi: "सामान्य सूक्ष्म जीव विज्ञान" },
            { id: "bm2", en: "Oral Microbiology", ta: "வாய்வழி நுண்ணுயிரியல்", hi: "मौखिक सूक्ष्म जीव विज्ञान" },
            { id: "bm3", en: "Immunology", ta: "நோய்த்தடுப்பு இயல்", hi: "प्रतिरक्षा विज्ञान" },
            { id: "bm4", en: "Virology", ta: "வைரஸ் இயல்", hi: "विषाणु विज्ञान" },
          ]},
          { id: "bds-patho", en: "General Pathology", ta: "பொது நோயியல்", hi: "सामान्य रोग विज्ञान", emoji: "🔬", color: "from-primary/20 to-accent/20", topics: [
            { id: "bpa1", en: "Cell Injury & Inflammation", ta: "உயிரணு காயம் & வீக்கம்", hi: "कोशिका क्षति और शोथ" },
            { id: "bpa2", en: "Neoplasia", ta: "புதிய வளர்ச்சி", hi: "अर्बुदविज्ञान" },
            { id: "bpa3", en: "Hemodynamic Disorders", ta: "இரத்த இயக்க கோளாறுகள்", hi: "रक्तगतिकी विकार" },
            { id: "bpa4", en: "Immunopathology", ta: "நோய்த்தடுப்பு நோயியல்", hi: "प्रतिरक्षा रोगविज्ञान" },
          ]},
        ],
      },
      {
        ...yr(3),
        subjects: [
          { id: "bds-opath", en: "Oral Pathology", ta: "வாய்வழி நோயியல்", hi: "मौखिक रोग विज्ञान", emoji: "🔍", color: "from-accent/20 to-dream/20", topics: [
            { id: "op1", en: "Developmental Anomalies", ta: "வளர்ச்சி குறைபாடுகள்", hi: "विकासात्मक विसंगतियां" },
            { id: "op2", en: "Cysts of Oral Region", ta: "வாய் பகுதி நீர்க்கட்டிகள்", hi: "मुख क्षेत्र के पुटी" },
            { id: "op3", en: "Tumors of Oral Region", ta: "வாய் கட்டிகள்", hi: "मुख क्षेत्र के ट्यूमर" },
            { id: "op4", en: "Salivary Gland Diseases", ta: "உமிழ்நீர் சுரப்பி நோய்கள்", hi: "लार ग्रंथि रोग" },
            { id: "op5", en: "Oral Premalignant Lesions", ta: "வாய் முன்புற்று புண்கள்", hi: "मौखिक पूर्व-कैंसर घाव" },
          ]},
          { id: "bds-omed", en: "Dental Medicine (Oral Medicine)", ta: "பல் மருத்துவம் (வாய் மருத்துவம்)", hi: "दंत चिकित्सा (मौखिक चिकित्सा)", emoji: "🩺", color: "from-primary/20 to-secondary/20", topics: [
            { id: "om1", en: "Oral Mucosal Diseases", ta: "வாய் சளி சவ்வு நோய்கள்", hi: "मौखिक श्लेष्मा रोग" },
            { id: "om2", en: "TMJ Disorders", ta: "TMJ கோளாறுகள்", hi: "TMJ विकार" },
            { id: "om3", en: "Oral Manifestations of Systemic Diseases", ta: "முழு உடல் நோய்களின் வாய் அறிகுறிகள்", hi: "प्रणालीगत रोगों की मौखिक अभिव्यक्तियां" },
            { id: "om4", en: "Orofacial Pain", ta: "வாய்முக வலி", hi: "मुख-चेहरे का दर्द" },
          ]},
          { id: "bds-dsurg", en: "Dental Surgery (Oral Surgery)", ta: "பல் அறுவை சிகிச்சை", hi: "दंत शल्य चिकित्सा", emoji: "🏥", color: "from-secondary/20 to-dream/20", topics: [
            { id: "ds1", en: "Exodontia (Tooth Extraction)", ta: "பல் பிடுங்குதல்", hi: "दांत निकालना" },
            { id: "ds2", en: "Impacted Teeth Management", ta: "புதைந்த பற்கள் மேலாண்மை", hi: "प्रभावित दांत प्रबंधन" },
            { id: "ds3", en: "Minor Oral Surgery", ta: "சிறு வாய் அறுவை சிகிச்சை", hi: "लघु मौखिक शल्य चिकित्सा" },
            { id: "ds4", en: "Local Anaesthesia", ta: "உள்ளூர் மயக்கமருந்து", hi: "स्थानीय संवेदनाहारी" },
            { id: "ds5", en: "Maxillofacial Trauma", ta: "முக காயம்", hi: "मुख आघात" },
          ]},
        ],
      },
      {
        ...yr(4),
        subjects: [
          { id: "bds-ortho", en: "Orthodontics", ta: "பல் சீரமைப்பு", hi: "दंत कतार विज्ञान", emoji: "😁", color: "from-accent/20 to-primary/20", topics: [
            { id: "bo1", en: "Growth & Development", ta: "வளர்ச்சி & மேம்பாடு", hi: "वृद्धि और विकास" },
            { id: "bo2", en: "Fixed Appliances", ta: "நிலையான கருவிகள்", hi: "स्थिर उपकरण" },
            { id: "bo3", en: "Malocclusion Classification", ta: "தவறான கடி வகைப்பாடு", hi: "कुअवरोध वर्गीकरण" },
            { id: "bo4", en: "Removable Appliances", ta: "நீக்கக்கூடிய கருவிகள்", hi: "हटाने योग्य उपकरण" },
            { id: "bo5", en: "Cephalometrics", ta: "செபலோமெட்ரிக்ஸ்", hi: "सेफेलोमेट्रिक्स" },
          ]},
          { id: "bds-pedo", en: "Pedodontics", ta: "குழந்தை பல் சிகிச்சை", hi: "बाल दंत चिकित्सा", emoji: "👶", color: "from-dream/20 to-accent/20", topics: [
            { id: "pd1", en: "Child Psychology", ta: "குழந்தை உளவியல்", hi: "बाल मनोविज्ञान" },
            { id: "pd2", en: "Preventive Dentistry", ta: "தடுப்பு பல் மருத்துவம்", hi: "निवारक दंत चिकित्सा" },
            { id: "pd3", en: "Pulp Therapy in Children", ta: "குழந்தைகளில் கூழ் சிகிச்சை", hi: "बच्चों में पल्प थेरेपी" },
            { id: "pd4", en: "Behaviour Management", ta: "நடத்தை மேலாண்மை", hi: "व्यवहार प्रबंधन" },
          ]},
          { id: "bds-prosth", en: "Prosthodontics", ta: "செயற்கை பல் சிகிச்சை", hi: "कृत्रिम दंत विज्ञान", emoji: "🦷", color: "from-dream/20 to-primary/20", topics: [
            { id: "bpr1", en: "Complete Dentures", ta: "முழு பல் செட்", hi: "पूर्ण दंत सेट" },
            { id: "bpr2", en: "Removable Partial Dentures", ta: "நீக்கக்கூடிய பகுதி பல்", hi: "हटाने योग्य आंशिक दंत" },
            { id: "bpr3", en: "Fixed Partial Dentures", ta: "நிலையான பகுதி பல்", hi: "स्थिर आंशिक दंत" },
            { id: "bpr4", en: "Maxillofacial Prosthetics", ta: "முக செயற்கை உறுப்புகள்", hi: "मुख कृत्रिम अंग" },
            { id: "bpr5", en: "Implant Prosthodontics", ta: "உள்வைப்பு செயற்கை பல்", hi: "इम्प्लांट कृत्रिम दंत" },
          ]},
          { id: "bds-phd", en: "Public Health Dentistry", ta: "பொது சுகாதார பல் மருத்துவம்", hi: "सार्वजनिक स्वास्थ्य दंत चिकित्सा", emoji: "🌍", color: "from-primary/20 to-dream/20", topics: [
            { id: "phd1", en: "Epidemiology of Oral Diseases", ta: "வாய் நோய் தொற்றுநோயியல்", hi: "मौखिक रोगों की महामारी विज्ञान" },
            { id: "phd2", en: "Community Dentistry", ta: "சமூக பல் மருத்துவம்", hi: "सामुदायिक दंत चिकित्सा" },
            { id: "phd3", en: "Preventive Programs", ta: "தடுப்பு திட்டங்கள்", hi: "निवारक कार्यक्रम" },
            { id: "phd4", en: "Biostatistics", ta: "உயிர் புள்ளியியல்", hi: "जैव सांख्यिकी" },
          ]},
          { id: "bds-perio", en: "Periodontics", ta: "ஈறு சிகிச்சை", hi: "मसूड़ा विज्ञान", emoji: "🩹", color: "from-primary/20 to-secondary/20", topics: [
            { id: "bpe1", en: "Periodontal Diseases", ta: "ஈறு நோய்கள்", hi: "मसूड़ा रोग" },
            { id: "bpe2", en: "Scaling & Root Planing", ta: "சுத்தம் & வேர் சமப்படுத்தல்", hi: "स्केलिंग और रूट प्लानिंग" },
            { id: "bpe3", en: "Periodontal Surgery", ta: "ஈறு அறுவை சிகிச்சை", hi: "मसूड़ा शल्य चिकित्सा" },
            { id: "bpe4", en: "Regenerative Periodontics", ta: "மீளுருவாக்க ஈறு சிகிச்சை", hi: "पुनर्जनन मसूड़ा विज्ञान" },
          ]},
          { id: "bds-endo", en: "Endodontics", ta: "வேர் சிகிச்சை", hi: "एंडोडोंटिक्स", emoji: "🔧", color: "from-secondary/20 to-dream/20", topics: [
            { id: "en1", en: "Root Canal Treatment", ta: "வேர் கால்வாய் சிகிச்சை", hi: "रूट कैनाल उपचार" },
            { id: "en2", en: "Pulp Biology", ta: "கூழ் உயிரியல்", hi: "पल्प जीवविज्ञान" },
            { id: "en3", en: "Endodontic Surgery", ta: "வேர் அறுவை சிகிச்சை", hi: "एंडोडोंटिक शल्य चिकित्सा" },
            { id: "en4", en: "Retreatment", ta: "மீண்டும் சிகிச்சை", hi: "पुनर्चिकित्सा" },
          ]},
          { id: "bds-omfs", en: "OMFS (Oral & Maxillofacial Surgery)", ta: "வாய் & முக அறுவை சிகிச்சை", hi: "मौखिक और मुख शल्य चिकित्सा", emoji: "🏥", color: "from-accent/20 to-secondary/20", topics: [
            { id: "omfs1", en: "Maxillofacial Trauma", ta: "முக காயம்", hi: "मुख आघात" },
            { id: "omfs2", en: "Orthognathic Surgery", ta: "தாடை சீரமைப்பு அறுவை", hi: "ऑर्थोग्नेथिक शल्य चिकित्सा" },
            { id: "omfs3", en: "Implantology", ta: "உள்வைப்பு இயல்", hi: "इम्प्लांटोलॉजी" },
            { id: "omfs4", en: "Cleft Lip & Palate", ta: "பிளவு உதடு & அண்ணம்", hi: "कटे होंठ और तालु" },
          ]},
          { id: "bds-omr", en: "OMR (Oral Medicine & Radiology)", ta: "வாய் மருத்துவம் & கதிர்வீச்சியல்", hi: "मौखिक चिकित्सा और रेडियोलॉजी", emoji: "📷", color: "from-secondary/20 to-dream/20", topics: [
            { id: "omr1", en: "Oral Mucosal Lesions", ta: "வாய் சளி சவ்வு புண்கள்", hi: "मौखिक श्लेष्मा घाव" },
            { id: "omr2", en: "Dental Radiography", ta: "பல் கதிர்வீச்சு படமெடுப்பு", hi: "दंत रेडियोग्राफी" },
            { id: "omr3", en: "Advanced Imaging (CBCT, MRI)", ta: "மேம்பட்ட படமெடுப்பு", hi: "उन्नत इमेजिंग" },
            { id: "omr4", en: "Radiation Biology", ta: "கதிர்வீச்சு உயிரியல்", hi: "विकिरण जीवविज्ञान" },
          ]},
          { id: "bds-phd", en: "Public Health Dentistry", ta: "பொது சுகாதார பல் மருத்துவம்", hi: "सार्वजनिक स्वास्थ्य दंत चिकित्सा", emoji: "🌍", color: "from-accent/20 to-primary/20", topics: [
            { id: "phd1", en: "Epidemiology of Oral Diseases", ta: "வாய் நோய் தொற்றுநோயியல்", hi: "मौखिक रोग महामारी विज्ञान" },
            { id: "phd2", en: "Community Dental Programs", ta: "சமூக பல் திட்டங்கள்", hi: "सामुदायिक दंत कार्यक्रम" },
          ]},
        ],
      },
    ],
  }],
};

// ═══════════════════════════════════════════
// MBBS (4.5 years → modeled as 3 phases)
// ═══════════════════════════════════════════
const mbbsCourse: HECourse = {
  id: "mbbs", en: "MBBS", ta: "MBBS", hi: "MBBS", emoji: "🩺",
  departments: [{
    id: "mbbs-gen", en: "Medicine & Surgery", ta: "மருத்துவம் & அறுவை சிகிச்சை", hi: "चिकित्सा एवं शल्य चिकित्सा", emoji: "🩺",
    years: [
      {
        ...yr(1),
        subjects: [
          { id: "mb-anat", en: "Anatomy", ta: "உடற்கூறியல்", hi: "शरीर रचना विज्ञान", emoji: "🦴", color: "from-primary/20 to-accent/20", topics: [
            { id: "ma1", en: "General Anatomy", ta: "பொது உடற்கூறியல்", hi: "सामान्य शरीर रचना" },
            { id: "ma2", en: "Upper & Lower Limb", ta: "மேல் & கீழ் கை", hi: "ऊपरी और निचला अंग" },
            { id: "ma3", en: "Thorax & Abdomen", ta: "மார்பு & வயிறு", hi: "वक्ष और उदर" },
            { id: "ma4", en: "Head & Neck", ta: "தலை & கழுத்து", hi: "सिर और गर्दन" },
            { id: "ma5", en: "Neuroanatomy", ta: "நரம்பு உடற்கூறியல்", hi: "तंत्रिका शरीर रचना" },
            { id: "ma6", en: "Embryology", ta: "கருவியல்", hi: "भ्रूणविज्ञान" },
            { id: "ma7", en: "Histology", ta: "திசுவியல்", hi: "ऊतक विज्ञान" },
          ]},
          { id: "mb-physio", en: "Physiology", ta: "உடலியல்", hi: "शरीर क्रिया विज्ञान", emoji: "❤️", color: "from-secondary/20 to-primary/20", topics: [
            { id: "mp1", en: "Cell Physiology", ta: "உயிரணு உடலியல்", hi: "कोशिका शरीर क्रिया" },
            { id: "mp2", en: "Cardiovascular System", ta: "இருதய அமைப்பு", hi: "हृदय प्रणाली" },
            { id: "mp3", en: "Respiratory System", ta: "சுவாச அமைப்பு", hi: "श्वसन प्रणाली" },
            { id: "mp4", en: "Renal Physiology", ta: "சிறுநீரக உடலியல்", hi: "गुर्दा शरीर क्रिया" },
            { id: "mp5", en: "Endocrine System", ta: "நாளமில்லா சுரப்பி", hi: "अंतःस्रावी तंत्र" },
            { id: "mp6", en: "Neurophysiology", ta: "நரம்பு உடலியல்", hi: "तंत्रिका शरीर क्रिया" },
          ]},
          { id: "mb-biochem", en: "Biochemistry", ta: "உயிர் வேதியியல்", hi: "जैव रसायन", emoji: "🧪", color: "from-dream/20 to-secondary/20", topics: [
            { id: "mbc1", en: "Amino Acids & Proteins", ta: "அமினோ அமிலங்கள்", hi: "अमीनो अम्ल और प्रोटीन" },
            { id: "mbc2", en: "Carbohydrate Metabolism", ta: "கார்போஹைட்ரேட் வளர்சிதை மாற்றம்", hi: "कार्बोहाइड्रेट चयापचय" },
            { id: "mbc3", en: "Lipid Metabolism", ta: "கொழுப்பு வளர்சிதை மாற்றம்", hi: "लिपिड चयापचय" },
            { id: "mbc4", en: "Molecular Biology", ta: "மூலக்கூறு உயிரியல்", hi: "आणविक जीव विज्ञान" },
            { id: "mbc5", en: "Clinical Biochemistry", ta: "மருத்துவ உயிர் வேதியியல்", hi: "नैदानिक जैव रसायन" },
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
            { id: "mpa4", en: "Clinical Pathology", ta: "மருத்துவ நோயியல்", hi: "नैदानिक रोग विज्ञान" },
          ]},
          { id: "mb-micro", en: "Microbiology", ta: "நுண்ணுயிரியல்", hi: "सूक्ष्म जीव विज्ञान", emoji: "🦠", color: "from-primary/20 to-dream/20", topics: [
            { id: "mmi1", en: "Bacteriology", ta: "பாக்டீரியாவியல்", hi: "जीवाणु विज्ञान" },
            { id: "mmi2", en: "Virology", ta: "வைரஸ் இயல்", hi: "विषाणु विज्ञान" },
            { id: "mmi3", en: "Parasitology", ta: "ஒட்டுண்ணியியல்", hi: "परजीवी विज्ञान" },
            { id: "mmi4", en: "Immunology", ta: "நோய்த்தடுப்பு இயல்", hi: "प्रतिरक्षा विज्ञान" },
          ]},
          { id: "mb-pharma", en: "Pharmacology", ta: "மருந்தியல்", hi: "औषध विज्ञान", emoji: "💊", color: "from-secondary/20 to-accent/20", topics: [
            { id: "mph1", en: "General Pharmacology", ta: "பொது மருந்தியல்", hi: "सामान्य औषध विज्ञान" },
            { id: "mph2", en: "Autonomic Pharmacology", ta: "தன்னிலை மருந்தியல்", hi: "स्वायत्त औषध विज्ञान" },
            { id: "mph3", en: "CNS Pharmacology", ta: "நரம்பு மருந்தியல்", hi: "सी.एन.एस. औषध विज्ञान" },
            { id: "mph4", en: "Chemotherapy", ta: "வேதிசிகிச்சை", hi: "कीमोथेरेपी" },
          ]},
          { id: "mb-fmed", en: "Forensic Medicine & Toxicology", ta: "தடயவியல் மருத்துவம்", hi: "न्यायिक चिकित्सा एवं विष विज्ञान", emoji: "🔍", color: "from-dream/20 to-primary/20", topics: [
            { id: "mfm1", en: "Thanatology", ta: "மரண இயல்", hi: "मृत्यु विज्ञान" },
            { id: "mfm2", en: "Toxicology", ta: "நச்சுயியல்", hi: "विष विज्ञान" },
            { id: "mfm3", en: "Medical Jurisprudence", ta: "மருத்துவ சட்டவியல்", hi: "चिकित्सा विधिशास्त्र" },
          ]},
          { id: "mb-comm", en: "Community Medicine (PSM)", ta: "சமூக மருத்துவம்", hi: "सामुदायिक चिकित्सा", emoji: "🌍", color: "from-accent/20 to-secondary/20", topics: [
            { id: "cm1", en: "Epidemiology", ta: "தொற்றுநோயியல்", hi: "महामारी विज्ञान" },
            { id: "cm2", en: "Biostatistics", ta: "உயிர்புள்ளியியல்", hi: "जैव सांख्यिकी" },
            { id: "cm3", en: "Nutrition & Health", ta: "ஊட்டச்சத்து & சுகாதாரம்", hi: "पोषण और स्वास्थ्य" },
            { id: "cm4", en: "National Health Programs", ta: "தேசிய சுகாதார திட்டங்கள்", hi: "राष्ट्रीय स्वास्थ्य कार्यक्रम" },
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
            { id: "mgm4", en: "Nephrology", ta: "சிறுநீரகவியல்", hi: "गुर्दा रोग" },
            { id: "mgm5", en: "Endocrinology", ta: "நாளமில்லா சுரப்பியல்", hi: "अंतःस्रावी विज्ञान" },
            { id: "mgm6", en: "Infectious Diseases", ta: "தொற்று நோய்கள்", hi: "संक्रामक रोग" },
          ]},
          { id: "mb-surg", en: "General Surgery", ta: "பொது அறுவை சிகிச்சை", hi: "सामान्य शल्य चिकित्सा", emoji: "🔪", color: "from-accent/20 to-primary/20", topics: [
            { id: "mgs1", en: "Wound Healing & Surgical Infections", ta: "காயம் ஆறுதல்", hi: "घाव भरना और शल्य संक्रमण" },
            { id: "mgs2", en: "GIT Surgery", ta: "இரைப்பை குடல் அறுவை சிகிச்சை", hi: "पाचन शल्य चिकित्सा" },
            { id: "mgs3", en: "Breast & Thyroid Surgery", ta: "மார்பகம் & தைராய்டு அறுவை சிகிச்சை", hi: "स्तन और थायराइड शल्य चिकित्सा" },
            { id: "mgs4", en: "Vascular Surgery", ta: "இரத்தக்குழாய் அறுவை சிகிச்சை", hi: "रक्तवाहिका शल्य चिकित्सा" },
          ]},
          { id: "mb-obg", en: "Obstetrics & Gynaecology", ta: "மகப்பேறு & மகளிர் மருத்துவம்", hi: "प्रसूति एवं स्त्री रोग", emoji: "👶", color: "from-secondary/20 to-dream/20", topics: [
            { id: "mob1", en: "Normal & Abnormal Labour", ta: "இயல்பான & அசாதாரண பிரசவம்", hi: "सामान्य और असामान्य प्रसव" },
            { id: "mob2", en: "High-Risk Pregnancy", ta: "அதிக ஆபத்து கர்ப்பம்", hi: "उच्च जोखिम गर्भावस्था" },
            { id: "mob3", en: "Gynaecological Disorders", ta: "மகளிர் நோய்கள்", hi: "स्त्री रोग विकार" },
          ]},
          { id: "mb-paed", en: "Paediatrics", ta: "குழந்தை மருத்துவம்", hi: "बाल रोग", emoji: "🧒", color: "from-dream/20 to-primary/20", topics: [
            { id: "mp1", en: "Neonatology", ta: "புதிதாகப் பிறந்தோர் மருத்துவம்", hi: "नवजात विज्ञान" },
            { id: "mp2", en: "Growth & Development", ta: "வளர்ச்சி & மேம்பாடு", hi: "वृद्धि और विकास" },
            { id: "mp3", en: "Pediatric Infections", ta: "குழந்தை தொற்றுகள்", hi: "बाल संक्रमण" },
          ]},
          { id: "mb-ortho", en: "Orthopaedics", ta: "எலும்பியல்", hi: "अस्थि रोग", emoji: "🦴", color: "from-accent/20 to-secondary/20", topics: [
            { id: "mor1", en: "Fractures & Dislocations", ta: "எலும்பு முறிவுகள்", hi: "अस्थिभंग और विस्थापन" },
            { id: "mor2", en: "Joint Disorders", ta: "மூட்டு கோளாறுகள்", hi: "संधि विकार" },
          ]},
          { id: "mb-ent", en: "ENT", ta: "காது மூக்கு தொண்டை", hi: "कान नाक गला", emoji: "👂", color: "from-primary/20 to-accent/20", topics: [
            { id: "ent1", en: "Ear Diseases", ta: "காது நோய்கள்", hi: "कान के रोग" },
            { id: "ent2", en: "Nose & Throat", ta: "மூக்கு & தொண்டை", hi: "नाक और गला" },
          ]},
          { id: "mb-oph", en: "Ophthalmology", ta: "கண் மருத்துவம்", hi: "नेत्र विज्ञान", emoji: "👁️", color: "from-secondary/20 to-primary/20", topics: [
            { id: "oph1", en: "Refractive Errors", ta: "ஒளிவிலகல் பிழைகள்", hi: "अपवर्तक दोष" },
            { id: "oph2", en: "Glaucoma & Cataract", ta: "கண் அழுத்தம் & கண்புரை", hi: "ग्लूकोमा और मोतियाबिंद" },
          ]},
          { id: "mb-derm", en: "Dermatology", ta: "தோல் மருத்துவம்", hi: "त्वचा विज्ञान", emoji: "🩹", color: "from-dream/20 to-accent/20", topics: [
            { id: "drm1", en: "Skin Infections", ta: "தோல் தொற்றுகள்", hi: "त्वचा संक्रमण" },
            { id: "drm2", en: "STDs", ta: "பாலியல் நோய்கள்", hi: "यौन संचारित रोग" },
          ]},
          { id: "mb-psych", en: "Psychiatry", ta: "உளவியல் மருத்துவம்", hi: "मनोचिकित्सा", emoji: "🧠", color: "from-primary/20 to-dream/20", topics: [
            { id: "psy1", en: "Mood Disorders", ta: "மனநிலை கோளாறுகள்", hi: "मनोदशा विकार" },
            { id: "psy2", en: "Schizophrenia", ta: "மனச்சிதைவு", hi: "सिज़ोफ्रेनिया" },
          ]},
          { id: "mb-anaes", en: "Anaesthesiology", ta: "மயக்கவியல்", hi: "संज्ञाहरण विज्ञान", emoji: "💉", color: "from-accent/20 to-dream/20", topics: [
            { id: "an1", en: "General Anaesthesia", ta: "பொது மயக்கம்", hi: "सामान्य संज्ञाहरण" },
            { id: "an2", en: "Regional Anaesthesia", ta: "பகுதி மயக்கம்", hi: "क्षेत्रीय संज्ञाहरण" },
          ]},
        ],
      },
    ],
  }],
};

// ═══════════════════════════════════════════
// ENGINEERING (4 years, multiple departments)
// ═══════════════════════════════════════════
const commonEngY1: HESubject[] = [
  { id: "eng-math1", en: "Engineering Mathematics I", ta: "பொறியியல் கணிதம் I", hi: "इंजीनियरिंग गणित I", emoji: "📐", color: "from-primary/20 to-accent/20", topics: [
    { id: "em1", en: "Matrices & Linear Algebra", ta: "அணிகள் & நேரியல் இயற்கணிதம்", hi: "मैट्रिक्स और रैखिक बीजगणित" },
    { id: "em2", en: "Calculus", ta: "நுண்கணிதம்", hi: "कलन" },
    { id: "em3", en: "Differential Equations", ta: "வகைநிலைச் சமன்பாடுகள்", hi: "अवकल समीकरण" },
    { id: "em4", en: "Vector Calculus", ta: "வெக்டர் நுண்கணிதம்", hi: "सदिश कलन" },
  ]},
  { id: "eng-math2", en: "Engineering Mathematics II", ta: "பொறியியல் கணிதம் II", hi: "इंजीनियरिंग गणित II", emoji: "📊", color: "from-secondary/20 to-primary/20", topics: [
    { id: "em5", en: "Laplace Transforms", ta: "லாப்லாஸ் உருமாற்றம்", hi: "लाप्लास रूपांतरण" },
    { id: "em6", en: "Fourier Series", ta: "ஃபூரியர் தொடர்", hi: "फूरियर श्रेणी" },
    { id: "em7", en: "Probability & Statistics", ta: "நிகழ்தகவு & புள்ளியியல்", hi: "प्रायिकता और सांख्यिकी" },
  ]},
  { id: "eng-phy", en: "Engineering Physics", ta: "பொறியியல் இயற்பியல்", hi: "इंजीनियरिंग भौतिकी", emoji: "⚛️", color: "from-dream/20 to-secondary/20", topics: [
    { id: "ep1", en: "Optics & Lasers", ta: "ஒளியியல் & லேசர்கள்", hi: "प्रकाशिकी और लेज़र" },
    { id: "ep2", en: "Quantum Mechanics", ta: "குவாண்டம் இயக்கவியல்", hi: "क्वांटम यांत्रिकी" },
    { id: "ep3", en: "Semiconductor Physics", ta: "குறைகடத்தி இயற்பியல்", hi: "अर्धचालक भौतिकी" },
  ]},
  { id: "eng-chem", en: "Engineering Chemistry", ta: "பொறியியல் வேதியியல்", hi: "इंजीनियरिंग रसायन", emoji: "🧪", color: "from-accent/20 to-dream/20", topics: [
    { id: "ec1", en: "Water Chemistry", ta: "நீர் வேதியியல்", hi: "जल रसायन" },
    { id: "ec2", en: "Polymers & Composites", ta: "பாலிமர்கள்", hi: "बहुलक और मिश्रित" },
    { id: "ec3", en: "Electrochemistry", ta: "மின்வேதியியல்", hi: "विद्युत रसायन" },
  ]},
  { id: "eng-draw", en: "Engineering Graphics", ta: "பொறியியல் வரைகலை", hi: "इंजीनियरिंग ग्राफिक्स", emoji: "📏", color: "from-primary/20 to-dream/20", topics: [
    { id: "eg1", en: "Orthographic Projections", ta: "செங்குத்து படமிடல்", hi: "ऑर्थोग्राफिक प्रोजेक्शन" },
    { id: "eg2", en: "Isometric Views", ta: "ஐசோமெட்ரிக் காட்சிகள்", hi: "आइसोमेट्रिक व्यू" },
  ]},
  { id: "eng-prog", en: "Programming in C / Python", ta: "C / Python நிரலாக்கம்", hi: "C / Python प्रोग्रामिंग", emoji: "💻", color: "from-secondary/20 to-accent/20", topics: [
    { id: "prg1", en: "Data Types & Control Flow", ta: "தரவு வகைகள் & கட்டுப்பாட்டு ஓட்டம்", hi: "डेटा टाइप और कंट्रोल फ्लो" },
    { id: "prg2", en: "Functions & Arrays", ta: "சார்புகள் & அணிகள்", hi: "फंक्शन और एरे" },
    { id: "prg3", en: "Pointers & File Handling", ta: "சுட்டிகள் & கோப்பு கையாளுதல்", hi: "पॉइंटर और फाइल हैंडलिंग" },
  ]},
];

const engineeringCourse: HECourse = {
  id: "engineering", en: "Engineering", ta: "பொறியியல்", hi: "इंजीनियरिंग", emoji: "⚙️",
  departments: [
    {
      id: "cse", en: "Computer Science (CSE)", ta: "கணினி அறிவியல்", hi: "कंप्यूटर विज्ञान", emoji: "💻",
      years: [
        { ...yr(1), subjects: commonEngY1 },
        { ...yr(2), subjects: [
          { id: "cse-ds", en: "Data Structures", ta: "தரவு கட்டமைப்புகள்", hi: "डेटा संरचना", emoji: "📊", color: "from-accent/20 to-dream/20", topics: [
            { id: "ds1", en: "Arrays, Stacks & Queues", ta: "அணிகள், அடுக்குகள் & வரிசைகள்", hi: "ऐरे, स्टैक और क्यू" },
            { id: "ds2", en: "Linked Lists", ta: "இணைப்பு பட்டியல்", hi: "लिंक्ड लिस्ट" },
            { id: "ds3", en: "Trees & Graphs", ta: "மரங்கள் & வரைபடங்கள்", hi: "ट्री और ग्राफ" },
            { id: "ds4", en: "Sorting & Searching", ta: "வரிசைப்படுத்தல் & தேடல்", hi: "सॉर्टिंग और सर्चिंग" },
            { id: "ds5", en: "Hashing", ta: "ஹாஷிங்", hi: "हैशिंग" },
          ]},
          { id: "cse-oops", en: "Object Oriented Programming", ta: "பொருள் சார்ந்த நிரலாக்கம்", hi: "ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग", emoji: "🧩", color: "from-primary/20 to-dream/20", topics: [
            { id: "oop1", en: "Classes, Objects & Constructors", ta: "வகுப்புகள் & பொருள்கள்", hi: "क्लास, ऑब्जेक्ट और कंस्ट्रक्टर" },
            { id: "oop2", en: "Inheritance & Polymorphism", ta: "மரபுரிமை & பலவடிவம்", hi: "इनहेरिटेंस और पॉलिमॉर्फिज्म" },
            { id: "oop3", en: "Exception Handling", ta: "விதிவிலக்கு கையாளுதல்", hi: "अपवाद प्रबंधन" },
          ]},
          { id: "cse-dbms", en: "Database Management Systems", ta: "தரவுத்தள மேலாண்மை", hi: "डेटाबेस प्रबंधन प्रणाली", emoji: "🗄️", color: "from-secondary/20 to-accent/20", topics: [
            { id: "db1", en: "ER Model & SQL", ta: "ER மாதிரி & SQL", hi: "ER मॉडल और SQL" },
            { id: "db2", en: "Normalization", ta: "இயல்பாக்கம்", hi: "नॉर्मलाइजेशन" },
            { id: "db3", en: "Transactions & Concurrency", ta: "பரிவர்த்தனைகள்", hi: "ट्रांजैक्शन और समवर्ती" },
          ]},
          { id: "cse-daa", en: "Design & Analysis of Algorithms", ta: "வழிமுறை வடிவமைப்பு", hi: "एल्गोरिदम डिज़ाइन और विश्लेषण", emoji: "⚡", color: "from-dream/20 to-secondary/20", topics: [
            { id: "daa1", en: "Divide & Conquer", ta: "பிரித்து வெல்", hi: "विभाजन और विजय" },
            { id: "daa2", en: "Dynamic Programming", ta: "இயக்கநிலை நிரலாக்கம்", hi: "डायनामिक प्रोग्रामिंग" },
            { id: "daa3", en: "Graph Algorithms", ta: "வரைபட வழிமுறைகள்", hi: "ग्राफ एल्गोरिदम" },
          ]},
          { id: "cse-coa", en: "Computer Organization & Architecture", ta: "கணினி அமைப்பு", hi: "कंप्यूटर संगठन और वास्तुकला", emoji: "🖥️", color: "from-accent/20 to-primary/20", topics: [
            { id: "coa1", en: "Instruction Set Architecture", ta: "அறிவுறுத்தல் அமைப்பு", hi: "इंस्ट्रक्शन सेट आर्किटेक्चर" },
            { id: "coa2", en: "Memory Hierarchy", ta: "நினைவக படிநிலை", hi: "मेमोरी पदानुक्रम" },
            { id: "coa3", en: "Pipelining", ta: "குழாய் வரிசை", hi: "पाइपलाइनिंग" },
          ]},
        ]},
        { ...yr(3), subjects: [
          { id: "cse-os", en: "Operating Systems", ta: "இயக்க முறைமைகள்", hi: "ऑपरेटिंग सिस्टम", emoji: "🖥️", color: "from-dream/20 to-primary/20", topics: [
            { id: "os1", en: "Process & Thread Management", ta: "செயல்முறை & நூல் மேலாண்மை", hi: "प्रक्रिया और थ्रेड प्रबंधन" },
            { id: "os2", en: "Memory Management", ta: "நினைவக மேலாண்மை", hi: "मेमोरी प्रबंधन" },
            { id: "os3", en: "File Systems", ta: "கோப்பு அமைப்புகள்", hi: "फाइल सिस्टम" },
            { id: "os4", en: "Deadlocks", ta: "முட்டுக்கட்டைகள்", hi: "डेडलॉक" },
          ]},
          { id: "cse-cn", en: "Computer Networks", ta: "கணினி வலையமைப்புகள்", hi: "कंप्यूटर नेटवर्क", emoji: "🌐", color: "from-accent/20 to-secondary/20", topics: [
            { id: "cn1", en: "OSI & TCP/IP Model", ta: "OSI & TCP/IP மாதிரி", hi: "OSI और TCP/IP मॉडल" },
            { id: "cn2", en: "Routing Algorithms", ta: "வழித்தட வழிமுறைகள்", hi: "रूटिंग एल्गोरिदम" },
            { id: "cn3", en: "Application Layer Protocols", ta: "பயன்பாட்டு அடுக்கு நெறிமுறைகள்", hi: "एप्लिकेशन लेयर प्रोटोकॉल" },
          ]},
          { id: "cse-se", en: "Software Engineering", ta: "மென்பொருள் பொறியியல்", hi: "सॉफ्टवेयर इंजीनियरिंग", emoji: "📋", color: "from-primary/20 to-accent/20", topics: [
            { id: "se1", en: "SDLC Models", ta: "SDLC மாதிரிகள்", hi: "SDLC मॉडल" },
            { id: "se2", en: "Testing & Quality Assurance", ta: "சோதனை & தரம்", hi: "परीक्षण और गुणवत्ता" },
            { id: "se3", en: "Agile & DevOps", ta: "அஜைல் & DevOps", hi: "एजाइल और DevOps" },
          ]},
          { id: "cse-toc", en: "Theory of Computation", ta: "கணிப்புக் கோட்பாடு", hi: "संगणना सिद्धांत", emoji: "🔣", color: "from-secondary/20 to-dream/20", topics: [
            { id: "toc1", en: "Finite Automata", ta: "வரையறுக்கப்பட்ட தன்னியக்கிகள்", hi: "परिमित ऑटोमेटा" },
            { id: "toc2", en: "Context-Free Grammars", ta: "சூழல்-சுதந்திர இலக்கணங்கள்", hi: "संदर्भ-मुक्त व्याकरण" },
            { id: "toc3", en: "Turing Machine", ta: "டூரிங் இயந்திரம்", hi: "ट्यूरिंग मशीन" },
          ]},
          { id: "cse-cd", en: "Compiler Design", ta: "தொகுப்பி வடிவமைப்பு", hi: "कम्पाइलर डिज़ाइन", emoji: "🔧", color: "from-dream/20 to-accent/20", topics: [
            { id: "cd1", en: "Lexical & Syntax Analysis", ta: "சொற்களஞ்சிய & தொடரியல் பகுப்பாய்வு", hi: "लेक्सिकल और सिंटैक्स विश्लेषण" },
            { id: "cd2", en: "Code Generation & Optimization", ta: "குறியீடு உருவாக்கம்", hi: "कोड जनरेशन और ऑप्टिमाइज़ेशन" },
          ]},
        ]},
        { ...yr(4), subjects: [
          { id: "cse-ml", en: "Machine Learning", ta: "இயந்திர கற்றல்", hi: "मशीन लर्निंग", emoji: "🤖", color: "from-primary/20 to-accent/20", topics: [
            { id: "ml1", en: "Supervised & Unsupervised Learning", ta: "மேற்பார்வை & மேற்பார்வையற்ற கற்றல்", hi: "सुपरवाइज्ड और अनसुपरवाइज्ड लर्निंग" },
            { id: "ml2", en: "Neural Networks & Deep Learning", ta: "நரம்பு வலையமைப்புகள்", hi: "न्यूरल नेटवर्क और डीप लर्निंग" },
            { id: "ml3", en: "NLP & Computer Vision", ta: "NLP & கணினி பார்வை", hi: "NLP और कंप्यूटर विज़न" },
          ]},
          { id: "cse-cs", en: "Cyber Security", ta: "இணைய பாதுகாப்பு", hi: "साइबर सुरक्षा", emoji: "🔒", color: "from-secondary/20 to-dream/20", topics: [
            { id: "cs1", en: "Cryptography", ta: "மறையீட்டியல்", hi: "क्रिप्टोग्राफी" },
            { id: "cs2", en: "Network Security", ta: "வலை பாதுகாப்பு", hi: "नेटवर्क सुरक्षा" },
          ]},
          { id: "cse-cc", en: "Cloud Computing", ta: "மேக கணினி", hi: "क्लाउड कंप्यूटिंग", emoji: "☁️", color: "from-accent/20 to-primary/20", topics: [
            { id: "cc1", en: "Virtualization & Containers", ta: "மெய்நிகராக்கம்", hi: "वर्चुअलाइज़ेशन और कंटेनर" },
            { id: "cc2", en: "Cloud Service Models", ta: "மேக சேவை மாதிரிகள்", hi: "क्लाउड सेवा मॉडल" },
          ]},
          { id: "cse-proj", en: "Project Work", ta: "திட்ட பணி", hi: "प्रोजेक्ट कार्य", emoji: "📋", color: "from-dream/20 to-secondary/20", topics: [
            { id: "pw1", en: "Research & Implementation", ta: "ஆராய்ச்சி & செயலாக்கம்", hi: "अनुसंधान और कार्यान्वयन" },
          ]},
        ]},
      ],
    },
    {
      id: "ece", en: "Electronics & Comm (ECE)", ta: "மின்னணுவியல் & தொடர்பு", hi: "इलेक्ट्रॉनिक्स एवं संचार", emoji: "📡",
      years: [
        { ...yr(1), subjects: commonEngY1 },
        { ...yr(2), subjects: [
          { id: "ece-signals", en: "Signals & Systems", ta: "சமிக்ஞைகள் & அமைப்புகள்", hi: "सिग्नल और सिस्टम", emoji: "📈", color: "from-secondary/20 to-primary/20", topics: [
            { id: "ss1", en: "Fourier & Laplace Transform", ta: "ஃபூரியர் & லாப்லாஸ் உருமாற்றம்", hi: "फूरियर और लाप्लास रूपांतरण" },
            { id: "ss2", en: "Z-Transform", ta: "Z-உருமாற்றம்", hi: "Z-रूपांतरण" },
          ]},
          { id: "ece-analog", en: "Analog Electronics", ta: "அனலாக் மின்னணுவியல்", hi: "एनालॉग इलेक्ट्रॉनिक्स", emoji: "🔌", color: "from-dream/20 to-accent/20", topics: [
            { id: "ae1", en: "Diodes & Transistors", ta: "டையோடுகள் & திரான்சிஸ்டர்கள்", hi: "डायोड और ट्रांजिस्टर" },
            { id: "ae2", en: "Amplifiers & Oscillators", ta: "மிகைப்பிகள் & அலையியற்றிகள்", hi: "एम्पलीफायर और ऑसिलेटर" },
          ]},
          { id: "ece-digital", en: "Digital Electronics", ta: "டிஜிட்டல் மின்னணுவியல்", hi: "डिजिटल इलेक्ट्रॉनिक्स", emoji: "🔢", color: "from-primary/20 to-secondary/20", topics: [
            { id: "de1", en: "Logic Gates & Boolean Algebra", ta: "லாஜிக் கேட்கள்", hi: "लॉजिक गेट और बूलियन बीजगणित" },
            { id: "de2", en: "Flip-Flops & Counters", ta: "ஃபிளிப்-ஃபிளாப்கள்", hi: "फ्लिप-फ्लॉप और काउंटर" },
          ]},
          { id: "ece-emft", en: "Electromagnetic Theory", ta: "மின்காந்த கோட்பாடு", hi: "विद्युतचुंबकीय सिद्धांत", emoji: "⚡", color: "from-accent/20 to-dream/20", topics: [
            { id: "em1", en: "Maxwell's Equations", ta: "மாக்ஸ்வெல் சமன்பாடுகள்", hi: "मैक्सवेल समीकरण" },
            { id: "em2", en: "Transmission Lines", ta: "பரிமாற்ற கோடுகள்", hi: "ट्रांसमिशन लाइन" },
          ]},
        ]},
        { ...yr(3), subjects: [
          { id: "ece-comm", en: "Communication Systems", ta: "தொடர்பு அமைப்புகள்", hi: "संचार प्रणाली", emoji: "📻", color: "from-accent/20 to-primary/20", topics: [
            { id: "cs1", en: "Analog & Digital Communication", ta: "அனலாக் & டிஜிட்டல் தொடர்பு", hi: "एनालॉग और डिजिटल संचार" },
            { id: "cs2", en: "Modulation Techniques", ta: "மாடுலேஷன் நுட்பங்கள்", hi: "मॉड्यूलेशन तकनीक" },
          ]},
          { id: "ece-vlsi", en: "VLSI Design", ta: "VLSI வடிவமைப்பு", hi: "VLSI डिज़ाइन", emoji: "🔲", color: "from-primary/20 to-dream/20", topics: [
            { id: "vl1", en: "CMOS Technology", ta: "CMOS தொழில்நுட்பம்", hi: "CMOS प्रौद्योगिकी" },
            { id: "vl2", en: "FPGA & ASIC", ta: "FPGA & ASIC", hi: "FPGA और ASIC" },
          ]},
          { id: "ece-mp", en: "Microprocessors & Controllers", ta: "நுண்செயலிகள்", hi: "माइक्रोप्रोसेसर और कंट्रोलर", emoji: "🔧", color: "from-secondary/20 to-accent/20", topics: [
            { id: "mp1", en: "8085/8086 Architecture", ta: "8085/8086 கட்டமைப்பு", hi: "8085/8086 आर्किटेक्चर" },
            { id: "mp2", en: "ARM Processors", ta: "ARM செயலிகள்", hi: "ARM प्रोसेसर" },
          ]},
        ]},
        { ...yr(4), subjects: [
          { id: "ece-dsp", en: "Digital Signal Processing", ta: "டிஜிட்டல் சமிக்ஞை செயலாக்கம்", hi: "डिजिटल सिग्नल प्रोसेसिंग", emoji: "📊", color: "from-dream/20 to-secondary/20", topics: [
            { id: "dsp1", en: "DFT & FFT", ta: "DFT & FFT", hi: "DFT और FFT" },
            { id: "dsp2", en: "Digital Filters", ta: "டிஜிட்டல் வடிகட்டிகள்", hi: "डिजिटल फिल्टर" },
          ]},
          { id: "ece-wc", en: "Wireless Communication", ta: "கம்பியில்லா தொடர்பு", hi: "वायरलेस संचार", emoji: "📶", color: "from-accent/20 to-primary/20", topics: [
            { id: "wc1", en: "Cellular Networks", ta: "செல்லுலார் வலையமைப்புகள்", hi: "सेलुलर नेटवर्क" },
            { id: "wc2", en: "5G & IoT", ta: "5G & IoT", hi: "5G और IoT" },
          ]},
        ]},
      ],
    },
    {
      id: "mech", en: "Mechanical Engineering", ta: "இயந்திரவியல்", hi: "मैकेनिकल इंजीनियरिंग", emoji: "🔧",
      years: [
        { ...yr(1), subjects: commonEngY1 },
        { ...yr(2), subjects: [
          { id: "me-thermo", en: "Thermodynamics", ta: "வெப்பவியக்கவியல்", hi: "ऊष्मागतिकी", emoji: "🌡️", color: "from-dream/20 to-accent/20", topics: [
            { id: "th1", en: "Laws of Thermodynamics", ta: "வெப்பவியக்க விதிகள்", hi: "ऊष्मागतिकी के नियम" },
            { id: "th2", en: "Heat Engines & Refrigeration", ta: "வெப்ப இயந்திரங்கள்", hi: "ताप इंजन और प्रशीतन" },
          ]},
          { id: "me-som", en: "Strength of Materials", ta: "பொருள் வலிமை", hi: "सामग्री की मजबूती", emoji: "🏗️", color: "from-secondary/20 to-primary/20", topics: [
            { id: "sm1", en: "Stress, Strain & Bending", ta: "அழுத்தம், திரிபு & வளைவு", hi: "प्रतिबल, विकृति और बंकन" },
            { id: "sm2", en: "Torsion & Columns", ta: "முறுக்கு & தூண்கள்", hi: "मरोड़ और स्तंभ" },
          ]},
          { id: "me-fm", en: "Fluid Mechanics", ta: "பாய்ம இயக்கவியல்", hi: "तरल यांत्रिकी", emoji: "💧", color: "from-primary/20 to-dream/20", topics: [
            { id: "fm1", en: "Fluid Statics & Dynamics", ta: "பாய்ம நிலையியல் & இயக்கவியல்", hi: "तरल स्थैतिकी और गतिकी" },
            { id: "fm2", en: "Dimensional Analysis", ta: "பரிமாண பகுப்பாய்வு", hi: "विमीय विश्लेषण" },
          ]},
          { id: "me-km", en: "Kinematics of Machinery", ta: "இயந்திர இயக்கவியல்", hi: "मशीन गतिविज्ञान", emoji: "⚙️", color: "from-accent/20 to-secondary/20", topics: [
            { id: "km1", en: "Mechanisms & Linkages", ta: "இயக்கமுறை & இணைப்புகள்", hi: "तंत्र और लिंकेज" },
            { id: "km2", en: "Gears & Gear Trains", ta: "கியர்கள்", hi: "गियर और गियर ट्रेन" },
          ]},
        ]},
        { ...yr(3), subjects: [
          { id: "me-ht", en: "Heat Transfer", ta: "வெப்ப பரிமாற்றம்", hi: "ताप स्थानांतरण", emoji: "🔥", color: "from-dream/20 to-primary/20", topics: [
            { id: "ht1", en: "Conduction & Convection", ta: "கடத்தல் & வெப்பச்சலனம்", hi: "चालन और संवहन" },
            { id: "ht2", en: "Radiation & Heat Exchangers", ta: "கதிர்வீச்சு & வெப்ப பரிமாற்றிகள்", hi: "विकिरण और ताप विनिमायक" },
          ]},
          { id: "me-md", en: "Machine Design", ta: "இயந்திர வடிவமைப்பு", hi: "मशीन डिज़ाइन", emoji: "📐", color: "from-secondary/20 to-accent/20", topics: [
            { id: "md1", en: "Design of Shafts & Gears", ta: "தண்டு & கியர் வடிவமைப்பு", hi: "शाफ्ट और गियर डिज़ाइन" },
            { id: "md2", en: "Bearings & Springs", ta: "தாங்கு உருளைகள் & நீட்சிகள்", hi: "बेयरिंग और स्प्रिंग" },
          ]},
          { id: "me-mp", en: "Manufacturing Processes", ta: "உற்பத்தி செயல்முறைகள்", hi: "विनिर्माण प्रक्रियाएं", emoji: "🏭", color: "from-primary/20 to-secondary/20", topics: [
            { id: "mp1", en: "Casting & Welding", ta: "வார்ப்பு & பற்றவைப்பு", hi: "कास्टिंग और वेल्डिंग" },
            { id: "mp2", en: "Machining & CNC", ta: "இயந்திரம் & CNC", hi: "मशीनिंग और CNC" },
          ]},
        ]},
        { ...yr(4), subjects: [
          { id: "me-ic", en: "IC Engines", ta: "IC இயந்திரங்கள்", hi: "IC इंजन", emoji: "🚗", color: "from-accent/20 to-dream/20", topics: [
            { id: "ic1", en: "SI & CI Engines", ta: "SI & CI இயந்திரங்கள்", hi: "SI और CI इंजन" },
            { id: "ic2", en: "Emissions & Control", ta: "உமிழ்வுகள் & கட்டுப்பாடு", hi: "उत्सर्जन और नियंत्रण" },
          ]},
          { id: "me-cad", en: "CAD/CAM", ta: "CAD/CAM", hi: "CAD/CAM", emoji: "🖥️", color: "from-primary/20 to-accent/20", topics: [
            { id: "cad1", en: "Geometric Modeling", ta: "வடிவியல் மாதிரியமைத்தல்", hi: "ज्यामितीय मॉडलिंग" },
            { id: "cad2", en: "CNC Programming", ta: "CNC நிரலாக்கம்", hi: "CNC प्रोग्रामिंग" },
          ]},
        ]},
      ],
    },
    {
      id: "civil", en: "Civil Engineering", ta: "குடிசார் பொறியியல்", hi: "सिविल इंजीनियरिंग", emoji: "🏗️",
      years: [
        { ...yr(1), subjects: commonEngY1 },
        { ...yr(2), subjects: [
          { id: "ce-surv", en: "Surveying", ta: "அளவீட்டியல்", hi: "सर्वेक्षण", emoji: "🗺️", color: "from-primary/20 to-accent/20", topics: [
            { id: "sv1", en: "Chain & Compass Surveying", ta: "சங்கிலி & திசைகாட்டி அளவீடு", hi: "चेन और कम्पास सर्वेक्षण" },
            { id: "sv2", en: "Total Station & GPS", ta: "மொத்த நிலையம் & GPS", hi: "टोटल स्टेशन और GPS" },
          ]},
          { id: "ce-bm", en: "Building Materials & Construction", ta: "கட்டுமான பொருட்கள்", hi: "भवन सामग्री और निर्माण", emoji: "🧱", color: "from-secondary/20 to-dream/20", topics: [
            { id: "bm1", en: "Cement, Concrete & Steel", ta: "சிமெண்ட், கான்கிரீட் & எஃகு", hi: "सीमेंट, कंक्रीट और स्टील" },
          ]},
          { id: "ce-sa", en: "Structural Analysis", ta: "கட்டமைப்பு பகுப்பாய்வு", hi: "संरचनात्मक विश्लेषण", emoji: "📐", color: "from-dream/20 to-primary/20", topics: [
            { id: "sa1", en: "Beams, Frames & Trusses", ta: "விட்டங்கள் & கட்டமைப்புகள்", hi: "बीम, फ्रेम और ट्रस" },
          ]},
        ]},
        { ...yr(3), subjects: [
          { id: "ce-geo", en: "Geotechnical Engineering", ta: "புவித்தொழில்நுட்ப பொறியியல்", hi: "भू-तकनीकी इंजीनियरिंग", emoji: "⛰️", color: "from-accent/20 to-secondary/20", topics: [
            { id: "ge1", en: "Soil Mechanics", ta: "மண் இயக்கவியல்", hi: "मृदा यांत्रिकी" },
            { id: "ge2", en: "Foundation Engineering", ta: "அடித்தள பொறியியல்", hi: "नींव इंजीनियरिंग" },
          ]},
          { id: "ce-env", en: "Environmental Engineering", ta: "சுற்றுச்சூழல் பொறியியல்", hi: "पर्यावरण इंजीनियरिंग", emoji: "🌿", color: "from-primary/20 to-dream/20", topics: [
            { id: "ee1", en: "Water Supply & Treatment", ta: "நீர் விநியோகம் & சுத்திகரிப்பு", hi: "जल आपूर्ति और उपचार" },
            { id: "ee2", en: "Sewage Treatment", ta: "கழிவு நீர் சுத்திகரிப்பு", hi: "सीवेज उपचार" },
          ]},
          { id: "ce-te", en: "Transportation Engineering", ta: "போக்குவரத்து பொறியியல்", hi: "परिवहन इंजीनियरिंग", emoji: "🛣️", color: "from-secondary/20 to-accent/20", topics: [
            { id: "te1", en: "Highway Engineering", ta: "நெடுஞ்சாலை பொறியியல்", hi: "राजमार्ग इंजीनियरिंग" },
          ]},
        ]},
      ],
    },
    {
      id: "eee", en: "Electrical & Electronics (EEE)", ta: "மின் & மின்னணுவியல்", hi: "विद्युत एवं इलेक्ट्रॉनिक्स", emoji: "⚡",
      years: [
        { ...yr(1), subjects: commonEngY1 },
        { ...yr(2), subjects: [
          { id: "eee-em", en: "Electrical Machines", ta: "மின் இயந்திரங்கள்", hi: "विद्युत मशीनें", emoji: "🔌", color: "from-primary/20 to-accent/20", topics: [
            { id: "em1", en: "DC Machines", ta: "DC இயந்திரங்கள்", hi: "DC मशीनें" },
            { id: "em2", en: "Transformers", ta: "மாற்றிகள்", hi: "ट्रांसफार्मर" },
            { id: "em3", en: "Induction Motors", ta: "தூண்டல் மோட்டார்கள்", hi: "इंडक्शन मोटर" },
          ]},
          { id: "eee-ps", en: "Power Systems", ta: "மின் அமைப்புகள்", hi: "शक्ति प्रणाली", emoji: "🔋", color: "from-secondary/20 to-dream/20", topics: [
            { id: "ps1", en: "Power Generation", ta: "மின் உற்பத்தி", hi: "विद्युत उत्पादन" },
            { id: "ps2", en: "Transmission & Distribution", ta: "பரிமாற்றம் & விநியோகம்", hi: "संचरण और वितरण" },
          ]},
          { id: "eee-cs", en: "Control Systems", ta: "கட்டுப்பாட்டு அமைப்புகள்", hi: "नियंत्रण प्रणाली", emoji: "🎛️", color: "from-accent/20 to-primary/20", topics: [
            { id: "cs1", en: "Transfer Functions", ta: "பரிமாற்ற சார்புகள்", hi: "स्थानांतरण फलन" },
            { id: "cs2", en: "Stability Analysis", ta: "நிலைத்தன்மை பகுப்பாய்வு", hi: "स्थिरता विश्लेषण" },
          ]},
        ]},
        { ...yr(3), subjects: [
          { id: "eee-pe", en: "Power Electronics", ta: "மின் மின்னணுவியல்", hi: "पावर इलेक्ट्रॉनिक्स", emoji: "⚡", color: "from-dream/20 to-secondary/20", topics: [
            { id: "pe1", en: "Rectifiers & Inverters", ta: "திருத்திகள் & மாற்றிகள்", hi: "रेक्टिफायर और इन्वर्टर" },
            { id: "pe2", en: "Choppers & Converters", ta: "சாப்பர்கள் & மாற்றிகள்", hi: "चॉपर और कन्वर्टर" },
          ]},
          { id: "eee-re", en: "Renewable Energy", ta: "புதுப்பிக்கத்தக்க ஆற்றல்", hi: "नवीकरणीय ऊर्जा", emoji: "☀️", color: "from-primary/20 to-accent/20", topics: [
            { id: "re1", en: "Solar & Wind Energy", ta: "சூரிய & காற்று ஆற்றல்", hi: "सौर और पवन ऊर्जा" },
          ]},
        ]},
      ],
    },
  ],
};

// ═══════════════════════════════════════════
// PHARMACY (4 years)
// ═══════════════════════════════════════════
const pharmacyCourse: HECourse = {
  id: "pharmacy", en: "Pharmacy", ta: "மருந்தகவியல்", hi: "फार्मेसी", emoji: "💊",
  departments: [{
    id: "bpharm", en: "B.Pharm", ta: "B.Pharm", hi: "B.Pharm", emoji: "💊",
    years: [
      { ...yr(1), subjects: [
        { id: "ph-pchem1", en: "Pharmaceutical Chemistry I", ta: "மருந்து வேதியியல் I", hi: "औषधीय रसायन I", emoji: "🧪", color: "from-primary/20 to-accent/20", topics: [
          { id: "pc1", en: "Inorganic Medicinal Compounds", ta: "கனிம மருந்து சேர்மங்கள்", hi: "अकार्बनिक औषधीय यौगिक" },
          { id: "pc2", en: "Organic Chemistry Basics", ta: "கரிம வேதியியல் அடிப்படை", hi: "कार्बनिक रसायन मूल" },
        ]},
        { id: "ph-anat", en: "Human Anatomy & Physiology I", ta: "மனித உடற்கூறியல் & உடலியல் I", hi: "मानव शरीर रचना और क्रिया I", emoji: "🦴", color: "from-secondary/20 to-primary/20", topics: [
          { id: "ha1", en: "Skeletal & Muscular System", ta: "எலும்பு & தசை அமைப்பு", hi: "कंकाल और पेशीय तंत्र" },
          { id: "ha2", en: "Cardiovascular System", ta: "இருதய அமைப்பு", hi: "हृदय प्रणाली" },
          { id: "ha3", en: "Nervous System", ta: "நரம்பு அமைப்பு", hi: "तंत्रिका तंत्र" },
        ]},
        { id: "ph-pharma1", en: "Pharmaceutics I", ta: "மருந்தியல் I", hi: "फार्मास्यूटिक्स I", emoji: "💊", color: "from-dream/20 to-secondary/20", topics: [
          { id: "ph1", en: "Dosage Forms", ta: "மருந்தளவு வடிவங்கள்", hi: "खुराक के रूप" },
          { id: "ph2", en: "Pharmaceutical Calculations", ta: "மருந்து கணிதம்", hi: "फार्मास्यूटिकल गणना" },
        ]},
        { id: "ph-biochem", en: "Biochemistry", ta: "உயிர் வேதியியல்", hi: "जैव रसायन", emoji: "🧬", color: "from-accent/20 to-dream/20", topics: [
          { id: "bc1", en: "Enzymes & Metabolism", ta: "நொதிகள் & வளர்சிதை மாற்றம்", hi: "एंजाइम और चयापचय" },
          { id: "bc2", en: "Nucleic Acids", ta: "கரு அமிலங்கள்", hi: "न्यूक्लिक अम्ल" },
        ]},
      ]},
      { ...yr(2), subjects: [
        { id: "ph-pcol", en: "Pharmacology I & II", ta: "மருந்தியல் I & II", hi: "औषध विज्ञान I और II", emoji: "💉", color: "from-primary/20 to-dream/20", topics: [
          { id: "pcol1", en: "Autonomic Pharmacology", ta: "தன்னிலை மருந்தியல்", hi: "स्वायत्त औषध विज्ञान" },
          { id: "pcol2", en: "CNS Pharmacology", ta: "நரம்பு மருந்தியல்", hi: "सी.एन.एस. औषध विज्ञान" },
          { id: "pcol3", en: "CVS Pharmacology", ta: "இருதய மருந்தியல்", hi: "हृदय औषध विज्ञान" },
          { id: "pcol4", en: "Chemotherapy", ta: "வேதிசிகிச்சை", hi: "कीमोथेरेपी" },
        ]},
        { id: "ph-pcog", en: "Pharmacognosy", ta: "மருந்துப்பொருளியல்", hi: "फार्माकोग्नॉसी", emoji: "🌿", color: "from-secondary/20 to-accent/20", topics: [
          { id: "pcog1", en: "Plant-Based Drugs", ta: "தாவர மருந்துகள்", hi: "पादप आधारित दवाएं" },
          { id: "pcog2", en: "Phytochemistry", ta: "தாவர வேதியியல்", hi: "फाइटोकेमिस्ट्री" },
        ]},
        { id: "ph-micro", en: "Pharmaceutical Microbiology", ta: "மருந்து நுண்ணுயிரியல்", hi: "फार्मास्यूटिकल सूक्ष्म जीव विज्ञान", emoji: "🦠", color: "from-dream/20 to-primary/20", topics: [
          { id: "pm1", en: "Sterilization Methods", ta: "கிருமிநீக்கம் முறைகள்", hi: "बंध्याकरण विधियां" },
          { id: "pm2", en: "Microbial Assays", ta: "நுண்ணுயிர் மதிப்பீடுகள்", hi: "सूक्ष्मजीवी परख" },
        ]},
        { id: "ph-pachem2", en: "Pharmaceutical Analysis", ta: "மருந்து பகுப்பாய்வு", hi: "फार्मास्यूटिकल विश्लेषण", emoji: "🔬", color: "from-accent/20 to-secondary/20", topics: [
          { id: "pa1", en: "Spectroscopy", ta: "நிறமாலையியல்", hi: "स्पेक्ट्रोस्कोपी" },
          { id: "pa2", en: "Chromatography", ta: "நிறப்பிரிகையியல்", hi: "क्रोमैटोग्राफी" },
        ]},
      ]},
      { ...yr(3), subjects: [
        { id: "ph-medchem", en: "Medicinal Chemistry", ta: "மருத்துவ வேதியியல்", hi: "औषधीय रसायन", emoji: "⚗️", color: "from-primary/20 to-accent/20", topics: [
          { id: "mc1", en: "Drug Design & SAR", ta: "மருந்து வடிவமைப்பு & SAR", hi: "दवा डिज़ाइन और SAR" },
          { id: "mc2", en: "Antibiotics", ta: "நுண்ணுயிர் எதிர்ப்பிகள்", hi: "एंटीबायोटिक्स" },
        ]},
        { id: "ph-indpharm", en: "Industrial Pharmacy", ta: "தொழிற்சாலை மருந்தியல்", hi: "औद्योगिक फार्मेसी", emoji: "🏭", color: "from-secondary/20 to-dream/20", topics: [
          { id: "ip1", en: "Tablet Manufacturing", ta: "மாத்திரை உற்பத்தி", hi: "गोली निर्माण" },
          { id: "ip2", en: "Quality Control", ta: "தரக்கட்டுப்பாடு", hi: "गुणवत्ता नियंत्रण" },
        ]},
        { id: "ph-biophrm", en: "Biopharmaceutics & Pharmacokinetics", ta: "உயிர் மருந்தியல் & மருந்து இயக்கவியல்", hi: "बायोफार्मास्यूटिक्स और फार्माकोकाइनेटिक्स", emoji: "📈", color: "from-dream/20 to-primary/20", topics: [
          { id: "bp1", en: "Drug Absorption & Distribution", ta: "மருந்து உறிஞ்சுதல் & விநியோகம்", hi: "दवा अवशोषण और वितरण" },
          { id: "bp2", en: "Bioavailability", ta: "உயிர்கிடைப்புத்தன்மை", hi: "जैवउपलब्धता" },
        ]},
      ]},
      { ...yr(4), subjects: [
        { id: "ph-clin", en: "Clinical Pharmacy", ta: "மருத்துவ மருந்தகவியல்", hi: "नैदानिक फार्मेसी", emoji: "🏥", color: "from-accent/20 to-primary/20", topics: [
          { id: "cp1", en: "Drug Interactions", ta: "மருந்து தொடர்புகள்", hi: "दवा अंतःक्रिया" },
          { id: "cp2", en: "Adverse Drug Reactions", ta: "பக்கவிளைவுகள்", hi: "प्रतिकूल दवा प्रभाव" },
        ]},
        { id: "ph-prac", en: "Pharmacy Practice", ta: "மருந்தக நடைமுறை", hi: "फार्मेसी प्रैक्टिस", emoji: "📋", color: "from-primary/20 to-secondary/20", topics: [
          { id: "pp1", en: "Drug Regulatory Affairs", ta: "மருந்து ஒழுங்குமுறை", hi: "दवा विनियामक मामले" },
          { id: "pp2", en: "Hospital Pharmacy", ta: "மருத்துவமனை மருந்தகம்", hi: "अस्पताल फार्मेसी" },
        ]},
      ]},
    ],
  }],
};

// ═══════════════════════════════════════════
// NURSING (4 years)
// ═══════════════════════════════════════════
const nursingCourse: HECourse = {
  id: "nursing", en: "Nursing", ta: "செவிலியம்", hi: "नर्सिंग", emoji: "👩‍⚕️",
  departments: [{
    id: "bsc-nursing", en: "B.Sc Nursing", ta: "B.Sc செவிலியம்", hi: "B.Sc नर्सिंग", emoji: "👩‍⚕️",
    years: [
      { ...yr(1), subjects: [
        { id: "nr-anat", en: "Anatomy & Physiology", ta: "உடற்கூறியல் & உடலியல்", hi: "शरीर रचना एवं क्रिया विज्ञान", emoji: "🦴", color: "from-primary/20 to-accent/20", topics: [
          { id: "na1", en: "Cell & Tissue Biology", ta: "உயிரணு & திசு உயிரியல்", hi: "कोशिका और ऊतक जीव विज्ञान" },
          { id: "na2", en: "Body Systems", ta: "உடல் அமைப்புகள்", hi: "शारीरिक तंत्र" },
        ]},
        { id: "nr-fund", en: "Fundamentals of Nursing", ta: "செவிலிய அடிப்படைகள்", hi: "नर्सिंग के मूल सिद्धांत", emoji: "💉", color: "from-secondary/20 to-primary/20", topics: [
          { id: "nf1", en: "Patient Care & Hygiene", ta: "நோயாளி பராமரிப்பு", hi: "रोगी देखभाल और स्वच्छता" },
          { id: "nf2", en: "Vital Signs & Assessment", ta: "முக்கிய அறிகுறிகள்", hi: "जीवन संकेत और आकलन" },
          { id: "nf3", en: "Nursing Procedures", ta: "செவிலிய நடைமுறைகள்", hi: "नर्सिंग प्रक्रियाएं" },
        ]},
        { id: "nr-nutr", en: "Nutrition & Dietetics", ta: "ஊட்டச்சத்து & உணவியல்", hi: "पोषण और आहार विज्ञान", emoji: "🥗", color: "from-dream/20 to-secondary/20", topics: [
          { id: "nn1", en: "Macro & Micronutrients", ta: "மேக்ரோ & நுண் ஊட்டச்சத்துக்கள்", hi: "मैक्रो और सूक्ष्म पोषक" },
          { id: "nn2", en: "Diet Therapy", ta: "உணவு சிகிச்சை", hi: "आहार चिकित्सा" },
        ]},
        { id: "nr-biochem", en: "Biochemistry", ta: "உயிர் வேதியியல்", hi: "जैव रसायन", emoji: "🧪", color: "from-accent/20 to-dream/20", topics: [
          { id: "nb1", en: "Clinical Biochemistry", ta: "மருத்துவ உயிர் வேதியியல்", hi: "नैदानिक जैव रसायन" },
        ]},
        { id: "nr-psych", en: "Psychology", ta: "உளவியல்", hi: "मनोविज्ञान", emoji: "🧠", color: "from-primary/20 to-dream/20", topics: [
          { id: "nps1", en: "Developmental Psychology", ta: "வளர்ச்சி உளவியல்", hi: "विकासात्मक मनोविज्ञान" },
        ]},
        { id: "nr-micro", en: "Microbiology", ta: "நுண்ணுயிரியல்", hi: "सूक्ष्म जीव विज्ञान", emoji: "🦠", color: "from-secondary/20 to-accent/20", topics: [
          { id: "nm1", en: "Infection Control", ta: "தொற்று கட்டுப்பாடு", hi: "संक्रमण नियंत्रण" },
        ]},
      ]},
      { ...yr(2), subjects: [
        { id: "nr-medsurg", en: "Medical-Surgical Nursing", ta: "மருத்துவ-அறுவை செவிலியம்", hi: "चिकित्सा-शल्य नर्सिंग", emoji: "🏥", color: "from-accent/20 to-dream/20", topics: [
          { id: "ms1", en: "Cardiovascular Nursing", ta: "இருதய செவிலியம்", hi: "हृदय नर्सिंग" },
          { id: "ms2", en: "Respiratory Nursing", ta: "சுவாச செவிலியம்", hi: "श्वसन नर्सिंग" },
          { id: "ms3", en: "GIT Nursing", ta: "இரைப்பை குடல் செவிலியம்", hi: "पाचन नर्सिंग" },
          { id: "ms4", en: "Renal Nursing", ta: "சிறுநீரக செவிலியம்", hi: "गुर्दा नर्सिंग" },
          { id: "ms5", en: "Neurological Nursing", ta: "நரம்பியல் செவிலியம்", hi: "तंत्रिका नर्सिंग" },
        ]},
        { id: "nr-comm", en: "Community Health Nursing I", ta: "சமூக சுகாதார செவிலியம் I", hi: "सामुदायिक स्वास्थ्य नर्सिंग I", emoji: "🌍", color: "from-primary/20 to-dream/20", topics: [
          { id: "ch1", en: "Epidemiology", ta: "தொற்றுநோயியல்", hi: "महामारी विज्ञान" },
          { id: "ch2", en: "Family Health", ta: "குடும்ப சுகாதாரம்", hi: "परिवार स्वास्थ्य" },
        ]},
        { id: "nr-pharma", en: "Pharmacology", ta: "மருந்தியல்", hi: "औषध विज्ञान", emoji: "💊", color: "from-secondary/20 to-primary/20", topics: [
          { id: "nph1", en: "Drug Administration", ta: "மருந்து நிர்வாகம்", hi: "दवा प्रशासन" },
          { id: "nph2", en: "Drug Calculations", ta: "மருந்து கணக்கீடு", hi: "दवा गणना" },
        ]},
        { id: "nr-patho", en: "Pathology & Genetics", ta: "நோயியல் & மரபியல்", hi: "रोग विज्ञान और आनुवंशिकी", emoji: "🔬", color: "from-dream/20 to-accent/20", topics: [
          { id: "npa1", en: "General Pathology", ta: "பொது நோயியல்", hi: "सामान्य रोग विज्ञान" },
        ]},
      ]},
      { ...yr(3), subjects: [
        { id: "nr-child", en: "Child Health Nursing", ta: "குழந்தை நல செவிலியம்", hi: "बाल स्वास्थ्य नर्सिंग", emoji: "👶", color: "from-primary/20 to-accent/20", topics: [
          { id: "chn1", en: "Neonatal Care", ta: "புதிதாகப் பிறந்தோர் பராமரிப்பு", hi: "नवजात देखभाल" },
          { id: "chn2", en: "Pediatric Conditions", ta: "குழந்தை நிலைகள்", hi: "बाल रोग स्थितियां" },
        ]},
        { id: "nr-obg", en: "Obstetric & Midwifery Nursing", ta: "மகப்பேறு செவிலியம்", hi: "प्रसूति और दाई नर्सिंग", emoji: "🤰", color: "from-secondary/20 to-dream/20", topics: [
          { id: "ob1", en: "Antenatal & Postnatal Care", ta: "பிரசவ முன் & பின் பராமரிப்பு", hi: "प्रसव पूर्व और प्रसवोत्तर देखभाल" },
          { id: "ob2", en: "Labour Management", ta: "பிரசவ மேலாண்மை", hi: "प्रसव प्रबंधन" },
        ]},
        { id: "nr-mhn", en: "Mental Health Nursing", ta: "மனநல செவிலியம்", hi: "मानसिक स्वास्थ्य नर्सिंग", emoji: "🧠", color: "from-dream/20 to-secondary/20", topics: [
          { id: "mh1", en: "Psychiatric Disorders", ta: "உளவியல் கோளாறுகள்", hi: "मनोरोग विकार" },
          { id: "mh2", en: "Therapeutic Communication", ta: "சிகிச்சை தொடர்பு", hi: "चिकित्सीय संचार" },
        ]},
      ]},
      { ...yr(4), subjects: [
        { id: "nr-comm2", en: "Community Health Nursing II", ta: "சமூக சுகாதார செவிலியம் II", hi: "सामुदायिक स्वास्थ्य नर्सिंग II", emoji: "🌍", color: "from-accent/20 to-primary/20", topics: [
          { id: "ch3", en: "National Health Programs", ta: "தேசிய சுகாதார திட்டங்கள்", hi: "राष्ट्रीय स्वास्थ्य कार्यक्रम" },
          { id: "ch4", en: "School & Occupational Health", ta: "பள்ளி & தொழில் சுகாதாரம்", hi: "विद्यालय और व्यावसायिक स्वास्थ्य" },
        ]},
        { id: "nr-mgmt", en: "Nursing Management & Education", ta: "செவிலிய மேலாண்மை & கல்வி", hi: "नर्सिंग प्रबंधन और शिक्षा", emoji: "📋", color: "from-primary/20 to-secondary/20", topics: [
          { id: "nm1", en: "Ward Management", ta: "வார்டு மேலாண்மை", hi: "वार्ड प्रबंधन" },
          { id: "nm2", en: "Nursing Education", ta: "செவிலியக் கல்வி", hi: "नर्सिंग शिक्षा" },
        ]},
        { id: "nr-res", en: "Nursing Research & Statistics", ta: "செவிலிய ஆராய்ச்சி", hi: "नर्सिंग अनुसंधान और सांख्यिकी", emoji: "📊", color: "from-dream/20 to-accent/20", topics: [
          { id: "nr1", en: "Research Methodology", ta: "ஆராய்ச்சி முறையியல்", hi: "अनुसंधान पद्धति" },
          { id: "nr2", en: "Biostatistics", ta: "உயிர்புள்ளியியல்", hi: "जैव सांख्यिकी" },
        ]},
      ]},
    ],
  }],
};

// ═══════════════════════════════════════════
// PHYSIOTHERAPY (4 years)
// ═══════════════════════════════════════════
const physiotherapyCourse: HECourse = {
  id: "physiotherapy", en: "Physiotherapy", ta: "இயன்முறை மருத்துவம்", hi: "फिजियोथेरेपी", emoji: "🏃",
  departments: [{
    id: "bpt", en: "BPT", ta: "BPT", hi: "BPT", emoji: "🏃",
    years: [
      { ...yr(1), subjects: [
        { id: "pt-anat", en: "Anatomy", ta: "உடற்கூறியல்", hi: "शरीर रचना", emoji: "🦴", color: "from-primary/20 to-accent/20", topics: [
          { id: "pa1", en: "Musculoskeletal Anatomy", ta: "தசை எலும்பு உடற்கூறியல்", hi: "मस्कुलोस्केलेटल एनाटॉमी" },
          { id: "pa2", en: "Neuroanatomy", ta: "நரம்பு உடற்கூறியல்", hi: "न्यूरोएनाटॉमी" },
          { id: "pa3", en: "Surface Anatomy", ta: "மேற்பரப்பு உடற்கூறியல்", hi: "सतही शरीर रचना" },
        ]},
        { id: "pt-physio", en: "Physiology", ta: "உடலியல்", hi: "शरीर क्रिया विज्ञान", emoji: "❤️", color: "from-secondary/20 to-primary/20", topics: [
          { id: "pp1", en: "Exercise Physiology", ta: "உடற்பயிற்சி உடலியல்", hi: "व्यायाम शरीर क्रिया" },
          { id: "pp2", en: "Cardiopulmonary Physiology", ta: "இருதய நுரையீரல் உடலியல்", hi: "हृदय फुफ्फुसीय शरीर क्रिया" },
        ]},
        { id: "pt-biochem", en: "Biochemistry", ta: "உயிர் வேதியியல்", hi: "जैव रसायन", emoji: "🧪", color: "from-dream/20 to-secondary/20", topics: [
          { id: "pb1", en: "Clinical Biochemistry", ta: "மருத்துவ உயிர் வேதியியல்", hi: "नैदानिक जैव रसायन" },
        ]},
        { id: "pt-bio", en: "Biomechanics & Kinesiology", ta: "உயிர் இயக்கவியல்", hi: "जैव यांत्रिकी और काइनेसियोलॉजी", emoji: "🏋️", color: "from-accent/20 to-dream/20", topics: [
          { id: "bk1", en: "Gait Analysis", ta: "நடை பகுப்பாய்வு", hi: "चाल विश्लेषण" },
          { id: "bk2", en: "Joint Biomechanics", ta: "மூட்டு உயிர் இயக்கவியல்", hi: "संधि जैव यांत्रिकी" },
        ]},
        { id: "pt-psych", en: "Psychology & Sociology", ta: "உளவியல் & சமூகவியல்", hi: "मनोविज्ञान और समाजशास्त्र", emoji: "🧠", color: "from-primary/20 to-dream/20", topics: [
          { id: "ps1", en: "Health Psychology", ta: "சுகாதார உளவியல்", hi: "स्वास्थ्य मनोविज्ञान" },
        ]},
      ]},
      { ...yr(2), subjects: [
        { id: "pt-exercise", en: "Exercise Therapy", ta: "உடற்பயிற்சி சிகிச்சை", hi: "व्यायाम चिकित्सा", emoji: "🏋️", color: "from-dream/20 to-secondary/20", topics: [
          { id: "et1", en: "Therapeutic Exercises", ta: "சிகிச்சை உடற்பயிற்சிகள்", hi: "चिकित्सीय व्यायाम" },
          { id: "et2", en: "Stretching & Strengthening", ta: "நீட்டிப்பு & வலுப்படுத்தல்", hi: "स्ट्रेचिंग और स्ट्रेंथनिंग" },
          { id: "et3", en: "PNF Techniques", ta: "PNF நுட்பங்கள்", hi: "PNF तकनीक" },
        ]},
        { id: "pt-electro", en: "Electrotherapy", ta: "மின் சிகிச்சை", hi: "इलेक्ट्रोथेरेपी", emoji: "⚡", color: "from-accent/20 to-dream/20", topics: [
          { id: "el1", en: "Ultrasound Therapy", ta: "அல்ட்ராசவுண்ட் சிகிச்சை", hi: "अल्ट्रासाउंड चिकित्सा" },
          { id: "el2", en: "TENS & IFT", ta: "TENS & IFT", hi: "TENS और IFT" },
          { id: "el3", en: "Shortwave Diathermy", ta: "குறு அலை வெப்ப சிகிச்சை", hi: "शॉर्टवेव डायथर्मी" },
        ]},
        { id: "pt-patho", en: "Pathology & Microbiology", ta: "நோயியல் & நுண்ணுயிரியல்", hi: "रोग विज्ञान और सूक्ष्म जीव विज्ञान", emoji: "🔬", color: "from-primary/20 to-accent/20", topics: [
          { id: "ptpa1", en: "General Pathology", ta: "பொது நோயியல்", hi: "सामान्य रोग विज्ञान" },
          { id: "ptpa2", en: "Orthopaedic Pathology", ta: "எலும்பியல் நோயியல்", hi: "अस्थि रोग विज्ञान" },
        ]},
        { id: "pt-pharma", en: "Pharmacology", ta: "மருந்தியல்", hi: "औषध विज्ञान", emoji: "💊", color: "from-secondary/20 to-primary/20", topics: [
          { id: "ptph1", en: "Analgesics & Anti-inflammatory", ta: "வலி நிவாரணிகள்", hi: "दर्दनाशक और सूजनरोधी" },
        ]},
        { id: "pt-manual", en: "Manual Therapy", ta: "கைமுறை சிகிச்சை", hi: "मैनुअल थेरेपी", emoji: "🤲", color: "from-dream/20 to-accent/20", topics: [
          { id: "mt1", en: "Joint Mobilization", ta: "மூட்டு இயக்கம்", hi: "संधि गतिशीलता" },
          { id: "mt2", en: "Soft Tissue Techniques", ta: "மெல்லிய திசு நுட்பங்கள்", hi: "कोमल ऊतक तकनीक" },
        ]},
      ]},
      { ...yr(3), subjects: [
        { id: "pt-ortho", en: "Orthopaedic Physiotherapy", ta: "எலும்பியல் இயன்முறை மருத்துவம்", hi: "आर्थोपेडिक फिजियोथेरेपी", emoji: "🦴", color: "from-primary/20 to-secondary/20", topics: [
          { id: "op1", en: "Fracture Rehabilitation", ta: "எலும்பு முறிவு மறுவாழ்வு", hi: "अस्थिभंग पुनर्वास" },
          { id: "op2", en: "Joint Replacement Rehab", ta: "மூட்டு மாற்று மறுவாழ்வு", hi: "संधि प्रतिस्थापन पुनर्वास" },
          { id: "op3", en: "Sports Injuries", ta: "விளையாட்டு காயங்கள்", hi: "खेल चोटें" },
        ]},
        { id: "pt-neuro", en: "Neurological Physiotherapy", ta: "நரம்பியல் இயன்முறை மருத்துவம்", hi: "तंत्रिका फिजियोथेरेपी", emoji: "🧠", color: "from-secondary/20 to-dream/20", topics: [
          { id: "np1", en: "Stroke Rehabilitation", ta: "பக்கவாதம் மறுவாழ்வு", hi: "स्ट्रोक पुनर्वास" },
          { id: "np2", en: "Spinal Cord Injury", ta: "முதுகுத்தண்டு காயம்", hi: "मेरु रज्जु की चोट" },
          { id: "np3", en: "Parkinson's & MS", ta: "பார்கின்சன் & MS", hi: "पार्किंसन और MS" },
        ]},
        { id: "pt-cardio", en: "Cardiopulmonary Physiotherapy", ta: "இருதய நுரையீரல் இயன்முறை", hi: "हृदय फुफ्फुसीय फिजियोथेरेपी", emoji: "❤️", color: "from-dream/20 to-primary/20", topics: [
          { id: "cp1", en: "Cardiac Rehabilitation", ta: "இருதய மறுவாழ்வு", hi: "हृदय पुनर्वास" },
          { id: "cp2", en: "Chest Physiotherapy", ta: "மார்பு இயன்முறை", hi: "छाती फिजियोथेरेपी" },
        ]},
      ]},
      { ...yr(4), subjects: [
        { id: "pt-comm", en: "Community Physiotherapy", ta: "சமூக இயன்முறை மருத்துவம்", hi: "सामुदायिक फिजियोथेरेपी", emoji: "🌍", color: "from-accent/20 to-secondary/20", topics: [
          { id: "cpt1", en: "Rural Rehabilitation", ta: "கிராமப்புற மறுவாழ்வு", hi: "ग्रामीण पुनर्वास" },
          { id: "cpt2", en: "Geriatric Physiotherapy", ta: "முதியோர் இயன்முறை", hi: "वृद्धावस्था फिजियोथेरेपी" },
        ]},
        { id: "pt-sports", en: "Sports Physiotherapy", ta: "விளையாட்டு இயன்முறை", hi: "खेल फिजियोथेरेपी", emoji: "⚽", color: "from-primary/20 to-dream/20", topics: [
          { id: "sp1", en: "Sports Injury Management", ta: "விளையாட்டு காயம் மேலாண்மை", hi: "खेल चोट प्रबंधन" },
          { id: "sp2", en: "Performance Enhancement", ta: "செயல்திறன் மேம்பாடு", hi: "प्रदर्शन वृद्धि" },
        ]},
        { id: "pt-res", en: "Research & Ethics", ta: "ஆராய்ச்சி & நெறிமுறை", hi: "अनुसंधान और नैतिकता", emoji: "📋", color: "from-secondary/20 to-accent/20", topics: [
          { id: "re1", en: "Research Methodology", ta: "ஆராய்ச்சி முறையியல்", hi: "अनुसंधान पद्धति" },
          { id: "re2", en: "Evidence-Based Practice", ta: "சான்றின் அடிப்படையிலான நடைமுறை", hi: "साक्ष्य-आधारित अभ्यास" },
        ]},
      ]},
    ],
  }],
};

// ═══════════════════════════════════════════
// ARTS AND SCIENCE (3 years, multiple depts)
// ═══════════════════════════════════════════
const artsScienceCourse: HECourse = {
  id: "arts-science", en: "Arts & Science", ta: "கலை & அறிவியல்", hi: "कला एवं विज्ञान", emoji: "📖",
  departments: [
    {
      id: "as-physics", en: "Physics", ta: "இயற்பியல்", hi: "भौतिक विज्ञान", emoji: "⚛️",
      years: [
        { ...yr(1), subjects: [
          { id: "asp-mech", en: "Mechanics", ta: "இயக்கவியல்", hi: "यांत्रिकी", emoji: "🔧", color: "from-primary/20 to-accent/20", topics: [
            { id: "pm1", en: "Newton's Laws & Applications", ta: "நியூட்டன் விதிகள்", hi: "न्यूटन के नियम" },
            { id: "pm2", en: "Rotational Motion", ta: "சுழற்சி இயக்கம்", hi: "घूर्णी गति" },
          ]},
          { id: "asp-waves", en: "Waves & Optics", ta: "அலைகள் & ஒளியியல்", hi: "तरंग एवं प्रकाशिकी", emoji: "🌊", color: "from-secondary/20 to-primary/20", topics: [
            { id: "wo1", en: "Wave Motion & Acoustics", ta: "அலை இயக்கம்", hi: "तरंग गति और ध्वनिकी" },
            { id: "wo2", en: "Interference & Diffraction", ta: "குறுக்கீடு & விளிம்பு வளைவு", hi: "व्यतिकरण और विवर्तन" },
          ]},
          { id: "asp-math", en: "Mathematics for Physics", ta: "இயற்பியலுக்கான கணிதம்", hi: "भौतिकी के लिए गणित", emoji: "📐", color: "from-dream/20 to-secondary/20", topics: [
            { id: "mfp1", en: "Calculus & Vectors", ta: "நுண்கணிதம் & வெக்டர்கள்", hi: "कलन और सदिश" },
          ]},
        ]},
        { ...yr(2), subjects: [
          { id: "asp-thermo", en: "Thermodynamics & Statistical Mechanics", ta: "வெப்பவியக்கவியல்", hi: "ऊष्मागतिकी और सांख्यिकीय यांत्रिकी", emoji: "🌡️", color: "from-accent/20 to-dream/20", topics: [
            { id: "ts1", en: "Laws of Thermodynamics", ta: "வெப்பவியக்க விதிகள்", hi: "ऊष्मागतिकी के नियम" },
            { id: "ts2", en: "Statistical Mechanics", ta: "புள்ளியியல் இயக்கவியல்", hi: "सांख्यिकीय यांत्रिकी" },
          ]},
          { id: "asp-em", en: "Electromagnetism", ta: "மின்காந்தவியல்", hi: "विद्युतचुंबकत्व", emoji: "⚡", color: "from-primary/20 to-secondary/20", topics: [
            { id: "em1", en: "Electrostatics & Magnetism", ta: "மின்னியல் & காந்தவியல்", hi: "स्थिर विद्युत और चुंबकत्व" },
            { id: "em2", en: "Maxwell's Equations", ta: "மாக்ஸ்வெல் சமன்பாடுகள்", hi: "मैक्सवेल समीकरण" },
          ]},
          { id: "asp-elect", en: "Electronics", ta: "மின்னணுவியல்", hi: "इलेक्ट्रॉनिक्स", emoji: "🔌", color: "from-dream/20 to-accent/20", topics: [
            { id: "el1", en: "Semiconductor Devices", ta: "குறைகடத்தி கருவிகள்", hi: "अर्धचालक युक्तियां" },
            { id: "el2", en: "Digital Electronics", ta: "டிஜிட்டல் மின்னணுவியல்", hi: "डिजिटल इलेक्ट्रॉनिक्स" },
          ]},
        ]},
        { ...yr(3), subjects: [
          { id: "asp-qm", en: "Quantum Mechanics", ta: "குவாண்டம் இயக்கவியல்", hi: "क्वांटम यांत्रिकी", emoji: "🔬", color: "from-secondary/20 to-dream/20", topics: [
            { id: "qm1", en: "Wave Function & Operators", ta: "அலை சார்பு", hi: "तरंग फलन और प्रचालक" },
            { id: "qm2", en: "Hydrogen Atom", ta: "ஹைட்ரஜன் அணு", hi: "हाइड्रोजन परमाणु" },
          ]},
          { id: "asp-nuc", en: "Nuclear & Particle Physics", ta: "அணு & துகள் இயற்பியல்", hi: "नाभिकीय और कण भौतिकी", emoji: "☢️", color: "from-primary/20 to-accent/20", topics: [
            { id: "np1", en: "Nuclear Structure", ta: "அணுக்கரு அமைப்பு", hi: "नाभिकीय संरचना" },
            { id: "np2", en: "Radioactivity", ta: "கதிரியக்கம்", hi: "रेडियोधर्मिता" },
          ]},
          { id: "asp-ss", en: "Solid State Physics", ta: "திண்ம இயற்பியல்", hi: "ठोस अवस्था भौतिकी", emoji: "💎", color: "from-accent/20 to-secondary/20", topics: [
            { id: "ss1", en: "Crystal Structure", ta: "படிக அமைப்பு", hi: "क्रिस्टल संरचना" },
            { id: "ss2", en: "Band Theory", ta: "பட்டை கோட்பாடு", hi: "बैंड सिद्धांत" },
          ]},
        ]},
      ],
    },
    {
      id: "as-chemistry", en: "Chemistry", ta: "வேதியியல்", hi: "रसायन विज्ञान", emoji: "🧪",
      years: [
        { ...yr(1), subjects: [
          { id: "asc-inorg", en: "Inorganic Chemistry", ta: "கனிம வேதியியல்", hi: "अकार्बनिक रसायन", emoji: "⚗️", color: "from-dream/20 to-accent/20", topics: [
            { id: "ic1", en: "Atomic Structure & Periodicity", ta: "அணு அமைப்பு & ஆவர்த்தனம்", hi: "परमाणु संरचना और आवर्तिता" },
            { id: "ic2", en: "Chemical Bonding", ta: "வேதிப்பிணைப்பு", hi: "रासायनिक बंधन" },
            { id: "ic3", en: "Coordination Chemistry", ta: "ஒருங்கிணைப்பு வேதியியல்", hi: "सहसंयोजक रसायन" },
          ]},
          { id: "asc-org1", en: "Organic Chemistry I", ta: "கரிம வேதியியல் I", hi: "कार्बनिक रसायन I", emoji: "🧬", color: "from-primary/20 to-secondary/20", topics: [
            { id: "oc1", en: "Stereochemistry", ta: "திசை வேதியியல்", hi: "त्रिविम रसायन" },
            { id: "oc2", en: "Reaction Mechanisms", ta: "வினை வழிமுறைகள்", hi: "अभिक्रिया तंत्र" },
          ]},
        ]},
        { ...yr(2), subjects: [
          { id: "asc-phys", en: "Physical Chemistry", ta: "இயற்பியல் வேதியியல்", hi: "भौतिक रसायन", emoji: "⚡", color: "from-secondary/20 to-dream/20", topics: [
            { id: "pc1", en: "Chemical Kinetics", ta: "வேதியியல் இயக்கவியல்", hi: "रासायनिक गतिकी" },
            { id: "pc2", en: "Thermochemistry", ta: "வெப்ப வேதியியல்", hi: "ऊष्मा रसायन" },
            { id: "pc3", en: "Electrochemistry", ta: "மின்வேதியியல்", hi: "विद्युत रसायन" },
          ]},
          { id: "asc-org2", en: "Organic Chemistry II", ta: "கரிம வேதியியல் II", hi: "कार्बनिक रसायन II", emoji: "🧬", color: "from-accent/20 to-primary/20", topics: [
            { id: "oc3", en: "Aromatic Compounds", ta: "நறுமண சேர்மங்கள்", hi: "सुगंधित यौगिक" },
            { id: "oc4", en: "Polymers", ta: "பாலிமர்கள்", hi: "बहुलक" },
          ]},
          { id: "asc-anal", en: "Analytical Chemistry", ta: "பகுப்பாய்வு வேதியியல்", hi: "विश्लेषणात्मक रसायन", emoji: "🔬", color: "from-dream/20 to-secondary/20", topics: [
            { id: "ac1", en: "Spectroscopy", ta: "நிறமாலையியல்", hi: "स्पेक्ट्रोस्कोपी" },
            { id: "ac2", en: "Chromatography", ta: "நிறப்பிரிகையியல்", hi: "क्रोमैटोग्राफी" },
          ]},
        ]},
        { ...yr(3), subjects: [
          { id: "asc-bio", en: "Biochemistry & Medicinal Chemistry", ta: "உயிர் வேதியியல் & மருத்துவ வேதியியல்", hi: "जैव रसायन और औषधीय रसायन", emoji: "💊", color: "from-primary/20 to-dream/20", topics: [
            { id: "bc1", en: "Biomolecules", ta: "உயிர் மூலக்கூறுகள்", hi: "जैव अणु" },
            { id: "bc2", en: "Drug Chemistry", ta: "மருந்து வேதியியல்", hi: "दवा रसायन" },
          ]},
          { id: "asc-env", en: "Environmental Chemistry", ta: "சுற்றுச்சூழல் வேதியியல்", hi: "पर्यावरण रसायन", emoji: "🌿", color: "from-secondary/20 to-accent/20", topics: [
            { id: "ec1", en: "Pollution & Treatment", ta: "மாசு & சிகிச்சை", hi: "प्रदूषण और उपचार" },
            { id: "ec2", en: "Green Chemistry", ta: "பசுமை வேதியியல்", hi: "हरित रसायन" },
          ]},
        ]},
      ],
    },
    {
      id: "as-maths", en: "Mathematics", ta: "கணிதம்", hi: "गणित", emoji: "📐",
      years: [
        { ...yr(1), subjects: [
          { id: "asm-algebra", en: "Algebra", ta: "இயற்கணிதம்", hi: "बीजगणित", emoji: "📊", color: "from-accent/20 to-primary/20", topics: [
            { id: "al1", en: "Group Theory", ta: "குழு கோட்பாடு", hi: "समूह सिद्धांत" },
            { id: "al2", en: "Ring & Field Theory", ta: "வளைய & புலக் கோட்பாடு", hi: "रिंग और फील्ड सिद्धांत" },
          ]},
          { id: "asm-calc", en: "Calculus & Real Analysis", ta: "நுண்கணிதம் & மெய் பகுப்பாய்வு", hi: "कलन और वास्तविक विश्लेषण", emoji: "∞", color: "from-secondary/20 to-dream/20", topics: [
            { id: "ca1", en: "Sequences & Series", ta: "தொடர்கள் & தொடர்வரிசைகள்", hi: "अनुक्रम और श्रेणी" },
            { id: "ca2", en: "Limits & Continuity", ta: "எல்லைகள் & தொடர்ச்சி", hi: "सीमा और सांतत्य" },
          ]},
          { id: "asm-geom", en: "Differential Geometry", ta: "வகைநிலை வடிவியல்", hi: "अवकल ज्यामिति", emoji: "📏", color: "from-primary/20 to-accent/20", topics: [
            { id: "dg1", en: "Curves & Surfaces", ta: "வளைவுகள் & மேற்பரப்புகள்", hi: "वक्र और पृष्ठ" },
          ]},
        ]},
        { ...yr(2), subjects: [
          { id: "asm-ode", en: "Ordinary Differential Equations", ta: "சாதாரண வகைநிலை சமன்பாடுகள்", hi: "साधारण अवकल समीकरण", emoji: "📈", color: "from-dream/20 to-primary/20", topics: [
            { id: "ode1", en: "First & Second Order ODE", ta: "முதல் & இரண்டாம் நிலை ODE", hi: "प्रथम और द्वितीय कोटि ODE" },
          ]},
          { id: "asm-la", en: "Linear Algebra", ta: "நேரியல் இயற்கணிதம்", hi: "रैखिक बीजगणित", emoji: "🔢", color: "from-secondary/20 to-accent/20", topics: [
            { id: "la1", en: "Vector Spaces", ta: "வெக்டர் வெளிகள்", hi: "सदिश समष्टि" },
            { id: "la2", en: "Eigenvalues & Eigenvectors", ta: "ஐகன் மதிப்புகள்", hi: "आइगेन मान और आइगेन सदिश" },
          ]},
          { id: "asm-complex", en: "Complex Analysis", ta: "சிக்கல் பகுப்பாய்வு", hi: "सम्मिश्र विश्लेषण", emoji: "🌀", color: "from-accent/20 to-dream/20", topics: [
            { id: "cx1", en: "Analytic Functions", ta: "பகுப்பாய்வு சார்புகள்", hi: "विश्लेषणात्मक फलन" },
            { id: "cx2", en: "Contour Integration", ta: "விளிம்பு தொகையிடல்", hi: "समोच्च समाकलन" },
          ]},
        ]},
        { ...yr(3), subjects: [
          { id: "asm-pde", en: "Partial Differential Equations", ta: "பகுதி வகைநிலை சமன்பாடுகள்", hi: "आंशिक अवकल समीकरण", emoji: "📐", color: "from-primary/20 to-secondary/20", topics: [
            { id: "pde1", en: "Wave & Heat Equations", ta: "அலை & வெப்ப சமன்பாடுகள்", hi: "तरंग और ताप समीकरण" },
          ]},
          { id: "asm-prob", en: "Probability & Statistics", ta: "நிகழ்தகவு & புள்ளியியல்", hi: "प्रायिकता और सांख्यिकी", emoji: "🎲", color: "from-dream/20 to-accent/20", topics: [
            { id: "ps1", en: "Random Variables & Distributions", ta: "சமவாய்ப்பு மாறிகள்", hi: "यादृच्छिक चर और वितरण" },
            { id: "ps2", en: "Hypothesis Testing", ta: "கருதுகோள் சோதனை", hi: "परिकल्पना परीक्षण" },
          ]},
          { id: "asm-num", en: "Numerical Methods", ta: "எண்ணியல் முறைகள்", hi: "संख्यात्मक विधियां", emoji: "🖥️", color: "from-secondary/20 to-primary/20", topics: [
            { id: "nm1", en: "Root Finding & Interpolation", ta: "மூலம் கண்டறிதல்", hi: "मूल खोज और प्रक्षेप" },
          ]},
        ]},
      ],
    },
    {
      id: "as-english", en: "English Literature", ta: "ஆங்கில இலக்கியம்", hi: "अंग्रेजी साहित्य", emoji: "📚",
      years: [
        { ...yr(1), subjects: [
          { id: "ase-lit1", en: "British Literature", ta: "பிரிட்டிஷ் இலக்கியம்", hi: "ब्रिटिश साहित्य", emoji: "📖", color: "from-dream/20 to-primary/20", topics: [
            { id: "bl1", en: "Shakespeare & Elizabethan Literature", ta: "ஷேக்ஸ்பியர்", hi: "शेक्सपियर और एलिजाबेथन साहित्य" },
            { id: "bl2", en: "Romantic Poetry", ta: "காதல் கவிதை", hi: "रोमांटिक कविता" },
          ]},
          { id: "ase-lang", en: "Language & Linguistics", ta: "மொழி & மொழியியல்", hi: "भाषा और भाषाविज्ञान", emoji: "🗣️", color: "from-primary/20 to-accent/20", topics: [
            { id: "ll1", en: "Phonetics & Phonology", ta: "ஒலியியல்", hi: "ध्वनि विज्ञान" },
            { id: "ll2", en: "Morphology & Syntax", ta: "உருபனியல் & தொடரியல்", hi: "रूपविज्ञान और वाक्यविन्यास" },
          ]},
        ]},
        { ...yr(2), subjects: [
          { id: "ase-lit2", en: "American & Postcolonial Literature", ta: "அமெரிக்க & காலனியப்பின் இலக்கியம்", hi: "अमेरिकी और उत्तर-औपनिवेशिक साहित्य", emoji: "📕", color: "from-secondary/20 to-dream/20", topics: [
            { id: "al1", en: "American Fiction", ta: "அமெரிக்க புனைவு", hi: "अमेरिकी कथा साहित्य" },
            { id: "al2", en: "Postcolonial Writers", ta: "காலனியப்பின் எழுத்தாளர்கள்", hi: "उत्तर-औपनिवेशिक लेखक" },
          ]},
          { id: "ase-indian", en: "Indian Writing in English", ta: "ஆங்கிலத்தில் இந்திய எழுத்து", hi: "अंग्रेजी में भारतीय लेखन", emoji: "🇮🇳", color: "from-accent/20 to-primary/20", topics: [
            { id: "ie1", en: "R.K. Narayan, Mulk Raj Anand", ta: "ஆர்.கே. நாராயண்", hi: "आर.के. नारायण, मुल्क राज आनंद" },
            { id: "ie2", en: "Modern Indian Poetry", ta: "நவீன இந்திய கவிதை", hi: "आधुनिक भारतीय कविता" },
          ]},
        ]},
        { ...yr(3), subjects: [
          { id: "ase-lit3", en: "Literary Theory & Criticism", ta: "இலக்கியக் கோட்பாடு & விமர்சனம்", hi: "साहित्यिक सिद्धांत और आलोचना", emoji: "🎭", color: "from-dream/20 to-secondary/20", topics: [
            { id: "lt1", en: "Structuralism & Post-Structuralism", ta: "கட்டமைப்பியல்", hi: "संरचनावाद और उत्तर-संरचनावाद" },
            { id: "lt2", en: "Feminism & Gender Studies", ta: "பெண்ணியம்", hi: "नारीवाद और लिंग अध्ययन" },
          ]},
          { id: "ase-cw", en: "Creative Writing", ta: "படைப்பு எழுத்து", hi: "रचनात्मक लेखन", emoji: "✍️", color: "from-primary/20 to-dream/20", topics: [
            { id: "cw1", en: "Fiction Writing", ta: "கதை எழுத்து", hi: "कथा लेखन" },
            { id: "cw2", en: "Poetry Writing", ta: "கவிதை எழுத்து", hi: "काव्य लेखन" },
          ]},
        ]},
      ],
    },
  ],
};

// ═══════════════════════════════════════════
// ALLIED HEALTH SCIENCES (multiple depts)
// ═══════════════════════════════════════════
const alliedHealthCourse: HECourse = {
  id: "allied-health", en: "Allied Health Sciences", ta: "துணை சுகாதார அறிவியல்", hi: "संबद्ध स्वास्थ्य विज्ञान", emoji: "🧬",
  departments: [
    {
      id: "ah-mlt", en: "Medical Lab Technology", ta: "மருத்துவ ஆய்வக தொழில்நுட்பம்", hi: "चिकित्सा प्रयोगशाला प्रौद्योगिकी", emoji: "🔬",
      years: [
        { ...yr(1), subjects: [
          { id: "mlt-anat", en: "Anatomy & Physiology", ta: "உடற்கூறியல் & உடலியல்", hi: "शरीर रचना एवं क्रिया", emoji: "🦴", color: "from-primary/20 to-accent/20", topics: [
            { id: "mla1", en: "Basic Anatomy & Body Systems", ta: "அடிப்படை உடற்கூறியல்", hi: "मूल शरीर रचना और शारीरिक तंत्र" },
          ]},
          { id: "mlt-biochem", en: "Clinical Biochemistry", ta: "மருத்துவ உயிர் வேதியியல்", hi: "नैदानिक जैव रसायन", emoji: "🧪", color: "from-secondary/20 to-primary/20", topics: [
            { id: "cb1", en: "Blood Chemistry & LFT", ta: "இரத்த வேதியியல் & LFT", hi: "रक्त रसायन और LFT" },
            { id: "cb2", en: "RFT & Electrolytes", ta: "RFT & மின்பகுளிகள்", hi: "RFT और इलेक्ट्रोलाइट्स" },
          ]},
        ]},
        { ...yr(2), subjects: [
          { id: "mlt-hema", en: "Hematology & Blood Banking", ta: "இரத்தவியல் & இரத்த வங்கி", hi: "रक्त विज्ञान और रक्त बैंक", emoji: "🩸", color: "from-dream/20 to-accent/20", topics: [
            { id: "hm1", en: "CBC & Coagulation", ta: "CBC & உறைதல்", hi: "CBC और जमावट" },
            { id: "hm2", en: "Blood Grouping & Transfusion", ta: "இரத்தக்குழு & மாற்றுதல்", hi: "रक्त समूह और आधान" },
          ]},
          { id: "mlt-micro", en: "Clinical Microbiology", ta: "மருத்துவ நுண்ணுயிரியல்", hi: "नैदानिक सूक्ष्म जीव विज्ञान", emoji: "🦠", color: "from-accent/20 to-primary/20", topics: [
            { id: "cm1", en: "Culture & Sensitivity", ta: "வளர்ப்பு & உணர்திறன்", hi: "कल्चर और सेंसिटिविटी" },
            { id: "cm2", en: "Staining Techniques", ta: "சாயமிடல் நுட்பங்கள்", hi: "स्टेनिंग तकनीक" },
          ]},
          { id: "mlt-histo", en: "Histopathology", ta: "திசுநோயியல்", hi: "ऊतक रोग विज्ञान", emoji: "🔬", color: "from-primary/20 to-secondary/20", topics: [
            { id: "hp1", en: "Tissue Processing", ta: "திசு செயலாக்கம்", hi: "ऊतक प्रसंस्करण" },
            { id: "hp2", en: "Special Stains", ta: "சிறப்பு சாயங்கள்", hi: "विशेष स्टेन" },
          ]},
        ]},
        { ...yr(3), subjects: [
          { id: "mlt-immuno", en: "Immunology & Serology", ta: "நோய்த்தடுப்பு இயல் & சீரம் இயல்", hi: "प्रतिरक्षा विज्ञान और सीरोलॉजी", emoji: "🛡️", color: "from-secondary/20 to-dream/20", topics: [
            { id: "im1", en: "ELISA & Western Blot", ta: "ELISA & Western Blot", hi: "ELISA और वेस्टर्न ब्लॉट" },
          ]},
          { id: "mlt-mol", en: "Molecular Biology", ta: "மூலக்கூறு உயிரியல்", hi: "आणविक जीव विज्ञान", emoji: "🧬", color: "from-dream/20 to-primary/20", topics: [
            { id: "mb1", en: "PCR & Gene Expression", ta: "PCR & மரபணு வெளிப்பாடு", hi: "PCR और जीन अभिव्यक्ति" },
          ]},
        ]},
      ],
    },
    {
      id: "ah-radiology", en: "Radiology & Imaging", ta: "கதிர்வியல் & படமெடுப்பு", hi: "रेडियोलॉजी एवं इमेजिंग", emoji: "📷",
      years: [
        { ...yr(1), subjects: [
          { id: "rad-phy", en: "Radiation Physics", ta: "கதிர்வீச்சு இயற்பியல்", hi: "विकिरण भौतिकी", emoji: "☢️", color: "from-dream/20 to-accent/20", topics: [
            { id: "rp1", en: "X-ray Production & Properties", ta: "X-கதிர் உற்பத்தி", hi: "X-रे उत्पादन और गुण" },
            { id: "rp2", en: "Radiation Safety & Protection", ta: "கதிர் பாதுகாப்பு", hi: "विकिरण सुरक्षा और संरक्षण" },
          ]},
          { id: "rad-anat", en: "Radiographic Anatomy", ta: "கதிர்வீச்சு உடற்கூறியல்", hi: "रेडियोग्राफिक शरीर रचना", emoji: "🦴", color: "from-accent/20 to-primary/20", topics: [
            { id: "ra1", en: "Skeletal Imaging", ta: "எலும்பு படமெடுப்பு", hi: "कंकाल इमेजिंग" },
            { id: "ra2", en: "Chest & Abdomen X-ray", ta: "மார்பு & வயிறு X-கதிர்", hi: "छाती और उदर X-रे" },
          ]},
        ]},
        { ...yr(2), subjects: [
          { id: "rad-ct", en: "CT & MRI", ta: "CT & MRI", hi: "CT और MRI", emoji: "🖥️", color: "from-primary/20 to-dream/20", topics: [
            { id: "ct1", en: "CT Scanning Techniques", ta: "CT ஸ்கேன் நுட்பங்கள்", hi: "CT स्कैनिंग तकनीक" },
            { id: "ct2", en: "MRI Principles", ta: "MRI கொள்கைகள்", hi: "MRI सिद्धांत" },
          ]},
          { id: "rad-us", en: "Ultrasonography", ta: "அல்ட்ராசவுண்ட்", hi: "अल्ट्रासोनोग्राफी", emoji: "📡", color: "from-secondary/20 to-accent/20", topics: [
            { id: "us1", en: "Abdominal USG", ta: "வயிறு USG", hi: "उदर USG" },
            { id: "us2", en: "Obstetric USG", ta: "மகப்பேறு USG", hi: "प्रसूति USG" },
          ]},
        ]},
      ],
    },
    {
      id: "ah-optom", en: "Optometry", ta: "ஒளி இயல்", hi: "ऑप्टोमेट्री", emoji: "👁️",
      years: [
        { ...yr(1), subjects: [
          { id: "opt-anat", en: "Ocular Anatomy & Physiology", ta: "கண் உடற்கூறியல்", hi: "नेत्र शरीर रचना और क्रिया", emoji: "👁️", color: "from-primary/20 to-accent/20", topics: [
            { id: "oa1", en: "Eye Structure", ta: "கண் அமைப்பு", hi: "नेत्र संरचना" },
            { id: "oa2", en: "Visual Pathway", ta: "பார்வை பாதை", hi: "दृश्य मार्ग" },
          ]},
          { id: "opt-optics", en: "Geometrical & Physical Optics", ta: "வடிவியல் & இயற்பியல் ஒளியியல்", hi: "ज्यामितीय और भौतिक प्रकाशिकी", emoji: "🔍", color: "from-secondary/20 to-dream/20", topics: [
            { id: "go1", en: "Lenses & Prisms", ta: "லென்சுகள் & ப்ரிசங்கள்", hi: "लेंस और प्रिज्म" },
          ]},
        ]},
        { ...yr(2), subjects: [
          { id: "opt-refr", en: "Clinical Refraction", ta: "மருத்துவ ஒளிவிலகல்", hi: "नैदानिक अपवर्तन", emoji: "🤓", color: "from-dream/20 to-primary/20", topics: [
            { id: "cr1", en: "Myopia, Hyperopia & Astigmatism", ta: "கிட்டப்பார்வை, தூரப்பார்வை", hi: "निकट दृष्टि, दूर दृष्टि और दृष्टिवैषम्य" },
          ]},
          { id: "opt-cl", en: "Contact Lens Practice", ta: "கான்டாக்ட் லென்ஸ் நடைமுறை", hi: "कॉन्टैक्ट लेंस प्रैक्टिस", emoji: "👓", color: "from-accent/20 to-secondary/20", topics: [
            { id: "cl1", en: "Soft & Rigid Lenses", ta: "மென்மை & கடின லென்சுகள்", hi: "सॉफ्ट और रिजिड लेंस" },
          ]},
        ]},
      ],
    },
  ],
};

// ═══════════════════════════════════════════
// LAW (5 years for BA LLB, 3 years for LLB)
// ═══════════════════════════════════════════
const lawCourse: HECourse = {
  id: "law", en: "Law", ta: "சட்டம்", hi: "विधि", emoji: "⚖️",
  departments: [{
    id: "ballb", en: "BA LLB / LLB", ta: "BA LLB / LLB", hi: "BA LLB / LLB", emoji: "⚖️",
    years: [
      { ...yr(1), subjects: [
        { id: "law-const", en: "Constitutional Law I", ta: "அரசியலமைப்பு சட்டம் I", hi: "संवैधानिक विधि I", emoji: "📜", color: "from-primary/20 to-accent/20", topics: [
          { id: "cl1", en: "Fundamental Rights (Art. 12-35)", ta: "அடிப்படை உரிமைகள்", hi: "मौलिक अधिकार" },
          { id: "cl2", en: "Directive Principles", ta: "வழிகாட்டு நெறிமுறைகள்", hi: "निदेशक सिद्धांत" },
          { id: "cl3", en: "Judicial Review & PIL", ta: "நீதித்துறை மறுஆய்வு & PIL", hi: "न्यायिक समीक्षा और PIL" },
        ]},
        { id: "law-contract", en: "Law of Contracts I", ta: "ஒப்பந்தச் சட்டம் I", hi: "संविदा विधि I", emoji: "📝", color: "from-secondary/20 to-primary/20", topics: [
          { id: "lc1", en: "Formation & Validity of Contract", ta: "ஒப்பந்த உருவாக்கம்", hi: "संविदा का निर्माण और वैधता" },
          { id: "lc2", en: "Breach & Remedies", ta: "மீறல் & தீர்வுகள்", hi: "भंग और उपचार" },
          { id: "lc3", en: "Specific Relief Act", ta: "சிறப்பு நிவாரண சட்டம்", hi: "विशिष्ट अनुतोष अधिनियम" },
        ]},
        { id: "law-juris", en: "Jurisprudence", ta: "சட்டவியல்", hi: "विधिशास्त्र", emoji: "🏛️", color: "from-dream/20 to-secondary/20", topics: [
          { id: "ju1", en: "Schools of Jurisprudence", ta: "சட்டவியல் பள்ளிகள்", hi: "विधिशास्त्र के स्कूल" },
          { id: "ju2", en: "Legal Rights & Duties", ta: "சட்ட உரிமைகள் & கடமைகள்", hi: "विधिक अधिकार और कर्तव्य" },
          { id: "ju3", en: "Sources of Law", ta: "சட்ட ஆதாரங்கள்", hi: "विधि के स्रोत" },
        ]},
        { id: "law-tort", en: "Law of Torts", ta: "குற்றச்செயல் சட்டம்", hi: "अपकृत्य विधि", emoji: "⚠️", color: "from-accent/20 to-dream/20", topics: [
          { id: "lt1", en: "Negligence & Strict Liability", ta: "அலட்சியம் & கடுமையான பொறுப்பு", hi: "लापरवाही और कड़ा दायित्व" },
          { id: "lt2", en: "Defamation & Nuisance", ta: "அவதூறு & தொல்லை", hi: "मानहानि और उपद्रव" },
        ]},
      ]},
      { ...yr(2), subjects: [
        { id: "law-crim1", en: "Criminal Law (IPC / BNS)", ta: "குற்றவியல் சட்டம் (IPC / BNS)", hi: "दंड विधि (IPC / BNS)", emoji: "🔒", color: "from-accent/20 to-dream/20", topics: [
          { id: "cr1", en: "General Principles of Criminal Law", ta: "குற்றவியல் சட்ட பொது கொள்கைகள்", hi: "आपराधिक विधि के सामान्य सिद्धांत" },
          { id: "cr2", en: "Offences Against Person & Property", ta: "நபர் & சொத்துக்கு எதிரான குற்றங்கள்", hi: "व्यक्ति और संपत्ति के विरुद्ध अपराध" },
        ]},
        { id: "law-crpc", en: "Criminal Procedure (CrPC / BNSS)", ta: "குற்றவியல் நடைமுறை", hi: "दंड प्रक्रिया (CrPC / BNSS)", emoji: "⚖️", color: "from-primary/20 to-dream/20", topics: [
          { id: "crpc1", en: "FIR, Investigation & Trial", ta: "FIR, விசாரணை & சோதனை", hi: "FIR, जांच और परीक्षण" },
          { id: "crpc2", en: "Bail & Appeals", ta: "ஜாமீன் & மேல்முறையீடுகள்", hi: "जमानत और अपील" },
        ]},
        { id: "law-family", en: "Family Law I (Hindu Law)", ta: "குடும்ப சட்டம் I (இந்து சட்டம்)", hi: "पारिवारिक विधि I (हिंदू विधि)", emoji: "👨‍👩‍👧", color: "from-secondary/20 to-accent/20", topics: [
          { id: "fl1", en: "Marriage & Divorce", ta: "திருமணம் & விவாகரத்து", hi: "विवाह और तलाक" },
          { id: "fl2", en: "Adoption & Succession", ta: "தத்தெடுப்பு & வாரிசு", hi: "दत्तक और उत्तराधिकार" },
        ]},
        { id: "law-family2", en: "Family Law II (Muslim, Christian, Parsi)", ta: "குடும்ப சட்டம் II", hi: "पारिवारिक विधि II (मुस्लिम, ईसाई, पारसी)", emoji: "⚖️", color: "from-dream/20 to-primary/20", topics: [
          { id: "fl3", en: "Muslim Personal Law", ta: "முஸ்லிம் தனிநபர் சட்டம்", hi: "मुस्लिम पर्सनल लॉ" },
          { id: "fl4", en: "Uniform Civil Code Debate", ta: "ஒரே சிவில் சட்டம் விவாதம்", hi: "समान नागरिक संहिता बहस" },
        ]},
        { id: "law-const2", en: "Constitutional Law II", ta: "அரசியலமைப்பு சட்டம் II", hi: "संवैधानिक विधि II", emoji: "📜", color: "from-accent/20 to-secondary/20", topics: [
          { id: "cl4", en: "Union & State Relations", ta: "ஒன்றிய & மாநில உறவுகள்", hi: "संघ और राज्य संबंध" },
          { id: "cl5", en: "Emergency Provisions", ta: "அவசரகால ஏற்பாடுகள்", hi: "आपातकालीन प्रावधान" },
        ]},
      ]},
      { ...yr(3), subjects: [
        { id: "law-prop", en: "Property Law (Transfer of Property Act)", ta: "சொத்து சட்டம்", hi: "संपत्ति विधि", emoji: "🏠", color: "from-secondary/20 to-accent/20", topics: [
          { id: "pl1", en: "Sale, Mortgage & Lease", ta: "விற்பனை, அடமானம் & குத்தகை", hi: "विक्रय, बंधक और पट्टा" },
          { id: "pl2", en: "Easement Act", ta: "எளிமையாக்கல் சட்டம்", hi: "सुखाचार अधिनियम" },
        ]},
        { id: "law-admin", en: "Administrative Law", ta: "நிர்வாக சட்டம்", hi: "प्रशासनिक विधि", emoji: "🏛️", color: "from-dream/20 to-primary/20", topics: [
          { id: "al1", en: "Delegated Legislation", ta: "ஒதுக்கப்பட்ட சட்டம்", hi: "प्रत्यायोजित विधान" },
          { id: "al2", en: "Administrative Tribunals", ta: "நிர்வாக நீதிமன்றங்கள்", hi: "प्रशासनिक अधिकरण" },
          { id: "al3", en: "Natural Justice", ta: "இயல்பான நீதி", hi: "प्राकृतिक न्याय" },
        ]},
        { id: "law-cpc", en: "Civil Procedure Code", ta: "சிவில் நடைமுறை சட்டம்", hi: "सिविल प्रक्रिया संहिता", emoji: "📋", color: "from-primary/20 to-accent/20", topics: [
          { id: "cpc1", en: "Suits, Appeals & Revision", ta: "வழக்குகள், மேல்முறையீடுகள்", hi: "वाद, अपील और पुनरीक्षण" },
          { id: "cpc2", en: "Execution of Decrees", ta: "ஆணைகள் நிறைவேற்றம்", hi: "डिक्री का निष्पादन" },
        ]},
        { id: "law-evid", en: "Law of Evidence", ta: "சான்று சட்டம்", hi: "साक्ष्य विधि", emoji: "🔍", color: "from-secondary/20 to-dream/20", topics: [
          { id: "ev1", en: "Relevancy & Admissibility", ta: "பொருத்தம் & ஏற்றுக்கொள்ளல்", hi: "प्रासंगिकता और ग्राह्यता" },
          { id: "ev2", en: "Burden of Proof", ta: "சான்றின் சுமை", hi: "सबूत का भार" },
        ]},
        { id: "law-comp", en: "Company Law", ta: "நிறுவன சட்டம்", hi: "कंपनी विधि", emoji: "🏢", color: "from-accent/20 to-primary/20", topics: [
          { id: "cl1", en: "Incorporation & MOA/AOA", ta: "பதிவு & MOA/AOA", hi: "निगमन और MOA/AOA" },
          { id: "cl2", en: "Directors & Shareholders", ta: "இயக்குநர்கள் & பங்குதாரர்கள்", hi: "निदेशक और शेयरधारक" },
        ]},
      ]},
      { ...yr(4), subjects: [
        { id: "law-labour", en: "Labour & Industrial Law", ta: "தொழிலாளர் & தொழிற்சாலை சட்டம்", hi: "श्रम और औद्योगिक विधि", emoji: "🏭", color: "from-dream/20 to-accent/20", topics: [
          { id: "lb1", en: "Industrial Disputes Act", ta: "தொழிற்சாலை தகராறு சட்டம்", hi: "औद्योगिक विवाद अधिनियम" },
          { id: "lb2", en: "Factories Act & Minimum Wages", ta: "தொழிற்சாலை சட்டம் & குறைந்தபட்ச ஊதியம்", hi: "कारखाना अधिनियम और न्यूनतम वेतन" },
        ]},
        { id: "law-env", en: "Environmental Law", ta: "சுற்றுச்சூழல் சட்டம்", hi: "पर्यावरण विधि", emoji: "🌿", color: "from-primary/20 to-secondary/20", topics: [
          { id: "env1", en: "Environmental Protection Act", ta: "சுற்றுச்சூழல் பாதுகாப்பு சட்டம்", hi: "पर्यावरण संरक्षण अधिनियम" },
          { id: "env2", en: "Wildlife & Forest Laws", ta: "வனவிலங்கு & காடு சட்டங்கள்", hi: "वन्यजीव और वन कानून" },
        ]},
        { id: "law-ipr", en: "Intellectual Property Law", ta: "அறிவுசார் சொத்துரிமை சட்டம்", hi: "बौद्धिक संपदा विधि", emoji: "💡", color: "from-secondary/20 to-dream/20", topics: [
          { id: "ip1", en: "Patents, Trademarks & Copyright", ta: "காப்புரிமை, வணிக முத்திரை & பதிப்புரிமை", hi: "पेटेंट, ट्रेडमार्क और कॉपीराइट" },
        ]},
        { id: "law-intl", en: "International Law", ta: "சர்வதேச சட்டம்", hi: "अंतर्राष्ट्रीय विधि", emoji: "🌐", color: "from-accent/20 to-primary/20", topics: [
          { id: "il1", en: "Sources & Subjects of International Law", ta: "சர்வதேச சட்ட ஆதாரங்கள்", hi: "अंतर्राष्ट्रीय विधि के स्रोत" },
          { id: "il2", en: "UN & International Organizations", ta: "ஐ.நா & சர்வதேச அமைப்புகள்", hi: "UN और अंतर्राष्ट्रीय संगठन" },
        ]},
        { id: "law-tax", en: "Taxation Law", ta: "வரி சட்டம்", hi: "कर विधि", emoji: "💰", color: "from-dream/20 to-secondary/20", topics: [
          { id: "tx1", en: "Income Tax Act", ta: "வருமான வரி சட்டம்", hi: "आयकर अधिनियम" },
          { id: "tx2", en: "GST", ta: "GST", hi: "GST" },
        ]},
      ]},
      { ...yr(5), subjects: [
        { id: "law-cyber", en: "Cyber Law & IT Act", ta: "இணைய சட்டம் & IT சட்டம்", hi: "साइबर विधि और IT अधिनियम", emoji: "💻", color: "from-primary/20 to-accent/20", topics: [
          { id: "cy1", en: "IT Act 2000", ta: "IT சட்டம் 2000", hi: "IT अधिनियम 2000" },
          { id: "cy2", en: "Cyber Crimes", ta: "இணையக் குற்றங்கள்", hi: "साइबर अपराध" },
        ]},
        { id: "law-adr", en: "Alternative Dispute Resolution", ta: "மாற்று தகராறு தீர்வு", hi: "वैकल्पिक विवाद समाधान", emoji: "🤝", color: "from-secondary/20 to-dream/20", topics: [
          { id: "adr1", en: "Arbitration & Mediation", ta: "நடுவர் மன்றம் & மத்தியஸ்தம்", hi: "मध्यस्थता और मध्यस्थ" },
          { id: "adr2", en: "Lok Adalat", ta: "மக்கள் நீதிமன்றம்", hi: "लोक अदालत" },
        ]},
        { id: "law-hrlaw", en: "Human Rights Law", ta: "மனித உரிமை சட்டம்", hi: "मानवाधिकार विधि", emoji: "✊", color: "from-dream/20 to-primary/20", topics: [
          { id: "hr1", en: "UDHR & International Covenants", ta: "UDHR & சர்வதேச உடன்படிக்கைகள்", hi: "UDHR और अंतर्राष्ट्रीय अनुबंध" },
          { id: "hr2", en: "NHRC & SHRC", ta: "NHRC & SHRC", hi: "NHRC और SHRC" },
        ]},
        { id: "law-draft", en: "Drafting, Pleading & Conveyancing", ta: "வரைவு, வாதம் & பரிமாற்றம்", hi: "ड्राफ्टिंग, प्लीडिंग और कन्वेयन्सिंग", emoji: "✍️", color: "from-accent/20 to-secondary/20", topics: [
          { id: "dp1", en: "Drafting of Plaints & Written Statements", ta: "வழக்கு மனு வரைவு", hi: "वादपत्र और लिखित कथन का प्रारूपण" },
          { id: "dp2", en: "Conveyance Deeds", ta: "பரிமாற்ற பத்திரங்கள்", hi: "हस्तांतरण विलेख" },
        ]},
        { id: "law-moot", en: "Moot Court & Clinical Legal Education", ta: "போலி நீதிமன்றம்", hi: "मूट कोर्ट और नैदानिक विधिक शिक्षा", emoji: "🎓", color: "from-primary/20 to-dream/20", topics: [
          { id: "mc1", en: "Memorial Drafting", ta: "நினைவு பத்திர வரைவு", hi: "मेमोरियल ड्राफ्टिंग" },
          { id: "mc2", en: "Court Observation & Legal Aid", ta: "நீதிமன்ற கவனிப்பு", hi: "न्यायालय अवलोकन और विधिक सहायता" },
        ]},
      ]},
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
