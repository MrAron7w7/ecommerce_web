import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import loginSchema from "@/schemas/login.schema"
import { comparePassword } from "@/helpers/crypt"
import { prisma } from "./prisma"
 
export default {
  providers: [
        Credentials({
            credentials: {
              email : { },
              password: { }
            },
            authorize: async (credentials) => {
                const validated = loginSchema.safeParse(credentials);

                if (!validated.success) return null;

                const {email, password} = validated.data;

                const user = await prisma.user.findUnique({
                    where: { email: email },
                });

                if (!user || !user.password) return null;

                const isValid = await comparePassword(password, user.password);

                if (!isValid) return null;
                
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
             }
        }),
    ],
} satisfies NextAuthConfig