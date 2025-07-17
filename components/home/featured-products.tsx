import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { getProducts } from "@/actions/product/get-product";
import { ProductCard } from "./product/product-card";

async function FeaturedProducts() {
  const featuredProducts = await getProducts();
  // const featuredProducts = [
  //   {
  //     id: "1",
  //     name: "Zapatillas Running Pro",
  //     description: "Zapatillas de running con amortiguación avanzada",
  //     price: 129.99,
  //     stock: 50,
  //     imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  //     category: "Zapatillas",
  //   },
  //   {
  //     id: "2",
  //     name: "Camiseta Deportiva",
  //     description: "Camiseta transpirable para entrenamiento",
  //     price: 29.99,
  //     stock: 100,
  //     imageUrl: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9",
  //     category: "Ropa",
  //   },
  //   {
  //     id: "3",
  //     name: "Smartwatch Fitness",
  //     description: "Monitor de actividad con GPS incorporado",
  //     price: 199.99,
  //     stock: 30,
  //     imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  //     category: "Electrónica",
  //   },
  //   {
  //     id: "4",
  //     name: "Mochila Impermeable",
  //     description: "Mochila resistente al agua con múltiples compartimentos",
  //     price: 59.99,
  //     stock: 45,
  //     imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
  //     category: "Accesorios",
  //   },
  // ];

  return (
    <section className="container py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Productos destacados</h2>
        <Button variant="link" asChild>
          <Link href="/products">
            Ver todos <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showDescription={true}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
