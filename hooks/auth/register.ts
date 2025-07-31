import { RegisterSchema } from "@/schemas/auth";
import z from "zod";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const response = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
      const data = await response.json();
      
    if (!response.ok) {
      return {
        error: data.error,
        issues: data.issues,
      };
    }

    return {
      success: data.success,
    };
  } catch {
    return {
      error: "Something went wrong",
    };
  }
};
