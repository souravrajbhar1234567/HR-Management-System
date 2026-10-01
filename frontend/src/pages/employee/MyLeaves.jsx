import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployee } from '../../context/EmployeeContext';
import LeaveStatus from '../../components/leave/LeaveStatus';
import LeaveForm from '../../components/leave/LeaveForm';
import LeaveTable from '../../components/leave/LeaveTable';
import Modal from '../../components/common/Modal';
import { Plus } from 'lucide-react';

const MyLeaves = () => {
  const { user } = useAuth();
  const { leaves, applyLeave } = useEmployee();
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const myLeaves = leaves.filter(
    (l) => l.employeeId === user?.employeeId || l.employeeId === 'EMP-1001'
  );

  const handleApply = async (formData) => {
    await applyLeave(formData, user);
    setIsApplyOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">My Time Off & Leaves</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Check your remaining leave allowance, file new requests, and review approval statuses.
          </p>
        </div>

        <button
          onClick={() => setIsApplyOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Leave Balances Cards */}
      <LeaveStatus />

      {/* Leave Requests Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800">My Leave Applications</h3>
        <LeaveTable
          leaves={myLeaves}
          showAdminActions={false}
          showEmployee={false}
        />
      </div>

      {/* Modal */}
      <Modal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        title="Apply for Time Off"
        subtitle="Specify leave type and dates for management review."
      >
        <LeaveForm onSubmit={handleApply} onCancel={() => setIsApplyOpen(false)} />
      </Modal>
    </div>
  );
};

export default MyLeaves;
