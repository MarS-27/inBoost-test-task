import "reactflow/dist/style.css";
import "./App.css";
import { ReactFlowComponent } from "./components/ReactFlowComponent";
import { useGetEdgessQuery } from "./store/services/edges";
import { useGetNodesQuery } from "./store/services/nodes";

function App() {
  const { data: initialNodes } = useGetNodesQuery("Nodes");
  const { data: initialEdges } = useGetEdgessQuery("Edges");

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      {initialNodes && initialEdges ? (
        <ReactFlowComponent
          initialEdges={initialEdges}
          initialNodes={initialNodes}
        />
      ) : null}
    </main>
  );
}

export default App;
