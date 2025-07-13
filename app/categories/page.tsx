import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  {
    name: "Calzado",
    description: "Encuentra el calzado perfecto para cada ocasión",
    image: "/uploads/ba0fea94-0dfb-4daa-814e-61891c33c893-calzados.jpg",
    productCount: 150,
    featured: ["Zapatillas Deportivas", "Zapatos Casuales", "Botas"]
  },
  {
    name: "Ropa",
    description: "Las últimas tendencias en moda para todos los estilos",
    image: "/uploads/1ccc4dbc-b50c-43b6-8af6-aff426cf77b8-ecommerce.png",
    productCount: 320,
    featured: ["Camisetas", "Pantalones", "Chaquetas"]
  },
  {
    name: "Accesorios",
    description: "Complementa tu look con nuestros accesorios",
    image: "/uploads/3df502ad-8eee-4da8-bbd6-861333d051fd-ecommerce.png",
    productCount: 180,
    featured: ["Relojes", "Bolsos", "Cinturones"]
  },
  {
    name: "Deportes",
    description: "Equipamiento y ropa para tus actividades deportivas",
    image: "/uploads/1ccc4dbc-b50c-43b6-8af6-aff426cf77b8-ecommerce.png",
    productCount: 90,
    featured: ["Ropa Deportiva", "Equipamiento", "Accesorios Deportivos"]
  }
];

export default function CategoriesPage() {
  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Categorías</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explora nuestra amplia selección de productos organizados por categorías
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <Card key={category.name} className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl mb-2">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{category.productCount} productos</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Productos destacados:</p>
                      <ul className="text-sm text-gray-600">
                        {category.featured.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                  <Button className="w-full">Ver {category.name}</Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}