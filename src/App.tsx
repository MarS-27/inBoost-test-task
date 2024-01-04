import { useCallback, useEffect } from "react";
import "./App.css";
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  MarkerType,
  NodeDragHandler,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { TNodeData } from "./types/types";
import {
  useGetNodesQuery,
  useUpdateNodeMutation,
} from "./store/services/nodes";
import { SelectVariantNode } from "./components/SelectVariantNode";

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: "e1-3",
    source: "2",
    target: "3",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
];

const nodeTypes = {
  selectorNode: SelectVariantNode,
};

function App() {
  const { data } = useGetNodesQuery("Nodes");
  const [updateNode] = useUpdateNodeMutation();

  const [nodes, setNodes, onNodesChange] = useNodesState<TNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const handlePositionChange: NodeDragHandler = (e, node) => {
    e.stopPropagation();
    updateNode({ id: node.id, position: node.position });
  };

  useEffect(() => {
    if (data) {
      setNodes(data);
    }
  }, [data]);

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeDragStop={handlePositionChange}
      />
    </main>
  );
}

export default App;
