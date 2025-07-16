"use client";

import Link from "next/link";
import { Package, Layers, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const Links = [
    // {
    //   label: "Dashboard",
    //   icon: Home,
    //   href: "/dashboard",
    // },
    {
      label: "Productos",
      icon: Package,
      href: "/dashboard/products",
    },
    {
      label: "Categorías",
      icon: Layers,
      href: "/dashboard/categories",
    },
    // {
    //   label: "Órdenes",
    //   icon: ShoppingCart,
    //   href: "/dashboard/orders",
    // },
    {
      label: "Clientes",
      icon: Users,
      href: "/dashboard/customers",
    },
    {
      label: "Regresar",
      icon: ArrowLeft,
      href: "/",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-72 border-r border-gray-200 bg-gradient-to-b from-white to-gray-50">
        {/* Logo Section */}
        <div className="flex items-center h-20 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Panel Dashboard
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col flex-grow p-4 overflow-y-auto">
          <nav className="flex-1 space-y-1">
            {Links.map((link) => (
              <div key={link.label} className="space-y-1">
                <Link href={link.href}>
                  <Button
                    variant={pathname === link.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-12 px-4",
                      pathname === link.href
                        ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                        : "hover:bg-gray-100"
                    )}
                  >
                    <link.icon
                      className={cn(
                        "w-5 h-5 mr-3",
                        pathname === link.href
                          ? "text-blue-600"
                          : "text-gray-600"
                      )}
                    />
                    <span className="text-base">{link.label}</span>
                  </Button>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 flex items-center justify-center">
                <span className="text-white font-medium">AD</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
