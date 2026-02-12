import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Activity, Zap, AlertTriangle, BarChart3, PieChart as PieIcon } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

// MOCK DATA - Specyficzne dla maszyny (symulacja)
const last7DaysProduction = [
  { day: 'Mon', ok: 320, nok: 12 },
  { day: 'Tue', ok: 340, nok: 8 },
  { day: 'Wed', ok: 310, nok: 25 }, // Gorszy dzień
  { day: 'Thu', ok: 350, nok: 5 },
  { day: 'Fri', ok: 330, nok: 10 },
  { day: 'Sat', ok: 280, nok: 4 },
  { day: 'Sun', ok: 290, nok: 6 },
];

const machineDefects = [
  { name: 'Misalignment', value: 45, color: '#f43f5e' }, // Rose
  { name: 'Vibration', value: 30, color: '#fbbf24' },    // Amber
  { name: 'Overheating', value: 15, color: '#f97316' },  // Orange
  { name: 'Tool Wear', value: 10, color: '#64748b' },    // Slate
];

export const MachineDetails = () => {
  const { id } = useParams<{ id: string }>();
  const machine = useStore((state) => state.machines.find((m) => m.id === id));

  if (!machine) {
    return <Navigate to="/" replace />;
  }

  const isError = machine.status === 'error';
  const statusColor = isError ? "text-rose-500" : machine.status === 'running' ? "text-emerald-400" : "text-amber-400";

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <Link to="/" className="w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors border border-white/5">
            <ArrowLeft size={20} className="text-slate-400" />
        </Link>
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex flex-wrap items-center gap-3">
                {machine.name}
                <span className={clsx("text-xs sm:text-sm px-3 py-1 rounded-full bg-slate-800/80 border border-white/10 uppercase tracking-widest font-black", statusColor)}>
                    {machine.status}
                </span>
            </h1>
            <p className="text-slate-400 font-mono text-sm">ID: {machine.id.toUpperCase()} | Model: X-2024-PRO</p>
        </div>
      </div>

      {/* SEKCJA 1: GŁÓWNE KPI (Istniejąca) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {/* OEE Gauge */}
        <div className={clsx(
            "lg:col-span-1 bg-[#1e293b]/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col justify-center items-center min-h-[300px]",
            isError ? "border-rose-500/50 shadow-[0_0_50px_-10px_rgba(244,63,94,0.3)]" : "border-white/5"
        )}>
            {isError && <AlertTriangle size={80} className="absolute top-4 right-4 text-rose-500/10 animate-pulse" />}
            <div className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Real-time Efficiency</div>
            <div className={clsx("text-6xl sm:text-8xl font-black font-mono tracking-tighter", statusColor)}>
                {machine.oee}%
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mt-6">
                <div 
                    className={clsx("h-full transition-all duration-1000 ease-out", isError ? "bg-rose-500" : "bg-emerald-400")}
                    style={{ width: `${machine.oee}%` }}
                />
            </div>
            {/* Mini KPIs pod OEE */}
            <div className="grid grid-cols-3 gap-4 w-full mt-8 pt-6 border-t border-white/5">
                <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Avail</div>
                    <div className="font-bold text-white">{machine.availability}%</div>
                </div>
                <div className="text-center border-x border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase">Perf</div>
                    <div className="font-bold text-white">{machine.performance}%</div>
                </div>
                <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Qual</div>
                    <div className={clsx("font-bold", machine.quality > 90 ? "text-emerald-400" : "text-amber-400")}>{machine.quality}%</div>
                </div>
            </div>
        </div>

        {/* Live Trend */}
        <div className="lg:col-span-2 bg-[#1e293b]/60 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-white/5 h-[300px] sm:h-[auto] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <Activity size={18} className="text-indigo-400" />
                <h2 className="text-sm sm:text-lg font-bold text-white">Live Performance Trend (Last Hour)</h2>
            </div>
            <div className="flex-1 w-full -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={machine.history}>
                        <defs>
                            <linearGradient id="colorOee" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="timestamp" stroke="#64748b" tick={{fontSize: 10}} tickMargin={10} minTickGap={30} />
                        <YAxis stroke="#64748b" domain={[0, 100]} tick={{fontSize: 10}} tickMargin={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} itemStyle={{ color: '#fff' }} />
                        <Area type="monotone" dataKey="oee" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorOee)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* SEKCJA 2: SZCZEGÓŁOWA ANALITYKA (NOWOŚĆ) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Wykres Produkcji (Daily Output) */}
        <div className="bg-[#1e293b]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/5">
            <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={18} className="text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Weekly Output (OK vs NOK)</h2>
            </div>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={last7DaysProduction}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="day" stroke="#64748b" tick={{fontSize: 12}} />
                        <YAxis stroke="#64748b" tick={{fontSize: 12}} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }} />
                        <Legend />
                        <Bar dataKey="ok" name="Good Units" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="nok" name="Defects" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Diagnostyka Błędów (Pareto/Pie) */}
        <div className="bg-[#1e293b]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/5">
            <div className="flex items-center gap-2 mb-1">
                <PieIcon size={18} className="text-amber-400" />
                <h2 className="text-lg font-bold text-white">Top Downtime Reasons</h2>
            </div>
            <p className="text-slate-400 text-xs mb-4">Why is this machine failing?</p>

            <div className="h-[250px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={machineDefects}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {machineDefects.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }} />
                        <Legend verticalAlign="middle" align="right" layout="vertical" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

      </div>

    </div>
  );
};