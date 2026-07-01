import type { IncomingQueryType } from "../../../types/index.types";
import type { TTeacher } from "../../../types/teacher.types";
import { teacherApiSlice } from "../../api/httpSlice";

const teacherApi = teacherApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query<IncomingQueryType<TTeacher>, any>({
      query: (params) => ({
        url: "/teachers/admin/private",
        method: "GET",
        params,
      }),
      providesTags: ["Teachers"],
    }),
  }),
});

export const { useGetTeachersQuery } = teacherApi;
