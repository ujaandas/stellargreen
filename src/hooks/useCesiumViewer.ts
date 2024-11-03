import { useEffect, useState } from "react";
import {
  Viewer as CesiumViewer,
  IonImageryProvider,
  UrlTemplateImageryProvider,
  WebMapTileServiceImageryProvider,
  WebMercatorTilingScheme,
} from "cesium";
import { cesiumIonYearMapping } from "@/lib/cesiumIonYearMapping";
import useYearStore from "@/stores/timelapse-year";

// Load the local TIFF file
const loadIonImageryLayer = async (
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

// Load locally served wmts server's imagery
const loadWmtsImageryLayer = async (
  cesiumViewer: CesiumViewer,
  selectedYear: number,
  firstLoad: boolean
) => {
  const imageryLayer = cesiumViewer.imageryLayers.addImageryProvider(
    //   new WebMapTileServiceImageryProvider({
    //     url: "http://localhost:8000/wmts",
    //     layer: "default",
    //     style: "default",
    //     format: "image/png",
    //     tileMatrixSetID: "default028mm",
    //     maximumLevel: 9,
    //     tileMatrixLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    //   })
    // );
    new UrlTemplateImageryProvider({
      url: "http://localhost:8000/tilesxyz/{z}/{x}/{y}.png",
      tileWidth: 256,
      tileHeight: 256,
      maximumLevel: 9,
      tilingScheme: new WebMercatorTilingScheme(),
      credit: "Custom Tiles",
    })
  );

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
      // loadIonImageryLayer(cesiumViewer, selectedYear, firstLoad);
      loadWmtsImageryLayer(cesiumViewer, selectedYear, firstLoad);
      // // Remove cesium logo (against TOS, dont do this)
      // cesiumViewer.cesiumWidget.creditContainer.parentNode?.removeChild(
      //   cesiumViewer.cesiumWidget.creditContainer
      // );
      setFirstLoad(false);
    }
  }, [cesiumViewer, firstLoad, selectedYear]);

  return { cesiumViewer, setCesiumViewer };
}
