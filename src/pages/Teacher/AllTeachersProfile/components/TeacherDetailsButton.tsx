import { Button } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";

type TeacherDetailsButtonProp = {
  teacherId: string;
};

export default function TeacherDetailsButton({
  teacherId,
}: TeacherDetailsButtonProp) {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser?._id && !currentUser?.role) return null;

  return (
    <Link to={`/${currentUser.role}/teacher/${teacherId}`} className="w-full">
      <Button
        type="primary"
        className="w-full flex gap-1 justify-center items-center"
      >
        <FiEye className="size-5 text-white" />
        View Teacher Details
      </Button>
    </Link>
  );
}
