"use client";

import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import AIQueryActivity from "./AIQueryActivity";
import TopProductQueries from "./TopProductQueries";
import RegionsMap from "./RegionsMap";

import { stats } from "./stats";

const HomePage = () => {
    return (
        <Layout title="Dashboard Overview">
            <Breadcrumbs items={["Home", "Dashboard"]}>
                <Button className="max-md:w-full" isSecondary isMedium>
                    Export Report
                </Button>
            </Breadcrumbs>
            <div className="mb-6 -mt-2">
                <span className="text-h5 text-gray-900 font-bold hidden md:block">
                    Welcome back, Admin!
                </span>
            </div>
            <Cards items={stats} />
            <div className="flex gap-6 mt-6 max-lg:flex-col">
                <AIQueryActivity />
                <div className="w-1/3 max-lg:w-full shrink-0">
                    <TopProductQueries />
                </div>
            </div>
            <div className="flex gap-6 mt-6 max-lg:flex-col">
                <div className="w-full shrink-0">
                    <RegionsMap />
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
