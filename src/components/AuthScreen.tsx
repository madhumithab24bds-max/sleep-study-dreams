import { useState } from "react";
import { motion } from "framer-motion";
import { lovable } from "@/integrations/lovable/index";
import logo from "@/assets/logo.png";
import nightSkyBg from "@/assets/night-sky-bg.jpg";
import { toast } from "sonner";

const AuthScreen = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleGoogleSignIn = async () => {
    if (!email.trim()) {
      toast.error("Please enter your Gmail ID");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
      extraParams: {
        login_hint: email.trim(),
      },
    });
    if (error) {
      toast.error("Sign in failed: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={nightSkyBg}
        alt="Night sky"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      <motion.div
        className="relative z-10 flex flex-col items-center px-8 py-12 max-w-sm w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={logo}
          alt="ThukkamTutor Logo"
          className="mb-6 h-28 w-28 drop-shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <h1 className="mb-2 text-3xl font-display font-bold text-gradient-dream text-center">
          ThukkamTutor
        </h1>
        <p className="text-sm font-display italic text-muted-foreground mb-10 text-center">
          "Learn Smart… Even While You Sleep"
        </p>

        <div className="glass-card glow-primary w-full p-6 space-y-5">
          <div className="text-center">
            <h2 className="text-lg font-display font-bold text-foreground">Welcome!</h2>
            <p className="text-xs text-muted-foreground mt-1">Enter your Gmail ID to sign in</p>
          </div>

          <div className="space-y-3">
            <input
              type="email"
              placeholder="yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGoogleSignIn()}
              className="w-full rounded-xl border border-border/30 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-card border border-border/30 py-3.5 px-4 text-sm font-display font-semibold text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {loading ? "Signing in…" : "Continue with Google"}
            </button>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground mt-6 text-center">
          By signing in, you agree to our Terms of Service & Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default AuthScreen;
