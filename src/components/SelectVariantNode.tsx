import { FC, MouseEventHandler, memo, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { TNodeData } from "../types/types";
import {
  useUpdateNodeMutation,
  useAddNodeMutation,
  useGetNodesQuery,
} from "../store/services/nodes";

const selectOptions = ["1", "2", "3", "4", "5", "6"];

export const SelectVariantNode: FC<NodeProps<TNodeData>> = memo(
  ({ id, data, isConnectable, xPos, yPos, type }) => {
    const [isOpenSelect, setOpenSelect] = useState(false);
    const [updateNode] = useUpdateNodeMutation();
    const [addNode] = useAddNodeMutation();
    const { data: nodes } = useGetNodesQuery("Nodes");

    const handleSelectVariant = (item: string) => {
      if (data.checkedVariant === item) {
        return;
      } else if (!data.checkedVariant) {
        const label = data.label + item;
        const x = xPos + 150;
        const y = yPos + 200;

        addNode({
          position: {
            x,
            y,
          },
          data: {
            label,
            checkedVariant: "",
          },
          type,
        });
        updateNode({ id, data: { label, checkedVariant: item } });
      } else {
        const label = data.label.substring(0, data.label.length - 1) + item;

        updateNode({ id, data: { label, checkedVariant: item } });

        nodes?.forEach((node) => {
          if (
            data.label.includes(
              data.label.substring(0, data.label.length - 1)
            ) &&
            node.id !== id
          ) {
            const newLabel = node.data.label.replace(
              data.label.substring(0, data.label.length),
              label
            );

            updateNode({
              id: node.id,
              data: {
                label: newLabel,
                checkedVariant: node.data.checkedVariant,
              },
            });
          }
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
            className={`select-input ${isOpenSelect ? "select-open" : ""}`}
            onClick={() => {
              setOpenSelect(!isOpenSelect);
            }}
          >
            <p>{data.checkedVariant ? data.label : "Вибрати значення"}</p>
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
                        data.checkedVariant === item ? "checkbox-isChecked" : ""
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
