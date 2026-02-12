import React from 'react';
import { Activity, Zap, XCircle, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import { Machine } from '../types';

interface MachineCardProps {
  machine: Machine;
}

export const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const isRunning = machine.status === 'running';
  const isError = machine.status === 'error';
  const isWarning = machine.status === 'warning';

  // Dynamiczna paleta barw
  const colors = isError 
    ? { text: "text-rose-500", bg: "bg-rose-500", border: "border-rose-500/40", glow: "shadow-rose-500/20" }
    : isRunning 
      ? { text: "text-emerald-400", bg: "bg-emerald-400", border: "border-emerald-500/20", glow: "shadow-emerald-500/10" }
      : { text: "text-amber-400", bg: "bg-amber-400", border: "border-amber-500/20", glow: "shadow-amber-500/10" };

  return (
    <div className={clsx(
      "relative bg-[#1e293b]/80 backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-500 group",
      colors.border, colors.glow,
      isError && "animate-[pulse_4s_infinite]"
    )}>
      
      {/* 1. Top Bar - Status Indicator */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <div className={clsx("w-2 h-2 rounded-full", colors.bg, (isError || isRunning) && "animate-pulse")} />
          <span className={clsx("text-[10px] font-black uppercase tracking-[0.2em]", colors.text)}>
            {machine.status}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 tracking-tighter">
          LN-0{machine.id.replace(/\D/g,'') || '1'} // {machine.id.toUpperCase()}
        </span>
      </div>

      <div className="p-5">
        {/* 2. Main Info Section */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-white font-bold text-lg leading-none mb-1 group-hover:text-indigo-400 transition-colors">
              {machine.name}
            </h3>
            <p className="text-slate-500 text-xs font-medium">Core Production Unit</p>
          </div>
          <div className="text-right">
            <div className={clsx("text-4xl font-black font-mono tracking-tighter", colors.text)}>
              {machine.oee}<span className="text-sm ml-0.5 opacity-50">%</span>
            </div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Efficiency</div>
          </div>
        </div>

        {/* 3. Progress Bar (Zamiast kółka - zajmuje mniej miejsca i jest czytelniejsze) */}
        <div className="space-y-4 mb-6">
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={clsx("h-full transition-all duration-1000 ease-out", colors.bg)}
              style={{ width: `${machine.oee}%` }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-[9px] text-slate-500 font-bold uppercase">Target</div>
              <div className="text-sm font-mono text-slate-200">{machine.targetProduction}</div>
            </div>
            <div className="space-y-1 border-x border-white/5 px-4">
              <div className="text-[9px] text-slate-500 font-bold uppercase">Actual</div>
              <div className="text-sm font-mono text-white font-bold">{machine.actualProduction}</div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-[9px] text-slate-500 font-bold uppercase">Quality</div>
              <div className={clsx("text-sm font-mono font-bold", colors.text)}>{machine.quality}%</div>
            </div>
          </div>
        </div>

        {/* 4. Mini Chart with integrated background */}
        <div className="h-16 w-full bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden relative">
          <div className="absolute top-2 left-3 flex items-center gap-1.5 opacity-30">
            <Activity size={10} className="text-slate-400" />
            <span className="text-[8px] text-slate-400 font-bold uppercase">Live Performance Trend</span>
          </div>
          
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
                stroke={isError ? "#f43f5e" : "#10b981"} 
                strokeWidth={2}
                fill={`url(#grad-${machine.id})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Footer Interaction */}
      <button className="w-full py-3 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] text-slate-500 font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
        <Zap size={12} />
        View Details
      </button>
    </div>
  );
};