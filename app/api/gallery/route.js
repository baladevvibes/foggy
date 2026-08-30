
import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Gallery from "@/app/models/Gallery";

export async function GET() {
  try {
    await connectDB();

    const images = await Gallery.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        images,
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(
      "GET GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

