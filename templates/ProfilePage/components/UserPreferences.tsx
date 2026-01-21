import { useState } from "react";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { UserProfile } from "../mocks";

type Props = {
    preferences: UserProfile['preferences'];
    onSave: (prefs: Partial<UserProfile['preferences']>) => void;
};

const themes = [
    { id: "Light", name: "Light" },
    { id: "Dark", name: "Dark" },
    { id: "System", name: "System Default" },
];

const languages = [
    { id: "English (US)", name: "English (US)" },
    { id: "English (UK)", name: "English (UK)" },
    { id: "Spanish", name: "Spanish" },
    { id: "French", name: "French" },
];

const UserPreferences = ({ preferences, onSave }: Props) => {
    const [theme, setTheme] = useState(preferences.theme);
    const [language, setLanguage] = useState(preferences.language);
    const [emailNotif, setEmailNotif] = useState(preferences.notifications.email);
    const [dashNotif, setDashNotif] = useState(preferences.notifications.dashboard);

    const handleSave = () => {
        onSave({
            theme,
            language,
            notifications: {
                email: emailNotif,
                dashboard: dashNotif
            }
        });
    };

    return (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-6">
            <h3 className="text-h6 font-bold text-gray-900 border-b border-gray-100 pb-4">Preferences</h3>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">Interface</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label="Theme"
                            options={themes}
                            value={themes.find(t => t.id === theme) || themes[0]}
                            onChange={(opt) => setTheme(opt.id as any)}
                        />
                        <Select
                            label="Language"
                            options={languages}
                            value={languages.find(l => l.id === language) || languages[0]}
                            onChange={(opt) => setLanguage(opt.id)}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">Notifications</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                            <span className="text-sm font-bold text-gray-700">Email Notifications</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={emailNotif}
                                    onChange={(e) => setEmailNotif(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                            <span className="text-sm font-bold text-gray-700">Dashboard Alerts</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={dashNotif}
                                    onChange={(e) => setDashNotif(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <Button isPrimary onClick={handleSave}>Save Preferences</Button>
            </div>
        </div>
    );
};

export default UserPreferences;
