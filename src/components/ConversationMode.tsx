import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mic, MicOff, Send, Volume2, MessageCircle } from "lucide-react";
import { speak, stopVoice, loadVoiceSettings, isSpeaking } from "@/lib/voiceEngine";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

interface ConversationModeProps {
  subject: string | null;
  onBack: () => void;
}

// Simple AI tutor responses based on context
function generateTutorResponse(userMsg: string, subject: string | null, history: Message[]): string {
  const lower = userMsg.toLowerCase();
  const subj = subject || "your subject";

  // Greeting
  if (history.filter(m => m.role === "user").length === 1) {
    return `Welcome! I'm your study tutor for ${subj}. Let's have a conversation to strengthen your understanding. What topic would you like to discuss? You can ask me questions, or I can quiz you!`;
  }

  // Quiz request
  if (lower.includes("quiz") || lower.includes("test me") || lower.includes("ask me")) {
    const questions = [
      `Here's a question about ${subj}: Can you explain the key concepts you've studied recently? Tell me what you remember, and I'll help fill in any gaps.`,
      `Let's test your knowledge! What is the most important thing you learned about ${subj} today? Explain it as if you're teaching someone else.`,
      `Quick challenge: Name three fundamental concepts in ${subj} and briefly explain each one. I'll give you feedback!`,
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }

  // Explain request
  if (lower.includes("explain") || lower.includes("what is") || lower.includes("how does") || lower.includes("tell me about")) {
    return `That's a great question! In ${subj}, this is an important concept. Let me break it down for you:\n\n1. Start with the basics — understand the fundamental definition\n2. Connect it to related concepts you already know\n3. Think of real-world examples\n\nCan you tell me what you already know about this? I'll help build on your existing knowledge.`;
  }

  // I don't know
  if (lower.includes("don't know") || lower.includes("not sure") || lower.includes("confused")) {
    return `No worries at all! That's completely normal. Let's approach this step by step.\n\nThink of it this way — every complex topic can be broken into simpler parts. What's the smallest piece of this topic you DO understand? Let's start there and build up.`;
  }

  // Thank you / positive
  if (lower.includes("thank") || lower.includes("got it") || lower.includes("understand")) {
    return `Excellent! I'm glad that helped. Understanding comes from practice and repetition. Would you like me to:\n\n• Ask you another question?\n• Explain a different topic?\n• Give you a summary of what we've discussed?\n\nRemember, reviewing this topic before sleep will help with memory consolidation! 🌙`;
  }

  // Default conversational responses
  const responses = [
    `Interesting point about ${subj}! Let me build on that. The key to remembering this is to create mental connections. Can you think of how this relates to something you already know well?`,
    `Good thinking! In ${subj}, it's important to understand not just the 'what' but the 'why'. Why do you think this concept works the way it does?`,
    `That's a solid foundation. Let me challenge you a bit — if someone asked you to teach this concept to a younger student, how would you simplify it? Teaching is one of the best ways to learn!`,
    `I like your approach! Here's a memory technique: try creating an acronym or a story around the key points. What words or images come to mind when you think about this topic?`,
    `Great effort! Remember, the best study strategy is spaced repetition — review this topic again tonight before sleep, and then test yourself in the morning. Shall we continue with another aspect of ${subj}?`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

const ConversationMode = ({ subject, onBack }: ConversationModeProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      text: `Hi! 👋 I'm your AI study tutor${subject ? ` for ${subject}` : ""}. Let's have a conversation to help improve your memory and understanding. You can:\n\n• Ask me questions about your subject\n• Say "quiz me" for a quick test\n• Discuss any topic you're studying\n• Type or use your voice!\n\nWhat would you like to start with?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingState, setIsSpeakingState] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const voiceSettings = loadVoiceSettings();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Setup speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
    return () => { stopVoice(); };
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast.success("🎤 Listening...");
    }
  }, [isListening]);

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: input.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    // Generate AI response after short delay
    setTimeout(() => {
      const aiText = generateTutorResponse(userMsg.text, subject, updatedMessages);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "ai", text: aiText };
      setMessages(prev => [...prev, aiMsg]);

      // Speak the response
      if (voiceSettings.enabled) {
        setIsSpeakingState(true);
        speak(aiText, voiceSettings, () => setIsSpeakingState(false));
      }
    }, 500);
  }, [input, messages, subject, voiceSettings]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="glass-card p-2 rounded-xl">
          <ArrowLeft size={18} className="text-muted-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <MessageCircle size={18} className="text-accent" />
            Conversation Mode
          </h2>
          <p className="text-[10px] text-muted-foreground font-display">Talk with your AI tutor</p>
        </div>
        {isSpeakingState && (
          <div className="flex items-center gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-1 bg-accent rounded-full"
                animate={{ height: [3, 10, 3] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[55vh]">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 text-sm font-display leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "glass-card text-foreground rounded-bl-md"
              }`}
            >
              {msg.text.split("\n").map((line, li) => (
                <p key={li} className={li > 0 ? "mt-1.5" : ""}>{line}</p>
              ))}
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="glass-card p-2 flex items-end gap-2">
        <button
          onClick={toggleListening}
          className={`p-3 rounded-xl transition-all ${
            isListening
              ? "bg-destructive text-destructive-foreground animate-pulse"
              : "bg-muted/50 text-muted-foreground"
          }`}
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Listening..." : "Type or speak..."}
          className="flex-1 bg-muted/30 rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground font-display resize-none min-h-[44px] max-h-[100px] border border-border/20 focus:outline-none focus:border-accent/40"
          rows={1}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="p-3 rounded-xl bg-accent text-accent-foreground disabled:opacity-30 transition-opacity"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ConversationMode;
