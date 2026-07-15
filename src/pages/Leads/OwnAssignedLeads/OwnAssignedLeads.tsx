import { useState } from "react";
import { useGetAssignedOwnLeadsQuery } from "../../../redux/features/lead/leadApi";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import { Dropdown, Input, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TLead } from "../../../types/lead.types";
import Paragraph from "antd/es/typography/Paragraph";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import ViewLeadDetailsModal from "../../../components/ui/modal/ViewLeadDetailsModal";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import UpdateLeadModal from "../../../components/ui/modal/UpdateLeadModal";
import CreateJobModal from "../../../components/ui/modal/CreateJobModal";
import CancelLeadButton from "../components/CancelLeadButton";
import BlockLeadButton from "../components/BlockLeadButton";

const OwnAssignedLeads = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [_, setTimeframe] = useState<string | undefined>(undefined);
  const [limit, setLimit] = useState(30);
  const currentUser = useSelector(selectCurrentUser);
  const { data, isLoading, isFetching } = useGetAssignedOwnLeadsQuery({
    id: currentUser?._id,
    search,
    page,
    limit,
  });

  const columns: ColumnsType<TLead> = [
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
      // width: 50,
      align: "center",
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <p className="font-medium text-sm truncate leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      // width: 100,
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
      // width: 200,
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
      // width: 200,
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
          {
            key: "2",
            label: <UpdateLeadModal record={record} />,
          },
          {
            key: "3",
            label: <CreateJobModal lead={record._id} />,
          },
          {
            key: "4",
            label: <CancelLeadButton record={record} />,
          },
          {
            key: "5",
            label: <BlockLeadButton record={record} />,
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
          My Assigned Leads
        </h2>
        <p className="text-[#838383] font-semibold text-lg">
          {data?.total || 0} leads available
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

export default OwnAssignedLeads;
