"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Palette,
  Download,
  Layers,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Generation",
    description: "Describe your thumbnail idea and watch AI bring it to life with stunning visuals.",
    gradient: "from-neon-purple to-neon-blue",
  },
  {
    icon: Wand2,
    title: "Style Presets",
    description: "Choose from MrBeast, Gaming, Documentary, Tech, and Cinematic styles.",
    gradient: "from-neon-blue to-neon-cyan",
  },
  {
    icon: Palette,
    title: "Built-in Editor",
    description: "Add text, effects, glow, and fine-tune your thumbnails right in the browser.",
    gradient: "from-neon-cyan to-neon-green",
  },
  {
    icon: Download,
    title: "HD Export",
    description: "Export production-ready thumbnails in 1280x720 PNG format.",
    gradient: "from-neon-green to-neon-blue",
  },
  {
    icon: Layers,
    title: "4 Variations",
    description: "Generate 4 unique variations per prompt to find the perfect thumbnail.",
    gradient: "from-neon-pink to-neon-purple",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get your thumbnails in seconds, not hours. Skip the Photoshop grind.",
    gradient: "from-yellow-500 to-neon-pink",
  },
  {
    icon: Shield,
    title: "Reference Upload",
    description: "Upload reference images to guide the AI for more accurate results.",
    gradient: "from-neon-blue to-neon-purple",
  },
  {
    icon: Clock,
    title: "History & Gallery",
    description: "All your generated thumbnails are saved and organized in your dashboard.",
    gradient: "from-neon-purple to-neon-pink",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[200px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              Dominate YouTube
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A complete toolkit for creating thumbnails that convert viewers into
            subscribers.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-6 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-neon-purple/5 to-transparent" />
              <div className="relative">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
