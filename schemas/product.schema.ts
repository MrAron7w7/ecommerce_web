import z from "zod";

const productSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  description: z.string().optional(),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  stock: z.int().min(0, "El stock debe ser mayor o igual a 0"),
  category: z.string().min(1, {
    message: "Debes seleccionar una categoría",
  }),
  status: z.boolean(),
  image: z
    .any()
    .refine((file) => file instanceof File || file === null, {
      message: "Debe ser un archivo válido",
    })
    .nullable(),
});

export default productSchema;
