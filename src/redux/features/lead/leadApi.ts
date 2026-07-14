import type { IncomingQueryType } from "../../../types/index.types";
import type { TLead } from "../../../types/lead.types";
import { leadApiSlice } from "../../api/httpSlice";

const leadApi = leadApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLead: builder.mutation({
      query: (body) => ({
        url: "/leads/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["NewLeads", "AssignedLeads", "AssignedOwnLeads"],
    }),

    getAllLeads: builder.query<IncomingQueryType<TLead>, any>({
      query: (params) => ({
        url: "/leads/all",
        method: "GET",
        params,
      }),
      providesTags: ["AllLeads"],
    }),

    getNewLeads: builder.query<IncomingQueryType<TLead>, any>({
      query: (params) => ({
        url: "/leads/new",
        method: "GET",
        params,
      }),
      providesTags: ["NewLeads"],
    }),

    getAssignedLeads: builder.query<IncomingQueryType<any>, any>({
      query: (params) => ({
        url: "/leads/assigned",
        method: "GET",
        params,
      }),
      providesTags: ["AssignedLeads"],
    }),

    getAssignedOwnLeads: builder.query<IncomingQueryType<any>, any>({
      query: ({ id, params }) => ({
        url: `/leads/assigned/own/${id}`,
        method: "GET",
        params,
      }),
      providesTags: ["AssignedOwnLeads"],
    }),

    leadAssign: builder.mutation({
      query: ({ id, body }) => ({
        url: `/leads/assigned/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [
        "AllLeads",
        "NewLeads",
        "AssignedLeads",
        "AssignedOwnLeads",
      ],
    }),
    
    updateLead: builder.mutation({
      query: ({ id, body }) => ({
        url: `/leads/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [
        "AllLeads",
        "NewLeads",
        "AssignedLeads",
        "AssignedOwnLeads",
      ],
    }),
    // ! need to transfer it to it's own feature folder (directLeads).
    getDirectLeads: builder.query<IncomingQueryType<TLead>, any>({
      query: (params) => ({
        url: "/direct-leads",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useCreateLeadMutation,
  useGetAssignedLeadsQuery,
  useGetNewLeadsQuery,
  useGetAssignedOwnLeadsQuery,
  useLeadAssignMutation,
  useUpdateLeadMutation,
  useGetDirectLeadsQuery,
  useGetAllLeadsQuery,
} = leadApi;
