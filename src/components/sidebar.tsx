"use client";

import useStore, { menuItems } from "@/stores/menu-item";
import SidebarMenuButton from "./sidebar-menu-button";

export default function Sidebar() {
  const selectedMenuItem = useStore((state) => state.selectedMenuItem);
  const setSelectedMenuItem = useStore((state) => state.setSelectedMenuItem);

  const handleSidebarButtonClick = (selectedItem: string) => {
    if (selectedItem !== selectedMenuItem) {
      setSelectedMenuItem(selectedItem);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Narrow Sidebar */}
      <div className="w-16 bg-[#121d20] p-3 flex flex-col items-center justify-between">
        <div className="mt-16 space-y-4">
          {menuItems.map((item) => (
            <SidebarMenuButton
              key={item.label}
              item={item}
              onClick={() => handleSidebarButtonClick(item.label)}
              selected={selectedMenuItem === item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
