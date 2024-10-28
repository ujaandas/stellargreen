import Titlebar from "@/components/titlebar";
// import CesiumWrapper from "../components/cesium-wrapper";
import Sidebar from "@/components/sidebar";
import CesiumWrapper2 from "@/components/cesium-wrapper-2";

export default async function Home() {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 w-full">
        <Titlebar />
      </div>
      <div className="absolute top-16 left-0 w-full h-[calc(100%-4rem)]">
        <CesiumWrapper2 />
      </div>
      <div className="absolute top-16 left-0 h-[calc(100%-4rem)] bg-gray-800 z-10">
        <Sidebar />
      </div>
    </div>
  );
}
