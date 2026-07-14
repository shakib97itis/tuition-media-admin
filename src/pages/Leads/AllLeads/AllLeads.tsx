import { useState } from "react";
import { useGetAllLeadsQuery } from "../../../redux/features/lead/leadApi";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import { Dropdown, Input, Select, Typography } from "antd";
import CreateLeadModal from "../../../components/ui/modal/CreateLeadModal";
import type { ColumnsType } from "antd/es/table";
import type { TLead } from "../../../types/lead.types";
import Paragraph from "antd/es/typography/Paragraph";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import ViewLeadDetailsModal from "../../../components/ui/modal/ViewLeadDetailsModal";

const AllLeads = () => {
  const { Text } = Typography;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [_, setTimeframe] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  const { data, isLoading, isFetching } = useGetAllLeadsQuery({
    search,
    page,
    limit,
    status: status || undefined,
  });

  const columns: ColumnsType<TLead> = [
    {
      align: "center",
      title: "S/N",
      dataIndex: "_id",
      key: "_id",
      render: (_, _record, index) => {
        return <>{page * limit + index + 1 - limit}</>;
      },
    },
    {
      align: "center",
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD MMM YYYY")}
        </p>
      ),
    },
    {
      width: 150,
      align: "center",
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (assignedTo) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {assignedTo?.full_name || "N/A"}
        </p>
      ),
    },
    {
      align: "center",
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Paragraph>{text}</Paragraph>,
    },
    {
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
      align: "center",
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      align: "center",
      title: "Last follow up note",
      dataIndex: "followUps",
      key: "followUps",
      render: (followUps) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {followUps?.length > 0
            ? `${followUps[followUps?.length - 1]?.note} - ${moment(followUps[followUps?.length - 1]?.createdAt).format("DD MMM YYYY")}`
            : "No followup note yet"}
        </p>
      ),
    },
    {
      align: "center",
      title: "Lead Source",
      dataIndex: "details",
      key: "details",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
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
            label: <ViewLeadDetailsModal record={record} />,
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
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            All Leads
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.total || 0} leads available
          </p>
        </div>
        <CreateLeadModal />
      </div>
      <div className="sticky -top-5 z-10 bg-white py-2">
        <div className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-6 flex flex-col gap-1.5">
            <Text className="text-sm font-medium">Search</Text>
            <Input.Search
              onSearch={onSearch}
              allowClear
              placeholder="Search leads"
              className="text-sm font-medium text-[#5D5D5D]"
            />
          </div>
          <div className="col-span-3 flex flex-col gap-1.5">
            <Text className="text-sm font-medium">Filter by Status</Text>
            <Select
              className="w-full"
              placeholder="Filter by status"
              onChange={(value) => setStatus(value)}
              options={[
                { label: "All", value: "" },
                { label: "New", value: "new" },
                { label: "Assigned", value: "assigned" },
                { label: "Interested", value: "interested" },
                { label: "Converted", value: "converted" },
                { label: "Blocked", value: "blocked" },
              ]}
            />
          </div>
          <div className="col-span-3 flex flex-col gap-1.5">
            <Text className="text-sm font-medium">Filter by Time</Text>
            <Select
              className="w-full"
              defaultValue={"all"}
              onChange={(value) => setTimeframe(value)}
              options={[
                {
                  label: "All",
                  value: "all",
                },
                {
                  label: "Today",
                  value: "today",
                },
                {
                  label: "This Week",
                  value: "week",
                },
                {
                  label: "This Month",
                  value: "month",
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

export default AllLeads;
