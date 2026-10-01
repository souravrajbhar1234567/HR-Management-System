import React from 'react';
import { getHRMetrics, exportReportToCSV } from '../../services/reportService';
import { useEmployee } from '../../context/EmployeeContext';
import { Download, FileSpreadsheet, BarChart2, PieChart as PieIcon, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const Reports = () => {
  const { employees, attendance, leaves } = useEmployee();
  const metrics = getHRMetrics();

  const handleExportEmployees = () => {
    exportReportToCSV('peoplehub_employees_report', employees);
    toast.success('Employee directory report downloaded!');
  };

  const handleExportAttendance = () => {
    exportReportToCSV('peoplehub_attendance_report', attendance);
    toast.success('Attendance logs downloaded!');
  };

  const handleExportLeaves = () => {
    exportReportToCSV('peoplehub_leaves_report', leaves);
    toast.success('Leave records report downloaded!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">HR Intelligence & Analytics</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Export strategic workforce data and view executive organization indicators.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Average Tenure</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{metrics.avgTenure}</h3>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Turnover Rate</p>
          <h3 className="text-xl font-bold text-emerald-600 mt-1">{metrics.turnoverRate}</h3>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Punctuality Score</p>
          <h3 className="text-xl font-bold text-indigo-600 mt-1">{metrics.attendanceRate}</h3>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Open Requisitions</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{metrics.openPositions} Roles</h3>
        </div>
      </div>

      {/* Exportable Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Workforce Master Data</h3>
            <p className="text-xs text-slate-500 mt-1">
              Includes full employee personal files, designations, compensation bands, and joining dates.
            </p>
          </div>
          <button
            onClick={handleExportEmployees}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition"
          >
            <Download className="h-4 w-4" />
            <span>Export Employees (CSV)</span>
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
              <BarChart2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Attendance & Shifts</h3>
            <p className="text-xs text-slate-500 mt-1">
              Detailed daily check-in timestamps, check-out timestamps, overtime hours, and late flags.
            </p>
          </div>
          <button
            onClick={handleExportAttendance}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
          >
            <Download className="h-4 w-4" />
            <span>Export Attendance (CSV)</span>
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Time-off & Leaves</h3>
            <p className="text-xs text-slate-500 mt-1">
              Complete historical record of applied leaves, durations, approval decisions, and reasons.
            </p>
          </div>
          <button
            onClick={handleExportLeaves}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-xs font-bold text-white hover:bg-sky-700 transition"
          >
            <Download className="h-4 w-4" />
            <span>Export Leaves (CSV)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
