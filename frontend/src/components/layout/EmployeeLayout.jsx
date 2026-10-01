import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';

const EmployeeLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <Sidebar role="employee" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar role="employee" />
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50/70">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
