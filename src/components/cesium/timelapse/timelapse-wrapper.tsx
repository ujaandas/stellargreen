import { useState } from "react";
import Timelapse from "./timelapse";
import TimelapseButton from "./timelapse-button";

const TimelapseWrapper = () => {
  const [isTimelapseOpen, setIsTimelapseOpen] = useState(false);

  return (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
      {isTimelapseOpen && <Timelapse />}
      <TimelapseButton
        isTimelapseOpen={isTimelapseOpen}
        setIsTimelapseOpen={() => setIsTimelapseOpen(!isTimelapseOpen)}
      />
    </div>
  );
};

export default TimelapseWrapper;
