/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { prisma } from "@/lib/prisma";
import categorySchema from "@/schemas/category.schema";
import CategoryResponse from "@/types/category-response";
import z from "zod";


export async function updateCategory(
  id: string,
  data: z.infer<typeof categorySchema>
): Promise<CategoryResponse> {
  const result = categorySchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Validación fallida",
      status: "error",
    };
  }

  try {
    await prisma.category.update({
      where: { id },
      data: result.data,
    });

    return {
      success: true,
      message: "Categoría actualizada",
      status: "success",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar categoría",
      status: "error",
    };
  }
}