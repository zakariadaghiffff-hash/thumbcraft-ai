"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Edit3,
  Trash2,
  Sparkles,
  Clock,
  Eye,
} from "lucide-react";
import type { Thumbnail } from "@/types";

interface ThumbnailGalleryProps {
  thumbnails: Thumbnail[];
  loading: boolean;
  onDelete?: (id: string) => void;
}

export default function ThumbnailGallery({
  thumbnails,
  loading,
  onDelete,
}: ThumbnailGalleryProps) {
  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `thumbnail-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      window.open(imageUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (thumbnails.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex p-4 rounded-2xl bg-white/5 mb-4">
          <Sparkles className="h-10 w-10 text-white/20" />
        </div>
        <p className="text-white/40 text-lg">No thumbnails yet</p>
        <p className="text-white/20 text-sm mt-1">
          Describe your idea and generate your first thumbnail
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AnimatePresence>
        {thumbnails.map((thumbnail, index) => (
          <motion.div
            key={thumbnail.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
            className="group relative rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all"
          >
            <div className="relative aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnail.imageUrl}
                alt={thumbnail.prompt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge variant="neon" className="text-xs">
                  {thumbnail.style}
                </Badge>
                <div className="flex items-center gap-1">
                  <Button
                    variant="glass"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDownload(thumbnail.imageUrl, index)}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Link
                    href={`/editor?image=${encodeURIComponent(thumbnail.imageUrl)}`}
                  >
                    <Button variant="glass" size="icon" className="h-8 w-8">
                      <Edit3 className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Link
                    href={thumbnail.imageUrl}
                    target="_blank"
                  >
                    <Button variant="glass" size="icon" className="h-8 w-8">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  {onDelete && (
                    <Button
                      variant="glass"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-500/20"
                      onClick={() => onDelete(thumbnail.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-white/70 line-clamp-2">
                {thumbnail.prompt}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-white/30">
                <Clock className="h-3 w-3" />
                {new Date(thumbnail.createdAt).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
