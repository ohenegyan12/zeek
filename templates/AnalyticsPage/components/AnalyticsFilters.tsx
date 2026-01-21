import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { SelectOption } from "@/types/select";

type Props = {
    onFilter: (filters: any) => void;
};

const periods = [
    { id: "7d", name: "Last 7 Days" },
    { id: "30d", name: "Last 30 Days" },
    { id: "90d", name: "Last 90 Days" },
    { id: "custom", name: "Custom Range" },
];

const categories = [
    { id: "all", name: "All Categories" },
    { id: "Food & Beverage", name: "Food & Beverage" },
    { id: "Oils", name: "Oils" },
    { id: "Cosmetics", name: "Cosmetics" },
];

const AnalyticsFilters = ({ onFilter }: Props) => {
    const [period, setPeriod] = useState<SelectOption>(periods[1]);
    const [category, setCategory] = useState<SelectOption>(categories[0]);

    const handleApply = () => {
        onFilter({
            period: period.id,
            category: category.id,
        });
    };

    const handleReset = () => {
        setPeriod(periods[1]);
        setCategory(categories[0]);
        onFilter({});
    };

    return (
        <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select
                    label="Date Range"
                    options={periods}
                    value={period}
                    onChange={setPeriod}
                    isMedium
                />
                <Select
                    label="Category"
                    options={categories}
                    value={category}
                    onChange={setCategory}
                    isMedium
                />
                {/* Add more filters (Manufacturer, Region) as needed, keeping it simple for now */}
            </div>
            <div className="flex gap-2 shrink-0">
                <Button onClick={handleApply} isPrimary isMedium>Apply</Button>
                <Button onClick={handleReset} isSecondary isMedium>Reset</Button>
            </div>
        </div>
    );
};

export default AnalyticsFilters;
