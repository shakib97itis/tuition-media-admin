/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useUpdateLeadMutation } from "../../../redux/features/lead/leadApi";

export default function BlockLeadButton({ record }: { record: any }) {
  const leadId = record?._id;

  const [updateLead, { data, isLoading, isSuccess, isError, error }] =
    useUpdateLeadMutation();

  const handleBlockLead = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to block the lead for "${record?.name || "this prospect"}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, block it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateLead({ id: leadId, body: { status: "blocked" } });
      }
    });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Blocked!",
        icon: "success",
        text: `${data?.message || "Lead has been successfully blocked."}`,
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#0ABAC3",
      });
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "Something went wrong changing status definitions."}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      type="primary"
      danger
      loading={isLoading}
      onClick={handleBlockLead}
      className="w-full flex gap-1 justify-center items-center"
    >
      Block Lead
    </Button>
  );
}
