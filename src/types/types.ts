import { Node } from "reactflow";

export type TNodeData = {
  label: string;
  checkedVariant: string;
};

export type TCustomNode = Node<TNodeData>;

export type TNodesReducerState = {
  nodes: TCustomNode[];
};
