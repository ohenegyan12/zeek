export const mockMetrics = {
    totalProducts: 12450,
    totalManufacturers: 342,
    avgProductCost: 45.20,
    avgLeadTime: 18, // days
    totalAIQueries: 8902,
    flaggedAIResponses: 145,
};

export const productAnalyticsData = {
    mostQueried: [
        { name: "Organic Honey 500g", queries: 1200 },
        { name: "Avocado Oil 250ml", queries: 980 },
        { name: "Shea Butter Raw", queries: 850 },
        { name: "Coffee Beans 1kg", queries: 720 },
        { name: "Dried Mango 100g", queries: 650 },
    ],
    highestCost: [
        { name: "Industrial Mixer", cost: 12500 },
        { name: "Premium Cacao Sack", cost: 850 },
        { name: "Bulk Shea Dispenser", cost: 450 },
        { name: "Auto-Labeler Unit", cost: 3200 },
        { name: "Filtering System", cost: 1800 },
    ],
    costDistribution: [
        { name: "Raw Materials", value: 60 },
        { name: "Packaging", value: 25 },
        { name: "Logistics", value: 10 },
        { name: "Labor/Other", value: 5 },
    ],
    fullMissingData: [
        "Product A - Missing Manufacturer",
        "Product B - No Lead Time",
        "Product C - Incomplete Pricing",
        "Product D - Missing Region",
    ]
};

export const manufacturerAnalyticsData = {
    byRegion: [
        { name: "North America", count: 120 },
        { name: "Europe", count: 85 },
        { name: "Asia", count: 90 },
        { name: "South America", count: 35 },
        { name: "Africa", count: 12 },
    ],
    topReliability: [
        { name: "Green Valley Farms", score: 98 },
        { name: "TechPack Solutions", score: 96 },
        { name: "Global Logistics Co", score: 95 },
        { name: "Pure Resins Ltd", score: 94 },
    ],
    longestLeadTime: [
        { name: "Slow Ship Inc.", days: 60 },
        { name: "Remote Sources Ltd", days: 55 },
        { name: "Custom Fabricators", days: 45 },
    ],
    flaggedRisks: [
        { name: "ChemCorp", reason: "Environmental Compliance" },
        { name: "FastLabel", reason: "Quality Control Spikes" },
        { name: "GeoShip", reason: "Regional Instability" },
    ]
};

export const pricingTrendsData = [
    { month: "Jan", cost: 42 },
    { month: "Feb", cost: 43 },
    { month: "Mar", cost: 42.5 },
    { month: "Apr", cost: 44 },
    { month: "May", cost: 46 },
    { month: "Jun", cost: 45.5 },
];

export const riskAnalyticsData = {
    singleDependency: [
        { name: "Specialized Glass Vials", manufacturer: "GlassWorks Only" },
        { name: "Rare Earth Extract", manufacturer: "GeoMine Single" },
        { name: "Patented Valve", manufacturer: "ValveTech" },
    ],
    highRiskChains: 12,
    limitedRegionCoverage: ["Antarctica", "Remote Pacific Islands"],
    bottlenecks: 8
};

export const aiAnalyticsData = {
    queryVolume: [
        { date: "Mon", queries: 120 },
        { date: "Tue", queries: 145 },
        { date: "Wed", queries: 132 },
        { date: "Thu", queries: 190 },
        { date: "Fri", queries: 160 },
        { date: "Sat", queries: 90 },
        { date: "Sun", queries: 85 },
    ],
    intents: [
        { name: "Pricing", value: 45 },
        { name: "Suppliers", value: 30 },
        { name: "Compliance", value: 15 },
        { name: "Stock", value: 10 },
    ],
    flaggedVsResolved: [
        { name: "Resolved", value: 92 },
        { name: "Flagged", value: 8 },
    ],
    avgResponseTime: "1.2s"
};
