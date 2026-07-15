"use client";

import { useStoryStore } from "@/store/useStoryStore";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { MusicManager } from "@/services/MusicManager";

// We will build these components next
import Preloader from "@/components/chapters/Preloader";
import Act1Login from "@/components/chapters/Act1_Login";
import Act2Journey from "@/components/chapters/Act2_Journey";
import Act3Memories from "@/components/chapters/Act3_Memories";
import Act4TheQuestion from "@/components/chapters/Act4_TheQuestion";
import Act5Forever from "@/components/chapters/Act5_Forever";
import Scrapbook from "@/components/chapters/Scrapbook";
import DynamicBackground from "@/components/effects/DynamicBackground";

export default function StoryEngine() {
  const { currentAct, isMusicEnabled } = useStoryStore();

  useEffect(() => {
    MusicManager.init();
  }, []);

  useEffect(() => {
    if (isMusicEnabled) {
      if (currentAct === "preloader" || currentAct === "login") MusicManager.playTrack("piano");
      if (currentAct === "journey" || currentAct === "memories") MusicManager.playTrack("violin");
      if (currentAct === "the-question") MusicManager.playTrack("heartbeat");
      if (currentAct === "forever") MusicManager.playTrack("hopeful");
    }
  }, [currentAct, isMusicEnabled]);

  const renderAct = () => {
    switch (currentAct) {
      case "preloader": return <Preloader key="preloader" />;
      case "login": return <Act1Login key="login" />;
      case "journey": return <Act2Journey key="journey" />;
      case "memories": return <Act3Memories key="memories" />;
      case "the-question": return <Act4TheQuestion key="question" />;
      case "forever": return <Act5Forever key="forever" />;
      case "scrapbook": return <Scrapbook key="scrapbook" />;
      default: return null;
    }
  };

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-background text-foreground">
      <DynamicBackground />
      <AnimatePresence mode="wait">
        {renderAct()}
      </AnimatePresence>
    </main>
  );
}
