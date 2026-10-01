import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getPayrollRecords } from '../../services/payrollService';
import PayrollTable from '../../components/payroll/PayrollTable';
import Payslip from '../../components/payroll/Payslip';

const MyPayslips = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    getPayrollRecords().then((all) => {
      // Find payslips belonging to this employee or mock sample
      const mine = all.filter((r) => r.employeeId === user?.employeeId || r.employeeId === 'EMP-1001');
      setRecords(mine.length ? mine : all.slice(0, 3));
    });
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">My Payslips Archive</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Download, review, or print your monthly salary statements.
        </p>
      </div>

      <PayrollTable records={records} onGeneratePayslip={setSelectedRecord} />

      <Payslip
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        record={selectedRecord}
      />
    </div>
  );
};

export default MyPayslips;
