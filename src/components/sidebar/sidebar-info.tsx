"use client";

import useStore from "@/stores/menu-item";
import SidebarNbsHeader from "./nbs/sidebar-nbs-header";
import SidebarNbsTabs from "./nbs/sidebar-nbs-tabs";

export default function SidebarInfo() {
  const selectedMenuItem = useStore((state) => state.selectedMenuItem);
  return (
    <div className="flex flex-col w-full h-full">
      <div>
        {selectedMenuItem?.toLowerCase() === "projects" && (
          <div>
            <SidebarNbsHeader
              title="Kadoorie Farm & Botanical Garden"
              numPhotos={10}
            />
            <SidebarNbsTabs />
          </div>
        )}
      </div>
    </div>
  );
}
