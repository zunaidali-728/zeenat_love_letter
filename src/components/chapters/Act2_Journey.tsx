"use client";

import { useStoryStore } from "@/store/useStoryStore";
import { ActWrapper } from "./ActWrapper";
import { timelineEvents } from "@/config/timeline";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function Act2Journey() {
  const setCurrentAct = useStoryStore((state) => state.setCurrentAct);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      if (step < timelineEvents.length) {
        const timer = setTimeout(() => {
          setStep(step + 1);
        }, 3000); // 3 seconds per step
        return () => clearTimeout(timer);
      }
    }
  }, [isPlaying, step]);

  // Smoothly scroll the newly revealed event card into view
  useEffect(() => {
    if (isPlaying && step > 0) {
      const element = document.getElementById(`event-${step - 1}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [step, isPlaying]);

  const startJourney = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setStep(1); // Show first event immediately on click
    }
  };

  return (
    <ActWrapper 
      className={`z-10 bg-wine text-cream ${!isPlaying ? "cursor-pointer" : ""}`}
      onClick={startJourney}
    >
      <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start py-20">
        <div className="w-full text-center mb-16 mt-8 shrink-0">
          <h2 className="font-serif text-4xl text-gold text-glow">Our Journey</h2>
          {!isPlaying && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              className="text-cream/50 text-xs tracking-[0.3em] uppercase mt-4"
            >
              Tap anywhere to begin
            </motion.p>
          )}
        </div>

        <div className="relative w-full max-w-4xl flex flex-col items-center px-4">
          {/* Animated Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-white/10 hidden md:block" />
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-rose-500/50 hidden md:block"
            initial={{ height: "0%" }}
            animate={{ height: `${(step / timelineEvents.length) * 100}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          <div className="w-full flex flex-col gap-12 md:gap-24 relative z-10">
            {timelineEvents.map((event, index) => {
              const isVisible = index <= step - 1;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={event.id}
                  id={`event-${index}`}
                  className={`relative w-full flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Node for Desktop */}
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 z-10 bg-wine p-2 rounded-full border border-rose-500 hidden md:flex"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  </motion.div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 flex flex-col items-center md:items-start ${isEven ? 'md:pl-16' : 'md:pr-16 md:items-end'} text-center md:text-left ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-black/20 backdrop-blur-sm border border-white/5 p-6 rounded-xl w-full max-w-sm">
                      <h3 className="font-script text-3xl text-rose-300 mb-2">{event.date}</h3>
                      <h4 className="font-serif font-bold text-lg text-gold mb-2">{event.title}</h4>
                      <p className="font-sans text-sm text-cream/80 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        {step >= timelineEvents.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mt-12 flex justify-center pb-24 z-20 shrink-0"
          >
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent re-triggering startJourney
                setCurrentAct("memories");
              }}
              className="px-8 py-3 bg-rose-700 hover:bg-rose-600 rounded-full font-serif text-lg text-cream shadow-lg hover:shadow-rose-900/50 transition-all flex items-center gap-2 cursor-pointer z-30"
            >
              Continue to Memories ❤️
            </button>
          </motion.div>
        )}

        {step < timelineEvents.length && <div className="h-32 w-full shrink-0" />}
      </div>
    </ActWrapper>
  );
}
