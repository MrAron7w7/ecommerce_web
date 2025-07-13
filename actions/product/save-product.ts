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

export async function SaveProduct(
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

  let imageUrl: string | null = null;

  // ✅ 3. Guardar imagen en disco (si hay)
  if (data.image && data.image instanceof File) {
    const bytes = await data.image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${randomUUID()}-${data.image.name}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(filepath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  // ✅ 4. Guardar en la base de datos con Prisma
  await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      status: data.status,
      imageUrl,
      categoryId: data.category,
    },
  });

  return {
    success: true,
    message: "Product saved successfully",
    status: "success",
  };
}
