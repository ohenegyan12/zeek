import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { SettingsData } from "../mocks";

type Props = {
    data: SettingsData["aiConfig"];
    onSave: (data: SettingsData["aiConfig"]) => void;
};

const responseModes = [
    { id: "Conservative", name: "Conservative (Strict)" },
    { id: "Balanced", name: "Balanced (Recommended)" },
    { id: "Exploratory", name: "Exploratory (Creative)" },
];

const AIConfigSettings = ({ data, onSave }: Props) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (key: keyof SettingsData["aiConfig"], value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl">
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-6">
                <h3 className="text-h6 font-bold text-gray-900 border-b border-gray-100 pb-4">Core Processing</h3>

                <Select
                    label="AI Response Mode"
                    options={responseModes}
                    value={responseModes.find(m => m.id === formData.responseMode) || responseModes[1]}
                    onChange={(opt) => handleChange("responseMode", opt.id)}
                />

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Confidence Threshold</label>
                        <span className="text-sm font-bold text-primary-600">{formData.confidenceThreshold}%</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="100"
                        value={formData.confidenceThreshold}
                        onChange={(e) => handleChange("confidenceThreshold", parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Reasoning Depth (Steps)</label>
                        <span className="text-sm font-bold text-primary-600">{formData.reasoningDepth}</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.reasoningDepth}
                        onChange={(e) => handleChange("reasoningDepth", parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                </div>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-4">
                <h3 className="text-h6 font-bold text-gray-900 border-b border-gray-100 pb-4">Knowledge & Caching</h3>

                <Field
                    label="Knowledge Priority Order (Comma separated)"
                    value={formData.knowledgePriority.join(", ")}
                    onChange={(e) => handleChange("knowledgePriority", e.target.value.split(",").map(s => s.trim()))}
                />

                <Field
                    label="Cache Duration (Hours)"
                    type="number"
                    value={formData.cacheDuration.toString()}
                    onChange={(e) => handleChange("cacheDuration", parseInt(e.target.value))}
                />

                <div className="flex items-center gap-3 mt-2">
                    <Checkbox
                        checked={formData.enableFallback}
                        onChange={(v) => handleChange("enableFallback", v)}
                    />
                    <span className="text-sm font-medium text-gray-700">Enable Fallback Logic</span>
                </div>
            </div>

            <div className="flex gap-3 mt-2">
                <Button isPrimary onClick={() => onSave(formData)}>Save Changes</Button>
                <Button isSecondary onClick={() => setFormData(data)}>Reset</Button>
            </div>
        </div>
    );
};

export default AIConfigSettings;
