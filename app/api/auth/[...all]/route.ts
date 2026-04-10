import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await auth.handler(request);
    return response;
  } catch (error) {
    console.error("[auth-get-error]", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await auth.handler(request);
    return response;
  } catch (error) {
    console.error("[auth-post-error]", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}




