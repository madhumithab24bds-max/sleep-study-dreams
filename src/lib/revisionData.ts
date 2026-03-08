// Revision content (flashcard-style) for each subject
export interface RevisionItem {
  front: string;
  back: string;
}

export const revisionBySubject: Record<string, RevisionItem[]> = {
  "Alphabets (A-Z)": [
    { front: "A", back: "🍎 Apple" }, { front: "B", back: "🏀 Ball" }, { front: "C", back: "🐱 Cat" },
    { front: "D", back: "🐶 Dog" }, { front: "E", back: "🐘 Elephant" }, { front: "F", back: "🐸 Frog" },
  ],
  "Numbers (1-10)": [
    { front: "1", back: "One ☝️" }, { front: "2", back: "Two ✌️" }, { front: "3", back: "Three 🤟" },
    { front: "4", back: "Four 🍀" }, { front: "5", back: "Five 🖐️" }, { front: "6", back: "Six 🎲" },
  ],
  "Colors & Shapes": [
    { front: "🔴", back: "Red" }, { front: "🟢", back: "Green" }, { front: "🔵", back: "Blue" },
    { front: "⬛", back: "Square – 4 sides" }, { front: "🔺", back: "Triangle – 3 sides" }, { front: "⚪", back: "Circle – 0 corners" },
  ],
  "Rhymes & Songs": [
    { front: "Twinkle Twinkle", back: "Little Star ⭐" }, { front: "Jack and Jill", back: "Went up the hill 🏔️" },
    { front: "Baa Baa", back: "Black Sheep 🐑" }, { front: "Humpty Dumpty", back: "Sat on a wall 🧱" },
  ],
  "Tamil Letters": [
    { front: "அ", back: "First vowel" }, { front: "ஆ", back: "Second vowel (long A)" },
    { front: "க", back: "First consonant (ka)" }, { front: "ங", back: "Nasal (nga)" },
    { front: "ச", back: "Sa/Cha sound" }, { front: "ந", back: "Dental na" },
  ],
  "English Words": [
    { front: "Cat", back: "A small furry pet 🐱" }, { front: "Sun", back: "The star that gives light ☀️" },
    { front: "Book", back: "Pages with words 📖" }, { front: "Tree", back: "Tall plant with leaves 🌳" },
  ],
  "Basic Math": [
    { front: "5 + 3 = ?", back: "8" }, { front: "10 - 4 = ?", back: "6" },
    { front: "3 × 3 = ?", back: "9" }, { front: "12 ÷ 4 = ?", back: "3" },
  ],
  "EVS Basics": [
    { front: "What do plants need?", back: "Sunlight, Water, Air 🌱" },
    { front: "Which animal gives eggs?", back: "Hen 🐔" },
    { front: "3 states of water?", back: "Solid, Liquid, Gas 💧" },
  ],
  "Tamil": [
    { front: "நீர் = ?", back: "Water 💧" }, { front: "தீ = ?", back: "Fire 🔥" },
    { front: "காற்று = ?", back: "Wind 🌬️" }, { front: "மண் = ?", back: "Earth/Soil 🌍" },
    { front: "Thirukkural author?", back: "Thiruvalluvar" },
  ],
  "English": [
    { front: "Noun", back: "Naming word (person, place, thing)" },
    { front: "Verb", back: "Action word (run, eat, write)" },
    { front: "Adjective", back: "Describing word (big, red, fast)" },
    { front: "Adverb", back: "Modifies verb (quickly, slowly)" },
  ],
  "Mathematics": [
    { front: "Area of Rectangle", back: "Length × Breadth" },
    { front: "Perimeter of Square", back: "4 × Side" },
    { front: "½ + ¼ = ?", back: "¾" },
    { front: "Volume of Cube", back: "Side³" },
  ],
  "Maths": [
    { front: "√144 = ?", back: "12" }, { front: "LCM(4,6) = ?", back: "12" },
    { front: "π ≈ ?", back: "3.14159..." }, { front: "Area of Circle", back: "πr²" },
  ],
  "Science": [
    { front: "H₂O", back: "Water 💧" }, { front: "CO₂", back: "Carbon Dioxide" },
    { front: "Photosynthesis needs?", back: "Sunlight + CO₂ + H₂O" },
    { front: "Boiling point of water", back: "100°C" },
  ],
  "Social Science": [
    { front: "Capital of India", back: "New Delhi 🇮🇳" }, { front: "Father of Nation", back: "Mahatma Gandhi" },
    { front: "Independence Day", back: "August 15, 1947" }, { front: "Republic Day", back: "January 26, 1950" },
  ],
  "Physics": [
    { front: "F = ?", back: "ma (Force = mass × acceleration)" },
    { front: "Speed of light", back: "3 × 10⁸ m/s" },
    { front: "V = IR", back: "Ohm's Law" },
    { front: "Unit of Power", back: "Watt (W)" },
  ],
  "Chemistry": [
    { front: "pH of water", back: "7 (neutral)" },
    { front: "NaCl", back: "Sodium Chloride (table salt)" },
    { front: "Atomic no. of Gold", back: "79 (Au)" },
    { front: "Noble gas group", back: "Group 18" },
  ],
  "Tamil / English": [
    { front: "Bharathiyar", back: "Tamil National Poet 🇮🇳" },
    { front: "Bharathidasan", back: "Paavendar (King of Poetry)" },
    { front: "Shakespeare", back: "Born 1564, English playwright" },
  ],
  "Maths / Biology": [
    { front: "d/dx sin(x)", back: "cos(x)" },
    { front: "DNA full form", back: "Deoxyribonucleic Acid" },
    { front: "Mitochondria", back: "Powerhouse of the cell" },
  ],
  "Computer Science": [
    { front: "1 byte = ?", back: "8 bits" }, { front: "RAM", back: "Random Access Memory" },
    { front: "CPU", back: "Central Processing Unit" }, { front: "Binary of 10", back: "1010" },
  ],
  "Engineering Maths": [
    { front: "L{1} = ?", back: "1/s" }, { front: "Eigenvalue of I", back: "1" },
    { front: "∇ operator", back: "Del (gradient)" }, { front: "Rank of I₃", back: "3" },
  ],
  "Data Structures": [
    { front: "Stack", back: "LIFO (Last In First Out)" }, { front: "Queue", back: "FIFO (First In First Out)" },
    { front: "Binary Search O(?)", back: "O(log n)" }, { front: "Binary Tree max children", back: "2" },
  ],
  "Thermodynamics": [
    { front: "1st Law", back: "Energy conservation" }, { front: "Absolute Zero", back: "-273.15°C" },
    { front: "Entropy unit", back: "J/K" }, { front: "Carnot depends on", back: "Temperature" },
  ],
  "Circuit Theory": [
    { front: "KCL", back: "Sum of currents at node = 0" }, { front: "Capacitance unit", back: "Farad" },
    { front: "AC freq in India", back: "50 Hz" }, { front: "Impedance unit", back: "Ohm" },
  ],
  "Programming": [
    { front: "OOP Pillars", back: "Encapsulation, Inheritance, Polymorphism, Abstraction" },
    { front: "Python typing", back: "Dynamically typed" },
    { front: "SQL", back: "Structured Query Language" },
  ],
  "Anatomy": [
    { front: "Bones in adult", back: "206" }, { front: "Largest bone", back: "Femur" },
    { front: "Smallest bone", back: "Stapes (ear)" }, { front: "Largest organ", back: "Skin" },
  ],
  "Physiology": [
    { front: "Normal BP", back: "120/80 mmHg" }, { front: "Heart rate", back: "60-100 bpm" },
    { front: "RBC lifespan", back: "120 days" }, { front: "Pacemaker", back: "SA Node" },
  ],
  "Biochemistry": [
    { front: "ATP", back: "Adenosine Triphosphate" }, { front: "Krebs cycle location", back: "Mitochondria" },
    { front: "Amylase digests", back: "Starch" }, { front: "Cholesterol is a", back: "Lipid" },
  ],
  "Pharmacology": [
    { front: "Aspirin class", back: "NSAID" }, { front: "Paracetamol =", back: "Acetaminophen" },
    { front: "Penicillin discoverer", back: "Alexander Fleming" }, { front: "IV route", back: "Into vein" },
  ],
  "Pathology": [
    { front: "Carcinoma origin", back: "Epithelial tissue" }, { front: "CRP indicates", back: "Inflammation" },
    { front: "Anemia = low", back: "Hemoglobin" }, { front: "Biopsy", back: "Tissue examination" },
  ],
  "Oral Anatomy": [
    { front: "Permanent teeth", back: "32" }, { front: "Hardest substance", back: "Enamel" },
    { front: "Primary teeth", back: "20" }, { front: "TMJ", back: "Temporo Mandibular Joint" },
  ],
  "Dental Materials": [
    { front: "Amalgam contains", back: "Mercury" }, { front: "GIC", back: "Glass Ionomer Cement" },
    { front: "Impression material", back: "Alginate" }, { front: "Plaster setting", back: "Exothermic" },
  ],
  "Oral Pathology": [
    { front: "Leukoplakia", back: "White lesion" }, { front: "Caries cause", back: "Bacteria" },
    { front: "Most common oral cancer", back: "SCC" }, { front: "Ameloblastoma origin", back: "Enamel organ" },
  ],
  "Prosthodontics": [
    { front: "RPD", back: "Removable Partial Denture" }, { front: "Overjet", back: "Horizontal overlap" },
    { front: "Occlusal rim material", back: "Wax" }, { front: "Complete denture", back: "Replaces all teeth" },
  ],
  "Orthodontics": [
    { front: "Angle classification", back: "Malocclusion types I, II, III" },
    { front: "Cephalometry", back: "Skull measurement" }, { front: "NiTi wire", back: "Superelastic" },
    { front: "Ideal overbite", back: "2-3mm" },
  ],
  "Periodontics": [
    { front: "Gingivitis", back: "Gum inflammation" }, { front: "Scaling removes", back: "Calculus" },
    { front: "Normal probing", back: "1-3mm" }, { front: "BOP", back: "Bleeding on Probing" },
  ],
  "Endodontics": [
    { front: "Root canal treats", back: "Pulp" }, { front: "Gutta percha", back: "Canal filler" },
    { front: "NaOCl", back: "Irrigant" }, { front: "Apex locator", back: "Measures working length" },
  ],
  "Oral Surgery": [
    { front: "Forceps for", back: "Extraction" }, { front: "Local anesthetic", back: "Lidocaine" },
    { front: "Impacted tooth", back: "Unerupted" }, { front: "Dry socket", back: "After extraction" },
  ],
  "Pedodontics": [
    { front: "First tooth erupts", back: "6 months" }, { front: "Natal teeth", back: "Present at birth" },
    { front: "Pulpotomy", back: "Primary teeth procedure" }, { front: "Fluoride varnish", back: "Prevents caries" },
  ],
  "Community Dentistry": [
    { front: "DMFT", back: "Caries experience index" }, { front: "OHI-S", back: "Oral hygiene index" },
    { front: "Primary prevention", back: "Fluoridation" }, { front: "WHO", back: "World Health Organization" },
  ],
  "Oral Medicine & Radiology": [
    { front: "OPG shows", back: "Full jaw" }, { front: "IOPA", back: "Intraoral radiograph" },
    { front: "Radiolucent =", back: "Dark on X-ray" }, { front: "CBCT", back: "Cone Beam CT" },
  ],
  "Conservative Dentistry": [
    { front: "Composite resin", back: "Tooth-colored filling" }, { front: "Black's classification", back: "Cavity types" },
    { front: "Etching acid", back: "Phosphoric acid" }, { front: "Class I cavity", back: "Occlusal surface" },
  ],
  "Marketing": [
    { front: "4 P's", back: "Product, Price, Place, Promotion" },
    { front: "USP", back: "Unique Selling Proposition" },
    { front: "AIDA: A", back: "Attention" }, { front: "B2C", back: "Business to Customer" },
  ],
  "Finance": [
    { front: "ROI", back: "Return on Investment" }, { front: "NPV", back: "Net Present Value" },
    { front: "Bull market", back: "Rising prices 📈" }, { front: "P/E ratio", back: "Valuation measure" },
  ],
  "HR Management": [
    { front: "KPI", back: "Key Performance Indicator" }, { front: "360° feedback", back: "Multiple sources" },
    { front: "Maslow's top", back: "Self-actualization" }, { front: "Attrition", back: "Employee leaving" },
  ],
  "Operations": [
    { front: "JIT", back: "Just in Time" }, { front: "Six Sigma", back: "Zero defects goal" },
    { front: "Lean", back: "Reduce waste" }, { front: "FIFO", back: "First In First Out" },
  ],
  "Business Strategy": [
    { front: "SWOT: T", back: "Threats" }, { front: "Porter's forces", back: "5" },
    { front: "BCG quadrants", back: "4" }, { front: "Blue ocean", back: "New market space" },
  ],
  "Pedagogy": [
    { front: "Bloom's Taxonomy", back: "Learning objectives hierarchy" },
    { front: "Scaffolding by", back: "Bruner" }, { front: "NCF 2005", back: "Activity-based learning" },
  ],
  "Child Psychology": [
    { front: "Piaget stages", back: "4" }, { front: "ZPD by", back: "Vygotsky" },
    { front: "Multiple Intelligences", back: "Gardner" }, { front: "Erikson stages", back: "8" },
  ],
  "Teaching Methods": [
    { front: "Project method by", back: "Kilpatrick" }, { front: "Socratic method", back: "Questions" },
    { front: "Micro-teaching", back: "5-10 min" }, { front: "Formative assessment", back: "During learning" },
  ],
  "Classroom Mgmt": [
    { front: "Goal", back: "Positive learning environment" },
    { front: "Positive reinforcement", back: "Reward 🎁" },
    { front: "Inclusive education", back: "All learners included" },
  ],
  "Assessment": [
    { front: "Summative", back: "End of term" }, { front: "Rubric", back: "Scoring guide" },
    { front: "Reliability", back: "Consistency" }, { front: "Portfolio", back: "Student work samples" },
  ],
  "Literature": [
    { front: "Shakespeare", back: "Plays & Sonnets" }, { front: "Hamlet genre", back: "Tragedy" },
    { front: "Haiku lines", back: "3" }, { front: "Sonnet lines", back: "14" },
  ],
  "History": [
    { front: "Harappan = ", back: "Indus Valley Civilization" }, { front: "French Revolution", back: "1789" },
    { front: "WWI started", back: "1914" }, { front: "Berlin Wall fell", back: "1989" },
  ],
  "Economics": [
    { front: "GDP", back: "Gross Domestic Product" }, { front: "Inflation", back: "Rising prices" },
    { front: "Wealth of Nations", back: "Adam Smith" }, { front: "Fiscal policy", back: "Govt spending & tax" },
  ],
  "Political Science": [
    { front: "Democracy", back: "Rule by the people" }, { front: "UN founded", back: "1945" },
    { front: "India Constitution", back: "Adopted 1950" }, { front: "Lok Sabha seats", back: "545" },
  ],
  "Psychology": [
    { front: "Father of Psychology", back: "Wilhelm Wundt" }, { front: "Id/Ego/Superego", back: "Freud" },
    { front: "Classical conditioning", back: "Pavlov" }, { front: "IQ", back: "Intelligence Quotient" },
  ],
  "Human Anatomy": [
    { front: "Largest bone", back: "Femur" }, { front: "Heart chambers", back: "4" },
    { front: "Cranial nerves", back: "12 pairs" }, { front: "Vertebrae", back: "33" },
  ],
  "Microbiology": [
    { front: "Bacteria", back: "Single-celled" }, { front: "Gram stain", back: "Differentiates bacteria" },
    { front: "Autoclave uses", back: "Steam pressure" }, { front: "COVID-19 cause", back: "Virus" },
  ],
  "Clinical Lab": [
    { front: "CBC tests", back: "Blood cells" }, { front: "Normal WBC", back: "4000-11000" },
    { front: "ESR measures", back: "Inflammation" }, { front: "Universal donor", back: "O" },
  ],
  "Radiology": [
    { front: "X-rays by", back: "Röntgen" }, { front: "CT uses", back: "X-rays" },
    { front: "MRI uses", back: "Magnetic fields" }, { front: "Lead apron protects", back: "Radiation" },
  ],
  "Nursing Care": [
    { front: "Normal temp (°F)", back: "98.6" }, { front: "Pulse at", back: "Wrist (radial)" },
    { front: "Stethoscope by", back: "Laennec" }, { front: "Triage", back: "Sorting patients" },
  ],
};
