import { ActivityLog } from "../mocks";
import Icon from "@/components/Icon";

type Props = {
    logs: ActivityLog[];
};

const ActivityAudit = ({ logs }: Props) => {
    return (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-h6 font-bold text-gray-900">Activity & Audit Summary</h3>
                <button className="flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-600">
                    <Icon name="download" className="size-4 fill-primary-500" />
                    Export Log
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            <th className="pb-3 pl-2">Timestamp</th>
                            <th className="pb-3">Action</th>
                            <th className="pb-3">Module</th>
                            <th className="pb-3 pr-2 text-right">IP Address</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 pl-2 text-sm text-gray-500 font-mono whitespace-nowrap">{log.timestamp}</td>
                                <td className="py-3 text-sm font-medium text-gray-900">{log.action}</td>
                                <td className="py-3 text-sm">
                                    <span className="inline-flex px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-bold uppercase">
                                        {log.module}
                                    </span>
                                </td>
                                <td className="py-3 pr-2 text-sm text-gray-400 font-mono text-right">{log.ipAddress}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pt-2 text-center">
                <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">View All Activity</button>
            </div>
        </div>
    );
};

export default ActivityAudit;
