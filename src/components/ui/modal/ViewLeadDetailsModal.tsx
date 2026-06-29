import { Button, Modal, Descriptions, Tag, Timeline, Card } from "antd";
import moment from "moment";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function ViewLeadDetailsModal({ record }: any) {
  const [open, setModalOpen] = useState(false);

  // Destructuring the record object, including the followUps history array
  const {
    name,
    contact,
    details,
    status,
    createdAt,
    updatedAt,
    followUps,
    assignedTo,
  } = record || {};

  // Helper function to color-code the status tag
  const getStatusColor = (statusName: string) => {
    switch (statusName?.toLowerCase()) {
      case "new":
        return "blue";
      case "active":
        return "green";
      case "pending":
        return "orange";
      default:
        return "default";
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalOpen(true)}
        className="w-full flex gap-1 justify-center items-center"
      >
        <CiEdit className="size-5 text-white" />
        View Details
      </Button>
      <Modal
        width={800}
        footer={null}
        title="View Lead Details"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <div className="my-5 flex flex-col gap-6">
          {/* Main Lead Details Section */}
          <Descriptions bordered column={2} layout="horizontal">
            <Descriptions.Item label="Name" span={2}>
              <span className="font-semibold">{name}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Assign to" span={2}>
              <span className="font-semibold">
                {assignedTo?.full_name || "N/A"}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label="Contact">{contact}</Descriptions.Item>

            <Descriptions.Item label="Status">
              <Tag color={getStatusColor(status)}>{status?.toUpperCase()}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Details" span={2}>
              {details}
            </Descriptions.Item>

            <Descriptions.Item label="Created At">
              {createdAt ? moment(createdAt).format("ddd, MMM Do YYYY") : "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Updated At">
              {updatedAt ? moment(updatedAt).format("ddd, MMM Do YYYY") : "N/A"}
            </Descriptions.Item>
          </Descriptions>

          {/* History / Follow-Ups Section */}
          <Card
            title="Follow-up History"
            size="small"
            className="bg-gray-50/50"
          >
            {followUps && followUps.length > 0 ? (
              <Timeline
                className="mt-4"
                items={followUps.map((history: any, index: number) => ({
                  color: "blue",
                  children: (
                    <div key={index} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {history.date
                            ? moment(history.date).format("ddd, MMM Do YYYY")
                            : "N/A"}
                        </span>
                        {history.doneBy && (
                          <Tag
                            color="purple"
                            className="text-[10px] px-1 py-0 m-0"
                          >
                            By:{" "}
                            {typeof history.doneBy === "object"
                              ? history.doneBy.name || history.doneBy._id
                              : history.doneBy}
                          </Tag>
                        )}
                      </div>
                      {history.note && (
                        <p className="text-sm text-gray-700 m-0 bg-white p-2 rounded border border-gray-100">
                          {history.note}
                        </p>
                      )}
                    </div>
                  ),
                }))}
              />
            ) : (
              <p className="text-gray-400 text-sm text-center py-4 m-0">
                No history records found.
              </p>
            )}
          </Card>
        </div>
      </Modal>
    </>
  );
}
