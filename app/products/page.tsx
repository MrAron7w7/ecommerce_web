// src/app/products/page.tsx

import { prisma } from "@/lib/prisma";
import {
  getAllCategories,
  getFilteredProducts,
  SortOption,
} from "@/actions/product/product";
import { Filters } from "@/components/home/product/filters";
import { ProductSearch } from "@/components/home/product/search";
import { ProductSort } from "@/components/home/product/sort";
import { Pagination } from "@/components/home/product/pagination";
import { ProductCard } from "@/components/home/product/product-card";

interface ProductsPageProps {
  searchParams: {
    categories?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    sortBy?: string;
    search?: string;
    page?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const page = parseInt(searchParams.page || "1");
  const limit = 8;

  // Obtener el precio máximo para el slider de precios
  const maxPriceResult = await prisma.product.aggregate({
    _max: {
      price: true,
    },
  });
  const maxPrice = maxPriceResult._max.price?.toNumber() || 500;

  const { products, totalCount } = await getFilteredProducts({
    categoryIds: searchParams.categories?.split(",") || [],
    minPrice: searchParams.minPrice
      ? parseInt(searchParams.minPrice)
      : undefined,
    maxPrice: searchParams.maxPrice
      ? parseInt(searchParams.maxPrice)
      : undefined,
    inStockOnly: searchParams.inStock === "true",
    sortBy: searchParams.sortBy as SortOption,
    searchQuery: searchParams.search || "",
    page,
    limit,
  });

  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero Section */}
      <section className="bg-white border-b w-full">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-bold">Nuestros Productos</h1>
          <p className="text-gray-600 mt-2">
            Descubre nuestra selección premium de equipamiento deportivo
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64">
            <Filters categories={categories} maxPrice={maxPrice} />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col gap-4 mb-6">
              <ProductSearch />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-sm text-gray-600">
                  Mostrando{" "}
                  <span className="font-medium">
                    {(page - 1) * limit + 1}-
                    {Math.min(page * limit, totalCount)}
                  </span>{" "}
                  de <span className="font-medium">{totalCount}</span> productos
                </p>
                <ProductSort />
              </div>
            </div>

            {/* Products */}
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showFullButton={true}
                    />
                  ))}
                </div>

                <Pagination
                  totalPages={Math.ceil(totalCount / limit)}
                  currentPage={page}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <h3 className="text-lg font-medium">
                  No se encontraron productos
                </h3>
                <p className="text-gray-500 mt-2">
                  Intenta ajustar tus filtros de búsqueda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
