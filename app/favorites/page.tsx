import { Heart, Star, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// Componente Shell personalizado (similar al de shadcn)
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

// Componente EmptyPlaceholder personalizado
function EmptyPlaceholder({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
        <Icon className="h-8 w-8 text-rose-500" />
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

function FavoritesPage() {
  // Datos de ejemplo
  const favorites = [
    {
      id: 1,
      name: "Zapatillas Deportivas Pro",
      price: 89.99,
      originalPrice: 120.0,
      image: "/placeholder-shoes.jpg",
      rating: 4.8,
      isOnSale: true,
    },
    {
      id: 2,
      name: "Camiseta Premium Algodón",
      price: 29.99,
      originalPrice: 39.99,
      image: "/placeholder-shirt.jpg",
      rating: 4.5,
      isOnSale: false,
    },
    {
      id: 3,
      name: "Reloj Inteligente Elite",
      price: 199.99,
      originalPrice: 249.99,
      image: "/placeholder-watch.jpg",
      rating: 4.9,
      isOnSale: true,
    },
  ];

  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Tus Favoritos
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Search className="h-4 w-4" />
              Ordenar
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Search className="h-4 w-4" />
              Filtrar
            </Button>
          </div>
        </div>

        <Separator />

        {favorites.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favorites.map((item) => (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-background/60 backdrop-blur-sm hover:bg-destructive/20 hover:text-destructive"
                    aria-label="Quitar de favoritos"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>

                  <CardHeader className="p-0 pb-2">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {item.isOnSale && (
                        <Badge
                          variant="destructive"
                          className="absolute left-2 top-2"
                        >
                          Oferta
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    <h3 className="line-clamp-1 font-medium">{item.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-bold">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating)
                              ? "fill-current text-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground">
                        ({item.rating})
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-2 p-4 pt-0">
                    <Button variant="outline" className="flex-1" size="sm">
                      Ver detalles
                    </Button>
                    <Button className="flex-1" size="sm">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Añadir
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <EmptyPlaceholder
            icon={Heart}
            title="No hay favoritos"
            description="Aún no has guardado ningún producto en tus favoritos. Empieza a explorar nuestra tienda y guarda tus productos favoritos."
            action={<Button>Explorar productos</Button>}
          />
        )}
      </div>
    </Shell>
  );
}

export default FavoritesPage;
