"use client";

import { useEffect, useState } from "react";
import { useStoryStore } from "@/store/useStoryStore";
import { AssetManager } from "@/services/AssetManager";
import { ActWrapper } from "./ActWrapper";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Preloader() {
  const setCurrentAct = useStoryStore((state) => state.setCurrentAct);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    AssetManager.onProgress = (p) => setProgress(p);
    AssetManager.onComplete = () => {
      setTimeout(() => {
        setCurrentAct("login");
      }, 1500); // Small delay to enjoy 100%
    };
    AssetManager.preloadCriticalAssets();

    // Failsafe in case of no assets or fast load
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setCurrentAct("login"), 1000);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [setCurrentAct]);

  return (
    <ActWrapper className="bg-black text-white">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <Heart className="w-12 h-12 text-rose-500 fill-rose-500 mb-6" />
      </motion.div>
      <p className="font-serif text-xl tracking-widest text-zinc-400 mb-4">
        Preparing something special for you...
      </p>
      <div className="w-64 h-1 bg-zinc-900 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-rose-800"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="mt-4 font-sans text-sm text-zinc-600">{progress}%</p>
    </ActWrapper>
  );
}
