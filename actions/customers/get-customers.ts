"use server";

import { prisma } from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";

// Obtener todos los usuarios
export async function getCustomers() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
}

// Cambiar el rol del usuario
export async function updateUserRole(userId: string, role: UserRole) {
  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/dashboard/customers"); 
}
