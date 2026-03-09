import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import PaymentScreenshotUpload from "./PaymentScreenshotUpload";

interface SubscriptionGateProps {
  onSubscribed: () => void;
}

const UPI_ID = "madhukrr2006@oksbi";
const UPI_AMOUNT = "50";

const SubscriptionGate = ({ onSubscribed }: SubscriptionGateProps) => {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
      <motion.div
        className="w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-3">
          <motion.img
            src={logo}
            alt="ThookamTutor"
            className="mx-auto h-20 w-20 drop-shadow-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <h1 className="text-2xl font-display font-bold text-foreground">
            Almost There! <Sparkles className="inline h-5 w-5 text-primary" />
          </h1>
          <p className="text-sm text-muted-foreground">
            Subscribe to unlock all features of ThookamTutor
          </p>
        </div>

        <div className="glass-card glow-moonlight p-6 text-center space-y-3">
          <div className="text-3xl">
            <Star className="inline h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-display font-bold text-foreground">Basic Plan</h3>
          <p className="text-3xl font-display font-bold text-primary">
            ₹50<span className="text-sm text-muted-foreground">/month</span>
          </p>
          <div className="space-y-1.5 text-left text-sm text-muted-foreground">
            <p>✅ All study materials (LKG–12 + College)</p>
            <p>✅ AI Tutor conversations</p>
            <p>✅ Sleep learning sessions</p>
            <p>✅ Quizzes & flashcards</p>
            <p>✅ Trilingual support (EN/TA/HI)</p>
          </div>

          <a
            href={`upi://pay?pa=${UPI_ID}&pn=ThookamTutor&am=${UPI_AMOUNT}&cu=INR&tn=ThookamTutor%20Subscription`}
            className="mt-3 w-full rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm py-3 flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Open UPI App to Pay ₹50
          </a>
        </div>

        <PaymentScreenshotUpload onUploadSuccess={onSubscribed} />
      </motion.div>
    </div>
  );
};

export default SubscriptionGate;
