"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  await prisma.product.delete({ where: { id: id } });

  revalidatePath("/dashboard/products");
}
