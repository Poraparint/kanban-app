import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user" | undefined] & {
  id: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
