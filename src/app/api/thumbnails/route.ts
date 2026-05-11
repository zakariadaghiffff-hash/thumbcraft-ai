import { NextRequest, NextResponse } from "next/server";
import { getUserThumbnails, saveThumbnail, deleteThumbnail } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const thumbnails = await getUserThumbnails(userId);
    return NextResponse.json({ thumbnails });
  } catch (error) {
    console.error("Fetch thumbnails error:", error);
    return NextResponse.json(
      { error: "Failed to fetch thumbnails" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { prompt, style, image_url } = body;

    const thumbnail = await saveThumbnail({
      user_id: userId,
      prompt,
      style,
      image_url,
    });

    return NextResponse.json({ thumbnail });
  } catch (error) {
    console.error("Save thumbnail error:", error);
    return NextResponse.json(
      { error: "Failed to save thumbnail" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Thumbnail ID is required" },
        { status: 400 }
      );
    }

    await deleteThumbnail(id, userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete thumbnail error:", error);
    return NextResponse.json(
      { error: "Failed to delete thumbnail" },
      { status: 500 }
    );
  }
}
