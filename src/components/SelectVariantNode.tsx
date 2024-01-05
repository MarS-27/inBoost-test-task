import { FC, memo, useState } from "react";
import { Handle, MarkerType, NodeProps, Position } from "reactflow";
import { TNodeData } from "../types/types";
import {
  useUpdateNodeMutation,
  useAddNodeMutation,
  useGetNodesQuery,
} from "../store/services/nodes";
import { useAddEdgeMutation } from "../store/services/edges";

const selectOptions = ["1", "2", "3", "4", "5", "6"];

export const SelectVariantNode: FC<NodeProps<TNodeData>> = memo(
  ({ id, data, isConnectable, xPos, yPos, type }) => {
    const [isOpenSelect, setOpenSelect] = useState(false);

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

        addNode({
          position: {
            x,
            y,
          },
          data: { variants: updatedVariants },
          type,
        });

        addEdge({
          source: id,
          target: String(+id + 1),
          markerEnd: {
            type: MarkerType.Arrow,
          },
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

    return (
      <>
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: "#ADB5BD" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        <div className="select-container">
          <div className="decoration-block"></div>
          <div
            className={`select-input nodrag ${
              isOpenSelect ? "select-open" : ""
            }`}
            onClick={() => {
              setOpenSelect(!isOpenSelect);
            }}
          >
            <p>{checkedVariant ? label : "Вибрати значення"}</p>
            <img
              className="transition"
              src="/icons/arrow-down.svg"
              alt="Open select variants"
            />
            {isOpenSelect ? (
              <div className="select-options">
                {selectOptions.map((item) => (
                  <div
                    className="select-option"
                    key={item}
                    onClick={() => handleSelectVariant(item)}
                  >
                    <div
                      className={`checkbox ${
                        checkedVariant?.variant === item
                          ? "checkbox-isChecked"
                          : ""
                      }`}
                    ></div>
                    <p>Варіант {item}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <Handle
          type="source"
          position={Position.Right}
          id={id}
          style={{ top: "113px", background: "#ADB5BD" }}
          isConnectable={isConnectable}
        />
      </>
    );
  }
);
