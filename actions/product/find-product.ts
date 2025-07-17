"use server";

import { prisma } from "@/lib/prisma";

export async function findProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) return null;

    // Convertir Decimal a number
    return {
      ...product,
      price: product.price.toNumber(),
    };
  } catch (error) {
    console.error("Error finding product:", error);
    return null;
  }
}