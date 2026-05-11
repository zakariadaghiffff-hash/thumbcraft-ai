"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Type,
  Download,
  Plus,
  Trash2,
  Sun,
  Contrast,
  Droplets,
  Sparkles,
  RotateCcw,
  ZoomIn,
  Palette,
  Move,
} from "lucide-react";
import type { TextElement, EditorState } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface ThumbnailEditorProps {
  imageUrl: string;
}

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

export default function ThumbnailEditor({ imageUrl }: ThumbnailEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<EditorState>({
    imageUrl,
    texts: [],
    brightness: 100,
    contrast: 100,
    saturation: 100,
    glowEnabled: false,
    glowColor: "#a855f7",
    glowIntensity: 20,
  });

  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setScale(Math.min(containerWidth / CANVAS_WIDTH, 1));
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%)`;
      ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.filter = "none";

      if (state.glowEnabled) {
        ctx.shadowColor = state.glowColor;
        ctx.shadowBlur = state.glowIntensity;
        ctx.strokeStyle = state.glowColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          state.glowIntensity,
          state.glowIntensity,
          CANVAS_WIDTH - state.glowIntensity * 2,
          CANVAS_HEIGHT - state.glowIntensity * 2
        );
        ctx.shadowBlur = 0;
      }

      state.texts.forEach((text) => {
        ctx.save();
        ctx.translate(text.x, text.y);
        ctx.rotate((text.rotation * Math.PI) / 180);

        if (text.shadowEnabled) {
          ctx.shadowColor = text.shadowColor;
          ctx.shadowBlur = 8;
          ctx.shadowOffsetX = 3;
          ctx.shadowOffsetY = 3;
        }

        ctx.font = `${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
        ctx.fillStyle = text.color;
        ctx.textBaseline = "top";
        ctx.fillText(text.text, 0, 0);
        ctx.restore();
      });
    };
    img.src = state.imageUrl;
  }, [state]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const addText = () => {
    const newText: TextElement = {
      id: uuidv4(),
      text: "Click to edit",
      x: CANVAS_WIDTH / 2 - 100,
      y: CANVAS_HEIGHT / 2 - 20,
      fontSize: 48,
      fontWeight: "bold",
      color: "#ffffff",
      fontFamily: "Arial",
      rotation: 0,
      shadowEnabled: true,
      shadowColor: "#000000",
    };
    setState((prev) => ({ ...prev, texts: [...prev.texts, newText] }));
    setSelectedTextId(newText.id);
  };

  const updateText = (id: string, updates: Partial<TextElement>) => {
    setState((prev) => ({
      ...prev,
      texts: prev.texts.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  };

  const deleteText = (id: string) => {
    setState((prev) => ({
      ...prev,
      texts: prev.texts.filter((t) => t.id !== id),
    }));
    if (selectedTextId === id) setSelectedTextId(null);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    const clickedText = [...state.texts].reverse().find((text) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return false;
      ctx.font = `${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
      const metrics = ctx.measureText(text.text);
      return (
        x >= text.x &&
        x <= text.x + metrics.width &&
        y >= text.y &&
        y <= text.y + text.fontSize
      );
    });

    if (clickedText) {
      setSelectedTextId(clickedText.id);
      setDragging(clickedText.id);
      setDragOffset({ x: x - clickedText.x, y: y - clickedText.y });
    } else {
      setSelectedTextId(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale - dragOffset.x;
    const y = (e.clientY - rect.top) / scale - dragOffset.y;
    updateText(dragging, { x, y });
  };

  const handleCanvasMouseUp = () => {
    setDragging(null);
  };

  const resetFilters = () => {
    setState((prev) => ({
      ...prev,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      glowEnabled: false,
    }));
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderCanvas();
    setTimeout(() => {
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "thumbnail-1280x720.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6">
      <div className="space-y-4">
        <div
          ref={containerRef}
          className="relative rounded-xl overflow-hidden border border-white/10 bg-black"
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{
              width: `${CANVAS_WIDTH * scale}px`,
              height: `${CANVAS_HEIGHT * scale}px`,
            }}
            className="cursor-crosshair"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={addText} variant="outline" size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Add Text
          </Button>
          <Button onClick={resetFilters} variant="outline" size="sm" className="gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Filters
          </Button>
          <div className="flex-1" />
          <Button onClick={exportCanvas} size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export PNG (1280x720)
          </Button>
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-1">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Sun className="h-4 w-4 text-neon-purple" />
              Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-white/60 flex items-center gap-1.5">
                  <Sun className="h-3 w-3" /> Brightness
                </label>
                <span className="text-xs text-white/40">{state.brightness}%</span>
              </div>
              <Slider
                value={[state.brightness]}
                onValueChange={([v]) => setState((p) => ({ ...p, brightness: v }))}
                min={0}
                max={200}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-white/60 flex items-center gap-1.5">
                  <Contrast className="h-3 w-3" /> Contrast
                </label>
                <span className="text-xs text-white/40">{state.contrast}%</span>
              </div>
              <Slider
                value={[state.contrast]}
                onValueChange={([v]) => setState((p) => ({ ...p, contrast: v }))}
                min={0}
                max={200}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-white/60 flex items-center gap-1.5">
                  <Droplets className="h-3 w-3" /> Saturation
                </label>
                <span className="text-xs text-white/40">{state.saturation}%</span>
              </div>
              <Slider
                value={[state.saturation]}
                onValueChange={([v]) => setState((p) => ({ ...p, saturation: v }))}
                min={0}
                max={200}
                step={1}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-neon-blue" />
              Glow Effect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs text-white/60">Enable Glow</label>
              <button
                onClick={() =>
                  setState((p) => ({ ...p, glowEnabled: !p.glowEnabled }))
                }
                className={`w-10 h-6 rounded-full transition-colors ${
                  state.glowEnabled ? "bg-neon-purple" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform mx-1 ${
                    state.glowEnabled ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </div>
            {state.glowEnabled && (
              <>
                <div className="space-y-2">
                  <label className="text-xs text-white/60">Glow Color</label>
                  <div className="flex gap-2">
                    {["#a855f7", "#3b82f6", "#06b6d4", "#ec4899", "#10b981", "#f59e0b"].map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() =>
                            setState((p) => ({ ...p, glowColor: color }))
                          }
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            state.glowColor === color
                              ? "border-white scale-110"
                              : "border-transparent"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-white/60">Intensity</label>
                    <span className="text-xs text-white/40">
                      {state.glowIntensity}
                    </span>
                  </div>
                  <Slider
                    value={[state.glowIntensity]}
                    onValueChange={([v]) =>
                      setState((p) => ({ ...p, glowIntensity: v }))
                    }
                    min={5}
                    max={50}
                    step={1}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Type className="h-4 w-4 text-neon-cyan" />
              Text Elements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {state.texts.length === 0 ? (
              <p className="text-xs text-white/30 text-center py-4">
                Click &quot;Add Text&quot; to add text to your thumbnail
              </p>
            ) : (
              state.texts.map((text) => (
                <motion.div
                  key={text.id}
                  layout
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedTextId === text.id
                      ? "border-neon-purple/50 bg-neon-purple/5"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                  onClick={() => setSelectedTextId(text.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white truncate flex-1">
                      {text.text}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteText(text.id);
                      }}
                      className="p-1 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-white/40 hover:text-red-400" />
                    </button>
                  </div>
                  {selectedTextId === text.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3 pt-2 border-t border-white/5"
                    >
                      <Input
                        value={text.text}
                        onChange={(e) =>
                          updateText(text.id, { text: e.target.value })
                        }
                        placeholder="Enter text"
                        className="text-sm"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-xs text-white/40">Size</label>
                          <Slider
                            value={[text.fontSize]}
                            onValueChange={([v]) =>
                              updateText(text.id, { fontSize: v })
                            }
                            min={12}
                            max={120}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-white/40">Rotation</label>
                          <Slider
                            value={[text.rotation]}
                            onValueChange={([v]) =>
                              updateText(text.id, { rotation: v })
                            }
                            min={-180}
                            max={180}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-white/40">Color</label>
                        <input
                          type="color"
                          value={text.color}
                          onChange={(e) =>
                            updateText(text.id, { color: e.target.value })
                          }
                          className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                        />
                        <div className="flex items-center gap-1 ml-auto">
                          <Move className="h-3 w-3 text-white/30" />
                          <span className="text-[10px] text-white/30">
                            Drag on canvas
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ZoomIn className="h-4 w-4 text-neon-green" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() =>
                setState((p) => ({
                  ...p,
                  brightness: 110,
                  contrast: 115,
                  saturation: 120,
                }))
              }
            >
              <Palette className="h-3.5 w-3.5" />
              Enhance Colors
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() =>
                setState((p) => ({
                  ...p,
                  brightness: 95,
                  contrast: 130,
                  saturation: 80,
                }))
              }
            >
              <Contrast className="h-3.5 w-3.5" />
              Cinematic Look
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() =>
                setState((p) => ({
                  ...p,
                  glowEnabled: true,
                  glowColor: "#a855f7",
                  glowIntensity: 25,
                }))
              }
            >
              <Sparkles className="h-3.5 w-3.5" />
              Add Neon Glow
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
