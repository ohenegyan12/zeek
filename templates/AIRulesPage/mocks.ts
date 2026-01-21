export interface Rule {
    id: string;
    name: string;
    description: string;
    type: 'Compliance' | 'Pricing' | 'Data Access' | 'Safety' | 'Brand';
    scope: 'Global' | 'Product' | 'Manufacturer' | 'Region';
    status: 'Active' | 'Disabled';
    priority: 'High' | 'Medium' | 'Low';
    lastTriggered: string | null;
    conditions: string; // Simplified for mock
    fallback: string;
}

export interface RuleLog {
    id: string;
    timestamp: string;
    ruleName: string;
    queryRef: string;
    entity: string;
    outcome: 'Blocked' | 'Modified' | 'Allowed';
}

export const mockRules: Rule[] = [
    {
        id: '1',
        name: 'ISO Certification Requirement',
        description: 'Do not recommend manufacturers without ISO 9001 certification.',
        type: 'Compliance',
        scope: 'Manufacturer',
        status: 'Active',
        priority: 'High',
        lastTriggered: '2024-03-20 14:30',
        conditions: 'IF manufacturer.iso_certified == false THEN block_recommendation',
        fallback: 'I cannot recommend this manufacturer as they lack required certifications.'
    },
    {
        id: '2',
        name: 'Internal Cost Protection',
        description: 'Never expose raw manufacturing costs to external customer queries.',
        type: 'Data Access',
        scope: 'Global',
        status: 'Active',
        priority: 'High',
        lastTriggered: '2024-03-21 09:15',
        conditions: 'IF query.target == "manufacturing_cost" AND user.role == "customer" THEN hide_data',
        fallback: 'Detailed cost breakdowns are available for internal admin review only.'
    },
    {
        id: '3',
        name: 'Reliability Threshold',
        description: 'Only suggest manufacturers with reliability score > 80.',
        type: 'Safety',
        scope: 'Manufacturer',
        status: 'Active',
        priority: 'Medium',
        lastTriggered: '2024-03-19 16:45',
        conditions: 'IF manufacturer.reliability_score < 80 THEN exclude_from_list',
        fallback: 'Displaying only highly rated manufacturers.'
    },
    {
        id: '4',
        name: 'Region Lock - Embargoed',
        description: 'Block transactions involving restricted regions.',
        type: 'Compliance',
        scope: 'Region',
        status: 'Active',
        priority: 'High',
        lastTriggered: null,
        conditions: 'IF region.status == "embargoed" THEN block_transaction',
        fallback: 'Operations in this region are currently restricted.'
    },
    {
        id: '5',
        name: 'Missing Pricing Fallback',
        description: 'If pricing data is missing, instruct Clare to say Data unavailable.',
        type: 'Pricing',
        scope: 'Product',
        status: 'Disabled',
        priority: 'Low',
        lastTriggered: '2024-02-10 11:20',
        conditions: 'IF product.price == null THEN return_fallback',
        fallback: 'Pricing data is currently unavailable for this item.'
    }
];

export const mockLogs: RuleLog[] = [
    {
        id: 'l1',
        timestamp: '2024-03-21 09:15:22',
        ruleName: 'Internal Cost Protection',
        queryRef: 'Q-8821',
        entity: 'Product: Widget X',
        outcome: 'Blocked'
    },
    {
        id: 'l2',
        timestamp: '2024-03-20 14:30:05',
        ruleName: 'ISO Certification Requirement',
        queryRef: 'Q-8755',
        entity: 'Manufacturer: FastSupplies Inc',
        outcome: 'Blocked'
    },
    {
        id: 'l3',
        timestamp: '2024-03-19 16:45:12',
        ruleName: 'Reliability Threshold',
        queryRef: 'Q-8620',
        entity: 'Manufacturer: Quality Co',
        outcome: 'Modified'
    },
    {
        id: 'l4',
        timestamp: '2024-03-19 10:11:00',
        ruleName: 'Region Lock - Embargoed',
        queryRef: 'Q-8599',
        entity: 'Region: North Korea',
        outcome: 'Blocked'
    },
    {
        id: 'l5',
        timestamp: '2024-03-18 13:22:45',
        ruleName: 'Internal Cost Protection',
        queryRef: 'Q-8430',
        entity: 'Product: Gadget Y',
        outcome: 'Allowed'
    }
];
