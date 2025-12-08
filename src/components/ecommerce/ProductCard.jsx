import Link from "next/link";
import Image from "next/image";
import Badge from "../ui/badge/Badge";
export default function ProductCard({ product }) {
  return (
    <div className="border border-slate-400 border-dashed p-4 rounded-md h-full bg-white">
      {/* <p className="text-slate-600 text-xs">
        {post._id.getTimestamp().toLocaleString()}
      </p> */}
      <div className="flex items-center justify-around mb-4  relative">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={400}
            style={{ width: "230px", height: "275px", objectFit: "cover" }}
            className="w-full object-cover rounded-md"
          />
        ) : (
          <Image
            src="/images/product/product-placeholder.jpg"
            alt={product.name}
            width={300}
            height={200}
            style={{ width: "230px", }}
            className="w-full  object-cover rounded-md border-[1.5px]"
          />
        )}
        <div>
          <h2 className="block text-xl font-semibold">
            {product.name}
            <span className="ml-4">
              <Badge
                className="mt-4"
                size="sm"
                color={
                  product.available === "yes"
                    ? "success"
                    : product.status === "no"
                      ? "warning"
                      : "error"
                }
              >
                {
                  product.available === "yes"
                    ? "In Stock"
                    : "Out of Stock"
                }
              </Badge>
            </span>
          </h2>
          <h6 className="mt-4 ">{product.price ? `Price: $${product.price}` : ""}</h6>
          <p className="text-sm mt-4">{product.quantity ? `Quantity: ${product.quantity}` : ""}</p>

          <p className="text-sm mt-4">{product.description ? `Description: ${product.description}` : ""}</p>

        </div>
      </div>
    </div>
  );
}
