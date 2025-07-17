// app/products/[id]/page.tsx
import type { Metadata } from "next";
import { findProduct } from "@/actions/product/find-product";
import { getProducts } from "@/actions/product/get-product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Star,
  Heart,
  Share2,
  ChevronRight,
  Package,
  ShieldCheck,
  Truck,
  CreditCard,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  return {
    title: `Detalles del Producto ${(await params).id}`,
    description: "Página de detalles del producto",
  };
}

export default async function Page({ params }: ProductPageProps) {
  const product = await findProduct((await params).id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Link href="/products" className="text-primary mt-4 inline-block">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const products = await getProducts();
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-primary">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-primary">
          Productos
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-primary font-medium">{product.name}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}
            {product.stock === 0 && (
              <Badge
                variant="destructive"
                className="absolute top-2 left-2 text-sm"
              >
                Agotado
              </Badge>
            )}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {product.name}
              </h1>
              <Badge variant="outline" className="mt-2">
                {product.category.name}
              </Badge>
            </div>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Precio */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.stock > 0 ? (
              <Badge variant="secondary" className="text-sm">
                {product.stock} en stock
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-sm">
                Sin stock
              </Badge>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= 4
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">(4.2)</span>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Descripción</h2>
            <p className="text-gray-600">
              {product.description || "No hay descripción disponible."}
            </p>
          </div>

          {/* Cantidad */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={product.stock}
              defaultValue="1"
              className="w-24"
              disabled={product.stock === 0}
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 pt-4">
            <Button size="lg" className="flex-1" disabled={product.stock === 0}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Añadir al carrito
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              disabled={product.stock === 0}
            >
              Comprar ahora
            </Button>
          </div>

          {/* Info adicional */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Envío rápido</p>
                <p className="text-sm text-gray-600">Entrega en 2-3 días</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Devoluciones</p>
                <p className="text-sm text-gray-600">30 días garantía</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Garantía</p>
                <p className="text-sm text-gray-600">2 años</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Pago seguro</p>
                <p className="text-sm text-gray-600">Protegido</p>
              </div>
            </div>
          </div>

          {/* Compartir */}
          <div className="pt-6 border-t">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir producto
            </Button>
          </div>
        </div>
      </div>
      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="hover:shadow-lg transition-shadow overflow-hidden"
              >
                <Link href={`/products/${relatedProduct.id}`}>
                  <CardHeader className="p-0">
                    <div className="aspect-square relative bg-gray-100">
                      {relatedProduct.imageUrl ? (
                        <Image
                          src={relatedProduct.imageUrl}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Sin imagen
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">
                      {relatedProduct.name}
                    </CardTitle>
                    <p className="text-primary font-bold mt-2">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                    <Button size="sm" className="w-full mt-4" asChild>
                      <Link href={`/products/${relatedProduct.id}`}>
                        Ver detalles
                      </Link>
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
