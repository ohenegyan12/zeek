import { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Icon from "@/components/Icon";
import UploadImage from "@/components/UploadImage";

type Props = {
    open: boolean;
    onClose: () => void;
    title?: string;
    isNewVersion?: boolean;
};

const UploadDocumentModal = ({ open, onClose, title, isNewVersion }: Props) => {
    const [fileName, setFileName] = useState("");
    const [docType, setDocType] = useState<any>(null);
    const [entityType, setEntityType] = useState<any>(null);

    const handleUpload = () => {
        // Logic to "Upload"
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={isNewVersion ? `Upload New Version: ${title}` : "Upload New Document"}
            classWrapper="max-w-xl"
        >
            <div className="flex flex-col gap-6">
                {!isNewVersion && (
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Document Title" placeholder="e.g. Q4 Logistics Report" />
                        <Select
                            label="Document Type"
                            value={docType}
                            onChange={(val) => setDocType(val)}
                            options={[
                                { id: "Report", name: "Report" },
                                { id: "Policy", name: "Policy" },
                                { id: "SOP", name: "SOP" },
                                { id: "Catalogue", name: "Catalogue" },
                            ]}
                            placeholder="Select type"
                        />
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase text-gray-500">Document File</span>
                    <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 bg-gray-25 transition-colors hover:bg-gray-50 cursor-pointer">
                        <div className="size-12 rounded-full bg-primary-50 flex items-center justify-center">
                            <Icon name="upload" className="size-6 fill-primary-500" />
                        </div>
                        <div className="flex flex-col items-center gap-1 text-center">
                            <span className="text-sm font-bold text-gray-900">Click to upload or drag and drop</span>
                            <span className="text-xs text-gray-500">PDF, DOCX, or XLSX (max. 10MB)</span>
                        </div>
                    </div>
                </div>

                {!isNewVersion && (
                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            label="Link to Entity"
                            value={entityType}
                            onChange={(val) => setEntityType(val)}
                            options={[
                                { id: "Product", name: "Product" },
                                { id: "Manufacturer", name: "Manufacturer" },
                                { id: "Logistics", name: "Logistics" },
                                { id: "General", name: "General" },
                            ]}
                            placeholder="Select entity"
                        />
                        <Field label="Entity Name" placeholder="e.g. Organic Honey" />
                    </div>
                )}

                {isNewVersion && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-4">
                        <Icon name="info-circle" className="shrink-0 size-5 fill-blue-500 mt-1" />
                        <div className="text-sm text-blue-900 leading-relaxed">
                            <span className="font-bold">Info:</span> This will increment the version number to <b>v{title ? '2.0' : 'x.x'}</b>. The previous version will be archived but accessible.
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button isSecondary onClick={onClose}>Cancel</Button>
                    <Button isPrimary onClick={handleUpload}>
                        {isNewVersion ? "Upload Version" : "Upload Document"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default UploadDocumentModal;
