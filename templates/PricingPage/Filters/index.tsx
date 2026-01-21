import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { SelectOption } from "@/types/select";

type Props = {
    onFilter: (filters: any) => void;
};

const categories = [
    { id: "all", name: "All Categories" },
    { id: "Food & Beverage", name: "Food & Beverage" },
    { id: "Oils", name: "Oils" },
    { id: "Cosmetics", name: "Cosmetics" },
];

const manufacturers = [
    { id: "all", name: "All Manufacturers" },
    { id: "Green Valley Farms", name: "Green Valley Farms" },
    { id: "Pure Press Co.", name: "Pure Press Co." },
    { id: "Beauty Lab Inc.", name: "Beauty Lab Inc." },
    { id: "Bean Roasters", name: "Bean Roasters" },
];

const regions = [
    { id: "all", name: "All Regions" },
    { id: "North America", name: "North America" },
    { id: "Europe", name: "Europe" },
    { id: "Asia", name: "Asia" },
    { id: "South America", name: "South America" },
];

const Filters = ({ onFilter }: Props) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<SelectOption>(categories[0]);
    const [manufacturer, setManufacturer] = useState<SelectOption>(manufacturers[0]);
    const [region, setRegion] = useState<SelectOption>(regions[0]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleApply = () => {
        onFilter({
            search,
            category: category.id === "all" ? null : category.id,
            manufacturer: manufacturer.id === "all" ? null : manufacturer.id,
            region: region.id === "all" ? null : region.id,
            minPrice: minPrice ? Number(minPrice) : null,
            maxPrice: maxPrice ? Number(maxPrice) : null,
        });
    };

    const handleReset = () => {
        setSearch("");
        setCategory(categories[0]);
        setManufacturer(manufacturers[0]);
        setRegion(regions[0]);
        setMinPrice("");
        setMaxPrice("");
        onFilter({});
    };

    return (
        <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Field
                    label="Search"
                    placeholder="Product, SKU, Manufacturer"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    classInput="!h-10"
                />
                <Select
                    label="Category"
                    options={categories}
                    value={category}
                    onChange={setCategory}
                    isMedium
                />
                <Select
                    label="Manufacturer"
                    options={manufacturers}
                    value={manufacturer}
                    onChange={setManufacturer}
                    isMedium
                />
                <Select
                    label="Region"
                    options={regions}
                    value={region}
                    onChange={setRegion}
                    isMedium
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="flex gap-2">
                    <Field
                        label="Price Min"
                        placeholder="0"
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        classInput="!h-10"
                    />
                    <Field
                        label="Price Max"
                        placeholder="10000"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        classInput="!h-10"
                    />
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleApply} isPrimary className="flex-1">Apply Filters</Button>
                    <Button onClick={handleReset} isSecondary className="flex-1">Reset</Button>
                </div>
            </div>
        </div>
    );
};

export default Filters;
