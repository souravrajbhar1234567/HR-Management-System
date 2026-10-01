import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';

const EmployeeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <Sidebar
        role="employee"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Navbar
          role="employee"
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/70">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
