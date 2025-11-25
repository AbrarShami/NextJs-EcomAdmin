import ProductCard from "../../../../../components/ecommerce/ProductCard";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function Show({ params }) {
  const { id } = await params;

  const productsCollection = await getCollection("products");
  const product =
    id.length === 24
      ? await productsCollection?.findOne({
        _id: ObjectId.createFromHexString(id),
      })
      : null;

  return (
    <div className="container w-1/2">
      {product ? <ProductCard product={product} /> : <p>Failed to fetch the data</p>}
    </div>
  );
}
