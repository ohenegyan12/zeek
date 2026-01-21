import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import SuccessModal from "../SuccessModal";
import { Product } from "../mocks";

type Props = {
    product: Product | null;
    open: boolean;
    onClose: () => void;
};

const packagingOptions = [
    { id: "glass_500", name: "Glass Jar 500ml", cost: 0.45 },
    { id: "glass_350", name: "Glass Jar 350ml", cost: 0.35 },
    { id: "plastic_tube", name: "Plastic Tube", cost: 0.15 },
    { id: "foil_bag", name: "Foil Bag", cost: 0.80 },
    { id: "dark_glass", name: "Dark Glass Bottle", cost: 0.60 },
];

const labelOptions = [
    { id: "standard", name: "Standard FDA", cost: 0.10 },
    { id: "premium_matte", name: "Premium Matte", cost: 0.12 },
    { id: "plastic_wrap", name: "Plastic Wrap", cost: 0.05 },
    { id: "sticker", name: "Sticker", cost: 0.20 },
];

const SimulationPanel = ({ product, open, onClose }: Props) => {
    const [volume, setVolume] = useState<string>("1000");
    const [selectedPkg, setSelectedPkg] = useState(packagingOptions[0]);
    const [selectedLabel, setSelectedLabel] = useState(labelOptions[0]);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [simulatedCost, setSimulatedCost] = useState<{
        manufacturing: number;
        packaging: number;
        label: number;
        shipping: number;
        total: number;
    } | null>(null);

    useEffect(() => {
        if (product) {
            // Find closest match or default
            const pkg = packagingOptions.find(p => p.name === product.packagingType) || packagingOptions[0];
            const lbl = labelOptions.find(l => l.name === product.labelType) || labelOptions[0];
            setSelectedPkg(pkg);
            setSelectedLabel(lbl);
            recalculate(product, 1000, pkg, lbl);
        }
    }, [product]);

    useEffect(() => {
        if (product) {
            recalculate(product, Number(volume) || 0, selectedPkg, selectedLabel);
        }
    }, [volume, selectedPkg, selectedLabel]);

    const recalculate = (prod: Product, vol: number, pkg: any, lbl: any) => {
        // Volume discount: 5% for every 10k units, max 20%
        const discountFactor = Math.min(Math.floor(vol / 10000) * 0.05, 0.20);
        const mfgCost = prod.costs.manufacturing * (1 - discountFactor);

        const total = mfgCost + pkg.cost + lbl.cost + prod.costs.shipping;

        setSimulatedCost({
            manufacturing: mfgCost,
            packaging: pkg.cost,
            label: lbl.cost,
            shipping: prod.costs.shipping,
            total
        });
    };

    if (!product) return null;

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                title={`Cost Simulation: ${product.name}`}
                isSlidePanel
                contentFooter={
                    <div className="flex gap-2 w-full justify-end">
                        <Button isSecondary onClick={() => setIsSuccessOpen(true)}>Save Scenario</Button>
                        <Button isPrimary onClick={onClose}>Close</Button>
                    </div>
                }
            >
                <div className="flex flex-col gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h4 className="font-semibold mb-2">Current Production Details</h4>
                        <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
                            <div>Base Price: ${product.costs.manufacturing.toFixed(2)}</div>
                            <div>Current Pkg: {product.packagingType}</div>
                            <div>Current Label: {product.labelType}</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Field
                            label="Production Volume (Units)"
                            type="number"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                        />

                        <Select
                            label="Packaging Type"
                            options={packagingOptions}
                            value={selectedPkg}
                            onChange={(val) => setSelectedPkg(val as typeof packagingOptions[0])}
                        />

                        <Select
                            label="Label Type"
                            options={labelOptions}
                            value={selectedLabel}
                            onChange={(val) => setSelectedLabel(val as typeof labelOptions[0])}
                        />
                    </div>

                    {simulatedCost && (
                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <h3 className="text-body-lg font-bold mb-4">Simulated Unit Cost</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="p-3 bg-blue-50 rounded border border-blue-100">
                                    <span className="block text-xs text-blue-500 font-semibold uppercase">Manufacturing (adj)</span>
                                    <span className="text-lg font-bold text-gray-900">${simulatedCost.manufacturing.toFixed(2)}</span>
                                </div>
                                <div className="p-3 bg-orange-50 rounded border border-orange-100">
                                    <span className="block text-xs text-orange-500 font-semibold uppercase">Packaging</span>
                                    <span className="text-lg font-bold text-gray-900">${simulatedCost.packaging.toFixed(2)}</span>
                                </div>
                                <div className="p-3 bg-red-50 rounded border border-red-100">
                                    <span className="block text-xs text-red-500 font-semibold uppercase">Label</span>
                                    <span className="text-lg font-bold text-gray-900">${simulatedCost.label.toFixed(2)}</span>
                                </div>
                                <div className="p-3 bg-green-50 rounded border border-green-100">
                                    <span className="block text-xs text-green-500 font-semibold uppercase">Total / Unit</span>
                                    <span className="text-xl font-bold text-gray-900">${simulatedCost.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="text-sm text-gray-500">
                                * Includes volume discount of {((1 - simulatedCost.manufacturing / product.costs.manufacturing) * 100).toFixed(0)}% on manufacturing.
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
            <SuccessModal
                open={isSuccessOpen}
                onClose={() => {
                    setIsSuccessOpen(false);
                    onClose(); // Also close simulation panel
                }}
                title="Scenario Saved!"
                message={`Your simulation for ${product.name} has been saved to your dashboard for future reference.`}
            />
        </>
    );
};

export default SimulationPanel;
