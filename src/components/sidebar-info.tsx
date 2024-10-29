"use client";

import useStore from "@/stores/menu-item";

export default function SidebarInfo() {
  const selectedMenuItem = useStore((state) => state.selectedMenuItem);
  return (
    <div className="flex flex-col w-full h-full p-4 bg-white">
      <h2>Selected Menu Item: {selectedMenuItem}</h2>
    </div>
  );
}
