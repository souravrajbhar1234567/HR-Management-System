import React, { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import AttendanceCalendar from '../../components/attendance/AttendanceCalendar';
import SearchBar from '../../components/common/SearchBar';
import { exportReportToCSV } from '../../services/reportService';
import { Download, CalendarCheck2, Clock, AlertCircle } from 'lucide-react';

const Attendance = () => {
  const { attendance } = useEmployee();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredLogs = attendance.filter((log) => {
    const matchesSearch =
      log.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || log.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const presentCount = attendance.filter((a) => a.status === 'Present').length;
  const lateCount = attendance.filter((a) => a.status === 'Late').length;
  const onLeaveCount = attendance.filter((a) => a.status === 'On Leave').length;

  const handleExport = () => {
    exportReportToCSV('peoplehub_attendance_logs', attendance);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Attendance Logs & Status</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time clock-in/out records, punctuality metrics, and work durations.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
        >
          <Download className="h-4 w-4" />
          <span>Export Logs (CSV)</span>
        </button>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CalendarCheck2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Present Today</p>
            <p className="text-lg font-bold text-slate-900">{presentCount} Employees</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Late Arrivals</p>
            <p className="text-lg font-bold text-slate-900">{lateCount} Employees</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Approved Leaves</p>
            <p className="text-lg font-bold text-slate-900">{onLeaveCount} Employees</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Filter by employee name or ID..."
          className="w-full sm:w-80"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
        >
          <option value="All">All Statuses</option>
          <option value="Present">Present</option>
          <option value="Late">Late</option>
          <option value="On Leave">On Leave</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      {/* Table */}
      <AttendanceTable logs={filteredLogs} showEmployeeName={true} />

      {/* Monthly Attendance Calendar */}
      <AttendanceCalendar logs={attendance} />
    </div>
  );
};

export default Attendance;
