"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import AnalyticsFilters from "./components/AnalyticsFilters";
import MetricsGrid from "./components/MetricsGrid";
import ProductAnalytics from "./components/ProductAnalytics";
import ManufacturerAnalytics from "./components/ManufacturerAnalytics";
import PricingAndAIAnalytics from "./components/PricingAndAIAnalytics";

const AnalyticsPage = () => {
    const handleFilter = (filters: any) => {
        console.log("Filters applied:", filters);
        // In a real app, this would fetch new data
    };

    return (
        <Layout title="Analytics Dashboard">
            <div className="flex flex-col gap-8 pb-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-h4">Analytics</h1>
                    <p className="text-gray-500">Insights and trends across products, manufacturers, and AI performance.</p>
                </div>

                <AnalyticsFilters onFilter={handleFilter} />
                <MetricsGrid />

                <h2 className="text-h5 font-semibold mt-4">Product Performance</h2>
                <ProductAnalytics />

                <h2 className="text-h5 font-semibold mt-4">Manufacturer Insights</h2>
                <ManufacturerAnalytics />

                <h2 className="text-h5 font-semibold mt-4">Pricing & AI Trends</h2>
                <PricingAndAIAnalytics />
            </div>
        </Layout>
    );
};

export default AnalyticsPage;
