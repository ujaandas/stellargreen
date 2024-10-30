import { create } from "zustand";
import { Home, Leaf, MapPin, Folder, Globe } from "lucide-react";

export const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Leaf, label: "Projects" },
  { icon: MapPin, label: "Map" },
  { icon: Folder, label: "Documents" },
  { icon: Globe, label: "Resources" },
];

interface MenuStoreState {
  selectedMenuItem: string | null;
  setSelectedMenuItem: (item: string) => void;
}

const useMenuStore = create<MenuStoreState>((set) => ({
  selectedMenuItem: menuItems[0].label,
  setSelectedMenuItem: (item) => set({ selectedMenuItem: item }),
}));

export default useMenuStore;
