"use client";

import { Clock } from "lucide-react";

interface TimelapseButtonProps {
  isTimelapseOpen: boolean;
  setIsTimelapseOpen: (value: boolean) => void;
}

export default function TimelapseButton({
  isTimelapseOpen,
  setIsTimelapseOpen,
}: TimelapseButtonProps) {
  const handleTimelapseBtnClick = () => {
    setIsTimelapseOpen(!isTimelapseOpen);
  };

  return (
    <button
      className="flex justify-center items-center mx-auto h-8 w-42 p-2 bg-white rounded-full"
      onClick={() => handleTimelapseBtnClick()}
    >
      <Clock size={16} />
      <div className="ml-1">
        <h3 className="text-sm text-nowrap">Toggle Timelapse</h3>
      </div>
    </button>
  );
}
