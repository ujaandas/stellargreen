"use client";

import "cesium/Build/Cesium/Widgets/widgets.css";
import { useEffect, useState } from "react";
import { Viewer as ResiumViewer } from "resium";
import { Cartesian2, defined, Ion, ScreenSpaceEventType } from "cesium";
import { Skeleton } from "@/components/ui/skeleton";
import useCesiumViewer from "@/hooks/useCesiumViewer";
import ResiumCamera from "./resium-camera";
import ResiumGeoJsonLoader from "./resium-geojson-loader";
import TimelapseWrapper from "./timelapse/timelapse-wrapper";

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_TOKEN ?? "";

export default function ResiumWrapper() {
  const [loading, setLoading] = useState(true);
  const { cesiumViewer, setCesiumViewer } = useCesiumViewer();

  useEffect(() => {
    if (cesiumViewer) {
      setLoading(false);
    }
  }, [cesiumViewer]);

  useEffect(() => {
    if (cesiumViewer) {
      cesiumViewer.screenSpaceEventHandler.setInputAction(
        (event: { position: Cartesian2 }) => {
          const pickedObject = cesiumViewer.scene.pick(event.position);
          if (defined(pickedObject)) {
            const id = pickedObject.id;
            if (id && id.properties) {
              const properties = id.properties.getValue();
              console.log("Clicked feature properties:", {
                Name: properties.Name,
                Description: properties.descriptio,
                Area: properties.Shape_Area,
                Length: properties.Shape_Leng,
              });
            }
          }
        },
        ScreenSpaceEventType.LEFT_CLICK
      );
    }
  }, [cesiumViewer]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Skeleton className="w-full h-full bg-muted/15" />{" "}
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
        <ResiumCamera cesiumViewer={cesiumViewer} />
        <ResiumGeoJsonLoader cesiumViewer={cesiumViewer} />
      </ResiumViewer>
      <TimelapseWrapper />
    </div>
  );
}
