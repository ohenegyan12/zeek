import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Select from "@/components/Select";
import AskZeekManufacturerModal from "../AskZeekManufacturerModal";

type Props = {
    open: boolean;
    onClose: () => void;
    manufacturer: any;
};

const ManufacturerDetailModal = ({ open, onClose, manufacturer }: Props) => {
    const [isAskZeekOpen, setIsAskZeekOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (manufacturer) {
            setFormData({
                name: manufacturer.name,
                region: manufacturer.region,
                status: manufacturer.status,
                contactEmail: `contact@${manufacturer.name.toLowerCase().replace(/\s/g, "")}.com`,
                contactPhone: "+1 (555) 123-4567",
                contactAddress: `123 Industrial Park, ${manufacturer.region}`,
                certifications: manufacturer.certifications ? manufacturer.certifications.join(", ") : ""
            });
        }
    }, [manufacturer]);

    const handleSave = () => {
        setIsEditing(false);
        // Mock save
    };

    if (!manufacturer) return null;

    return (
        <Modal
            className=""
            classWrapper=""
            title="Manufacturer Details"
            open={open}
            onClose={onClose}
            isSlidePanel
            contentFooter={
                <div className="flex gap-2">
                    <Button isMedium isSecondary>Archive</Button>
                    <Button
                        isMedium
                        isPrimary
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                        {isEditing ? "Save Changes" : "Edit Details"}
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
                                    label="Name"
                                    value={formData.name}
                                    onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Field
                                    label="Region"
                                    value={formData.region}
                                    onChange={(e: any) => setFormData({ ...formData, region: e.target.value })}
                                />
                                <div className="col-span-2">
                                    <Select
                                        label="Status"
                                        value={formData.status}
                                        onChange={(val: any) => setFormData({ ...formData, status: val })}
                                        options={[
                                            { id: "Active", name: "Active" },
                                            { id: "Inactive", name: "Inactive" },
                                            { id: "Pending", name: "Pending" }
                                        ]}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Field
                                        label="Certifications (comma separated)"
                                        value={formData.certifications}
                                        onChange={(e: any) => setFormData({ ...formData, certifications: e.target.value })}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <div className="text-h5 text-gray-900">{formData.name || manufacturer.name}</div>
                                    <div className="text-sm text-gray-500 mt-1">{formData.region || manufacturer.region}</div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${(formData.status || manufacturer.status) === "Active" ? "bg-green-100 text-green-700" :
                                        (formData.status || manufacturer.status) === "Inactive" ? "bg-gray-100 text-gray-600" : "bg-orange-100 text-orange-700"
                                    }`}>
                                    {typeof formData.status === 'object' ? (formData.status as any).name : (formData.status || manufacturer.status)}
                                </div>
                            </>
                        )}
                    </div>
                    {!isEditing && (
                        <div className="flex gap-2 flex-wrap">
                            {manufacturer.certifications.map((cert: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600">
                                    {cert}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-white">
                        <div className="text-xs text-gray-400 font-bold uppercase mb-1">Reliability Score</div>
                        <div className={`text-h4 font-bold ${manufacturer.reliability >= 90 ? "text-green-500" :
                            manufacturer.reliability >= 70 ? "text-orange-500" : "text-red-500"
                            }`}>
                            {manufacturer.reliability}%
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Based on delivery & quality</div>
                    </div>
                    <div className="p-4 border border-gray-100 rounded-xl bg-white">
                        <div className="text-xs text-gray-400 font-bold uppercase mb-1">Avg Lead Time</div>
                        <div className="text-h4 font-bold text-gray-900">{manufacturer.leadTime}</div>
                        <div className="text-xs text-gray-400 mt-1">Order to Delivery</div>
                    </div>
                </div>

                {/* Products Supported */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Products Supported</div>
                    </div>
                    {manufacturer.products > 0 ? (
                        <div className="p-3 border border-gray-200 rounded-xl flex justify-between items-center hover:border-primary-200 transition-colors cursor-pointer">
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">Organic Honey 500g</span>
                                <span className="text-xs text-gray-500">Table Source • 5,000 units/mo</span>
                            </div>
                            <Button isSmall isSecondary>View</Button>
                        </div>
                    ) : (
                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 text-sm italic">
                            No products currently linked.
                        </div>
                    )}
                </div>

                {/* Contact & Location */}
                <div className="flex flex-col gap-3">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Contact Information</div>
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50 text-sm text-gray-700 flex flex-col gap-2">
                        {isEditing ? (
                            <div className="flex flex-col gap-4">
                                <Field
                                    label="Email"
                                    value={formData.contactEmail}
                                    onChange={(e: any) => setFormData({ ...formData, contactEmail: e.target.value })}
                                />
                                <Field
                                    label="Phone"
                                    value={formData.contactPhone}
                                    onChange={(e: any) => setFormData({ ...formData, contactPhone: e.target.value })}
                                />
                                <Field
                                    label="Address"
                                    value={formData.contactAddress}
                                    onChange={(e: any) => setFormData({ ...formData, contactAddress: e.target.value })}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Email:</span>
                                    <span>{formData.contactEmail}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Phone:</span>
                                    <span>{formData.contactPhone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Address:</span>
                                    <span>{formData.contactAddress}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* AI Action */}
                <div className="pt-4 border-t border-gray-100">
                    <Button
                        className="w-full bg-primary-50 text-primary-600 hover:bg-primary-100 border-primary-200"
                        onClick={() => setIsAskZeekOpen(true)}
                    >
                        Ask Zeek about this manufacturer
                    </Button>
                </div>
            </div>

            <AskZeekManufacturerModal
                open={isAskZeekOpen}
                onClose={() => setIsAskZeekOpen(false)}
                manufacturerName={manufacturer.name}
            />
        </Modal>
    );
};

export default ManufacturerDetailModal;
