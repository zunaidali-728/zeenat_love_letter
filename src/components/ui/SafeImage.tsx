"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function SafeImage({ src, alt, className, priority = false }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-zinc-800/80 border border-white/10 ${className}`}>
        <Heart className="w-8 h-8 text-rose-500/50 mb-2" />
        <span className="text-xs text-white/40 font-serif">Awaiting Memory...</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
