"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Filters from "./Filters";
import ManufacturersTable from "./Table";
import ManufacturerDetailModal from "./ManufacturerDetailModal";
import AddManufacturerModal from "./AddManufacturerModal";
import { manufacturersContent as initialManufacturers } from "./Table";

const ManufacturersPage = () => {
    const [manufacturers, setManufacturers] = useState(initialManufacturers);
    const [selectedManufacturer, setSelectedManufacturer] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const handleViewManufacturer = (item: any) => {
        setSelectedManufacturer(item);
        setIsDetailOpen(true);
    };

    const handleAddManufacturer = (newMfr: any) => {
        setManufacturers([newMfr, ...manufacturers]);
    };

    return (
        <Layout title="Manufacturers">
            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-4">
                        <div>
                            <h1 className="text-h4 max-md:text-h5">Manufacturers</h1>
                            <div className="text-body-lg text-gray-500 mt-1">
                                View, manage, and analyze all product suppliers
                            </div>
                        </div>
                        <button
                            className="h-12 px-6 rounded-xl bg-primary-500 text-white font-bold transition-all hover:bg-primary-600"
                            onClick={() => setIsAddOpen(true)}
                        >
                            + Add Manufacturer
                        </button>
                    </div>
                </div>

                <Filters />
                <ManufacturersTable items={manufacturers} onView={handleViewManufacturer} />

                <ManufacturerDetailModal
                    open={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                    manufacturer={selectedManufacturer}
                />

                <AddManufacturerModal
                    open={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    onAdd={handleAddManufacturer}
                />
            </div>
        </Layout>
    );
};

export default ManufacturersPage;
