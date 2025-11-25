import { createPost } from "@/actions/products";
import ProductForm from "../form/page";

export default async function create() {
  return (
    <ProductForm handler={createPost} />
  );
}