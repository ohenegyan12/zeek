import Button from "@/components/Button";
import { UserProfile } from "../mocks";

type Props = {
    security: UserProfile['security'];
    onChangePassword: () => void;
};

const SecuritySettings = ({ security, onChangePassword }: Props) => {
    return (
        <div className="flex flex-col gap-6">
            {/* Login & Security */}
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-6">
                <h3 className="text-h6 font-bold text-gray-900 border-b border-gray-100 pb-4">Login & Security</h3>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-900">Password</span>
                            <span className="text-sm text-gray-500">Last changed 3 months ago</span>
                        </div>
                        <Button isSecondary onClick={onChangePassword}>Change Password</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
