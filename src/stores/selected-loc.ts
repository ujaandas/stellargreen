import { create } from "zustand";

export const locations = ["hong_kong", "junshan", "bhutan", "kadoorie"];

interface SelectedLocationStoreState {
  selectedLocation: string | null;
  setSelectedLocation: (location: string) => void;
}

const useSelectedLocationStore = create<SelectedLocationStoreState>((set) => ({
  selectedLocation: locations[3],
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));

export default useSelectedLocationStore;
