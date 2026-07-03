import { useState, useMemo } from "react";
import { Dropdown, Input, Select, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";

import DataPagination from "../../../components/common/DataPagination";
import DataTable from "../../../components/common/DataTable";
import TeacherDetailsButton from "./components/TeacherDetailsButton";
import { useGetTeachersQuery } from "../../../redux/features/teacher/teacherApi";
import type { TTeacher } from "../../../types/teacher.types";

const { Paragraph } = Typography;

const AllTeachersProfile = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [_, setTimeframe] = useState<string | undefined>(undefined);
  const [limit, setLimit] = useState(30);

  const { data, isLoading, isFetching } = useGetTeachersQuery({
    search,
    page,
    limit,
  });

  // Memoizing columns protects reference equality and avoids re-allocating array on every render
  const columns = useMemo<ColumnsType<TTeacher>>(
    () => [
      {
        align: "center",
        title: "S/N",
        dataIndex: "_id",
        key: "_id",
        render: (_, _record, index) => page * limit + index + 1 - limit,
      },
      {
        align: "center",
        title: "Name",
        dataIndex: "full_name",
        key: "name",
        render: (text) => <Paragraph className="mb-0">{text}</Paragraph>,
      },
      {
        align: "center",
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        render: (text) => (
          <Paragraph copyable={{ text }} className="mb-0">
            {text}
          </Paragraph>
        ),
      },
      {
        align: "center",
        title: "Additional Phone",
        dataIndex: "additional_phone",
        key: "additional_phone",
        render: (text) =>
          text ? (
            <Paragraph copyable={{ text }} className="mb-0">
              {text}
            </Paragraph>
          ) : (
            <span className="text-gray-400">-</span>
          ),
      },
      {
        align: "center",
        title: "Joined At",
        dataIndex: "created_at",
        key: "created_at",
        render: (text) => (
          <p className="font-medium text-sm leading-5 text-[#151515] capitalize mb-0">
            {text ? moment(text).format("DD MMM YYYY") : "N/A"}
          </p>
        ),
      },
      {
        width: 150,
        align: "center",
        title: "Profile Completion",
        dataIndex: ["profile_completion", "percentage"],
        key: "profile_completion_percentage",
        render: (text) => (
          <p className="font-medium text-sm leading-5 text-[#151515] mb-0">
            {text || 0}%
          </p>
        ),
      },
      {
        width: 100,
        align: "center",
        fixed: "right",
        title: "Action",
        key: "action",
        render: (_, record) => {
          const items = [
            {
              key: "1",
              label: <TeacherDetailsButton teacherId={record._id} />,
            },
          ];
          return (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <BsThreeDots className="size-5 mx-auto cursor-pointer text-gray-600 hover:text-black transition-colors" />
            </Dropdown>
          );
        },
      },
    ],
    [page, limit],
  );

  const handlePageChange = (pageNumber: number, size: number) => {
    setPage(pageNumber);
    setLimit(size);
  };

  const onSearch = (value: string) => {
    setPage(1);
    setSearch(value.trim().length < 1 ? undefined : value.trim());
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            All Teachers
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.total || 0} teachers available
          </p>
        </div>
      </div>

      <div className="sticky -top-5 z-10 bg-white py-2">
        <div className="grid grid-cols-9 gap-2 items-center">
          <Input.Search
            onSearch={onSearch}
            allowClear
            placeholder="Search leads"
            className="text-sm col-span-7 font-medium text-[#5D5D5D]"
          />
          <div className="col-span-2 flex gap-2">
            <Select
              className="w-full"
              defaultValue="all"
              onChange={(value) => {
                setPage(1);
                setTimeframe(value);
              }}
              options={[
                { label: "All", value: "all" },
                { label: "Today", value: "today" },
                { label: "This Week", value: "week" },
                { label: "This Month", value: "month" },
              ]}
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.results || []}
        loading={isLoading || isFetching}
      />

      <DataPagination
        onChange={handlePageChange}
        page={page}
        limit={limit}
        total={data?.total || 0}
      />
    </div>
  );
};

export default AllTeachersProfile;
