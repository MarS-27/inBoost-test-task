type TPosition = {
  x: number;
  y: number;
};

type TData = {
  label: string;
};

export type TNode = {
  id: string;
  position: TPosition;
  data: TData;
};

export type TNodesReducerState = {
  nodes: TNode[];
};
