"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Play, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-pink/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "1.5s" }} />
      </div>
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="neon" className="mb-6 px-4 py-1.5">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered Thumbnail Generation
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="text-white">Create </span>
            <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent">
              Viral Thumbnails
            </span>
            <br />
            <span className="text-white">in Seconds</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto"
          >
            Transform your YouTube channel with AI-generated thumbnails that
            get clicks. Describe your vision, choose a style, and let our AI
            create stunning thumbnails instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/auth/register">
              <Button size="xl" className="group gap-2 w-full sm:w-auto">
                <Sparkles className="h-5 w-5" />
                Start Creating Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/#features">
              <Button variant="glass" size="xl" className="gap-2 w-full sm:w-auto">
                <Play className="h-4 w-4" />
                See How It Works
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-neon-purple/20 via-neon-blue/20 to-neon-cyan/20 rounded-2xl blur-xl" />
            <div className="relative rounded-xl border border-white/10 bg-gray-900/80 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-white/40 ml-2">ThumbCraft AI — Dashboard</span>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center px-4">
                    <span className="text-white/40 text-sm">Describe your thumbnail idea...</span>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue text-white text-sm font-medium">
                    Generate ✨
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "from-red-500/20 to-orange-500/20",
                    "from-blue-500/20 to-purple-500/20",
                    "from-green-500/20 to-teal-500/20",
                    "from-pink-500/20 to-rose-500/20",
                  ].map((gradient, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className={`aspect-video rounded-lg bg-gradient-to-br ${gradient} border border-white/5 flex items-center justify-center`}
                    >
                      <Sparkles className="h-8 w-8 text-white/20" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex items-center justify-center gap-8 text-white/40 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green" />
              10K+ Thumbnails Generated
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-blue" />
              4.9/5 Rating
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-purple" />
              2K+ Creators
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
