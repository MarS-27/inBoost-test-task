import { type Node } from "reactflow";

export type TNodeVariants = {
  id: string;
  variant: string;
};

export type TNodeData = {
  variants: TNodeVariants[];
};

export type TCustomNode = Node<TNodeData>;

export type TNodesReducerState = {
  nodes: TCustomNode[];
};
