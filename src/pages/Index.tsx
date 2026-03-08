import { useState } from "react";
import StarField from "@/components/StarField";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/components/HomeScreen";
import StudyScreen from "@/components/StudyScreen";
import SleepScreen from "@/components/SleepScreen";
import MemoryScreen from "@/components/MemoryScreen";
import ProfileScreen from "@/components/ProfileScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen />;
      case "study": return <StudyScreen />;
      case "sleep": return <SleepScreen />;
      case "memory": return <MemoryScreen />;
      case "profile": return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="relative min-h-screen max-w-lg mx-auto">
      <StarField />
      <div className="relative z-10">
        {renderScreen()}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
