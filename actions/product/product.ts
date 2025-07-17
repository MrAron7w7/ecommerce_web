"use server";

import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

type ProductWithCategory = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    description: string | null;
    status: boolean;
  };
};

export type SortOption = 
  | "rating-desc" 
  | "price-asc" 
  | "price-desc" 
  | "newest" 
  | "discount";

export async function getFilteredProducts({
  categoryIds = [],
  minPrice,
  maxPrice,
  inStockOnly = false,
  sortBy = "newest",
  searchQuery = "",
  page = 1,
  limit = 8,
}: {
  categoryIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: SortOption;
  searchQuery?: string;
  page?: number;
  limit?: number;
}): Promise<{
  products: ProductWithCategory[];
  totalCount: number;
}> {
  const skip = (page - 1) * limit;

  const where = {
    status: true,
    ...(categoryIds.length > 0 && {
      categoryId: { in: categoryIds },
    }),
    ...(minPrice !== undefined && {
      price: { gte: new Decimal(minPrice) },
    }),
    ...(maxPrice !== undefined && {
      price: { lte: new Decimal(maxPrice) },
    }),
    ...(inStockOnly && {
      stock: { gt: 0 },
    }),
    ...(searchQuery && {
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ],
    }),
  };

  const orderBy = (() => {
    switch (sortBy) {
      case "price-asc":
        return { price: "asc" };
      case "price-desc":
        return { price: "desc" };
      case "newest":
        return { createdAt: "desc" };
      default:
        return { createdAt: "desc" };
    }
  })();

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        category: true,
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    })),
    totalCount,
  };
}

export async function getAllCategories() {
  return await prisma.category.findMany({
    where: { status: true },
    orderBy: { name: "asc" },
  });
}