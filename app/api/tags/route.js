import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Tag from "@/app/models/Tag";

// GET ALL TAGS
export async function GET() {
  try {
    await connectDB();

    const tags = await Tag.find()
      .sort({ name: 1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        tags,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET TAGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// CREATE TAG
export async function POST(req) {
  try {
    await connectDB();

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

    name = name.trim();

    const cleanName = name
      .replace(/^#+/, "")
      .trim();

    if (!cleanName) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid tag name",
        },
        { status: 400 }
      );
    }

    const slug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const hashtag = `#${cleanName.replace(
      /\s+/g,
      ""
    )}`;

    const existingTag = await Tag.findOne({
      $or: [
        { slug },
        { hashtag },
      ],
    });

    if (existingTag) {
      return NextResponse.json(
        {
          success: false,
          message: "Tag already exists",
        },
        { status: 409 }
      );
    }

    const tag = await Tag.create({
      name: cleanName,
      slug,
      hashtag,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Tag created successfully",
        tag,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE TAG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}