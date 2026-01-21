import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { SelectOption } from "@/types/select";

type Props = {
    onFilter: (filters: any) => void;
};

const docTypes = [
    { id: "all", name: "All Types" },
    { id: "Specification", name: "Specification" },
    { id: "Compliance", name: "Compliance" },
    { id: "Pricing", name: "Pricing" },
    { id: "Contract", name: "Contract" },
    { id: "Internal Note", name: "Internal Note" },
];

const statuses = [
    { id: "all", name: "All Statuses" },
    { id: "Active", name: "Active" },
    { id: "Needs Review", name: "Needs Review" },
    { id: "Expired", name: "Expired" },
];

const visibilities = [
    { id: "all", name: "All Visibility" },
    { id: "AI-Readable", name: "AI-Readable" },
    { id: "Internal-Only", name: "Internal-Only" },
];

const KBFilters = ({ onFilter }: Props) => {
    const [search, setSearch] = useState("");
    const [type, setType] = useState<SelectOption>(docTypes[0]);
    const [status, setStatus] = useState<SelectOption>(statuses[0]);
    const [visibility, setVisibility] = useState<SelectOption>(visibilities[0]);

    const handleApply = () => {
        onFilter({
            search,
            type: type.id === "all" ? null : type.id,
            status: status.id === "all" ? null : status.id,
            visibility: visibility.id === "all" ? null : visibility.id,
        });
    };

    const handleReset = () => {
        setSearch("");
        setType(docTypes[0]);
        setStatus(statuses[0]);
        setVisibility(visibilities[0]);
        onFilter({});
    };

    return (
        <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <Field
                    label="Search Documents"
                    placeholder="Title, keyword..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    classInput="!h-10"
                />
                <Select
                    label="Document Type"
                    options={docTypes}
                    value={type}
                    onChange={setType}
                    isMedium
                />
                <Select
                    label="Status"
                    options={statuses}
                    value={status}
                    onChange={setStatus}
                    isMedium
                />
                <Select
                    label="Visibility"
                    options={visibilities}
                    value={visibility}
                    onChange={setVisibility}
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

export default KBFilters;
