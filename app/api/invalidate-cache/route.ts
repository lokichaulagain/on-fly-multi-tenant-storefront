import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { tag } = await request.json();

  if (!tag) {
    return NextResponse.json({ message: "Tag is required" }, { status: 400 });
  }

  try {
    // Revalidate the cache tag
    revalidateTag(tag);
    return NextResponse.json({ message: `Cache invalidated for tag: ${tag}` }, { status: 200 });
  } catch (error) {
    console.error("Error invalidating cache:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
