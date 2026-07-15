"use client";

import { useStoryStore } from "@/store/useStoryStore";
import { ActWrapper } from "./ActWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { MusicManager } from "@/services/MusicManager";

export default function Act4TheQuestion() {
  const setCurrentAct = useStoryStore((state) => state.setCurrentAct);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [noScale, setNoScale] = useState(1);
  const [noText, setNoText] = useState("No 💔");
  const [yesScale, setYesScale] = useState(1);
  const [hoverCount, setHoverCount] = useState(0);
  const [hasClickedYes, setHasClickedYes] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (hasClickedYes) return;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      
      const padding = 20;
      const btnWidth = 140;
      const btnHeight = 60;
      const maxX = Math.max(50, (rect.width - btnWidth) / 2 - padding);
      const maxY = Math.max(50, (rect.height - btnHeight) / 2 - padding);
      
      const randomX = (Math.random() - 0.5) * maxX * 2;
      const randomY = (Math.random() - 0.5) * maxY * 2;
      
      setNoPosition({ x: randomX, y: randomY });
      setIsMoved(true);
      setHoverCount(prev => prev + 1);
      
      // Fun interactions based on how many times they tried
      if (hoverCount === 2) setNoText("No?");
      if (hoverCount === 5) setNoText("Still no?");
      if (hoverCount === 8) {
        setNoText("Okay... Fine 😂");
        setNoScale(0.5);
      }
      
      // Make YES button grow bigger
      setYesScale(prev => Math.min(prev + 0.2, 2.5));
    }
  };

  const handleYesClick = () => {
    setHasClickedYes(true);
    MusicManager.playSoundEffect("/sounds/cheer.mp3", 0.6); // Provide dummy/silent audio if needed
    
    // Confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffc0cb', '#ffd700']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffc0cb', '#ffd700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => setCurrentAct("forever"), 1500);
      }
    };
    frame();
  };

  return (
    <ActWrapper className="z-10 bg-black text-cream" >
      <div ref={containerRef} className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-12 px-4">
        
        <AnimatePresence>
          {!hasClickedYes && (
            <motion.div
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-center z-20 w-full max-w-2xl"
            >
              <h2 className="font-serif text-2xl md:text-4xl mb-10 max-w-2xl px-4 leading-relaxed text-glow break-words hyphens-auto mx-auto">
                I know I&apos;m the biggest idiot for forgetting your birthday...
                <br /><br />
                <span className="text-gold">Will you forgive your idiot husband and let me spend the rest of my life making it up to you?</span>
              </h2>

              <div className="flex flex-wrap gap-8 items-center justify-center mt-12 relative w-full min-h-[150px]">
                <motion.button
                  onClick={handleYesClick}
                  animate={{ scale: yesScale }}
                  className="px-8 py-4 bg-rose-700 hover:bg-rose-600 rounded-full font-serif text-xl font-bold shadow-lg shadow-rose-900/50 text-white z-30 shrink-0"
                  whileHover={{ scale: yesScale * 1.05 }}
                  whileTap={{ scale: yesScale * 0.95 }}
                >
                  Yes! ❤️
                </motion.button>

                <motion.button
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover} // For mobile taps
                  animate={isMoved ? { 
                    x: noPosition.x, 
                    y: noPosition.y,
                    scale: noScale,
                  } : {
                    x: 0, 
                    y: 0,
                    scale: noScale,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`px-8 py-4 bg-zinc-800 rounded-full font-serif text-xl text-zinc-300 z-30 shrink-0 ${isMoved ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : 'relative'}`}
                  style={{ minWidth: "120px" }}
                >
                  {noText}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {hasClickedYes && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="text-center z-20 absolute"
          >
            <h2 className="font-script text-6xl text-rose-500 text-glow">
              Yayyy! Thank you! 🎉
            </h2>
            <p className="font-serif text-2xl mt-6 text-gold">I promise to make it the best year ever.</p>
          </motion.div>
        )}
      </div>
    </ActWrapper>
  );
}
