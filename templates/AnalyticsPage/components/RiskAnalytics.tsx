import { riskAnalyticsData } from "../mocks";
import Icon from "@/components/Icon";

type SectionProps = {
    title: string;
    children: React.ReactNode;
    className?: string; // Add className prop
};

const Section = ({ title, children, className }: SectionProps) => (
    <div className={`p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col h-full ${className || ''}`}>
        <div className="flex items-center gap-2 mb-6">
            <Icon name="info" className="fill-red-500 size-5" />
            <h3 className="text-body-lg font-bold">{title}</h3>
        </div>
        <div className="grow w-full">{children}</div>
    </div>
);

const RiskAnalytics = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Section title="Single Manufacturer Dependency" className="lg:col-span-1">
                <div className="flex flex-col gap-3">
                    {riskAnalyticsData.singleDependency.map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                            <span className="font-medium text-gray-900">{item.name}</span>
                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">{item.manufacturer}</span>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Risk Metrics" className="lg:col-span-1">
                <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-xl text-center">
                        <span className="text-h4 font-bold text-red-600">{riskAnalyticsData.highRiskChains}</span>
                        <span className="text-xs text-red-800 font-medium mt-1">High Risk Chains</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-xl text-center">
                        <span className="text-h4 font-bold text-orange-600">{riskAnalyticsData.bottlenecks}</span>
                        <span className="text-xs text-orange-800 font-medium mt-1">Bottlenecks Identified</span>
                    </div>
                </div>
            </Section>

            <Section title="Limited Coverage Regions" className="lg:col-span-1">
                <div className="flex flex-wrap gap-2">
                    {riskAnalyticsData.limitedRegionCoverage.map((region, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                            {region}
                        </span>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default RiskAnalytics;
