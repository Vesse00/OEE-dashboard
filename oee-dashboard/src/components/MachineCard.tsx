import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Zap } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import { Machine } from '../types';

export const MachineCard: React.FC<{ machine: Machine }> = ({ machine }) => {
  const isRunning = machine.status === 'running';
  const isError = machine.status === 'error';

  const colors = isError 
    ? { 
        text: "text-rose-500", 
        bg: "bg-rose-500", 
        border: "border-rose-500/80 animate-pulse", 
        glow: "shadow-[0_0_50px_-10px_rgba(244,63,94,0.6)]"
      }
    : isRunning 
      ? { text: "text-emerald-400", bg: "bg-emerald-400", border: "border-emerald-500/20", glow: "hover:shadow-emerald-500/10" }
      : { text: "text-amber-400", bg: "bg-amber-400", border: "border-amber-500/20", glow: "hover:shadow-amber-500/10" };

  return (
    <div className={clsx(
      "relative bg-[#1e293b]/80 backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-500 group hover:scale-[1.02] hover:-translate-y-1",
      colors.border, colors.glow
    )}>
      {/* 1. Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <div className={clsx("w-2 h-2 rounded-full", colors.bg, (isError || isRunning) && "animate-pulse")} />
          <span className={clsx("text-[10px] font-black uppercase tracking-[0.2em]", colors.text)}>
            {machine.status}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 tracking-tighter">
          ID: {machine.id.toUpperCase()}
        </span>
      </div>

      <div className="p-5">
        {/* 2. Main Info Section - RESPONSIVE LAYOUT */}
        {/* Mobile: Flex Column (Pionowo), Tablet+: Grid (Poziomo) */}
        <div className="flex flex-col sm:grid sm:grid-cols-[1fr_140px] sm:items-end mb-6 gap-2 sm:gap-4">
          
          <div className="overflow-hidden">
            {/* Na mobile tekst może się zawijać, na desktopie ucinamy (...) */}
            <h3 className="text-white font-bold text-xl sm:text-lg leading-tight mb-1 group-hover:text-indigo-400 transition-colors">
              {machine.name}
            </h3>
            <p className="text-slate-500 text-xs font-medium truncate">Production Unit</p>
          </div>
          
          {/* Wynik OEE - Na mobile wyrównany do lewej (lub prawej wg uznania), na desktopie do prawej */}
          <div className="flex items-baseline gap-2 sm:block sm:text-right mt-2 sm:mt-0">
            <div className={clsx("text-4xl sm:text-4xl font-black font-mono tracking-tighter", colors.text)}>
              {machine.oee}<span className="text-sm ml-0.5 opacity-50">%</span>
            </div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest self-center sm:self-auto">Efficiency</div>
          </div>
        </div>

        {/* 3. Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
          <div 
            className={clsx("h-full transition-all duration-1000 ease-out", colors.bg)}
            style={{ width: `${machine.oee}%` }}
          />
        </div>

        {/* 4. Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 bg-slate-900/30 p-3 rounded-xl border border-white/5">
            <div className="space-y-1 text-center">
              <div className="text-[9px] text-slate-500 font-bold uppercase">Target</div>
              <div className="text-xs sm:text-sm font-mono text-slate-200">{machine.targetProduction}</div>
            </div>
            <div className="space-y-1 border-x border-white/5 px-2 text-center">
              <div className="text-[9px] text-slate-500 font-bold uppercase">Actual</div>
              <div className="text-xs sm:text-sm font-mono text-white font-bold">{machine.actualProduction}</div>
            </div>
            <div className="space-y-1 text-center">
              <div className="text-[9px] text-slate-500 font-bold uppercase">Quality</div>
              <div className={clsx("text-xs sm:text-sm font-mono font-bold", colors.text)}>{machine.quality}%</div>
            </div>
        </div>

        {/* 5. Mini Chart */}
        <div className="h-16 w-full bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden relative">
           {/* ... chart bez zmian ... */}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={machine.history} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`grad-${machine.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isError ? "#f43f5e" : "#10b981"} stopOpacity={0.2}/>
                  <stop offset="100%" stopColor={isError ? "#f43f5e" : "#10b981"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="oee" 
                stroke={isError ? "#f43f5e" : isRunning ? "#10b981" : "#fbbf24"} 
                strokeWidth={2}
                fill={`url(#grad-${machine.id})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. Footer */}
      <Link to={`/machines/${machine.id}`} className="w-full py-4 sm:py-3 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] text-slate-400 hover:text-white font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border-t border-white/5 cursor-pointer touch-manipulation">
        <Zap size={12} />
        View Details
      </Link>
    </div>
  );
};