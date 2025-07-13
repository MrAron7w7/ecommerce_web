import { findProduct } from "@/actions/product/find-product";
import { getProducts } from "@/actions/product/get-product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Heart,
  Share2,
  ChevronRight,
  Package,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";

import Link from "next/link";

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const product = await findProduct((await params).id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const products = await getProducts();

  // Filtra los productos relacionados excluyendo el producto actual
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-primary">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-primary font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div>
          <img
            className="w-full"
            src={`${product.imageUrl}`}
            alt={product.name}
          />
          {/* <Carousel className="w-full">
            <CarouselContent>
              {productImages.map((img, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel> */}
          {/* Miniaturas - versión simplificada
          <div className="flex gap-2 mt-4">
            {productImages.slice(0, 4).map((img, index) => (
              <button
                key={index}
                className="w-16 h-16 relative border rounded-md overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div> */}
        </div>

        {/* Información del producto */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <p className="text-lg text-gray-500 mt-2">
                {product.category.name}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Rating y reviews */}
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <Star
                  key={rating}
                  className={`h-5 w-5 ${
                    rating < 4 ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill={rating < 4 ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              4.2 (128 reviews)
            </span>
            <Button variant="link" className="ml-4 text-sm">
              Ver todas las reviews
            </Button>
          </div>

          {/* Descripción */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Descripción</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>

          {/* Variantes (talla, color, etc.) */}
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="color">Color</Label>
              <Select>
                <SelectTrigger id="color" className="mt-1">
                  <SelectValue placeholder="Selecciona un color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black">Negro</SelectItem>
                  <SelectItem value="white">Blanco</SelectItem>
                  <SelectItem value="blue">Azul</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="size">Talla</Label>
              <Select>
                <SelectTrigger id="size" className="mt-1">
                  <SelectValue placeholder="Selecciona una talla" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                defaultValue="1"
                className="mt-1 w-24"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-8 flex gap-4">
            <Button size="lg" className="flex-1">
              Añadir al carrito
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Comprar ahora
            </Button>
          </div>

          {/* Envío y garantía */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Envío gratis</p>
                <p className="text-xs text-gray-500">En 2-3 días</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Devolución gratis</p>
                <p className="text-xs text-gray-500">30 días</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Garantía</p>
                <p className="text-xs text-gray-500">2 años</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Pago seguro</p>
                <p className="text-xs text-gray-500">Protegido</p>
              </div>
            </div>
          </div>

          {/* Compartir */}
          <div className="mt-8">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold">Productos relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {relatedProducts.map((relatedProduct) => (
            <Card
              key={relatedProduct.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={relatedProduct.imageUrl || ""}
                    alt={relatedProduct.name}
                    className="object-cover rounded-t-lg w-full h-full"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-medium">{relatedProduct.name}</h3>
                <p className="text-primary font-bold mt-2">
                  ${relatedProduct.price}
                </p>
                <Button size="sm" className="w-full mt-4">
                  Añadir al carrito
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
