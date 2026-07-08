import type {
  IncomingQueryType,
  TGlobalResponse,
} from "../../../types/index.types";
import type {
  TTuitionJobDetail,
  TTuitionJobListItem,
} from "../../../types/jobs.types";
import { jobApiSlice } from "../../api/httpSlice";

const jobApi = jobApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTuitionJobByAdmin: builder.mutation({
      query: (body) => ({
        url: "/tuition-jobs/admin/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AllJobs", "RunningJobs"],
    }),
    getAllTuitionJobsForAdmin: builder.query<
      IncomingQueryType<TTuitionJobListItem>,
      any
    >({
      query: (params) => ({
        url: "/tuition-jobs/admin",
        method: "GET",
        params,
      }),
      providesTags: ["AllJobs"],
    }),
    getAllRunningJobsForAdmin: builder.query<
      IncomingQueryType<TTuitionJobListItem>,
      any
    >({
      query: (params) => ({
        url: "/tuition-jobs/admin/running",
        method: "GET",
        params,
      }),
      providesTags: ["RunningJobs"],
    }),
    getTuitionJobByIdForAdmin: builder.query<
      TGlobalResponse<TTuitionJobDetail>,
      any
    >({
      query: (id) => ({
        url: `/tuition-jobs/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleJob"],
    }),
    updateTuitionJobByIdFromAdmin: builder.mutation({
      query: ({ id, body }) => ({
        url: `/tuition-jobs/admin/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AllJobs", "SingleJob", "RunningJobs"],
    }),
  }),
});

export const {
  useCreateTuitionJobByAdminMutation,
  useGetAllTuitionJobsForAdminQuery,
  useGetAllRunningJobsForAdminQuery,
  useGetTuitionJobByIdForAdminQuery,
  useUpdateTuitionJobByIdFromAdminMutation,
} = jobApi;
