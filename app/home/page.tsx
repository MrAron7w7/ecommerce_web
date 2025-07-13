import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Descubre Productos Increíbles
              </h1>
              <p className="text-gray-600 mb-6">
                Explora nuestra colección de productos de alta calidad a precios
                increíbles.
              </p>
              <Button size="lg">Comprar Ahora</Button>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-video bg-gray-200 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Product Image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className="md:w-1/4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Categorías</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="electronics">Electrónicos</SelectItem>
                    <SelectItem value="clothing">Ropa</SelectItem>
                    <SelectItem value="home">Hogar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                className="hidden md:block w-64"
                placeholder="Buscar productos..."
              />
            </div>

            {/* Products Grid */}
            <div className="md:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Product Card Example */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4">
                      <Badge className="mb-2">Nuevo</Badge>
                      <h3 className="font-semibold mb-2">Producto {item}</h3>
                      <p className="text-gray-600 mb-2">$99.99</p>
                      <Button className="w-full">Agregar al Carrito</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
