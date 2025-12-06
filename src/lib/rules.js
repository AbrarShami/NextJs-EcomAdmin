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

const MAX_UPLOAD_SIZE = 1024 * 768 * 3; // 3MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export const ProductSchema = z.object({
  name: string()
    .min(1, { message: "Name field is required." })
    .max(100, { message: "Name can't be more than 100 characters" })
    .trim(),
  quantity: z.coerce.number()
    .min(1, { message: "Quantity field is required." }),
  available: string()
    .min(1, { message: "Please select availability" })
    .trim(),
  price: z.coerce.number()
    .min(1, { message: "Price field is required." }),
  description: string()
    .min(1, { message: "Description field is required." })
    .max(1000, { message: "Description can't be more than 1000 characters" })
    .trim(),
  image: z
    .instanceof(File, { message: "Image is required." })
    .refine((file) => file.size > 0, "Image is required.")
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `File size must be less than ${MAX_UPLOAD_SIZE / (1024 * 1024)}MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .png, and .gif formats are supported."),
});