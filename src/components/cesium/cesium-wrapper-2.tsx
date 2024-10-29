"use client";

import { useEffect, useState } from "react";
import { Viewer as CesiumViewer } from "cesium";
import useCameraState from "@/hooks/useCameraState";
import useImageryLayer from "@/hooks/useImageryLayer";
import CesiumViewerComponent from "./cesium-viewer";
import CameraFlyToComponent from "./cesium-camera-fly";
import "cesium/Build/Cesium/Widgets/widgets.css";

export default function CesiumWrapper() {
  const [cesiumViewer, setCesiumViewer] = useState<CesiumViewer | null>(null);
  useImageryLayer(cesiumViewer);
  const cameraState = useCameraState(cesiumViewer);

  useEffect(() => {
    if (cesiumViewer) {
      console.log("Cesium viewer initialized:", cesiumViewer);
    } else {
      console.log("Cesium viewer is not initialized yet.");
    }
  }, [cesiumViewer]);

  return (
    <CesiumViewerComponent setCesiumViewer={setCesiumViewer}>
      {cameraState && <CameraFlyToComponent cameraState={cameraState} />}
    </CesiumViewerComponent>
  );
}
