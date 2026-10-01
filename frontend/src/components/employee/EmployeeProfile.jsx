import React from 'react';
import { Mail, Phone, MapPin, Building, Calendar, DollarSign, Award, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const EmployeeProfile = ({ employee, onEdit }) => {
  if (!employee) return null;

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={employee.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'}
            alt={employee.name}
            className="h-24 w-24 rounded-2xl object-cover border-4 border-white/20 shadow-md"
          />
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold">{employee.name}</h2>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-xs">
                {employee.employeeId}
              </span>
            </div>
            <p className="text-sm font-medium text-indigo-100 mt-1">{employee.designation}</p>
            <p className="text-xs text-indigo-200 mt-0.5">{employee.department} Department</p>

            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-indigo-100">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {employee.location || 'HQ Office'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Joined {formatDate(employee.joinDate || '2023-01-01')}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-300" />
                Status: {employee.status || 'Active'}
              </span>
            </div>
          </div>

          {onEdit && (
            <button
              onClick={() => onEdit(employee)}
              className="rounded-xl bg-white/20 hover:bg-white/30 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-xs transition"
            >
              Edit Details
            </button>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Contact Information */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Contact Information
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-slate-400" /> Email
              </span>
              <span className="font-semibold text-slate-800">{employee.email}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-400" /> Phone
              </span>
              <span className="font-semibold text-slate-800">{employee.phone || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-slate-400" /> Location
              </span>
              <span className="font-semibold text-slate-800">{employee.location || 'Headquarters'}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-slate-400" /> System Role
              </span>
              <span className="font-semibold text-slate-800 capitalize">{employee.role || 'Employee'}</span>
            </div>
          </div>
        </div>

        {/* Compensation & Work */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Employment & Compensation
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-2">
                <Building className="h-3.5 w-3.5 text-slate-400" /> Department
              </span>
              <span className="font-semibold text-slate-800">{employee.department}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-slate-400" /> Joining Date
              </span>
              <span className="font-semibold text-slate-800">{formatDate(employee.joinDate || '2023-01-01')}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-2">
                <DollarSign className="h-3.5 w-3.5 text-slate-400" /> Base Salary
              </span>
              <span className="font-bold text-slate-900">{formatCurrency(employee.salary || 6500)} / mo</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Employment Status
              </span>
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">
                {employee.status || 'Active'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
