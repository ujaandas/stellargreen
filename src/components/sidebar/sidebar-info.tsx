// import useStore from "@/stores/menu-item";
import SidebarNbsHeader from "./nbs/sidebar-nbs-header";
import SidebarNbsTabs from "./nbs/sidebar-nbs-tabs";

export default async function SidebarInfo() {
  // const selectedMenuItem = useStore((state) => state.selectedMenuItem);
  const selectedMenuItem = "projects";
  return (
    <div className="flex flex-col w-full h-full">
      <div>
        {selectedMenuItem === "projects" && (
          <SidebarNbsHeader
            title="Kadoorie Farm & Botanical Garden"
            numPhotos={10}
          />
        )}
        <SidebarNbsTabs />
      </div>
    </div>
  );
}
