import { Rule } from "../mocks";
import Icon from "@/components/Icon";
import { useState } from "react";

type Props = {
    rules: Rule[];
    onEdit: (rule: Rule) => void;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
};

const RulesTable = ({ rules, onEdit, onToggleStatus, onDelete }: Props) => {

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'text-red-600 bg-red-50 border-red-100';
            case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-100';
            case 'Low': return 'text-gray-600 bg-gray-50 border-gray-100';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4">Rule Name</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Scope</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Priority</th>
                            <th className="px-6 py-4">Last Triggered</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rules.map((rule) => (
                            <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900">{rule.name}</span>
                                        <span className="text-xs text-gray-500 truncate max-w-[200px]">{rule.description}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{rule.type}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                        {rule.scope}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors ${rule.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                            }`}
                                        onClick={() => onToggleStatus(rule.id)}
                                    >
                                        {rule.status}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded border text-xs font-bold uppercase ${getPriorityColor(rule.priority)}`}>
                                        {rule.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {rule.lastTriggered || '-'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="p-1 hover:bg-gray-100 rounded text-gray-500"
                                            onClick={() => onEdit(rule)}
                                            title="Edit Rule"
                                        >
                                            {/* Assuming edit icon or use gear */}
                                            <Icon name="gear" className="size-4" />
                                        </button>
                                        <button
                                            className="p-1 hover:bg-red-50 rounded text-red-500"
                                            onClick={() => onDelete(rule.id)}
                                            title="Delete Rule"
                                        >
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

export default RulesTable;
