// Voice engine using Web Speech API (SpeechSynthesis)
// Provides question reading and answer explanation with male/female voice options

export type VoiceGender = "male" | "female";

interface VoiceState {
  enabled: boolean;
  gender: VoiceGender;
  volume: number; // 0-100
  rate: number; // 0.5-1.5
}

const STORAGE_KEY = "thukkamtutor_voice";

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function loadVoiceSettings(): VoiceState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { enabled: true, gender: "female", volume: 70, rate: 0.9 };
}

export function saveVoiceSettings(state: VoiceState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function pickVoice(gender: VoiceGender): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const langPref = ["en-US", "en-GB", "en-IN", "en"];

  // Try to find a voice matching gender hint
  for (const lang of langPref) {
    const match = voices.find((v) => {
      const nameLower = v.name.toLowerCase();
      const matchesLang = v.lang.startsWith(lang.split("-")[0]);
      if (!matchesLang) return false;
      if (gender === "female") {
        return (
          nameLower.includes("female") ||
          nameLower.includes("samantha") ||
          nameLower.includes("victoria") ||
          nameLower.includes("karen") ||
          nameLower.includes("fiona") ||
          nameLower.includes("moira") ||
          nameLower.includes("tessa") ||
          nameLower.includes("google uk english female") ||
          nameLower.includes("google us english") ||
          nameLower.includes("zira") ||
          nameLower.includes("susan")
        );
      } else {
        return (
          nameLower.includes("male") ||
          nameLower.includes("daniel") ||
          nameLower.includes("alex") ||
          nameLower.includes("tom") ||
          nameLower.includes("david") ||
          nameLower.includes("james") ||
          nameLower.includes("google uk english male") ||
          nameLower.includes("rishi")
        );
      }
    });
    if (match) return match;
  }

  // Fallback: pick any English voice
  const english = voices.find((v) => v.lang.startsWith("en"));
  return english || voices[0] || null;
}

export function stopVoice() {
  speechSynthesis.cancel();
  currentUtterance = null;
}

export function speak(
  text: string,
  settings: VoiceState,
  onEnd?: () => void
): void {
  if (!settings.enabled) return;
  stopVoice();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.volume = Math.max(0, Math.min(1, settings.volume / 100));
  utterance.rate = settings.rate;
  utterance.pitch = settings.gender === "female" ? 1.1 : 0.85;

  const voice = pickVoice(settings.gender);
  if (voice) utterance.voice = voice;

  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };
  utterance.onerror = () => {
    currentUtterance = null;
  };

  currentUtterance = utterance;
  speechSynthesis.speak(utterance);
}

export function isSpeaking(): boolean {
  return speechSynthesis.speaking;
}

// Preload voices (needed on some browsers)
export function preloadVoices(): Promise<void> {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve();
      return;
    }
    speechSynthesis.onvoiceschanged = () => resolve();
    // Timeout fallback
    setTimeout(resolve, 1000);
  });
}

// Helper: read a quiz question aloud
export function readQuestion(question: string, settings: VoiceState, onEnd?: () => void) {
  speak(question, settings, onEnd);
}

// Helper: explain the answer like a teacher
export function explainAnswer(
  question: string,
  correctAnswer: string,
  userWasCorrect: boolean,
  settings: VoiceState,
  onEnd?: () => void
) {
  let explanation: string;
  if (userWasCorrect) {
    explanation = `Correct! The answer is: ${correctAnswer}. Well done, you got it right.`;
  } else {
    explanation = `The correct answer is: ${correctAnswer}. Remember this for next time.`;
  }
  speak(explanation, settings, onEnd);
}
