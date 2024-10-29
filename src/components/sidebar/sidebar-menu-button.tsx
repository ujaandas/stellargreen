import { Button } from "@/components/ui/button";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface SidebarMenuButtonProps {
  item: {
    label: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  };
  onClick: () => void;
  selected: boolean;
}

export default function SidebarMenuButton({
  item,
  onClick,
  selected,
}: SidebarMenuButtonProps) {
  return (
    <Button
      key={item.label}
      variant="ghost"
      size="icon"
      className={`text-gray-400 hover:text-white hover:bg-gray-700 ${
        selected ? "bg-gray-700 text-white" : ""
      }`}
      onClick={onClick}
    >
      <item.icon className="h-6 w-6" color={selected ? "#4cc44f" : "#ffffff"} />
    </Button>
  );
}
