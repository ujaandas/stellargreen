import { useCallback, useEffect, useState } from "react";
import {
  Cartographic,
  Math as CesiumMath,
  Viewer as CesiumViewer,
} from "cesium";

type CesiumCameraState = {
  position: Cartographic;
  heading: number;
  pitch: number;
  roll: number;
};

export default function useCameraState(cesiumViewer: CesiumViewer | null) {
  const [cameraState, setCameraState] = useState<CesiumCameraState | null>(
    null
  );

  const handleCameraChange = useCallback(() => {
    if (cesiumViewer) {
      const cam = cesiumViewer.scene.camera;
      const newCameraState: CesiumCameraState = {
        position: cam.positionCartographic.clone(),
        heading: CesiumMath.toDegrees(cam.heading),
        pitch: CesiumMath.toDegrees(cam.pitch),
        roll: CesiumMath.toDegrees(cam.roll),
      };
      setCameraState(newCameraState);
      console.log("Camera state updated", newCameraState);
    }
  }, [cesiumViewer]);

  useEffect(() => {
    if (cesiumViewer) {
      const camera = cesiumViewer.scene.camera;
      const onMoveStart = () => console.log("Camera started moving");
      const onMoveEnd = () => {
        handleCameraChange();
        console.log("Camera stopped moving");
      };
      camera.moveStart.addEventListener(onMoveStart);
      camera.moveEnd.addEventListener(onMoveEnd);
      return () => {
        camera.moveStart.removeEventListener(onMoveStart);
        camera.moveEnd.removeEventListener(onMoveEnd);
      };
    }
  }, [cesiumViewer, handleCameraChange]);

  return { cameraState, handleCameraChange };
}
