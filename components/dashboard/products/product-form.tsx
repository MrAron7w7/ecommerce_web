"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Category, Product } from "@/types/types";
import {
  Package,
  DollarSign,
  Hash,
  Tag,
  ImageIcon,
  Upload,
  X,
  FileText,
  ToggleLeft,
  ToggleRight,
  Sparkles,
} from "lucide-react";
import productSchema from "@/schemas/product.schema";
import { SaveProduct } from "@/actions/product/save-product";
import { useRouter } from "next/navigation";
import { getCategories } from "@/actions/category/get-category";
import { UpdateProduct } from "@/actions/product/update-product";

interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductForm({
  product,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    product?.imageUrl || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price ? Number(product.price) : 0,
      stock: product?.stock || 0,
      category: product?.categoryId || "",
      status: product?.status ?? true,
      image: product?.imageUrl || null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setIsLoading(true);
    try {
      if (product) {
        // Actualizar producto existente
        const result = await UpdateProduct(product.id, values);
        if (result.success) {
          toast.success(`Producto "${values.name}" actualizado exitosamente`);
        } else {
          toast.error(result.message);
        }
      } else {
        // Crear nuevo producto
        const result = await SaveProduct(values);
        if (result.success) {
          toast.success(`Producto "${values.name}" creado exitosamente`);
        } else {
          toast.error(result.message);
        }
      }
      router.refresh();
      onSuccess();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast.error("Ocurrió un error al guardar el producto");
    } finally {
      setIsLoading(false);
    }
  }

  // Cargar categorías
  useEffect(() => {
    async function loadCategories() {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    }
    loadCategories();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-white via-slate-50 to-blue-50 rounded-2xl shadow-2xl border border-white/20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda - Información básica */}
            <div className="space-y-6">
              {/* Información del producto */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
                    <Package className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Información del Producto
                  </h3>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Nombre del producto*
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: Zapatillas Running Pro"
                            {...field}
                            className="bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Descripción
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descripción detallada del producto..."
                            className="min-h-[120px] bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Detalles del producto */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    Detalles del Producto
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Precio*
                          </FormLabel>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                              $
                            </span>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-8 bg-white/70 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            Stock*
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              className="bg-white/70 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          Categoría*
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/70 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200">
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white/95 backdrop-blur-sm border-slate-200">
                            {categories.length === 0 ? (
                              <div className="p-2 text-sm text-slate-500">
                                No hay categorías disponibles
                              </div>
                            ) : (
                              categories.map((cat) => (
                                <SelectItem
                                  key={cat.id}
                                  value={cat.id}
                                  className="hover:bg-slate-50"
                                >
                                  {cat.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Columna derecha - Imagen y estado */}
            <div className="space-y-6">
              {/* Imagen del producto */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Imagen del Producto
                  </h3>
                </div>

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-4">
                        <div className="relative w-full h-64 rounded-xl border-2 border-dashed border-slate-300 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 hover:border-purple-400 transition-all duration-300 group">
                          {previewImage ? (
                            <div className="relative w-full h-full">
                              <img
                                src={previewImage}
                                alt="Preview"
                                className="object-cover w-full h-full rounded-xl"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => {
                                    setPreviewImage(null);
                                    form.setValue("image", null);
                                  }}
                                  className="bg-white/90 hover:bg-white text-slate-700"
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Quitar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white mb-4">
                                <Upload className="h-8 w-8" />
                              </div>
                              <p className="text-slate-600 font-medium mb-2">
                                Arrastra una imagen aquí
                              </p>
                              <p className="text-sm text-slate-500">
                                o haz clic para seleccionar
                              </p>
                            </div>
                          )}
                        </div>

                        <FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-white/70 border-slate-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                            onClick={() =>
                              document.getElementById("fileInput")?.click()
                            }
                          >
                            <input
                              id="fileInput"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <Upload className="h-4 w-4 mr-2" />
                            {previewImage
                              ? "Cambiar Imagen"
                              : "Seleccionar Imagen"}
                          </Button>
                        </FormControl>
                      </div>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Estado del producto */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
                    {form.watch("status") ? (
                      <ToggleRight className="h-5 w-5" />
                    ) : (
                      <ToggleLeft className="h-5 w-5" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Estado del Producto
                  </h3>
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-slate-200">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                field.value ? "bg-green-500" : "bg-slate-400"
                              }`}
                            />
                            <FormLabel className="text-slate-700 font-medium">
                              {field.value
                                ? "Producto Activo"
                                : "Producto Inactivo"}
                            </FormLabel>
                          </div>
                          <p className="text-sm text-slate-500">
                            {field.value
                              ? "Visible para los clientes"
                              : "Oculto del catálogo"}
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-8 py-2 bg-white/70 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-8 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {product ? "Actualizando..." : "Creando..."}
                </span>
              ) : product ? (
                "Actualizar Producto"
              ) : (
                "Agregar Producto"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
