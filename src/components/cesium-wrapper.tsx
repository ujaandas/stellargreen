"use client";

import { useCallback, useEffect, useState } from "react";
import { Viewer as ResiumViewer, CameraFlyTo } from "resium";
import {
  Ion,
  Viewer as CesiumViewer,
  Math as CesiumMath,
  Cartesian3,
  Cartographic,
  IonImageryProvider,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_TOKEN ?? "";

type CesiumCameraState = {
  position: Cartographic;
  heading: number;
  pitch: number;
  roll: number;
};

export default function CesiumWrapper() {
  const [cesiumViewer, setCesiumViewer] = useState<CesiumViewer | null>(null);
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

      const onMoveStart = () => {
        console.log("Camera started moving");
      };

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

  useEffect(() => {
    if (cesiumViewer) {
      console.log("cesiumViewer", cesiumViewer);

      // Load the local TIFF file

      (async () => {
        // const imageryProvider = new SingleTileImageryProvider({
        //   url: "/sample7.tif",
        //   tileWidth: 32767,
        //   tileHeight: 32767,
        // });
        const imageryLayer = await IonImageryProvider.fromAssetId(2770156);
        cesiumViewer.imageryLayers.addImageryProvider(imageryLayer);

        cesiumViewer.camera.flyTo({
          destination: imageryLayer.rectangle,
        });
        console.log("flying to", imageryLayer.rectangle);
      })();
    }
  }, [cesiumViewer]);

  return (
    <ResiumViewer
      full
      ref={(element) => {
        if (element?.cesiumElement && !cesiumViewer) {
          setCesiumViewer(element.cesiumElement);
        }
      }}
      timeline={false}
      animation={false}
      // baseLayerPicker={false}
      geocoder={false}
      homeButton={false}
      sceneModePicker={false}
      navigationHelpButton={false}
      infoBox={false}
      selectionIndicator={false}
    >
      {cameraState && (
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
      )}
    </ResiumViewer>
  );
}
