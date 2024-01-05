import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const MOCKAPI_URL = import.meta.env.VITE_MOCKAPI_URL;

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: fetchBaseQuery({ baseUrl: MOCKAPI_URL }),
  tagTypes: ["Nodes", "Edges"],
  endpoints: () => ({}),
});
