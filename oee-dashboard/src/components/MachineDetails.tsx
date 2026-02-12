import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Activity, Zap, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export const MachineDetails = () => {
  const { id } = useParams<{ id: string }>();
  const machine = useStore((state) => state.machines.find((m) => m.id === id));

  if (!machine) {
    return <Navigate to="/" replace />;
  }

  const isError = machine.status === 'error';
  const statusColor = isError ? "text-rose-500" : machine.status === 'running' ? "text-emerald-400" : "text-amber-400";

  return (
    <div className="animate-in fade-in duration-500 pb-20"> {/* Dodany padding bottom na scrolla */}
      
      {/* Header Responsywny */}
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
            <p className="text-slate-400 font-mono text-sm">ID: {machine.id.toUpperCase()}</p>
        </div>
      </div>

      {/* Grid Responsywny: 1 kolumna na mobile, 3 na desktopie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Wskaźnik OEE */}
        <div className={clsx(
            "lg:col-span-1 bg-[#1e293b]/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col justify-center items-center min-h-[250px]",
            isError ? "border-rose-500/50 shadow-[0_0_50px_-10px_rgba(244,63,94,0.3)]" : "border-white/5"
        )}>
            {isError && <AlertTriangle size={80} className="absolute top-4 right-4 text-rose-500/10 animate-pulse" />}
            <div className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Efficiency</div>
            
            {/* Responsywna czcionka: mniejsza na mobile */}
            <div className={clsx("text-6xl sm:text-8xl font-black font-mono tracking-tighter", statusColor)}>
                {machine.oee}%
            </div>
            
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mt-6">
                <div 
                    className={clsx("h-full transition-all duration-1000 ease-out", isError ? "bg-rose-500" : "bg-emerald-400")}
                    style={{ width: `${machine.oee}%` }}
                />
            </div>
        </div>

        {/* Wykres - na mobile ustalamy stałą wysokość */}
        <div className="lg:col-span-2 bg-[#1e293b]/60 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-white/5 h-[300px] sm:h-[400px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <Activity size={18} className="text-indigo-400" />
                <h2 className="text-sm sm:text-lg font-bold text-white">Performance History</h2>
            </div>
            <div className="flex-1 w-full -ml-2"> {/* Ujemny margines by zmieścić oś Y */}
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
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="oee" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorOee)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
       
       {/* Kafelki metryk - na mobile jeden pod drugim lub 2 kolumny */}
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 lg:mt-8">
         <div className="bg-[#1e293b]/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={60} /></div>
             <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Produced</div>
             <div className="text-3xl sm:text-4xl font-black text-white mt-2">{machine.actualProduction}</div>
         </div>
         {/* Tu można dodać pozostałe kafelki */}
       </div>
    </div>
  );
};