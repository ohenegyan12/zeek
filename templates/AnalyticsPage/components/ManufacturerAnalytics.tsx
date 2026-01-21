import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { manufacturerAnalyticsData } from "../mocks";

type SectionProps = {
    title: string;
    children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
    <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col h-full">
        <h3 className="text-body-lg font-bold mb-6">{title}</h3>
        <div className="grow w-full min-h-[300px]">{children}</div>
    </div>
);

const ManufacturerAnalytics = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Section title="Manufacturers by Region">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={manufacturerAnalyticsData.byRegion}
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </Section>

            <Section title="Top Manufacturers by Reliability">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={manufacturerAnalyticsData.topReliability}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Section>

            <Section title="Manufacturers with Longest Lead Times">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart layout="vertical" data={manufacturerAnalyticsData.longestLeadTime}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="days" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </Section>

            <Section title="Flagged Compliance Risks">
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[300px] pr-2">
                    {manufacturerAnalyticsData.flaggedRisks.map((item, i) => (
                        <div key={i} className="flex flex-col gap-1 p-3 bg-red-50 rounded-lg border border-red-100">
                            <div className="text-sm font-bold text-gray-900">{item.name}</div>
                            <div className="text-xs text-red-600">{item.reason}</div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default ManufacturerAnalytics;
