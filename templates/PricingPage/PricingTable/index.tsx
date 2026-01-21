import { useState } from "react";
import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import { Product } from "../mocks";

type Props = {
    products: Product[];
    selectedProducts: string[];
    onSelectProduct: (id: string, checked: boolean) => void;
    onSelectAll: (checked: boolean) => void;
    onViewDetails: (product: Product) => void;
    onCompare: (products: Product[]) => void;
};

const PricingTable = ({
    products,
    selectedProducts,
    onSelectProduct,
    onSelectAll,
    onViewDetails,
    onCompare,
}: Props) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Product | 'costs.total'; direction: 'asc' | 'desc' } | null>(null);

    const handleSort = (key: keyof Product | 'costs.total') => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;

        let aValue: any = a;
        let bValue: any = b;

        if (key === 'costs.total') {
            aValue = a.costs.total;
            bValue = b.costs.total;
        } else {
            //@ts-ignore
            aValue = a[key];
            //@ts-ignore
            bValue = b[key];
        }

        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    const allSelected = products.length > 0 && selectedProducts.length === products.length;

    const getCostColor = (cost: number) => {
        if (cost > 15) return "text-orange-500 font-bold";
        if (cost < 1) return "text-green-500 font-bold";
        return "text-gray-900";
    };

    return (
        <div className="border border-gray-100 rounded-2xl shadow-sm bg-white overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-body-md">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="py-3 px-4 w-10">
                                <Checkbox
                                    checked={allSelected}
                                    onChange={onSelectAll}
                                />
                            </th>
                            <th className="py-3 px-4 font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('name')}>Product</th>
                            <th className="py-3 px-4 font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('sku')}>SKU</th>
                            <th className="py-3 px-4 font-medium text-gray-500">Manufacturer</th>
                            <th className="py-3 px-4 font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('costs.total')}>Total Cost</th>
                            <th className="py-3 px-4 font-medium text-gray-500">Mfg Cost</th>
                            <th className="py-3 px-4 font-medium text-gray-500">Pkg Cost</th>
                            <th className="py-3 px-4 font-medium text-gray-500">Label Cost</th>
                            <th className="py-3 px-4 font-medium text-gray-500">Lead Time</th>
                            <th className="py-3 px-4 font-medium text-gray-500">Status</th>
                            <th className="py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sortedProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-25 transition-colors">
                                <td className="py-3 px-4">
                                    <Checkbox
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={(checked) => onSelectProduct(product.id, checked)}
                                    />
                                </td>
                                <td className="py-3 px-4 font-medium text-gray-900">{product.name}</td>
                                <td className="py-3 px-4 text-gray-500">{product.sku}</td>
                                <td className="py-3 px-4 text-primary-500 hover:underline cursor-pointer">{product.manufacturer.name}</td>
                                <td className={`py-3 px-4 ${getCostColor(product.costs.total)}`}>${product.costs.total.toFixed(2)}</td>
                                <td className="py-3 px-4 text-gray-500">${product.costs.manufacturing.toFixed(2)}</td>
                                <td className="py-3 px-4 text-gray-500">${product.costs.packaging.toFixed(2)}</td>
                                <td className="py-3 px-4 text-gray-500">${product.costs.label.toFixed(2)}</td>
                                <td className="py-3 px-4 text-gray-500">{product.manufacturer.leadTime}</td>
                                <td className="py-3 px-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${product.status === 'Active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onViewDetails(product)}
                                            className="p-1 hover:bg-gray-100 rounded text-gray-500"
                                            title="View Details"
                                        >
                                            <Icon name="eye" className="size-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {products.length === 0 && (
                <div className="p-8 text-center text-gray-500">No products found matching filters.</div>
            )}
        </div>
    );
};

export default PricingTable;
