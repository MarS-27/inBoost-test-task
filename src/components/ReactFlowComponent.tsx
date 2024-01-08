import { FC, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  MiniMap,
  NodeDragHandler,
  addEdge,
  useEdgesState,
  useNodesState,
  type Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { SelectVariantNode } from "./SelectVariantNode";
import { TCustomNode, TNodeData } from "../types/types";
import { useUpdateNodeMutation } from "../store/services/nodes";

type TReactFlowComponentProps = {
  initialNodes: TCustomNode[];
  initialEdges: Edge[];
};

const nodeTypes = {
  selectorNode: SelectVariantNode,
};

export const ReactFlowComponent: FC<TReactFlowComponentProps> = ({
  initialEdges,
  initialNodes,
}) => {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<TNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const [updateNode] = useUpdateNodeMutation();

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
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onNodeDragStop={handlePositionChange}
    >
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={15} size={1} />
    </ReactFlow>
  );
};
