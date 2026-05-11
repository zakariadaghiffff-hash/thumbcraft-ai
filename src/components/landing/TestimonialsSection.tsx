"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Tech YouTuber · 500K subs",
    avatar: "AC",
    content:
      "ThumbCraft AI completely transformed my workflow. I went from spending 2 hours on thumbnails to 2 minutes. My CTR increased by 40%!",
    rating: 5,
    gradient: "from-neon-purple to-neon-blue",
  },
  {
    name: "Sarah Williams",
    role: "Gaming Creator · 1.2M subs",
    avatar: "SW",
    content:
      "The gaming style presets are absolutely insane. Every thumbnail looks like it was made by a professional designer. Total game-changer.",
    rating: 5,
    gradient: "from-neon-blue to-neon-cyan",
  },
  {
    name: "Marcus Johnson",
    role: "Documentary Channel · 800K subs",
    avatar: "MJ",
    content:
      "I was skeptical about AI thumbnails, but ThumbCraft nails the cinematic look every time. My subscribers think I hired a design team.",
    rating: 5,
    gradient: "from-neon-cyan to-neon-green",
  },
  {
    name: "Emma Rodriguez",
    role: "Lifestyle Vlogger · 350K subs",
    avatar: "ER",
    content:
      "The editor is so intuitive! I can add text, adjust colors, and export in seconds. Best investment for my channel this year.",
    rating: 5,
    gradient: "from-neon-pink to-neon-purple",
  },
  {
    name: "David Park",
    role: "Finance Creator · 600K subs",
    avatar: "DP",
    content:
      "Clean, professional thumbnails that actually look custom-made. The tech style preset is perfect for my niche. Highly recommend!",
    rating: 5,
    gradient: "from-neon-blue to-neon-purple",
  },
  {
    name: "Lisa Thompson",
    role: "Education Channel · 900K subs",
    avatar: "LT",
    content:
      "From concept to finished thumbnail in under a minute. ThumbCraft AI has saved me hundreds of hours. The quality is unmatched.",
    rating: 5,
    gradient: "from-neon-green to-neon-blue",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[200px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
              Top Creators
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Join thousands of YouTubers who create better thumbnails with AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 h-full">
                <Quote className="h-8 w-8 text-neon-purple/30 mb-4" />
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white text-sm font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-white/40 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
