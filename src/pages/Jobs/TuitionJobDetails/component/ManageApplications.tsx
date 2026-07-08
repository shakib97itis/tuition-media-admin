import React, { useMemo } from "react";
import { Table, Tabs, Tag, Space, Button, Spin, Result } from "antd";
import type { TJobApplication } from "../../../../types/jobApplication.types";
import { useGetApplicationsForAdminQuery } from "../../../../redux/features/jobApplication/jobApplicationAPI";

// --- Types & Constants ---
type ApplicationStatus = "applied" | "shortlisted" | "rejected" | "hired";

interface ManageApplicationsProps {
  jobId: string;
  onStatusUpdate?: (id: string, status: ApplicationStatus) => void;
}

/**
 * Generates table columns based on the current tab status.
 * Defined outside the component to prevent recreation on re-renders.
 */
const getColumnDefinitions = (
  status: ApplicationStatus,
  onStatusUpdate?: (id: string, status: ApplicationStatus) => void,
) => [
  {
    title: "SN",
    dataIndex: "applicant",
    key: "serial_no",
    render: (applicant: any) => applicant?.serial_number || "N/A",
  },
  {
    title: "Applicant",
    dataIndex: "applicant",
    key: "full_name",
    render: (applicant: any) => applicant?.full_name || "Unknown",
  },
  {
    title: "Phone",
    dataIndex: "applicant",
    key: "phone",
    render: (applicant: any) => applicant?.phone || "N/A",
  },
  {
    title: "Applied At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: TJobApplication) => (
      <Space>
        {status === "applied" && (
          <>
            <Button
              size="small"
              type="primary"
              onClick={() => onStatusUpdate?.(record._id, "shortlisted")}
            >
              Shortlist
            </Button>
            <Button
              size="small"
              danger
              onClick={() => onStatusUpdate?.(record._id, "rejected")}
            >
              Reject
            </Button>
          </>
        )}

        {status === "shortlisted" && (
          <>
            <Button
              size="small"
              type="primary"
              onClick={() => onStatusUpdate?.(record._id, "hired")}
            >
              Hire
            </Button>
            <Button
              size="small"
              danger
              onClick={() => onStatusUpdate?.(record._id, "rejected")}
            >
              Reject
            </Button>
          </>
        )}

        {status === "rejected" && (
          <Button
            size="small"
            type="primary"
            onClick={() => onStatusUpdate?.(record._id, "shortlisted")}
          >
            Re-Shortlist
          </Button>
        )}

        {status === "hired" && <Tag color="success">Hired</Tag>}
      </Space>
    ),
  },
];

const ManageApplications: React.FC<ManageApplicationsProps> = ({
  jobId,
  onStatusUpdate,
}) => {
  const {
    data: appResponse,
    isLoading,
    isError,
  } = useGetApplicationsForAdminQuery(jobId);

  const applications = appResponse?.results || [];

  // --- Memoized Tabs Configuration ---
  const tabItems = useMemo(() => {
    const statuses: ApplicationStatus[] = [
      "applied",
      "shortlisted",
      "rejected",
      "hired",
    ];

    return statuses.map((status) => {
      const filteredApps = applications.filter((a) => a.status === status);

      return {
        key: status,
        label: `${status.charAt(0).toUpperCase() + status.slice(1)} (${filteredApps.length})`,
        children: (
          <Table
            dataSource={filteredApps}
            columns={getColumnDefinitions(status, onStatusUpdate)}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        ),
      };
    });
  }, [applications, onStatusUpdate]);

  // --- Loading & Error States ---
  if (isLoading)
    return <Spin size="small" description="Loading applications..." />;
  if (isError)
    return <Result status="warning" title="Could not load applications" />;

  return <Tabs defaultActiveKey="applied" items={tabItems} />;
};

export default ManageApplications;
