import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {params}: { params: Promise<{ boardId: string }> }
) {
  const { boardId } = await params;

  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 403 });
  }

  try {
    const boardMembers = await db.boardMember.findMany({
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

    if (!boardMembers.length) {
      return NextResponse.json({ error: "No members found" }, { status: 404 });
    }

    return NextResponse.json(boardMembers);
  } catch (error) {
    console.error("[BOARD_MEMBERS_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
