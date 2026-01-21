"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Filters from "./Filters";
import SupplyChainGraph from "./Graph";
import DetailPanel from "./DetailPanel";

const SupplyChainPage = () => {
    const [selectedNode, setSelectedNode] = useState<any>(null);

    const handleNodeClick = (event: any, node: any) => {
        setSelectedNode(node);
    };

    return (
        <Layout title="Supply Chain Explorer">
            <div className="flex flex-col gap-6 relative">
                <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-4">
                    <div>
                        <h1 className="text-h4 max-md:text-h5">Supply Chain Explorer</h1>
                        <div className="text-body-lg text-gray-500 mt-1">
                            Visualize product relationships and supply chain flow
                        </div>
                    </div>
                </div>

                <Filters />
                <SupplyChainGraph onNodeClick={handleNodeClick} />

                {selectedNode && (
                    <DetailPanel
                        node={selectedNode}
                        onClose={() => setSelectedNode(null)}
                    />
                )}
            </div>
        </Layout>
    );
};

export default SupplyChainPage;
