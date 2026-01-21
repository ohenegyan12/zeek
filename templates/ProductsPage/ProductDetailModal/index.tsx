import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Select from "@/components/Select";
import AddManufacturerModal from "../AddManufacturerModal";
import AddPackagingModal from "../AddPackagingModal";
import AddLabelModal from "../AddLabelModal";
import AskZeekModal from "../AskZeekModal";

type Props = {
    open: boolean;
    onClose: () => void;
    product: any;
};

const ProductDetailModal = ({ open, onClose, product }: Props) => {
    const [isAddMfrOpen, setIsAddMfrOpen] = useState(false);
    const [isAddPkgOpen, setIsAddPkgOpen] = useState(false);
    const [isAddLabelOpen, setIsAddLabelOpen] = useState(false);
    const [isAskZeekOpen, setIsAskZeekOpen] = useState(false);

    // Edit Mode State
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const [linkedManufacturers, setLinkedManufacturers] = useState<any[]>([]);
    const [packagingList, setPackagingList] = useState<any[]>([]);
    const [labelsList, setLabelsList] = useState<any[]>([]);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                sku: product.sku,
                status: product.status,
                category: product.category,
                priceRange: product.priceRange
            });
        }
    }, [product]);

    useEffect(() => {
        if (product && product.manufacturers > 0) {
            setLinkedManufacturers([
                {
                    id: "1",
                    name: "Green Valley Farms",
                    region: "North America",
                    leadTime: "14 days"
                }
            ]);
        } else {
            setLinkedManufacturers([]);
        }
        // Initialize with defaults
        setPackagingList([
            { id: "1", name: "Glass Jar 500ml", cost: "$0.45/unit", type: "Recyclable", eco: true }
        ]);
        setLabelsList([
            { id: "1", name: "Standard FDA Label", region: "US", finish: "Gloss" }
        ]);
    }, [product]);

    const handleAddManufacturer = (mfr: any) => {
        setLinkedManufacturers([...linkedManufacturers, mfr]);
    };

    const handleAddPackaging = (pkg: any) => {
        setPackagingList([...packagingList, pkg]);
    };

    const handleAddLabel = (label: any) => {
        setLabelsList([...labelsList, label]);
    };

    const handleSave = () => {
        // Here we would save to backend
        setIsEditing(false);
    };

    if (!product) return null;

    return (
        <Modal
            className=""
            classWrapper=""
            title="Product Details"
            open={open}
            onClose={onClose}
            isSlidePanel
            contentFooter={
                <div className="flex gap-2">
                    <Button isMedium isSecondary>Archive Product</Button>
                    <Button
                        isMedium
                        isPrimary
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                        {isEditing ? "Save Changes" : "Edit Product"}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-6">
                {/* Basic Info */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        {isEditing ? (
                            <div className="w-full grid grid-cols-2 gap-4">
                                <Field
                                    label="Product Name"
                                    value={formData.name || product.name}
                                    onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Field
                                    label="SKU"
                                    value={formData.sku || product.sku}
                                    onChange={(e: any) => setFormData({ ...formData, sku: e.target.value })}
                                />
                                <div className="col-span-2">
                                    <Select
                                        label="Status"
                                        value={formData.status || product.status}
                                        onChange={(val: any) => setFormData({ ...formData, status: val })}
                                        options={[
                                            { id: "Active", name: "Active" },
                                            { id: "Draft", name: "Draft" },
                                            { id: "Archived", name: "Archived" }
                                        ]}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <div className="text-h5 text-gray-900">{formData.name || product.name}</div>
                                    <div className="text-sm text-gray-500 font-mono mt-1">{formData.sku || product.sku}</div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${(formData.status || product.status) === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                                    }`}>
                                    {typeof formData.status === 'object' ? (formData.status as any).name : (formData.status || product.status)}
                                </div>
                            </>
                        )}
                    </div>
                    {isEditing ? (
                        <div className="grid grid-cols-2 gap-4">
                            <Field
                                label="Category"
                                value={formData.category || product.category}
                                onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                            />
                            <Field
                                label="Price Range"
                                value={formData.priceRange || product.priceRange}
                                onChange={(e: any) => setFormData({ ...formData, priceRange: e.target.value })}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-gray-400 font-bold uppercase">Category</div>
                                <div className="font-medium text-gray-700">{formData.category || product.category}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 font-bold uppercase">Price Range</div>
                                <div className="font-medium text-gray-700">{formData.priceRange || product.priceRange}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Linked Manufacturers */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Linked Manufacturers</div>
                        <button
                            className="text-primary-500 text-sm font-semibold hover:underline"
                            onClick={() => setIsAddMfrOpen(true)}
                        >
                            + Add
                        </button>
                    </div>
                    {linkedManufacturers.length > 0 ? (
                        linkedManufacturers.map((mfr, index) => (
                            <div key={index} className="p-3 border border-gray-200 rounded-xl flex justify-between items-center hover:border-primary-200 transition-colors mb-2 last:mb-0">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900">{mfr.name}</span>
                                    <span className="text-xs text-gray-500">Region: {mfr.region} • Lead Time: {mfr.leadTime}</span>
                                </div>
                                <Button isSmall isSecondary>View</Button>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2">
                            <span>⚠ No manufacturers linked. This product cannot be produced.</span>
                        </div>
                    )}
                </div>

                {/* Packaging */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Packaging Options</div>
                        <button
                            className="text-primary-500 text-sm font-semibold hover:underline"
                            onClick={() => setIsAddPkgOpen(true)}
                        >
                            + Add
                        </button>
                    </div>
                    {packagingList.map((pkg, index) => (
                        <div key={index} className="p-3 border border-gray-200 rounded-xl flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">{pkg.name}</span>
                                <span className="text-xs text-gray-500">{pkg.type} • {pkg.cost}</span>
                            </div>
                            {pkg.eco && (
                                <div className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded">ECO</div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Labels */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Labels</div>
                        <button
                            className="text-primary-500 text-sm font-semibold hover:underline"
                            onClick={() => setIsAddLabelOpen(true)}
                        >
                            + Add
                        </button>
                    </div>
                    {labelsList.map((label, index) => (
                        <div key={index} className="p-3 border border-gray-200 rounded-xl flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">{label.name}</span>
                                <span className="text-xs text-gray-500">Region: {label.region} • {label.finish} Finish</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI Action */}
                <div className="pt-4 border-t border-gray-100">
                    <Button
                        className="w-full bg-primary-50 text-primary-600 hover:bg-primary-100 border-primary-200"
                        onClick={() => setIsAskZeekOpen(true)}
                    >
                        Ask Zeek about this product
                    </Button>
                </div>

            </div>

            <AddManufacturerModal
                open={isAddMfrOpen}
                onClose={() => setIsAddMfrOpen(false)}
                onAdd={handleAddManufacturer}
            />
            <AddPackagingModal
                open={isAddPkgOpen}
                onClose={() => setIsAddPkgOpen(false)}
                onAdd={handleAddPackaging}
            />
            <AddLabelModal
                open={isAddLabelOpen}
                onClose={() => setIsAddLabelOpen(false)}
                onAdd={handleAddLabel}
            />
            <AskZeekModal
                open={isAskZeekOpen}
                onClose={() => setIsAskZeekOpen(false)}
                productName={product.name}
            />
        </Modal>
    );
};

export default ProductDetailModal;
