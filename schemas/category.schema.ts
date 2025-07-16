import z from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  status: z.boolean(),
});

export default categorySchema;