"use client";

import { useState } from "react";
import {
  Home,
  Leaf,
  MapPin,
  Folder,
  Globe,
  X,
  Trees,
  PencilRuler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Leaf, label: "Projects" },
  { icon: MapPin, label: "Map" },
  { icon: Folder, label: "Documents" },
  { icon: Globe, label: "Resources" },
];

export default function Sidebar() {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleSidebarButtonClick = (selectedItem: string) => {
    setActiveItem(selectedItem === activeItem ? null : selectedItem);
    setIsSubmenuOpen(selectedItem !== activeItem);
  };

  const handleSidebarCloseClick = () => {
    setActiveItem(null);
    setIsSubmenuOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-72px)]">
      {/* Narrow Sidebar */}
      <div className="w-16 bg-[#121d20] p-3 flex flex-col items-center justify-between">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="icon"
              className={`text-gray-400 hover:text-white hover:bg-gray-700 ${
                activeItem === item.label ? "bg-gray-700 text-white" : ""
              }`}
              onClick={() => handleSidebarButtonClick(item.label)}
            >
              <item.icon
                className="h-6 w-6"
                color={`${activeItem === item.label ? "#4cc44f" : "#ffffff"}`}
              />
            </Button>
          ))}
        </div>
      </div>

      {/* Expandable Submenu */}
      {isSubmenuOpen && (
        <Card className="w-80 bg-gray-800 text-white border-none rounded-none">
          <Card className="w-80 bg-gray-800 text-white border-none rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <span className=" text-gray-400 px-2 py-1 rounded">
                    🇭🇰 Hong Kong
                  </span>
                  <span className="flex flex-row text-gray-400 align-baseline">
                    <Trees className="h-4 w-4 mx-1" />
                    Site
                  </span>
                </div>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSidebarCloseClick()}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Image
                src="https://picsum.photos/200/320"
                width={320}
                height={200}
                alt="Kadoorie Farm and Botanic Garden"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Kadoorie Farm and Botanic Garden
                </h3>
                <div className="flex flex-row text-sm text-gray-400 mb-4">
                  <span className="flex flex-row text-gray-400 align-baseline">
                    <PencilRuler className="h-4 w-4 mx-1" />
                    146.54 ha
                  </span>
                  <span className="flex flex-row text-gray-400 align-baseline mx-2">
                    <Trees className="h-4 w-4 mx-1" />
                    Restoration
                  </span>
                </div>
              </div>
              <div>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="key-index">Key index</TabsTrigger>
                    <TabsTrigger value="iucn-score">IUCN</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                  </TabsList>
                  <div className="border-b-2 border-gray-700 w-full"></div>
                  <TabsContent value="overview">
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">
                        Project Information
                      </h4>
                      <p className="text-sm text-gray-400">
                        As part of our drive to better understand the factors
                        that govern forest succession and constrain the
                        restoration of ecosystem resilience...
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </Card>
      )}
    </div>
  );
}
