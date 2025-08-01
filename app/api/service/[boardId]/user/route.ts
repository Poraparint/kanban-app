import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const boardId =  params.boardId;
  
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "Not Authorized",
      },
      { status: 403 }
    );
  }

  if (!boardId) {
    return NextResponse.json(
      {
        error: "Missing board",
      },
      { status: 400 }
    );
  }

  try {
    const user = await db.boardMember.findMany({
      where: { boardId },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (user.length < 1) {
      return NextResponse.json({
        error: "User not found",
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("[SCHEDULE_CATEGORY_GET]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
