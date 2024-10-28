import { useEffect } from "react";
import { Ion, IonImageryProvider, Viewer } from "cesium";

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_TOKEN ?? "";

export default function useImageryLayer(cesiumViewer: Viewer | null) {
  useEffect(() => {
    if (cesiumViewer) {
      (async () => {
        const imageryLayer = await IonImageryProvider.fromAssetId(2770156);
        cesiumViewer.imageryLayers.addImageryProvider(imageryLayer);

        cesiumViewer.camera.flyTo({
          destination: imageryLayer.rectangle,
        });
        console.log("Flying to", imageryLayer.rectangle);
      })();
    }
  }, [cesiumViewer]);
}
