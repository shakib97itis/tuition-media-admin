import type { IncomingQueryType } from "../../../types/index.types";
import type { TAdmin } from "../../../types/admin.types";
import { adminUsersApiSlice } from "../../api/httpSlice";

const adminUsersApi = adminUsersApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<IncomingQueryType<TAdmin>, any>({
      query: (params) => ({
        url: "/admins",
        method: "GET",
        params,
      }),
      providesTags: ["AdminUsers"],
    }),
    getAdminUser: builder.query<TAdmin, string>({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminUsersQuery, useGetAdminUserQuery } = adminUsersApi;
