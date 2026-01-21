import { useState } from "react";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Button from "@/components/Button";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (manufacturer: any) => void;
};

const manufacturerOptions = [
    { id: "1", name: "Green Valley Farms", region: "North America", leadTime: "14 days" },
    { id: "2", name: "Fresh Pack Solutions", region: "Europe", leadTime: "20 days" },
    { id: "3", name: "Asia Foods Ltd", region: "Asia Pacific", leadTime: "30 days" },
    { id: "4", name: "Eco Containers Inc", region: "North America", leadTime: "7 days" },
];

const AddManufacturerModal = ({ open, onClose, onAdd }: Props) => {
    const [selectedMfr, setSelectedMfr] = useState(manufacturerOptions[0]);

    const handleSubmit = () => {
        onAdd(selectedMfr);
        onClose();
    };

    return (
        <Modal
            title="Link Manufacturer"
            open={open}
            onClose={onClose}
            classWrapper="max-w-md"
        >
            <div className="flex flex-col gap-6">
                <div className="text-gray-500">
                    Select a manufacturer to link to this product. This will allow Zeek to track supply chain dependencies.
                </div>
                <Select
                    label="Manufacturer"
                    value={selectedMfr}
                    onChange={(val: any) => setSelectedMfr(val)}
                    options={manufacturerOptions}
                    required
                />

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2">
                    <div className="text-xs font-bold text-gray-500 uppercase">Selected Profile</div>
                    <div className="font-semibold text-gray-900">{selectedMfr.name}</div>
                    <div className="flex gap-4 text-sm text-gray-600">
                        <span>Region: {selectedMfr.region}</span>
                        <span>Lead Time: {selectedMfr.leadTime}</span>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-2">
                    <Button isSecondary onClick={onClose}>Cancel</Button>
                    <Button isPrimary onClick={handleSubmit}>Link Manufacturer</Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddManufacturerModal;
