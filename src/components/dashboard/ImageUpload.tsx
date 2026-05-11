"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  referenceImage: string | null;
  onImageUpload: (base64: string | null) => void;
}

export default function ImageUpload({
  referenceImage,
  onImageUpload,
}: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onImageUpload(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-white">
        <ImageIcon className="h-4 w-4 text-neon-blue" />
        Reference Image
        <span className="text-white/30 font-normal">(optional)</span>
      </label>

      <AnimatePresence mode="wait">
        {referenceImage ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={referenceImage}
              alt="Reference"
              className="w-full h-40 object-cover"
            />
            <button
              onClick={() => onImageUpload(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                isDragActive
                  ? "border-neon-purple/50 bg-neon-purple/5"
                  : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
              )}
            >
              <input {...getInputProps()} />
              <Upload className="h-8 w-8 text-white/30 mx-auto mb-3" />
              <p className="text-sm text-white/50">
                {isDragActive
                  ? "Drop your image here..."
                  : "Drag & drop a reference image, or click to browse"}
              </p>
              <p className="text-xs text-white/30 mt-1">
                PNG, JPG, WebP up to 10MB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
