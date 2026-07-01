import { lazy } from "react";
import LazyLoad from "../components/common/LozyLoad";

const Dashboard = LazyLoad(lazy(() => import("../pages/Dashboard/Dashboard")));

const DirectLeads = LazyLoad(
  lazy(() => import("../pages/Leads/DirectLeads/DirectLeads")),
);

const NewLeads = LazyLoad(
  lazy(() => import("../pages/Leads/NewLeads/NewLeads")),
);

const AssignedLeads = LazyLoad(
  lazy(() => import("../pages/Leads/AssignedLeads/AssignedLeads")),
);

const AllLeads = LazyLoad(
  lazy(() => import("../pages/Leads/AllLeads/AllLeads")),
);

const Jobs = LazyLoad(lazy(() => import("../pages/Jobs/Jobs")));

const RunningJobs = LazyLoad(
  lazy(() => import("../pages/RunningJobs/RunningJobs")),
);

const OwnAssignedLeads = LazyLoad(
  lazy(() => import("../pages/Leads/OwnAssignedLeads/OwnAssignedLeads")),
);

const AllTeachers = LazyLoad(lazy(() => import("../pages/Teacher/Teachers")));

export const superAdminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Leads",
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
    name: "Teachers",
    path: "teachers",
    element: <AllTeachers />,
  },
];
