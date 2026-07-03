import type {
  IncomingQueryType,
  TGlobalResponse,
} from "../../../types/index.types";
import type { TTeacher } from "../../../types/teacher.types";
import { teacherApiSlice } from "../../api/httpSlice";

const teacherApi = teacherApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query<IncomingQueryType<TTeacher>, any>({
      query: (params) => ({
        url: "/teachers",
        method: "GET",
        params,
      }),
      providesTags: ["Teachers"],
    }),
    getTeacher: builder.query<TGlobalResponse<TTeacher>, any>({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "GET",
      }),
      providesTags: ["Teacher"],
    }),
    updateTeacher: builder.mutation({
      query: ({ id, body }) => ({
        url: `/teachers/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Teachers", "Teacher"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherQuery,
  useUpdateTeacherMutation,
} = teacherApi;
