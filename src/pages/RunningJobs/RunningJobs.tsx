import { Dropdown, Input, Select } from "antd";
import { useState } from "react";
import { useGetAllTuitionJobsForAdminQuery } from "../../redux/features/job/jobApi";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import type { ColumnsType } from "antd/es/table";
import type { TTuitionJobListItem } from "../../types/jobs.types";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import UpdateJobModal from "../../components/ui/modal/UpdateJobModal";
import Paragraph from "antd/es/typography/Paragraph";

const RunningJobs = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useGetAllTuitionJobsForAdminQuery({
    search,
    page,
    limit,
    status,
  });
  const columns: ColumnsType<TTuitionJobListItem> = [
    {
      width: 50,
      align: "center",
      title: "S/N",
      dataIndex: "_id",
      key: "_id",
      render: (_, _record, index) => {
        return <>{page * limit + index + 1 - limit}</>;
      },
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
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve(text);
                }, 500);
              }),
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
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: <UpdateJobModal record={record} />,
          },
        ];
        return (
          <Dropdown menu={{ items }}>
            <BsThreeDots className="size-5 mx-auto cursor-pointer" />
          </Dropdown>
        );
      },
    },
  ];
  const handlePageChange = (page: number, size: number) => {
    setPage(page);
    setLimit(size);
  };

  const onSearch = (value: string) => {
    if (value.length < 1) {
      setSearch(undefined);
    } else {
      setSearch(value);
    }
  };
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
          Confirmed Job
        </h2>
        <p className="text-[#838383] font-semibold text-lg">
          {data?.total || 0} confirmed available
        </p>
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
              defaultValue={"all"}
              onChange={(value) => setStatus(value)}
              options={[
                {
                  label: "All",
                  value: "all",
                },
                {
                  label: "Assigned",
                  value: "assigned",
                },
                {
                  label: "Demo",
                  value: "demo",
                },
                {
                  label: "Follow Up",
                  value: "follow-up",
                },
                {
                  label: "Cancelled",
                  value: "cancelled",
                },
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

export default RunningJobs;
