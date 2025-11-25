import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { EyeIcon, TrashBinIcon, PencilIcon } from "@/icons";
import { deleteProduct } from "@/actions/products";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Dashboard() {
    const user = await getAuthUser();
    if (!user || !user.userId) return <p>Not authenticated</p>;

    const productsCollection = await getCollection("products");
    const userIdStr = String(user.userId);
    const userProducts = await productsCollection
        ?.find({ userId: ObjectId.createFromHexString(userIdStr) })
        .sort({ $natural: -1 })
        .toArray();

    if (!userProducts) return <p>Failed to fetch data!</p>;

    if (userProducts.length === 0) return <p>You don't have any posts</p>;

    return (
        <div>
            <h1 className="title mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Manage Products</h1>

            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Table Header */}
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Name
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                View
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Edit
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {userProducts.map((product) => (
                            <TableRow key={product._id.toString()} className="">
                                <TableCell className="py-3">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {product.name}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <Link href={`/products/show/${product._id.toString()}`}><EyeIcon /></Link>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <Link href={`/products/edit/${product._id.toString()}`}><PencilIcon /></Link>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <form action={deleteProduct}>
                                        <input
                                            type="hidden"
                                            name="productId"
                                            defaultValue={product._id.toString()}
                                        />
                                        <button type="submit"><TrashBinIcon /></button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
