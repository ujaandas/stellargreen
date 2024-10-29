import { Clock } from "lucide-react";

export default function Timelapse() {
  return (
    <div className="flex justify-center items-center mx-auto h-8 w-36 p-2 bg-white rounded-full">
      <Clock size={16} />
      <div className="ml-1">
        <h3 className="text-sm text-nowrap">View Timelapse</h3>
      </div>
    </div>
  );
}
