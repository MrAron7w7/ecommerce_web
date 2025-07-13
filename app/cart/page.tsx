import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const cartItems = [
  {
    id: 1,
    name: "Zapatillas Deportivas",
    price: 89.99,
    image: "/uploads/ba0fea94-0dfb-4daa-814e-61891c33c893-calzados.jpg",
    quantity: 1
  },
  {
    id: 2,
    name: "Camiseta Casual",
    price: 29.99,
    image: "/uploads/1ccc4dbc-b50c-43b6-8af6-aff426cf77b8-ecommerce.png",
    quantity: 2
  }
];

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const total = subtotal + shipping;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      className="w-16 h-8 text-center"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full">Proceder al Pago</Button>
              </CardFooter>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Código de Descuento</h3>
                <div className="flex gap-2">
                  <Input placeholder="Ingresa tu código" />
                  <Button variant="outline">Aplicar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">¡Agrega algunos productos para comenzar!</p>
          <Button asChild>
            <a href="/products">Continuar Comprando</a>
          </Button>
        </div>
      )}
    </div>
  );
}
