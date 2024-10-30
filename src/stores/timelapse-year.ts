import { create } from "zustand";

interface TimelapseYearState {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

const useYearStore = create<TimelapseYearState>((set) => ({
  selectedYear: 2023,
  setSelectedYear: (item) => set({ selectedYear: item }),
}));

export default useYearStore;
