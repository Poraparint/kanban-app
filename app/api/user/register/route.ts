import { RegisterSchema } from "@/schemas/auth";
import { createUser } from "@/service/user/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const values = await request.json();

  const parsed = RegisterSchema.safeParse(values);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid input",
        issues: parsed.error.issues,
      },
      { status: 400 }
    );
  }

  const { email, password, username } = parsed.data;

  try {
    const user = await createUser({ email, password, username });
    return NextResponse.json(
      {
        success: "User created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      {
        error: "User creation failed",
      },
      { status: 500 }
    );
  }
}
