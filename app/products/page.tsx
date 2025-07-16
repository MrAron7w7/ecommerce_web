import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ShoppingCart,
  Heart,
  Star,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Datos de ejemplo (en un proyecto real estos vendrían de tu API)
const products = [
  {
    id: "1",
    name: "Zapatillas Running Pro",
    description: "Zapatillas de running con amortiguación avanzada",
    price: 129.99,
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Zapatillas",
    rating: 4.5,
    reviews: 24,
    isNew: true,
    discount: 15,
  },
  {
    id: "2",
    name: "Camiseta Deportiva TechFit",
    description: "Camiseta transpirable para entrenamiento intenso",
    price: 34.99,
    stock: 100,
    imageUrl: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9",
    category: "Ropa",
    rating: 4.2,
    reviews: 18,
    isNew: false,
    discount: 0,
  },
  {
    id: "3",
    name: "Smartwatch Fitness Pro",
    description: "Monitor de actividad con GPS y medición de oxígeno",
    price: 199.99,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electrónica",
    rating: 4.8,
    reviews: 42,
    isNew: true,
    discount: 10,
  },
  {
    id: "4",
    name: "Mochila Impermeable Trail",
    description: "Mochila 20L resistente al agua con portabotella",
    price: 59.99,
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "Accesorios",
    rating: 4.3,
    reviews: 15,
    isNew: false,
    discount: 0,
  },
  {
    id: "5",
    name: "Pantalones Deportivos Flex",
    description: "Pantalones con tecnología de secado rápido",
    price: 49.99,
    stock: 75,
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    category: "Ropa",
    rating: 4.6,
    reviews: 31,
    isNew: false,
    discount: 20,
  },
  {
    id: "6",
    name: "Mancuernas Ajustables",
    description: "Set de 2 mancuernas ajustables de 5-25kg",
    price: 89.99,
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    category: "Equipamiento",
    rating: 4.7,
    reviews: 28,
    isNew: true,
    discount: 0,
  },
  {
    id: "7",
    name: "Rodilleras de Compresión",
    description: "Rodilleras para soporte en entrenamientos intensos",
    price: 29.99,
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a",
    category: "Accesorios",
    rating: 4.4,
    reviews: 19,
    isNew: false,
    discount: 0,
  },
  {
    id: "8",
    name: "Bicicleta de Montaña",
    description: "Bicicleta con cuadro de aluminio y 21 velocidades",
    price: 499.99,
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
    category: "Ciclismo",
    rating: 4.9,
    reviews: 37,
    isNew: false,
    discount: 25,
  },
];

const categories = [
  { id: "1", name: "Zapatillas" },
  { id: "2", name: "Ropa" },
  { id: "3", name: "Electrónica" },
  { id: "4", name: "Accesorios" },
  { id: "5", name: "Equipamiento" },
  { id: "6", name: "Ciclismo" },
];

export default function ProductsPage() {
  // Estado para filtros (en un proyecto real usarías useState o searchParams)
  const activeFilters = {
    category: ["Zapatillas", "Ropa"],
    priceRange: [0, 200],
    inStock: true,
    sortBy: "rating-desc",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero Section */}
      <section className="bg-white border-b w-full">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-bold">Nuestros Productos</h1>
          <p className="text-gray-600 mt-2">
            Descubre nuestra selección premium de equipamiento deportivo
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" /> Filtros
              </h2>
              <Button variant="ghost" size="sm" className="text-gray-500">
                Limpiar todo
              </Button>
            </div>

            {/* Active Filters */}
            {activeFilters.category.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Filtros aplicados</h3>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.category.map((category, index) => (
                    <Badge key={index} variant="outline" className="pl-2">
                      {category}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Filter */}
            <div>
              <h3 className="text-sm font-medium mb-2">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={activeFilters.category.includes(category.name)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-medium mb-2">Rango de precios</h3>
              <Slider
                defaultValue={activeFilters.priceRange}
                max={500}
                step={10}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${activeFilters.priceRange[0]}</span>
                <span>${activeFilters.priceRange[1]}</span>
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" checked={activeFilters.inStock} />
                <label
                  htmlFor="in-stock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Solo productos en stock
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sorting and Results */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-sm text-gray-600">
                Mostrando <span className="font-medium">1-8</span> de{" "}
                <span className="font-medium">24</span> productos
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <Select defaultValue={activeFilters.sortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating-desc">Mejor valorados</SelectItem>
                    <SelectItem value="price-asc">
                      Precio: menor a mayor
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Precio: mayor a menor
                    </SelectItem>
                    <SelectItem value="newest">Más recientes</SelectItem>
                    <SelectItem value="discount">Mejores descuentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2">Nuevo</Badge>
                    )}
                    {product.discount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute top-2 right-2"
                      >
                        -{product.discount}%
                      </Badge>
                    )}
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
                      {product.category}
                    </Badge>
                    <CardTitle className="text-lg">
                      <Link
                        href={`/products/${product.id}`}
                        className="hover:text-primary"
                      >
                        {product.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.discount > 0 ? (
                        <>
                          <p className="text-lg font-bold">
                            $
                            {(
                              product.price *
                              (1 - product.discount / 100)
                            ).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-bold">
                          ${product.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button variant="outline" className="flex-1 w-full" asChild>
                      <Link href={`/products/${product.id}`}>Ver detalles</Link>
                    </Button>
                    <Button className="flex-1 w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Añadir
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <span className="px-2">...</span>
                <Button variant="outline">8</Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
