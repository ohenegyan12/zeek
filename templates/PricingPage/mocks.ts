export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    description: string;
    manufacturer: {
        id: string;
        name: string;
        region: string;
        leadTime: string; // e.g. "14 days"
    };
    costs: {
        manufacturing: number;
        packaging: number;
        label: number;
        shipping: number;
        total: number;
    };
    packagingType: string;
    labelType: string;
    status: 'Active' | 'Inactive';
    lastUpdated: string;
}

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Organic Honey 500g',
        sku: 'OH-500',
        category: 'Food & Beverage',
        description: 'Premium organic honey in glass jar',
        manufacturer: {
            id: 'm1',
            name: 'Green Valley Farms',
            region: 'North America',
            leadTime: '14 days'
        },
        costs: {
            manufacturing: 4.50,
            packaging: 0.45,
            label: 0.10,
            shipping: 0.25,
            total: 5.30
        },
        packagingType: 'Glass Jar 500ml',
        labelType: 'Standard FDA',
        status: 'Active',
        lastUpdated: '2024-03-15'
    },
    {
        id: '2',
        name: 'Organic Honey 350g',
        sku: 'OH-350',
        category: 'Food & Beverage',
        description: 'Premium organic honey in small jar',
        manufacturer: {
            id: 'm1',
            name: 'Green Valley Farms',
            region: 'North America',
            leadTime: '12 days'
        },
        costs: {
            manufacturing: 3.20,
            packaging: 0.35,
            label: 0.08,
            shipping: 0.20,
            total: 3.83
        },
        packagingType: 'Glass Jar 350ml',
        labelType: 'Standard FDA',
        status: 'Active',
        lastUpdated: '2024-03-10'
    },
    {
        id: '3',
        name: 'Avocado Oil 250ml',
        sku: 'AO-250',
        category: 'Oils',
        description: 'Cold pressed avocado oil',
        manufacturer: {
            id: 'm2',
            name: 'Pure Press Co.',
            region: 'Europe',
            leadTime: '21 days'
        },
        costs: {
            manufacturing: 8.50,
            packaging: 0.60,
            label: 0.12,
            shipping: 0.80,
            total: 10.02
        },
        packagingType: 'Dark Glass Bottle',
        labelType: 'Premium Matte',
        status: 'Active',
        lastUpdated: '2024-03-18'
    },
    {
        id: '4',
        name: 'Lip Balm - Mint',
        sku: 'LB-MINT',
        category: 'Cosmetics',
        description: 'Organic mint lip balm',
        manufacturer: {
            id: 'm3',
            name: 'Beauty Lab Inc.',
            region: 'Asia',
            leadTime: '30 days'
        },
        costs: {
            manufacturing: 0.80,
            packaging: 0.15,
            label: 0.05,
            shipping: 0.10,
            total: 1.10
        },
        packagingType: 'Plastic Tube',
        labelType: 'Plastic Wrap',
        status: 'Inactive',
        lastUpdated: '2024-01-20'
    },
    {
        id: '5',
        name: 'Coffee Beans 1kg',
        sku: 'CB-1KG',
        category: 'Food & Beverage',
        description: 'Arabica coffee beans',
        manufacturer: {
            id: 'm4',
            name: 'Bean Roasters',
            region: 'South America',
            leadTime: '25 days'
        },
        costs: {
            manufacturing: 15.00,
            packaging: 0.80,
            label: 0.20,
            shipping: 1.50,
            total: 17.50
        },
        packagingType: 'Foil Bag',
        labelType: 'Sticker',
        status: 'Active',
        lastUpdated: '2024-03-20'
    },
];
