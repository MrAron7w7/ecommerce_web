"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Heart, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignOutButton from "./signout-button";

interface NavLinkProps {
  session: Session | null;
}

function NavLink({ session }: NavLinkProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = usePathname();
  const isAuthenticated: boolean = !!session;
  const isAdmin = session?.user?.role === "ADMIN";

  const isDashboardRoute = path?.startsWith("/dashboard");

  if (isDashboardRoute) return null;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/products" },
    { name: "Nosotros", href: "/about" },
    // { name: "Contacto", href: "/contact" },
    ...(isAdmin ? [{ name: "Dashboard", href: "/dashboard/products" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-primary">Sport</span>Shop
        </Link>

        {/* Navegación desktop */}
        <div className="flex space-x-4">
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <div key={link.name} className="relative group">
                <Button
                  asChild
                  variant={path === link.href ? "outline" : "ghost"}
                  className="px-4 gap-1"
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              </div>
            ))}
          </nav>

          {/* Iconos de acción */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href={"/favorites"}>
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favoritos</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href={"/cart"}>
                <ShoppingCart className="h-5 w-5" />
                <Badge
                  variant="secondary"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                >
                  3
                </Badge>
                <span className="sr-only">Carrito</span>
              </Link>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Registrarse</Link>
                </Button>
              </div>
            )}

            {/* Botón del menú hamburguesa */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menú</span>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-screen py-2 border-t" : "max-h-0"
        }`}
      >
        <div className="container px-4">
          <nav className="flex flex-col space-y-2">
            {links.map((link) => (
              <div key={link.name}>
                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <Link href={link.href} className="flex-1 font-medium">
                    {link.name}
                  </Link>
                </div>
              </div>
            ))}

            {isAuthenticated ? (
              <></>
            ) : (
              <div className="pt-2 mt-2 border-t space-y-2">
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register">Registrarse</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default NavLink;
