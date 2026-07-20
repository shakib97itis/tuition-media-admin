import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useCreateTuitionJobByAdminMutation } from "../../../redux/features/job/jobApi";
import Swal from "sweetalert2";
import { Button, Descriptions, Modal, Typography } from "antd";
import JobForm from "../form/JobForm";
import { IoCreateOutline } from "react-icons/io5";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../hooks/useAppHooks";
import type { TLead } from "../../../types/lead.types";
import moment from "moment";
import { useUpdateLeadMutation } from "../../../redux/features/lead/leadApi";

type CreateJobModalProps = {
  record: TLead;
};

const CreateJobModal = ({ record }: CreateJobModalProps) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const user = useAppSelector(selectCurrentUser);

  const [
    createJob,
    {
      data: jobData,
      isLoading: isJobLoading,
      isSuccess: isJobSuccess,
      isError: isJobError,
      error: jobError,
    },
  ] = useCreateTuitionJobByAdminMutation();

  const [
    updateLead,
    { isLoading: isLeadLoading, isError: isLeadError, error: leadError },
  ] = useUpdateLeadMutation();

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      lead_from: record._id,
      posted_by: user?._id,
    };

    createJob(payload);
    updateLead({ id: record._id, body: { status: "converted" } });
  };

  useEffect(() => {
    if (isJobSuccess) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: jobData?.message || "Job created successfully!",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#0ABAC3",
      });
      setModalOpen(false);
      form.resetFields();
    }

    if (isJobError || isLeadError) {
      const activeError = (jobError || leadError) as any;
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: activeError?.data?.message || "Something went wrong",
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [
    jobData,
    isJobSuccess,
    isJobError,
    isLeadError,
    jobError,
    leadError,
    form,
  ]);

  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };

  const isLoading = isJobLoading || isLeadLoading;

  return (
    <>
      <Button
        type="primary"
        size="middle"
        onClick={() => setModalOpen(true)}
        className="w-full flex gap-1 justify-center items-center"
      >
        <IoCreateOutline className="size-5 text-white" /> Convert Lead to Job
      </Button>
      <Modal
        width={900}
        footer={null}
        title="Create New Job"
        centered
        open={open}
        onCancel={onCancel}
      >
        <div className="my-5">
          <div className="my-5 flex flex-col gap-6">
            {/* Main Lead Details Section */}
            <Descriptions
              bordered
              column={2}
              labelStyle={{ width: 160 }}
              layout="horizontal"
            >
              <Descriptions.Item label="Name" span={1}>
                <Typography.Paragraph
                  className="font-semibold"
                  copyable
                  style={{ margin: 0 }}
                >
                  {record?.name}
                </Typography.Paragraph>
              </Descriptions.Item>

              <Descriptions.Item label="Contact">
                <Typography.Paragraph copyable style={{ margin: 0 }}>
                  {record?.contact}
                </Typography.Paragraph>
              </Descriptions.Item>

              <Descriptions.Item label="Details" span={2}>
                {record?.details}
              </Descriptions.Item>

              <Descriptions.Item label="Lead Source" span={1}>
                <span className="font-semibold">{record?.lead_source}</span>
              </Descriptions.Item>

              <Descriptions.Item label="Lead Status" span={1}>
                <span className="font-semibold">{record?.status}</span>
              </Descriptions.Item>

              <Descriptions.Item label="Assign to" span={2}>
                <span className="font-semibold">
                  {record?.assignedTo?.full_name || "N/A"}
                </span>
              </Descriptions.Item>

              <Descriptions.Item label="Created At">
                {record?.createdAt
                  ? moment(record.createdAt).format("ddd, MMM Do YYYY")
                  : "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="Updated At">
                {record?.updatedAt
                  ? moment(record.updatedAt).format("ddd, MMM Do YYYY")
                  : "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </div>

          <Typography.Title level={3} className="py-3 text-center">
            Job Creation Form
          </Typography.Title>

          <JobForm form={form} loading={isLoading} onFinish={onFinish} />
        </div>
      </Modal>
    </>
  );
};

export default CreateJobModal;
