"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const showcaseItems = [
  {
    title: "MrBeast Style",
    description: "High-energy, bold colors",
    gradient: "from-yellow-500 to-red-500",
    accent: "bg-yellow-500/20",
  },
  {
    title: "Gaming Style",
    description: "Neon glow, dark vibes",
    gradient: "from-purple-500 to-cyan-500",
    accent: "bg-purple-500/20",
  },
  {
    title: "Documentary",
    description: "Cinematic & moody",
    gradient: "from-gray-500 to-blue-700",
    accent: "bg-blue-500/20",
  },
  {
    title: "Tech Review",
    description: "Clean & minimalist",
    gradient: "from-blue-500 to-indigo-500",
    accent: "bg-indigo-500/20",
  },
  {
    title: "Cinematic",
    description: "Movie-poster drama",
    gradient: "from-orange-500 to-teal-500",
    accent: "bg-orange-500/20",
  },
  {
    title: "Viral Content",
    description: "Attention-grabbing",
    gradient: "from-pink-500 to-violet-500",
    accent: "bg-pink-500/20",
  },
];

export default function ShowcaseSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[200px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            AI-Generated{" "}
            <span className="bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
              Thumbnail Showcase
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            See the variety of stunning thumbnails our AI can create across
            different styles and niches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
              <div className="relative rounded-xl border border-white/5 bg-gray-900/80 overflow-hidden">
                <div className={`aspect-video bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <Sparkles className="h-12 w-12 text-white/40 relative z-10" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-white/40 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
