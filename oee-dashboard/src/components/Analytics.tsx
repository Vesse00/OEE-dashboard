import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { Calendar, Download, Filter, ShieldCheck, AlertOctagon, Wrench, Timer } from 'lucide-react';

// --- DANE SYMULACYJNE (MOCK DATA) ---

// 1. Produkcja OK vs NOK (Stacked Bar)
const qualityData = [
  { name: 'Mon', ok: 4200, nok: 120 },
  { name: 'Tue', ok: 4500, nok: 85 },
  { name: 'Wed', ok: 4100, nok: 240 }, // Awaria w środę
  { name: 'Thu', ok: 4600, nok: 90 },
  { name: 'Fri', ok: 4300, nok: 150 },
  { name: 'Sat', ok: 3800, nok: 60 },
  { name: 'Sun', ok: 3900, nok: 80 },
];

// 2. Przyczyny Defektów (Pareto)
const defectReasons = [
  { name: 'Scratch / Surface', value: 35, color: '#f43f5e' }, // Najczęstszy
  { name: 'Dimension Error', value: 25, color: '#fbbf24' },
  { name: 'Burn Mark', value: 20, color: '#fb923c' },
  { name: 'Missing Part', value: 10, color: '#a78bfa' },
  { name: 'Other', value: 10, color: '#94a3b8' },
];

// 3. MTBF Trend (Liniowy)
const reliabilityData = [
  { week: 'W1', mtbf: 120, mttr: 45 },
  { week: 'W2', mtbf: 135, mttr: 40 },
  { week: 'W3', mtbf: 110, mttr: 60 }, // Spadek
  { week: 'W4', mtbf: 145, mttr: 35 }, // Poprawa
];

export const Analytics = () => {
  return (
    <div className="animate-in fade-in zoom-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Quality & Reliability</h1>
          <p className="text-slate-400 mt-1">Defect analysis and maintenance KPIs</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-white/5 rounded-lg text-slate-300 hover:text-white text-sm font-medium transition-colors">
                <Calendar size={16} /> Last 7 Days
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                <Download size={16} /> Report
            </button>
        </div>
      </div>

      {/* --- SEKCJA 1: KPI INŻYNIERSKIE --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* First Pass Yield */}
          <div className="bg-[#1e293b]/60 backdrop-blur-xl p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><ShieldCheck size={20} /></div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">+1.2%</span>
              </div>
              <div className="mt-4">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">First Pass Yield</div>
                  <div className="text-3xl font-black text-white">97.8%</div>
                  <div className="text-slate-500 text-xs mt-1">Parts OK first time</div>
              </div>
          </div>

          {/* Scrap Rate */}
          <div className="bg-[#1e293b]/60 backdrop-blur-xl p-5 rounded-2xl border border-rose-500/20 flex flex-col justify-between relative overflow-hidden">
               <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl"></div>
              <div className="flex justify-between items-start">
                  <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500"><AlertOctagon size={20} /></div>
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full">-0.4%</span>
              </div>
              <div className="mt-4">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Scrap Rate</div>
                  <div className="text-3xl font-black text-white">2.2%</div>
                  <div className="text-slate-500 text-xs mt-1">Total NOK parts</div>
              </div>
          </div>

          {/* MTBF */}
          <div className="bg-[#1e293b]/60 backdrop-blur-xl p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><Timer size={20} /></div>
              </div>
              <div className="mt-4">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">MTBF</div>
                  <div className="text-3xl font-black text-white">142h</div>
                  <div className="text-slate-500 text-xs mt-1">Mean Time Between Failures</div>
              </div>
          </div>

          {/* MTTR */}
          <div className="bg-[#1e293b]/60 backdrop-blur-xl p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><Wrench size={20} /></div>
              </div>
              <div className="mt-4">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">MTTR</div>
                  <div className="text-3xl font-black text-white">35m</div>
                  <div className="text-slate-500 text-xs mt-1">Mean Time To Repair</div>
              </div>
          </div>
      </div>

      {/* --- SEKCJA 2: WYKRESY GŁÓWNE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Chart 1: OK vs NOK Stacked */}
        <div className="bg-[#1e293b]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white">Production Quality (OK / NOK)</h2>
                    <p className="text-slate-400 text-xs">Daily output breakdown</p>
                </div>
                <Filter size={16} className="text-slate-500 cursor-pointer hover:text-indigo-400" />
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={qualityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 12}} />
                        <YAxis stroke="#64748b" tick={{fontSize: 12}} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ fill: '#334155', opacity: 0.2 }}
                        />
                        <Legend />
                        {/* Stacked Bars: ten sam stackId powoduje ułożenie jeden na drugim */}
                        <Bar dataKey="ok" name="Good Parts (OK)" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="nok" name="Scrap (NOK)" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Chart 2: Defect Pareto */}
        <div className="bg-[#1e293b]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/5">
            <h2 className="text-lg font-bold text-white mb-1">Defect Analysis</h2>
            <p className="text-slate-400 text-xs mb-6">Top reasons for rejection</p>
            
            <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={defectReasons}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {defectReasons.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* --- SEKCJA 3: RELIABILITY TREND --- */}
      <div className="bg-[#1e293b]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/5">
          <h2 className="text-lg font-bold text-white mb-6">Maintenance Reliability Trend (MTBF vs MTTR)</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reliabilityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorMtbf" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMttr" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="week" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                    <Legend />
                    <Area type="monotone" dataKey="mtbf" name="MTBF (Hours)" stroke="#6366f1" fillOpacity={1} fill="url(#colorMtbf)" />
                    <Area type="monotone" dataKey="mttr" name="MTTR (Minutes)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorMttr)" />
                </AreaChart>
            </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};