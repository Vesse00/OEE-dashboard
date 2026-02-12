import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Play, Pause } from 'lucide-react'; // Usunąłem nieużywane ikony (BarChart3, Zap, Clock)
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import { Layout } from './components/Layout';
import { MachineCard } from './components/MachineCard';
import { MachineDetails } from './components/MachineDetails';
import { KpiStats } from './components/KpiStats'; // <--- IMPORT

const Dashboard = () => {
  const { machines, isRunning, toggleSimulation } = useStore();
  const [filter, setFilter] = useState<'all' | 'running' | 'error'>('all');

  // Logika obliczeń
  const totalProduction = machines.reduce((acc, m) => acc + m.actualProduction, 0);
  const averageOee = (machines.reduce((acc, m) => acc + m.oee, 0) / machines.length).toFixed(1);
  const activeMachines = machines.filter(m => m.status === 'running').length;

  const filteredMachines = machines.filter(m => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Factory Overview</h1>
          <p className="text-slate-400 mt-1">Real-time monitoring system</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Filtry */}
          <div className="flex bg-slate-800/50 p-1 rounded-xl border border-white/5">
            {(['all', 'running', 'error'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                  filter === f 
                    ? "bg-indigo-600 text-white shadow-lg" 
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <button 
            onClick={toggleSimulation}
            className={clsx(
              "flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all shadow-lg active:scale-95 border",
              isRunning 
                ? "bg-amber-500/10 text-amber-500 border-amber-500/50 hover:bg-amber-500/20"
                : "bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700 hover:shadow-indigo-500/25"
            )}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            <span className="hidden sm:inline">{isRunning ? "PAUSE" : "START"}</span>
          </button>
        </div>
      </div>

      {/* --- NOWY KOMPONENT KPI --- */}
      {/* Przekazujemy tylko dane, komponent martwi się o wygląd */}
      <KpiStats 
        oee={averageOee} 
        production={totalProduction} 
        active={activeMachines} 
        total={machines.length} 
      />

      {/* Grid Maszyn */}
      <h2 className="text-xl font-bold text-white mb-4">Production Lines</h2>
      
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredMachines.map(machine => (
            <motion.div
              key={machine.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <MachineCard machine={machine} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ... Reszta pliku (PlaceholderPage, App) bez zmian ...
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
    <div className="text-6xl mb-4">🚧</div>
    <h2 className="text-2xl font-bold text-slate-300">{title}</h2>
    <p>Module under development</p>
  </div>
);

function App() {
  const { updateMachines, isRunning } = useStore();

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
          <Route path="/machines" element={<Dashboard />} />
          <Route path="/machines/:id" element={<MachineDetails />} />
          <Route path="/analytics" element={<PlaceholderPage title="Advanced Analytics" />} />
          <Route path="/settings" element={<PlaceholderPage title="System Configuration" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;