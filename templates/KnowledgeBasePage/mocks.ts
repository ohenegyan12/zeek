export interface Document {
    id: string;
    title: string;
    type: 'Specification' | 'Compliance' | 'Pricing' | 'Contract' | 'Internal Note';
    format: 'PDF' | 'DOCX' | 'XLSX' | 'CSV' | 'TXT';
    linkedEntity: {
        type: 'Product' | 'Manufacturer' | 'Region';
        name: string;
    };
    version: string;
    lastUpdated: string;
    updatedBy: string;
    reviewDate: string;
    status: 'Active' | 'expired' | 'Needs Review';
    visibility: 'AI-Readable' | 'Internal-Only';
    aiUsage: {
        used: boolean;
        lastReferenced: string | null;
        priority: 'High' | 'Medium' | 'Low';
    };
    size: string;
}

export const mockDocuments: Document[] = [
    {
        id: '1',
        title: 'Organic Honey Product Spec v2.pdf',
        type: 'Specification',
        format: 'PDF',
        linkedEntity: { type: 'Product', name: 'Organic Honey 500g' },
        version: '2.0',
        lastUpdated: '2024-03-15',
        updatedBy: 'Robert Johnson',
        reviewDate: '2025-03-15',
        status: 'Active',
        visibility: 'AI-Readable',
        aiUsage: { used: true, lastReferenced: '2024-03-20', priority: 'High' },
        size: '2.4 MB'
    },
    {
        id: '2',
        title: 'Green Valley Farms SLA.docx',
        type: 'Contract',
        format: 'DOCX',
        linkedEntity: { type: 'Manufacturer', name: 'Green Valley Farms' },
        version: '1.2',
        lastUpdated: '2024-01-10',
        updatedBy: 'Sarah Smith',
        reviewDate: '2024-12-31',
        status: 'Active',
        visibility: 'Internal-Only',
        aiUsage: { used: false, lastReferenced: null, priority: 'Low' },
        size: '1.1 MB'
    },
    {
        id: '3',
        title: 'EU Import Compliance 2023.pdf',
        type: 'Compliance',
        format: 'PDF',
        linkedEntity: { type: 'Region', name: 'Europe' },
        version: '1.0',
        lastUpdated: '2023-01-15',
        updatedBy: 'Robert Johnson',
        reviewDate: '2024-01-15',
        status: 'expired',
        visibility: 'AI-Readable',
        aiUsage: { used: true, lastReferenced: '2023-12-10', priority: 'High' },
        size: '5.6 MB'
    },
    {
        id: '4',
        title: 'Q1-2024 Raw Material Pricing.xlsx',
        type: 'Pricing',
        format: 'XLSX',
        linkedEntity: { type: 'Product', name: 'All Products' },
        version: '1.0',
        lastUpdated: '2024-01-02',
        updatedBy: 'Finance Team',
        reviewDate: '2024-04-01',
        status: 'Needs Review',
        visibility: 'Internal-Only',
        aiUsage: { used: false, lastReferenced: null, priority: 'Medium' },
        size: '450 KB'
    },
    {
        id: '5',
        title: 'Packaging Standards.txt',
        type: 'Internal Note',
        format: 'TXT',
        linkedEntity: { type: 'Manufacturer', name: 'All Manufacturers' },
        version: '3.1',
        lastUpdated: '2024-02-20',
        updatedBy: 'Robert Johnson',
        reviewDate: '2025-02-20',
        status: 'Active',
        visibility: 'AI-Readable',
        aiUsage: { used: true, lastReferenced: '2024-03-18', priority: 'Medium' },
        size: '15 KB'
    },
];
