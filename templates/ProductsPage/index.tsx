"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Filters from "./Filters";
import ProductsTable from "./Table";
import ProductDetailModal from "./ProductDetailModal";
import AddProductModal from "./AddProductModal";
import { productsContent as initialProducts } from "./Table";

const ProductsPage = () => {
    const [products, setProducts] = useState(initialProducts);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);

    const handleViewProduct = (item: any) => {
        setSelectedProduct(item);
        setIsDetailOpen(true);
    };

    const handleAddProduct = (newProduct: any) => {
        setProducts([newProduct, ...products]);
    };

    return (
        <Layout title="Products">
            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-4">
                        <div>
                            <h1 className="text-h4 max-md:text-h5">Products</h1>
                            <div className="text-body-lg text-gray-500 mt-1">
                                Manage all products and view linked supply chain information
                            </div>
                        </div>
                        <button
                            className="h-12 px-6 rounded-xl bg-primary-500 text-white font-bold transition-all hover:bg-primary-600"
                            onClick={() => setIsAddProductOpen(true)}
                        >
                            + Add New Product
                        </button>
                    </div>
                </div>

                <Filters />
                <ProductsTable items={products} onView={handleViewProduct} />

                <ProductDetailModal
                    open={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                    product={selectedProduct}
                />

                <AddProductModal
                    open={isAddProductOpen}
                    onClose={() => setIsAddProductOpen(false)}
                    onAdd={handleAddProduct}
                />
            </div>
        </Layout>
    );
};

export default ProductsPage;
