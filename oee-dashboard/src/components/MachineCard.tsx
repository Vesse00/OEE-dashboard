import React from 'react';
import { Activity, AlertTriangle, Zap, XCircle } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import { Machine } from '../types';

interface MachineCardProps {
  machine: Machine;
}

export const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const isRunning = machine.status === 'running';
  const isError = machine.status === 'error';

  // Kolory neonowe
  const statusColor = isRunning ? 'text-emerald-400' : isError ? 'text-rose-500' : 'text-amber-400';
  const glowColor = isRunning ? 'shadow-emerald-500/20' : isError ? 'shadow-rose-500/20' : 'shadow-amber-500/20';
  const borderColor = isRunning ? 'border-emerald-500/30' : isError ? 'border-rose-500/50' : 'border-amber-500/30';

  return (
    <div className={clsx(
      "relative bg-[#1e293b]/40 backdrop-blur-md rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      borderColor, glowColor
    )}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-slate-100 text-lg tracking-wide">{machine.name}</h3>
          <div className="flex items-center gap-2 mt-1">
             <span className={clsx("w-2 h-2 rounded-full animate-pulse", 
                isRunning ? "bg-emerald-400" : isError ? "bg-rose-500" : "bg-amber-400"
             )} />
             <span className={clsx("text-xs font-mono uppercase", statusColor)}>{machine.status}</span>
          </div>
        </div>
        
        {/* OEE Score Circle */}
        <div className="relative flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-700" />
                <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="4" fill="transparent" 
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 * (1 - machine.oee / 100)}
                    className={statusColor}
                />
            </svg>
            <span className="absolute text-xs font-bold text-white">{machine.oee}%</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
         <div className="bg-slate-800/50 p-2 rounded-lg text-center">
            <div className="text-[10px] text-slate-400 uppercase">Prod</div>
            <div className="text-sm font-mono font-bold text-white">{machine.actualProduction}</div>
         </div>
         <div className="bg-slate-800/50 p-2 rounded-lg text-center">
            <div className="text-[10px] text-slate-400 uppercase">Target</div>
            <div className="text-sm font-mono font-bold text-slate-300">{machine.targetProduction}</div>
         </div>
         <div className="bg-slate-800/50 p-2 rounded-lg text-center">
            <div className="text-[10px] text-slate-400 uppercase">Qual</div>
            <div className={clsx("text-sm font-mono font-bold", machine.quality > 95 ? "text-emerald-400" : "text-amber-400")}>
                {machine.quality}%
            </div>
         </div>
      </div>

      {/* Sparkline Chart */}
      <div className="h-12 opacity-50 hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={machine.history}>
            <defs>
              <linearGradient id={`grad-${machine.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isRunning ? "#10b981" : "#f43f5e"} stopOpacity={0.4}/>
                <stop offset="100%" stopColor={isRunning ? "#10b981" : "#f43f5e"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
                type="monotone" 
                dataKey="oee" 
                stroke={isRunning ? "#10b981" : "#f43f5e"} 
                strokeWidth={2}
                fill={`url(#grad-${machine.id})`}
                isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};