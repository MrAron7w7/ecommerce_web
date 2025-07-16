import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight, Heart, ShoppingCart, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { getProducts } from "@/actions/product/get-product";

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
          <Card key={product.id} className="group overflow-hidden">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={
                  product.imageUrl ||
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                }
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full h-8 w-8"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardHeader className="pb-2">
              <Badge variant="outline" className="mb-2 w-fit">
                {product.category.name}
              </Badge>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">(24)</span>
              </div>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button variant="outline" className="w-full">
                Ver detalles
              </Button>
              <Button className=" w-full">
                <ShoppingCart className="h-4 w-4 mr-2 " />
                Añadir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
