import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";

const regionOptions = [
    { id: "all", name: "All Regions" },
    { id: "na", name: "North America" },
    { id: "eu", name: "Europe" },
    { id: "asia", name: "Asia Pacific" },
];

const certificationOptions = [
    { id: "all", name: "All Certifications" },
    { id: "iso", name: "ISO 9001" },
    { id: "fda", name: "FDA Registered" },
    { id: "gmp", name: "GMP" },
];

const statusOptions = [
    { id: "all", name: "All Status" },
    { id: "active", name: "Active" },
    { id: "inactive", name: "Inactive" },
    { id: "review", name: "Under Review" },
];

const ManufacturersFilters = () => {
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState(regionOptions[0]);
    const [certification, setCertification] = useState(certificationOptions[0]);
    const [status, setStatus] = useState(statusOptions[0]);

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
                    placeholder="Search manufacturer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                    value={region}
                    onChange={(val: any) => setRegion(val)}
                    options={regionOptions}
                    placeholder="Region"
                />
                <Select
                    value={certification}
                    onChange={(val: any) => setCertification(val)}
                    options={certificationOptions}
                    placeholder="Certifications"
                />
                <Select
                    value={status}
                    onChange={(val: any) => setStatus(val)}
                    options={statusOptions}
                    placeholder="Status"
                />
            </div>
        </div>
    );
};

export default ManufacturersFilters;
