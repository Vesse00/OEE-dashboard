import { create } from 'zustand';
import { format } from 'date-fns';
import toast from 'react-hot-toast'; // Importujemy toasta
import { FactoryState, Machine } from '../types';

// Helper historii (bez zmian)
const generateHistory = (baseOee: number) => {
  const history = [];
  const now = new Date();
  for (let i = 20; i > 0; i--) {
    history.push({
      timestamp: format(new Date(now.getTime() - i * 1000 * 60), 'HH:mm'),
      oee: Math.max(0, Math.min(100, baseOee + (Math.random() - 0.5) * 10)),
    });
  }
  return history;
};

const initialMachines: Machine[] = [
  {
    id: 'm1',
    name: 'CNC Milling Center A',
    status: 'running',
    targetProduction: 120,
    actualProduction: 98,
    rejects: 2,
    availability: 92,
    performance: 88,
    quality: 98,
    oee: 79,
    history: generateHistory(79),
  },
  {
    id: 'm2',
    name: 'Laser Cutter X200',
    status: 'warning',
    targetProduction: 200,
    actualProduction: 145,
    rejects: 12,
    availability: 85,
    performance: 75,
    quality: 89,
    oee: 56,
    history: generateHistory(56),
  },
  {
    id: 'm3',
    name: 'Assembly Robot Arm',
    status: 'running',
    targetProduction: 60,
    actualProduction: 59,
    rejects: 0,
    availability: 99,
    performance: 98,
    quality: 100,
    oee: 97,
    history: generateHistory(97),
  },
  {
    id: 'm4',
    name: 'Packaging Unit',
    status: 'error',
    targetProduction: 300,
    actualProduction: 45,
    rejects: 5,
    availability: 20,
    performance: 0,
    quality: 90,
    oee: 15,
    history: generateHistory(15),
  },
];

export const useStore = create<FactoryState>((set, get) => ({
  machines: initialMachines,
  isRunning: false,
  
  // Domyślne ustawienia
  settings: {
    notifications: true,
    soundEnabled: true,
    refreshRate: 1,
  },

  toggleSimulation: () => set((state) => ({ isRunning: !state.isRunning })),
  
  // Akcje ustawień
  toggleNotifications: () => set((state) => ({ 
    settings: { ...state.settings, notifications: !state.settings.notifications } 
  })),
  
  setRefreshRate: (rate) => set((state) => ({ 
    settings: { ...state.settings, refreshRate: rate } 
  })),

  updateMachines: () =>
    set((state) => {
      if (!state.isRunning) return state;

      const newMachines = state.machines.map((machine) => {
        const updated = { ...machine };
        const random = Math.random();

        // --- SYMULACJA AWARII Z POWIADOMIENIEM ---
        // Sprawdzamy, czy maszyna działała, a teraz losujemy błąd
        if (updated.status === 'running' && random > 0.99) {
          updated.status = 'error';
          
          // Jeśli powiadomienia włączone -> strzelamy Toastem
          if (state.settings.notifications) {
            toast.error(`CRITICAL: ${updated.name} has stopped!`, {
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #f43f5e',
              },
              iconTheme: {
                primary: '#f43f5e',
                secondary: '#fff',
              },
            });
          }
        } 
        // Inne zmiany statusów
        else if (updated.status === 'error' && random > 0.95) {
          updated.status = 'running';
          // Opcjonalnie: Toast o naprawieniu (na zielono)
           if (state.settings.notifications) {
            toast.success(`${updated.name} is back online.`, {
                style: { background: '#1e293b', color: '#fff', border: '1px solid #10b981' },
                iconTheme: { primary: '#10b981', secondary: '#fff' }
            });
           }
        } else if (updated.status === 'running' && random > 0.98) {
          updated.status = 'warning';
        } else if (updated.status === 'warning' && random > 0.90) {
          updated.status = 'running';
        }

        // Produkcja
        if (updated.status === 'running' || updated.status === 'warning') {
          updated.actualProduction += Math.floor(Math.random() * 2);
          if (Math.random() > 0.97) updated.rejects += 1;
          const drift = (Math.random() - 0.5) * 4;
          updated.oee = Math.max(0, Math.min(100, updated.oee + drift));
        } else {
          updated.oee = Math.max(0, updated.oee - 0.5);
        }
        
        updated.oee = Number(updated.oee.toFixed(1));
        const newHistoryPoint = {
          timestamp: format(new Date(), 'HH:mm:ss'),
          oee: updated.oee,
        };
        updated.history = [...updated.history.slice(1), newHistoryPoint];

        return updated;
      });

      return { machines: newMachines };
    }),
}));