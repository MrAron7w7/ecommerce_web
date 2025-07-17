// src/components/search.tsx
"use client";

import { useRouter } from "next/navigation";

import { Search } from "lucide-react";
import { useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export function ProductSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="search"
        placeholder="Buscar productos..."
        className="pl-9"
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        disabled={isPending}
      />
      {isPending && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      )}
    </div>
  );
}
