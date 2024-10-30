import { useEffect, useState } from "react";
import { Viewer as CesiumViewer, IonImageryProvider } from "cesium";
import { cesiumIonYearMapping } from "@/lib/cesiumIonYearMapping";
import useYearStore from "@/stores/timelapse-year";

// Load the local TIFF file
const loadImageryLayer = async (
  cesiumViewer: CesiumViewer,
  selectedYear: number,
  firstLoad: boolean
) => {
  const imageryLayer = await IonImageryProvider.fromAssetId(
    cesiumIonYearMapping[selectedYear]
  );
  cesiumViewer.imageryLayers.addImageryProvider(imageryLayer);

  if (firstLoad) {
    cesiumViewer.camera.flyTo({
      destination: imageryLayer.rectangle,
    });
    console.log("flying to", imageryLayer.rectangle);
  }
};

export default function useCesiumViewer() {
  const [cesiumViewer, setCesiumViewer] = useState<CesiumViewer | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const selectedYear = useYearStore((state) => state.selectedYear);

  useEffect(() => {
    if (cesiumViewer) {
      console.log("cesiumViewer initialized", cesiumViewer);
      loadImageryLayer(cesiumViewer, selectedYear, firstLoad);
      setFirstLoad(false);
    }
  }, [cesiumViewer, firstLoad, selectedYear]);

  return { cesiumViewer, setCesiumViewer };
}
