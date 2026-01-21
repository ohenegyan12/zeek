import { RuleLog } from "../mocks";

type Props = {
    logs: RuleLog[];
};

const TriggerLogsTable = ({ logs }: Props) => {

    const getOutcomeColor = (outcome: string) => {
        switch (outcome) {
            case 'Blocked': return 'text-red-600 bg-red-50';
            case 'Modified': return 'text-orange-600 bg-orange-50';
            case 'Allowed': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-4">Timestamp</th>
                        <th className="px-6 py-4">Rule Triggered</th>
                        <th className="px-6 py-4">Query Ref</th>
                        <th className="px-6 py-4">Entity Involved</th>
                        <th className="px-6 py-4">Outcome</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-500 font-mono">{log.timestamp}</td>
                            <td className="px-6 py-4 font-bold text-gray-900">{log.ruleName}</td>
                            <td className="px-6 py-4 text-sm text-blue-600 font-medium">{log.queryRef}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{log.entity}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getOutcomeColor(log.outcome)}`}>
                                    {log.outcome}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TriggerLogsTable;
