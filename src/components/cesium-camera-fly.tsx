import { CameraFlyTo } from "resium";
import { Cartesian3, Math as CesiumMath } from "cesium";

type CameraFlyToComponentProps = {
  cameraState: {
    position: {
      longitude: number;
      latitude: number;
      height: number;
    };
    heading: number;
    pitch: number;
    roll: number;
  };
};

export default function CameraFlyToComponent({
  cameraState,
}: CameraFlyToComponentProps) {
  return (
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
  );
}
