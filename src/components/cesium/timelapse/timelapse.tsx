"use client";

import { Slider } from "@/components/ui/slider";
import { cesiumIonYearMapping } from "@/lib/cesiumIonYearMapping";
import useYearStore from "@/stores/timelapse-year";

export default function Timelapse() {
  const years = cesiumIonYearMapping
    ? Object.keys(cesiumIonYearMapping).map(Number)
    : [];
  const selectedYear = useYearStore((state) => state.selectedYear);
  const setSelectedYear = useYearStore((state) => state.setSelectedYear);

  const handleSliderChange = (value: number[]) => {
    const nearestYear = years.reduce((prev, curr) =>
      Math.abs(curr - value[0]) < Math.abs(prev - value[0]) ? curr : prev
    );
    setSelectedYear(nearestYear);
  };

  return (
    <div className="w-96 max-w-md m-2 pt-2 px-4 mx-auto bg-[#17252b] bg-opacity-30 rounded-lg">
      <div className="pt-3">
        <Slider
          min={Math.min(...years)}
          max={Math.max(...years)}
          step={1}
          value={[selectedYear]}
          onValueChange={handleSliderChange}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          {years.map((y) => (
            <span
              key={y}
              className={`text-sm ${
                y === selectedYear ? "font-bold text-gray-200" : "text-gray-400"
              }`}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
