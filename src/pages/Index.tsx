import { useState } from "react";
import StarField from "@/components/StarField";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/components/HomeScreen";
import StudyScreen from "@/components/StudyScreen";
import SleepScreen from "@/components/SleepScreen";
import MemoryScreen from "@/components/MemoryScreen";
import ProfileScreen from "@/components/ProfileScreen";

type TabId = "home" | "study" | "sleep" | "memory" | "profile";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigate={setActiveTab} />;
      case "study":
        return (
          <StudyScreen
            onCourseChange={setSelectedCourse}
            onSubjectChange={setSelectedSubject}
          />
        );
      case "sleep":
        return <SleepScreen selectedSubject={selectedSubject} />;
      case "memory":
        return <MemoryScreen selectedCourse={selectedCourse} />;
      case "profile":
        return <ProfileScreen />;
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
