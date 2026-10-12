import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./components/ThemeContext";
import Navbar from "./components/Navbar";

// Pages
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import StackPage from "./pages/StackPage";
import CertificationsPage from "./pages/CertificationsPage";
import NotFoundPage from "./pages/NotFoundPage";
const ResumePage = lazy(() => import("./pages/ResumePage"));

// Root Layout wrapping theme provider and scroll restoration
function RootLayout() {
  return (
    <ThemeProvider>
      <Outlet />
      <ScrollRestoration />
    </ThemeProvider>
  );
}

// Subpage Layout including top navigation bar
function SubPageLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-11">
        <Outlet />
      </div>
    </>
  );
}

// Application Router Configuration
const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          element: <SubPageLayout />,
          children: [
            { path: "/projects", element: <ProjectsPage /> },
            { path: "/experience", element: <ExperiencePage /> },
            { path: "/stack", element: <StackPage /> },
            { path: "/certifications", element: <CertificationsPage /> },
            { path: "/resume", element: <Suspense fallback={<p role="status" className="text-text-muted">Loading résumé…</p>}><ResumePage /></Suspense> },
          ],
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename:
      typeof window !== "undefined" && (window.location.pathname.startsWith("/ronjaypee") || window.location.pathname.startsWith("/jaypee"))
        ? (window.location.pathname.startsWith("/ronjaypee") ? "/ronjaypee" : "/jaypee")
        : "/",
  }
);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
