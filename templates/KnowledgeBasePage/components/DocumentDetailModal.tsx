import { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { Document } from "../mocks";
import Icon from "@/components/Icon";
import UploadDocumentModal from "./UploadDocumentModal";

type Props = {
    document: Document | null;
    open: boolean;
    onClose: () => void;
};

const DocumentDetailModal = ({ document, open, onClose }: Props) => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    if (!document) return null;

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                title={document.title}
                isSlidePanel
            >
                <div className="flex flex-col gap-6 p-1">
                    {/* Header Info */}
                    <div className="flex items-start justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold uppercase text-gray-400">Status</span>
                            <span className={`text-sm font-bold ${document.status === 'Active' ? 'text-green-600' :
                                document.status === 'expired' ? 'text-red-600' : 'text-orange-600'
                                }`}>
                                {document.status}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 text-right">
                            <span className="text-xs font-bold uppercase text-gray-400">Version</span>
                            <span className="text-sm font-bold text-gray-900">v{document.version}</span>
                        </div>
                        <div className="flex flex-col gap-1 text-right">
                            <span className="text-xs font-bold uppercase text-gray-400">Last Updated</span>
                            <span className="text-sm font-bold text-gray-900">{document.lastUpdated}</span>
                        </div>
                    </div>

                    {/* AI Usage */}
                    <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Icon name="message" className="size-5 fill-blue-600" />
                            <h4 className="text-sm font-bold text-blue-900">AI Knowledge Status</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col">
                                <span className="text-gray-500">Accessible to AI?</span>
                                <span className="font-medium text-gray-900">{document.visibility === 'AI-Readable' ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Last Referenced</span>
                                <span className="font-medium text-gray-900">{document.aiUsage.lastReferenced || 'Never'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Priority Level</span>
                                <span className="font-medium text-gray-900">{document.aiUsage.priority}</span>
                            </div>
                        </div>
                    </div>

                    {/* Metadata Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Document Title" value={document.title} readOnly />
                        <Field label="Type" value={document.type} readOnly />
                        <Field label="Linked Entity Type" value={document.linkedEntity.type} readOnly />
                        <Field label="Linked Entity Name" value={document.linkedEntity.name} readOnly />
                        <Field label="Review Date" value={document.reviewDate} readOnly />
                        <Field label="Uploaded By" value={document.updatedBy} readOnly />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 mt-4">
                        <Button isPrimary className="w-full">Download Document</Button>
                        <Button isSecondary className="w-full" onClick={() => setIsUploadOpen(true)}>Upload New Version</Button>
                        <Button isSecondary className="w-full text-red-500 border-red-200 hover:bg-red-50">Archive Document</Button>
                    </div>
                </div>
            </Modal>
            <UploadDocumentModal
                open={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                title={document.title}
                isNewVersion
            />
        </>
    );
};

export default DocumentDetailModal;
