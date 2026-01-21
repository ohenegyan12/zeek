"use client";

import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import Filters from "./Filters";
import PricingTable from "./PricingTable";
import ComparisonTool from "./ComparisonTool";
import SimulationPanel from "./SimulationPanel";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { mockProducts, Product } from "./mocks";

const PricingPage = () => {
    const [allProducts] = useState<Product[]>(mockProducts);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

    // Modals
    const [isComparisonOpen, setComparisonOpen] = useState(false);
    const [simulationProduct, setSimulationProduct] = useState<Product | null>(null);

    const handleFilter = (filters: any) => {
        let result = allProducts;

        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.sku.toLowerCase().includes(q) ||
                p.manufacturer.name.toLowerCase().includes(q)
            );
        }

        if (filters.category && filters.category !== 'all') {
            result = result.filter(p => p.category === filters.category);
        }

        if (filters.manufacturer && filters.manufacturer !== 'all') {
            result = result.filter(p => p.manufacturer.name === filters.manufacturer);
        }

        if (filters.region && filters.region !== 'all') {
            result = result.filter(p => p.manufacturer.region === filters.region);
        }

        if (filters.minPrice) {
            result = result.filter(p => p.costs.total >= Number(filters.minPrice));
        }

        if (filters.maxPrice) {
            result = result.filter(p => p.costs.total <= Number(filters.maxPrice));
        }

        setFilteredProducts(result);
        setSelectedProductIds([]); // Clear selection on filter change
    };

    const handleSelectProduct = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedProductIds(prev => [...prev, id]);
        } else {
            setSelectedProductIds(prev => prev.filter(pid => pid !== id));
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedProductIds(filteredProducts.map(p => p.id));
        } else {
            setSelectedProductIds([]);
        }
    };

    const handleCompare = () => {
        if (selectedProductIds.length < 2) {
            alert("Please select at least 2 products to compare.");
            return;
        }
        setComparisonOpen(true);
    };

    const handleSimulate = (product: Product) => {
        setSimulationProduct(product);
    };

    const selectedProductsForComparison = useMemo(() => {
        return allProducts.filter(p => selectedProductIds.includes(p.id));
    }, [allProducts, selectedProductIds]);

    return (
        <Layout title="Pricing & Cost Management">
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start max-md:flex-col max-md:gap-4">
                    <div>
                        <h1 className="text-h4">Pricing Overview</h1>
                        <p className="text-gray-500 mt-1">Manage product costs, simulate scenarios, and compare manufacturers.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            isSecondary
                            disabled={selectedProductIds.length < 2}
                            onClick={handleCompare}
                        >
                            <Icon name="chart" className="size-4 mr-2" />
                            Compare Selected ({selectedProductIds.length})
                        </Button>
                        <Button isPrimary onClick={() => alert("Exporting Table...")}>
                            Export CSV
                        </Button>
                    </div>
                </div>

                <Filters onFilter={handleFilter} />

                <PricingTable
                    products={filteredProducts}
                    selectedProducts={selectedProductIds}
                    onSelectProduct={handleSelectProduct}
                    onSelectAll={handleSelectAll}
                    onViewDetails={handleSimulate} // Using View Details to trigger Simulation for this demo as "Simulate"
                    onCompare={() => { }}
                />

                <ComparisonTool
                    open={isComparisonOpen}
                    onClose={() => setComparisonOpen(false)}
                    products={selectedProductsForComparison}
                />

                <SimulationPanel
                    open={!!simulationProduct}
                    onClose={() => setSimulationProduct(null)}
                    product={simulationProduct}
                />
            </div>
        </Layout>
    );
};

export default PricingPage;
