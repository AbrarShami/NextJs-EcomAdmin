"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ProductSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(state, formData) {
  console.log("formDataCreate:", formData);
  const user = await getAuthUser();
  if (!user) return redirect("/");

  const name = formData.get("name");
  const quantityRaw = formData.get("quantity");
  const available = formData.get("availability");
  const priceRaw = formData.get("price");
  const description = formData.get("description");
  const image = formData.get("image");

  const quantity = Number(quantityRaw);
  const price = Number(priceRaw);

  try {
    const validatedFields = await ProductSchema.parseAsync({
      name,
      quantity,
      available,
      price,
      description,
      image
    });

    const imageBuffer = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");
    const imageDataUrl = `data:${image.type};base64,${imageBase64}`;

    const postsCollection = await getCollection("products");
    const post = {
      name: validatedFields.name,
      quantity: validatedFields.quantity,
      available: validatedFields.available,
      price: validatedFields.price,
      description: validatedFields.description,
      image: imageDataUrl,
      imageType: image.type,
      imageName: image.name ?? null,
      userId: ObjectId.createFromHexString(user.userId),
      createdAt: new Date(),
    };
    await postsCollection.insertOne(post);
  } catch (error) {
    console.error("Create product error:", error);
    if (error?.name === "ZodError") {
      return {
        errors: error.flatten().fieldErrors,
        name,
        quantity,
        available,
        price,
        description,
      };
    }
    return {
      errors: { general: error.message },
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function updateProduct(state, formData) {
  console.log("formData:", formData);
  const user = await getAuthUser();
  if (!user) return redirect("/");

  const productId = formData.get("productId");
  const name = formData.get("name");
  const quantityRaw = formData.get("quantity");
  const available = formData.get("availability");
  const priceRaw = formData.get("price");
  const description = formData.get("description");
  const image = formData.get("image");

  const quantity = Number(quantityRaw);
  const price = Number(priceRaw);

  try {
    // Validate core fields (without image) - image is optional on edit
    const coreValidated = await ProductSchema.omit({ image: true }).parseAsync({
      name,
      quantity,
      available,
      price,
      description,
    });

    const productCollection = await getCollection("products");
    const product = await productCollection.findOne({
      _id: ObjectId.createFromHexString(productId),
    });

    if (!product) {
      return { errors: { general: "Product not found." } };
    }

    if (user.userId !== product.userId.toString()) return redirect("/");

    const updatePayload = {
      name: coreValidated.name,
      quantity: coreValidated.quantity,
      available: coreValidated.available,
      price: coreValidated.price,
      description: coreValidated.description,
      updatedAt: new Date(),
    };

    // Only process image if a new file was uploaded (size > 0)
    if (image && typeof image === "object" && image.size > 0) {
      // Validate only the image field
      await ProductSchema.pick({ image: true }).parseAsync({ image });

      const imageBuffer = await image.arrayBuffer();
      const imageBase64 = Buffer.from(imageBuffer).toString("base64");
      const imageDataUrl = `data:${image.type};base64,${imageBase64}`;

      updatePayload.image = imageDataUrl;
      updatePayload.imageType = image.type;
      updatePayload.imageName = image.name ?? null;
    }

    await productCollection.findOneAndUpdate(
      { _id: product._id },
      { $set: updatePayload }
    );

  } catch (error) {
    console.error("Update product error:", error);
    if (error?.name === "ZodError") {
      return {
        errors: error.flatten().fieldErrors,
        name,
        quantity,
        available,
        price,
        description,
      };
    }
    return {
      errors: { general: error.message },
    };
  }

  revalidatePath("/products");
  redirect("/products");
}

export async function deleteProduct(formData) {
  const user = await getAuthUser();
  if (!user) return redirect("/");

  const productsCollection = await getCollection("products");
  const product = await productsCollection.findOne({
    _id: ObjectId.createFromHexString(formData.get("productId")),
  });

  if (user.userId !== product.userId.toString()) return redirect("/");

  await productsCollection.findOneAndDelete({ _id: product._id });

  revalidatePath("/products");
}