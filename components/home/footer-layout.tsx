"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

function FooterLayout() {
  const path = usePathname();

  const isDashboardRoute = path?.startsWith("/dashboard");

  if (isDashboardRoute) return null;
  return (
    <footer className="bg-gray-900 text-gray-50">
      <div className="container px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">SportShop</h3>
          <p className="text-gray-400">
            Tu tienda de confianza para equipamiento deportivo de alta calidad.
          </p>
          <div className="flex gap-4">
            {["twitter", "facebook", "instagram", "youtube"].map((social) => (
              <Button
                key={social}
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">{social}</span>
                {/* Aquí irían los iconos de redes sociales */}
                <div className="h-5 w-5 bg-gray-500 rounded-full" />
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider">
            Comprar
          </h4>
          <nav className="space-y-2">
            <Link
              href="/products"
              className="block text-gray-400 hover:text-white"
            >
              Todos los productos
            </Link>
            <Link
              href="/offers"
              className="block text-gray-400 hover:text-white"
            >
              Ofertas
            </Link>
            <Link
              href="/new-arrivals"
              className="block text-gray-400 hover:text-white"
            >
              Nuevos productos
            </Link>
            <Link
              href="/best-sellers"
              className="block text-gray-400 hover:text-white"
            >
              Más vendidos
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider">
            Ayuda
          </h4>
          <nav className="space-y-2">
            <Link
              href="/contact"
              className="block text-gray-400 hover:text-white"
            >
              Contacto
            </Link>
            <Link href="/faq" className="block text-gray-400 hover:text-white">
              Preguntas frecuentes
            </Link>
            <Link
              href="/shipping"
              className="block text-gray-400 hover:text-white"
            >
              Envíos y devoluciones
            </Link>
            <Link
              href="/size-guide"
              className="block text-gray-400 hover:text-white"
            >
              Guía de tallas
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider">
            Contacto
          </h4>
          <address className="not-italic space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Phone className="h-4 w-4" />
              <span>+1 (234) 567-890</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="h-4 w-4" />
              <span>info@sportshop.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>123 Calle Deportiva, Ciudad</span>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2023 SportShop. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-white">
              Términos
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterLayout;
