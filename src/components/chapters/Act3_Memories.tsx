"use client";

import { useStoryStore } from "@/store/useStoryStore";
import { ActWrapper } from "./ActWrapper";
import { memories } from "@/config/memories";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MusicManager } from "@/services/MusicManager";
import SafeImage from "@/components/ui/SafeImage";

export default function Act3Memories() {
  const setCurrentAct = useStoryStore((state) => state.setCurrentAct);
  const [index, setIndex] = useState(0);
  const [isFlashed, setIsFlashed] = useState(false);

  const nextMemory = () => {
    if (index < memories.length - 1) {
      setIsFlashed(true);
      setTimeout(() => setIsFlashed(false), 200);
      MusicManager.playSoundEffect("/sounds/camera.mp3", 0.5); // Provide dummy/silent audio if needed
      setIndex(index + 1);
    } else {
      setCurrentAct("the-question");
    }
  };

  return (
    <ActWrapper className="z-10 bg-black/80 flex flex-col items-center justify-start sm:justify-center py-12">
      {/* Camera Flash overlay */}
      <AnimatePresence>
        {isFlashed && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white z-[999]"
          />
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-sm md:max-w-md px-4 flex flex-col items-center my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotate: -5, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -100, rotate: 5 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full bg-cream p-4 pb-8 md:pb-12 shadow-2xl rounded-sm flex flex-col items-center justify-start group pointer-events-auto"
          >
            <div 
              className="relative w-full aspect-square bg-zinc-200 overflow-hidden mb-4 cursor-pointer"
              onClick={nextMemory}
            >
               <SafeImage 
                 src={memories[index].image} 
                 alt={memories[index].title}
                 className="w-full h-full object-cover filter sepia-[0.3] contrast-[1.1] group-hover:sepia-0 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-white/20 mix-blend-overlay pointer-events-none" />
            </div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-script text-3xl md:text-4xl text-zinc-800 mb-2"
            >
              {memories[index].title}
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-serif text-zinc-600 text-center text-sm px-2"
            >
              {memories[index].quote}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="font-serif text-rose-800 text-center text-xs italic mt-2 px-2"
            >
              &quot;{memories[index].shayari}&quot;
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <button 
        onClick={nextMemory}
        className="mt-6 md:mt-8 px-6 py-2 border border-cream/20 text-cream/70 hover:bg-white/5 hover:text-cream rounded-full font-serif text-sm tracking-widest uppercase transition-colors z-20 pointer-events-auto shrink-0"
      >
        Next Memory
      </button>
    </ActWrapper>
  );
}
