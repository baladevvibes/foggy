import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { connectDB } from "@/app/lib/mongodb";
import Gallery from "@/app/models/Gallery";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("file");
    const title = formData.get("title");
    const tagsString = formData.get("tags");

    // -------------------------
    // VALIDATION
    // -------------------------

    if (!title || !title.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is required",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // TAGS
    // -------------------------

    let tags = [];

    if (tagsString) {
      try {
        tags = JSON.parse(tagsString);
      } catch {
        tags = [];
      }
    }

    if (!Array.isArray(tags)) {
      tags = [];
    }

    // -------------------------
    // IMAGE TYPE
    // -------------------------

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid image type. Use JPG, PNG, WEBP or GIF.",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // FILE SIZE
    // -------------------------

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must be less than 5 MB",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // BUFFER
    // -------------------------

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // -------------------------
    // EXTENSION
    // -------------------------

    const extension =
      path.extname(file.name) ||
      ".jpg";

    const filename =
      `${randomUUID()}${extension}`;

    // -------------------------
    // UPLOAD DIRECTORY
    // -------------------------

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "gallery"
    );

    await mkdir(uploadDir, {
      recursive: true,
    });

    // -------------------------
    // FILE PATH
    // -------------------------

    const filePath = path.join(
      uploadDir,
      filename
    );

    await writeFile(
      filePath,
      buffer
    );

    // -------------------------
    // PUBLIC URL
    // -------------------------

    const filepath =
      `/uploads/gallery/${filename}`;

    // -------------------------
    // SAVE DATABASE
    // -------------------------

    const gallery = await Gallery.create({
      title: title.trim(),

      filename,

      filepath,

      mimetype: file.type,

      size: file.size,

      tags,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Image uploaded successfully",
        gallery,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "GALLERY UPLOAD ERROR:",
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