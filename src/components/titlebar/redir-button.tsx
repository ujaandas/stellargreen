"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface RedirButtonProps {
  content: string;
  loc: string;
  classname?: string;
}

export default function RedirButton({
  content,
  loc,
  classname,
}: RedirButtonProps) {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => router.push(loc)}
      className={`bg-transparent text-white border border-gray-500 ${classname}`}
    >
      {content}
    </Button>
  );
}
