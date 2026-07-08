import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Divider,
  Switch,
} from "antd";
import type { TTuitionJobDetail } from "../../../types/jobs.types";

const JobForm = ({
  form,
  loading,
  onFinish,
  record,
}: {
  form: any;
  loading: boolean;
  onFinish: (values: any) => void;
  record?: Partial<TTuitionJobDetail>;
}) => {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={record}
      className="space-y-4!"
    >
      <Divider titlePlacement="start">Contact Details</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name="contact"
          label="Primary Contact"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item name="additional_contact" label="Additional Contact">
          <Input size="large" />
        </Form.Item>
      </div>

      <Divider titlePlacement="start">Basic Information</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item name="title" label="Job Title" rules={[{ required: true }]}>
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Job Status"
          rules={[{ required: true }]}
        >
          <Select
            size="large"
            options={[
              { value: "draft", label: "Draft" },
              { value: "open", label: "Open" },
              { value: "assigned", label: "Assigned" },
              { value: "demo", label: "Demo" },
              { value: "follow-up", label: "Follow-up" },
              { value: "confirmed", label: "Confirmed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
        </Form.Item>
      </div>
      <Form.Item name="job_description" label="Job Description">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Divider titlePlacement="start">Student Information</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name="student_gender"
          label="Student Gender"
          rules={[{ required: true }]}
        >
          <Select
            size="large"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="number_of_students"
          label="No. of Students"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} className="w-full!" size="large" />
        </Form.Item>
      </div>

      <Form.Item
        name="tutoring_type"
        label="Tutoring Type"
        rules={[{ required: true }]}
      >
        <Select
          size="large"
          options={[
            { value: "home", label: "Home" },
            { value: "online", label: "Online" },
            { value: "batch", label: "Batch" },
          ]}
        />
      </Form.Item>

      {/* Education & Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Form.Item
          name={["student_education", "category"]}
          label="Category"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name={["student_education", "course"]}
          label="Course"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name={["student_education", "subjects"]}
          label="Subjects"
          rules={[{ required: true }]}
        >
          <Select mode="tags" size="large" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name={["location", "full_address"]}
          label="Address"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>
        <div className="grid grid-cols-3 gap-2">
          <Form.Item
            name={["location", "country"]}
            label="Country"
            rules={[{ required: true }]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name={["location", "city"]}
            label="City"
            rules={[{ required: true }]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name={["location", "area"]}
            label="Area"
            rules={[{ required: true }]}
          >
            <Input size="small" />
          </Form.Item>
        </div>
      </div>

      <Divider titlePlacement="start">Tutor Requirements</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name="tutor_gender"
          label="Tutor Gender"
          rules={[{ required: true }]}
        >
          <Select
            size="large"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "any", label: "Any" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="tutor_qualification"
          label="Qualifications"
          rules={[{ required: true }]}
        >
          <Select mode="tags" size="large" />
        </Form.Item>
      </div>

      <Divider titlePlacement="start">Schedule & Salary</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Form.Item name={["salary", "min"]} label="Min Salary">
          <InputNumber className="w-full!" size="large" />
        </Form.Item>
        <Form.Item name={["salary", "max"]} label="Max Salary">
          <InputNumber className="w-full!" size="large" />
        </Form.Item>
        <Form.Item
          name={["salary", "rate_type"]}
          label="Rate Type"
          rules={[{ required: true }]}
        >
          <Select
            size="large"
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "per_class", label: "Per Class" },
              { value: "per_week", label: "Per Week" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name={["salary", "negotiable"]}
          label="Negotiable"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        {/* Only for update job */}
        {record?._id && (
          <Form.Item name={["salary", "actual_salary"]} label="Actual Salary">
            <InputNumber className="w-full!" size="large" />
          </Form.Item>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name="days_per_week"
          label="Days per Week"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={7} className="w-full!" size="large" />
        </Form.Item>
        <Form.Item name="preferred_time" label="Preferred Time">
          <Input size="large" />
        </Form.Item>
      </div>

      <Form.Item name="special_requirements" label="Special Requirements">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Button
        type="primary"
        size="large"
        htmlType="submit"
        loading={loading}
        block
      >
        {record?._id ? "Update Job" : "Create Job"}
      </Button>
    </Form>
  );
};

export default JobForm;
