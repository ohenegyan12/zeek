import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { SettingsData } from "../mocks";

type Props = {
    data: SettingsData["clareConfig"];
    onSave: (data: SettingsData["clareConfig"]) => void;
};

const tones = [
    { id: "Professional", name: "Professional" },
    { id: "Friendly", name: "Friendly" },
    { id: "Technical", name: "Technical" },
];

const lengths = [
    { id: "Short", name: "Short" },
    { id: "Medium", name: "Medium" },
    { id: "Detailed", name: "Detailed" },
];

const disclosures = [
    { id: "High-level only", name: "High-level only" },
    { id: "Partial details", name: "Partial details" },
    { id: "Full", name: "Full" },
];

const ClareConfigSettings = ({ data, onSave }: Props) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (key: keyof SettingsData["clareConfig"], value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl">
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-6">
                <h3 className="text-h6 font-bold text-gray-900 border-b border-gray-100 pb-4">Response Style</h3>

                <div className="grid grid-cols-3 gap-4">
                    <Select
                        label="Tone"
                        options={tones}
                        value={tones.find(t => t.id === formData.tone) || tones[0]}
                        onChange={(opt) => handleChange("tone", opt.id)}
                    />
                    <Select
                        label="Length"
                        options={lengths}
                        value={lengths.find(l => l.id === formData.responseLength) || lengths[1]}
                        onChange={(opt) => handleChange("responseLength", opt.id)}
                    />
                    <Select
                        label="Disclosure"
                        options={disclosures}
                        value={disclosures.find(d => d.id === formData.disclosureLevel) || disclosures[1]}
                        onChange={(opt) => handleChange("disclosureLevel", opt.id)}
                    />
                </div>

                <Field
                    label="Default Fallback Message"
                    value={formData.defaultFallback}
                    onChange={(e) => handleChange("defaultFallback", e.target.value)}
                    textarea
                    classInput="!h-24"
                />
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-4">
                <h3 className="text-h6 font-bold text-gray-900 border-b border-gray-100 pb-4">Language & Filtering</h3>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={formData.languageSupport}
                            onChange={(v) => handleChange("languageSupport", v)}
                        />
                        <span className="text-sm font-medium text-gray-700">Multi-language Support</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={formData.regionFiltering}
                            onChange={(v) => handleChange("regionFiltering", v)}
                        />
                        <span className="text-sm font-medium text-gray-700">Region-based Response Filtering</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-2">
                <Button isPrimary onClick={() => onSave(formData)}>Save Changes</Button>
                <Button isSecondary onClick={() => setFormData(data)}>Reset</Button>
            </div>
        </div>
    );
};

export default ClareConfigSettings;
