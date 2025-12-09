import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { EyeIcon } from "@/icons";
import Link from "next/link";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";

export default async function RecentOrders() {
  const user = await getAuthUser();

  if (!user || !user.userId) {
    return null;
  }
  const postsCollection = await getCollection("products");
  const userProduct = await postsCollection
    ?.find({ userId: ObjectId.createFromHexString(user.userId as string) })
    .sort({ $natural: -1 })
    .toArray();
  if (!userProduct) return <p>Failed to fetch data!</p>;

  if (userProduct.length === 0) return <p>You don't have any Products</p>;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            All products
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Products
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Quantity
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                View
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {userProduct.map((product) => (
              <TableRow key={product._id.toString()} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    {/* <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div> */}
                    {product.image ? (<Image src={product.image} alt={product.name} width={300} height={200} style={{ width: "40px" }} />) : (<Image src="/images/product/product-placeholder.jpg" alt={product.name} width={200} height={200} style={{ width: "40px" }} className="border-[1.5px]" />)}
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                      {/* <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.variants}
                      </span> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.quantity}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.price}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
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
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Link href={`/products/show/${product._id.toString()}`}><EyeIcon /></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
