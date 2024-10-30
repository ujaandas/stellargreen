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
import TimelapseButton from "./timelapse/timelapse-button";
import { Skeleton } from "@/components/ui/skeleton";
import Timelapse from "./timelapse/timelapse";
import useYearStore from "@/stores/timelapse-year";

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_TOKEN ?? "";

export const cesiumIonYearMapping: { [key: number]: number } = {
  2019: 2792821,
  2020: 2792822,
  2021: 2792823,
  2022: 2792825,
  2023: 2792827,
};

type CesiumCameraState = {
  position: Cartographic;
  heading: number;
  pitch: number;
  roll: number;
};

export default function CesiumWrapper() {
  const [loading, setLoading] = useState(true);
  const [cesiumViewer, setCesiumViewer] = useState<CesiumViewer | null>(null);
  const [cameraState, setCameraState] = useState<CesiumCameraState | null>(
    null
  );
  const [isTimelapseOpen, setIsTimelapseOpen] = useState(false);
  const selectedYear = useYearStore((state) => state.selectedYear);

  const handleTimelapseBtnClick = () => {
    setIsTimelapseOpen(!isTimelapseOpen);
  };

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
        const imageryLayer = await IonImageryProvider.fromAssetId(
          cesiumIonYearMapping[selectedYear]
        );
        cesiumViewer.imageryLayers.addImageryProvider(imageryLayer);

        cesiumViewer.camera.flyTo({
          destination: imageryLayer.rectangle,
        });
        console.log("flying to", imageryLayer.rectangle);
      })();
    }
  }, [cesiumViewer, selectedYear]);

  useEffect(() => {
    if (cesiumViewer) {
      setLoading(false);
    }
  }, [cesiumViewer]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Skeleton className="w-full h-full bg-muted/15" />
        </div>
      )}
      <ResiumViewer
        ref={(element) => {
          if (element?.cesiumElement && !cesiumViewer) {
            setCesiumViewer(element.cesiumElement);
          }
        }}
        full={false}
        timeline={false}
        animation={false}
        geocoder={false}
        homeButton={false}
        sceneModePicker={false}
        navigationHelpButton={false}
        infoBox={false}
        selectionIndicator={false}
        className="w-full h-full"
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
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        {isTimelapseOpen && <Timelapse />}
        <TimelapseButton
          isTimelapseOpen={isTimelapseOpen}
          setIsTimelapseOpen={() => handleTimelapseBtnClick()}
        />
      </div>
    </div>
  );
}
