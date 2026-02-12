import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, Settings, Radio, Cpu } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/' },
  { icon: Cpu, label: 'Machines', path: '/machines' }, // Nowa podstrona
  { icon: PieChart, label: 'Analytics', path: '/analytics' }, // Placeholder
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 lg:w-64 bg-[#1e293b]/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col z-50 transition-all duration-300">
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-700/50">
        <div className="bg-indigo-500/20 p-2 rounded-xl">
            <Radio className="text-indigo-400 w-6 h-6 animate-pulse" />
        </div>
        <span className="ml-3 font-bold text-xl tracking-tight hidden lg:block text-white">
          OEE<span className="text-indigo-400">Hero</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
              isActive 
                ? "bg-indigo-600/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]" 
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            )}
          >
            {({ isActive }) => (
              <>
                {/* Pasek aktywności po lewej (tylko active) */}
                {isActive && (
                  <motion.div 
                    layoutId="activeNav" 
                    className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                  />
                )}
                
                <item.icon className={clsx("w-5 h-5", isActive && "text-indigo-400")} />
                <span className="font-medium hidden lg:block">{item.label}</span>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                VS
            </div>
            <div className="hidden lg:block">
                <div className="text-sm font-medium text-white">Vesse00</div>
                <div className="text-xs text-slate-500">Admin View</div>
            </div>
        </div>
      </div>
    </aside>
  );
};