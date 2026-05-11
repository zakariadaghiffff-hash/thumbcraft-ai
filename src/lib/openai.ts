import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ThumbnailStyle =
  | "mrbeast"
  | "gaming"
  | "documentary"
  | "tech"
  | "cinematic";

const stylePrompts: Record<ThumbnailStyle, string> = {
  mrbeast:
    "MrBeast YouTube thumbnail style: extremely vibrant colors, exaggerated facial expressions, bold large text overlays, dramatic lighting, high contrast, money/challenge themes, clean background with focus on subject",
  gaming:
    "Gaming YouTube thumbnail style: neon glowing effects, dark background with colorful accents, game-related elements, action-packed composition, RGB lighting effects, dramatic character poses",
  documentary:
    "Documentary YouTube thumbnail style: cinematic composition, professional color grading, dramatic lighting, thought-provoking imagery, clean typography, moody atmosphere, film-grain texture",
  tech:
    "Tech YouTube thumbnail style: clean minimalist design, product-focused, gradient backgrounds, sleek modern typography, gadget highlights, professional studio lighting, futuristic elements",
  cinematic:
    "Cinematic YouTube thumbnail style: movie-poster composition, dramatic shadows, epic scale, anamorphic lens effects, color-graded with teal and orange, wide aspect ratio feel, atmospheric depth",
};

export async function generateThumbnail(
  prompt: string,
  style: ThumbnailStyle,
  referenceImageBase64?: string
): Promise<string[]> {
  const stylePrompt = stylePrompts[style];
  const referenceContext = referenceImageBase64
    ? " Use the provided reference image as visual inspiration for composition and style."
    : "";
  const fullPrompt = `Create a YouTube thumbnail (1280x720 aspect ratio). ${stylePrompt}. The thumbnail should depict: ${prompt}.${referenceContext} Make it extremely eye-catching with high click-through-rate potential. No text overlays unless specified.`;

  const imagePromises = Array.from({ length: 4 }, () =>
    openai.images.generate({
      model: "dall-e-3",
      prompt: fullPrompt,
      n: 1,
      size: "1792x1024",
      quality: "hd",
    })
  );

  const results = await Promise.all(imagePromises);
  return results
    .map((r) => r.data?.[0]?.url)
    .filter((url): url is string => !!url);
}

export { openai };
