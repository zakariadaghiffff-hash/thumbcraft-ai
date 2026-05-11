import { NextRequest, NextResponse } from "next/server";
import { generateThumbnail, type ThumbnailStyle } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, style, referenceImage } = body as {
      prompt: string;
      style: ThumbnailStyle;
      referenceImage?: string;
    };

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    const imageUrls = await generateThumbnail(prompt, style, referenceImage);

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate thumbnails. Please try again." },
      { status: 500 }
    );
  }
}
