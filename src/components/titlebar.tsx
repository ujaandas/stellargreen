"use server";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import RedirButton from "./redir-button";
import NotifDropdown from "./notif-dropdown";

export default async function Header() {
  return (
    <header className="p-4 w-full shadow-xl bg-gradient-to-r from-[#2c544a] to-[#222f3c] text-gray-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold hidden sm:inline mb-1">
            StellarGreen NbS Management Platform
          </h1>
          <h1 className="text-xl font-bold sm:hidden">StellarGreen</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-300 bg-transparent" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px] text-gray-300 bg-transparent border border-gray-500"
            />
          </div>
          <RedirButton content="Login" loc="login" classname="text-gray-300" />
          <NotifDropdown />
        </div>
      </div>
    </header>
  );
}
