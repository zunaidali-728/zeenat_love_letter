"use client";

import { useStoryStore } from "@/store/useStoryStore";
import { MusicManager } from "@/services/MusicManager";
import { Settings, Volume2, VolumeX, BookOpen, RotateCcw } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    isMusicEnabled, 
    toggleMusic, 
    currentAct, 
    setCurrentAct, 
    resetStory 
  } = useStoryStore();

  const handleToggleMusic = () => {
    toggleMusic();
    MusicManager.toggleMute();
  };

  const handleReplay = () => {
    setIsOpen(false);
    resetStory();
  };

  // Only show settings after login
  if (currentAct === "preloader" || currentAct === "login") return null;

  return (
    <div className="fixed top-6 right-6 z-[9999]">
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-black/40 border border-white/10 backdrop-blur-md flex items-center justify-center text-cream/70 hover:text-cream transition-colors"
        >
          <Settings size={18} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, originX: 1, originY: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-14 right-0 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 w-48 shadow-2xl flex flex-col gap-3"
            >
              <button 
                onClick={handleToggleMusic}
                className="flex items-center gap-3 text-sm text-cream/80 hover:text-cream transition-colors"
              >
                {isMusicEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span>{isMusicEnabled ? "Mute Music" : "Play Music"}</span>
              </button>

              {currentAct === "forever" && (
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setCurrentAct("scrapbook");
                  }}
                  className="flex items-center gap-3 text-sm text-cream/80 hover:text-cream transition-colors"
                >
                  <BookOpen size={16} />
                  <span>Memory Book</span>
                </button>
              )}

              <div className="h-[1px] w-full bg-white/10 my-1" />

              <button 
                onClick={handleReplay}
                className="flex items-center gap-3 text-sm text-rose-400 hover:text-rose-300 transition-colors"
              >
                <RotateCcw size={16} />
                <span>Restart Story</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
