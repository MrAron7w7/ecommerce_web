"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Plus, Package, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProductsTable } from "@/components/dashboard/products/product-table";
import { Product } from "@/types/types";
import { ProductForm } from "@/components/dashboard/products/product-form";
import { ProductDetails } from "@/components/dashboard/products/product-detailts";
import { ProductDelete } from "@/components/dashboard/products/product-delete";

type InitialValues = {
  products: Product[];
};

function ProductsPage({ products }: InitialValues) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [action, setAction] = useState<"create" | "edit">("create");

  const searchParams = useSearchParams();
  const router = useRouter();

  const productsPerPage = 5;

  const getPageFromUrl = () => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  };

  const [currentPage, setCurrentPage] = useState(getPageFromUrl());

  useEffect(() => {
    const page = getPageFromUrl();
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setAction("edit");
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-5 rounded-2xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#0a0a0a] rounded-xl text-white">
                    <Package className="h-6 w-6" />
                  </div>
                  <h1 className="text-3xl font-bold text-[#0a0a0a]">
                    Gestión de Productos
                  </h1>
                </div>
                <p className="text-slate-600 text-lg">
                  Administra y controla tu catálogo de productos de manera
                  eficiente
                </p>
              </div>

              <Button
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  setAction("create");
                  setIsFormOpen(true);
                  setSelectedProduct(null);
                }}
              >
                <Plus className="mr-2 h-5 w-5" />
                Agregar Producto
              </Button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">
              Lista de Productos
            </h2>
            <div className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </div>
          </div>

          <ProductsTable
            products={currentProducts}
            onView={handleViewProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-2 p-4 border-t border-slate-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Crear / Editar Producto */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border border-white/20">
            <DialogHeader className="pb-6">
              <DialogTitle>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
                    <Package className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {action === "create"
                      ? "Agregar Nuevo Producto"
                      : "Editar Producto"}
                  </h2>
                </div>
              </DialogTitle>
              <DialogDescription>
                Completa los campos para registrar un nuevo producto en el
                catálogo.
              </DialogDescription>
            </DialogHeader>
            <div className="border-t border-slate-200 pt-6">
              <ProductForm
                product={selectedProduct}
                onSuccess={() => setIsFormOpen(false)}
                onCancel={() => setIsFormOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Ver Detalles del Producto */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-3xl bg-white/95 backdrop-blur-sm border border-white/20">
            <DialogHeader className="pb-6">
              <DialogTitle>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg text-white">
                    <Package className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    Detalles del Producto
                  </h2>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="border-t border-slate-200 pt-6">
              <ProductDetails
                product={selectedProduct}
                onClose={() => setIsViewOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Eliminar Producto */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border border-white/20">
            <DialogHeader className="pb-6">
              <DialogTitle>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg text-white">
                    <Package className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                    Confirmar Eliminación
                  </h2>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="border-t border-slate-200 pt-6">
              <ProductDelete
                product={selectedProduct}
                onSuccess={() => setIsDeleteOpen(false)}
                onCancel={() => setIsDeleteOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default ProductsPage;
