import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading...', size = 'md' }) => {
  const sizeMap = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 p-6 text-slate-500">
      <Loader2 className={`animate-spin text-indigo-600 ${sizeMap[size] || sizeMap.md}`} />
      {message && <p className="text-sm font-medium text-slate-600">{message}</p>}
    </div>
  );
};

export default Loader;
