// src/app/favorites/page.tsx
"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/store/favorites-store";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { favorites, removeFavorite, count, isHydrated } = useFavorites();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isHydrated || !isClient) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Tus Favoritos{" "}
            <span className="text-muted-foreground">({count})</span>
          </h1>
        </div>

        <Separator />

        {count > 0 ? (
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
                  onClick={() => removeFavorite(item.id)}
                  aria-label="Quitar de favoritos"
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>

                <CardHeader className="p-0 pb-2">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Sin imagen
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                  <h3 className="line-clamp-1 font-medium">{item.name}</h3>
                  <Badge variant="outline" className="mt-2">
                    {item.category.name}
                  </Badge>
                  <div className="mt-2">
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2 p-4 pt-0">
                  <Button
                    variant="outline"
                    className="flex-1"
                    size="sm"
                    asChild
                  >
                    <Link href={`/products/${item.id}`}>Ver detalles</Link>
                  </Button>
                  <Button className="flex-1" size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Añadir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
              <Heart className="h-8 w-8 text-rose-500" />
            </div>
            <h2 className="text-xl font-semibold">No hay favoritos</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Añade algunos productos para comenzar tu lista de favoritos
            </p>
            <Button asChild className="mt-4">
              <Link href="/products">Explorar productos</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
