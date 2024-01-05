import { Edge } from "reactflow";
import { api } from "./api";

export const edgesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEdgess: builder.query<Edge[], string>({
      query: () => "/edges",
      providesTags: ["Edges"],
    }),
    addEdge: builder.mutation<Edge, Partial<Edge>>({
      query: (body) => ({
        url: "/edges",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetEdgessQuery, useAddEdgeMutation } = edgesApi;
