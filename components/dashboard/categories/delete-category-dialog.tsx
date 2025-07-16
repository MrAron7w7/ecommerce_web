import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category } from "@prisma/client";
import { toast } from "sonner";

function DeleteCategoryDialog({
  openDelete,
  setOpenDelete,
  deleteId,
  getCategories,
  setCategories,
  deleteCategory,
}: {
  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
  deleteId: string | null;
  getCategories: () => Promise<Category[]>;
  setCategories: (categories: Category[]) => void;
  deleteCategory: (
    id: string
  ) => Promise<{ success: boolean; message: string }>;
}) {
  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Eliminar categoría?</DialogTitle>
        </DialogHeader>
        <p>Esta acción no se puede deshacer.</p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpenDelete(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              if (deleteId) {
                const res = await deleteCategory(deleteId);
                if (res.success) {
                  toast.success(res.message);
                  setOpenDelete(false);
                  const updated = await getCategories();
                  setCategories(
                    updated.map((cat) => ({
                      ...cat,
                    }))
                  );
                } else {
                  toast.error(res.message);
                }
              }
            }}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCategoryDialog;
