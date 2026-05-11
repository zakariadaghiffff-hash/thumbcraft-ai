"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function GenerateButton({
  onClick,
  loading,
  disabled,
}: GenerateButtonProps) {
  return (
    <motion.div whileHover={{ scale: disabled ? 1 : 1.02 }} whileTap={{ scale: disabled ? 1 : 0.98 }}>
      <Button
        size="xl"
        className="w-full relative overflow-hidden group"
        onClick={onClick}
        disabled={disabled || loading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative flex items-center gap-2">
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating Thumbnails...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate 4 Thumbnails
            </>
          )}
        </span>
      </Button>
      {loading && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 30, ease: "linear" }}
          className="h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mt-2"
        />
      )}
    </motion.div>
  );
}
