import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from "react-simple-maps";
import Widget from "@/components/Widget";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
    { markerOffset: -15, name: "North America", coordinates: [-100, 40] },
    { markerOffset: -15, name: "Europe", coordinates: [10, 50] },
    { markerOffset: 25, name: "Asia Pacific", coordinates: [100, 20] },
];

const regionsData = [
    { region: "North America", products: 850, manufacturers: 45 },
    { region: "Europe", products: 320, manufacturers: 28 },
    { region: "Asia Pacific", products: 75, manufacturers: 11 },
];

const RegionsMap = () => {
    return (
        <Widget className="grow" title="Regions Overview">
            <div className="flex flex-col xl:flex-row">
                <div className="p-5 flex flex-col gap-4 xl:w-1/3 shrink-0">
                    {regionsData.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary-100 transition-colors cursor-default"
                        >
                            <div className="flex flex-col">
                                <span className="text-body-lg font-semibold text-gray-900">
                                    {item.region}
                                </span>
                                <span className="text-body-sm text-gray-500">
                                    Global Coverage
                                </span>
                            </div>
                            <div className="flex gap-4 text-right">
                                <div className="flex flex-col">
                                    <span className="text-body-md font-bold text-primary-500">
                                        {item.products}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-medium uppercase">
                                        Prod
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-body-md font-bold text-gray-900">
                                        {item.manufacturers}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-medium uppercase">
                                        Mfrs
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grow h-96 xl:h-auto overflow-hidden relative rounded-r-2xl">
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 120,
                        }}
                        className="w-full h-full"
                    >
                        <ZoomableGroup center={[0, 20]}>
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="#EAEAEC"
                                            stroke="#D6D6DA"
                                            style={{
                                                default: { outline: "none" },
                                                hover: { fill: "#F53", outline: "none" },
                                                pressed: { outline: "none" },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>
                            {markers.map(({ name, coordinates, markerOffset }) => (
                                <Marker key={name} coordinates={coordinates as [number, number]}>
                                    <circle r={6} fill="#09543D" stroke="#fff" strokeWidth={2} />
                                    <text
                                        textAnchor="middle"
                                        y={markerOffset}
                                        style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "10px", fontWeight: "600" }}
                                    >
                                        {name}
                                    </text>
                                </Marker>
                            ))}
                        </ZoomableGroup>
                    </ComposableMap>
                </div>
            </div>
        </Widget>
    );
};

export default RegionsMap;
