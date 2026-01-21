import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import Widget from "@/components/Widget";
import Percentage from "@/components/Percentage";

import { data } from "./data";

const durationOptions = [
    { id: 1, name: "Week" },
    { id: 2, name: "Month" },
];

const AIQueryActivity = () => {
    const [duration, setDuration] = useState(durationOptions[0]);

    const CustomTooltip = ({
        payload,
        label,
    }: {
        payload: any[];
        label: string;
    }) => {
        if (payload && payload.length) {
            return (
                <div className="chart-tooltip min-w-44">
                    <div className="mb-2 font-semibold">{label}</div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center gap-2">
                            <div className="font-medium text-gray-400">
                                Total Queries
                            </div>
                            <div className="font-semibold text-primary-500">
                                {payload[0]?.value}
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <div className="font-medium text-gray-400">
                                Flagged
                            </div>
                            <div className="font-semibold text-error-100">
                                {payload[1]?.value}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Widget
            className="grow"
            title="AI Query Activity"
            selectOptions={durationOptions}
            selectValue={duration}
            selectOnChange={setDuration}
        >
            <div className="flex items-end px-5 py-3 max-md:block">
                <div className="flex items-center">
                    <div className="text-h4">2,477</div>
                    <Percentage className="ml-2" value={14.2} isSimple />
                    <div className="ml-1.5 text-gray-500">
                        Queries this week
                    </div>
                </div>
            </div>
            <div className="h-79.5 pr-5 pb-4 max-md:-ml-1.5">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                        barGap={5}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="5 5"
                            stroke="#DFE1E7"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: "0.875rem",
                                fill: "#818898",
                            }}
                            dy={8}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: "0.875rem",
                                fill: "#818898",
                            }}
                        />
                        <Tooltip
                            content={<CustomTooltip payload={[]} label="" />}
                            cursor={{ fill: "#f6f8fa" }}
                        />
                        <Bar
                            dataKey="queries"
                            fill="#09543D"
                            barSize={32}
                            radius={[4, 4, 0, 0]}
                            name="Queries"
                        />
                        <Bar
                            dataKey="flagged"
                            fill="#DF1C41"
                            barSize={32}
                            radius={[4, 4, 0, 0]}
                            name="Flagged"
                        />
                        <Legend />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Widget>
    );
};

export default AIQueryActivity;
