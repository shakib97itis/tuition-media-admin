import { useEffect } from "react";
import { Button, Form, type FormInstance, Input } from "antd";
import type { TLead } from "../../../types/lead.types";

type TProp = {
  form: FormInstance;
  loading: boolean;
  onFinish: (values: any) => void;
  record: TLead;
};

const UpdateLeadForm = ({ form, loading, onFinish, record }: TProp) => {
  // Sync the form fields whenever the record data changes
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        name: record.name,
        contact: record.contact,
        details: record.details,
        lead_source: record.lead_source,
        status: record.status,
        newFollowUpNote: "", // Reset follow-up input field for a new note
      });
    } else {
      form.resetFields();
    }
  }, [record, form]);

  return (
    <Form
      onFinish={onFinish}
      form={form}
      layout="vertical"
      className="space-y-5"
    >
      <div className="grid grid-cols-2 gap-5">
        <Form.Item
          name="lead_source"
          label="Lead Source"
          className="m-0! col-span-2!"
          rules={[{ required: true, message: "Please enter lead from info" }]}
        >
          <Input size="large" placeholder="Please enter lead from info" />
        </Form.Item>

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

      <Form.Item className="m-0!" name="details" label="Details (Optional)">
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
            Update Lead
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default UpdateLeadForm;
