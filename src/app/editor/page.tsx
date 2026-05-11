"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import ThumbnailEditor from "@/components/editor/ThumbnailEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit3, Loader2 } from "lucide-react";
import Link from "next/link";

function EditorContent() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("image");

  if (!imageUrl) {
    return (
      <main className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="inline-flex p-4 rounded-2xl bg-white/5 mb-4">
              <Edit3 className="h-10 w-10 text-white/20" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              No Image Selected
            </h1>
            <p className="text-white/50 mb-6">
              Generate a thumbnail first, then click &quot;Edit&quot; to open it
              in the editor.
            </p>
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-neon-purple" />
              <h1 className="text-2xl font-bold text-white">
                Thumbnail Editor
              </h1>
            </div>
          </div>
          <p className="text-white/50 ml-12">
            Fine-tune your thumbnail with text, effects, and adjustments.
          </p>
        </motion.div>

        <ThumbnailEditor imageUrl={decodeURIComponent(imageUrl)} />
      </div>
    </main>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-950 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-neon-purple animate-spin" />
        </main>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
