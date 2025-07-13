"use server";

import { prisma } from "@/lib/prisma";


export async function findProduct(id: string) {
    return await prisma.product.findUnique(
        {
            where: { id: id },
            include: {
                category: true,
            }
        }
    );
}