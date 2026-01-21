import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { productAnalyticsData } from "../mocks";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

const ProductAnalytics = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Section title="Most Queried Products">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={productAnalyticsData.mostQueried}
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="queries" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </Section>

            <Section title="Cost Distribution">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={productAnalyticsData.costDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {productAnalyticsData.costDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </Section>

            <Section title="Products with Highest Cost">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productAnalyticsData.highestCost}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
                        <YAxis tickFormatter={(val) => `$${val}`} />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Bar dataKey="cost" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Section>

            <Section title="Missing Supply Chain Data">
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[300px] pr-2">
                    {productAnalyticsData.fullMissingData.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm font-medium">
                            <span className="shrink-0 size-2 rounded-full bg-red-500"></span>
                            {item}
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default ProductAnalytics;
