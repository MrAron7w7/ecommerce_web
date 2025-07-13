"use server";

import { prisma } from "@/lib/prisma";
import categorySchema from "@/schemas/category.schema";
import z from "zod";

type CategoryResponse = {
  success: boolean;
  message: string;
  error?: string;
  status: "success" | "error";
};

export async function saveCategory(
  formData: z.infer<typeof categorySchema>
): Promise<CategoryResponse> {
  const result = categorySchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      error: result.error.message,
      status: "error",
    };
  }

  const { name, description } = result.data;

  await prisma.category.create({
    data: {
      name: name,
      description: description,
    },
  });

  return {
    success: true,
    message: "Categoría creada",
    status: "success",
  };
}
