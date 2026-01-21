import Button from "@/components/Button";

type Props = {
    node: any;
    onClose: () => void;
};

const DetailPanel = ({ node, onClose }: Props) => {
    if (!node) return null;

    return (
        <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-xl z-50 overflow-y-auto border-l border-gray-100 flex flex-col animate-slide-in-right">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                <div>
                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">{node.type}</div>
                    <div className="text-h5 text-gray-900">{node.label}</div>
                    {node.data?.sku && <div className="text-sm font-mono text-gray-500 mt-1">{node.data.sku}</div>}
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
                {/* Status & Risk */}
                <div className="flex gap-4">
                    <div className={`px-2 py-1 rounded text-xs font-bold uppercase 
                        ${node.data?.status === "Active" ? "bg-green-100 text-green-700" :
                            node.data?.status === "Flagged" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                        {node.data?.status || "Active"}
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="text-xs text-gray-400 font-bold uppercase mb-1">Region</div>
                        <div className="font-semibold text-gray-900">{node.data?.region || "Global"}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="text-xs text-gray-400 font-bold uppercase mb-1">Cost / Unit</div>
                        <div className="font-semibold text-gray-900">{node.data?.cost || "N/A"}</div>
                    </div>
                </div>

                {/* Linked Entities Preview (Mock) */}
                <div className="flex flex-col gap-3">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Connections</div>
                    {node.data?.connections && node.data.connections.length > 0 ? (
                        node.data.connections.map((conn: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl">
                                <span className="text-sm font-medium text-gray-700">{conn.name}</span>
                                <span className="text-xs text-gray-400 uppercase">{conn.type}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-400 italic">No direct connections info available.</div>
                    )}
                </div>

                {/* Admin Actions */}
                <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                    <Button className="w-full bg-primary-50 text-primary-600 hover:bg-primary-100 border-primary-200">
                        Ask Zeek about this entity
                    </Button>
                    <div className="flex gap-2">
                        <Button isSmall isSecondary className="flex-1">Edit</Button>
                        <Button isSmall isSecondary className="flex-1 text-red-500 hover:text-red-700">Flag Risk</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPanel;
