import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { Rule } from "../mocks";
import { useState, useEffect } from "react";
import { SelectOption } from "@/types/select";

type Props = {
    rule: Rule | null;
    open: boolean;
    onClose: () => void;
    onSave: (rule: Partial<Rule>) => void;
};

// ... options definitions same as Filters but needed for form ...
const ruleTypes = [
    { id: "Compliance", name: "Compliance" },
    { id: "Pricing", name: "Pricing" },
    { id: "Data Access", name: "Data Access" },
    { id: "Safety", name: "Safety" },
    { id: "Brand", name: "Brand" },
];

const scopes = [
    { id: "Global", name: "Global" },
    { id: "Product", name: "Product" },
    { id: "Manufacturer", name: "Manufacturer" },
    { id: "Region", name: "Region" },
];

const priorities = [
    { id: "High", name: "High" },
    { id: "Medium", name: "Medium" },
    { id: "Low", name: "Low" },
];

const RuleEditorModal = ({ rule, open, onClose, onSave }: Props) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState<SelectOption>(ruleTypes[0]);
    const [scope, setScope] = useState<SelectOption>(scopes[0]);
    const [priority, setPriority] = useState<SelectOption>(priorities[1]);
    const [condition, setCondition] = useState("");
    const [fallback, setFallback] = useState("");

    useEffect(() => {
        if (rule) {
            setName(rule.name);
            setDesc(rule.description);
            setType(ruleTypes.find(t => t.id === rule.type) || ruleTypes[0]);
            setScope(scopes.find(s => s.id === rule.scope) || scopes[0]);
            setPriority(priorities.find(p => p.id === rule.priority) || priorities[1]);
            setCondition(rule.conditions);
            setFallback(rule.fallback);
        } else {
            // Reset for new rule
            setName("");
            setDesc("");
            setType(ruleTypes[0]);
            setScope(scopes[0]);
            setPriority(priorities[1]);
            setCondition("");
            setFallback("");
        }
    }, [rule, open]);

    const handleSave = () => {
        onSave({
            ...(rule ? { id: rule.id } : {}),
            name,
            description: desc,
            type: type.id as any,
            scope: scope.id as any,
            priority: priority.id as any,
            conditions: condition,
            fallback,
            status: rule ? rule.status : 'Active'
        });
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={rule ? "Edit Rule" : "Create New Rule"}
        >
            <div className="flex flex-col gap-4 p-1 h-[70vh] overflow-y-auto pr-2">
                <Field
                    label="Rule Name"
                    placeholder="e.g. ISO Certification Requirement"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Field
                    label="Description"
                    placeholder="Describe what this rule does in plain English"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    textarea
                    classInput="!h-20 min-h-[5rem]"
                />

                <div className="grid grid-cols-3 gap-3">
                    <Select
                        label="Rule Type"
                        options={ruleTypes}
                        value={type}
                        onChange={setType}
                    />
                    <Select
                        label="Scope"
                        options={scopes}
                        value={scope}
                        onChange={setScope}
                    />
                    <Select
                        label="Priority"
                        options={priorities}
                        value={priority}
                        onChange={setPriority}
                    />
                </div>

                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Logic Configuration</h4>
                    <Field
                        label="Condition (IF)"
                        placeholder="e.g. manufacturer.iso_certified == false"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        textarea
                        classInput="font-mono text-sm !h-24 min-h-[6rem]"
                    />
                    <div className="mt-3">
                        <Field
                            label="Fallback Response (THEN)"
                            placeholder="What should Clare say?"
                            value={fallback}
                            onChange={(e) => setFallback(e.target.value)}
                            textarea
                            classInput="!h-24 min-h-[6rem]"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-gray-100">
                    <Button isSecondary onClick={onClose}>Cancel</Button>
                    <Button isPrimary onClick={handleSave}>{rule ? "Update Rule" : "Create Rule"}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default RuleEditorModal;
