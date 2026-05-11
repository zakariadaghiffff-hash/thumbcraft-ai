"use client";

import React from "react";
import { motion } from "framer-motion";
import { THUMBNAIL_STYLES, type ThumbnailStyle } from "@/types";
import { cn } from "@/lib/utils";

interface StyleSelectorProps {
  selectedStyle: ThumbnailStyle;
  onStyleChange: (style: ThumbnailStyle) => void;
}

export default function StyleSelector({
  selectedStyle,
  onStyleChange,
}: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white">Choose Style</label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {THUMBNAIL_STYLES.map((style) => (
          <motion.button
            key={style.value}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onStyleChange(style.value)}
            className={cn(
              "relative p-4 rounded-xl border transition-all duration-200 text-left",
              selectedStyle === style.value
                ? "border-neon-purple/50 bg-neon-purple/10 shadow-lg shadow-neon-purple/10"
                : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20"
            )}
          >
            {selectedStyle === style.value && (
              <motion.div
                layoutId="style-indicator"
                className="absolute inset-0 rounded-xl border-2 border-neon-purple/60"
                transition={{ type: "spring", duration: 0.4 }}
              />
            )}
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${style.gradient} mb-2`} />
            <p className="text-sm font-medium text-white">{style.label}</p>
            <p className="text-xs text-white/40 mt-0.5 line-clamp-2">
              {style.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
