"use client";

import { useStoryStore } from "@/store/useStoryStore";
import { ActWrapper } from "./ActWrapper";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Act1Login() {
  const setCurrentAct = useStoryStore((state) => state.setCurrentAct);
  const toggleMusic = useStoryStore((state) => state.toggleMusic);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "zeenat") {
      setIsError(false);
      setIsUnlocked(true);
      toggleMusic(); // Start music on user interaction
      setTimeout(() => setCurrentAct("journey"), 2000);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
    }
  };

  return (
    <ActWrapper className="bg-burgundy z-10">
      <AnimatePresence>
        {!isUnlocked ? (
          <motion.div 
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="flex flex-col items-center justify-center w-full px-6"
          >
            {/* The Envelope UI */}
            <div className="relative w-full max-w-md md:max-w-lg min-h-[320px] bg-cream shadow-2xl rounded-sm flex flex-col items-center justify-center p-6 md:p-8 border border-white/50">
              {/* Envelope Flap (visual only for now) */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-cream/90 border-b border-black/5 rounded-t-sm clip-triangle transform origin-top" />
              
              <div className="z-10 w-full flex flex-col items-center mt-12">
                <h1 className="font-serif text-2xl md:text-4xl text-wine mb-6 text-center px-2">
                  Who is my favorite person?
                </h1>
                <form onSubmit={handleSubmit} className="w-full relative px-4">
                  <motion.input
                    animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter her beautiful name..."
                    className="w-full bg-transparent border-b-2 border-wine/30 focus:border-wine text-center text-lg md:text-xl p-3 font-serif text-wine placeholder-wine/40 focus:outline-none transition-colors"
                  />
                  {isError && (
                    <p className="absolute -bottom-8 w-full text-center text-rose-500 font-serif text-sm font-bold">
                      Only she can open this ❤️
                    </p>
                  )}
                  {/* Wax Seal Button */}
                  <div className="flex justify-center mt-8">
                    <button 
                      type="submit"
                      className="w-16 h-16 bg-rose-800 rounded-full shadow-lg border-2 border-rose-900 flex items-center justify-center text-white/50 hover:bg-rose-700 transition-colors"
                    >
                      <span className="font-script text-xl">Z</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-script text-6xl text-gold text-glow mb-4">
              Welcome, Zeenat
            </h2>
            <p className="font-serif text-cream/70 text-lg">Opening your letter...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </ActWrapper>
  );
}
