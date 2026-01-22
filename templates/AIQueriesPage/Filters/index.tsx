import { useState } from "react";
import { SelectOption } from "@/types/select";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";

const dateOptions = [
    { id: "1", name: "Today" },
    { id: "2", name: "Last 7 Days" },
    { id: "3", name: "Last 30 Days" },
];

const statusOptions = [
    { id: "all", name: "All Status" },
    { id: "resolved", name: "Resolved" },
    { id: "flagged", name: "Flagged" },
    { id: "needs_review", name: "Needs Review" },
    { id: "needs_train", name: "Needs Training" },
];

const Filters = () => {
    const [search, setSearch] = useState("");
    const [dateRange, setDateRange] = useState<SelectOption>(dateOptions[1]);
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
                    placeholder="Search queries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon="search"
                />
                <Select
                    value={dateRange}
                    onChange={setDateRange}
                    options={dateOptions}
                    placeholder="Date Range"
                />
                <Select
                    value={status}
                    onChange={setStatus}
                    options={statusOptions}
                    placeholder="Status"
                />
                <Field
                    placeholder="Product / Manufacturer"
                    value=""
                    onChange={() => { }}
                />
            </div>
        </div>
    );
};

export default Filters;
