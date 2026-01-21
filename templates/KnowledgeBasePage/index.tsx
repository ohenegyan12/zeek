"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import KBFilters from "./components/KBFilters";
import KBTable from "./components/KBTable";
import DocumentDetailModal from "./components/DocumentDetailModal";
import UploadDocumentModal from "./components/UploadDocumentModal";
import { mockDocuments, Document } from "./mocks";

const KnowledgeBasePage = () => {
    const [documents, setDocuments] = useState<Document[]>(mockDocuments);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const handleFilter = (filters: any) => {
        console.log("Filtering:", filters);
        // Implement filtering logic here or fetch from API
    };

    const handleView = (doc: Document) => {
        setSelectedDoc(doc);
        setIsDetailOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this document?")) {
            setDocuments(documents.filter(d => d.id !== id));
        }
    };

    return (
        <Layout title="Knowledge Base">
            <div className="flex flex-col gap-8 pb-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-h4">Knowledge Base</h1>
                        <p className="text-gray-500">Manage documents and references used by Zeek AI</p>
                    </div>
                    <Button isPrimary onClick={() => setIsUploadOpen(true)}>
                        <Icon name="document" className="size-5 fill-white mr-2" />
                        Upload Document
                    </Button>
                </div>

                {/* Filters */}
                <KBFilters onFilter={handleFilter} />

                {/* Table */}
                <KBTable
                    documents={documents}
                    onView={handleView}
                    onDelete={handleDelete}
                />

                {/* Detail Modal */}
                <DocumentDetailModal
                    document={selectedDoc}
                    open={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                />

                {/* Upload Modal */}
                <UploadDocumentModal
                    open={isUploadOpen}
                    onClose={() => setIsUploadOpen(false)}
                />

            </div>
        </Layout>
    );
};

export default KnowledgeBasePage;
