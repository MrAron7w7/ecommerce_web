"use server";

import { prisma } from "@/lib/prisma";
import productSchema from "@/schemas/product.schema";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import z from "zod";

type ProductResponse = {
  success: boolean;
  message: string;
  error?: string;
  status: "success" | "error";
};

export async function UpdateProduct(
  productId: string,
  formData: z.infer<typeof productSchema>
): Promise<ProductResponse> {
  const result = productSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      error: result.error.message,
      status: "error",
    };
  }

  const data = result.data;

  // First, get the existing product to check for existing image
  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!existingProduct) {
    return {
      success: false,
      message: "Product not found",
      status: "error",
    };
  }

  let imageUrl: string | null = existingProduct.imageUrl;

  // Handle image upload if a new image is provided
  if (data.image && data.image instanceof File) {
    const bytes = await data.image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${randomUUID()}-${data.image.name}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(filepath, buffer);
    imageUrl = `/uploads/${filename}`;
    
    // TODO: Optionally delete the old image file if it exists
  } else if (data.image === null) {
    // If image is explicitly set to null, remove the image
    imageUrl = null;
    // TODO: Optionally delete the old image file if it exists
  }

  // Update the product in the database
  await prisma.product.update({
    where: { id: productId },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      status: data.status,
      imageUrl,
      categoryId: data.category,
      updatedAt: new Date(),
    },
  });

  return {
    success: true,
    message: "Product updated successfully",
    status: "success",
  };
}