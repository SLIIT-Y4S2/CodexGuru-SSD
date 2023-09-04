import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      userRegNo: string;
      firstName: string;
      lastName: string;
      role: string;
      token: string;
    };
  }
}
