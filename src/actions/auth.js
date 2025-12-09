"use server";

import bcrypt from "bcrypt";
import { getCollection } from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";

export async function register(state, formData) {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: String(formData.get("email") ?? ""),
      name: String(formData.get("name") ?? ""),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    };
  }

  const { name, email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) {
    return { errors: { email: ["Server error!"] } };
  }

  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return { errors: { email: ["Email already exists!"] } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const results = await userCollection.insertOne({
    name,
    email,
    password: hashedPassword,
  });

  // Create a session
  await createSession(String(results.insertedId));

  redirect("/");
}

export async function login(state, formData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
      password: formData.get("password"),
    };
  }

  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: "Invalid credentials." } };

  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) return { errors: { password: "Invalid credentials." } };

  // ✅ Create a session
  await createSession(existingUser._id.toString());

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies(); // Add await here
  cookieStore.delete("session");
  redirect("/landing-page");
}
