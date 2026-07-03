import { Card, Col, Descriptions, Empty, Row } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import type { TTeacher } from "../../../../../types/teacher.types";

type VerificationDocsSectionProps = {
  teacher: TTeacher;
};

const VerificationDocsSection = ({ teacher }: VerificationDocsSectionProps) => {
  const parents = teacher.parents_info;
  const idDoc = teacher.identification;
  const certs = teacher.certifications;

  return (
    <Card
      title="Family & Verification Documents"
      className="shadow-sm border-gray-100"
    >
      <div className="space-y-6!">
        {/* Emergency Contacts Block */}
        {parents ? (
          <Descriptions
            title="Parents & Emergency Contacts"
            column={{ xs: 1, sm: 2 }}
            layout="vertical"
            bordered
            size="small"
          >
            <Descriptions.Item label="Father's Name">
              {parents.father_name ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Father's Phone">
              {parents.father_phone ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Name">
              {parents.mother_name ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Phone">
              {parents.mother_phone ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Other Contact">
              {parents.other_contact_name ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Other Phone">
              {parents.other_contact_phone ?? "N/A"}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Card size="small" title="Parents & Emergency Contacts">
            <span className="text-gray-400 text-sm">
              No parents contact details added yet.
            </span>
          </Card>
        )}

        {/* Identity Verification Attachments */}
        <div>
          <div className="ant-descriptions-title mb-3">
            Identification Document
          </div>
          {idDoc ? (
            <Card
              size="small"
              type="inner"
              title={
                <span className="capitalize">{`${idDoc.type} - ${idDoc.number ?? "No Number Specified"}`}</span>
              }
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <div className="text-gray-400 text-xs mb-1">Front Image</div>
                  <div className="bg-gray-50 rounded border border-dashed p-2 h-40 flex items-center justify-center overflow-hidden">
                    {idDoc.front_image ? (
                      <img
                        src={idDoc.front_image}
                        alt="ID Front"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">
                        No Image Uploaded
                      </span>
                    )}
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="text-gray-400 text-xs mb-1">Back Image</div>
                  <div className="bg-gray-50 rounded border border-dashed p-2 h-40 flex items-center justify-center overflow-hidden">
                    {idDoc.back_image ? (
                      <img
                        src={idDoc.back_image}
                        alt="ID Back"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">
                        No Image Uploaded
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>
          ) : (
            <Card size="small" className="text-center py-4">
              <span className="text-gray-400 text-sm">
                No identification documents uploaded.
              </span>
            </Card>
          )}
        </div>

        {/* Supplementary Certifications */}
        <div>
          <div className="ant-descriptions-title mb-3">Certifications</div>
          {certs && certs.length > 0 ? (
            <Row gutter={[16, 16]}>
              {certs.map((cert, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card
                    size="small"
                    className="border-emerald-100 bg-emerald-50/10 shadow-sm"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span
                        className="font-semibold text-gray-700 truncate"
                        title={cert.type}
                      >
                        <SafetyCertificateOutlined className="text-emerald-600 mr-2" />
                        {cert.type}
                      </span>
                      <a
                        href={cert.certificate_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 text-sm hover:underline shrink-0"
                      >
                        View
                      </a>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No additional certifications listed"
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default VerificationDocsSection;
