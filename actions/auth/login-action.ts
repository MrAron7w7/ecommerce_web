"use server";

import { comparePassword } from "@/helpers/crypt";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import loginSchema from "@/schemas/login.schema";
import { z } from "zod";



type AuthResponse = {
    success: boolean;
    message: string;
    error?: string;
    status: 'success' | 'error' | 'unauthorized';
};

export async function loginAction(
    values: z.infer<typeof loginSchema>
): Promise<AuthResponse> {
    const { data, success } = loginSchema.safeParse(values);

        if (!success) {
            return {
                success: false,
                message: "Validation failed",
                error: "Validation failed",
                status: 'error'
            };
        }

        const { email, password } = data;

        const existingUser = await prisma.user.findFirst({
              where: {
                email: email,
              },
        });
        
        if (!existingUser) {
            return {
              success: false,
              message: "User not found",
              error: "User not found",
              status: "error",
            };
          }

          const passwordMatch = await comparePassword(
            password,
            existingUser.password as string
      );
      
      console.log({passwordMatch})
        
        if (!passwordMatch) {
            return {
              success: false,
              message: "Invalid credentials",
              error: "Invalid credentials",
              status: "unauthorized",
            };
          }

        await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
            // callbackUrl: "/dashboard"
        })

        return {
            success: true,
            message: "Logged in",
            status: 'success'
        }
}