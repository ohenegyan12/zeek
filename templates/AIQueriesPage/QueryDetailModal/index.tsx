import Modal from "@/components/Modal";
import Button from "@/components/Button";

type Props = {
    open: boolean;
    onClose: () => void;
    query: any;
};

const QueryDetailModal = ({ open, onClose, query }: Props) => {
    if (!query) return null;

    return (
        <Modal
            className=""
            classWrapper=""
            title="Query Details"
            open={open}
            onClose={onClose}
            isSlidePanel
            contentFooter={
                <div className="flex gap-2">
                    <Button isMedium className="bg-red-500 hover:bg-red-600 border-red-500 text-white">Flag Query</Button>
                    <Button isMedium isPrimary>Mark as Reviewed</Button>
                </div>
            }
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Original User Question</div>
                    <div className="p-4 bg-gray-50 rounded-xl text-body-lg text-gray-900 border border-gray-100">
                        {query.question}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Zeek Backend Response</div>
                    <div className="p-4 bg-primary-50 rounded-xl text-body-md text-gray-800 border border-primary-100 italic">
                        {query.zeekResponse}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Clare Final Output</div>
                    <div className="p-4 bg-white rounded-xl text-body-md text-gray-900 border border-gray-200 shadow-sm">
                        {query.clareResponse}
                    </div>
                </div>

                <div className="border-t border-gray-100 my-2"></div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-xs text-gray-400 font-semibold uppercase">Product</div>
                        <div className="font-medium text-primary-500">{query.product}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 font-semibold uppercase">Intent</div>
                        <div className="font-medium text-gray-900">{query.intent}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 font-semibold uppercase">Timestamp</div>
                        <div className="font-medium text-gray-900">{query.timestamp}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 font-semibold uppercase">Status</div>
                        <div className={`font-bold ${query.status === "Flagged" ? "text-red-500" :
                                query.status === "Resolved" ? "text-green-500" : "text-orange-500"
                            }`}>
                            {query.status}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Internal Notes</div>
                    <textarea
                        className="w-full p-3 border border-gray-200 rounded-xl text-body-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                        rows={4}
                        placeholder="Add internal notes about this query..."
                    />
                </div>
            </div>
        </Modal>
    );
};

export default QueryDetailModal;
