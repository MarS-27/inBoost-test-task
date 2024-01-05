import { useCallback, useEffect } from "react";
import "./App.css";
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
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
import { useGetEdgessQuery } from "./store/services/edges";

const nodeTypes = {
  selectorNode: SelectVariantNode,
};

function App() {
  const { data: initialData } = useGetNodesQuery("Nodes");
  const { data: initialEdges } = useGetEdgessQuery("Edges");
  const [updateNode] = useUpdateNodeMutation();

  const [nodes, setNodes, onNodesChange] = useNodesState<TNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

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
    if (initialData && initialEdges) {
      setNodes(initialData);
      setEdges(initialEdges);
    }
  }, [initialData, initialEdges]);

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
