import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Button from "@/components/Button";

export const productsContent = [
    {
        id: "1",
        name: "Organic Honey 500g",
        sku: "OH-500-001",
        category: "Beverages",
        manufacturers: 2,
        packaging: 1,
        labels: 2,
        priceRange: "$12.00 - $15.50",
        status: "Active",
    },
    {
        id: "2",
        name: "Almond Milk 1L",
        sku: "AM-1000-022",
        category: "Beverages",
        manufacturers: 1,
        packaging: 2,
        labels: 3,
        priceRange: "$4.50 - $5.20",
        status: "Active",
    },
    {
        id: "3",
        name: "Oat Clusters",
        sku: "OC-350-101",
        category: "Cereal",
        manufacturers: 1,
        packaging: 1,
        labels: 1,
        priceRange: "$6.00 - $7.50",
        status: "Inactive",
    },
    {
        id: "4",
        name: "Protein Bar",
        sku: "PB-050-009",
        category: "Snacks",
        manufacturers: 3,
        packaging: 2,
        labels: 1,
        priceRange: "$2.50 - $3.00",
        status: "Active",
    },
    {
        id: "5",
        name: "Green Tea Pack",
        sku: "GT-020-005",
        category: "Beverages",
        manufacturers: 0, // Missing manufacturer
        packaging: 1,
        labels: 1,
        priceRange: "$8.00 - $9.00",
        status: "Archived",
    },
];

type Props = {
    items?: any[];
    onView: (item: any) => void;
};

const ProductsTable = ({ items = productsContent, onView }: Props) => {
    const [search, setSearch] = useState("");

    return (
        <Table
            className="mt-6"
            title="All Products"
            search={search}
            setSearch={(e) => setSearch(e.target.value)}
            cellsThead={[
                "Product Name",
                "SKU",
                "Category",
                <div className="pl-2" key="mfrs">Mfrs</div>,
                <div className="pl-4" key="packaging">Packaging</div>,
                <div className="pl-2" key="labels">Labels</div>,
                "Price Range",
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
                        <div className="text-gray-500 font-mono text-xs">{item.sku}</div>
                    </td>
                    <td>
                        <div className="text-gray-900">{item.category}</div>
                    </td>
                    <td>
                        <div className={`font-semibold pl-2 ${item.manufacturers === 0 ? "text-red-500" : "text-gray-900"}`}>
                            {item.manufacturers}
                        </div>
                    </td>
                    <td>
                        <div className="text-gray-900 pl-4">{item.packaging}</div>
                    </td>
                    <td>
                        <div className="text-gray-900 pl-2">{item.labels}</div>
                    </td>
                    <td>
                        <div className="text-gray-500 text-sm whitespace-nowrap">{item.priceRange}</div>
                    </td>
                    <td>
                        <div
                            className={`inline-flex px-2 py-0.5 rounded text-xs font-bold uppercase
                                ${item.status === "Active" ? "bg-green-100 text-green-700" : ""}
                                ${item.status === "Inactive" ? "bg-gray-100 text-gray-600" : ""}
                                ${item.status === "Archived" ? "bg-orange-100 text-orange-700" : ""}
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

export default ProductsTable;
