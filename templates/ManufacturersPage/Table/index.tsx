import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Button from "@/components/Button";

export const manufacturersContent = [
    {
        id: "1",
        name: "Green Valley Farms",
        region: "North America",
        certifications: ["ISO 9001", "FDA"],
        products: 12,
        reliability: 95,
        leadTime: "14 days",
        status: "Active",
    },
    {
        id: "2",
        name: "Fresh Pack Solutions",
        region: "Europe",
        certifications: ["ISO 14001"],
        products: 8,
        reliability: 88,
        leadTime: "20 days",
        status: "Active",
    },
    {
        id: "3",
        name: "Asia Foods Ltd",
        region: "Asia Pacific",
        certifications: ["GMP", "HACCP"],
        products: 25,
        reliability: 72,
        leadTime: "30 days",
        status: "Under Review",
    },
    {
        id: "4",
        name: "Eco Containers Inc",
        region: "North America",
        certifications: ["ISO 9001"],
        products: 5,
        reliability: 98,
        leadTime: "7 days",
        status: "Active",
    },
    {
        id: "5",
        name: "Global Spice Traders",
        region: "Asia Pacific",
        certifications: [],
        products: 0,
        reliability: 45,
        leadTime: "45 days",
        status: "Inactive",
    },
];

type Props = {
    items?: any[];
    onView: (item: any) => void;
};

const ManufacturersTable = ({ items = manufacturersContent, onView }: Props) => {
    const [search, setSearch] = useState("");

    return (
        <Table
            className="mt-6"
            title="All Manufacturers"
            search={search}
            setSearch={(e) => setSearch(e.target.value)}
            cellsThead={[
                "Manufacturer Name",
                "Region",
                "Certifications",
                <div className="pl-4" key="products">Products</div>,
                <div className="pl-2" key="reliability">Reliability</div>,
                "Lead Time",
                "Status",
                "Actions",
            ]}
            isPagination
            isNumber
        >
            {items.map((item, index) => (
                <TableRow
                    key={item.id}
                    index={index}
                >
                    <td>
                        <div
                            className="font-bold text-gray-900 hover:text-primary-500 cursor-pointer transition-colors"
                            onClick={() => onView(item)}
                        >
                            {item.name}
                        </div>
                    </td>
                    <td>
                        <div className="text-gray-900">{item.region}</div>
                    </td>
                    <td>
                        <div className="flex flex-wrap gap-1">
                            {item.certifications.length > 0 ? (
                                item.certifications.map((cert: string, idx: number) => (
                                    <span key={idx} className="px-1.5 py-0.5 rounded border border-gray-200 text-[10px] font-bold text-gray-500 uppercase bg-gray-50">
                                        {cert}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-xs italic">None</span>
                            )}
                        </div>
                    </td>
                    <td>
                        <div className="text-gray-900 font-semibold pl-6">{item.products}</div>
                    </td>
                    <td>
                        <div className="pl-2">
                            <div
                                className={`text-xs font-bold px-2 py-1 rounded inline-block
                                    ${item.reliability >= 90 ? "bg-green-100 text-green-700" : ""}
                                    ${item.reliability >= 70 && item.reliability < 90 ? "bg-orange-100 text-orange-700" : ""}
                                    ${item.reliability < 70 ? "bg-red-100 text-red-700" : ""}
                                `}
                            >
                                {item.reliability}%
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="text-gray-500 text-sm whitespace-nowrap">{item.leadTime}</div>
                    </td>
                    <td>
                        <div
                            className={`inline-flex px-2 py-0.5 rounded text-xs font-bold uppercase
                                ${item.status === "Active" ? "bg-green-100 text-green-700" : ""}
                                ${item.status === "Inactive" ? "bg-gray-100 text-gray-600" : ""}
                                ${item.status === "Under Review" ? "bg-orange-100 text-orange-700" : ""}
                            `}
                        >
                            {item.status}
                        </div>
                    </td>
                    <td className="w-30">
                        <div className="flex items-center gap-2">
                            <Button isSmall isSecondary onClick={() => onView(item)}>
                                View
                            </Button>
                        </div>
                    </td>
                </TableRow>
            ))}
        </Table>
    );
};

export default ManufacturersTable;
