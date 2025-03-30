
import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer, Settings, Save } from "lucide-react";

interface NavbarProps {
  onPrint: () => void;
  onSave: () => void;
  onSettings: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onPrint, onSave, onSettings }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-labelprint-blue">
            Print<span className="text-labelprint-lightblue">Palooza</span>
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex items-center gap-1"
            onClick={onSave}
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex items-center gap-1"
            onClick={onSettings}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={onPrint}
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
