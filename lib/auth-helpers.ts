"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function isAdmin() : Promise<boolean> {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) return false;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user?.role === "ADMIN";
}

// Para ver si esta autenticado
export async function isAuth() : Promise<boolean> {
  const session = await auth();
  return !!session?.user?.email;
}

