// Comprehensive Indian academic syllabus data
// Organized: Course → University/Board → Year → Semester → Subject → Topics

export interface Topic {
  id: string;
  title: string;
  description: string;
  audioKeywords: string[];
}

export interface Subject {
  id: string;
  title: string;
  emoji: string;
  topics: Topic[];
}

export interface Semester {
  id: string;
  label: string;
  subjects: Subject[];
}

export interface AcademicYear {
  id: string;
  label: string;
  semesters: Semester[];
}

export interface University {
  id: string;
  name: string;
  shortName: string;
}

export interface SyllabusCourse {
  id: string;
  label: string;
  emoji: string;
  duration: string;
  universities: University[];
  years: AcademicYear[];
}

export const topicAudioMap: Record<string, string> = {
  anatomy: "nature", physiology: "ocean", biochemistry: "rain",
  pathology: "whitenoise", pharmacology: "nature", mathematics: "whitenoise",
  programming: "rain", physics: "ocean", chemistry: "rain", default: "nature",
};

export function getAudioProfileForTopic(keywords: string[]): string {
  for (const kw of keywords) {
    const match = topicAudioMap[kw.toLowerCase()];
    if (match) return match;
  }
  return topicAudioMap.default;
}

// Helper to generate topic IDs
let _tid = 0;
const tid = () => `t${++_tid}`;

export const syllabusCourses: SyllabusCourse[] = [
  // ═══════════════ MBBS ═══════════════
  {
    id: "mbbs", label: "MBBS", emoji: "🩺", duration: "5.5 years",
    universities: [
      { id: "nmc", name: "National Medical Commission", shortName: "NMC" },
      { id: "tnmgrmu", name: "TN Dr. MGR Medical University", shortName: "TNMGRMU" },
      { id: "rguhs", name: "Rajiv Gandhi University of Health Sciences", shortName: "RGUHS" },
    ],
    years: [
      { id: "y1", label: "1st Year (Phase 1)", semesters: [
        { id: "s1", label: "Phase 1", subjects: [
          { id: "m-anat", title: "Anatomy", emoji: "🦴", topics: [
            { id: tid(), title: "General Anatomy", description: "Anatomical terminology, tissue types, embryology", audioKeywords: ["anatomy"] },
            { id: tid(), title: "Upper Limb", description: "Muscles, nerves, vessels of the upper extremity", audioKeywords: ["anatomy"] },
            { id: tid(), title: "Lower Limb", description: "Muscles, nerves, vessels of the lower extremity", audioKeywords: ["anatomy"] },
            { id: tid(), title: "Thorax & Abdomen", description: "Heart, lungs, GI organs, peritoneum", audioKeywords: ["anatomy"] },
            { id: tid(), title: "Head & Neck", description: "Cranial nerves, face, orbit, neck triangles", audioKeywords: ["anatomy"] },
            { id: tid(), title: "Neuroanatomy", description: "Brain, spinal cord, cranial nerve pathways", audioKeywords: ["anatomy"] },
          ]},
          { id: "m-phys", title: "Physiology", emoji: "❤️", topics: [
            { id: tid(), title: "Cell Physiology", description: "Membrane transport, cell signaling", audioKeywords: ["physiology"] },
            { id: tid(), title: "Blood & Immunity", description: "Blood groups, hemostasis, immune system", audioKeywords: ["physiology"] },
            { id: tid(), title: "Cardiovascular System", description: "Cardiac cycle, ECG, blood pressure", audioKeywords: ["physiology"] },
            { id: tid(), title: "Respiratory System", description: "Lung volumes, gas exchange", audioKeywords: ["physiology"] },
            { id: tid(), title: "Renal Physiology", description: "GFR, tubular function, acid-base balance", audioKeywords: ["physiology"] },
            { id: tid(), title: "Neurophysiology", description: "Nerve conduction, reflexes, sensory systems", audioKeywords: ["physiology"] },
          ]},
          { id: "m-bio", title: "Biochemistry", emoji: "🧬", topics: [
            { id: tid(), title: "Proteins & Enzymes", description: "Amino acids, enzyme kinetics", audioKeywords: ["biochemistry"] },
            { id: tid(), title: "Carbohydrate Metabolism", description: "Glycolysis, TCA cycle, gluconeogenesis", audioKeywords: ["biochemistry"] },
            { id: tid(), title: "Lipid Metabolism", description: "Beta-oxidation, cholesterol synthesis", audioKeywords: ["biochemistry"] },
            { id: tid(), title: "Molecular Biology", description: "DNA replication, transcription, translation", audioKeywords: ["biochemistry"] },
            { id: tid(), title: "Clinical Biochemistry", description: "LFT, RFT, hormones, vitamins", audioKeywords: ["biochemistry"] },
          ]},
        ]},
      ]},
      { id: "y2", label: "2nd Year (Phase 2)", semesters: [
        { id: "s2", label: "Phase 2", subjects: [
          { id: "m-path", title: "Pathology", emoji: "🔬", topics: [
            { id: tid(), title: "Cell Injury & Inflammation", description: "Necrosis, apoptosis, acute/chronic inflammation", audioKeywords: ["pathology"] },
            { id: tid(), title: "Hematology", description: "Anemias, leukemias, bleeding disorders", audioKeywords: ["pathology"] },
            { id: tid(), title: "Systemic Pathology", description: "CVS, respiratory, GI, renal pathology", audioKeywords: ["pathology"] },
          ]},
          { id: "m-pharma", title: "Pharmacology", emoji: "💊", topics: [
            { id: tid(), title: "General Pharmacology", description: "Pharmacokinetics, pharmacodynamics", audioKeywords: ["pharmacology"] },
            { id: tid(), title: "ANS Pharmacology", description: "Cholinergic, adrenergic drugs", audioKeywords: ["pharmacology"] },
            { id: tid(), title: "Chemotherapy", description: "Antibiotics, antifungals, anti-TB drugs", audioKeywords: ["pharmacology"] },
          ]},
          { id: "m-micro", title: "Microbiology", emoji: "🦠", topics: [
            { id: tid(), title: "General Bacteriology", description: "Morphology, culture, sterilization", audioKeywords: ["default"] },
            { id: tid(), title: "Systematic Bacteriology", description: "Staphylococci, Streptococci, E. coli", audioKeywords: ["default"] },
            { id: tid(), title: "Virology", description: "HIV, Hepatitis, Dengue, COVID", audioKeywords: ["default"] },
          ]},
          { id: "m-fmed", title: "Forensic Medicine", emoji: "⚖️", topics: [
            { id: tid(), title: "Thanatology", description: "Death, post-mortem changes, autopsy", audioKeywords: ["default"] },
            { id: tid(), title: "Toxicology", description: "Common poisons, treatment protocols", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ BDS (Dental) ═══════════════
  {
    id: "bds", label: "Dental (BDS)", emoji: "🦷", duration: "5 years",
    universities: [
      { id: "tnmgrmu-d", name: "TN Dr. MGR Medical University", shortName: "TNMGRMU" },
      { id: "rguhs-d", name: "Rajiv Gandhi University of Health Sciences", shortName: "RGUHS" },
      { id: "muhs", name: "Maharashtra University of Health Sciences", shortName: "MUHS" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1", subjects: [
          { id: "b-anat", title: "General Anatomy", emoji: "🦴", topics: [
            { id: tid(), title: "Introduction to Anatomy", description: "Terminology, planes, positions", audioKeywords: ["anatomy"] },
            { id: tid(), title: "Upper & Lower Limb", description: "Bones, muscles, nerves, vessels", audioKeywords: ["anatomy"] },
            { id: tid(), title: "Thorax & Abdomen", description: "Heart, lungs, GI tract", audioKeywords: ["anatomy"] },
          ]},
          { id: "b-phys", title: "General Physiology", emoji: "❤️", topics: [
            { id: tid(), title: "Cell & Blood Physiology", description: "Transport, blood groups, hemostasis", audioKeywords: ["physiology"] },
            { id: tid(), title: "CVS & Respiratory", description: "Cardiac cycle, breathing mechanics", audioKeywords: ["physiology"] },
          ]},
          { id: "b-bioch", title: "Biochemistry", emoji: "🧪", topics: [
            { id: tid(), title: "Proteins & Enzymes", description: "Structure, classification, kinetics", audioKeywords: ["biochemistry"] },
            { id: tid(), title: "Metabolism", description: "Glycolysis, TCA, lipid metabolism", audioKeywords: ["biochemistry"] },
          ]},
        ]},
        { id: "s2", label: "Semester 2", subjects: [
          { id: "b-dent-anat", title: "Dental Anatomy & Histology", emoji: "🦷", topics: [
            { id: tid(), title: "Tooth Morphology", description: "Nomenclature, permanent & deciduous teeth", audioKeywords: ["anatomy"] },
            { id: tid(), title: "Oral Histology", description: "Enamel, dentin, pulp, PDL, oral mucosa", audioKeywords: ["anatomy"] },
          ]},
          { id: "b-dmat", title: "Dental Materials", emoji: "🔧", topics: [
            { id: tid(), title: "Impression Materials", description: "Alginate, elastomers", audioKeywords: ["default"] },
            { id: tid(), title: "Restorative Materials", description: "Amalgam, composites, GIC", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
      { id: "y2", label: "2nd Year", semesters: [
        { id: "s3", label: "Semester 3", subjects: [
          { id: "b-gpath", title: "General Pathology", emoji: "🔬", topics: [
            { id: tid(), title: "Cell Injury & Inflammation", description: "Necrosis, apoptosis, repair", audioKeywords: ["pathology"] },
            { id: tid(), title: "Neoplasia", description: "Benign vs malignant, grading, staging", audioKeywords: ["pathology"] },
          ]},
          { id: "b-micro", title: "Microbiology", emoji: "🦠", topics: [
            { id: tid(), title: "Bacteriology", description: "Classification, sterilization, oral flora", audioKeywords: ["default"] },
            { id: tid(), title: "Immunology", description: "Innate/adaptive immunity, hypersensitivity", audioKeywords: ["default"] },
          ]},
          { id: "b-pharm", title: "Pharmacology", emoji: "💊", topics: [
            { id: tid(), title: "General & ANS Pharmacology", description: "Drug absorption, cholinergic drugs", audioKeywords: ["pharmacology"] },
            { id: tid(), title: "Analgesics & Antimicrobials", description: "NSAIDs, opioids, antibiotics", audioKeywords: ["pharmacology"] },
          ]},
        ]},
        { id: "s4", label: "Semester 4", subjects: [
          { id: "b-opath", title: "Oral Pathology", emoji: "🔬", topics: [
            { id: tid(), title: "Developmental Disorders", description: "Anomalies of teeth and oral structures", audioKeywords: ["pathology"] },
            { id: tid(), title: "Dental Caries & Pulp Disease", description: "Etiology, histopathology", audioKeywords: ["pathology"] },
            { id: tid(), title: "Oral Tumors", description: "Benign and malignant oral neoplasms", audioKeywords: ["pathology"] },
          ]},
        ]},
      ]},
      { id: "y3", label: "3rd Year", semesters: [
        { id: "s5", label: "Semester 5", subjects: [
          { id: "b-cons", title: "Conservative Dentistry", emoji: "🪥", topics: [
            { id: tid(), title: "Cavity Preparation", description: "Principles, classification", audioKeywords: ["default"] },
            { id: tid(), title: "Endodontics", description: "Pulp biology, access cavity, obturation", audioKeywords: ["default"] },
          ]},
          { id: "b-prosth", title: "Prosthodontics", emoji: "🦷", topics: [
            { id: tid(), title: "Complete Dentures", description: "Impressions, jaw relations, try-in", audioKeywords: ["default"] },
            { id: tid(), title: "Fixed Prosthodontics", description: "Crown & bridge preparations", audioKeywords: ["default"] },
          ]},
        ]},
        { id: "s6", label: "Semester 6", subjects: [
          { id: "b-perio", title: "Periodontics", emoji: "🩺", topics: [
            { id: tid(), title: "Periodontal Diseases", description: "Gingivitis, periodontitis classification", audioKeywords: ["pathology"] },
            { id: tid(), title: "Non-surgical Therapy", description: "Scaling, root planing", audioKeywords: ["default"] },
          ]},
          { id: "b-ortho", title: "Orthodontics", emoji: "😁", topics: [
            { id: tid(), title: "Malocclusion", description: "Angle's classification, etiology", audioKeywords: ["default"] },
            { id: tid(), title: "Appliances", description: "Fixed and removable appliances", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
      { id: "y4", label: "4th Year (Final)", semesters: [
        { id: "s7", label: "Semester 7", subjects: [
          { id: "b-surg", title: "Oral Surgery", emoji: "🏥", topics: [
            { id: tid(), title: "Exodontia", description: "Extraction principles, forceps, elevators", audioKeywords: ["default"] },
            { id: tid(), title: "Impactions & Trauma", description: "Impacted teeth, mandible fractures", audioKeywords: ["default"] },
          ]},
          { id: "b-pedo", title: "Pedodontics", emoji: "👶", topics: [
            { id: tid(), title: "Child Behavior Management", description: "Techniques for pediatric patients", audioKeywords: ["default"] },
            { id: tid(), title: "Preventive Dentistry", description: "Fluorides, sealants, diet counseling", audioKeywords: ["default"] },
          ]},
        ]},
        { id: "s8", label: "Semester 8", subjects: [
          { id: "b-comm", title: "Community Dentistry", emoji: "🏘️", topics: [
            { id: tid(), title: "Epidemiology", description: "Indices, survey methods", audioKeywords: ["default"] },
            { id: tid(), title: "Public Health", description: "National oral health programs", audioKeywords: ["default"] },
          ]},
          { id: "b-omr", title: "Oral Medicine & Radiology", emoji: "📡", topics: [
            { id: tid(), title: "Oral Lesions", description: "White, red, vesiculobullous lesions", audioKeywords: ["pathology"] },
            { id: tid(), title: "Dental Radiography", description: "Intraoral & extraoral techniques", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ BAMS (Ayurveda) ═══════════════
  {
    id: "bams", label: "BAMS (Ayurveda)", emoji: "🌿", duration: "5.5 years",
    universities: [
      { id: "ccim", name: "Central Council of Indian Medicine", shortName: "CCIM" },
      { id: "tndrmu-a", name: "TN Dr. MGR Medical University", shortName: "TNMGRMU" },
      { id: "tilak", name: "Tilak Maharashtra Vidyapeeth", shortName: "TMV" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Phase 1", subjects: [
          { id: "ba-pad", title: "Padartha Vigyan", emoji: "📜", topics: [
            { id: tid(), title: "Basic Principles of Ayurveda", description: "Padartha, Dravya, Guna, Karma", audioKeywords: ["default"] },
            { id: tid(), title: "Darshana (Philosophy)", description: "Nyaya, Vaisheshika, Sankhya systems", audioKeywords: ["default"] },
          ]},
          { id: "ba-rach", title: "Rachana Sharira", emoji: "🦴", topics: [
            { id: tid(), title: "Asthi & Sandhi Sharira", description: "Bones and joints in Ayurvedic context", audioKeywords: ["anatomy"] },
            { id: tid(), title: "Marma Sharira", description: "Vital points (Marma) in the body", audioKeywords: ["anatomy"] },
          ]},
          { id: "ba-kriya", title: "Kriya Sharira", emoji: "⚡", topics: [
            { id: tid(), title: "Dosha Vigyana", description: "Vata, Pitta, Kapha - functions & properties", audioKeywords: ["physiology"] },
            { id: tid(), title: "Dhatu & Mala", description: "Seven tissues and waste products", audioKeywords: ["physiology"] },
            { id: tid(), title: "Agni & Ama", description: "Digestive fire and toxin formation", audioKeywords: ["physiology"] },
          ]},
          { id: "ba-sans", title: "Sanskrit", emoji: "📖", topics: [
            { id: tid(), title: "Ayurvedic Sanskrit", description: "Terminology, grammar, classical texts", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
      { id: "y2", label: "2nd Year", semesters: [
        { id: "s2", label: "Phase 2", subjects: [
          { id: "ba-dravya", title: "Dravyaguna Vigyan", emoji: "🌿", topics: [
            { id: tid(), title: "Rasa Panchaka", description: "Taste, potency, post-digestive effect", audioKeywords: ["default"] },
            { id: tid(), title: "Important Medicinal Plants", description: "Ashwagandha, Brahmi, Guduchi, Tulsi", audioKeywords: ["default"] },
          ]},
          { id: "ba-rasa", title: "Rasashastra", emoji: "⚗️", topics: [
            { id: tid(), title: "Bhasma & Metals", description: "Preparation and purification of metals", audioKeywords: ["chemistry"] },
            { id: tid(), title: "Herbo-mineral Formulations", description: "Classical formulations and preparations", audioKeywords: ["default"] },
          ]},
          { id: "ba-rog", title: "Roga Vigyana", emoji: "🏥", topics: [
            { id: tid(), title: "Nidana Panchaka", description: "Five diagnostic tools in Ayurveda", audioKeywords: ["default"] },
            { id: tid(), title: "Samprapti (Pathogenesis)", description: "Disease process in Ayurvedic terms", audioKeywords: ["pathology"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ BHMS (Homoeopathy) ═══════════════
  {
    id: "bhms", label: "BHMS (Homoeopathy)", emoji: "💧", duration: "5.5 years",
    universities: [
      { id: "cch", name: "Central Council of Homoeopathy", shortName: "CCH" },
      { id: "muhs-h", name: "Maharashtra University of Health Sciences", shortName: "MUHS" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Phase 1", subjects: [
          { id: "bh-organ", title: "Organon of Medicine", emoji: "📋", topics: [
            { id: tid(), title: "Principles of Homoeopathy", description: "Law of similars, vital force, miasms", audioKeywords: ["default"] },
            { id: tid(), title: "Case Taking", description: "Totality of symptoms, individualization", audioKeywords: ["default"] },
          ]},
          { id: "bh-anat", title: "Anatomy", emoji: "🦴", topics: [
            { id: tid(), title: "Systemic Anatomy", description: "Musculoskeletal, CVS, respiratory systems", audioKeywords: ["anatomy"] },
          ]},
          { id: "bh-phys", title: "Physiology", emoji: "❤️", topics: [
            { id: tid(), title: "Human Physiology", description: "Cell, blood, CVS, respiratory physiology", audioKeywords: ["physiology"] },
          ]},
        ]},
      ]},
      { id: "y2", label: "2nd Year", semesters: [
        { id: "s2", label: "Phase 2", subjects: [
          { id: "bh-mm", title: "Materia Medica", emoji: "📚", topics: [
            { id: tid(), title: "Polychrest Remedies", description: "Key homeopathic medicines and their pictures", audioKeywords: ["default"] },
            { id: tid(), title: "Drug Relationships", description: "Complementary, inimical, antidotal remedies", audioKeywords: ["default"] },
          ]},
          { id: "bh-path", title: "Pathology", emoji: "🔬", topics: [
            { id: tid(), title: "General & Clinical Pathology", description: "Cell injury, inflammation, hematology", audioKeywords: ["pathology"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ Allied Health Sciences ═══════════════
  {
    id: "ahs", label: "Allied Health Sciences", emoji: "🏥", duration: "4 years",
    universities: [
      { id: "tnmgrmu-a", name: "TN Dr. MGR Medical University", shortName: "TNMGRMU" },
      { id: "rguhs-a", name: "Rajiv Gandhi University of Health Sciences", shortName: "RGUHS" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1", subjects: [
          { id: "ah-anat", title: "Human Anatomy", emoji: "🦴", topics: [
            { id: tid(), title: "Musculoskeletal System", description: "Bones, joints, muscles of the body", audioKeywords: ["anatomy"] },
            { id: tid(), title: "Organ Systems", description: "CVS, respiratory, GI, nervous systems", audioKeywords: ["anatomy"] },
          ]},
          { id: "ah-phys", title: "Physiology", emoji: "❤️", topics: [
            { id: tid(), title: "General & Systems Physiology", description: "Cell, blood, CVS, renal, neuro", audioKeywords: ["physiology"] },
          ]},
          { id: "ah-bioch", title: "Biochemistry", emoji: "🧪", topics: [
            { id: tid(), title: "Clinical Biochemistry", description: "Proteins, enzymes, metabolism", audioKeywords: ["biochemistry"] },
          ]},
        ]},
        { id: "s2", label: "Semester 2", subjects: [
          { id: "ah-micro", title: "Microbiology", emoji: "🦠", topics: [
            { id: tid(), title: "General & Clinical Microbiology", description: "Bacteria, viruses, infection control", audioKeywords: ["default"] },
          ]},
          { id: "ah-path", title: "Pathology", emoji: "🔬", topics: [
            { id: tid(), title: "General Pathology", description: "Cell injury, inflammation, neoplasia", audioKeywords: ["pathology"] },
          ]},
        ]},
      ]},
      { id: "y2", label: "2nd Year", semesters: [
        { id: "s3", label: "Semester 3", subjects: [
          { id: "ah-clab", title: "Clinical Laboratory", emoji: "🧫", topics: [
            { id: tid(), title: "Hematology Lab", description: "CBC, ESR, blood grouping, coagulation", audioKeywords: ["default"] },
            { id: tid(), title: "Clinical Chemistry", description: "Glucose, lipid profile, LFT, RFT", audioKeywords: ["biochemistry"] },
          ]},
          { id: "ah-radio", title: "Radiology Basics", emoji: "📡", topics: [
            { id: tid(), title: "Imaging Modalities", description: "X-ray, CT, MRI, Ultrasound basics", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ B.Sc Nursing ═══════════════
  {
    id: "nursing", label: "B.Sc Nursing", emoji: "👩‍⚕️", duration: "4 years",
    universities: [
      { id: "inc", name: "Indian Nursing Council", shortName: "INC" },
      { id: "tnmgrmu-n", name: "TN Dr. MGR Medical University", shortName: "TNMGRMU" },
      { id: "rguhs-n", name: "RGUHS Bangalore", shortName: "RGUHS" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1 & 2", subjects: [
          { id: "n-fund", title: "Fundamentals of Nursing", emoji: "📋", topics: [
            { id: tid(), title: "Nursing Process", description: "Assessment, diagnosis, planning, implementation", audioKeywords: ["default"] },
            { id: tid(), title: "Basic Procedures", description: "Vital signs, medication administration", audioKeywords: ["default"] },
          ]},
          { id: "n-anat", title: "Anatomy & Physiology", emoji: "🦴", topics: [
            { id: tid(), title: "Human Body Systems", description: "Skeletal, muscular, CVS, respiratory", audioKeywords: ["anatomy"] },
          ]},
          { id: "n-bioch", title: "Biochemistry & Nutrition", emoji: "🥗", topics: [
            { id: tid(), title: "Nutrition & Dietetics", description: "Macronutrients, micronutrients, therapeutic diets", audioKeywords: ["biochemistry"] },
          ]},
          { id: "n-micro", title: "Microbiology", emoji: "🦠", topics: [
            { id: tid(), title: "Infection Control", description: "Sterilization, hospital-acquired infections", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
      { id: "y2", label: "2nd Year", semesters: [
        { id: "s2", label: "Semester 3 & 4", subjects: [
          { id: "n-medsurg", title: "Medical-Surgical Nursing", emoji: "🏥", topics: [
            { id: tid(), title: "CVS & Respiratory Nursing", description: "Heart failure, COPD, asthma care", audioKeywords: ["default"] },
            { id: tid(), title: "GI & Renal Nursing", description: "Liver disease, kidney failure nursing", audioKeywords: ["default"] },
          ]},
          { id: "n-pharma", title: "Pharmacology", emoji: "💊", topics: [
            { id: tid(), title: "Drug Administration", description: "Routes, dosage calculations, drug interactions", audioKeywords: ["pharmacology"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ Pharmacy ═══════════════
  {
    id: "pharmacy", label: "B.Pharm / D.Pharm", emoji: "💊", duration: "4 years / 2 years",
    universities: [
      { id: "pci", name: "Pharmacy Council of India", shortName: "PCI" },
      { id: "tnmgrmu-p", name: "TN Dr. MGR Medical University", shortName: "TNMGRMU" },
      { id: "jntuh-p", name: "JNTU Hyderabad", shortName: "JNTUH" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1", subjects: [
          { id: "p-pchem", title: "Pharmaceutical Chemistry", emoji: "🧪", topics: [
            { id: tid(), title: "Inorganic Pharma Chemistry", description: "Acids, bases, buffers, gastrointestinal agents", audioKeywords: ["chemistry"] },
            { id: tid(), title: "Physical Chemistry", description: "Solutions, surface tension, viscosity", audioKeywords: ["chemistry"] },
          ]},
          { id: "p-ptics", title: "Pharmaceutics", emoji: "💊", topics: [
            { id: tid(), title: "Dosage Forms", description: "Tablets, capsules, suspensions, emulsions", audioKeywords: ["default"] },
            { id: tid(), title: "Formulation", description: "Excipients, manufacturing processes", audioKeywords: ["default"] },
          ]},
          { id: "p-anat", title: "Human Anatomy & Physiology", emoji: "🦴", topics: [
            { id: tid(), title: "Body Systems", description: "Skeletal, CVS, nervous system", audioKeywords: ["anatomy"] },
          ]},
        ]},
        { id: "s2", label: "Semester 2", subjects: [
          { id: "p-pcog", title: "Pharmacognosy", emoji: "🌿", topics: [
            { id: tid(), title: "Plant-Based Drugs", description: "Alkaloids, glycosides, tannins", audioKeywords: ["default"] },
          ]},
          { id: "p-bioch", title: "Biochemistry", emoji: "🧬", topics: [
            { id: tid(), title: "Metabolism & Enzymes", description: "Carbohydrate, protein, lipid metabolism", audioKeywords: ["biochemistry"] },
          ]},
        ]},
      ]},
      { id: "y2", label: "2nd Year", semesters: [
        { id: "s3", label: "Semester 3", subjects: [
          { id: "p-pharm", title: "Pharmacology", emoji: "💊", topics: [
            { id: tid(), title: "General Pharmacology", description: "ADME, drug interactions", audioKeywords: ["pharmacology"] },
            { id: tid(), title: "Systemic Pharmacology", description: "CVS, CNS, ANS drugs", audioKeywords: ["pharmacology"] },
          ]},
          { id: "p-micro", title: "Pharmaceutical Microbiology", emoji: "🦠", topics: [
            { id: tid(), title: "Sterilization & Aseptic Techniques", description: "Quality control in pharma", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ Engineering ═══════════════
  {
    id: "engineering", label: "Engineering (B.E/B.Tech)", emoji: "⚙️", duration: "4 years",
    universities: [
      { id: "anna", name: "Anna University", shortName: "AU" },
      { id: "vtu", name: "Visvesvaraya Technological University", shortName: "VTU" },
      { id: "jntuh", name: "JNTU Hyderabad", shortName: "JNTUH" },
      { id: "makaut", name: "Maulana Abul Kalam Azad University", shortName: "MAKAUT" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1", subjects: [
          { id: "e-math1", title: "Engineering Mathematics I", emoji: "📐", topics: [
            { id: tid(), title: "Matrices & Linear Algebra", description: "Eigenvalues, Cayley-Hamilton theorem", audioKeywords: ["mathematics"] },
            { id: tid(), title: "Differential Calculus", description: "Limits, continuity, maxima & minima", audioKeywords: ["mathematics"] },
            { id: tid(), title: "Integral Calculus", description: "Definite integrals, double & triple integrals", audioKeywords: ["mathematics"] },
          ]},
          { id: "e-phy", title: "Engineering Physics", emoji: "⚛️", topics: [
            { id: tid(), title: "Quantum Mechanics", description: "Wave-particle duality, Schrödinger equation", audioKeywords: ["physics"] },
            { id: tid(), title: "Laser & Fiber Optics", description: "Laser principles, optical fiber communication", audioKeywords: ["physics"] },
          ]},
          { id: "e-chem", title: "Engineering Chemistry", emoji: "🧪", topics: [
            { id: tid(), title: "Water Technology", description: "Hardness, treatment, desalination", audioKeywords: ["chemistry"] },
            { id: tid(), title: "Electrochemistry & Corrosion", description: "Cells, batteries, corrosion prevention", audioKeywords: ["chemistry"] },
          ]},
          { id: "e-prog", title: "Programming in C", emoji: "💻", topics: [
            { id: tid(), title: "Basics & Control Structures", description: "Variables, loops, conditions", audioKeywords: ["programming"] },
            { id: tid(), title: "Functions, Arrays & Pointers", description: "Memory, strings, file I/O", audioKeywords: ["programming"] },
          ]},
        ]},
        { id: "s2", label: "Semester 2", subjects: [
          { id: "e-math2", title: "Engineering Mathematics II", emoji: "📐", topics: [
            { id: tid(), title: "ODEs & Laplace Transforms", description: "First/second order, inverse transforms", audioKeywords: ["mathematics"] },
            { id: tid(), title: "Vector Calculus", description: "Gradient, divergence, curl, theorems", audioKeywords: ["mathematics"] },
          ]},
          { id: "e-graph", title: "Engineering Graphics", emoji: "📏", topics: [
            { id: tid(), title: "Projections", description: "Points, lines, solids, isometric views", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
      { id: "y2", label: "2nd Year", semesters: [
        { id: "s3", label: "Semester 3", subjects: [
          { id: "e-ds", title: "Data Structures", emoji: "🗂️", topics: [
            { id: tid(), title: "Arrays & Linked Lists", description: "Implementation, operations", audioKeywords: ["programming"] },
            { id: tid(), title: "Trees & Graphs", description: "BST, AVL, BFS, DFS, shortest path", audioKeywords: ["programming"] },
            { id: tid(), title: "Sorting & Searching", description: "Merge sort, quick sort, binary search", audioKeywords: ["programming"] },
          ]},
          { id: "e-dig", title: "Digital Electronics", emoji: "⚡", topics: [
            { id: tid(), title: "Boolean Algebra & Logic Gates", description: "K-maps, combinational circuits", audioKeywords: ["default"] },
            { id: tid(), title: "Sequential Circuits", description: "Flip-flops, counters, registers", audioKeywords: ["default"] },
          ]},
        ]},
        { id: "s4", label: "Semester 4", subjects: [
          { id: "e-os", title: "Operating Systems", emoji: "🖥️", topics: [
            { id: tid(), title: "Process & Memory Management", description: "Scheduling, paging, virtual memory", audioKeywords: ["programming"] },
          ]},
          { id: "e-dbms", title: "Database Management", emoji: "🗄️", topics: [
            { id: tid(), title: "SQL & Normalization", description: "ER model, joins, ACID properties", audioKeywords: ["programming"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ B.Sc (Science) ═══════════════
  {
    id: "bsc", label: "B.Sc (Science)", emoji: "🔬", duration: "3 years",
    universities: [
      { id: "mu", name: "Madras University", shortName: "MU" },
      { id: "du", name: "Delhi University", shortName: "DU" },
      { id: "bu", name: "Bharathiar University", shortName: "BU" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1", subjects: [
          { id: "sc-phy", title: "Physics", emoji: "⚛️", topics: [
            { id: tid(), title: "Mechanics", description: "Newton's laws, rotational dynamics, gravitation", audioKeywords: ["physics"] },
            { id: tid(), title: "Waves & Optics", description: "Wave motion, interference, diffraction", audioKeywords: ["physics"] },
          ]},
          { id: "sc-chem", title: "Chemistry", emoji: "🧪", topics: [
            { id: tid(), title: "Inorganic Chemistry", description: "Periodic properties, chemical bonding", audioKeywords: ["chemistry"] },
            { id: tid(), title: "Organic Chemistry", description: "Hydrocarbons, functional groups, reactions", audioKeywords: ["chemistry"] },
          ]},
          { id: "sc-math", title: "Mathematics", emoji: "📐", topics: [
            { id: tid(), title: "Calculus", description: "Differential & integral calculus", audioKeywords: ["mathematics"] },
            { id: tid(), title: "Algebra", description: "Groups, rings, vector spaces", audioKeywords: ["mathematics"] },
          ]},
        ]},
        { id: "s2", label: "Semester 2", subjects: [
          { id: "sc-bio", title: "Biology / Zoology", emoji: "🧬", topics: [
            { id: tid(), title: "Cell Biology", description: "Cell structure, organelles, cell division", audioKeywords: ["default"] },
            { id: tid(), title: "Genetics", description: "Mendel's laws, DNA, gene expression", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ B.A (Arts) ═══════════════
  {
    id: "ba", label: "B.A (Arts)", emoji: "🎨", duration: "3 years",
    universities: [
      { id: "du-a", name: "Delhi University", shortName: "DU" },
      { id: "mu-a", name: "Madras University", shortName: "MU" },
      { id: "pu", name: "Pune University", shortName: "SPPU" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1", subjects: [
          { id: "a-eng", title: "English Literature", emoji: "📜", topics: [
            { id: tid(), title: "Poetry & Prose", description: "Shakespeare, Romantic poets, modern prose", audioKeywords: ["default"] },
            { id: tid(), title: "Literary Theory", description: "Criticism, formalism, structuralism", audioKeywords: ["default"] },
          ]},
          { id: "a-hist", title: "History", emoji: "🏛️", topics: [
            { id: tid(), title: "Ancient India", description: "Indus Valley, Vedic period, Mauryas, Guptas", audioKeywords: ["default"] },
            { id: tid(), title: "Medieval India", description: "Delhi Sultanate, Mughal Empire", audioKeywords: ["default"] },
          ]},
          { id: "a-eco", title: "Economics", emoji: "📊", topics: [
            { id: tid(), title: "Microeconomics", description: "Demand, supply, market equilibrium", audioKeywords: ["default"] },
            { id: tid(), title: "Indian Economy", description: "Agriculture, industry, economic reforms", audioKeywords: ["default"] },
          ]},
        ]},
        { id: "s2", label: "Semester 2", subjects: [
          { id: "a-polsci", title: "Political Science", emoji: "⚖️", topics: [
            { id: tid(), title: "Indian Constitution", description: "Fundamental rights, DPSP, Parliament", audioKeywords: ["default"] },
            { id: tid(), title: "Political Theory", description: "Democracy, liberty, equality, justice", audioKeywords: ["default"] },
          ]},
          { id: "a-psych", title: "Psychology", emoji: "🧠", topics: [
            { id: tid(), title: "Introduction to Psychology", description: "Perception, learning, memory, motivation", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ B.Com (Commerce) ═══════════════
  {
    id: "bcom", label: "B.Com (Commerce)", emoji: "💰", duration: "3 years",
    universities: [
      { id: "du-c", name: "Delhi University", shortName: "DU" },
      { id: "mu-c", name: "Madras University", shortName: "MU" },
      { id: "ou", name: "Osmania University", shortName: "OU" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1", subjects: [
          { id: "c-acc", title: "Financial Accounting", emoji: "📒", topics: [
            { id: tid(), title: "Journal & Ledger", description: "Double entry, trial balance, final accounts", audioKeywords: ["default"] },
            { id: tid(), title: "Depreciation & Provisions", description: "Methods, reserve fund, bad debts", audioKeywords: ["default"] },
          ]},
          { id: "c-blaw", title: "Business Law", emoji: "⚖️", topics: [
            { id: tid(), title: "Indian Contract Act", description: "Offer, acceptance, consideration, breach", audioKeywords: ["default"] },
            { id: tid(), title: "Sale of Goods Act", description: "Transfer of property, warranties", audioKeywords: ["default"] },
          ]},
          { id: "c-eco", title: "Business Economics", emoji: "📊", topics: [
            { id: tid(), title: "Demand & Supply Analysis", description: "Elasticity, market structures", audioKeywords: ["default"] },
          ]},
        ]},
        { id: "s2", label: "Semester 2", subjects: [
          { id: "c-cost", title: "Cost Accounting", emoji: "💹", topics: [
            { id: tid(), title: "Cost Classification", description: "Direct, indirect, fixed, variable costs", audioKeywords: ["default"] },
            { id: tid(), title: "Budgeting", description: "Budget types, variance analysis", audioKeywords: ["default"] },
          ]},
          { id: "c-tax", title: "Taxation", emoji: "🏦", topics: [
            { id: tid(), title: "Income Tax Basics", description: "Heads of income, deductions, filing", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ Law (LLB) ═══════════════
  {
    id: "llb", label: "Law (LLB / BA LLB)", emoji: "⚖️", duration: "3 / 5 years",
    universities: [
      { id: "bci", name: "Bar Council of India", shortName: "BCI" },
      { id: "nlu", name: "National Law University", shortName: "NLU" },
      { id: "du-l", name: "Delhi University (Faculty of Law)", shortName: "DU" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1", subjects: [
          { id: "l-juris", title: "Jurisprudence", emoji: "📜", topics: [
            { id: tid(), title: "Nature of Law", description: "Schools of jurisprudence, sources of law", audioKeywords: ["default"] },
            { id: tid(), title: "Rights & Duties", description: "Legal rights, obligations, ownership", audioKeywords: ["default"] },
          ]},
          { id: "l-const", title: "Constitutional Law", emoji: "🏛️", topics: [
            { id: tid(), title: "Fundamental Rights", description: "Articles 14-32, judicial review", audioKeywords: ["default"] },
            { id: tid(), title: "Union & State", description: "Parliament, state legislatures, federalism", audioKeywords: ["default"] },
          ]},
          { id: "l-contract", title: "Law of Contract", emoji: "📝", topics: [
            { id: tid(), title: "Formation of Contract", description: "Offer, acceptance, consideration, capacity", audioKeywords: ["default"] },
            { id: tid(), title: "Breach & Remedies", description: "Damages, specific performance, injunction", audioKeywords: ["default"] },
          ]},
        ]},
        { id: "s2", label: "Semester 2", subjects: [
          { id: "l-tort", title: "Law of Torts", emoji: "⚖️", topics: [
            { id: tid(), title: "Negligence & Strict Liability", description: "Duty of care, damages, defenses", audioKeywords: ["default"] },
          ]},
          { id: "l-crim", title: "Criminal Law (IPC)", emoji: "🔒", topics: [
            { id: tid(), title: "General Exceptions", description: "Sections 76-106, right of private defense", audioKeywords: ["default"] },
            { id: tid(), title: "Offences Against Body", description: "Murder, culpable homicide, hurt, kidnapping", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ MBA ═══════════════
  {
    id: "mba", label: "MBA", emoji: "💼", duration: "2 years",
    universities: [
      { id: "aicte", name: "AICTE Approved", shortName: "AICTE" },
      { id: "au-mba", name: "Anna University", shortName: "AU" },
      { id: "mu-mba", name: "Madras University", shortName: "MU" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1", subjects: [
          { id: "mb-mgmt", title: "Principles of Management", emoji: "📋", topics: [
            { id: tid(), title: "Planning & Organizing", description: "Strategic planning, organizational structure", audioKeywords: ["default"] },
            { id: tid(), title: "Leadership & Control", description: "Leadership styles, performance metrics", audioKeywords: ["default"] },
          ]},
          { id: "mb-acc", title: "Accounting for Managers", emoji: "📒", topics: [
            { id: tid(), title: "Financial Statements", description: "Balance sheet, P&L, cash flow analysis", audioKeywords: ["default"] },
          ]},
          { id: "mb-eco", title: "Managerial Economics", emoji: "📊", topics: [
            { id: tid(), title: "Demand & Cost Analysis", description: "Elasticity, production function, pricing", audioKeywords: ["default"] },
          ]},
          { id: "mb-ob", title: "Organizational Behavior", emoji: "👥", topics: [
            { id: tid(), title: "Individual & Group Behavior", description: "Motivation, team dynamics, conflict", audioKeywords: ["default"] },
          ]},
        ]},
        { id: "s2", label: "Semester 2", subjects: [
          { id: "mb-mkt", title: "Marketing Management", emoji: "📢", topics: [
            { id: tid(), title: "Marketing Mix & Strategy", description: "4Ps, segmentation, targeting, positioning", audioKeywords: ["default"] },
          ]},
          { id: "mb-fin", title: "Financial Management", emoji: "💰", topics: [
            { id: tid(), title: "Capital Budgeting", description: "NPV, IRR, payback period", audioKeywords: ["default"] },
          ]},
          { id: "mb-hr", title: "Human Resource Management", emoji: "👥", topics: [
            { id: tid(), title: "Recruitment & Training", description: "Selection process, training methods, appraisal", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
    ],
  },

  // ═══════════════ B.Ed ═══════════════
  {
    id: "bed", label: "B.Ed", emoji: "👩‍🏫", duration: "2 years",
    universities: [
      { id: "ncte", name: "NCTE Approved", shortName: "NCTE" },
      { id: "bu-bed", name: "Bharathiar University", shortName: "BU" },
    ],
    years: [
      { id: "y1", label: "1st Year", semesters: [
        { id: "s1", label: "Semester 1 & 2", subjects: [
          { id: "ed-ped", title: "Pedagogy", emoji: "📚", topics: [
            { id: tid(), title: "Teaching Principles", description: "Bloom's taxonomy, lesson planning", audioKeywords: ["default"] },
            { id: tid(), title: "Curriculum Development", description: "Syllabus design, assessment methods", audioKeywords: ["default"] },
          ]},
          { id: "ed-psy", title: "Educational Psychology", emoji: "🧒", topics: [
            { id: tid(), title: "Child Development", description: "Piaget, Vygotsky, learning theories", audioKeywords: ["default"] },
            { id: tid(), title: "Motivation & Learning", description: "Intrinsic/extrinsic motivation, memory", audioKeywords: ["default"] },
          ]},
          { id: "ed-tech", title: "Educational Technology", emoji: "💻", topics: [
            { id: tid(), title: "ICT in Education", description: "E-learning, smart classrooms, EdTech tools", audioKeywords: ["default"] },
          ]},
        ]},
      ]},
    ],
  },
];
