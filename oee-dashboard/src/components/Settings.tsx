import { useState } from 'react';
import { Save, Bell, Shield, Server, RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

// Komponent przełącznika (Toggle)
const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={clsx(
      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
      enabled ? "bg-indigo-600" : "bg-slate-700"
    )}
  >
    <span
      className={clsx(
        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
        enabled ? "translate-x-6" : "translate-x-1"
      )}
    />
  </button>
);

export const Settings = () => {
  // Stany formularza (symulacja)
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const { settings, toggleNotifications, setRefreshRate } = useStore();

  

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
            <p className="text-slate-400 mt-1">Configure dashboard parameters and alerts</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
            <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Sekcja 1: General */}
        <div className="bg-[#1e293b]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><Server size={20} /></div>
                <h2 className="text-xl font-bold text-white">Data Ingestion</h2>
            </div>
            
            <div className="space-y-6">
                {/* Refresh Rate Section */}
                <div className="bg-[#1e293b]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><Server size={20} /></div>
                        <h2 className="text-xl font-bold text-white">System Performance</h2>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-white font-medium">Refresh Rate (seconds)</div>
                            <div className="text-slate-500 text-sm">Update frequency for telemetry data</div>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-900/50 p-1 rounded-lg border border-white/5">
                            {[1, 5, 10].map(val => (
                                <button 
                                    key={val}
                                    onClick={() => setRefreshRate(val)}
                                    className={clsx(
                                        "px-3 py-1 rounded-md text-sm font-bold transition-colors",
                                        settings.refreshRate === val ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-white"
                                    )}
                                >
                                    {val}s
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                    

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                        <div className="text-white font-medium">Auto-Archive Logs</div>
                        <div className="text-slate-500 text-sm">Store simulation history locally</div>
                    </div>
                    <Toggle enabled={autoSave} onChange={() => setAutoSave(!autoSave)} />
                </div>
            </div>
        </div>

        {/* Sekcja 2: Alerty */}
        <div className="bg-[#1e293b]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400"><Bell size={20} /></div>
                <h2 className="text-xl font-bold text-white">Notifications</h2>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <div className="text-white font-medium">Critical Error Alerts</div>
                    <div className="text-slate-500 text-sm">Real-time popup when machine stops</div>
                </div>
                {/* Podpięte pod globalny stan */}
                <Toggle enabled={settings.notifications} onChange={toggleNotifications} />
            </div>
        </div>

        {/* Sekcja 3: Danger Zone */}
        <div className="bg-rose-950/10 border border-rose-500/20 rounded-3xl p-6 sm:p-8">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500"><Shield size={20} /></div>
                <h2 className="text-xl font-bold text-white">Maintenance Area</h2>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <div className="text-white font-medium">Maintenance Mode</div>
                    <div className="text-rose-200/60 text-sm">Stops all machines and resets counters</div>
                </div>
                <Toggle enabled={maintenanceMode} onChange={() => setMaintenanceMode(!maintenanceMode)} />
            </div>
            
             {maintenanceMode && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-200 text-sm flex items-center gap-2"
                >
                    <RefreshCw className="animate-spin" size={16} />
                    System is in maintenance mode. Incoming data stream paused.
                </motion.div>
            )}
        </div>

      </div>
    </div>
  );
};