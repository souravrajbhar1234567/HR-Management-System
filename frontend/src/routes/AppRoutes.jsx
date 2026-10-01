import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

// Layouts
import AdminLayout from '../components/layout/AdminLayout';
import EmployeeLayout from '../components/layout/EmployeeLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import Employees from '../pages/admin/Employees';
import AddEmployee from '../pages/admin/AddEmployee';
import EmployeeDetails from '../pages/admin/EmployeeDetails';
import Departments from '../pages/admin/Departments';
import Attendance from '../pages/admin/Attendance';
import LeaveManagement from '../pages/admin/LeaveManagement';
import Payroll from '../pages/admin/Payroll';
import Announcements from '../pages/admin/Announcements';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';

// Employee Pages
import EmployeeDashboard from '../pages/employee/Dashboard';
import MyProfile from '../pages/employee/MyProfile';
import MyAttendance from '../pages/employee/MyAttendance';
import MyLeaves from '../pages/employee/MyLeaves';
import MyPayroll from '../pages/employee/MyPayroll';
import MyPayslips from '../pages/employee/MyPayslips';
import MyTasks from '../pages/employee/MyTasks';
import Notifications from '../pages/employee/Notifications';

// Common Pages
import NotFound from '../pages/common/NotFound';
import Unauthorized from '../pages/common/Unauthorized';

const RootRedirect = () => {
  const { user, token } = useAuth();
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  return user.role === 'admin' ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/employee/dashboard" replace />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Portal Protected Routes (allowed for 'admin') */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/:id" element={<EmployeeDetails />} />
          <Route path="departments" element={<Departments />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leaves" element={<LeaveManagement />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Employee Portal Protected Routes (allowed for both 'employee' and 'admin' preview) */}
      <Route element={<ProtectedRoute allowedRoles={['employee', 'admin']} />}>
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Navigate to="/employee/dashboard" replace />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="attendance" element={<MyAttendance />} />
          <Route path="leaves" element={<MyLeaves />} />
          <Route path="payroll" element={<MyPayroll />} />
          <Route path="payslips" element={<MyPayslips />} />
          <Route path="tasks" element={<MyTasks />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Route>

      {/* Root & Catch-all Fallbacks */}
      <Route path="/" element={<RootRedirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;