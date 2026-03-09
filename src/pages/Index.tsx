import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import StarField from "@/components/StarField";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/components/HomeScreen";
import StudyScreen from "@/components/StudyScreen";
import SleepScreen from "@/components/SleepScreen";
import MemoryScreen from "@/components/MemoryScreen";
import ProfileScreen from "@/components/ProfileScreen";
import AuthScreen from "@/components/AuthScreen";
import ProfileSetup from "@/components/ProfileSetup";
import SubscriptionGate from "@/components/SubscriptionGate";

type TabId = "home" | "study" | "sleep" | "memory" | "profile";

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [studiedSubjects, setStudiedSubjects] = useState<string[]>([]);
  const [profileLanguage, setProfileLanguage] = useState("english");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check profile completion when session changes
  useEffect(() => {
    if (!session?.user) {
      setProfileComplete(null);
      return;
    }

    const checkProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("profile_completed, language")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (data?.profile_completed) {
        setProfileComplete(true);
        if (data.language) setProfileLanguage(data.language);
      } else {
        setProfileComplete(false);
      }
    };

    checkProfile();
  }, [session]);

  const handleSubjectStudied = (subject: string) => {
    setStudiedSubjects((prev) =>
      prev.includes(subject) ? prev : [...prev, subject]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground font-display">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <AuthScreen />;
  }

  // Show profile setup if not completed
  if (profileComplete === false) {
    return (
      <ProfileSetup
        userId={session.user.id}
        defaultName={session.user.user_metadata?.full_name || ""}
        onComplete={() => setProfileComplete(true)}
      />
    );
  }

  // Still checking profile status
  if (profileComplete === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground font-display">Loading...</div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigate={setActiveTab} />;
      case "study":
        return (
          <StudyScreen
            onCourseChange={setSelectedCourse}
            onSubjectChange={setSelectedSubject}
            onSubjectStudied={handleSubjectStudied}
            language={profileLanguage}
          />
        );
      case "sleep":
        return <SleepScreen selectedSubject={selectedSubject} />;
      case "memory":
        return (
          <MemoryScreen
            selectedCourse={selectedCourse}
            selectedSubject={selectedSubject}
            studiedSubjects={studiedSubjects}
          />
        );
      case "profile":
        return <ProfileScreen onLanguageChange={setProfileLanguage} />;
      default:
        return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="relative min-h-screen max-w-lg mx-auto">
      <StarField />
      <div className="relative z-10">{renderScreen()}</div>
      <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as TabId)} />
    </div>
  );
};

export default Index;
