import { Braces, Images, Ruler, Trees } from "lucide-react";
import Image from "next/image";

interface SidebarNbsHeaderProps {
  title: string;
  numPhotos: number;
}

export default function SidebarNbsHeader({
  title,
  numPhotos,
}: SidebarNbsHeaderProps) {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between px-4 py-2 bg-[#1a483f]">
        <p className="text-yellow-500 font-semibold">🇭🇰 Hong Kong</p>
        <span className="flex flex-row text-gray-200 align-bottom items-center">
          <Trees size={18} />
          <p className="mx-1">Site</p>
        </span>
      </div>
      <div className="relative">
        <Image
          src="/placeholder.jpg"
          width="400"
          height="250"
          alt="kadoorie"
          className="aspect-[1.6] rounded-b-lg"
        />
        <div className="flex flex-row items-center justify-center bg-black bg-opacity-50 text-gray-200 text-xs rounded-lg px-2 py-1 absolute bottom-2 left-2">
          <Images size={12} className="mr-1" />
          <p>{numPhotos} photos</p>
        </div>
      </div>
      <div className="py-3 text-gray-200">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex flex-row justify-start text-gray-400">
          <span className="flex flex-row items-center align-bottom mr-2">
            <Ruler size={15} />
            <p className="ml-1 text-sm text-nowrap">1456.7 ha.</p>
          </span>
          <span className="flex flex-row items-center align-bottom mr-2">
            <Trees size={15} />
            <p className="ml-1 text-sm text-nowrap">Restoration</p>
          </span>
          <span className="flex flex-row items-center align-bottom mr-2">
            <Braces size={15} />
            <a
              href="https://kfbg.org"
              className="ml-1 text-sm text-nowrap underline"
            >
              kfbg.org
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
