import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { connectDB } from "@/app/lib/mongodb";
import Gallery from "@/app/models/Gallery";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const file = formData.get("file");
    const title = formData.get("title");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Please select an image",
        },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 }
      );
    }

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
            "Only JPG, PNG, WEBP and GIF are allowed",
        },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Maximum image size is 5 MB",
        },
        { status: 400 }
      );
    }

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "gallery"
    );

    await mkdir(uploadDirectory, {
      recursive: true,
    });

    const extension =
      path.extname(file.name).toLowerCase();

    const newFilename =
      `${randomUUID()}${extension}`;

    const filePath = path.join(
      uploadDirectory,
      newFilename
    );

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    const imageUrl =
      `/uploads/gallery/${newFilename}`;

    const gallery = await Gallery.create({
      title: title.trim(),
      filename: newFilename,
      filepath: imageUrl,
      mimetype: file.type,
      size: file.size,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        image: gallery,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}