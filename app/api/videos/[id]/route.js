import { NextResponse } from "next/server";

import {
  writeFile,
  unlink,
  mkdir,
} from "fs/promises";

import path from "path";
import { randomUUID } from "crypto";

import { connectDB } from "@/app/lib/mongodb";
import Video from "@/app/models/Video";

export const runtime = "nodejs";

// ======================================
// UPDATE VIDEO
// ======================================

export async function PUT(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    const video =
      await Video.findById(id);

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found",
        },
        { status: 404 }
      );
    }

    const formData =
      await request.formData();

    const title =
      formData.get("title");

    const file =
      formData.get("file");

    if (
      !title ||
      typeof title !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Video title is required",
        },
        { status: 400 }
      );
    }

    // Update title
    video.title =
      title.trim();

    // ======================================
    // REPLACE VIDEO
    // ======================================

    if (
      file &&
      typeof file !== "string"
    ) {
      const allowedTypes = [
        "video/mp4",
        "video/webm",
        "video/ogg",
        "video/quicktime",
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
              "Only MP4, WEBM, OGG and MOV videos are allowed",
          },
          { status: 400 }
        );
      }

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

      const extension =
        path.extname(
          file.name
        ).toLowerCase();

      const newFilename =
        `${randomUUID()}${extension}`;

      const newFilePath =
        path.join(
          uploadDirectory,
          newFilename
        );

      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      await writeFile(
        newFilePath,
        buffer
      );

      // Delete old video
      if (video.filename) {
        const oldFilePath =
          path.join(
            uploadDirectory,
            video.filename
          );

        try {
          await unlink(
            oldFilePath
          );
        } catch (error) {
          console.log(
            "Old video not found"
          );
        }
      }

      video.filename =
        newFilename;

      video.filepath =
        `/uploads/videos/${newFilename}`;

      video.mimetype =
        file.type;

      video.size =
        file.size;
    }

    await video.save();

    return NextResponse.json(
      {
        success: true,
        message:
          "Video updated successfully",
        video,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "VIDEO UPDATE ERROR:",
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

// ======================================
// DELETE VIDEO
// ======================================

export async function DELETE(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    const video =
      await Video.findById(id);

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found",
        },
        { status: 404 }
      );
    }

    // Delete physical file
    if (video.filename) {
      const filePath =
        path.join(
          process.cwd(),
          "public",
          "uploads",
          "videos",
          video.filename
        );

      try {
        await unlink(
          filePath
        );
      } catch (error) {
        console.log(
          "Video file already deleted"
        );
      }
    }

    // Delete MongoDB record
    await Video.findByIdAndDelete(
      id
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Video deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "VIDEO DELETE ERROR:",
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