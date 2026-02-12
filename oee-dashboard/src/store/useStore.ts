import { create } from 'zustand';
import { format } from 'date-fns';
import { FactoryState, Machine, MachineStatus } from '../types';

// Helper: Generuje "sztuczną" historię, żeby wykres nie był pusty na starcie
const generateHistory = (baseOee: number) => {
  const history = [];
  const now = new Date();
  for (let i = 20; i > 0; i--) {
    history.push({
      timestamp: format(new Date(now.getTime() - i * 1000 * 60), 'HH:mm'), // co minutę wstecz
      oee: Math.max(0, Math.min(100, baseOee + (Math.random() - 0.5) * 10)), // Szum +/- 5%
    });
  }
  return history;
};

// Dane początkowe - 4 różne maszyny
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
    status: 'warning', // Zaczyna z ostrzeżeniem
    targetProduction: 200,
    actualProduction: 145,
    rejects: 12, // Dużo odrzutów
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
    oee: 97, // Wzorowa maszyna
    history: generateHistory(97),
  },
  {
    id: 'm4',
    name: 'Packaging Unit',
    status: 'error', // Zaczyna z awarią
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

export const useStore = create<FactoryState>((set) => ({
  machines: initialMachines,
  isRunning: false, // Domyślnie symulacja zatrzymana

  toggleSimulation: () => set((state) => ({ isRunning: !state.isRunning })),

  // "Serce" symulacji - wywoływane co interwał
  updateMachines: () =>
    set((state) => {
      if (!state.isRunning) return state;

      const newMachines = state.machines.map((machine) => {
        // Kopia maszyny, żeby nie mutować stanu bezpośrednio
        const updated = { ...machine };
        const random = Math.random();

        // 1. Symulacja Zmiany Statusu (Chaos Monkey)
        if (updated.status === 'running' && random > 0.99) {
          updated.status = 'error'; // 1% szansy na awarię
        } else if (updated.status === 'error' && random > 0.95) {
          updated.status = 'running'; // 5% szansy na naprawę
        } else if (updated.status === 'running' && random > 0.98) {
          updated.status = 'warning'; // 2% szansy na ostrzeżenie (np. przegrzanie)
        } else if (updated.status === 'warning' && random > 0.90) {
          updated.status = 'running'; // 10% szansy na powrót do normy
        }

        // 2. Symulacja Produkcji (tylko gdy działa)
        if (updated.status === 'running' || updated.status === 'warning') {
          // Produkcja rośnie
          updated.actualProduction += Math.floor(Math.random() * 2); // +0 lub +1 sztuka
          
          // Czasem zdarza się brak (Quality drop)
          if (Math.random() > 0.97) {
            updated.rejects += 1;
          }

          // 3. Dryfowanie wskaźników (OEE Simulation)
          // Zamiast liczyć ze wzoru, symulujemy realistyczne "pływanie" wskaźnika
          // OEE zmienia się o losową wartość od -2% do +2%
          const drift = (Math.random() - 0.5) * 4;
          updated.oee = Math.max(0, Math.min(100, updated.oee + drift));
        } else {
            // Jak maszyna stoi (error/idle), OEE spada szybciej
            updated.oee = Math.max(0, updated.oee - 0.5);
        }
        
        // Zaokrąglenie do 1 miejsca po przecinku
        updated.oee = Number(updated.oee.toFixed(1));

        // 4. Aktualizacja Historii (do wykresu)
        const newHistoryPoint = {
          timestamp: format(new Date(), 'HH:mm:ss'),
          oee: updated.oee,
        };

        // Trzymamy tylko ostatnie 20 punktów, żeby nie zapchać pamięci przeglądarki
        updated.history = [...updated.history.slice(1), newHistoryPoint];

        return updated;
      });

      return { machines: newMachines };
    }),
}));