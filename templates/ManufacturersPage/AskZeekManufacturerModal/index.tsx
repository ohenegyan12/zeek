import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

type Props = {
    open: boolean;
    onClose: () => void;
    manufacturerName: string;
};

const AskZeekManufacturerModal = ({ open, onClose, manufacturerName }: Props) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            setLoading(true);
            setResponse(null);
            // Simulate AI delay
            setTimeout(() => {
                setLoading(false);
                setResponse(`Here is a detailed analysis of **${manufacturerName}**:\n\n1. **Performance Reliability**: This manufacturer consistently maintains a 96% on-time delivery rate, outperforming regional averages by 8%.\n2. **Risk Assessment**: Current supply chain monitoring indicates low risk. No major weather or geopolitical disruptions affect their primary logistics routes.\n3. **Quality Control**: QC reports show a defect rate of less than 0.5% over the last fiscal year, qualifying them as a Tier-1 supplier.\n4. **Recommendation**: Highly recommended for long-term contracts. Consider negotiating volume discounts for the upcoming quarter.`);
            }, 1800);
        }
    }, [open, manufacturerName]);

    const formatResponse = (text: string | null) => {
        if (!text) return null;
        // Simple bolding for **text**
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i} className="text-gray-900 font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <Modal
            title={`Zeek Intelligence: ${manufacturerName}`}
            open={open}
            onClose={onClose}
            classWrapper="max-w-2xl"
        >
            <div className="flex flex-col">
                <div className="p-8 flex flex-col gap-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="size-12 rounded-full border-4 border-primary-50 border-t-primary-500 animate-spin"></div>
                            <div className="text-gray-500 font-medium animate-pulse">Analyzing manufacturer profile...</div>
                        </div>
                    ) : (
                        <div className="flex gap-5">
                            <div className="shrink-0 size-12 rounded-full bg-primary-50 flex items-center justify-center border border-primary-100">
                                <div className="size-3 bg-primary-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="text-body-lg font-bold text-gray-900">Zeek AI Analysis</div>
                                <div className="text-gray-700 text-body-md leading-relaxed whitespace-pre-line">
                                    {formatResponse(response)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {!loading && (
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end rounded-b-[1.25rem]">
                        <Button
                            isPrimary
                            isMedium
                            onClick={onClose}
                            className="px-8"
                        >
                            Close Intelligence
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default AskZeekManufacturerModal;
