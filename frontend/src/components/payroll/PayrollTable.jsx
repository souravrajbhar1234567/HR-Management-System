import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { FileText } from 'lucide-react';

const PayrollTable = ({ records = [], onGeneratePayslip }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-3.5">Employee</th>
              <th className="px-6 py-3.5">Month</th>
              <th className="px-6 py-3.5">Base Salary</th>
              <th className="px-6 py-3.5">Bonus</th>
              <th className="px-6 py-3.5">Deductions</th>
              <th className="px-6 py-3.5">Net Pay</th>
              <th className="px-6 py-3.5">Payment Date</th>
              <th className="px-6 py-3.5">Status</th>
              {onGeneratePayslip && <th className="px-6 py-3.5 text-right">Payslip</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {records.map((rec) => (
              <tr key={rec._id} className="hover:bg-slate-50/60 transition">
                <td className="px-6 py-3.5">
                  <p className="font-semibold text-slate-900">{rec.employeeName}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{rec.employeeId}</p>
                </td>
                <td className="px-6 py-3.5 font-medium">{rec.month}</td>
                <td className="px-6 py-3.5 text-slate-600">{formatCurrency(rec.salary)}</td>
                <td className="px-6 py-3.5 text-emerald-600 font-medium">+{formatCurrency(rec.bonus)}</td>
                <td className="px-6 py-3.5 text-rose-600 font-medium">-{formatCurrency(rec.deductions)}</td>
                <td className="px-6 py-3.5 font-bold text-slate-900">{formatCurrency(rec.netPay)}</td>
                <td className="px-6 py-3.5 text-slate-500">{formatDate(rec.paymentDate)}</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    {rec.status}
                  </span>
                </td>
                {onGeneratePayslip && (
                  <td className="px-6 py-3.5 text-right">
                    <button
                      onClick={() => onGeneratePayslip(rec)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-indigo-600 hover:bg-slate-50 transition"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollTable;
