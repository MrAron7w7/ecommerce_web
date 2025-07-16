"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import categorySchema from "@/schemas/category.schema";
import { saveCategory } from "@/actions/category/save-category";
import { Category } from "@/types/types";
import { getCategories } from "@/actions/category/get-category";
import { updateCategory } from "@/actions/category/update-category";
import { deleteCategory } from "@/actions/category/delete-category";
import DeleteCategoryDialog from "@/components/dashboard/categories/delete-category-dialog";
import { EditCategoryDialog } from "@/components/dashboard/categories/edit-category-dialog";

import { useRouter, useSearchParams } from "next/navigation";

interface CategoriesPageProps {
  initialCategories: Category[];
}

export default function CategoriesPage({
  initialCategories,
}: CategoriesPageProps) {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      status: true,
    },
  });

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editData, setEditData] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [filter, setFilter] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const categoriesPerPage = 5;
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

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
  const indexOfLast = currentPage * categoriesPerPage;
  const indexOfFirst = indexOfLast - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    const result = await saveCategory(values);
    if (result.success) {
      toast.success("Categoría creada exitosamente");
      form.reset();
      const updated = await getCategories();
      setCategories(updated);
      router.push("?page=1"); // resetear a página 1
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border mt-10 space-y-10">
      <h1 className="text-2xl font-bold mb-6">Agregar Nueva Categoría</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: Electrónica" />
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
                  <Textarea
                    {...field}
                    placeholder="Descripción de la categoría"
                  />
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
          <Button type="submit" className="w-full">
            Guardar Categoría
          </Button>
        </form>
      </Form>

      {/* Tabla de Categorías */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Categorías Existentes</h2>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filtrar por nombre..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              handlePageChange(1); // resetear a página 1 si hay filtro
            }}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCategories.length ? (
                currentCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {category.description || "Sin descripción"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          category.status
                            ? "text-green-600 font-medium"
                            : "text-slate-500"
                        }
                      >
                        {category.status ? "Activa" : "Inactiva"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditData(category);
                              setOpenEdit(true);
                            }}
                          >
                            Editar categoría
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setDeleteId(category.id);
                              setOpenDelete(true);
                            }}
                          >
                            Eliminar categoría
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No hay categorías registradas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex items-center space-x-2">
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
          </div>
        )}
      </div>

      {/* Diálogos */}
      <EditCategoryDialog
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        editData={editData}
        form={form}
        getCategories={getCategories}
        setCategories={setCategories}
        updateCategory={updateCategory}
      />
      <DeleteCategoryDialog
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteId={deleteId}
        getCategories={getCategories}
        setCategories={setCategories}
        deleteCategory={deleteCategory}
      />
    </div>
  );
}
