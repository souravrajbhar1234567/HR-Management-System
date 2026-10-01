import React from 'react';
import Modal from '../common/Modal';
import { formatCurrency, calculateSalaryBreakdown } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { Printer, Download } from 'lucide-react';

const Payslip = ({ isOpen, onClose, record }) => {
  if (!record) return null;

  const breakdown = calculateSalaryBreakdown(record.salary || 6500);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl" title="Employee Payslip">
      <div className="space-y-6 p-2 text-slate-800">
        {/* Payslip Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                PH
              </span>
              <h3 className="text-base font-bold text-slate-900">PeopleHub Technologies Inc.</h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">100 Enterprise Way, Suite 400, San Francisco, CA</p>
          </div>
          <div className="text-right">
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
              PAID
            </span>
            <p className="text-xs font-bold text-slate-700 mt-1">{record.month}</p>
          </div>
        </div>

        {/* Employee Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl bg-slate-50 p-4 text-xs">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Employee Name</p>
            <p className="font-bold text-slate-800">{record.employeeName}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Employee ID</p>
            <p className="font-mono font-bold text-slate-800">{record.employeeId}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Department</p>
            <p className="font-medium text-slate-800">{record.department || 'Engineering'}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Pay Date</p>
            <p className="font-medium text-slate-800">{formatDate(record.paymentDate)}</p>
          </div>
        </div>

        {/* Itemized Breakdown Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Earnings */}
          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-slate-50 px-4 py-2 font-bold text-slate-700 border-b border-slate-200">
              Earnings
            </div>
            <div className="divide-y divide-slate-100 p-2">
              <div className="flex justify-between py-1.5 px-2">
                <span className="text-slate-500">Basic Salary</span>
                <span className="font-semibold text-slate-800">{formatCurrency(breakdown.basic)}</span>
              </div>
              <div className="flex justify-between py-1.5 px-2">
                <span className="text-slate-500">House Rent Allowance (HRA)</span>
                <span className="font-semibold text-slate-800">{formatCurrency(breakdown.hra)}</span>
              </div>
              <div className="flex justify-between py-1.5 px-2">
                <span className="text-slate-500">Special Allowance</span>
                <span className="font-semibold text-slate-800">{formatCurrency(breakdown.specialAllowance)}</span>
              </div>
              {record.bonus > 0 && (
                <div className="flex justify-between py-1.5 px-2 text-emerald-600 font-semibold">
                  <span>Performance Bonus</span>
                  <span>+{formatCurrency(record.bonus)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Deductions */}
          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-slate-50 px-4 py-2 font-bold text-slate-700 border-b border-slate-200">
              Deductions
            </div>
            <div className="divide-y divide-slate-100 p-2">
              <div className="flex justify-between py-1.5 px-2">
                <span className="text-slate-500">Tax Deducted (TDS)</span>
                <span className="font-semibold text-slate-800">{formatCurrency(breakdown.tax)}</span>
              </div>
              <div className="flex justify-between py-1.5 px-2">
                <span className="text-slate-500">Provident Fund (PF)</span>
                <span className="font-semibold text-slate-800">{formatCurrency(breakdown.providentFund)}</span>
              </div>
              <div className="flex justify-between py-1.5 px-2">
                <span className="text-slate-500">Medical Insurance</span>
                <span className="font-semibold text-slate-800">{formatCurrency(breakdown.insurance)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Salary Total */}
        <div className="flex items-center justify-between rounded-xl bg-indigo-50/70 border border-indigo-100 p-4">
          <div>
            <p className="text-xs text-indigo-700 font-medium">Net Disbursed Amount</p>
            <p className="text-[11px] text-indigo-500">Direct Deposit to registered bank account</p>
          </div>
          <div className="text-xl font-extrabold text-indigo-700">
            {formatCurrency(record.netPay || breakdown.netSalary)}
          </div>
        </div>

        {/* Print / Actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Printer className="h-4 w-4" />
            <span>Print Payslip</span>
          </button>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Payslip;
