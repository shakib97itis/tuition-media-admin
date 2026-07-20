import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Divider,
  Switch,
  type FormInstance,
} from "antd";
import type { ITuitionJob } from "../../../types/jobs.types";

import {
  COUNTRY_OPTIONS,
  getCityOptions,
  getAreaOptions,
  CATEGORY_OPTIONS,
  getCourseOptions,
  getSubjectOptions,
  JOB_STATUS_OPTIONS,
  GENDER_OPTIONS,
  TUTORING_TYPE_OPTIONS,
  TUTOR_QUALIFICATION_OPTIONS,
} from "../../../utils/formOptions.utils";

interface JobFormProps {
  form: FormInstance;
  loading: boolean;
  onFinish: (values: Partial<ITuitionJob>) => void;
  record?: Partial<ITuitionJob>;
}

const JobForm = ({ form, loading, onFinish, record }: JobFormProps) => {
  const values = Form.useWatch([], form);

  const selectedCategory =
    values?.student_education?.category ?? record?.student_education?.category;

  const selectedCourse =
    values?.student_education?.course ?? record?.student_education?.course;

  const selectedCountry =
    values?.location?.country ?? record?.location?.country;
  const selectedCity = values?.location?.city ?? record?.location?.city;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        location: { country: "bangladesh", ...record?.location },
        ...record,
      }}
      className="space-y-4"
    >
      <Divider titlePlacement="start">Contact Details</Divider>
      {/* // todo: Add contact validation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name="contact"
          label="Primary Contact"
          rules={[{ required: true, message: "Primary contact is required" }]}
        >
          <Input size="large" placeholder="Enter primary contact" type="tel" />
        </Form.Item>
        <Form.Item name="additional_contact" label="Additional Contact">
          <Input
            size="large"
            placeholder="Enter additional contact (optional)"
            type="tel"
          />
        </Form.Item>
      </div>

      <Divider titlePlacement="start">Basic Information</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name="title"
          label="Job Title"
          rules={[{ required: true, message: "Job title is required" }]}
        >
          <Input
            size="large"
            placeholder="e.g. Need a math tutor for Class 10"
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="Job Status"
          rules={[{ required: true, message: "Job status is required" }]}
        >
          <Select
            size="large"
            options={JOB_STATUS_OPTIONS}
            placeholder="Select status"
          />
        </Form.Item>
      </div>
      <Form.Item name="job_description" label="Job Description">
        <Input.TextArea
          rows={3}
          placeholder="Provide details about the tuition requirement..."
        />
      </Form.Item>

      <Divider titlePlacement="start">Student Information</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name="student_gender"
          label="Student Gender"
          rules={[{ required: true, message: "Student gender is required" }]}
        >
          <Select
            size="large"
            options={GENDER_OPTIONS}
            placeholder="Select gender"
          />
        </Form.Item>
        <Form.Item
          name="number_of_students"
          label="No. of Students"
          rules={[
            { required: true, message: "Number of students is required" },
          ]}
        >
          <InputNumber min={1} className="w-full!" size="large" />
        </Form.Item>
      </div>

      <Form.Item
        name="tutoring_type"
        label="Tutoring Type"
        rules={[{ required: true, message: "Tutoring type is required" }]}
      >
        <Select
          size="large"
          placeholder="Select tutoring type"
          options={TUTORING_TYPE_OPTIONS}
        />
      </Form.Item>

      {/* Education & Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Form.Item
          name={["student_education", "category"]}
          label="Student Education Category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Select
            showSearch={{ optionFilterProp: "label" }}
            placeholder="Select Category"
            className="w-full"
            options={CATEGORY_OPTIONS}
            allowClear
            onChange={() => {
              form.setFieldValue(["student_education", "course"], null);
              form.setFieldValue(["student_education", "subjects"], []);
            }}
          />
        </Form.Item>
        <Form.Item
          name={["student_education", "course"]}
          label="Student Education Course"
          rules={[{ required: true, message: "Course is required" }]}
        >
          <Select
            showSearch={{ optionFilterProp: "label" }}
            placeholder="Select Course"
            className="w-full"
            disabled={!selectedCategory}
            options={getCourseOptions(selectedCategory)}
            allowClear
            onChange={() => {
              form.setFieldValue(["student_education", "subjects"], []);
            }}
          />
        </Form.Item>
        <Form.Item
          name={["student_education", "subjects"]}
          label="Student Education Subjects"
          rules={[{ required: true, message: "Subjects are required" }]}
        >
          <Select
            mode="multiple"
            showSearch={{ optionFilterProp: "label" }}
            placeholder="Select Subjects"
            className="w-full"
            disabled={!selectedCourse}
            options={getSubjectOptions(selectedCategory, selectedCourse)}
            allowClear
          />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name={["location", "full_address"]}
          label="Tuition Full Address"
          rules={[{ required: true, message: "Full address is required" }]}
          className="md:col-span-2"
        >
          <Input size="large" placeholder="House/Road/Area description" />
        </Form.Item>
        <div className="grid grid-cols-3 md:col-span-2 gap-2">
          <Form.Item
            name={["location", "country"]}
            label="Country"
            rules={[{ required: true, message: "Country is required" }]}
          >
            <Select
              placeholder="Select Country"
              options={COUNTRY_OPTIONS}
              defaultValue="bangladesh"
              allowClear
              onChange={() => {
                form.setFieldValue(["location", "city"], null);
                form.setFieldValue(["location", "area"], null);
              }}
            />
          </Form.Item>
          <Form.Item
            name={["location", "city"]}
            label="City"
            rules={[{ required: true, message: "City is required" }]}
          >
            <Select
              showSearch={{ optionFilterProp: "label" }}
              placeholder="Search and select City"
              options={getCityOptions(selectedCountry)}
              disabled={!selectedCountry}
              allowClear
              onChange={() => {
                form.setFieldValue(["location", "area"], null);
              }}
            />
          </Form.Item>
          <Form.Item
            name={["location", "area"]}
            label="Area"
            rules={[{ required: true, message: "Area is required" }]}
          >
            <Select
              showSearch={{ optionFilterProp: "label" }}
              placeholder="Select Areas"
              options={getAreaOptions(selectedCity, selectedCountry)}
              disabled={!selectedCity}
              allowClear
            />
          </Form.Item>
        </div>
      </div>

      <Divider titlePlacement="start">Tutor Requirements</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name="tutor_gender"
          label="Tutor Gender"
          rules={[
            { required: true, message: "Tutor gender preference is required" },
          ]}
        >
          <Select
            size="large"
            options={GENDER_OPTIONS}
            placeholder="Select preference"
          />
        </Form.Item>
        <Form.Item
          name="tutor_qualification"
          label="Qualifications"
          rules={[{ required: true, message: "Qualifications are required" }]}
        >
          <Select
            mode="tags"
            size="large"
            placeholder="Type and press enter (e.g. BUET, DU)"
            options={TUTOR_QUALIFICATION_OPTIONS}
          />
        </Form.Item>
      </div>

      <Divider titlePlacement="start">Schedule & Salary</Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Form.Item name={["salary", "min"]} label="Min Salary">
          <InputNumber
            className="w-full!"
            size="large"
            placeholder="e.g. 5000"
          />
        </Form.Item>
        <Form.Item name={["salary", "max"]} label="Max Salary">
          <InputNumber
            className="w-full!"
            size="large"
            placeholder="e.g. 8000"
          />
        </Form.Item>
        <Form.Item
          name={["salary", "rate_type"]}
          label="Rate Type"
          rules={[{ required: true, message: "Rate type is required" }]}
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
            <InputNumber
              className="w-full!"
              size="large"
              placeholder="Final agreed amount"
            />
          </Form.Item>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          name="days_per_week"
          label="Days per Week"
          rules={[{ required: true, message: "Days per week is required" }]}
        >
          <InputNumber min={1} max={7} className="w-full!" size="large" />
        </Form.Item>
        <Form.Item name="preferred_time" label="Preferred Time">
          <Input size="large" placeholder="e.g. Evening, 04:00 PM" />
        </Form.Item>
      </div>

      <Form.Item name="special_requirements" label="Special Requirements">
        <Input.TextArea rows={3} placeholder="Any specific instructions..." />
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
