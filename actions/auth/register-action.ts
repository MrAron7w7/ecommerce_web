"use server";

import { encryptPassword } from "@/helpers/crypt";
import { prisma } from "@/lib/prisma";
import registerSchema from "@/schemas/register.schema";
import { z } from "zod";


type AuthResponse = {
    success: boolean;
    message: string;
    error?: string;
    status: 'success' | 'error' ;
};

export async function registerAction(
    values: z.infer<typeof registerSchema>
  ): Promise<AuthResponse> {
    const { success, data, error } = registerSchema.safeParse(values);
  
      if (!success) {
        return {
          success: false,
          message: "Invalid input",
          error: error?.issues[0]?.message,
          status: "error",
        };
      }
  
      // Verificamos si el usuario ya existe
      const { name, email, password } = data;
  
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email.toLocaleLowerCase(),
        },
      });
  
      if (existingUser) {
        return {
          success: false,
          message: "User already exists",
          error: "User already exists",
          status: "error",
        };
      }
  
      //   Contraseña encriptada
      const hashedPassword = await encryptPassword(password);
  
      await prisma.user.create({
        data: {
          email: email.toLocaleLowerCase(),
          name: name,
          password: hashedPassword,
        },
      });
  
      return {
        success: true,
        message: "User registered successfully",
        status: "success",
      };
  }