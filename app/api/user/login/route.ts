import { LoginSchema } from "@/schemas/auth";
import { verifyPassword } from "@/service/user/password";
import { getUserByEmail } from "@/service/user/user";
import { signIn } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function POST(request: NextRequest) {
  const values = await request.json();
  const parsed = LoginSchema.safeParse(values);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  const callbackUrl = values.callbackUrl || DEFAULT_LOGIN_REDIRECT;

  const user = await getUserByEmail(email);

  if (!user || !user.password) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      { status: 404 }
    );
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return NextResponse.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return NextResponse.json({ url: callbackUrl });
  } catch (error) {
    if (error) {
      return NextResponse.json(
        { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
