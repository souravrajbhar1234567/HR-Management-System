import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import AttendanceStatus from '../../components/attendance/AttendanceStatus';
import LeaveStatus from '../../components/leave/LeaveStatus';
import LeaveForm from '../../components/leave/LeaveForm';
import Modal from '../../components/common/Modal';
import { Plus, CheckSquare, Calendar, Bell, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { applyLeave } = useEmployee();
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const sampleTasks = [
    { id: 1, title: 'Submit Q4 performance self-review', due: 'Oct 05', priority: 'High' },
    { id: 2, title: 'Review Figma wireframes for onboarding flow', due: 'Oct 07', priority: 'Medium' },
    { id: 3, title: 'Complete annual cybersecurity awareness training', due: 'Oct 12', priority: 'Low' },
  ];

  const handleLeaveSubmit = async (formData) => {
    await applyLeave(formData, user);
    setIsLeaveModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user?.name || 'Employee'}! 👋
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {user?.designation || 'Team Member'} • {user?.department || 'PeopleHub'} • ID: {user?.employeeId || 'EMP-1001'}
          </p>
        </div>

        <button
          onClick={() => setIsLeaveModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Main Grid: Clock-in widget & Leave balances */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Clock-in / Clock-out card */}
        <div className="lg:col-span-1">
          <AttendanceStatus />
        </div>

        {/* Leave Balances and quick stats */}
        <div className="lg:col-span-2 space-y-4">
          <LeaveStatus />

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/employee/payslips"
              className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-indigo-300 transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Latest Payslip Available</h4>
                  <p className="text-[11px] text-slate-500">September 2026 Disbursed</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              to="/employee/tasks"
              className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-indigo-300 transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">3 Pending Tasks</h4>
                  <p className="text-[11px] text-slate-500">Next due in 4 days</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: My Tasks & Announcements */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* My Upcoming Tasks */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-slate-800">Assigned Tasks</h4>
            <Link to="/employee/tasks" className="text-xs font-semibold text-indigo-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {sampleTasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{t.title}</p>
                    <p className="text-[11px] text-slate-400">Due {t.due}</p>
                  </div>
                </div>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    t.priority === 'High'
                      ? 'bg-rose-50 text-rose-700'
                      : t.priority === 'Medium'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {t.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Announcements */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-slate-800">Company Broadcasts</h4>
            <Link to="/employee/notifications" className="text-xs font-semibold text-indigo-600 hover:underline">
              All Notices
            </Link>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Company Event</span>
              <h5 className="text-xs font-bold text-slate-800 mt-1">Annual Townhall & Product Roadmap</h5>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Join us this Friday at 3:00 PM PST in the main virtual stage for live Q&A.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">HR Notice</span>
              <h5 className="text-xs font-bold text-slate-800 mt-1">Open Benefits Enrollment Period</h5>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Please submit your elected healthcare and wellness plan options by October 25th.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      <Modal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        title="Submit Leave Application"
        subtitle="Your request will be routed directly to your department manager."
      >
        <LeaveForm onSubmit={handleLeaveSubmit} onCancel={() => setIsLeaveModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default EmployeeDashboard;
