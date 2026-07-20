import { Button, Modal, Descriptions, Tag, Timeline, Card } from "antd";
import moment from "moment";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function ViewLeadDetailsModal({ record }: any) {
  const [open, setModalOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalOpen(true)}
        className="w-full flex gap-1 justify-center items-center"
      >
        <CiEdit className="size-5 text-white" />
        Lead Details
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
            <Descriptions.Item label="Name" span={1}>
              <span className="font-semibold">{record?.name}</span>
            </Descriptions.Item>

            <Descriptions.Item label="Contact">
              {record?.contact}
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

          {/* History / Follow-Ups Section */}
          <Card
            title="Follow-up History"
            size="small"
            className="bg-gray-50/50"
          >
            {record?.followUps && record.followUps.length > 0 ? (
              <Timeline
                className="mt-4"
                reverse={true}
                items={record.followUps.map((history: any, index: number) => ({
                  color: "blue",
                  children: (
                    <div key={index} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {moment(history.createdAt).format("ddd, MMM Do YYYY")}
                        </span>
                        {history.doneBy && (
                          <Tag
                            color="purple"
                            className="text-[10px] px-1 py-0 m-0"
                          >
                            By:{" "}
                            {typeof history.doneBy === "object"
                              ? history.doneBy.full_name
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
