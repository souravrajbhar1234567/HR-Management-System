import React from 'react';
import { formatCurrency, calculateSalaryBreakdown } from '../../utils/formatCurrency';
import { Wallet, ArrowDownRight, ArrowUpRight, DollarSign } from 'lucide-react';

const SalaryCard = ({ monthlySalary = 6500 }) => {
  const breakdown = calculateSalaryBreakdown(monthlySalary);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Monthly Take-Home</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
            {formatCurrency(breakdown.netSalary)}
          </h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Wallet className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Earnings */}
        <div className="rounded-xl bg-slate-50/80 p-3.5 space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <ArrowUpRight className="h-4 w-4" /> Earnings & Allowances
            </span>
            <span>{formatCurrency(breakdown.gross)}</span>
          </div>
          <div className="flex justify-between text-slate-500 pt-1">
            <span>Basic Pay (50%)</span>
            <span className="font-semibold text-slate-700">{formatCurrency(breakdown.basic)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>House Rent Allowance (HRA)</span>
            <span className="font-semibold text-slate-700">{formatCurrency(breakdown.hra)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Special Allowance</span>
            <span className="font-semibold text-slate-700">{formatCurrency(breakdown.specialAllowance)}</span>
          </div>
        </div>

        {/* Deductions */}
        <div className="rounded-xl bg-slate-50/80 p-3.5 space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-rose-600">
              <ArrowDownRight className="h-4 w-4" /> Standard Deductions
            </span>
            <span>-{formatCurrency(breakdown.totalDeductions)}</span>
          </div>
          <div className="flex justify-between text-slate-500 pt-1">
            <span>Income Tax (TDS)</span>
            <span className="font-semibold text-slate-700">-{formatCurrency(breakdown.tax)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Provident Fund (PF)</span>
            <span className="font-semibold text-slate-700">-{formatCurrency(breakdown.providentFund)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Health Insurance</span>
            <span className="font-semibold text-slate-700">-{formatCurrency(breakdown.insurance)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCard;
