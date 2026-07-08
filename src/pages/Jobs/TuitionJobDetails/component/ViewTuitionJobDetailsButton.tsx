import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";
import { memo } from "react";

type ViewTuitionJobDetailsButtonProps = {
  jobId: string;
};

/**
 * Renders a navigation button to redirect to the specific job details page.
 * Uses the current user's role to construct the appropriate path.
 */
const ViewTuitionJobDetailsButton = ({
  jobId,
}: ViewTuitionJobDetailsButtonProps) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const handleNavigate = () => {
    // Construct the path dynamically based on the user's role and job ID
    const path = `/${currentUser?.role}/jobs/${jobId}`;
    navigate(path);
  };

  return (
    <Button
      type="primary"
      size="middle"
      onClick={handleNavigate}
      className="flex items-center justify-center gap-2 w-full"
    >
      <EyeOutlined />
      View Details
    </Button>
  );
};

// Memoized to optimize performance if used inside a large list or table
export default memo(ViewTuitionJobDetailsButton);
