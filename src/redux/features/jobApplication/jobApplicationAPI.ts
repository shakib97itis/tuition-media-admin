import type { IncomingQueryType } from "../../../types/index.types";
import type { TJobApplication } from "../../../types/jobApplication.types";
import { jobApplicationApiSlice } from "../../api/httpSlice";

const jobApplicationApi = jobApplicationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationsForAdmin: builder.query<
      IncomingQueryType<TJobApplication>,
      any
    >({
      query: (jobId) => ({
        url: `/apply-applications/admin/job/${jobId}`,
        method: "GET",
      }),
      providesTags: ["jobApplication"],
    }),
    sourceTeacherByAdmin: builder.mutation({
      query: (body) => ({
        url: "/apply-applications/admin/source-teacher",
        method: "POST",
        body,
      }),
      invalidatesTags: ["jobApplication"],
    }),
    updateApplicationStatusByAdmin: builder.mutation({
      query: ({ id, body }) => ({
        url: `/apply-applications/admin/application/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["jobApplication"],
    }),
  }),
});

export const {
  useGetApplicationsForAdminQuery,
  useSourceTeacherByAdminMutation,
  useUpdateApplicationStatusByAdminMutation,
} = jobApplicationApi;
