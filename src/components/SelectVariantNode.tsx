import { type FC, useState } from "react";
import { Handle, type NodeProps, Position } from "reactflow";
import { type TNodeData } from "../types/types";
import clsx from "clsx";
import { SelectOptions } from "./SelectOptions";
import { useSelectVariant } from "../hooks/useSelectVariant";

export const SelectVariantNode: FC<NodeProps<TNodeData>> = (nodeProps) => {
  const [isOpenSelect, setOpenSelect] = useState(false);
  const { id, isConnectable } = nodeProps;
  const { checkedVariant, label, handleSelectVariant } =
    useSelectVariant(nodeProps);

  return (
    <>
      <Handle
        hidden={id === "1"}
        type="target"
        position={Position.Top}
        style={{ background: "#ADB5BD" }}
        isConnectable={isConnectable}
      />
      <div className="select-container">
        <div className="decoration-block"></div>
        <div
          className={clsx(
            "select-input nodrag",
            isOpenSelect ? "select-open" : ""
          )}
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
            <SelectOptions
              checkedVariant={checkedVariant}
              handleSelectVariant={handleSelectVariant}
            />
          ) : null}
        </div>
      </div>
      <Handle
        hidden={!checkedVariant}
        type="source"
        position={Position.Right}
        id={id}
        style={{ top: "113px", background: "#ADB5BD" }}
        isConnectable={isConnectable}
      />
    </>
  );
};
