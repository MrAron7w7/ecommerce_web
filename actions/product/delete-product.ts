"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";

export async function deleteProduct(id: string) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  // 1. Obtener el producto primero para ver si tiene imagen
  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // 2. Si tiene imagen, eliminarla del sistema de archivos
  if (product.imageUrl) {
    try {
      const imagePath = path.join(process.cwd(), "public", product.imageUrl);
      await unlink(imagePath);
    } catch (error) {
      console.error("Error deleting image file:", error);
      // No lanzamos error aquí para que la eliminación del producto continúe
    }
  }

  // 3. Eliminar el producto de la base de datos
  await prisma.product.delete({ where: { id: id } });

  revalidatePath("/dashboard/products");
}