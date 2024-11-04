import { create } from "zustand";

export const locations = ["Hong Kong", "Junshan", "Bhutan", "Kadoorie"];

interface SelectedLocationStoreState {
  selectedLocation: string | null;
  setSelectedLocation: (location: string) => void;
}

const useSelectedLocationStore = create<SelectedLocationStoreState>((set) => ({
  selectedLocation: locations[0],
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));

export default useSelectedLocationStore;
