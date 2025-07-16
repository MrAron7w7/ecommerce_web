/* eslint-disable @typescript-eslint/no-unused-vars */
// EditCategoryDialog.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import categorySchema from "@/schemas/category.schema";
import { Category } from "@/types/types";
import CategoryResponse from "@/types/category-response";

interface EditCategoryDialogProps {
  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;
  editData: Category | null;
  updateCategory: (id: string, values: Category) => Promise<CategoryResponse>;
  getCategories: () => Promise<Category[]>;
  setCategories: (categories: Category[]) => void;
}

export function EditCategoryDialog({
  openEdit,
  setOpenEdit,
  editData,
  updateCategory,
  getCategories,
  setCategories,
}: EditCategoryDialogProps) {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      status: true,
    },
  });

  // Resetear el formulario cuando cambia editData
  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData.name,
        description: editData.description || "",
        status: editData.status,
      });
    }
  }, [editData, form]);

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    if (!editData) return;

    try {
      const res = await updateCategory(editData.id, values);
      if (res.success) {
        toast.success(res.message);
        setOpenEdit(false);
        const updated = await getCategories();
        setCategories(
          updated.map((cat) => ({
            ...cat,
          }))
        );
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error al actualizar la categoría");
    }
  };

  return (
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Categoría</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
