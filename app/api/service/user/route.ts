import { getUserByEmail } from "@/service/user/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) { 
    const email = request.nextUrl.searchParams.get("email");
    const user = await getUserByEmail(email || "");
    return NextResponse.json(user);
 }