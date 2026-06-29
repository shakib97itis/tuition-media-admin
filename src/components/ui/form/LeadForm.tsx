import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetAdminUsersQuery } from "../../../redux/features/admins/adminUsersApi";
import { ROLE } from "../../../types/role";

type TProp = {
  form: any;
  loading: boolean;
  onFinish: any;
  record?: any;
};

const LeadForm = ({ form, loading, onFinish, record }: TProp) => {
  const isEditing = record && Object.keys(record).length > 0;
  const userRole = useSelector(selectCurrentUser)?.role;

  // Fetch admins if editing mode is active and user is not teleSales
  const { data: adminUsersData, isLoading: isAdminUsersLoading } =
    useGetAdminUsersQuery(null, {
      skip: !isEditing || userRole === ROLE.teleSales,
    });

  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue({
        name: record.name,
        contact: record.contact,
        status: record.status,
        assignedTo: record.assignedTo,
        details: record.details,
        newFollowUpNote: "",
      });
    } else {
      form.resetFields();
    }
  }, [record, form, isEditing]);

  return (
    <Form
      onFinish={onFinish}
      form={form}
      layout="vertical"
      className="space-y-5"
    >
      <div className="grid grid-cols-2 gap-5">
        <Form.Item
          name="name"
          label="Name"
          className="m-0!"
          rules={[{ required: true, message: "Please enter lead name" }]}
        >
          <Input size="large" placeholder="Enter lead name" />
        </Form.Item>

        <Form.Item
          name="contact"
          label="Contact"
          className="m-0!"
          rules={[{ required: true, message: "Please enter contact number" }]}
        >
          <Input size="large" placeholder="Enter lead phone" />
        </Form.Item>
      </div>

      {/* STATUS SELECT (Visible during edit for Admin and TeleSales) */}
      {isEditing && userRole !== ROLE.teleMarketing && (
        <div className="grid grid-cols-1 gap-5">
          <Form.Item
            name="status"
            label="Status"
            className="m-0!"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select size="large" placeholder="Select Lead Status">
              <Select.Option
                value="new"
                disabled={record?.status && record.status !== "new"}
              >
                New
              </Select.Option>
              <Select.Option value="assigned">Assigned</Select.Option>
              <Select.Option value="interested">Interested</Select.Option>
              <Select.Option value="converted">Converted</Select.Option>
              <Select.Option value="blocked">Blocked</Select.Option>
            </Select>
          </Form.Item>
        </div>
      )}

      {/* ASSIGN TO SELECT (Visible during edit for Admin and TeleMarketing) */}
      {isEditing && userRole !== ROLE.teleSales && (
        <div className="grid grid-cols-1 gap-5">
          <Form.Item name="assignedTo" label="Assign To" className="m-0!">
            <Select
              size="large"
              placeholder="Select Admin"
              loading={isAdminUsersLoading}
              allowClear={!record?.assignedTo}
            >
              {adminUsersData?.results?.map((admin: any) => (
                <Select.Option key={admin._id} value={admin._id}>
                  {admin.full_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      )}

      <Form.Item className="m-0!" name="details" label="Details">
        <Input.TextArea rows={3} placeholder="Enter lead description/details" />
      </Form.Item>

      <Form.Item
        className="mt-5!"
        name="newFollowUpNote"
        label="Add Follow-up Note (Optional)"
      >
        <Input.TextArea
          rows={3}
          placeholder="Type anything discussed during this follow-up..."
        />
      </Form.Item>

      <div className="flex justify-end">
        <Form.Item className="m-0!">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            {isEditing ? "Update Lead" : "Create Lead"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LeadForm;
