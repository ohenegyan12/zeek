import { useState } from "react";
import { SelectOption } from "@/types/select";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";

const categoryOptions = [
    { id: "all", name: "All Categories" },
    { id: "beverages", name: "Beverages" },
    { id: "snacks", name: "Snacks" },
    { id: "cereal", name: "Cereal" },
];

const regionOptions = [
    { id: "all", name: "All Regions" },
    { id: "na", name: "North America" },
    { id: "eu", name: "Europe" },
    { id: "asia", name: "Asia Pacific" },
];

const statusOptions = [
    { id: "all", name: "All Status" },
    { id: "active", name: "Active" },
    { id: "inactive", name: "Inactive" },
    { id: "archived", name: "Archived" },
];

const ProductsFilters = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<SelectOption>(categoryOptions[0]);
    const [region, setRegion] = useState<SelectOption>(regionOptions[0]);
    const [status, setStatus] = useState<SelectOption>(statusOptions[0]);

    return (
        <div className="flex flex-col gap-4 p-5 border border-gray-100 rounded-2xl bg-white mt-6">
            <div className="flex items-center justify-between">
                <div className="text-h6">Filters</div>
                <div className="flex gap-2">
                    <Button isSecondary isSmall>Reset</Button>
                    <Button isSmall>Apply</Button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                <Field
                    placeholder="Search products, SKU..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon="search"
                />
                <Select
                    value={category}
                    onChange={setCategory}
                    options={categoryOptions}
                    placeholder="Category"
                />
                <Select
                    value={region}
                    onChange={setRegion}
                    options={regionOptions}
                    placeholder="Region"
                />
                <Select
                    value={status}
                    onChange={setStatus}
                    options={statusOptions}
                    placeholder="Status"
                />
            </div>
        </div>
    );
};

export default ProductsFilters;
