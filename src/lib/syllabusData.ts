// Syllabus data organized by course → university/board → year → semester → subjects → topics

export interface Topic {
  id: string;
  title: string;
  description: string;
  audioKeywords: string[]; // keywords for sleep audio mapping
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

// Audio profile mapping for sleep revision
export const topicAudioMap: Record<string, string> = {
  anatomy: "nature",
  physiology: "ocean",
  biochemistry: "rain",
  pathology: "whitenoise",
  pharmacology: "nature",
  mathematics: "whitenoise",
  programming: "rain",
  physics: "ocean",
  chemistry: "rain",
  default: "nature",
};

export function getAudioProfileForTopic(keywords: string[]): string {
  for (const kw of keywords) {
    const match = topicAudioMap[kw.toLowerCase()];
    if (match) return match;
  }
  return topicAudioMap.default;
}

export const syllabusCourses: SyllabusCourse[] = [
  {
    id: "bds",
    label: "Dental (BDS)",
    emoji: "🦷",
    duration: "5 years",
    universities: [
      { id: "tndrhsu", name: "TN Dr. MGR Medical University", shortName: "TNMGRMU" },
      { id: "rguhs", name: "Rajiv Gandhi University of Health Sciences", shortName: "RGUHS" },
      { id: "muhs", name: "Maharashtra University of Health Sciences", shortName: "MUHS" },
    ],
    years: [
      {
        id: "y1",
        label: "1st Year",
        semesters: [
          {
            id: "s1",
            label: "Semester 1",
            subjects: [
              {
                id: "gen-anatomy",
                title: "General Anatomy",
                emoji: "🦴",
                topics: [
                  { id: "ga1", title: "Introduction to Anatomy", description: "Basic anatomical terminology, planes, and positions", audioKeywords: ["anatomy"] },
                  { id: "ga2", title: "Upper Limb", description: "Bones, muscles, nerves and vessels of the upper limb", audioKeywords: ["anatomy"] },
                  { id: "ga3", title: "Lower Limb", description: "Bones, muscles, nerves and vessels of the lower limb", audioKeywords: ["anatomy"] },
                  { id: "ga4", title: "Thorax", description: "Thoracic cage, lungs, heart and mediastinum", audioKeywords: ["anatomy"] },
                  { id: "ga5", title: "Abdomen", description: "Abdominal wall, GI tract, liver, spleen, kidneys", audioKeywords: ["anatomy"] },
                ],
              },
              {
                id: "gen-physiology",
                title: "General Physiology",
                emoji: "❤️",
                topics: [
                  { id: "gp1", title: "Cell Physiology", description: "Cell membrane, transport mechanisms, cell signaling", audioKeywords: ["physiology"] },
                  { id: "gp2", title: "Blood", description: "Composition, blood groups, hemostasis, immunity", audioKeywords: ["physiology"] },
                  { id: "gp3", title: "Cardiovascular System", description: "Heart, cardiac cycle, blood pressure regulation", audioKeywords: ["physiology"] },
                  { id: "gp4", title: "Respiratory System", description: "Mechanics of breathing, gas exchange, regulation", audioKeywords: ["physiology"] },
                ],
              },
              {
                id: "gen-biochem",
                title: "Biochemistry",
                emoji: "🧪",
                topics: [
                  { id: "gb1", title: "Amino Acids & Proteins", description: "Structure, classification, properties of amino acids and proteins", audioKeywords: ["biochemistry"] },
                  { id: "gb2", title: "Enzymes", description: "Enzyme kinetics, classification, clinical significance", audioKeywords: ["biochemistry"] },
                  { id: "gb3", title: "Carbohydrate Metabolism", description: "Glycolysis, TCA cycle, gluconeogenesis", audioKeywords: ["biochemistry"] },
                  { id: "gb4", title: "Lipid Metabolism", description: "Fatty acid oxidation, cholesterol synthesis", audioKeywords: ["biochemistry"] },
                ],
              },
            ],
          },
          {
            id: "s2",
            label: "Semester 2",
            subjects: [
              {
                id: "dental-anatomy",
                title: "Dental Anatomy & Histology",
                emoji: "🦷",
                topics: [
                  { id: "da1", title: "Tooth Morphology", description: "Nomenclature, morphology of deciduous and permanent teeth", audioKeywords: ["anatomy"] },
                  { id: "da2", title: "Dental Histology", description: "Enamel, dentin, pulp, cementum, periodontal ligament", audioKeywords: ["anatomy"] },
                  { id: "da3", title: "Oral Histology", description: "Oral mucosa, salivary glands, TMJ", audioKeywords: ["anatomy"] },
                  { id: "da4", title: "Tooth Development", description: "Odontogenesis, eruption and shedding of teeth", audioKeywords: ["anatomy"] },
                ],
              },
              {
                id: "dental-materials",
                title: "Dental Materials",
                emoji: "🔧",
                topics: [
                  { id: "dm1", title: "Impression Materials", description: "Alginate, elastomers, impression compound", audioKeywords: ["default"] },
                  { id: "dm2", title: "Gypsum Products", description: "Dental plaster, dental stone, die stone", audioKeywords: ["default"] },
                  { id: "dm3", title: "Restorative Materials", description: "Amalgam, composite resins, glass ionomer cement", audioKeywords: ["default"] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "y2",
        label: "2nd Year",
        semesters: [
          {
            id: "s3",
            label: "Semester 3",
            subjects: [
              {
                id: "gen-pathology",
                title: "General Pathology",
                emoji: "🔬",
                topics: [
                  { id: "pa1", title: "Cell Injury & Death", description: "Causes, mechanisms of cell injury, necrosis, apoptosis", audioKeywords: ["pathology"] },
                  { id: "pa2", title: "Inflammation", description: "Acute and chronic inflammation, mediators, repair", audioKeywords: ["pathology"] },
                  { id: "pa3", title: "Hemodynamic Disorders", description: "Edema, thrombosis, embolism, shock", audioKeywords: ["pathology"] },
                  { id: "pa4", title: "Neoplasia", description: "Benign vs malignant tumors, grading, staging", audioKeywords: ["pathology"] },
                ],
              },
              {
                id: "gen-microbiology",
                title: "Microbiology",
                emoji: "🦠",
                topics: [
                  { id: "mi1", title: "General Bacteriology", description: "Bacterial structure, classification, sterilization", audioKeywords: ["default"] },
                  { id: "mi2", title: "Immunology", description: "Innate and adaptive immunity, hypersensitivity", audioKeywords: ["default"] },
                  { id: "mi3", title: "Oral Microbiology", description: "Dental caries, periodontal disease microbiology", audioKeywords: ["default"] },
                ],
              },
              {
                id: "gen-pharmacology",
                title: "Pharmacology",
                emoji: "💊",
                topics: [
                  { id: "ph1", title: "General Pharmacology", description: "Drug absorption, distribution, metabolism, excretion", audioKeywords: ["pharmacology"] },
                  { id: "ph2", title: "ANS Pharmacology", description: "Cholinergic and adrenergic drugs", audioKeywords: ["pharmacology"] },
                  { id: "ph3", title: "Analgesics & Anti-inflammatories", description: "NSAIDs, opioids, local anesthetics", audioKeywords: ["pharmacology"] },
                  { id: "ph4", title: "Antimicrobials", description: "Antibiotics, antifungals, antivirals", audioKeywords: ["pharmacology"] },
                ],
              },
            ],
          },
          {
            id: "s4",
            label: "Semester 4",
            subjects: [
              {
                id: "oral-pathology",
                title: "Oral Pathology",
                emoji: "🔬",
                topics: [
                  { id: "op1", title: "Developmental Disorders", description: "Developmental anomalies of teeth and oral structures", audioKeywords: ["pathology"] },
                  { id: "op2", title: "Dental Caries", description: "Etiology, pathogenesis, histopathology of dental caries", audioKeywords: ["pathology"] },
                  { id: "op3", title: "Pulp & Periapical Diseases", description: "Pulpitis, periapical abscess, granuloma, cyst", audioKeywords: ["pathology"] },
                  { id: "op4", title: "Oral Tumors", description: "Benign and malignant tumors of the oral cavity", audioKeywords: ["pathology"] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "y3",
        label: "3rd Year",
        semesters: [
          {
            id: "s5",
            label: "Semester 5",
            subjects: [
              {
                id: "conservative",
                title: "Conservative Dentistry",
                emoji: "🪥",
                topics: [
                  { id: "cd1", title: "Cavity Preparation", description: "Principles of cavity preparation, classification", audioKeywords: ["default"] },
                  { id: "cd2", title: "Direct Restorations", description: "Amalgam and composite restorations", audioKeywords: ["default"] },
                  { id: "cd3", title: "Endodontics Basics", description: "Pulp biology, access cavity, working length", audioKeywords: ["default"] },
                ],
              },
              {
                id: "prosthodontics",
                title: "Prosthodontics",
                emoji: "🦷",
                topics: [
                  { id: "pr1", title: "Complete Dentures", description: "Impression, jaw relations, try-in, insertion", audioKeywords: ["default"] },
                  { id: "pr2", title: "Removable Partial Dentures", description: "Classification, components, design principles", audioKeywords: ["default"] },
                  { id: "pr3", title: "Fixed Prosthodontics", description: "Crown and bridge preparations, cementation", audioKeywords: ["default"] },
                ],
              },
            ],
          },
          {
            id: "s6",
            label: "Semester 6",
            subjects: [
              {
                id: "periodontics",
                title: "Periodontics",
                emoji: "🩺",
                topics: [
                  { id: "pe1", title: "Periodontal Anatomy", description: "Gingiva, PDL, alveolar bone, cementum", audioKeywords: ["anatomy"] },
                  { id: "pe2", title: "Periodontal Diseases", description: "Gingivitis, periodontitis classification", audioKeywords: ["pathology"] },
                  { id: "pe3", title: "Scaling & Root Planing", description: "Non-surgical periodontal therapy", audioKeywords: ["default"] },
                ],
              },
              {
                id: "orthodontics",
                title: "Orthodontics",
                emoji: "😁",
                topics: [
                  { id: "or1", title: "Growth & Development", description: "Craniofacial growth, theories of growth", audioKeywords: ["anatomy"] },
                  { id: "or2", title: "Malocclusion", description: "Angle's classification, etiology of malocclusion", audioKeywords: ["default"] },
                  { id: "or3", title: "Orthodontic Appliances", description: "Fixed and removable appliances", audioKeywords: ["default"] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "y4",
        label: "4th Year (Final)",
        semesters: [
          {
            id: "s7",
            label: "Semester 7",
            subjects: [
              {
                id: "oral-surgery",
                title: "Oral Surgery",
                emoji: "🏥",
                topics: [
                  { id: "os1", title: "Exodontia", description: "Principles of tooth extraction, forceps, elevators", audioKeywords: ["default"] },
                  { id: "os2", title: "Impacted Teeth", description: "Classification, surgical removal of impacted teeth", audioKeywords: ["default"] },
                  { id: "os3", title: "Maxillofacial Trauma", description: "Fractures of mandible, maxilla, zygomatic complex", audioKeywords: ["default"] },
                ],
              },
              {
                id: "pedodontics",
                title: "Pedodontics",
                emoji: "👶",
                topics: [
                  { id: "pd1", title: "Child Psychology", description: "Behavior management techniques in children", audioKeywords: ["default"] },
                  { id: "pd2", title: "Preventive Dentistry", description: "Fluorides, pit and fissure sealants, diet counseling", audioKeywords: ["default"] },
                  { id: "pd3", title: "Pulp Therapy in Children", description: "Pulpotomy, pulpectomy in primary teeth", audioKeywords: ["default"] },
                ],
              },
            ],
          },
          {
            id: "s8",
            label: "Semester 8",
            subjects: [
              {
                id: "community-dentistry",
                title: "Community Dentistry",
                emoji: "🏘️",
                topics: [
                  { id: "co1", title: "Epidemiology", description: "Indices, survey methods, disease measurement", audioKeywords: ["default"] },
                  { id: "co2", title: "Public Health Dentistry", description: "National oral health programs, fluoridation", audioKeywords: ["default"] },
                ],
              },
              {
                id: "oral-medicine",
                title: "Oral Medicine & Radiology",
                emoji: "📡",
                topics: [
                  { id: "om1", title: "Oral Mucosal Lesions", description: "White lesions, red lesions, vesiculobullous diseases", audioKeywords: ["pathology"] },
                  { id: "om2", title: "Dental Radiography", description: "Intraoral and extraoral radiographic techniques", audioKeywords: ["default"] },
                  { id: "om3", title: "TMJ Disorders", description: "TMJ dysfunction, internal derangement", audioKeywords: ["default"] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering (B.E/B.Tech)",
    emoji: "⚙️",
    duration: "4 years",
    universities: [
      { id: "anna", name: "Anna University", shortName: "AU" },
      { id: "vtu", name: "Visvesvaraya Technological University", shortName: "VTU" },
      { id: "jntu", name: "JNTU Hyderabad", shortName: "JNTUH" },
    ],
    years: [
      {
        id: "y1",
        label: "1st Year",
        semesters: [
          {
            id: "s1",
            label: "Semester 1",
            subjects: [
              {
                id: "eng-maths1",
                title: "Engineering Mathematics I",
                emoji: "📐",
                topics: [
                  { id: "em1", title: "Matrices & Linear Algebra", description: "Matrix operations, eigenvalues, Cayley-Hamilton theorem", audioKeywords: ["mathematics"] },
                  { id: "em2", title: "Differential Calculus", description: "Limits, continuity, differentiation, maxima & minima", audioKeywords: ["mathematics"] },
                  { id: "em3", title: "Integral Calculus", description: "Definite integrals, double and triple integrals", audioKeywords: ["mathematics"] },
                  { id: "em4", title: "Analytic Geometry", description: "Conic sections, 3D geometry", audioKeywords: ["mathematics"] },
                ],
              },
              {
                id: "eng-physics",
                title: "Engineering Physics",
                emoji: "⚛️",
                topics: [
                  { id: "ep1", title: "Quantum Mechanics", description: "Wave-particle duality, Schrödinger equation", audioKeywords: ["physics"] },
                  { id: "ep2", title: "Crystal Physics", description: "Crystal systems, Miller indices, X-ray diffraction", audioKeywords: ["physics"] },
                  { id: "ep3", title: "Laser & Fiber Optics", description: "Principles of laser, types, optical fiber communication", audioKeywords: ["physics"] },
                ],
              },
              {
                id: "eng-chemistry",
                title: "Engineering Chemistry",
                emoji: "🧪",
                topics: [
                  { id: "ec1", title: "Water Technology", description: "Hardness, treatment methods, desalination", audioKeywords: ["chemistry"] },
                  { id: "ec2", title: "Polymers", description: "Types, polymerization, applications", audioKeywords: ["chemistry"] },
                  { id: "ec3", title: "Electrochemistry", description: "Electrochemical cells, corrosion, batteries", audioKeywords: ["chemistry"] },
                ],
              },
              {
                id: "eng-programming",
                title: "Programming in C",
                emoji: "💻",
                topics: [
                  { id: "pc1", title: "Basics & Control Structures", description: "Variables, data types, loops, conditions", audioKeywords: ["programming"] },
                  { id: "pc2", title: "Functions & Arrays", description: "Function declaration, arrays, strings", audioKeywords: ["programming"] },
                  { id: "pc3", title: "Pointers & Structures", description: "Pointer arithmetic, structures, file I/O", audioKeywords: ["programming"] },
                ],
              },
            ],
          },
          {
            id: "s2",
            label: "Semester 2",
            subjects: [
              {
                id: "eng-maths2",
                title: "Engineering Mathematics II",
                emoji: "📐",
                topics: [
                  { id: "em5", title: "Ordinary Differential Equations", description: "First and second order ODEs, applications", audioKeywords: ["mathematics"] },
                  { id: "em6", title: "Laplace Transforms", description: "Properties, inverse transforms, applications", audioKeywords: ["mathematics"] },
                  { id: "em7", title: "Vector Calculus", description: "Gradient, divergence, curl, Green's and Stokes' theorems", audioKeywords: ["mathematics"] },
                ],
              },
              {
                id: "eng-graphics",
                title: "Engineering Graphics",
                emoji: "📏",
                topics: [
                  { id: "eg1", title: "Projection of Points & Lines", description: "Orthographic projections, auxiliary views", audioKeywords: ["default"] },
                  { id: "eg2", title: "Projection of Solids", description: "Prism, pyramid, cylinder, cone projections", audioKeywords: ["default"] },
                  { id: "eg3", title: "Isometric Projections", description: "Isometric drawing of simple solids", audioKeywords: ["default"] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "y2",
        label: "2nd Year",
        semesters: [
          {
            id: "s3",
            label: "Semester 3",
            subjects: [
              {
                id: "data-structures",
                title: "Data Structures",
                emoji: "🗂️",
                topics: [
                  { id: "ds1", title: "Arrays & Linked Lists", description: "Implementation, operations, applications", audioKeywords: ["programming"] },
                  { id: "ds2", title: "Stacks & Queues", description: "Implementation, applications, expression evaluation", audioKeywords: ["programming"] },
                  { id: "ds3", title: "Trees", description: "Binary trees, BST, AVL trees, traversals", audioKeywords: ["programming"] },
                  { id: "ds4", title: "Graphs", description: "Representations, BFS, DFS, shortest path", audioKeywords: ["programming"] },
                  { id: "ds5", title: "Sorting & Searching", description: "Bubble, merge, quick sort, binary search", audioKeywords: ["programming"] },
                ],
              },
              {
                id: "digital-electronics",
                title: "Digital Electronics",
                emoji: "⚡",
                topics: [
                  { id: "de1", title: "Number Systems & Boolean Algebra", description: "Binary, octal, hex, logic gates, K-maps", audioKeywords: ["default"] },
                  { id: "de2", title: "Combinational Circuits", description: "Adders, multiplexers, decoders, encoders", audioKeywords: ["default"] },
                  { id: "de3", title: "Sequential Circuits", description: "Flip-flops, counters, shift registers", audioKeywords: ["default"] },
                ],
              },
            ],
          },
          {
            id: "s4",
            label: "Semester 4",
            subjects: [
              {
                id: "os",
                title: "Operating Systems",
                emoji: "🖥️",
                topics: [
                  { id: "os1", title: "Process Management", description: "Process states, scheduling algorithms, threads", audioKeywords: ["programming"] },
                  { id: "os2", title: "Memory Management", description: "Paging, segmentation, virtual memory", audioKeywords: ["programming"] },
                  { id: "os3", title: "File Systems", description: "File organization, directory structures, disk scheduling", audioKeywords: ["programming"] },
                ],
              },
              {
                id: "dbms",
                title: "Database Management Systems",
                emoji: "🗄️",
                topics: [
                  { id: "db1", title: "ER Model & Relational Model", description: "Entity-relationship diagrams, normalization", audioKeywords: ["programming"] },
                  { id: "db2", title: "SQL", description: "DDL, DML, joins, subqueries, views", audioKeywords: ["programming"] },
                  { id: "db3", title: "Transactions & Concurrency", description: "ACID properties, locking, deadlocks", audioKeywords: ["programming"] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mbbs",
    label: "MBBS",
    emoji: "🩺",
    duration: "5.5 years",
    universities: [
      { id: "nmc", name: "National Medical Commission", shortName: "NMC" },
      { id: "tndrhsu-med", name: "TN Dr. MGR Medical University", shortName: "TNMGRMU" },
      { id: "rguhs-med", name: "Rajiv Gandhi University of Health Sciences", shortName: "RGUHS" },
    ],
    years: [
      {
        id: "y1",
        label: "1st Year",
        semesters: [
          {
            id: "s1",
            label: "Phase 1",
            subjects: [
              {
                id: "mbbs-anatomy",
                title: "Anatomy",
                emoji: "🦴",
                topics: [
                  { id: "ma1", title: "General Anatomy", description: "Anatomical terminology, tissue types, embryology basics", audioKeywords: ["anatomy"] },
                  { id: "ma2", title: "Upper Limb & Thorax", description: "Muscles, nerves, vessels of upper limb and thorax", audioKeywords: ["anatomy"] },
                  { id: "ma3", title: "Lower Limb & Abdomen", description: "Muscles, nerves, vessels of lower limb and abdomen", audioKeywords: ["anatomy"] },
                  { id: "ma4", title: "Head & Neck", description: "Cranial nerves, neck triangles, face anatomy", audioKeywords: ["anatomy"] },
                  { id: "ma5", title: "Neuroanatomy", description: "Brain, spinal cord, cranial nerves pathways", audioKeywords: ["anatomy"] },
                ],
              },
              {
                id: "mbbs-physiology",
                title: "Physiology",
                emoji: "❤️",
                topics: [
                  { id: "mp1", title: "General Physiology", description: "Cell membrane, transport, body fluids", audioKeywords: ["physiology"] },
                  { id: "mp2", title: "Blood & Cardiovascular", description: "Blood composition, cardiac cycle, ECG", audioKeywords: ["physiology"] },
                  { id: "mp3", title: "Respiratory & Renal", description: "Lung volumes, gas transport, kidney function", audioKeywords: ["physiology"] },
                  { id: "mp4", title: "Neurophysiology", description: "Nerve conduction, synaptic transmission, reflexes", audioKeywords: ["physiology"] },
                ],
              },
              {
                id: "mbbs-biochem",
                title: "Biochemistry",
                emoji: "🧬",
                topics: [
                  { id: "mb1", title: "Proteins & Enzymes", description: "Amino acids, protein structure, enzyme kinetics", audioKeywords: ["biochemistry"] },
                  { id: "mb2", title: "Carbohydrate & Lipid Metabolism", description: "Glycolysis, TCA, beta-oxidation, ketogenesis", audioKeywords: ["biochemistry"] },
                  { id: "mb3", title: "Molecular Biology", description: "DNA replication, transcription, translation, mutations", audioKeywords: ["biochemistry"] },
                  { id: "mb4", title: "Clinical Biochemistry", description: "Liver function tests, renal function tests, hormones", audioKeywords: ["biochemistry"] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "y2",
        label: "2nd Year",
        semesters: [
          {
            id: "s2",
            label: "Phase 2",
            subjects: [
              {
                id: "mbbs-pathology",
                title: "Pathology",
                emoji: "🔬",
                topics: [
                  { id: "mpa1", title: "Cell Injury & Inflammation", description: "Necrosis, apoptosis, acute and chronic inflammation", audioKeywords: ["pathology"] },
                  { id: "mpa2", title: "Hematology", description: "Anemias, leukemias, bleeding disorders", audioKeywords: ["pathology"] },
                  { id: "mpa3", title: "Systemic Pathology", description: "CVS, respiratory, GI, renal pathology", audioKeywords: ["pathology"] },
                ],
              },
              {
                id: "mbbs-pharmacology",
                title: "Pharmacology",
                emoji: "💊",
                topics: [
                  { id: "mpr1", title: "General Pharmacology", description: "Pharmacokinetics, pharmacodynamics, drug interactions", audioKeywords: ["pharmacology"] },
                  { id: "mpr2", title: "Autonomic Pharmacology", description: "Cholinergic, anticholinergic, adrenergic drugs", audioKeywords: ["pharmacology"] },
                  { id: "mpr3", title: "Chemotherapy", description: "Antibiotics, antifungals, antimalarials, anti-TB drugs", audioKeywords: ["pharmacology"] },
                ],
              },
              {
                id: "mbbs-micro",
                title: "Microbiology",
                emoji: "🦠",
                topics: [
                  { id: "mm1", title: "General Bacteriology", description: "Bacterial morphology, culture, sterilization", audioKeywords: ["default"] },
                  { id: "mm2", title: "Systematic Bacteriology", description: "Staphylococci, Streptococci, E. coli, Mycobacteria", audioKeywords: ["default"] },
                  { id: "mm3", title: "Virology & Parasitology", description: "HIV, Hepatitis, malaria, helminths", audioKeywords: ["default"] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
