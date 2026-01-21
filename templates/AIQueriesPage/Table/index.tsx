import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Action from "@/components/Action";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";

export const tableContent = [
    {
        id: "1",
        timestamp: "Oct 24, 10:30 AM",
        intent: "Pricing Question",
        question: "What is the bulk pricing for Organic Honey?",
        product: "Organic Honey 500g",
        zeekResponse: "The bulk pricing for Organic Honey starts at...",
        clareResponse: "For bulk orders of Organic Honey, the price is...",
        status: "Resolved",
    },
    {
        id: "2",
        timestamp: "Oct 24, 09:15 AM",
        intent: "Supplier Info",
        question: "Who manufactures the Almond Milk?",
        product: "Almond Milk 1L",
        zeekResponse: "Almond Milk 1L is manufactured by Green Valley...",
        clareResponse: "Green Valley Farms produces our Almond Milk.",
        status: "Flagged",
    },
    {
        id: "3",
        timestamp: "Oct 23, 04:45 PM",
        intent: "Compliance",
        question: "Is the packaging biodegradable?",
        product: "Oat Clusters",
        zeekResponse: "Yes, the packaging is 100% biodegradable.",
        clareResponse: "Yes, our Oat Clusters packaging is eco-friendly...",
        status: "Needs Review",
    },
    {
        id: "4",
        timestamp: "Oct 23, 02:20 PM",
        intent: "General Inquiry",
        question: "Do you ship to Canada?",
        product: "General",
        zeekResponse: "Shipping regions include US, Canada, and Mexico.",
        clareResponse: "Yes, we do ship to Canada!",
        status: "Resolved",
    },
    {
        id: "5",
        timestamp: "Oct 23, 01:10 PM",
        intent: "Product Details",
        question: "Is this gluten-free?",
        product: "Protein Bar",
        zeekResponse: "The Protein Bar contains traces of gluten.",
        clareResponse: "This Protein Bar is not gluten-free.",
        status: "Resolved",
    },
];

type Props = {
    onView: (item: any) => void;
};

const QueriesTable = ({ onView }: Props) => {
    const [search, setSearch] = useState("");

    return (
        <Table
            className="mt-6"
            title="Recent Queries"
            search={search}
            setSearch={(e) => setSearch(e.target.value)}
            cellsThead={[
                "#",
                "Timestamp",
                "User Intent / Question",
                "Product / Manufacturer",
                "Status",
                "Actions",
            ]}
            isPagination
        >
            {tableContent.map((item, index) => (
                <TableRow
                    key={item.id}
                    index={index}
                >
                    <td className="text-gray-500 whitespace-nowrap">{item.timestamp}</td>
                    <td>
                        <div className="flex flex-col max-w-xs">
                            <span className="font-semibold text-gray-900">{item.intent}</span>
                            <div className="truncate text-gray-500 text-sm" title={item.question}>
                                {item.question}
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="font-medium text-primary-500 hover:underline cursor-pointer">
                            {item.product}
                        </div>
                    </td>
                    <td>
                        <div
                            className={`inline-flex px-2 py-0.5 rounded text-xs font-bold uppercase
                                ${item.status === "Resolved" ? "bg-green-100 text-green-700" : ""}
                                ${item.status === "Flagged" ? "bg-red-100 text-red-700" : ""}
                                ${item.status === "Needs Review" ? "bg-orange-100 text-orange-700" : ""}
                            `}
                        >
                            {item.status}
                        </div>
                    </td>
                    <td className="w-40">
                        <div className="flex items-center gap-2">
                            <Button isSmall isSecondary onClick={() => onView(item)}>
                                View Details
                            </Button>
                        </div>
                    </td>
                </TableRow>
            ))}
        </Table>
    );
};

export default QueriesTable;
