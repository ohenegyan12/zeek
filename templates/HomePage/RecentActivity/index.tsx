import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";

const recentActivityData = [
    {
        id: "1",
        timestamp: "Oct 24, 2025 10:30 AM",
        eventType: "Product Updated",
        description: "Updated pricing for Organic Honey",
        admin: "Admin User",
    },
    {
        id: "2",
        timestamp: "Oct 24, 2025 09:15 AM",
        eventType: "Manufacturer Added",
        description: "Added 'Green Valley Farms' profile",
        admin: "Sarah J.",
    },
    {
        id: "3",
        timestamp: "Oct 23, 2025 04:45 PM",
        eventType: "Document Uploaded",
        description: "Uploaded FDA Compliance Cert",
        admin: "Admin User",
    },
    {
        id: "4",
        timestamp: "Oct 23, 2025 02:20 PM",
        eventType: "Rule Changed",
        description: "Updated AI Guardrails for pricing",
        admin: "Mike T.",
    },
];

const RecentActivity = () => {
    const [search, setSearch] = useState("");

    // Simple search filter
    const filteredData = recentActivityData.filter((item) =>
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Table
            className="mt-6"
            title="Recent Activity"
            search={search}
            setSearch={(e) => setSearch(e.target.value)}
            // selectAll={false}
            // onSelectAll={() => {}}
            cellsThead={[
                "Timestamp",
                "Event Type",
                "Description",
                "Admin",
            ]}
        >
            {filteredData.map((item, index) => (
                <TableRow
                    key={item.id}
                    index={index}
                // selectedRows={false}
                // onRowSelect={() => {}}
                >
                    <td className="text-gray-500">{item.timestamp}</td>
                    <td>
                        <div className="font-medium text-gray-900">
                            {item.eventType}
                        </div>
                    </td>
                    <td>{item.description}</td>
                    <td>
                        <div className="px-2 py-1 rounded bg-gray-50 text-xs font-semibold text-gray-600 inline-block">
                            {item.admin}
                        </div>
                    </td>
                </TableRow>
            ))}
        </Table>
    );
};

export default RecentActivity;
