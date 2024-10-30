import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function NbsTabs() {
  const tabs = [
    {
      value: "overview",
      label: "Overview",
      content: "Overview content goes here",
    },
    {
      value: "key-index",
      label: "Key Index",
      content: "Key Index content goes here",
    },
    {
      value: "iucn-score",
      label: "IUCN Score",
      content: "IUCN Score content goes here",
    },
  ];

  return (
    <div className="flex justify-center w-full">
      <Tabs defaultValue="overview" className="w-full max-w-3xl">
        <TabsList className="relative h-10 w-full justify-between rounded-none p-0 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative h-10 flex-1 rounded-none px-4 pb-3 pt-2 font-semibold text-gray-400 hover:text-gray-200 data-[state=active]:text-green-500 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-gray-200 data-[state=active]:before:bg-green-500"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="mt-4 text-gray-400"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
