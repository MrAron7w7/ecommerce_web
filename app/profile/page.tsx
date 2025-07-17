// src/app/profile/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  MapPin,
  Phone,
  User,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ProfilePage() {
  //   const { data: session } = useSession();

  // Datos de ejemplo (en un proyecto real vendrían de tu API)
  const userData = {
    name: "Usuario",
    email: "usuario@ejemplo.com",
    phone: "+1 (555) 123-4567",
    address: "Calle Principal 123, Ciudad",
    joinDate: "Enero 2023",
    avatar: "",
    orders: 12,
    wishlist: 8,
  };

  const recentOrders = [
    {
      id: "ORD-12345",
      date: "2023-10-15",
      total: 129.99,
      status: "Completado",
      items: 3,
    },
    {
      id: "ORD-12344",
      date: "2023-09-28",
      total: 89.99,
      status: "Enviado",
      items: 2,
    },
    {
      id: "ORD-12343",
      date: "2023-09-10",
      total: 199.99,
      status: "Entregado",
      items: 1,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback>
                    {userData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Miembro desde {userData.joinDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="line-clamp-1">{userData.address}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pedidos</span>
                <Badge variant="secondary">{userData.orders}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Favoritos</span>
                <Badge variant="secondary">{userData.wishlist}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Información personal</CardTitle>
                  <CardDescription>
                    Actualiza tu información personal aquí.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input id="name" defaultValue={userData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={userData.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" defaultValue={userData.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input id="address" defaultValue={userData.address} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Guardar cambios</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de pedidos</CardTitle>
                  <CardDescription>
                    Tus pedidos recientes y su estado actual.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {recentOrders.map((order) => (
                    <Card
                      key={order.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">
                                Pedido #{order.id}
                              </h3>
                              <Badge
                                variant={
                                  order.status === "Completado"
                                    ? "default"
                                    : order.status === "Enviado"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {order.date} • {order.items}{" "}
                              {order.items > 1 ? "artículos" : "artículo"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">
                              ${order.total.toFixed(2)}
                            </p>
                            <Button
                              variant="link"
                              size="sm"
                              className="mt-1"
                              asChild
                            >
                              <Link href={`/orders/${order.id}`}>
                                Ver detalles
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver todos los pedidos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de cuenta</CardTitle>
                  <CardDescription>
                    Configura tus preferencias y notificaciones.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Preferencias</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notifications">
                          Notificaciones por correo
                        </Label>
                        <Button variant="outline" size="sm">
                          Activar
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="newsletter">Boletín informativo</Label>
                        <Button variant="outline" size="sm">
                          Activar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Seguridad</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Contraseña actual
                        </Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva contraseña</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirmar contraseña
                        </Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full">Actualizar configuración</Button>
                  <Button variant="destructive" className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesión
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
