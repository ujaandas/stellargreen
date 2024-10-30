import { useEffect, useState } from "react";
import shp from "shpjs";
import { FeatureCollection } from "geojson";

export default function useGeoJsonData() {
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection | null>(
    null
  );

  useEffect(() => {
    const loadShapefile = async () => {
      try {
        const response = await fetch("/HK_shapefile.zip");
        if (!response.ok) throw new Error("Failed to fetch shapefile.");
        const buffer = await response.arrayBuffer();
        const geojson = await shp(buffer);
        console.log(geojson);
        setGeoJsonData(geojson as FeatureCollection);
      } catch (error) {
        console.error("Error loading shapefile:", error);
      }
    };
    loadShapefile();
  }, []);

  return { geoJsonData };
}
