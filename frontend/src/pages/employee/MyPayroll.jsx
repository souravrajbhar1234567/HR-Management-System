import React from 'react';
import { useAuth } from '../../context/AuthContext';
import SalaryCard from '../../components/payroll/SalaryCard';
import { Link } from 'react-router-dom';
import { Receipt, FileText, ShieldAlert } from 'lucide-react';

const MyPayroll = () => {
  const { user } = useAuth();
  const salary = user?.salary || 7800;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">My Salary & Benefits</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent view of your earnings, tax withholdings, and retirement deductions.
          </p>
        </div>

        <Link
          to="/employee/payslips"
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
        >
          <Receipt className="h-4 w-4 text-indigo-600" />
          <span>View Monthly Payslips</span>
        </Link>
      </div>

      {/* Salary Breakdown Card */}
      <SalaryCard monthlySalary={salary} />

      {/* Tax & Banking Notice */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 text-xs text-indigo-900 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold">Tax Withholding & Direct Deposit Notice</h4>
          <p className="mt-0.5 text-indigo-800/80 leading-relaxed">
            Payroll is processed on the 28th of every calendar month. Tax deductions are determined based on
            standard W-4 elections. To change your withholding exemptions or bank account for direct deposit,
            please contact your HR representative.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyPayroll;
