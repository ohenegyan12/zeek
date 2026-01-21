import Button from "@/components/Button";
import Field from "@/components/Field";
import { useState } from "react";

type Props = {
    onClose: () => void;
    onSave: (password: string) => void;
};

const ChangePasswordModal = ({ onClose, onSave }: Props) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        onSave(newPassword);
        onClose();
    };

    return (
        <div className="flex flex-col gap-6 p-1">
            <h3 className="text-h5 font-bold text-gray-900 border-b border-gray-100 pb-4">Change Password</h3>

            <div className="flex flex-col gap-4">
                <Field
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Field
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Field
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className="flex justify-end gap-2 mt-2 pt-4 border-t border-gray-100">
                <Button isSecondary onClick={onClose}>Cancel</Button>
                <Button isPrimary onClick={handleSave}>Update Password</Button>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
