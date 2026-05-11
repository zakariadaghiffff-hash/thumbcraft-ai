export interface Thumbnail {
  id: string;
  prompt: string;
  style: ThumbnailStyle;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type ThumbnailStyle =
  | "mrbeast"
  | "gaming"
  | "documentary"
  | "tech"
  | "cinematic";

export interface GenerateRequest {
  prompt: string;
  style: ThumbnailStyle;
  referenceImage?: string;
}

export interface EditorState {
  imageUrl: string;
  texts: TextElement[];
  brightness: number;
  contrast: number;
  saturation: number;
  glowEnabled: boolean;
  glowColor: string;
  glowIntensity: number;
}

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontWeight: string;
  color: string;
  fontFamily: string;
  rotation: number;
  shadowEnabled: boolean;
  shadowColor: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export const THUMBNAIL_STYLES: { value: ThumbnailStyle; label: string; description: string; gradient: string }[] = [
  {
    value: "mrbeast",
    label: "MrBeast",
    description: "Bold, vibrant, high-energy thumbnails",
    gradient: "from-yellow-500 to-red-500",
  },
  {
    value: "gaming",
    label: "Gaming",
    description: "Neon glow, dark backgrounds, action-packed",
    gradient: "from-purple-500 to-cyan-500",
  },
  {
    value: "documentary",
    label: "Documentary",
    description: "Cinematic, moody, professional",
    gradient: "from-gray-600 to-blue-800",
  },
  {
    value: "tech",
    label: "Tech",
    description: "Clean, minimalist, futuristic",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    value: "cinematic",
    label: "Cinematic",
    description: "Movie-poster style, dramatic",
    gradient: "from-orange-500 to-teal-600",
  },
];
