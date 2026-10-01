import React from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import StatCard from '../../components/dashboard/StatCard';
import AttendanceChart from '../../components/dashboard/AttendanceChart';
import EmployeeChart from '../../components/dashboard/EmployeeChart';
import LeaveChart from '../../components/dashboard/LeaveChart';
import RecentActivities from '../../components/dashboard/RecentActivities';
import RecentEmployees from '../../components/dashboard/RecentEmployees';
import { Users, UserCheck, CalendarOff, DollarSign, Plus, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { employees, attendance, leaves } = useEmployee();

  const totalEmployees = employees.length || 36;
  const activeToday = attendance.filter((a) => a.status === 'Present').length || 31;
  const pendingLeaves = leaves.filter((l) => l.status === 'Pending').length || 2;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Admin Executive Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor organizational metrics, workforce attendance, and real-time requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/employees"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Manage Employees</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Workforce"
          value={totalEmployees}
          change="+8.5% mo"
          isPositive={true}
          icon={Users}
          color="indigo"
        />
        <StatCard
          title="Present Today"
          value={activeToday}
          change="94.2% rate"
          isPositive={true}
          icon={UserCheck}
          color="emerald"
        />
        <StatCard
          title="Pending Leaves"
          value={pendingLeaves}
          change="Needs review"
          isPositive={false}
          icon={CalendarOff}
          color="amber"
        />
        <StatCard
          title="Monthly Payroll"
          value="$245,600"
          change="+2.4% vs last mo"
          isPositive={true}
          icon={DollarSign}
          color="violet"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
        <div>
          <EmployeeChart />
        </div>
      </div>

      {/* Second Row: Leave trends & Recent activities & New employees */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <LeaveChart />
        </div>
        <div>
          <RecentEmployees />
        </div>
        <div>
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
