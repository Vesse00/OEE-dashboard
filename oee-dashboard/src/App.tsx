import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Play, Pause, Zap, BarChart3, Clock } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from './store/useStore';
import { Layout } from './components/Layout';
import { MachineCard } from './components/MachineCard';

// 1. Komponent Dashboard (to co było wcześniej, ale w nowym stylu)
const Dashboard = () => {
  const { machines, isRunning, toggleSimulation } = useStore();
  const totalProduction = machines.reduce((acc, m) => acc + m.actualProduction, 0);
  const averageOee = (machines.reduce((acc, m) => acc + m.oee, 0) / machines.length).toFixed(1);
  const activeMachines = machines.filter(m => m.status === 'running').length;

  return (
    <div>
      {/* Header Dashboardu */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Factory Overview</h1>
          <p className="text-slate-400 mt-1">Real-time monitoring system</p>
        </div>
        
        <button 
          onClick={toggleSimulation}
          className={clsx(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 border",
            isRunning 
              ? "bg-amber-500/10 text-amber-500 border-amber-500/50 hover:bg-amber-500/20"
              : "bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700 hover:shadow-indigo-500/25"
          )}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          {isRunning ? "PAUSE SIMULATION" : "START PRODUCTION"}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-[#1e293b]/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><BarChart3 size={80} /></div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Global OEE</div>
            <div className="text-4xl font-black text-white mt-2">{averageOee}%</div>
            <div className="text-emerald-400 text-xs mt-1 font-mono">+2.4% vs last hour</div>
         </div>

         <div className="bg-[#1e293b]/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={80} /></div>
             <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Units</div>
             <div className="text-4xl font-black text-white mt-2">{totalProduction}</div>
             <div className="text-indigo-400 text-xs mt-1 font-mono">Run rate: 420/h</div>
         </div>

         <div className="bg-[#1e293b]/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Clock size={80} /></div>
             <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Lines</div>
             <div className="text-4xl font-black text-white mt-2">{activeMachines}/{machines.length}</div>
             <div className="text-slate-500 text-xs mt-1">All systems operational</div>
         </div>
      </div>

      {/* Machines Grid */}
      <h2 className="text-xl font-bold text-white mb-4">Production Lines</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {machines.map(machine => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
      </div>
    </div>
  );
};

// Placeholder dla innych stron (żeby pokazać routing)
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
    <div className="text-6xl mb-4">🚧</div>
    <h2 className="text-2xl font-bold text-slate-300">{title}</h2>
    <p>Module under development</p>
  </div>
);

// Główny App
function App() {
  const { updateMachines, isRunning } = useStore();

  // Globalny timer symulacji
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        updateMachines();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, updateMachines]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/machines" element={<Dashboard />} /> {/* Tu można dać widok listy */}
          <Route path="/analytics" element={<PlaceholderPage title="Advanced Analytics" />} />
          <Route path="/settings" element={<PlaceholderPage title="System Configuration" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;