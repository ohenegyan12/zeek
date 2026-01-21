import { useState } from "react";
import Modal from "@/components/Modal";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (manufacturer: any) => void;
};

const regionOptions = [
    { id: "na", name: "North America" },
    { id: "eu", name: "Europe" },
    { id: "asia", name: "Asia Pacific" },
];

const statusOptions = [
    { id: "active", name: "Active" },
    { id: "inactive", name: "Inactive" },
    { id: "review", name: "Under Review" },
];

const certificationOptions = [
    { id: "none", name: "None" },
    { id: "iso", name: "ISO 9001" },
    { id: "fda", name: "FDA Registered" },
    { id: "gmp", name: "GMP" },
];

const AddManufacturerModal = ({ open, onClose, onAdd }: Props) => {
    const [name, setName] = useState("");
    const [region, setRegion] = useState(regionOptions[0]);
    const [leadTime, setLeadTime] = useState("");
    const [status, setStatus] = useState(statusOptions[0]);
    const [certification, setCertification] = useState(certificationOptions[0]);

    const handleSubmit = () => {
        const newManufacturer = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            region: region.name,
            certifications: certification.name !== "None" ? [certification.name] : [],
            products: 0,
            reliability: 100, // Default new reliability
            leadTime: leadTime || "N/A",
            status: status.name,
        };
        onAdd(newManufacturer);
        onClose();
        // Reset
        setName("");
        setRegion(regionOptions[0]);
        setLeadTime("");
        setStatus(statusOptions[0]);
        setCertification(certificationOptions[0]);
    };

    return (
        <Modal
            title="Add Manufacturer"
            open={open}
            onClose={onClose}
            classWrapper="max-w-xl"
        >
            <div className="flex flex-col gap-5">
                <Field
                    label="Company Name"
                    placeholder="e.g. Global Supplies Ltd"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        label="Region"
                        value={region}
                        onChange={(val: any) => setRegion(val)}
                        options={regionOptions}
                        required
                    />
                    <Field
                        label="Avg Lead Time"
                        placeholder="e.g. 14 days"
                        value={leadTime}
                        onChange={(e) => setLeadTime(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        label="Primary Certification"
                        value={certification}
                        onChange={(val: any) => setCertification(val)}
                        options={certificationOptions}
                    />
                    <Select
                        label="Status"
                        value={status}
                        onChange={(val: any) => setStatus(val)}
                        options={statusOptions}
                        required
                    />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <Button isSecondary onClick={onClose}>Cancel</Button>
                    <Button isPrimary onClick={handleSubmit}>Create Manufacturer</Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddManufacturerModal;
