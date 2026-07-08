import { useParams } from "react-router-dom";
import {
  Card,
  Descriptions,
  Tag,
  Row,
  Col,
  Typography,
  Badge,
  Button,
  Spin,
  Result,
  Space,
} from "antd";
import Swal from "sweetalert2";
import {
  PhoneOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

// Internal Components & API Hooks
import ManageApplications from "./component/ManageApplications";
import UpdateJobModal from "../../../components/ui/modal/UpdateJobModal";
import { useGetTuitionJobByIdForAdminQuery } from "../../../redux/features/job/jobApi";
import { useUpdateApplicationStatusByAdminMutation } from "../../../redux/features/jobApplication/jobApplicationAPI";

const { Title, Text } = Typography;

/**
 * UI Configuration for job statuses.
 * Moved outside the component to prevent re-instantiation on renders.
 */
const STATUS_CONFIG: Record<
  string,
  {
    status: "success" | "processing" | "error" | "default" | "warning";
    color: string;
  }
> = {
  draft: { status: "default", color: "gray" },
  open: { status: "processing", color: "blue" },
  assigned: { status: "success", color: "cyan" },
  demo: { status: "warning", color: "orange" },
  "follow-up": { status: "warning", color: "gold" },
  confirmed: { status: "success", color: "green" },
  cancelled: { status: "error", color: "red" },
};

const TuitionJobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();

  // --- API Queries & Mutations ---
  const {
    data: jobResponse,
    isLoading: isJobLoading,
    isError: isJobError,
    error: jobError,
  } = useGetTuitionJobByIdForAdminQuery(jobId);

  const [updateStatus] = useUpdateApplicationStatusByAdminMutation();

  const job = jobResponse?.results;

  /**
   * Handles status updates for applications.
   * Includes success/error feedback via SweetAlert2.
   */
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus({ id, body: { status } }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Application ${id} moved to ${status}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err?.data?.message || "Something went wrong while updating.",
      });
    }
  };

  // --- Loading & Error States ---
  if (isJobLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <Spin size="large" tip="Fetching job details..." />
      </div>
    );
  }

  if (isJobError || !job) {
    return (
      <Result
        status="error"
        title="Failed to Load"
        subTitle={(jobError as any)?.data?.message || "Job not found."}
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        }
      />
    );
  }

  // --- Main Render ---
  return (
    <div style={{ padding: "24px" }} className="space-y-6!">
      {/* Header Section */}
      <Card className="shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <Title level={3} className="m-0">
              {job.title}
            </Title>
            <Text type="secondary">ID: {job._id}</Text>
            <div className="mt-2">
              <Badge
                status={STATUS_CONFIG[job.status]?.status || "default"}
                text={job.status?.toUpperCase() || "N/A"}
              />
              <span className="mx-2 text-gray-300">|</span>
              <Text type="secondary">Serial: {job.serial_number || "N/A"}</Text>
            </div>
          </div>
          <UpdateJobModal record={job} />
        </div>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Left Column: Job Info */}
        <Col xs={24} lg={16} className="space-y-6!">
          <Card title="Job Description" size="small">
            <p>{job.job_description}</p>
          </Card>

          <Card title="Student Information" size="small">
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Number of Students">
                {job.number_of_students}
              </Descriptions.Item>
              <Descriptions.Item label="Student Gender" className="capitalize">
                {job.student_gender}
              </Descriptions.Item>
              <Descriptions.Item label="Schedule">
                {job.days_per_week} days/week
              </Descriptions.Item>
              <Descriptions.Item label="Preferred Time">
                {job.preferred_time}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Teacher Requirement" size="small">
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Category">
                {job.student_education?.category}
              </Descriptions.Item>
              <Descriptions.Item label="Course">
                {job.student_education?.course}
              </Descriptions.Item>
              <Descriptions.Item label="Subjects">
                {job.student_education?.subjects?.map((sub: string) => (
                  <Tag key={sub} color="purple">
                    {sub}
                  </Tag>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Right Column: Metadata */}
        <Col xs={24} lg={8} className="space-y-6!">
          <Card title="Contact Information" size="small">
            <div className="flex flex-col gap-2">
              <Text>
                <PhoneOutlined /> <strong>Primary:</strong> {job.contact}
              </Text>
              <Text>
                <PhoneOutlined /> <strong>Alt:</strong>{" "}
                {job.additional_contact || "N/A"}
              </Text>
            </div>
          </Card>

          <Card title="Compensation" size="small">
            <div className="text-2xl font-bold text-emerald-600">
              {job.salary?.min} - {job.salary?.max} BDT
            </div>
            <Space className="mt-2">
              <Tag color="green">{job.salary?.rate_type}</Tag>
              {job.salary?.negotiable && <Tag color="orange">Negotiable</Tag>}
            </Space>
          </Card>

          <Card title="System Details" size="small">
            <Descriptions column={1} size="small" colon={false}>
              <Descriptions.Item
                label={
                  <>
                    <UserOutlined /> Admin
                  </>
                }
              >
                {typeof job.assigned_admin === "object"
                  ? job.assigned_admin?.full_name
                  : job.assigned_admin || "Unassigned"}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <FileTextOutlined /> Note
                  </>
                }
              >
                <Text italic>
                  {job.conversion_note || "No notes provided."}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Applications Management Section */}
      <Card
        title="Manage Applications"
        className="shadow-sm"
        extra={
          <Button type="primary" icon={<UserOutlined />}>
            Source Teacher
          </Button>
        }
      >
        <ManageApplications
          jobId={jobId!}
          onStatusUpdate={handleStatusChange}
        />
      </Card>
    </div>
  );
};

export default TuitionJobDetails;
