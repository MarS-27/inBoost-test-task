import { useCallback, useEffect } from "react";
import "./App.css";
import ReactFlow, { addEdge, useEdgesState, useNodesState } from "reactflow";

import "reactflow/dist/style.css";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { fetchNodes } from "./utils.ts/getNodes";
import { useAppSelector } from "./hooks/useAppSelector";

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function App() {
  const dispatch = useAppDispatch();

  const { nodes: initialNodes } = useAppSelector((state) => state.nodes);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  console.log(nodes);

  useEffect(() => {
    dispatch(fetchNodes());
  }, [dispatch]);

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </main>
  );
}

export default App;
