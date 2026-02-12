export type MachineStatus = 'running' | 'idle' | 'warning' | 'error';

export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  
  // Dane produkcyjne
  targetProduction: number;
  actualProduction: number;
  rejects: number;
  
  // Wskaźniki OEE
  availability: number;
  performance: number;
  quality: number;
  oee: number;
  
  // Historia
  history: {
    timestamp: string;
    oee: number;
  }[];
}

// Nowy interfejs dla ustawień
export interface AppSettings {
  notifications: boolean;
  soundEnabled: boolean;
  refreshRate: number;
}

export interface FactoryState {
  machines: Machine[];
  isRunning: boolean;
  settings: AppSettings; // <--- Dodajemy ustawienia do stanu
  
  toggleSimulation: () => void;
  updateMachines: () => void;
  toggleNotifications: () => void; // <--- Akcja do przełączania
  setRefreshRate: (rate: number) => void;
}