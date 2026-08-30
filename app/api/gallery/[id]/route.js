import { NextResponse } from "next/server";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { connectDB } from "@/app/lib/mongodb";
import Gallery from "@/app/models/Gallery";

export const runtime = "nodejs";

// ============================
// UPDATE
// ============================

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const existingImage =
      await Gallery.findById(id);

    if (!existingImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found",
        },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const title = formData.get("title");
    const file = formData.get("file");

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 }
      );
    }

    // Update title
    existingImage.title = title.trim();

    // If new image selected
    if (file && typeof file !== "string") {
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
            message:
              "Maximum image size is 5 MB",
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

      const newFilePath = path.join(
        uploadDirectory,
        newFilename
      );

      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      await writeFile(
        newFilePath,
        buffer
      );

      // Delete old physical image
      if (existingImage.filename) {
        const oldFilePath = path.join(
          uploadDirectory,
          existingImage.filename
        );

        try {
          await unlink(oldFilePath);
        } catch (error) {
          console.log(
            "Old image not found"
          );
        }
      }

      existingImage.filename =
        newFilename;

      existingImage.filepath =
        `/uploads/gallery/${newFilename}`;

      existingImage.mimetype =
        file.type;

      existingImage.size =
        file.size;
    }

    await existingImage.save();

    return NextResponse.json(
      {
        success: true,
        message: "Image updated successfully",
        image: existingImage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// ============================
// DELETE
// ============================

export async function DELETE(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    const image =
      await Gallery.findById(id);

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found",
        },
        { status: 404 }
      );
    }

    // Delete physical file
    if (image.filename) {
      const filePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "gallery",
        image.filename
      );

      try {
        await unlink(filePath);
      } catch (error) {
        console.log(
          "Physical image already deleted"
        );
      }
    }

    // Delete MongoDB record
    await Gallery.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Image deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}