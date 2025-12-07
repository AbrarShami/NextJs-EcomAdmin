"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ProductSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(state, formData) {
  // Check is user is signed in
    console.log("formDataCreate:", formData);
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Validate form fields
  const name = formData.get("name");
  const quantityRaw = formData.get("quantity");
  const available = formData.get("availability");
  const priceRaw = formData.get("price");
  const description = formData.get("description");
  const image = formData.get("image");

  const quantity = Number(quantityRaw);
  const price = Number(priceRaw);

  const validatedFields = await ProductSchema.safeParse({
    name,
    quantity,
    available,
    price,
    description,
    image
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      name,
      quantity,
      available,
      price,
      description,
      image
    };
  }

  // Save the new post in DB
  try {
    const imageBuffer = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");
    const imageDataUrl = `data:${image.type};base64,${imageBase64}`;

    const postsCollection = await getCollection("products");
    const post = {
      name: validatedFields.data.name,
      quantity: validatedFields.data.quantity,
      available: validatedFields.data.available,
      price: validatedFields.data.price,
      description: validatedFields.data.description,
      image: imageDataUrl, // Store base64 image
      imageType: image.type,
      userId: ObjectId.createFromHexString(user.userId),
      createdAt: new Date(),
    };
    await postsCollection.insertOne(post);
  } catch (error) {
    return {
      errors: { title: error.message },
    };
  }

  // Redirect
  redirect("/");
}

export async function updateProduct(state, formData) {
  // Check is user is signed in
  console.log("formData:", formData);
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Validate form fields
  const productId = formData.get("productId");

  const name = formData.get("name");
  const quantityRaw = formData.get("quantity");
  const available = formData.get("availability");
  const priceRaw = formData.get("price");
  const description = formData.get("description");
  const quantity = Number(quantityRaw);
  const price = Number(priceRaw);

  const validatedFields = ProductSchema.safeParse({
    name,
    quantity,
    available,
    price,
    description
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      name,
      quantity,
      available,
      price,
      description
    };
  }

  // Find the products
  const productCollection = await getCollection("products");
  const product = await productCollection.findOne({
    _id: ObjectId.createFromHexString(productId),
  });

  // Check the user owns the products
  if (user.userId !== product.userId.toString()) return redirect("/");

  // Update the product in DB
  productCollection.findOneAndUpdate(
    { _id: product._id },
    {
      $set: {
        name: validatedFields.data.name,
        quantity: validatedFields.data.quantity,
        available: validatedFields.data.available,
        price: validatedFields.data.price,
        description: validatedFields.data.description,
      },
    }
  );

  // Redirect
  redirect("/");
}

export async function deleteProduct(formData) {
  // Check is user is signed in
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Find the post
  const productsCollection = await getCollection("products");
  const product = await productsCollection.findOne({
    _id: ObjectId.createFromHexString(formData.get("productId")),
  });

  // Check the auth user owns the post
  if (user.userId !== product.userId.toString()) return redirect("/");

  // Delete the post
  productsCollection.findOneAndDelete({ _id: product._id });

  revalidatePath('/')
}
