import { GeoJsonDataSource } from "resium";
import { Color } from "cesium";
import useGeoJsonData from "@/hooks/useGeoJsonData";

const ResiumGeoJsonLoader = () => {
  const { geoJsonData } = useGeoJsonData();

  return (
    geoJsonData && (
      <GeoJsonDataSource
        data={geoJsonData}
        stroke={Color.WHITE}
        fill={Color.WHITE.withAlpha(0.5)}
        strokeWidth={2}
      />
    )
  );
};

export default ResiumGeoJsonLoader;
