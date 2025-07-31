import { db } from "@/lib/db";
import { CreateUserInput } from "@/interface/user";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
};

export const createUser = async ({
  email,
  password,
  username,
}: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  
  try {
    const user = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    return user;
  } catch {
    return null;
  }
};
