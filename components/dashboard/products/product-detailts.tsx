import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/types";
import Image from "next/image";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="relative aspect-square rounded-lg overflow-hidden border">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">Sin imagen</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-4">
          <div>
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xl font-semibold">
                ${product.price.toFixed(2)}
              </span>
              <Badge
                className={`${product.status ? "bg-green-500" : "bg-red-500"}`}
              >
                {product.status ? "Activo" : "Inactivo"}
              </Badge>
              <Badge variant="outline">{product.category?.name}</Badge>
            </div>
          </div>

          <div>
            <h4 className="font-medium">Descripción completa</h4>
            <p className="text-muted-foreground">
              {product.description || "No hay descripción detallada"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Stock disponible</h4>
              <p>{product.stock} unidades</p>
            </div>
            <div>
              <h4 className="font-medium">ID del producto</h4>
              <p>#{product.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
}
