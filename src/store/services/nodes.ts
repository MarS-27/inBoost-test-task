import { type TCustomNode } from "../../types/types";
import { api } from "./api";

export const nodesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNodes: builder.query<TCustomNode[], string>({
      query: () => "/nodes",
      providesTags: ["Nodes"],
    }),
    addNode: builder.mutation<TCustomNode, Partial<TCustomNode>>({
      query: (body) => ({
        url: "/nodes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Nodes"],
    }),
    updateNode: builder.mutation<TCustomNode, Partial<TCustomNode>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/nodes/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Nodes"],
    }),
  }),
});

export const { useGetNodesQuery, useAddNodeMutation, useUpdateNodeMutation } =
  nodesApi;
