"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { mockProfile, UserProfile } from "./mocks";
import AccountInfo from "./components/AccountInfo";
import SecuritySettings from "./components/SecuritySettings";
import UserPreferences from "./components/UserPreferences";
import ChangePasswordModal from "./components/ChangePasswordModal";

const ProfilePage = () => {
    const [profile, setProfile] = useState<UserProfile>(mockProfile);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const handleUpdateProfile = (data: Partial<UserProfile>) => {
        setProfile({ ...profile, ...data });
    };

    const handleUpdatePreferences = (prefs: Partial<UserProfile['preferences']>) => {
        setProfile({
            ...profile,
            preferences: { ...profile.preferences, ...prefs }
        });
    };

    const handleChangePassword = (newPassword: string) => {
        console.log("Password updated:", newPassword);
        // In real app, call API here
    };

    return (
        <Layout title="Profile">
            <div className="flex flex-col gap-8 pb-10 max-w-5xl mx-auto w-full">

                <div className="flex flex-col gap-1">
                    <h1 className="text-h4">Profile</h1>
                    <p className="text-gray-500">Manage your account and security settings</p>
                </div>

                <div className="flex flex-col gap-8">
                    <AccountInfo
                        profile={profile}
                        onSave={handleUpdateProfile}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <SecuritySettings
                            security={profile.security}
                            onChangePassword={() => setIsPasswordModalOpen(true)}
                        />
                        <div className="flex flex-col gap-8">
                            <UserPreferences
                                preferences={profile.preferences}
                                onSave={handleUpdatePreferences}
                            />
                        </div>
                    </div>
                </div>

                <Modal open={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
                    <ChangePasswordModal
                        onClose={() => setIsPasswordModalOpen(false)}
                        onSave={handleChangePassword}
                    />
                </Modal>
            </div>
        </Layout>
    );
};

export default ProfilePage;
