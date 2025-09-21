import React, { type JSX } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Dashboard from "../pages/01-Dashboard/Dashboard";
import AddNewLeads from "../components/02-LeadsComponents/AddNewLeads/AddNewLeads";
import ViewLeads from "../components/02-LeadsComponents/ViewLeads/ViewLeads";
import StatusIndicator from "../components/02-LeadsComponents/StatusIndicator/StatusIndicator";
import Employees from "../pages/10-Employees/Employees";
import OverallEmployeeAttendance from "../components/10-EmployeesComponents/OverallEmployeeAttendance/OverallEmployeeAttendance";
import AssignLeads from "../components/03-AssignLeads/AssignLeads";
import AddQuotation from "../components/04-QuotationComponents/AddQuotation/AddQuotation";
import Login from "../pages/00-Login/Login";
import Profile from "../pages/11-Profile/Profile";
import Attendance from "../pages/12-Attendance/Attendance";
import LeaveRequest from "../pages/13-LeaveRequest/LeaveRequest";

// Protected route component
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userDetails");
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

const MainRoutes: React.FC = () => {
  return (
    <div>
      <Header>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/add"
            element={
              <ProtectedRoute>
                <AddNewLeads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/view"
            element={
              <ProtectedRoute>
                <ViewLeads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/status"
            element={
              <ProtectedRoute>
                <StatusIndicator />
              </ProtectedRoute>
            }
          />

          {/* EMPLOYEES */}
          <Route
            path="/employees/view"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/attendance"
            element={
              <ProtectedRoute>
                <OverallEmployeeAttendance />
              </ProtectedRoute>
            }
          />

          {/* LEADS ASSIGN */}
          <Route
            path="/assign/add"
            element={
              <ProtectedRoute>
                <AssignLeads />
              </ProtectedRoute>
            }
          />

          {/* QUOTATION */}
          <Route
            path="/quotation/add"
            element={
              <ProtectedRoute>
                <AddQuotation />
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ATTENDANCE */}
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />

          {/*LEAVE REQ  */}
          <Route
            path="/leaveReq"
            element={
              <ProtectedRoute>
                <LeaveRequest />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Header>
    </div>
  );
};

export default MainRoutes;
