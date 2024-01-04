import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCustomNode } from "../../types/types";

const MOCKAPI_URL = import.meta.env.VITE_MOCKAPI_URL;

export const nodesApi = createApi({
  reducerPath: "nodesApi",
  baseQuery: fetchBaseQuery({ baseUrl: MOCKAPI_URL }),
  tagTypes: ["Nodes"],
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
