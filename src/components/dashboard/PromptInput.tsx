"use client";

import React from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Lightbulb } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
}

const promptSuggestions = [
  "A person shocked by a giant pile of money with dramatic lighting",
  "Epic gaming setup with RGB lights and a surprised gamer",
  "Before and after transformation with split screen effect",
  "Mysterious dark figure in a foggy alleyway, cinematic mood",
  "Colorful tech gadgets floating in space with lens flares",
];

export default function PromptInput({ prompt, onPromptChange }: PromptInputProps) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-white">
        <Sparkles className="h-4 w-4 text-neon-purple" />
        Describe Your Thumbnail
      </label>
      <Textarea
        placeholder="Describe your thumbnail idea in detail... e.g., 'A shocked person looking at a giant diamond, dramatic lighting, vibrant colors'"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        className="min-h-[120px] text-base"
      />
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <Lightbulb className="h-3 w-3" />
          Try one of these prompts:
        </div>
        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((suggestion) => (
            <motion.button
              key={suggestion}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPromptChange(suggestion)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80 hover:border-white/20 transition-all"
            >
              {suggestion.length > 50 ? suggestion.slice(0, 50) + "..." : suggestion}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
