import { useState } from "react";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Button from "@/components/Button";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (label: any) => void;
};

const labelOptions = [
    { id: "1", name: "Standard FDA Label", region: "US", finish: "Gloss" },
    { id: "2", name: "EU Compliance Label", region: "Europe", finish: "Matte" },
    { id: "3", name: "Organic Certified Sticker", region: "Global", finish: "Textured" },
    { id: "4", name: "Promo Flash Label", region: "Any", finish: "High Gloss" },
];

const AddLabelModal = ({ open, onClose, onAdd }: Props) => {
    const [selectedLabel, setSelectedLabel] = useState(labelOptions[0]);

    const handleSubmit = () => {
        onAdd(selectedLabel);
        onClose();
    };

    return (
        <Modal
            title="Add Label Configuration"
            open={open}
            onClose={onClose}
            classWrapper="max-w-md"
        >
            <div className="flex flex-col gap-6">
                <div className="text-gray-500">
                    Specify the labeling requirements for this product.
                </div>
                <Select
                    label="Label Type"
                    value={selectedLabel}
                    onChange={(val: any) => setSelectedLabel(val)}
                    options={labelOptions}
                    required
                />

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2">
                    <div className="text-xs font-bold text-gray-500 uppercase">Specifications</div>
                    <div className="font-semibold text-gray-900">{selectedLabel.name}</div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Region: {selectedLabel.region}</span>
                        <span>Finish: {selectedLabel.finish}</span>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-2">
                    <Button isSecondary onClick={onClose}>Cancel</Button>
                    <Button isPrimary onClick={handleSubmit}>Add Label</Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddLabelModal;
