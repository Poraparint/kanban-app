import { LoginSchema } from "@/schemas/auth";
import z from "zod";

export const Login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ ...values, callbackUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.redirected) {
      return { redirect: response.url };
    }

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error };
    }

    return {
      success: data.success,
      url: data.url,
    };
  } catch {
    return {
      error: "Something went wrong",
    };
  }
};
