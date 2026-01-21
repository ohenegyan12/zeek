import Card from "@/components/Card";

const summaryData = [
    {
        title: "Total Queries",
        value: "15,204",
        percentage: 12.5,
        image: "/images/icons/envelope.svg",
        tooltip: "Total AI queries in selected period",
    },
    {
        title: "Flagged Queries",
        value: "412",
        percentage: -2.3,
        image: "/images/icons/minus.svg", // Using minus as exclamation might not exist, or I can use info
        tooltip: "Queries flagged for review",
    },
    {
        title: "Needs Review",
        value: "89",
        percentage: 5.1,
        image: "/images/icons/check.svg",
        tooltip: "Queries waiting for admin review",
    },
    {
        title: "Avg Response Time",
        value: "1.2s",
        percentage: -10.5, // negative is good for time
        image: "/images/icons/clock.svg",
        tooltip: "Average Zeek response time",
    },
];

const SummaryCards = () => {
    return (
        <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1">
            {summaryData.map((item, index) => (
                <Card key={index} item={item} />
            ))}
        </div>
    );
};

export default SummaryCards;
