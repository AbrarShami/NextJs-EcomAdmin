import { string, z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
});

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(1, { message: "Not be empty" })
      .min(5, { message: "Be at least 5 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().trim(),
    name: z.string().min(1, { message: "Name is required." }).trim(),

  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password fields do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export const ProductSchema = z.object({
  name: string()
    .min(1, { message: "Name field is required." })
    .max(100, { message: "Name can't be more than 100 characters" })
    .trim(),
  quantity: string()
    .min(1, { message: "Quantity field is required." })
    .trim(),
  available: string()
    .min(1, { message: "Please select availability" })
    .trim(),
  price: string()
    .min(1, { message: "Price field is required." })
    .trim(),
  description: string()
    .min(1, { message: "Description field is required." })
    .max(1000, { message: "Description can't be more than 1000 characters" })
    .trim(),
});
