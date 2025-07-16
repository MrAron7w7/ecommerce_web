import z from "zod";


export const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Correo inválido").min(1, "Correo es requerido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
      // .regex(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      //   "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
      // ),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export default registerSchema;