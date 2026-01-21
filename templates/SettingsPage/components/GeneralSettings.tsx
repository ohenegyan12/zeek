import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { SettingsData } from "../mocks";
import { SelectOption } from "@/types/select";

type Props = {
    data: SettingsData["general"];
    onSave: (data: SettingsData["general"]) => void;
};

const environments = [
    { id: "Production", name: "Production" },
    { id: "Staging", name: "Staging" },
];

const GeneralSettings = ({ data, onSave }: Props) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (key: keyof SettingsData["general"], value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl">
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-4">
                <h3 className="text-h6 font-bold text-gray-900 border-b border-gray-100 pb-4">System Identity</h3>
                <Field
                    label="System Name"
                    value={formData.systemName}
                    onChange={(e) => handleChange("systemName", e.target.value)}
                />
                <Select
                    label="Environment"
                    options={environments}
                    value={environments.find(e => e.id === formData.environment) || environments[0]}
                    onChange={(opt) => handleChange("environment", opt.id)}
                />
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-4">
                <h3 className="text-h6 font-bold text-gray-900 border-b border-gray-100 pb-4">Localization</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Field
                        label="Default Region"
                        value={formData.defaultRegion}
                        onChange={(e) => handleChange("defaultRegion", e.target.value)}
                    />
                    <Field
                        label="Default Currency"
                        value={formData.defaultCurrency}
                        onChange={(e) => handleChange("defaultCurrency", e.target.value)}
                    />
                    <Field
                        label="Timezone"
                        value={formData.timezone}
                        onChange={(e) => handleChange("timezone", e.target.value)}
                    />
                    <Field
                        label="Date Format"
                        value={formData.dateFormat}
                        onChange={(e) => handleChange("dateFormat", e.target.value)}
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-2">
                <Button isPrimary onClick={() => onSave(formData)}>Save Changes</Button>
                <Button isSecondary onClick={() => setFormData(data)}>Reset</Button>
            </div>
        </div>
    );
};

export default GeneralSettings;
