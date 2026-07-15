"use client";

import { useStoryStore } from "@/store/useStoryStore";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function DynamicBackground() {
  const currentAct = useStoryStore((state) => state.currentAct);

  let bgClass = "bg-black";
  if (currentAct === "login") bgClass = "bg-burgundy";
  if (currentAct === "journey") bgClass = "bg-wine";
  if (currentAct === "memories") bgClass = "bg-black"; // Will add particles later
  if (currentAct === "the-question") bgClass = "bg-black";
  if (currentAct === "forever") bgClass = "bg-burgundy";

  return (
    <div className={`absolute inset-0 w-full h-full transition-colors duration-2000 ${bgClass} z-0`}>
      <Canvas>
        {currentAct === "the-question" || currentAct === "forever" ? (
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        ) : null}
      </Canvas>
    </div>
  );
}
