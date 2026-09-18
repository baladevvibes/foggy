import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Tag from "@/app/models/Tag";


// UPDATE TAG
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    let { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Tag name is required",
        },
        { status: 400 }
      );
    }

    const cleanName = name
      .trim()
      .replace(/^#+/, "")
      .trim();

    const slug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const hashtag = `#${cleanName.replace(
      /\s+/g,
      ""
    )}`;

    const existingTag = await Tag.findOne({
      _id: { $ne: id },
      $or: [
        { slug },
        { hashtag },
      ],
    });

    if (existingTag) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Another tag with this name already exists",
        },
        { status: 409 }
      );
    }

    const tag = await Tag.findByIdAndUpdate(
      id,
      {
        name: cleanName,
        slug,
        hashtag,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: "Tag not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Tag updated successfully",
        tag,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE TAG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}


// DELETE TAG
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: "Tag not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Tag deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE TAG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}