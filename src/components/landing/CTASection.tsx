"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-transparent to-neon-blue/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neon-purple/20 rounded-full blur-[200px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-flex p-4 rounded-2xl bg-neon-purple/10 border border-neon-purple/20">
            <Sparkles className="h-10 w-10 text-neon-purple" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Ready to Create{" "}
            <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent">
              Viral Thumbnails?
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Join thousands of creators who are already using AI to skyrocket
            their YouTube growth. Start for free today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="xl" className="group gap-2">
                <Sparkles className="h-5 w-5" />
                Start Creating Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-white/30 text-sm">No credit card required</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
