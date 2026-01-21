import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import { pricingTrendsData, aiAnalyticsData } from "../mocks";

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

const PricingAndAIAnalytics = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Section title="Cost Trends Over Time">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={pricingTrendsData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(val) => `$${val}`} />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Section>

            <Section title="AI Query Volume">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={aiAnalyticsData.queryVolume}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="queries" stroke="#ec4899" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </Section>
        </div>
    );
};

export default PricingAndAIAnalytics;
