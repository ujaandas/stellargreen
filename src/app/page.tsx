import Titlebar from "@/components/titlebar";
import Sidebar from "@/components/sidebar";
import CesiumWrapper from "@/components/cesium-wrapper";
import RoundedBlock from "@/components/rounded-block";
import SidebarInfo from "@/components/sidebar-info";

export default async function Home() {
  const isSidebarInfoVisible = true;

  return (
    <div className="flex flex-row bg-[#17252b] h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Titlebar />
        <div
          className={`flex flex-row flex-grow transition-all duration-300 ${
            isSidebarInfoVisible ? "" : "justify-center"
          }`}
        >
          {isSidebarInfoVisible && (
            <div className="flex-none w-80 border-transparent border-l-[16px]">
              <RoundedBlock>
                <SidebarInfo />
              </RoundedBlock>
            </div>
          )}
          <div
            className={`flex-grow border-transparent border-l-[16px] border-r-[16px] ${
              isSidebarInfoVisible ? "" : "w-full"
            }`}
          >
            <RoundedBlock>
              <CesiumWrapper />
            </RoundedBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
