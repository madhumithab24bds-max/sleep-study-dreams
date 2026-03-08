// Performance tracking utilities — stored in localStorage

export interface SubjectPerformance {
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  attempts: number;
  lastAttempt: string;
}

export interface PerformanceData {
  subjects: Record<string, SubjectPerformance>;
  totalQuizzesTaken: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  streak: number;
  lastQuizDate: string;
}

const STORAGE_KEY = "thukkamtutor_performance";

export function loadPerformance(): PerformanceData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    subjects: {},
    totalQuizzesTaken: 0,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    lastQuizDate: "",
  };
}

export function savePerformance(data: PerformanceData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function recordQuizResult(subject: string, total: number, correct: number) {
  const data = loadPerformance();
  const today = new Date().toISOString().split("T")[0];

  if (!data.subjects[subject]) {
    data.subjects[subject] = {
      subject,
      totalQuestions: 0,
      correctAnswers: 0,
      attempts: 0,
      lastAttempt: today,
    };
  }

  const s = data.subjects[subject];
  s.totalQuestions += total;
  s.correctAnswers += correct;
  s.attempts += 1;
  s.lastAttempt = today;

  data.totalQuizzesTaken += 1;
  data.totalQuestionsAnswered += total;
  data.totalCorrect += correct;

  // Streak
  if (data.lastQuizDate === today) {
    // same day, keep streak
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split("T")[0];
    data.streak = data.lastQuizDate === yStr ? data.streak + 1 : 1;
  }
  data.lastQuizDate = today;

  savePerformance(data);
  return data;
}

export function getWeakSubjects(topN: number = 3): string[] {
  const data = loadPerformance();
  const entries = Object.values(data.subjects)
    .filter((s) => s.totalQuestions >= 3) // at least 3 questions attempted
    .map((s) => ({
      subject: s.subject,
      accuracy: s.correctAnswers / s.totalQuestions,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
  return entries.slice(0, topN).map((e) => e.subject);
}

export function getOverallAccuracy(): number {
  const data = loadPerformance();
  if (data.totalQuestionsAnswered === 0) return 0;
  return Math.round((data.totalCorrect / data.totalQuestionsAnswered) * 100);
}

export function getSubjectAccuracy(subject: string): number {
  const data = loadPerformance();
  const s = data.subjects[subject];
  if (!s || s.totalQuestions === 0) return 0;
  return Math.round((s.correctAnswers / s.totalQuestions) * 100);
}
