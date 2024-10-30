"use client";

import { useEffect, useState } from "react";
import { Viewer as ResiumViewer, CameraFlyTo, GeoJsonDataSource } from "resium";
import { Ion, Math as CesiumMath, Cartesian3, Color } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import TimelapseButton from "./timelapse/timelapse-button";
import { Skeleton } from "@/components/ui/skeleton";
import Timelapse from "./timelapse/timelapse";
import useCesiumViewer from "@/hooks/useCesiumViewer";
import useCameraState from "@/hooks/useCameraState";
import useGeoJsonData from "@/hooks/useGeoJsonData";

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_TOKEN ?? "";

export default function CesiumWrapper() {
  const [loading, setLoading] = useState(true);
  const [isTimelapseOpen, setIsTimelapseOpen] = useState(false);
  const { cesiumViewer, setCesiumViewer } = useCesiumViewer();
  const { cameraState } = useCameraState(cesiumViewer);
  const { geoJsonData } = useGeoJsonData();

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
        {geoJsonData && (
          <GeoJsonDataSource
            data={geoJsonData}
            stroke={Color.WHITE}
            fill={Color.WHITE.withAlpha(0.5)}
            strokeWidth={2}
          />
        )}
      </ResiumViewer>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        {isTimelapseOpen && <Timelapse />}
        <TimelapseButton
          isTimelapseOpen={isTimelapseOpen}
          setIsTimelapseOpen={() => setIsTimelapseOpen(!isTimelapseOpen)}
        />
      </div>
    </div>
  );
}
