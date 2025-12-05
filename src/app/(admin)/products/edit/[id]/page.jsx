import { updateProduct } from "@/actions/products";
import ProductForm from "../../form/ProductForm";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function Edit({ params }) {
  // Id parameter from page params
  const { id } = await params;

  // Get the auth user from cookies
  const user = await getAuthUser();

  const productsCollection = await getCollection("products");
  let product;
  if (id.length === 24 && productsCollection) {
    // Get the current post from DB
    product = await productsCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    product = JSON.parse(JSON.stringify(product));
    // check if auth user owns the post
    if (user.userId !== product.userId) return redirect("/");
  } else {
    product = null;
  }

  return (
    <div className="container">
      {product ? (
        <ProductForm handler={updateProduct} product={product} isEdit={true} />
      ) : (
        <p>Failed to fetch the data</p>
      )}
    </div>
  );
}
