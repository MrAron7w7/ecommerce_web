import Link from "next/link";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function FooterLayout() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Ecommerce</h4>
            <p className="text-gray-400">
              Tu tienda de confianza para productos de calidad.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-400 hover:text-white"
                >
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@ecostore.com</li>
              <li>Teléfono: (123) 456-7890</li>
              <li>Dirección: Calle Principal #123</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <Input
                className="bg-gray-800 border-gray-700"
                placeholder="Tu email"
              />
              <Button variant="secondary">Suscribir</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Ecommerce. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterLayout;
