import { prisma } from "@/lib/prisma";

export async function getProducts() {
  const rawProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
    },
  });

  // Convertimos los Decimal a number
  return rawProducts.map((product) => ({
    ...product,
    price: product.price.toNumber(),
  }));
}
