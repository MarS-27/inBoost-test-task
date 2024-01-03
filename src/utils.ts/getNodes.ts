import { createAsyncThunk } from "@reduxjs/toolkit";
import { TNode } from "../types/types";

const MOCKAPI_URL = import.meta.env.VITE_MOCKAPI_URL;

export const fetchNodes = createAsyncThunk<TNode[]>(
  "nodes/fetchNodes",
  async () => {
    try {
      const res = await fetch(`${MOCKAPI_URL}/nodes`);

      if (!res.ok) {
        throw new Error("Error when fetch nodes!");
      }

      const nodes = await res.json();

      return nodes;
    } catch (error) {
      console.log(error);
    }
  }
);
