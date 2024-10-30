import { CameraFlyTo } from "resium";
import { Cartesian3, Math as CesiumMath, Viewer as CesiumViewer } from "cesium";
import useCameraState from "@/hooks/useCameraState";

interface ResiumCameraProps {
  cesiumViewer: CesiumViewer | null;
}

const ResiumCamera = ({ cesiumViewer }: ResiumCameraProps) => {
  const { cameraState } = useCameraState(cesiumViewer);

  return (
    cameraState && (
      <CameraFlyTo
        destination={Cartesian3.fromRadians(
          cameraState.position.longitude,
          cameraState.position.latitude,
          cameraState.position.height
        )}
        orientation={{
          heading: CesiumMath.toRadians(cameraState.heading),
          pitch: CesiumMath.toRadians(cameraState.pitch),
          roll: CesiumMath.toRadians(cameraState.roll),
        }}
      />
    )
  );
};

export default ResiumCamera;
