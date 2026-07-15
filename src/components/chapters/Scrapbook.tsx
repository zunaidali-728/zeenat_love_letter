"use client";

import { useStoryStore } from "@/store/useStoryStore";
import { memories } from "@/config/memories";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";

export default function Scrapbook() {
  const setCurrentAct = useStoryStore((state) => state.setCurrentAct);

  return (
    <div className="absolute inset-0 z-50 bg-black/95 text-cream overflow-y-auto overflow-x-hidden p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12 mt-6">
          <h2 className="font-serif text-4xl text-gold">Memory Book</h2>
          <button 
            onClick={() => setCurrentAct("forever")}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((mem, i) => (
            <motion.div 
              key={mem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 border border-white/5 rounded-lg overflow-hidden group"
            >
              <div className="aspect-square bg-zinc-800 relative overflow-hidden">
                <SafeImage 
                  src={mem.image} 
                  alt={mem.title}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
              </div>
              <div className="p-4">
                <h3 className="font-script text-2xl text-rose-300 mb-1">{mem.title}</h3>
                <p className="font-sans text-xs text-white/50 mb-3">{mem.date} • {mem.place}</p>
                <p className="font-serif text-sm text-cream/90 italic">&quot;{mem.quote}&quot;</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
