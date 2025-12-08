
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon, OutofStock, InStock, LowStock, ProductIcon } from "@/icons";
import Image from "next/image";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";

export default async function EcommerceMetrics() {
  const user = await getAuthUser();

  if (!user || !user.userId) {
    return null;
  }

  const productsCollection = await getCollection("products");
  const products = await productsCollection
    ?.find({ userId: ObjectId.createFromHexString(user.userId as string) })
    .sort({ $natural: -1 })
    .toArray();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Image
            src={ProductIcon}
            alt="Product"
            width={40}
            height={40}
            className="text-gray-800 dark:text-white/90"
          />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              All Products
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {products ? products.length : 0}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Image
            src={InStock}
            alt="Product"
            width={40}
            height={40}
            className="text-gray-800 dark:text-white/90"
          />        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              In stock
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {products ? products.filter(product => product.available === "yes").length : 0}
            </h4>
          </div>
        </div>

      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Image
            src={OutofStock}
            alt="Product"
            width={40}
            height={40}
            className="text-gray-800 dark:text-white/90"
          />        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Out of stock
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {products ? products.filter(product => product.available === "no").length : 0}
            </h4>
          </div>
        </div>

      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Image
            src={LowStock}
            alt="Product"
            width={40}
            height={40}
            className="text-gray-800 dark:text-white/90"
          />        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Low stock
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {products ? products.filter(product => product.quantity <= 10).length : 0}
            </h4>
          </div>
        </div>

      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
