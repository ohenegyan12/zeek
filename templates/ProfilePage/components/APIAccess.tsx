import { useState } from "react";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { UserProfile } from "../mocks";

type Props = {
    token: UserProfile['apiToken'];
};

const APIAccess = ({ token }: Props) => {
    const [isVisible, setIsVisible] = useState(false);

    if (!token) return null;

    return (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-h6 font-bold text-gray-900">API Access</h3>
                <span className="px-2 py-1 rounded bg-purple-50 text-purple-700 text-xs font-bold uppercase border border-purple-100">
                    Developer Access
                </span>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col gap-4">
                <div className="flex items-end gap-2">
                    <div className="flex-1">
                        <Field
                            label="Personal API Token"
                            value={isVisible ? token.key : "********************************"}
                            readOnly
                            classInput="font-mono bg-white"
                        />
                    </div>
                    <Button
                        isSecondary
                        onClick={() => setIsVisible(!isVisible)}
                        className="mb-[2px] !h-12" // Align with input
                    >
                        <Icon name={isVisible ? "lock" : "eye"} className="size-4" />
                    </Button>
                    <Button isSecondary className="mb-[2px] !h-12">Copy</Button>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Created: {token.created}</span>
                    <span>Last used: {token.lastUsed}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-bold uppercase text-gray-400">Scopes:</span>
                    {token.scope.map(scope => (
                        <span key={scope} className="px-2 py-0.5 rounded bg-gray-200 text-gray-600 text-xs font-mono">
                            {scope}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button isSecondary className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100">Revoke Token</Button>
                <Button isPrimary>Generate New Token</Button>
            </div>
        </div>
    );
};

export default APIAccess;
