import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { SelectOption } from "@/types/select";

type Props = {
    onFilter: (filters: any) => void;
};

const ruleTypes = [
    { id: "all", name: "All Types" },
    { id: "Compliance", name: "Compliance" },
    { id: "Pricing", name: "Pricing" },
    { id: "Data Access", name: "Data Access" },
    { id: "Safety", name: "Safety" },
];

const scopes = [
    { id: "all", name: "All Scopes" },
    { id: "Global", name: "Global" },
    { id: "Product", name: "Product" },
    { id: "Manufacturer", name: "Manufacturer" },
    { id: "Region", name: "Region" },
];

const statuses = [
    { id: "all", name: "All Statuses" },
    { id: "Active", name: "Active" },
    { id: "Disabled", name: "Disabled" },
];

const RuleFilters = ({ onFilter }: Props) => {
    const [search, setSearch] = useState("");
    const [type, setType] = useState<SelectOption>(ruleTypes[0]);
    const [scope, setScope] = useState<SelectOption>(scopes[0]);
    const [status, setStatus] = useState<SelectOption>(statuses[0]);

    const handleApply = () => {
        onFilter({
            search,
            type: type.id === 'all' ? null : type.id,
            scope: scope.id === 'all' ? null : scope.id,
            status: status.id === 'all' ? null : status.id
        });
    };

    const handleReset = () => {
        setSearch("");
        setType(ruleTypes[0]);
        setScope(scopes[0]);
        setStatus(statuses[0]);
        onFilter({});
    };

    return (
        <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <Field
                    label="Search Rules"
                    placeholder="Rule name, keyword..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    classInput="!h-10"
                />
                <Select
                    label="Rule Type"
                    options={ruleTypes}
                    value={type}
                    onChange={setType}
                    isMedium
                />
                <Select
                    label="Scope"
                    options={scopes}
                    value={scope}
                    onChange={setScope}
                    isMedium
                />
                <Select
                    label="Status"
                    options={statuses}
                    value={status}
                    onChange={setStatus}
                    isMedium
                />
            </div>
            <div className="flex justify-end gap-2">
                <Button onClick={handleReset} isSecondary isMedium>Reset</Button>
                <Button onClick={handleApply} isPrimary isMedium>Apply Filters</Button>
            </div>
        </div>
    );
};

export default RuleFilters;
