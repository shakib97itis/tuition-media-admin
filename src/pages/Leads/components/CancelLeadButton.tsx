/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useUpdateLeadMutation } from "../../../redux/features/lead/leadApi";

export default function CancelLeadButton({ record }: { record: any }) {
  const leadId = record?._id;

  const [updateLead, { data, isLoading, isSuccess, isError, error }] =
    useUpdateLeadMutation();

  // Prompt safety dialogue confirmation before actual data adjustments
  const handleCancelLead = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to cancel the lead for "${record?.name || "this prospect"}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Match standard { id, body/data } API wrapper expectations
        updateLead({ id: leadId, body: { status: "canceled" } });
      }
    });
  };

  // Synchronize dynamic application outcome feedback directly
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Canceled!",
        icon: "success",
        text: `${data?.message || "Lead status has been updated to canceled."}`,
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
      danger // Automatically styles button elements with danger palettes to signal cancellations
      loading={isLoading}
      onClick={handleCancelLead}
      className="w-full flex gap-1 justify-center items-center"
    >
      Cancel Lead
    </Button>
  );
}
