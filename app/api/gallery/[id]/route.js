import { NextResponse } from "next/server";
import {
  writeFile,
  unlink,
  mkdir,
} from "fs/promises";

import path from "path";
import { randomUUID } from "crypto";

import { connectDB } from "@/app/lib/mongodb";
import Gallery from "@/app/models/Gallery";

export const runtime = "nodejs";


// ==========================================
// UPDATE GALLERY
// ==========================================

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const gallery =
      await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery image not found",
        },
        { status: 404 }
      );
    }

    const formData =
      await req.formData();

    const title =
      formData.get("title");

    const file =
      formData.get("file");

    const tagsString =
      formData.get("tags");

    // -------------------------
    // TITLE
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
    // UPDATE TITLE + TAGS
    // -------------------------

    gallery.title =
      title.trim();

    gallery.tags = tags;

    // -------------------------
    // OPTIONAL FILE
    // -------------------------

    if (file && file.size > 0) {

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
      ];

      if (
        !allowedTypes.includes(
          file.type
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid image type",
          },
          { status: 400 }
        );
      }

      const maxSize =
        5 * 1024 * 1024;

      if (file.size > maxSize) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Image must be less than 5 MB",
          },
          { status: 400 }
        );
      }

      // -------------------------
      // DELETE OLD FILE
      // -------------------------

      if (gallery.filepath) {

        const oldFilePath =
          path.join(
            process.cwd(),
            "public",
            gallery.filepath
          );

        try {
          await unlink(
            oldFilePath
          );
        } catch (error) {
          console.log(
            "Old image not found:",
            error.message
          );
        }
      }

      // -------------------------
      // NEW FILE
      // -------------------------

      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      const extension =
        path.extname(
          file.name
        ) || ".jpg";

      const filename =
        `${randomUUID()}${extension}`;

      const uploadDir =
        path.join(
          process.cwd(),
          "public",
          "uploads",
          "gallery"
        );

      await mkdir(
        uploadDir,
        {
          recursive: true,
        }
      );

      const newFilePath =
        path.join(
          uploadDir,
          filename
        );

      await writeFile(
        newFilePath,
        buffer
      );

      gallery.filename =
        filename;

      gallery.filepath =
        `/uploads/gallery/${filename}`;

      gallery.mimetype =
        file.type;

      gallery.size =
        file.size;
    }

    // -------------------------
    // SAVE
    // -------------------------

    await gallery.save();

    return NextResponse.json(
      {
        success: true,
        message:
          "Image updated successfully",
        gallery,
      },
      { status: 200 }
    );

  } catch (error) {

    console.error(
      "UPDATE GALLERY ERROR:",
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


// ==========================================
// DELETE GALLERY
// ==========================================

export async function DELETE(
  req,
  { params }
) {
  try {
    await connectDB();

    const { id } =
      await params;

    const gallery =
      await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Gallery image not found",
        },
        { status: 404 }
      );
    }

    // -------------------------
    // DELETE FILE
    // -------------------------

    if (gallery.filepath) {

      const filePath =
        path.join(
          process.cwd(),
          "public",
          gallery.filepath
        );

      try {
        await unlink(filePath);
      } catch (error) {
        console.log(
          "File already missing:",
          error.message
        );
      }
    }

    // -------------------------
    // DELETE DATABASE
    // -------------------------

    await Gallery.findByIdAndDelete(
      id
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Image deleted successfully",
      },
      { status: 200 }
    );

  } catch (error) {

    console.error(
      "DELETE GALLERY ERROR:",
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