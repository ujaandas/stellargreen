"use client";

import "cesium/Build/Cesium/Widgets/widgets.css";
import { useCallback, useEffect, useState } from "react";
import { Viewer as ResiumViewer } from "resium";
import { Cartesian2, defined, Ion, ScreenSpaceEventType } from "cesium";
import { Skeleton } from "@/components/ui/skeleton";
import useCesiumViewer from "@/hooks/useCesiumViewer";
import ResiumCamera from "./resium-camera";
import ResiumGeoJsonLoader from "./resium-geojson-loader";
import TimelapseWrapper from "./timelapse/timelapse-wrapper";
import useSelectedLocationStore from "@/stores/selected-loc";

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_TOKEN ?? "";

export default function ResiumWrapper() {
  const [loading, setLoading] = useState(true);
  const { cesiumViewer, setCesiumViewer } = useCesiumViewer();
  const setSelectedLocation = useSelectedLocationStore(
    (state) => state.setSelectedLocation
  );

  const handleJankyClick = useCallback(
    (properties: { [key: string]: unknown }) => {
      if (properties && properties["NAME_1"] == "Hong Kong") {
        console.log("Selected Hong Kong");
        setSelectedLocation("Hong Kong");
      } else if (properties && properties["DI_MAO"] == 5) {
        console.log("Selected Junshan");
        setSelectedLocation("Junshan");
      } else if (properties && properties["COUNTRY"] == "Bhutan") {
        console.log("Selected Bhutan");
        setSelectedLocation("Bhutan");
      }
    },
    [setSelectedLocation]
  );

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
              console.log(properties);
              handleJankyClick(properties);
            }
          }
        },
        ScreenSpaceEventType.LEFT_CLICK
      );
    }
  }, [cesiumViewer, handleJankyClick]);

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
        // creditContainer={document.createElement("none")} (against TOS, dont do this)
        className="w-full h-full"
      >
        <ResiumCamera cesiumViewer={cesiumViewer} />
        <ResiumGeoJsonLoader cesiumViewer={cesiumViewer} />
      </ResiumViewer>
      <TimelapseWrapper />
    </div>
  );
}
