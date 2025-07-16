/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { prisma } from "@/lib/prisma";
import CategoryResponse from "@/types/category-response";


export async function deleteCategory(id: string): Promise<CategoryResponse> {
  try {
    await prisma.category.delete({ where: { id } });
    return {
      success: true,
      message: "Categoría eliminada",
      status: "success",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar la categoría",
      status: "error",
    };
  }
}