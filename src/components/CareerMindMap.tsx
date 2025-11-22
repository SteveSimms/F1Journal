import React, { useMemo } from 'react';
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CareerStep } from '../api';

interface CareerMindMapProps {
    steps: CareerStep[];
}

export const CareerMindMap: React.FC<CareerMindMapProps> = ({ steps }) => {
    // Transform steps into nodes and edges
    const initialNodes: Node[] = useMemo(() => {
        return steps.map((step, index) => ({
            id: `step-${index}`,
            position: { x: 250, y: index * 150 + 50 },
            data: {
                label: (
                    <div style={{
                        padding: '10px',
                        background: '#1F1F27',
                        color: 'white',
                        border: '1px solid var(--f1-red)',
                        borderRadius: '8px',
                        minWidth: '150px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{step.step}</div>
                        <div style={{ fontSize: '0.8em', color: '#D0D0D2' }}>{step.cost}</div>
                    </div>
                )
            },
            type: 'default',
        }));
    }, [steps]);

    const initialEdges: Edge[] = useMemo(() => {
        return steps.slice(0, -1).map((_, index) => ({
            id: `e${index}-${index + 1}`,
            source: `step-${index}`,
            target: `step-${index + 1}`,
            animated: true,
            style: { stroke: 'var(--f1-red)' },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: 'var(--f1-red)',
            },
        }));
    }, [steps]);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div style={{ height: '500px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background color="#333" gap={16} />
                <Controls style={{ fill: 'black' }} />
            </ReactFlow>
        </div>
    );
};
