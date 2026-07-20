import { Button, Form, Input } from "antd";

type TProp = {
  form: any;
  loading: boolean;
  onFinish: any;
  record?: any;
};

const CreateLeadForm = ({ form, loading, onFinish, record }: TProp) => {
  return (
    <Form
      onFinish={onFinish}
      form={form}
      layout="vertical"
      initialValues={{}}
      className="space-y-5"
    >
      <div className="">
        <Form.Item
          name="lead_source"
          label="Lead Source"
          className="m-0!"
          rules={[{ required: true }]}
          initialValue={record?.leadSource}
        >
          <Input size="large" placeholder="Enter Source" />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Form.Item
          name="name"
          label="Name"
          className="m-0!"
          rules={[{ required: true }]}
          initialValue={record?.name}
        >
          <Input size="large" placeholder="Enter lead name" />
        </Form.Item>
        <Form.Item
          name="contact"
          label="Contact"
          className="m-0!"
          initialValue={record?.contact}
          rules={[{ required: true }]}
        >
          <Input size="large" placeholder="Enter lead phone" />
        </Form.Item>
      </div>
      <Form.Item
        className="m-0"
        name="details"
        label="Details"
        initialValue={record?.details}
      >
        <Input.TextArea rows={4} placeholder="Enter a small description" />
      </Form.Item>
      <div className="flex justify-end">
        <Form.Item className="m-0!">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            {record && Object.keys(record).length > 0
              ? "Update Academy"
              : "Create Academy"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateLeadForm;
