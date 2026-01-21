import { Rule } from "../mocks";
import Icon from "@/components/Icon";

type Props = {
    rules: Rule[];
};

const RulesOverview = ({ rules }: Props) => {
    const activeRules = rules.filter(r => r.status === 'Active').length;
    const disabledRules = rules.filter(r => r.status === 'Disabled').length;
    const complianceRules = rules.filter(r => r.type === 'Compliance').length;
    const dataRules = rules.filter(r => r.type === 'Data Access').length;

    const cards = [
        { label: "Total Active Rules", value: activeRules, icon: "check", color: "bg-green-50 text-green-600" },
        { label: "Disabled Rules", value: disabledRules, icon: "close", color: "bg-gray-100 text-gray-500" },
        { label: "Compliance Rules", value: complianceRules, icon: "lock", color: "bg-blue-50 text-blue-600" },
        { label: "Data Exposure Rules", value: dataRules, icon: "eye", color: "bg-purple-50 text-purple-600" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex flex-col gap-1">
                        <span className="text-body-sm text-gray-500 font-medium">{card.label}</span>
                        <span className="text-h4 font-bold text-gray-900">{card.value}</span>
                    </div>
                    <div className={`p-2 rounded-lg ${card.color}`}>
                        <Icon name={card.icon as any} className="size-6" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RulesOverview;
