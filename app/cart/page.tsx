"use client";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function CartPage() {
  // Datos de ejemplo basados en tu schema Prisma
  const cartItems = [
    {
      id: "1",
      product: {
        id: "prod1",
        name: "Zapatillas Deportivas Pro",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        stock: 10,
      },
      quantity: 2,
      price: 89.99,
    },
    {
      id: "2",
      product: {
        id: "prod2",
        name: "Camiseta Premium Algodón",
        price: 29.99,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        stock: 15,
      },
      quantity: 1,
      price: 29.99,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 5.99; // Envío gratis para compras > $100
  const total = subtotal + shipping;

  // Funciones para manejar cambios
  const handleQuantityChange = (id: string, newQuantity: number) => {
    // Aquí implementarías la lógica para actualizar la cantidad
    console.log(`Cambiar cantidad del item ${id} a ${newQuantity}`);
  };

  const removeItem = (id: string) => {
    // Lógica para eliminar item
    console.log(`Eliminar item ${id}`);
  };

  const clearCart = () => {
    // Lógica para vaciar carrito
    console.log("Vaciar carrito");
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button variant="ghost" className="text-muted-foreground" asChild>
          <Link className="flex items-center" href={"/products"}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Continuar comprando
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sección de productos */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Tu Carrito{" "}
              <span className="text-muted-foreground">
                ({cartItems.length})
              </span>
            </h1>
            {cartItems.length > 0 && (
              <Button
                variant="link"
                className="text-destructive hover:text-destructive/80"
                onClick={clearCart}
              >
                <X className="mr-2 h-4 w-4" />
                Vaciar carrito
              </Button>
            )}
          </div>

          <Separator className="my-4" />

          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative aspect-square w-full sm:w-40 md:w-48">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        // fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 200px"
                      />
                      {item.price < 50 && (
                        <Badge
                          variant="secondary"
                          className="absolute left-2 top-2"
                        >
                          Oferta
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 p-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">
                          {item.product.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-destructive/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <p className="mt-1 text-lg font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} c/u
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="flex h-8 w-12 items-center justify-center rounded-md border border-input bg-background text-sm">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            disabled={item.quantity >= item.product.stock}
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.product.stock} disponibles
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Añade algunos productos para comenzar tu compra
              </p>
              <Button className="mt-4">Explorar productos</Button>
            </div>
          )}
        </div>

        {/* Resumen del pedido */}
        {cartItems.length > 0 && (
          <div className="lg:w-96">
            <Card className="sticky top-4 border-primary/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span className={shipping === 0 ? "text-green-500" : ""}>
                    {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal > 100 && (
                  <Badge variant="secondary" className="w-fit">
                    ¡Envío gratis por compras mayores a $100!
                  </Badge>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  Proceder al pago <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-4 border-primary/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">¿Tienes un cupón?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input placeholder="Código de descuento" className="flex-1" />
                  <Button variant="outline">Aplicar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
