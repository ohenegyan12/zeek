"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import SummaryCards from "./SummaryCards";
import Filters from "./Filters";
import QueriesTable from "./Table";
import QueryDetailModal from "./QueryDetailModal";

const AIQueriesPage = () => {
    const [selectedQuery, setSelectedQuery] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleViewDetail = (item: any) => {
        setSelectedQuery(item);
        setIsDetailOpen(true);
    };

    return (
        <Layout title="AI Queries & Logs">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-h4 max-md:text-h5">AI Queries & Logs</h1>
                    <div className="text-body-lg text-gray-500 mt-1">
                        Monitor Clare ↔ Zeek interactions and ensure accuracy
                    </div>
                </div>

                <SummaryCards />
                <Filters />
                <QueriesTable onView={handleViewDetail} />

                <QueryDetailModal
                    open={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                    query={selectedQuery}
                />
            </div>
        </Layout>
    );
};

export default AIQueriesPage;
