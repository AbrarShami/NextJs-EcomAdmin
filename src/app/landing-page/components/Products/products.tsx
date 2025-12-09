import { getCollection } from "@/lib/db";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";
export default async function Products() {
    const postsCollection = await getCollection("products");
    const products = await postsCollection?.find({}).toArray();
    return (
        <>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products?.map((product, key) => (
                            <div key={key} className="group relative">
                                {/* { }
                                <Image src={product.image} alt="Front of men&#039;s Basic Tee in black." className="" /> */}
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={300}
                                        height={400}
                                        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                    />
                                ) : (
                                    <Image
                                        src="/images/product/landscape-placeholder.svg"
                                        alt={product.name}
                                        width={100}
                                        height={200}
                                        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                    />
                                )}
                                <span className="mt-4 inline-block">
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
                                <div className="mt-4 flex justify-between">
                                    <div>

                                        <h3 className="text-sm text-gray-700">
                                            <a href="#">
                                                <span aria-hidden="true" className="absolute inset-0"></span>
                                                {product.name}
                                            </a>
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                    </div>

                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}