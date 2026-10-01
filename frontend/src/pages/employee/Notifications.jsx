import React, { useState } from 'react';
import { Bell, CheckCircle, Megaphone, FileText, Clock, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'leave',
    title: 'Leave Request Approved',
    message: 'Your request for Annual Leave from Sep 28 to Oct 02 has been approved by management.',
    time: '3 hours ago',
    unread: true,
  },
  {
    id: 2,
    type: 'payroll',
    title: 'September Payslip Generated',
    message: 'Your salary statement for the month of September 2026 is now available for download.',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 3,
    type: 'company',
    title: 'Company Townhall Notice',
    message: 'All-hands meeting scheduled for this Friday at 3:00 PM PST. Check your calendar for invitation.',
    time: '2 days ago',
    unread: false,
  },
  {
    id: 4,
    type: 'attendance',
    title: 'Shift Logged Successfully',
    message: 'Your punch-in at 09:02 AM has been recorded for today.',
    time: 'Today at 09:02 AM',
    unread: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success('All notifications marked as read');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'leave':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'payroll':
        return <FileText className="h-5 w-5 text-indigo-500" />;
      case 'company':
        return <Megaphone className="h-5 w-5 text-sky-500" />;
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Notifications & Alerts</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Stay updated with leave approvals, company broadcasts, and payroll slips.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
        >
          <Check className="h-4 w-4 text-emerald-600" />
          <span>Mark all as read</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs divide-y divide-slate-100 overflow-hidden">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-4 p-4 transition ${
              item.unread ? 'bg-indigo-50/20' : 'bg-white hover:bg-slate-50/50'
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
              {getIcon(item.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.message}</p>
            </div>

            {item.unread && (
              <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
