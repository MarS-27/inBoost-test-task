import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TNode, TNodesReducerState } from "../../types/types";
import { fetchNodes } from "../../utils.ts/getNodes";

const initialState: TNodesReducerState = {
  nodes: [],
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchNodes.fulfilled.type,
      (state, action: PayloadAction<TNode[]>) => {
        state.nodes = action.payload;
      }
    );
  },
});

export default nodesSlice.reducer;
