import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ThumbnailRecord {
  id: string;
  user_id: string;
  prompt: string;
  style: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  default_style: string;
  export_quality: string;
  created_at: string;
}

export async function saveThumbnail(thumbnail: Omit<ThumbnailRecord, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("thumbnails")
    .insert(thumbnail)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserThumbnails(userId: string) {
  const { data, error } = await supabase
    .from("thumbnails")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as ThumbnailRecord[];
}

export async function deleteThumbnail(id: string) {
  const { error } = await supabase.from("thumbnails").delete().eq("id", id);
  if (error) throw error;
}

export async function getUserSettings(userId: string) {
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data as UserSettings | null;
}

export async function updateUserSettings(
  userId: string,
  settings: Partial<Omit<UserSettings, "id" | "user_id" | "created_at">>
) {
  const { data, error } = await supabase
    .from("user_settings")
    .upsert({ user_id: userId, ...settings })
    .select()
    .single();

  if (error) throw error;
  return data;
}
