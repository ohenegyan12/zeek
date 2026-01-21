import { useState } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { UserProfile } from "../mocks";

type Props = {
    profile: UserProfile;
    onSave: (data: Partial<UserProfile>) => void;
};

const AccountInfo = ({ profile, onSave }: Props) => {
    const [displayName, setDisplayName] = useState(profile.displayName);
    const [isEditing, setIsEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleSave = () => {
        onSave({
            displayName,
            ...(avatarPreview ? { avatarUrl: avatarPreview } : {})
        });
        setIsEditing(false);
        setAvatarPreview(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                setIsEditing(true); // Auto-enable editing when file is selected
            };
            reader.readAsDataURL(file);
        }
    };

    const currentAvatar = avatarPreview || profile.avatarUrl;

    return (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-6">
            <h3 className="text-h6 font-bold text-gray-900 border-b border-gray-100 pb-4">Account Information</h3>

            <div className="flex items-start gap-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-3">
                    <div className="size-24 rounded-full bg-primary-100 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden relative group">
                        {currentAvatar && currentAvatar !== '/images/avatar-1.jpg' ? (
                            <img src={currentAvatar} alt="Profile" className="size-full object-cover" />
                        ) : profile.avatarUrl && profile.avatarUrl !== '/images/avatar-1.jpg' ? (
                            <img src={profile.avatarUrl} alt="Profile" className="size-full object-cover" />
                        ) : (
                            <div className="size-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <Icon name="user" className="size-10 fill-current" />
                            </div>
                        )}
                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Icon name="upload" className="size-6 fill-white" />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <label className="cursor-pointer">
                        <span className="btn btn-secondary btn-small inline-flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 bg-white shadow-sm hover:bg-gray-50">
                            Change Avatar
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Full Name" value={profile.fullName} readOnly />
                    <Field label="Email Address" value={profile.email} readOnly />
                    <Field
                        label="Display Name"
                        value={isEditing ? displayName : profile.displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        readOnly={!isEditing}
                        classInput={isEditing ? "bg-white" : "bg-gray-50 text-gray-500"}
                    />
                    <Field label="Role" value={profile.role} readOnly />
                    <Field label="Account Status" value={profile.status} readOnly classInput="text-green-600 font-bold" />
                    <Field label="Member Since" value={profile.createdDate} readOnly />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
                {isEditing ? (
                    <div className="flex gap-2">
                        <Button isSecondary onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button isPrimary onClick={handleSave}>Save Changes</Button>
                    </div>
                ) : (
                    <Button isSecondary onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
            </div>
        </div>
    );
};

export default AccountInfo;
