import { Document } from "../mocks";
import Icon from "@/components/Icon";
import Checkbox from "@/components/Checkbox";
import { useState } from "react";

type Props = {
    documents: Document[];
    onView: (doc: Document) => void;
    onDelete: (id: string) => void;
};

const KBTable = ({ documents, onView, onDelete }: Props) => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelected(documents.map(d => d.id));
        } else {
            setSelected([]);
        }
    };

    const handleSelectOne = (id: string, checked: boolean) => {
        if (checked) {
            setSelected([...selected, id]);
        } else {
            setSelected(selected.filter(i => i !== id));
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Needs Review': return 'bg-orange-100 text-orange-700';
            case 'expired': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4 w-12 text-center">
                                <Checkbox
                                    checked={selected.length === documents.length && documents.length > 0}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="px-6 py-4">Document Title</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Linked Entity</th>
                            <th className="px-6 py-4">Version</th>
                            <th className="px-6 py-4">Last Updated</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Visibility</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-center">
                                    <Checkbox
                                        checked={selected.includes(doc.id)}
                                        onChange={(checked) => handleSelectOne(doc.id, checked)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <Icon name="document" className="size-5 fill-gray-500" />
                                        </div>
                                        <div>
                                            <div
                                                className="font-semibold text-gray-900 cursor-pointer hover:text-primary-600"
                                                onClick={() => onView(doc)}
                                            >
                                                {doc.title}
                                            </div>
                                            <div className="text-xs text-gray-500">{doc.format} • {doc.size}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{doc.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <span className="font-medium">{doc.linkedEntity.name}</span>
                                    <div className="text-xs text-gray-500">{doc.linkedEntity.type}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">v{doc.version}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <div>{doc.lastUpdated}</div>
                                    <div className="text-xs text-gray-400">by {doc.updatedBy}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(doc.status)}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            name={doc.visibility === 'AI-Readable' ? 'eye' : 'lock'}
                                            className={`size-4 ${doc.visibility === 'AI-Readable' ? 'fill-blue-500' : 'fill-gray-400'}`}
                                        />
                                        <span className="text-sm text-gray-700">{doc.visibility === 'AI-Readable' ? 'AI Read' : 'Internal'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="p-1 hover:bg-gray-100 rounded text-gray-500"
                                            onClick={() => onView(doc)}
                                            title="View Details"
                                        >
                                            <Icon name="eye" className="size-4" />
                                        </button>
                                        <button
                                            className="p-1 hover:bg-red-50 rounded text-red-500"
                                            onClick={() => onDelete(doc.id)}
                                            title="Delete"
                                        >
                                            {/* Assuming trash icon exists or use close */}
                                            <Icon name="close" className="size-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KBTable;
