import React from 'react';
import { BarChart3, Zap, Clock } from 'lucide-react';
import clsx from 'clsx';

interface KpiStatsProps {
  oee: string | number;
  production: number;
  active: number;
  total: number;
}

export const KpiStats: React.FC<KpiStatsProps> = ({ oee, production, active, total }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
      
      {/* 1. Global OEE Card */}
      <div className="bg-[#1e293b]/60 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart3 className="w-16 h-16 sm:w-20 sm:h-20" /> {/* Responsywna ikona */}
        </div>
        <div className="text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-wider">Global OEE</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {oee}%
          </span>
          <span className="text-emerald-400 text-[10px] sm:text-xs font-mono font-bold">+2.4%</span>
        </div>
      </div>

      {/* 2. Total Units Card */}
      <div className="bg-[#1e293b]/60 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:border-amber-500/30 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>
        <div className="text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-wider">Total Output</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {production.toLocaleString()}
          </span>
          <span className="text-indigo-400 text-[10px] sm:text-xs font-mono font-bold">420/h</span>
        </div>
      </div>

      {/* 3. Active Lines Card */}
      <div className="bg-[#1e293b]/60 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>
        <div className="text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-wider">Active Lines</div>
        <div className="mt-2 flex items-baseline gap-2">
           <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {active}/{total}
           </span>
           <span className="text-slate-500 text-[10px] sm:text-xs font-medium">Operational</span>
        </div>
      </div>

    </div>
  );
};