"use server";

import bcrypt from "bcrypt";
import { getCollection } from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";

export async function register(state, formData) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // Validate form fields
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    name: formData.get("name"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors, // fieldErrors is Record<string, string[]>
      email: String(formData.get("email") ?? ""),
    };
  }

  // Extract form fields
  const { name, email, password } = validatedFields.data;

  // Check if email is already registered
  const userCollection = await getCollection("users");
  if (!userCollection) {
    return { errors: { email: ["Server error!"] } }; // ensure array
  }

  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: ["Email already exists in our database!"],
      },
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save in DB
  const results = await userCollection.insertOne({
    name,
    email,
    password: hashedPassword,
  });

  // Create a session (ensure string id)
  await createSession(String(results.insertedId));

  // Redirect
  redirect("/");
}

export async function login(state, formData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
      password: formData.get("password"),
    };
  }

  // Extract form fields
  const { email, password } = validatedFields.data;

  // Check if email exists in our DB
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: "Invalid credentials." } };

  // Check password
  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) return { errors: { password: "Invalid credentials." } };

  // Create a session
  await createSession(existingUser._id.toString());

  console.log(existingUser);

  // Redirect
  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/signin");
}

