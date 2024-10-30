import { GeoJsonDataSource } from "resium";
import { Color, Viewer as CesiumViewer } from "cesium";
import useFetchGeojson from "@/hooks/useFetchGeojson";

interface ResiumGeoJsonLoaderProps {
  cesiumViewer: CesiumViewer | null;
}

const ResiumGeoJsonLoader = ({ cesiumViewer }: ResiumGeoJsonLoaderProps) => {
  const geoJsons = useFetchGeojson(
    ["HK_shapefile.zip", "Junshan_shapefile.zip", "Bhutan_shapefile.zip"],
    cesiumViewer
  );

  return (
    <>
      {geoJsons.map((geoJson, index) => (
        <GeoJsonDataSource
          key={index}
          data={geoJson}
          markerColor={Color.RED}
          stroke={Color.WHITE}
          fill={Color.WHITE.withAlpha(0.5)}
        />
      ))}
    </>
  );
};

export default ResiumGeoJsonLoader;
