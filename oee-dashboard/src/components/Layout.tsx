import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex">
      <Sidebar />
      {/* Main Content Area - przesunięty o szerokość sidebara */}
      <main className="flex-1 ml-20 lg:ml-64 p-8 relative overflow-hidden">
        {/* Tło dekoracyjne (gradienty w tle) */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto animate-in fade-in zoom-in duration-500">
            {children}
        </div>
      </main>
    </div>
  );
};