import { Button, Form, Input, Table } from "antd";

type TProp = {
  form: any;
  loading: boolean;
  onFinish: any;
  record?: any;
  adminsList: any[];
  searchText: string;
  setSearchText: (value: string) => void;
  selectedAdminKey: string | null;
  setSelectedAdminKey: (key: string | null) => void;
};

const TABLE_COLUMNS = [
  { title: "Name", dataIndex: "full_name", key: "full_name" },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (text: string) => text || "N/A",
  },
  { title: "Email", dataIndex: "email", key: "email" },
];

const AssignLeadForm = ({
  form,
  loading,
  onFinish,
  adminsList,
  searchText,
  setSearchText,
  selectedAdminKey,
  setSelectedAdminKey,
}: TProp) => {
  return (
    <Form
      onFinish={onFinish}
      form={form}
      layout="vertical"
      className="space-y-5"
    >
      {/* Search Input Area */}
      <div>
        <Input.Search
          size="large"
          placeholder="Search admin by name or phone number..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="w-full"
        />
      </div>

      {/* Admin Grid Directory */}
      <div className="border rounded-md overflow-hidden">
        <Table
          dataSource={adminsList}
          columns={TABLE_COLUMNS}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          size="small"
          rowSelection={{
            type: "radio",
            selectedRowKeys: selectedAdminKey ? [selectedAdminKey] : [],
            onChange: (keys) => setSelectedAdminKey(keys[0] as string),
          }}
          onRow={(rowRecord) => ({
            onClick: () => setSelectedAdminKey(rowRecord._id),
            className: "cursor-pointer",
          })}
        />
      </div>

      {/* CTA Action Control Footer */}
      <div className="flex justify-end pt-2">
        <Form.Item className="m-0!">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            className="bg-[#0ABAC3] hover:bg-[#09a3ab] border-none"
          >
            Update Assignment
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AssignLeadForm;
