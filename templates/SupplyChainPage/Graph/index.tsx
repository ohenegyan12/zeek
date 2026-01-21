import { useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


const initialNodes: any[] = [
    // Product
    {
        id: '1',
        type: 'input',
        data: {
            label: 'Organic Honey 500g',
            sku: 'OH-500',
            status: 'Active',
            region: 'Global',
            cost: '$12.00',
            connections: [
                { name: 'Green Valley Farms', type: 'Manufacturer' },
                { name: 'Glass Jar 500ml', type: 'Packaging' },
                { name: 'Standard FDA Label', type: 'Label' }
            ]
        },
        position: { x: 250, y: 0 },
        style: { background: '#fff', border: '1px solid #777', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
    },

    // Manufacturer
    {
        id: '2',
        data: {
            label: 'Green Valley Farms',
            type: 'Manufacturer',
            sku: '',
            status: 'Active',
            region: 'North America',
            cost: '$4.50',
            connections: [{ name: 'Organic Honey 500g', type: 'Product' }]
        },
        position: { x: 100, y: 150 },
        style: { background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '8px', padding: '10px' }
    },

    // Packaging
    {
        id: '3',
        data: {
            label: 'Glass Jar 500ml',
            type: 'Packaging',
            sku: '',
            status: 'Active',
            region: 'Asia Pacific',
            cost: '$0.45',
            connections: [{ name: 'Organic Honey 500g', type: 'Product' }]
        },
        position: { x: 400, y: 150 },
        style: { background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: '8px', padding: '10px' }
    },

    // Label
    {
        id: '4',
        data: {
            label: 'Standard FDA Label',
            type: 'Label',
            sku: '',
            status: 'Flagged',
            region: 'North America',
            cost: '$0.10',
            connections: [{ name: 'Organic Honey 500g', type: 'Product' }]
        },
        position: { x: 250, y: 300 },
        style: { background: '#fef2f2', border: '1px solid #ef4444', borderRadius: '8px', padding: '10px' }
    },
];


const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Produced By', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e1-3', source: '1', target: '3', label: 'Packaged In', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e1-4', source: '1', target: '4', label: 'Labeled With', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444' } },
];

type Props = {
    onNodeClick: (event: any, node: any) => void;
};

const SupplyChainGraph = ({ onNodeClick }: Props) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div className="h-[600px] w-full bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                fitView
            >
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
};

export default SupplyChainGraph;
