import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { connectDB } from "@/app/lib/mongodb";
import Video from "@/app/models/Video";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const file = formData.get("file");
    const title = formData.get("title");

    // ============================
    // VALIDATION
    // ============================

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a video",
        },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Video title is required",
        },
        { status: 400 }
      );
    }

    // ============================
    // ALLOWED VIDEO TYPES
    // ============================

    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only MP4, WEBM, OGG and MOV videos are allowed",
        },
        { status: 400 }
      );
    }

    // ============================
    // FILE SIZE
    // ============================

    // 100 MB
    const maxSize =
      100 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Video size must be less than 100 MB",
        },
        { status: 400 }
      );
    }

    // ============================
    // UPLOAD DIRECTORY
    // ============================

    const uploadDirectory =
      path.join(
        process.cwd(),
        "public",
        "uploads",
        "videos"
      );

    await mkdir(
      uploadDirectory,
      {
        recursive: true,
      }
    );

    // ============================
    // FILE NAME
    // ============================

    const extension =
      path.extname(file.name)
        .toLowerCase();

    const newFilename =
      `${randomUUID()}${extension}`;

    const filePath =
      path.join(
        uploadDirectory,
        newFilename
      );

    // ============================
    // SAVE FILE
    // ============================

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    await writeFile(
      filePath,
      buffer
    );

    // ============================
    // VIDEO URL
    // ============================

    const videoUrl =
      `/uploads/videos/${newFilename}`;

    // ============================
    // SAVE DATABASE
    // ============================

    const video =
      await Video.create({
        title: title.trim(),
        filename: newFilename,
        filepath: videoUrl,
        mimetype: file.type,
        size: file.size,
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Video uploaded successfully",
        video,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "VIDEO UPLOAD ERROR:",
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