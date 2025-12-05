"use client";
import { useActionState } from "react";

export default function ProductForm({ handler, product, isEdit = false }) {
    const [state, action, isPending] = useActionState(handler, undefined);

    return (
        <>
            <div className="container ">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageName">{isEdit ? 'Edit Product' : 'Add Product'}</h2>
                </div>
                <div className="mx-auto max-w-(--breakpoint-2xl)">
                    <div>
                        <div className="space-y-6">
                            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 ">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Products Description</h2>
                                </div>
                                <div className="p-4 sm:p-6 dark:border-gray-800">
                                    <form action={action}>
                                        <input type="hidden" name="productId" defaultValue={product?._id} />
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                >Product Name</label
                                                >
                                                <div className="relative">
                                                    <input
                                                        placeholder="Enter product name"
                                                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900  dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                                                        type="text"
                                                        name="name"
                                                        defaultValue={state?.name || product?.name}
                                                    />
                                                </div>
                                                {state?.errors?.name && <p className="mt-2 text-sm text-error-500">{state.errors.name}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                                <div>
                                                    <label className="mb-1 inline-block text-sm font-semibold text-gray-700 dark:text-gray-400"
                                                    >Stock Quantity</label
                                                    >
                                                    <div
                                                        className="flex h-11 divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300 dark:divide-gray-800 dark:border-gray-700"
                                                    >

                                                        <div className="flex-1">
                                                            <input
                                                                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900  dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                                                                type="text"
                                                                name="quantity"
                                                                defaultValue={state?.quantity || product?.quantity}
                                                            />
                                                        </div>

                                                    </div>
                                                    {state?.errors?.quantity && <p className="mt-2 text-sm text-error-500">{state.errors.quantity}</p>}
                                                </div>

                                                <div>
                                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                                        Availability Status</label
                                                    >
                                                    <div className="relative">
                                                        <select
                                                            className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
                                                            name="availability"
                                                            defaultValue={state?.available || product?.available}

                                                        >
                                                            <option
                                                                value=""
                                                                disabled=""
                                                                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                                                            >
                                                                Select a Availability
                                                            </option>
                                                            <option value="yes" className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                                                                In Stock
                                                            </option>
                                                            <option value="no" className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                                                                Out of Stock
                                                            </option></select
                                                        ><span
                                                            className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400"
                                                        ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="1.5"
                                                                    d="M4.792 7.396 10 12.604l5.208-5.208"
                                                                ></path></svg
                                                            ></span>
                                                    </div>
                                                    {state?.errors?.available && <p className="mt-2 text-sm text-error-500">{state.errors.available}</p>}

                                                </div>
                                                <div>
                                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                    >Product Price</label
                                                    >
                                                    <div className="relative">
                                                        <input
                                                            placeholder="Enter product price"
                                                            className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
                                                            type="number"
                                                            name="price"
                                                            defaultValue={state?.price || product?.price}
                                                        />
                                                    </div>
                                                    {state?.errors?.price && <p className="mt-2 text-sm text-error-500">{state.errors.price}</p>}

                                                </div>
                                            </div>
                                            <div class="col-span-full">
                                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
                                                <div class="relative">
                                                    <textarea
                                                        name="description"
                                                        placeholder="Receipt Info (optional)"
                                                        rows="6"
                                                        class="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                                        spellcheck="false"
                                                        defaultValue={state?.description || product?.description}

                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                                <button
                                                    disabled={isPending}
                                                    className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-5 py-3.5 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
                                                >
                                                    {isPending ? "Loading..." : `${isEdit ? 'Edit Product' : 'Save Product'}`}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>

                {/* <BlogForm handler={createProduct}/> */}
            </div>
        </>
    )
}
