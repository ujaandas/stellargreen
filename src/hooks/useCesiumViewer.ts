import { useEffect, useState } from "react";
import { Viewer as CesiumViewer } from "cesium";

export default function useCesiumViewer() {
  const [cesiumViewer, setCesiumViewer] = useState<CesiumViewer | null>(null);

  useEffect(() => {
    if (cesiumViewer) {
      console.log("cesiumViewer initialized", cesiumViewer);
    }
  }, [cesiumViewer]);

  return { cesiumViewer, setCesiumViewer };
}
