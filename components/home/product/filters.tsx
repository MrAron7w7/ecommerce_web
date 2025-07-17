// src/components/filters.tsx
"use client";

import { X, Filter } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useTransition } from "react";

interface FiltersProps {
  categories: Category[];
  maxPrice: number;
}

export function Filters({ categories, maxPrice }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedCategories = searchParams.get("categories")?.split(",") || [];
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const inStockOnly = searchParams.get("inStock") === "true";

  const updateSearchParams = (params: URLSearchParams) => {
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    const currentCategories = params.get("categories")?.split(",") || [];

    if (currentCategories.includes(categoryId)) {
      const newCategories = currentCategories.filter((id) => id !== categoryId);
      if (newCategories.length > 0) {
        params.set("categories", newCategories.join(","));
      } else {
        params.delete("categories");
      }
    } else {
      params.set("categories", [...currentCategories, categoryId].join(","));
    }

    params.delete("page");
    updateSearchParams(params);
  };

  const handlePriceChange = (values: number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("minPrice", values[0].toString());
    params.set("maxPrice", values[1].toString());
    params.delete("page");
    updateSearchParams(params);
  };

  const handleStockChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (checked) {
      params.set("inStock", "true");
    } else {
      params.delete("inStock");
    }
    params.delete("page");
    updateSearchParams(params);
  };

  const clearAllFilters = () => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  return (
    <div className="w-full md:w-64 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Filter className="h-5 w-5" /> Filtros
          {isPending && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500"
          onClick={clearAllFilters}
          disabled={isPending}
        >
          Limpiar todo
        </Button>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 ||
        minPriceParam ||
        maxPriceParam ||
        inStockOnly) && (
        <div>
          <h3 className="text-sm font-medium mb-2">Filtros aplicados</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId);
              return (
                <Badge key={categoryId} variant="outline" className="pl-2">
                  {category?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => handleCategoryChange(categoryId)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              );
            })}

            {(minPriceParam || maxPriceParam) && (
              <Badge variant="outline" className="pl-2">
                Precio: ${minPriceParam || 0} - ${maxPriceParam || maxPrice}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete("minPrice");
                    params.delete("maxPrice");
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {inStockOnly && (
              <Badge variant="outline" className="pl-2">
                En stock
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete("inStock");
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Rango de precios</h3>
        <Slider
          defaultValue={[
            minPriceParam ? parseInt(minPriceParam) : 0,
            maxPriceParam ? parseInt(maxPriceParam) : maxPrice,
          ]}
          max={maxPrice}
          step={10}
          minStepsBetweenThumbs={1}
          onValueCommit={handlePriceChange}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${minPriceParam ? parseInt(minPriceParam) : 0}</span>
          <span>${maxPriceParam ? parseInt(maxPriceParam) : maxPrice}</span>
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={handleStockChange}
          />
          <label
            htmlFor="in-stock"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Solo productos en stock
          </label>
        </div>
      </div>
    </div>
  );
}
