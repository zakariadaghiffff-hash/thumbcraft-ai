"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/shared/Navbar";
import PromptInput from "@/components/dashboard/PromptInput";
import StyleSelector from "@/components/dashboard/StyleSelector";
import ImageUpload from "@/components/dashboard/ImageUpload";
import GenerateButton from "@/components/dashboard/GenerateButton";
import ThumbnailGallery from "@/components/dashboard/ThumbnailGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sparkles,
  Image as ImageIcon,
  Clock,
  Wand2,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import type { Thumbnail, ThumbnailStyle } from "@/types";
import { v4 as uuidv4 } from "uuid";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<ThumbnailStyle>("mrbeast");
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generatedThumbnails, setGeneratedThumbnails] = useState<Thumbnail[]>([]);
  const [historyThumbnails, setHistoryThumbnails] = useState<Thumbnail[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  const loadHistory = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch("/api/thumbnails", {
        headers: { "x-user-id": user.uid },
      });
      if (response.ok) {
        const data = await response.json();
        setHistoryThumbnails(
          data.thumbnails.map((t: Record<string, string>) => ({
            id: t.id,
            prompt: t.prompt,
            style: t.style,
            imageUrl: t.image_url,
            createdAt: t.created_at,
            updatedAt: t.updated_at,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoadingHistory(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user, loadHistory]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          style,
          referenceImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = await response.json();
      const newThumbnails: Thumbnail[] = data.images.map(
        (url: string) => ({
          id: uuidv4(),
          prompt,
          style,
          imageUrl: url,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );

      setGeneratedThumbnails(newThumbnails);

      if (user) {
        for (const thumb of newThumbnails) {
          try {
            await fetch("/api/thumbnails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-user-id": user.uid,
              },
              body: JSON.stringify({
                prompt: thumb.prompt,
                style: thumb.style,
                image_url: thumb.imageUrl,
              }),
            });
          } catch (error) {
            console.error("Failed to save thumbnail:", error);
          }
        }
        loadHistory();
      }
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/thumbnails?id=${id}`, { method: "DELETE" });
      setHistoryThumbnails((prev) => prev.filter((t) => t.id !== id));
      setGeneratedThumbnails((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-neon-purple animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="h-6 w-6 text-neon-purple" />
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          </div>
          <p className="text-white/50">
            Welcome back, {user.displayName || user.email}. Create amazing
            thumbnails with AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
          <div className="space-y-6">
            <Tabs defaultValue="generate" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="generate" className="gap-2">
                  <Wand2 className="h-4 w-4" />
                  Generate
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <Clock className="h-4 w-4" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5 text-neon-purple" />
                      AI Thumbnail Generator
                      <Badge variant="neon" className="ml-2">
                        4 variations
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <PromptInput prompt={prompt} onPromptChange={setPrompt} />
                    <StyleSelector
                      selectedStyle={style}
                      onStyleChange={setStyle}
                    />
                    <ImageUpload
                      referenceImage={referenceImage}
                      onImageUpload={setReferenceImage}
                    />
                    <GenerateButton
                      onClick={handleGenerate}
                      loading={generating}
                      disabled={!prompt.trim()}
                    />
                  </CardContent>
                </Card>

                {(generatedThumbnails.length > 0 || generating) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <ImageIcon className="h-5 w-5 text-neon-blue" />
                      <h2 className="text-lg font-semibold text-white">
                        Generated Thumbnails
                      </h2>
                    </div>
                    <ThumbnailGallery
                      thumbnails={generatedThumbnails}
                      loading={generating}
                    />
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-neon-purple" />
                  <h2 className="text-lg font-semibold text-white">
                    Your Thumbnail History
                  </h2>
                  <Badge variant="secondary" className="ml-2">
                    {historyThumbnails.length} items
                  </Badge>
                </div>
                <ThumbnailGallery
                  thumbnails={historyThumbnails}
                  loading={loadingHistory}
                  onDelete={handleDelete}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-neon-purple/10">
                      <ImageIcon className="h-4 w-4 text-neon-purple" />
                    </div>
                    <span className="text-sm text-white/60">Total Generated</span>
                  </div>
                  {loadingHistory ? (
                    <Skeleton className="h-6 w-8" />
                  ) : (
                    <span className="text-lg font-bold text-white">
                      {historyThumbnails.length}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-neon-blue/10">
                      <Sparkles className="h-4 w-4 text-neon-blue" />
                    </div>
                    <span className="text-sm text-white/60">Credits Left</span>
                  </div>
                  <span className="text-lg font-bold text-white">47</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-neon-green/10">
                      <Wand2 className="h-4 w-4 text-neon-green" />
                    </div>
                    <span className="text-sm text-white/60">Plan</span>
                  </div>
                  <Badge variant="neon">Pro</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Be specific about facial expressions and emotions",
                  "Mention color schemes for better results",
                  "Include composition details (close-up, wide shot)",
                  "Reference popular thumbnail styles by name",
                  "Upload reference images for more accurate results",
                ].map((tip, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-white/50"
                  >
                    <span className="text-neon-purple mt-0.5">•</span>
                    {tip}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
