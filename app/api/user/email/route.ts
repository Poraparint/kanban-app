import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({
      error: "Not Authorized"
    },
    {status: 500})
  }

  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      {
        error: "Missing email",
      },
      { status: 400 }
    );
  }

  const normalized = email;

  try {
    const user = await db.user.findUnique({
      where: { email: normalized },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        user: null,
      });
    }

    const { id, username, email } = user;
    return NextResponse.json({
      user: { id, username, email },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
