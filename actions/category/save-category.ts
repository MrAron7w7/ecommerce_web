"use server";

import { prisma } from "@/lib/prisma";
import categorySchema from "@/schemas/category.schema";
import CategoryResponse from "@/types/category-response";
import z from "zod";



export async function saveCategory(
  formData: z.infer<typeof categorySchema>
): Promise<CategoryResponse> {
  const result = categorySchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      status: "error",
    };
  }

  const { name, description, status } = result.data;

  await prisma.category.create({
    data: {
      name,
      description,
      status,
    },
  });

  return {
    success: true,
    message: "Categoría creada",
    status: "success",
  };
}
