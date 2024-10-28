"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

export default function NotifDropdown() {
  const [notifications, setNotifications] = useState<
    { id: number; message: string }[] // TODO: Add type for notification
  >([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      // Mock database query
      const newNotifications = [
        { id: 1, message: "New notification 1" },
        { id: 2, message: "New notification 2" },
        { id: 3, message: "New notification 3" }, // Example of a new notification
      ];

      // Check for new notifications
      const newNotifIds = newNotifications.map((notif) => notif.id);
      const existingNotifIds = notifications.map((notif) => notif.id);
      const isNew = newNotifIds.some((id) => !existingNotifIds.includes(id));

      if (isNew) {
        setHasNewNotifications(true);
      }

      setNotifications(newNotifications);
    };

    fetchNotifications(); // Initial fetch

    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000); // Fetch every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // TODO: Fix empty dependency array to run only once on mount

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-transparent text-gray-300 border border-gray-500"
          onClick={() => setHasNewNotifications(false)}
        >
          <Bell className="h-4 w-4" />
          {hasNewNotifications && (
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id}>
            {notification.message}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
