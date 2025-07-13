import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const products = [
  {
    id: 1,
    name: "Zapatillas Deportivas",
    price: 89.99,
    image: "/uploads/ba0fea94-0dfb-4daa-814e-61891c33c893-calzados.jpg",
    category: "Calzado",
    description: "Zapatillas deportivas de alta calidad para running"
  },
  {
    id: 2,
    name: "Camiseta Casual",
    price: 29.99,
    image: "/uploads/1ccc4dbc-b50c-43b6-8af6-aff426cf77b8-ecommerce.png",
    category: "Ropa",
    description: "Camiseta casual de algodón 100% premium"
  },
  {
    id: 3,
    name: "Reloj Inteligente",
    price: 199.99,
    image: "/uploads/3df502ad-8eee-4da8-bbd6-861333d051fd-ecommerce.png",
    category: "Accesorios",
    description: "Smartwatch con múltiples funciones deportivas"
  },
  // Más productos para el catálogo
  {
    id: 4,
    name: "Pantalón Deportivo",
    price: 49.99,
    image: "/uploads/1ccc4dbc-b50c-43b6-8af6-aff426cf77b8-ecommerce.png",
    category: "Ropa",
    description: "Pantalón deportivo cómodo y transpirable"
  },
  {
    id: 5,
    name: "Bolso de Cuero",
    price: 129.99,
    image: "/uploads/3df502ad-8eee-4da8-bbd6-861333d051fd-ecommerce.png",
    category: "Accesorios",
    description: "Bolso de cuero genuino con diseño elegante"
  },
  {
    id: 6,
    name: "Zapatillas Casual",
    price: 79.99,
    image: "/uploads/ba0fea94-0dfb-4daa-814e-61891c33c893-calzados.jpg",
    category: "Calzado",
    description: "Zapatillas casuales perfectas para el día a día"
  }
];

export default function ProductsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Nuestros Productos</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <Input
            placeholder="Buscar productos..."
            className="max-w-sm"
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="calzado">Calzado</SelectItem>
              <SelectItem value="ropa">Ropa</SelectItem>
              <SelectItem value="accesorios">Accesorios</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="precio-bajo">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="precio-alto">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="nombre">Nombre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto flex justify-between items-center">
              <span className="text-2xl font-bold">${product.price}</span>
              <Button>Agregar al Carrito</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
