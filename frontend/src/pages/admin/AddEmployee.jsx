import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';
import EmployeeForm from '../../components/employee/EmployeeForm';
import { ArrowLeft } from 'lucide-react';

const AddEmployee = () => {
  const navigate = useNavigate();
  const { addEmployee } = useEmployee();

  const handleSubmit = async (formData) => {
    await addEmployee(formData);
    navigate('/admin/employees');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/admin/employees')}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Add New Employee</h1>
          <p className="text-xs text-slate-500">Register a new employee into the PeopleHub database</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <EmployeeForm onSubmit={handleSubmit} onCancel={() => navigate('/admin/employees')} />
      </div>
    </div>
  );
};

export default AddEmployee;
