import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";

const categoryOptions = [
    { id: "all", name: "All Categories" },
    { id: "beverages", name: "Beverages" },
    { id: "snacks", name: "Snacks" },
];

const riskOptions = [
    { id: "all", name: "All Risk Levels" },
    { id: "compliant", name: "Compliant" },
    { id: "flagged", name: "Flagged" },
];

const regionOptions = [
    { id: "all", name: "All Regions" },
    { id: "na", name: "North America" },
    { id: "eu", name: "Europe" },
    { id: "asia", name: "Asia Pacific" },
];

const SupplyChainFilters = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(categoryOptions[0]);
    const [risk, setRisk] = useState(riskOptions[0]);
    const [region, setRegion] = useState(regionOptions[0]);

    return (
        <div className="flex flex-col gap-4 p-5 border border-gray-100 rounded-2xl bg-white">
            <div className="flex items-center justify-between">
                <div className="text-h6">Filters</div>
                <div className="flex gap-2">
                    <Button isSecondary isSmall>Reset</Button>
                    <Button isSmall>Apply</Button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                <Field
                    placeholder="Search product, manufacturer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                    value={category}
                    onChange={(val: any) => setCategory(val)}
                    options={categoryOptions}
                    placeholder="Category"
                />
                <Select
                    value={region}
                    onChange={(val: any) => setRegion(val)}
                    options={regionOptions}
                    placeholder="Region"
                />
                <Select
                    value={risk}
                    onChange={(val: any) => setRisk(val)}
                    options={riskOptions}
                    placeholder="Risk Status"
                />
            </div>
        </div>
    );
};

export default SupplyChainFilters;
