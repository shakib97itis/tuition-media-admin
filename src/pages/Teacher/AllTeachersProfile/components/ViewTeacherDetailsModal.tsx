// * This component is currently not in use, Keeping this for future.

import { Button, Modal } from "antd";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import type { TTeacher } from "../../../../types/teacher.types";
import TeacherDetails from "./TeacherDetails";

export default function ViewTeacherDetailsModal({
  record,
}: {
  record: TTeacher;
}) {
  const [open, setModalOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalOpen(true)}
        className="w-full flex gap-1 justify-center items-center"
      >
        <CiEdit className="size-5 text-white" />
        Teacher Details
      </Button>
      <Modal
        width={1000}
        footer={null}
        title="View Teacher Details"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        destroyOnHidden
      >
        <div className="my-5">
          <TeacherDetails teacher={record} />
        </div>
      </Modal>
    </>
  );
}
