"use client";

import { LocationTabData } from "@/app/api/[loc]/route";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useSelectedLocationStore from "@/stores/selected-loc";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NbsTabs() {
  const selectedLocation = useSelectedLocationStore(
    (state) => state.selectedLocation
  );
  const { data, error } = useSWR<LocationTabData>(
    `/api/${selectedLocation}`,
    fetcher
  );

  if (error) return <h3 className="text-gray-400">Error loading data</h3>;
  if (!data) return <h3 className="text-gray-400">Loading...</h3>;

  return (
    <div className="flex justify-center w-full">
      <Tabs defaultValue="overview" className="w-full max-w-3xl">
        <TabsList className="relative h-10 w-full justify-between rounded-none p-0 bg-transparent">
          <TabsTrigger
            key="overview"
            value="overview"
            className="relative h-10 flex-1 rounded-none px-4 pb-3 pt-2 font-semibold text-gray-400 hover:text-gray-200 data-[state=active]:text-green-500 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-gray-200 data-[state=active]:before:bg-green-500"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            key="keyIndex"
            value="keyIndex"
            className="relative h-10 flex-1 rounded-none px-4 pb-3 pt-2 font-semibold text-gray-400 hover:text-gray-200 data-[state=active]:text-green-500 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-gray-200 data-[state=active]:before:bg-green-500"
          >
            Key Index
          </TabsTrigger>
          <TabsTrigger
            key="iucnScore"
            value="iucnScore"
            className="relative h-10 flex-1 rounded-none px-4 pb-3 pt-2 font-semibold text-gray-400 hover:text-gray-200 data-[state=active]:text-green-500 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-gray-200 data-[state=active]:before:bg-green-500"
          >
            IUCN Score
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4 text-gray-400">
          {data.overview}
        </TabsContent>
        <TabsContent value="keyIndex" className="mt-4 text-gray-400">
          {data.keyIndex}
        </TabsContent>
        <TabsContent value="iucnScore" className="mt-4 text-gray-400">
          {data.iucnScore}
        </TabsContent>
      </Tabs>
    </div>
  );
}
