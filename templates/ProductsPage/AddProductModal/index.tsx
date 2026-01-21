import { useState } from "react";
import Modal from "@/components/Modal";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (product: any) => void;
};

const categoryOptions = [
    { id: "beverages", name: "Beverages" },
    { id: "snacks", name: "Snacks" },
    { id: "cereal", name: "Cereal" },
];

const statusOptions = [
    { id: "active", name: "Active" },
    { id: "inactive", name: "Inactive" },
    { id: "archived", name: "Archived" },
];

const AddProductModal = ({ open, onClose, onAdd }: Props) => {
    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [category, setCategory] = useState(categoryOptions[0]);
    const [priceRange, setPriceRange] = useState("");
    const [status, setStatus] = useState(statusOptions[0]);

    const handleSubmit = () => {
        const newProduct = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            sku,
            category: category.name,
            manufacturers: 0,
            packaging: 0,
            labels: 0,
            priceRange,
            status: status.name,
        };
        onAdd(newProduct);
        onClose();
        // Reset form
        setName("");
        setSku("");
        setCategory(categoryOptions[0]);
        setPriceRange("");
        setStatus(statusOptions[0]);
    };

    return (
        <Modal
            title="Add New Product"
            open={open}
            onClose={onClose}
            classWrapper="max-w-xl"
        >
            <div className="flex flex-col gap-5">
                <Field
                    label="Product Name"
                    placeholder="e.g. Organic Honey 500g"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <Field
                        label="SKU"
                        placeholder="e.g. OH-500-001"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        required
                    />
                    <Select
                        label="Category"
                        value={category}
                        onChange={(val: any) => setCategory(val)}
                        options={categoryOptions}
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field
                        label="Price Range"
                        placeholder="e.g. $10.00 - $15.00"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
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
                    <Button isPrimary onClick={handleSubmit}>Create Product</Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddProductModal;
