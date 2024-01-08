import {
  useUpdateNodeMutation,
  useAddNodeMutation,
  useGetNodesQuery,
} from "../store/services/nodes";
import { useAddEdgeMutation } from "../store/services/edges";
import { MarkerType, type NodeProps } from "reactflow";
import { type TNodeData } from "../types/types";

export const useSelectVariant = (nodeProps: NodeProps<TNodeData>) => {
  const { id, data, xPos, yPos, type } = nodeProps;
  const [updateNode] = useUpdateNodeMutation();
  const [addNode] = useAddNodeMutation();
  const [addEdge] = useAddEdgeMutation();
  const { data: nodes } = useGetNodesQuery("Nodes");

  const checkedVariant = data.variants.find((variant) => id === variant.id);
  const label = `Варіант ${data.variants
    .map((variant) => variant.variant)
    .join("-")}`;

  const handleSelectVariant = (item: string) => {
    if (!checkedVariant) {
      const updatedVariants = [...data.variants];
      updatedVariants.push({ id, variant: item });

      const x = xPos + 200;
      const y = yPos + 200;

      addEdge({
        source: id,
        target: String(+id + 1),
        markerEnd: {
          type: MarkerType.Arrow,
        },
        type: "smoothstep",
      });

      addNode({
        position: {
          x,
          y,
        },
        data: { variants: updatedVariants },
        type,
      });

      updateNode({ id, data: { variants: updatedVariants } });
    } else {
      nodes?.forEach((node) => {
        node.data.variants.forEach((variant, i) => {
          if (id === variant.id) {
            const updatedVariants = [...node.data.variants];
            updatedVariants[i] = { id: variant.id, variant: item };

            updateNode({ id: node.id, data: { variants: updatedVariants } });
          }
        });
      });
    }
  };

  return {
    label,
    checkedVariant,
    handleSelectVariant,
  };
};
