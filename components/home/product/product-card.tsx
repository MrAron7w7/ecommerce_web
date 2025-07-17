// src/components/product-card.tsx
"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { useFavorites } from "@/store/favorites-store";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    imageUrl: string | null;
    category: {
      name: string;
    };
    // Campos adicionales para compatibilidad
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    categoryId?: string;
  };
  showDescription?: boolean;
  showFullButton?: boolean;
}

export function ProductCard({
  product,
  showDescription = false,
  showFullButton = false,
}: ProductCardProps) {
  const {
    isFavorite,
    addFavorite,
    removeFavorite,
    isHydrated: isFavHydrated,
  } = useFavorites();
  const { addItem, isHydrated: isCartHydrated } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock > 0) {
      addItem({
        ...product,
        price: product.price, // Ya es number
        categoryId: product.categoryId || "", // Valor por defecto
        status: product.status || true, // Valor por defecto
        createdAt: product.createdAt || new Date(), // Valor por defecto
        updatedAt: product.updatedAt || new Date(), // Valor por defecto
      });
    }
  };

  if (!isFavHydrated || !isCartHydrated || !isClient) {
    return (
      <div className="h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
        <div className="aspect-square bg-gray-200 w-full" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    );
  }

  const isFav = isFavorite(product.id);

  return (
    // <Link href={`/products/${product.id}`}>
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl || "/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-product.jpg";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}
        {product.stock === 0 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Agotado
          </Badge>
        )}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 rounded-full h-8 w-8"
          onClick={toggleFavorite}
          aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Heart
            className={`h-4 w-4 ${isFav ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
      </div>

      <CardHeader className="pb-2">
        <Badge variant="outline" className="mb-2 w-fit">
          {product.category.name}
        </Badge>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        {showDescription && product.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">(24)</span>
        </div>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col space-y-2">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/products/${product.id}`}>Ver detalles</Link>
        </Button>
        <Button
          className="w-full"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {showFullButton ? "Añadir al carrito" : "Añadir"}
        </Button>
      </CardFooter>
    </Card>
    // </Link>
  );
}
