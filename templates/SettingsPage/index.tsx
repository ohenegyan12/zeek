"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { mockSettings, SettingsData } from "./mocks";
import GeneralSettings from "./components/GeneralSettings";
import AIConfigSettings from "./components/AIConfigSettings";
import ClareConfigSettings from "./components/ClareConfigSettings";

const SettingsPage = () => {
    const [settings, setSettings] = useState<SettingsData>(mockSettings);
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "General" },
        { id: "ai", label: "AI Configuration" },
        { id: "clare", label: "Clare Response" },
        // Add other tabs later as needed
    ];

    const handleSave = (section: keyof SettingsData, data: any) => {
        setSettings({ ...settings, [section]: data });
        alert("Settings saved!");
    };

    return (
        <Layout title="Settings">
            <div className="flex flex-col gap-8 pb-10">

                <div className="flex flex-col gap-1">
                    <h1 className="text-h4">Settings</h1>
                    <p className="text-gray-500">Manage system preferences and AI configurations</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Sidebar Nav */}
                    <div className="w-full lg:w-64 flex flex-col gap-1 shrink-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === tab.id
                                        ? "bg-primary-50 text-primary-600"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 w-full">
                        {activeTab === "general" && (
                            <GeneralSettings
                                data={settings.general}
                                onSave={(d) => handleSave("general", d)}
                            />
                        )}
                        {activeTab === "ai" && (
                            <AIConfigSettings
                                data={settings.aiConfig}
                                onSave={(d) => handleSave("aiConfig", d)}
                            />
                        )}
                        {activeTab === "clare" && (
                            <ClareConfigSettings
                                data={settings.clareConfig}
                                onSave={(d) => handleSave("clareConfig", d)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
