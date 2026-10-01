import React, { useState, useEffect } from 'react';
import { getPayrollRecords } from '../../services/payrollService';
import PayrollTable from '../../components/payroll/PayrollTable';
import Payslip from '../../components/payroll/Payslip';
import { exportReportToCSV } from '../../services/reportService';
import { DollarSign, Download, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const Payroll = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    getPayrollRecords().then(setRecords);
  }, []);

  const totalPayroll = records.reduce((acc, curr) => acc + (curr.netPay || 0), 0);

  const handleProcessPayroll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('September Payroll successfully processed and direct deposits queued!');
    }, 1200);
  };

  const handleExport = () => {
    exportReportToCSV('peoplehub_payroll_september_2026', records);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Payroll Administration</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review monthly salary disbursement records and generate compliance payslips.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleProcessPayroll}
            disabled={isProcessing}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <DollarSign className="h-4 w-4" />
            <span>{isProcessing ? 'Processing...' : 'Run Payroll'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Disbursed (Sep)</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">${totalPayroll.toLocaleString()}</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">✓ 100% on-time payment</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Employees Processed</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{records.length} Staff</h3>
          <p className="text-[11px] text-slate-500 mt-1">Across all 5 departments</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Payroll Cutoff</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">Oct 28, 2026</h3>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">27 days remaining</p>
        </div>
      </div>

      {/* Records Table */}
      <PayrollTable records={records} onGeneratePayslip={setSelectedRecord} />

      {/* Payslip View Modal */}
      <Payslip
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        record={selectedRecord}
      />
    </div>
  );
};

export default Payroll;
