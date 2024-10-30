import { useState, useEffect } from "react";
import shp from "shpjs";
import { Viewer as CesiumViewer } from "cesium";
import { FeatureCollection } from "geojson";

export default function useFetchGeojson(
  paths: string[],
  cesiumViewer: CesiumViewer | null
): FeatureCollection[] {
  const [geoJsons, setGeoJsons] = useState<FeatureCollection[]>([]);

  useEffect(() => {
    const loadShapefiles = async () => {
      try {
        const geoJsonData = await Promise.all(
          paths.map(async (path) => {
            const response = await fetch(path);
            if (!response.ok)
              throw new Error(`Failed to fetch shapefile at ${path}.`);
            const buffer = await response.arrayBuffer();
            const geojson = (await shp(buffer)) as FeatureCollection;
            return geojson;
          })
        );
        setGeoJsons(geoJsonData);
      } catch (error) {
        console.error("Error loading shapefiles:", error);
      }
    };

    loadShapefiles();
  }, [cesiumViewer, paths]);

  return geoJsons;
}
