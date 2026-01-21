"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import RulesOverview from "./components/RulesOverview";
import RuleFilters from "./components/RuleFilters";
import RulesTable from "./components/RulesTable";
import RuleEditorModal from "./components/RuleEditorModal";
import TriggerLogsTable from "./components/TriggerLogsTable";
import Modal from "@/components/Modal";
import DeleteRuleModal from "./components/DeleteRuleModal";
import { mockRules, mockLogs, Rule } from "./mocks";

const AIRulesPage = () => {
    const [rules, setRules] = useState<Rule[]>(mockRules);
    const [activeTab, setActiveTab] = useState<'rules' | 'logs'>('rules');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingRule, setEditingRule] = useState<Rule | null>(null);
    const [ruleToDelete, setRuleToDelete] = useState<string | null>(null);

    const handleCreate = () => {
        setEditingRule(null);
        setIsEditorOpen(true);
    };

    const handleEdit = (rule: Rule) => {
        setEditingRule(rule);
        setIsEditorOpen(true);
    };

    const handleToggleStatus = (id: string) => {
        setRules(rules.map(r =>
            r.id === id ? { ...r, status: r.status === 'Active' ? 'Disabled' : 'Active' } : r
        ));
    };

    const handleDelete = (id: string) => {
        setRuleToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (ruleToDelete) {
            setRules(rules.filter(r => r.id !== ruleToDelete));
            setIsDeleteModalOpen(false);
            setRuleToDelete(null);
        }
    };

    const handleSave = (ruleData: Partial<Rule>) => {
        if (ruleData.id) {
            // Update
            setRules(rules.map(r => r.id === ruleData.id ? { ...r, ...ruleData } as Rule : r));
        } else {
            // Create
            const newRule: Rule = {
                ...ruleData,
                id: Math.random().toString(36).substr(2, 9),
                lastTriggered: null,
                status: 'Active',
            } as Rule;
            setRules([newRule, ...rules]);
        }
    };

    const handleFilter = (filters: any) => {
        console.log("Filters:", filters);
    };

    return (
        <Layout title="Admin Rules">
            <div className="flex flex-col gap-8 pb-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-h4">Admin Rules</h1>
                        <p className="text-gray-500">Control how Zeek reasons and what Clare can say</p>
                    </div>
                    {activeTab === 'rules' && (
                        <Button isPrimary onClick={handleCreate}>
                            <Icon name="plus" className="size-5 fill-white mr-2" />
                            Create New Rule
                        </Button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-6 border-b border-gray-100">
                    <button
                        className={`pb-4 text-body-lg font-bold transition-colors border-b-2 ${activeTab === 'rules' ? 'text-primary-500 border-primary-500' : 'text-gray-500 border-transparent hover:text-gray-900'
                            }`}
                        onClick={() => setActiveTab('rules')}
                    >
                        Rules Management
                    </button>
                    <button
                        className={`pb-4 text-body-lg font-bold transition-colors border-b-2 ${activeTab === 'logs' ? 'text-primary-500 border-primary-500' : 'text-gray-500 border-transparent hover:text-gray-900'
                            }`}
                        onClick={() => setActiveTab('logs')}
                    >
                        Trigger Logs
                    </button>
                </div>

                {activeTab === 'rules' ? (
                    <>
                        <RulesOverview rules={rules} />
                        <RuleFilters onFilter={handleFilter} />
                        <RulesTable
                            rules={rules}
                            onEdit={handleEdit}
                            onToggleStatus={handleToggleStatus}
                            onDelete={handleDelete}
                        />
                    </>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3 text-blue-800">
                            <Icon name="info" className="size-5 fill-blue-600" />
                            <p className="text-sm font-medium">These logs show recent interactions where rules modified or blocked an AI response.</p>
                        </div>
                        <TriggerLogsTable logs={mockLogs} />
                    </div>
                )}

                <RuleEditorModal
                    rule={editingRule}
                    open={isEditorOpen}
                    onClose={() => setIsEditorOpen(false)}
                    onSave={handleSave}
                />

                <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                    <DeleteRuleModal
                        onClose={() => setIsDeleteModalOpen(false)}
                        onDelete={confirmDelete}
                    />
                </Modal>

            </div>
        </Layout>
    );
};

export default AIRulesPage;
