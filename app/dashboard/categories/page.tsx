"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

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
import { saveCategory } from "@/actions/category/save-category";
import { getCategories } from "@/actions/category/get-vategory";
import { Category } from "@/types/types";
import categorySchema from "@/schemas/category.schema";
import { Switch } from "@/components/ui/switch";

export default function CategoriesPage() {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      const result = await saveCategory(values);

      if (result.success) {
        toast.success("Categoría creada exitosamente");
        form.reset();
        const updated = await getCategories();
        setCategories(updated);
      } else {
        toast.error("Error al crear la categoría");
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border mt-10 space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-6">Agregar Nueva Categoría</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre*</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Calzado, Electrónica" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve descripción de la categoría"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Guardar Categoría
            </Button>
          </form>
        </Form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Categorías Existentes</h2>
        <div className="border rounded-md overflow-hidden shadow-sm">
          <table className="w-full table-auto text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3">Nombre</th>
                <th className="text-left p-3">Descripción</th>
                <th className="text-left p-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-slate-500 p-4">
                    No hay categorías registradas.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="border-t">
                    <td className="p-3 font-medium text-slate-800">
                      {cat.name}
                    </td>
                    <td className="p-3 text-slate-600">
                      {cat.description || "Sin descripción"}
                    </td>
                    <td className="p-3">
                      {cat.status ? (
                        <div className="flex gap-2">
                          <span className="text-green-600 font-medium">
                            Activa
                          </span>

                          <Switch
                            checked={cat.status}
                            onCheckedChange={() => {}}
                            className="data-[state=checked]:bg-green-600"
                          />
                        </div>
                      ) : (
                        <span className="text-slate-500">Inactiva</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
