"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/5 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-neon-purple" />
              <span className="text-lg font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
                ThumbCraft AI
              </span>
            </Link>
            <p className="text-white/50 text-sm max-w-md">
              Generate stunning, high-CTR YouTube thumbnails in seconds with the
              power of AI. Designed for creators who want to stand out.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Generator", "Editor"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-white/50 hover:text-neon-purple transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-white/50 hover:text-neon-purple transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} ThumbCraft AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-white/30">Powered by OpenAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
