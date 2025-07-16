import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

import authConfig from "./auth.config"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
    
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
      jwt({ token, user }) {
        if (user) {
        token.role = user.role; 
    }
    return token;
    },
    session({ session, token }) {
    if (session.user) {
      session.user.role = token.role; 
    }
    return session;
  },
},
    ...authConfig
})