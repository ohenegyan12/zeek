import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Product } from "../mocks";

type Props = {
    products: Product[];
    open: boolean;
    onClose: () => void;
};

const ComparisonTool = ({ products, open, onClose }: Props) => {
    const data = products.map((p) => ({
        name: p.name,
        Manufacturing: p.costs.manufacturing,
        Packaging: p.costs.packaging,
        Label: p.costs.label,
        Shipping: p.costs.shipping,
    }));

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Cost Comparison"
            isSlidePanel
            contentFooter={
                <Button className="min-w-30" isPrimary isMedium onClick={onClose}>
                    Done
                </Button>
            }
        >
            <div className="flex flex-col gap-6">
                <div className="h-80 w-full">
                    <h3 className="text-body-lg font-semibold mb-4">Cost Breakdown</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis unit="$" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Manufacturing" stackId="a" fill="#3b82f6" />
                            <Bar dataKey="Packaging" stackId="a" fill="#f59e0b" />
                            <Bar dataKey="Label" stackId="a" fill="#ef4444" />
                            <Bar dataKey="Shipping" stackId="a" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h3 className="text-body-lg font-semibold mb-4">Details</h3>
                    <div className="overflow-x-auto border border-gray-100 rounded-lg">
                        <table className="w-full text-left text-body-md">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="py-2 px-4 font-medium text-gray-500">Product</th>
                                    <th className="py-2 px-4 font-medium text-gray-500">Manufacturer</th>
                                    <th className="py-2 px-4 font-medium text-gray-500">Lead Time</th>
                                    <th className="py-2 px-4 font-medium text-gray-500">Total Cost</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((p) => (
                                    <tr key={p.id}>
                                        <td className="py-2 px-4 font-medium">{p.name}</td>
                                        <td className="py-2 px-4">{p.manufacturer.name}</td>
                                        <td className="py-2 px-4">{p.manufacturer.leadTime}</td>
                                        <td className="py-2 px-4 font-semibold">${p.costs.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <Button isSecondary onClick={() => alert("Mock export PDF")}>Export PDF</Button>
                    <Button isSecondary onClick={() => alert("Mock export CSV")}>Export CSV</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ComparisonTool;
