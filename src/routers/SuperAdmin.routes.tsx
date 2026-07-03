import { lazy } from "react";
import LazyLoad from "../components/common/LazyLoad";
import type { TPath } from "../types/path";
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";

// ============================================================================
// 1. LAZY LOADING COMPONENTS (Organized by Feature Modules)
// ============================================================================

// Dashboard
const Dashboard = LazyLoad(lazy(() => import("../pages/Dashboard/Dashboard")));

// Leads Module
const DirectLeads = LazyLoad(
  lazy(() => import("../pages/Leads/DirectLeads/DirectLeads")),
);
const NewLeads = LazyLoad(
  lazy(() => import("../pages/Leads/NewLeads/NewLeads")),
);
const OwnAssignedLeads = LazyLoad(
  lazy(() => import("../pages/Leads/OwnAssignedLeads/OwnAssignedLeads")),
);
const AssignedLeads = LazyLoad(
  lazy(() => import("../pages/Leads/AssignedLeads/AssignedLeads")),
);
const AllLeads = LazyLoad(
  lazy(() => import("../pages/Leads/AllLeads/AllLeads")),
);

// Requirements / Jobs Module
const Jobs = LazyLoad(lazy(() => import("../pages/Jobs/Jobs")));
const RunningJobs = LazyLoad(
  lazy(() => import("../pages/RunningJobs/RunningJobs")),
);

// Teachers Module
const AllTeachers = LazyLoad(
  lazy(() => import("../pages/Teacher/AllTeachersProfile/AllTeachersProfile")),
);

const TeacherProfile = LazyLoad(
  lazy(() => import("../pages/Teacher/TeacherProfile/TeacherProfile")),
);

const UpdateTeacherProfile = LazyLoad(
  lazy(
    () =>
      import("../pages/Teacher/UpdateTeacherProfile.tsx/UpdateTeacherProfile"),
  ),
);

// ============================================================================
// 2. PATHS CONFIGURATION
// ============================================================================

export const superAdminPaths: TPath[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <DashboardOutlined />,
    element: <Dashboard />,
  },
  {
    name: "Leads",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        name: "Direct Leads",
        path: "direct-leads",
        element: <DirectLeads />,
      },
      {
        name: "New Leads",
        path: "new-leads",
        element: <NewLeads />,
      },
      {
        name: "My Assigned Leads",
        path: "my-leads",
        element: <OwnAssignedLeads />,
      },
      {
        name: "All Assigned Leads",
        path: "assigned-leads",
        element: <AssignedLeads />,
      },
      {
        name: "All Leads",
        path: "all-leads",
        element: <AllLeads />,
      },
    ],
  },
  {
    name: "Requirements",
    icon: <ProjectOutlined />,
    children: [
      {
        name: "Requirements",
        path: "jobs",
        element: <Jobs />,
      },
      {
        name: "Running Jobs",
        path: "running-jobs",
        element: <RunningJobs />,
      },
    ],
  },
  {
    name: "All Teachers",
    path: "teachers",
    icon: <UserOutlined />,
    element: <AllTeachers />,
  },
  {
    // Teacher Profile
    path: "teacher/:teacherId",
    element: <TeacherProfile />,
  },
  {
    // Teacher Profile edit
    path: "teacher/edit/:id",
    element: <UpdateTeacherProfile />,
  },
];
