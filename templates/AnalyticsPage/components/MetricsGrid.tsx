import { mockMetrics } from "../mocks";
import Icon from "@/components/Icon";

const MetricsGrid = () => {
    const metrics = [
        { label: "Total Products", value: mockMetrics.totalProducts.toLocaleString(), icon: "box", color: "bg-blue-50 text-blue-600" },
        { label: "Manufacturers", value: mockMetrics.totalManufacturers, icon: "home", color: "bg-purple-50 text-purple-600" },
        { label: "Avg Product Cost", value: `$${mockMetrics.avgProductCost}`, icon: "wallet", color: "bg-green-50 text-green-600" },
        { label: "Avg Lead Time", value: `${mockMetrics.avgLeadTime} days`, icon: "calendar", color: "bg-orange-50 text-orange-600" },
        { label: "Total AI Queries", value: mockMetrics.totalAIQueries.toLocaleString(), icon: "message", color: "bg-pink-50 text-pink-600" },
        { label: "Flagged AI Responses", value: mockMetrics.flaggedAIResponses, icon: "info", color: "bg-red-50 text-red-600" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {metrics.map((m, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col gap-2 transition-shadow hover:shadow-md cursor-default">
                    <div className="flex items-center justify-between">
                        <span className="text-body-sm text-gray-500 font-medium">{m.label}</span>
                        <div className={`p-1.5 rounded-lg ${m.color}`}>
                            {/* @ts-ignore - Assuming Icon handles generic strings gracefully or we map specific valid names */}
                            <Icon name={m.icon as any} className="size-4" />
                        </div>
                    </div>
                    <div className="text-h6 font-bold text-gray-900">{m.value}</div>
                </div>
            ))}
        </div>
    );
};

export default MetricsGrid;
