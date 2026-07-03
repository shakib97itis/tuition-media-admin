// * This component is currently not in use, Keeping this for future.
import { Form, Input, Select, Radio, Button, Card, Divider, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { FormElementProps } from "../modal/UpdateTeacherProfileModal";

const { TextArea } = Input;

const UpdateOverviewSectionForm = ({
  form,
  loading,
  onFinish,
  record,
}: FormElementProps) => {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ ...record }}
      requiredMark="optional"
    >
      <Space orientation="vertical" size={16} className="w-full">
        <Card
          title={
            <div className="flex items-center gap-2 text-gray-800 text-sm font-semibold">
              <UserOutlined className="text-blue-600" />
              <span>Personal & Core Details</span>
            </div>
          }
          size="small"
          className="shadow-sm border-gray-200/80 rounded-xl"
        >
          {/* Strict compact 2-column container layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
            <Form.Item
              name="full_name"
              label="Full Name"
              className="mb-0" // Drops AntD default margins to let grid-gap handle compactness
              rules={[{ required: true, message: "Full name is required" }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              className="mb-0"
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                placeholder="name@example.com"
                disabled
                className="bg-gray-50 cursor-not-allowed text-gray-400"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Primary Contact Number"
              className="mb-0"
              rules={[{ required: true, message: "Primary phone is required" }]}
            >
              <Input placeholder="017XXXXXXXX" />
            </Form.Item>

            <Form.Item
              name="additional_phone"
              label="Alternative Contact Number"
              className="mb-0"
            >
              <Input placeholder="01XXXXXXXXX" />
            </Form.Item>

            <Form.Item name="gender" label="Gender" className="mb-0">
              <Radio.Group className="w-full flex gap-4 pt-1.5">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="religion" label="Religion" className="mb-0">
              <Input placeholder="e.g. Islam" />
            </Form.Item>

            <Form.Item name="blood_group" label="Blood Group" className="mb-0">
              <Select
                placeholder="Select Blood Group"
                allowClear
                className="w-full"
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <Select.Option key={bg} value={bg}>
                      {bg}
                    </Select.Option>
                  ),
                )}
              </Select>
            </Form.Item>

            <Form.Item
              name="marital_status"
              label="Marital Status"
              className="mb-0"
            >
              <Radio.Group className="pt-1.5">
                <Radio value="unmarried">Unmarried</Radio>
                <Radio value="married">Married</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Biography spans across full horizontal width inside a 2-column structure */}
            <div className="md:col-span-2">
              <Form.Item
                name="about_me"
                label="About Me (Bio Profile Summary)"
                className="mb-0"
              >
                <TextArea
                  rows={3}
                  placeholder="Describe your pedagogical approach and teaching strengths..."
                  maxLength={1000}
                  showCount
                />
              </Form.Item>
            </div>
          </div>

          <Divider className="my-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Address Information
          </Divider>

          {/* Unified structural alignment matching the primary grid parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
            <Form.Item
              name="present_address"
              label="Present Address"
              className="mb-0"
            >
              <TextArea
                autoSize={{ minRows: 2, maxRows: 3 }}
                placeholder="Current residential location details..."
              />
            </Form.Item>

            <Form.Item
              name="permanent_address"
              label="Permanent Address"
              className="mb-0"
            >
              <TextArea
                autoSize={{ minRows: 2, maxRows: 3 }}
                placeholder="Permanent family domicile details..."
              />
            </Form.Item>
          </div>
        </Card>

        {/* Action controls execution drawer segment */}
        <div className="flex justify-end mt-1">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            className="px-6 font-medium shadow-sm"
          >
            Update Profile
          </Button>
        </div>
      </Space>
    </Form>
  );
};

export default UpdateOverviewSectionForm;
