import { deleteProduct } from "@/actions/product/delete-product";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/types";
import { toast } from "sonner";

interface DeleteProductProps {
  product: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductDelete({
  product,
  onSuccess,
  onCancel,
}: DeleteProductProps) {
  const handleDelete = async () => {
    // Lógica para eliminar el producto
    try {
      await deleteProduct(product.id);
      toast.error(`Producto ${product.name} eliminado`);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }

    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold">¿Eliminar producto?</h3>
        <p className="text-muted-foreground mt-2">
          ¿Estás seguro de que deseas eliminar `{product.name}`? Esta acción no
          se puede deshacer.
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
