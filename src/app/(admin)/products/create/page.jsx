import { createProduct } from "@/actions/products";
import ProductForm from "../form/ProductForm";

export default async function create() {
  return (
    <ProductForm handler={createProduct} />
  );
}