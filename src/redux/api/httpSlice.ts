import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefreshToken } from "./baseQuery";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

export const leadApiSlice = createApi({
  reducerPath: "leadApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["AllLeads", "NewLeads", "AssignedLeads", "AssignedOwnLeads"],
  endpoints: () => ({}),
});

export const jobApiSlice = createApi({
  reducerPath: "jobApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["NewJobs", "RunningJobs"],
  endpoints: () => ({}),
});

export const adminUsersApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["AdminUsers"],
  endpoints: () => ({}),
});
