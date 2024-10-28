import { useEffect, useRef } from "react";
import { CesiumComponentRef, Viewer as ResiumViewer } from "resium";
import { Viewer as CesiumViewer, Viewer } from "cesium";

type CesiumViewerComponentProps = {
  setCesiumViewer: (viewer: CesiumViewer) => void;
  children: React.ReactNode;
};

export default function CesiumViewerComponent({
  setCesiumViewer,
  children,
}: CesiumViewerComponentProps) {
  const viewerRef = useRef<CesiumComponentRef<Viewer>>(null);

  useEffect(() => {
    console.log("Setting viewer");
    if (viewerRef.current?.cesiumElement) {
      setCesiumViewer(viewerRef.current.cesiumElement);
    }
  }, [setCesiumViewer]);

  useEffect(() => {
    if (viewerRef.current?.cesiumElement) {
      setCesiumViewer(viewerRef.current.cesiumElement);
      console.log(
        "Cesium viewer element set:",
        viewerRef.current.cesiumElement
      );
    } else {
      console.log("Cesium viewer element is not available yet.");
    }
  }, [setCesiumViewer]);

  return (
    <ResiumViewer
      full
      ref={viewerRef}
      timeline={false}
      animation={false}
      geocoder={false}
      homeButton={false}
      sceneModePicker={false}
      navigationHelpButton={false}
      infoBox={false}
      selectionIndicator={false}
    >
      {children}
    </ResiumViewer>
  );
}
