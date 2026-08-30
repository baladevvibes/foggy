import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Video from "@/app/models/Video";

export async function GET() {
  try {
    await connectDB();

    const videos =
      await Video.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json(
      {
        success: true,
        videos,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "GET VIDEOS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}