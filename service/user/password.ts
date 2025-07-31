import bcrypt from "bcryptjs"

export const verifyPassword = async (plain: string, hashed: string) => {
    return await bcrypt.compare(plain, hashed);
};