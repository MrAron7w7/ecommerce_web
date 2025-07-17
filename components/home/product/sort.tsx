// src/components/sort.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Ordenar por:</span>
      <Select
        defaultValue={searchParams.get("sortBy") || "newest"}
        onValueChange={handleSortChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Más recientes</SelectItem>
          <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
          <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
        </SelectContent>
      </Select>
      {isPending && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      )}
    </div>
  );
}
