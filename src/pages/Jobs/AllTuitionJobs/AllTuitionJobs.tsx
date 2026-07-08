import { useState, useMemo } from "react";
import { Input, Select } from "antd";
import moment from "moment";
import Paragraph from "antd/es/typography/Paragraph";
import type { ColumnsType } from "antd/es/table";

// Components & API
import { useGetAllTuitionJobsForAdminQuery } from "../../../redux/features/job/jobApi";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";

// Types
import type { TTuitionJobListItem } from "../../../types/jobs.types";
import ViewTuitionJobDetailsButton from "../TuitionJobDetails/component/ViewTuitionJobDetailsButton";

const Jobs = () => {
  // --- State Management ---
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(30);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  // --- Data Fetching ---
  const { data, isLoading, isFetching } = useGetAllTuitionJobsForAdminQuery({
    search,
    page,
    limit,
    status,
  });

  // --- Table Configuration ---
  const columns: ColumnsType<TTuitionJobListItem> = useMemo(
    () => [
      {
        width: 50,
        align: "center",
        title: "S/N",
        dataIndex: "_id",
        key: "_id",
        render: (_, _record, index) => <>{page * limit + index + 1 - limit}</>,
      },
      {
        width: 150,
        align: "center",
        title: "Contact",
        dataIndex: "contact",
        key: "contact",
        render: (text) => (
          <Paragraph
            copyable={{
              text: async () =>
                new Promise((resolve) => setTimeout(() => resolve(text), 500)),
            }}
          >
            {text}
          </Paragraph>
        ),
      },
      {
        width: 100,
        align: "center",
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (text) => (
          <p className="font-medium text-sm truncate leading-5 text-[#151515] capitalize">
            {text}
          </p>
        ),
      },
      {
        width: 160,
        align: "center",
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text) => (
          <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
        ),
      },
      {
        width: 160,
        align: "center",
        title: "Generated At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => (
          <p className="font-medium text-sm leading-5 text-[#151515]">
            {moment(text).format("ddd, MMM Do YYYY")}
          </p>
        ),
      },
      {
        width: 100,
        align: "center",
        fixed: "right",
        title: "Action",
        key: "action",
        render: (_, record) => (
          <ViewTuitionJobDetailsButton jobId={record._id} />
        ),
      },
    ],
    [page, limit],
  );

  // --- Handlers ---
  const handlePageChange = (page: number, size: number) => {
    setPage(page);
    setLimit(size);
  };

  const handleSearch = (value: string) => {
    setSearch(value.trim() === "" ? undefined : value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value === "all" ? undefined : value);
  };

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="space-y-1">
        <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
          All Tuition Jobs
        </h2>
        <p className="text-[#838383] font-semibold text-lg">
          {data?.total || 0} Tuition Jobs available
        </p>
      </div>

      {/* Filter Section */}
      <div className="sticky -top-5 z-10 bg-white py-2">
        <div className="grid grid-cols-9 gap-2 items-center">
          <Input.Search
            onSearch={handleSearch}
            allowClear
            placeholder="Search leads"
            className="text-sm col-span-7 font-medium text-[#5D5D5D]"
          />
          <div className="col-span-2">
            <Select
              className="w-full"
              defaultValue={"all"}
              onChange={handleStatusChange}
              options={[
                { label: "All", value: "all" },
                { label: "Assigned", value: "assigned" },
                { label: "Demo", value: "demo" },
                { label: "Follow Up", value: "follow-up" },
                { label: "Cancelled", value: "cancelled" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data?.results || []}
        loading={isLoading || isFetching}
      />

      {/* Pagination */}
      <DataPagination
        onChange={handlePageChange}
        page={page}
        limit={limit}
        total={data?.total || 0}
      />
    </div>
  );
};

export default Jobs;
