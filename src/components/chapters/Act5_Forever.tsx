"use client";

import { useStoryStore } from "@/store/useStoryStore";
import { ActWrapper } from "./ActWrapper";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import SafeImage from "@/components/ui/SafeImage";

export default function Act5Forever() {
  const setCurrentAct = useStoryStore((state) => state.setCurrentAct);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show replay button after animation finishes
    const timer = setTimeout(() => setShowButton(true), 12000);
    return () => clearTimeout(timer);
  }, []);

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 2, // stagger each line by 2 seconds
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <ActWrapper className="z-10 bg-burgundy flex flex-col items-center justify-start sm:justify-center py-12 md:py-20 px-6">
      
      {/* Optional final couple photo floating in background */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 4 }}
        className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden"
      >
        <SafeImage 
          src="/images/couple/1.jpg"
          alt="Final memory"
          className="w-[120%] h-[120%] filter blur-xl grayscale opacity-30"
        />
      </motion.div>

      <div className="relative z-20 max-w-2xl w-full text-center my-auto">
        <motion.p 
          custom={0}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="font-serif text-2xl md:text-3xl text-cream leading-relaxed mb-4 md:mb-8"
        >
          If I had one life...
        </motion.p>
        
        <motion.p 
          custom={1}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="font-serif text-2xl md:text-3xl text-cream leading-relaxed mb-4 md:mb-8"
        >
          I&apos;d still choose you.
        </motion.p>
        
        <motion.p 
          custom={2}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="font-serif text-2xl md:text-3xl text-cream leading-relaxed mb-4 md:mb-8"
        >
          Again. And again.
        </motion.p>
        
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="mt-8 md:mt-16 flex flex-col items-center"
        >
          <p className="font-script text-4xl text-rose-300 mb-2 md:mb-4">Forever Yours,</p>
          <div className="w-48 h-20 md:w-64 md:h-24 mt-2">
            <svg viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 4, delay: 6.5, ease: "easeInOut" }}
                d="M50,80 C60,40 100,30 110,60 C120,90 130,110 140,80 C150,50 170,40 180,60 C190,80 200,90 210,70 C220,50 240,40 250,60 C260,80 270,90 280,70 C290,50 310,40 320,60 C330,80 340,90 350,70 C360,50 380,40 390,60" 
                stroke="#d4af37" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="mt-10 md:mt-20"
        >
          <button 
            onClick={() => setCurrentAct("preloader")}
            className="px-6 py-2 bg-transparent text-cream/50 hover:text-cream font-serif text-sm tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <span>♡</span> Replay Our Story <span>♡</span>
          </button>
        </motion.div>
      </div>
    </ActWrapper>
  );
}
