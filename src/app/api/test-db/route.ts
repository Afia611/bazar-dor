
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;

    await client.db("bazar_dor").command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully!",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed!",
      },
      { status: 500 }
    );
  }
}
