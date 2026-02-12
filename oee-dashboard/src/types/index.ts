export type MachineStatus = 'running' | 'idle' | 'warning' | 'error';

export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  
  // Dane produkcyjne
  targetProduction: number; // Cel na godzinę
  actualProduction: number; // Aktualnie wyprodukowane
  rejects: number;          // Odrzuty (braki)
  
  // Wskaźniki OEE (0-100%)
  availability: number;
  performance: number;
  quality: number;
  oee: number;
  
  // Do wykresu (historia z ostatnich np. 20 cykli pomiarowych)
  history: {
    timestamp: string;
    oee: number;
  }[];
}

export interface FactoryState {
  machines: Machine[];
  isRunning: boolean;
  toggleSimulation: () => void;
  updateMachines: () => void; // Funkcja "tick" wywoływana co interwał
}