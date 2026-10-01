import React, { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import LeaveTable from '../../components/leave/LeaveTable';
import LeaveStatus from '../../components/leave/LeaveStatus';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';

const LeaveManagement = () => {
  const { leaves, updateLeaveStatus } = useEmployee();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredLeaves = leaves.filter((l) => {
    const matchesSearch =
      l.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = leaves.filter((l) => l.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Leave Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review, approve, or decline employee time-off requests.
          </p>
        </div>

        {pendingCount > 0 && (
          <span className="self-start sm:self-auto rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-700">
            {pendingCount} Pending Request{pendingCount > 1 ? 's' : ''} to Review
          </span>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by employee name or department..."
          className="w-full sm:w-80"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
        >
          <option value="All">All Requests</option>
          <option value="Pending">Pending Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Leave Table with Admin Actions */}
      {filteredLeaves.length === 0 ? (
        <EmptyState
          title="No leave requests found"
          description="There are currently no leave requests matching your filters."
        />
      ) : (
        <LeaveTable
          leaves={filteredLeaves}
          showAdminActions={true}
          onApprove={(id) => updateLeaveStatus(id, 'Approved')}
          onReject={(id) => updateLeaveStatus(id, 'Rejected')}
          showEmployee={true}
        />
      )}
    </div>
  );
};

export default LeaveManagement;
