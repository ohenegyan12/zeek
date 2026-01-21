import Widget from "@/components/Widget";

const data = [
    { name: "Organic Honey 500g", queries: 450, percentage: 85 },
    { name: "Almond Milk 1L", queries: 320, percentage: 60 },
    { name: "Oat Clusters", queries: 210, percentage: 40 },
    { name: "Green Tea Pack", queries: 150, percentage: 28 },
    { name: "Protein Bar", queries: 95, percentage: 18 },
];

const TopProductQueries = () => {
    return (
        <Widget className="w-full" title="Top Asked Products">
            <div className="p-5 flex flex-col gap-6">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="flex justify-between text-body-md font-medium">
                            <span className="text-gray-900">{item.name}</span>
                            <span className="text-gray-500">{item.queries} queries</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary-500 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="px-5 pb-5">
                <button className="w-full py-2 text-primary-500 font-semibold text-sm hover:underline">
                    View All Products
                </button>
            </div>
        </Widget>
    );
};

export default TopProductQueries;
