"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function HeaderLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              Ecommerce
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex space-x-4">
              {/* <Link
                href="/products"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Productos
              </Link> */}
              {/* <Link
                href="/categories"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Categorías
              </Link> */}
              {/* <Link
                href="/about"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Nosotros
              </Link> */}
              {/* <Link
                href="/contact"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Contacto
              </Link> */}
              {/* <Link
                href="/dashboard"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Dashboard
              </Link> */}
            </div>
          </div>

          {/* Mobile Menu Button - Visible only on mobile */}
          <div className="flex md:hidden space-x-4">
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <ShoppingBag className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Desktop Actions - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon" asChild>
                  <Link href={"/dashboard"}>
                    <LayoutDashboard className="h-5 w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Dashboard</TooltipContent>
            </Tooltip>
            <Button variant="outline" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu - Only shows when toggled */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-4 pb-2 space-y-2">
              <Link
                href="/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={toggleMobileMenu}
              >
                Productos
              </Link>
              <Link
                href="/categories"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={toggleMobileMenu}
              >
                Categorías
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={toggleMobileMenu}
              >
                Nosotros
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={toggleMobileMenu}
              >
                Contacto
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={toggleMobileMenu}
              >
                Dashboard
              </Link>
            </div>
            <div className="pt-4 pb-2 border-t border-gray-200">
              <div className="flex flex-col justify-center space-y-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login" onClick={toggleMobileMenu}>
                    Iniciar Sesión
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register" onClick={toggleMobileMenu}>
                    Registrarse
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderLayout;
