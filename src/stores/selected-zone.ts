import { create } from "zustand";

interface SelectedZoneState {
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
}

const useSelectedZoneState = create<SelectedZoneState>((set) => ({
  selectedZone: "HK",
  setSelectedZone: (item) => set({ selectedZone: item }),
}));

export default useSelectedZoneState;
