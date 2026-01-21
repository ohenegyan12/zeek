import { useState } from "react";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Button from "@/components/Button";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (pkg: any) => void;
};

const packagingOptions = [
    { id: "1", name: "Glass Jar 500ml", cost: "$0.45/unit", type: "Recyclable", eco: true },
    { id: "2", name: "Plastic Bottle 1L", cost: "$0.15/unit", type: "Standard", eco: false },
    { id: "3", name: "Cardboard Box XL", cost: "$0.30/unit", type: "Biodegradable", eco: true },
    { id: "4", name: "Aluminum Can 330ml", cost: "$0.25/unit", type: "Recyclable", eco: true },
];

const AddPackagingModal = ({ open, onClose, onAdd }: Props) => {
    const [selectedPkg, setSelectedPkg] = useState(packagingOptions[0]);

    const handleSubmit = () => {
        onAdd(selectedPkg);
        onClose();
    };

    return (
        <Modal
            title="Add Packaging Option"
            open={open}
            onClose={onClose}
            classWrapper="max-w-md"
        >
            <div className="flex flex-col gap-6">
                <div className="text-gray-500">
                    Select the packaging type used for this product SKU.
                </div>
                <Select
                    label="Packaging Type"
                    value={selectedPkg}
                    onChange={(val: any) => setSelectedPkg(val)}
                    options={packagingOptions}
                    required
                />

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2">
                    <div className="text-xs font-bold text-gray-500 uppercase">Details</div>
                    <div className="font-semibold text-gray-900">{selectedPkg.name}</div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Type: {selectedPkg.type}</span>
                        <span>Cost: {selectedPkg.cost}</span>
                    </div>
                    {selectedPkg.eco && (
                        <div className="self-start px-2 py-1 mt-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">
                            Eco-Friendly
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 mt-2">
                    <Button isSecondary onClick={onClose}>Cancel</Button>
                    <Button isPrimary onClick={handleSubmit}>Add Packaging</Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddPackagingModal;
