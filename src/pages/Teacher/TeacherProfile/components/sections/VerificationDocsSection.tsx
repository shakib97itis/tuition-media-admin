import { Card, Col, Descriptions, Empty, Row } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import type { TTeacher } from "../../../../../types/teacher.types";
import { safeRender } from "../../../../../utils/format";

type VerificationDocsSectionProps = { teacher: TTeacher };

const VerificationDocsSection = ({ teacher }: VerificationDocsSectionProps) => {
  const parents = teacher?.parents_info;
  const idDoc = teacher?.identification;
  const certs = teacher?.certifications;

  return (
    <Card
      title="Family & Verification Documents"
      className="shadow-sm border-gray-100"
    >
      <div className="space-y-6!">
        <Descriptions
          title="Parents & Emergency Contacts"
          column={{ xs: 1, sm: 2 }}
          layout="vertical"
          bordered
          size="small"
        >
          <Descriptions.Item label="Father's Name">
            {safeRender(parents?.father_name)}
          </Descriptions.Item>
          <Descriptions.Item label="Father's Phone">
            {safeRender(parents?.father_phone)}
          </Descriptions.Item>
          <Descriptions.Item label="Mother's Name">
            {safeRender(parents?.mother_name)}
          </Descriptions.Item>
          <Descriptions.Item label="Mother's Phone">
            {safeRender(parents?.mother_phone)}
          </Descriptions.Item>
          <Descriptions.Item label="Other Contact">
            {safeRender(parents?.other_contact_name)}
          </Descriptions.Item>
          <Descriptions.Item label="Other Phone">
            {safeRender(parents?.other_contact_phone)}
          </Descriptions.Item>
        </Descriptions>

        <div>
          <div className="ant-descriptions-title mb-3">
            Identification Document
          </div>

          <Card
            size="small"
            type="inner"
            title={
              <span className="capitalize">
                {idDoc?.type
                  ? `${idDoc.type} - ${safeRender(idDoc.number, "No Number Specified")}`
                  : "No Identification Document"}
              </span>
            }
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div className="text-gray-400 text-xs mb-1">Front Image</div>
                <div className="bg-gray-50 rounded border border-dashed p-2 h-40 flex items-center justify-center overflow-hidden">
                  {idDoc?.front_image ? (
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
                  {idDoc?.back_image ? (
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
        </div>

        <div>
          <div className="ant-descriptions-title mb-3">Certifications</div>
          {certs?.length ? (
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
                        title={cert?.type}
                      >
                        <SafetyCertificateOutlined className="text-emerald-600 mr-2" />
                        {safeRender(cert?.type)}
                      </span>
                      <a
                        href={cert?.certificate_url}
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
