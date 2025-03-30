
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Type, 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Barcode, 
  QrCode,
  TextIcon,
  Image
} from "lucide-react";

interface SidebarProps {
  onAddText: () => void;
  onAddBarcode: () => void;
  onAddQrCode: () => void;
  onAddImage: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onAddText, 
  onAddBarcode, 
  onAddQrCode,
  onAddImage 
}) => {
  return (
    <div className="w-full lg:w-80 border-r border-gray-200 bg-white h-full">
      <Tabs defaultValue="elements" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>
        
        <TabsContent value="elements" className="p-4 space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">Add to Label</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20"
                onClick={onAddText}
              >
                <TextIcon className="h-8 w-8 mb-1 text-labelprint-blue" />
                <span className="text-xs">Text</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20"
                onClick={onAddBarcode}
              >
                <Barcode className="h-8 w-8 mb-1 text-labelprint-blue" />
                <span className="text-xs">Barcode</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20"
                onClick={onAddQrCode}
              >
                <QrCode className="h-8 w-8 mb-1 text-labelprint-blue" />
                <span className="text-xs">QR Code</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20"
                onClick={onAddImage}
              >
                <Image className="h-8 w-8 mb-1 text-labelprint-blue" />
                <span className="text-xs">Image</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">Templates</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <span>Shipping Label</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span>Product Label</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span>Address Label</span>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="properties" className="p-4 space-y-4">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium">Text Properties</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="text-content">Content</Label>
                  <Input id="text-content" placeholder="Enter text..." />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="font-family">Font</Label>
                  <Select defaultValue="arial">
                    <SelectTrigger id="font-family">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="times">Times New Roman</SelectItem>
                      <SelectItem value="courier">Courier New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Label htmlFor="font-size">Size</Label>
                    <span className="text-xs text-gray-500">12pt</span>
                  </div>
                  <Slider 
                    id="font-size" 
                    defaultValue={[12]} 
                    max={72} 
                    min={6} 
                    step={1} 
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <div className="flex-1"></div>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium">Barcode Properties</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="barcode-value">Value</Label>
                  <Input id="barcode-value" placeholder="Enter value..." />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="barcode-type">Type</Label>
                  <Select defaultValue="code128">
                    <SelectTrigger id="barcode-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="code128">Code 128</SelectItem>
                      <SelectItem value="code39">Code 39</SelectItem>
                      <SelectItem value="ean13">EAN-13</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="show-text" className="flex-1">Show Text</Label>
                  <Switch id="show-text" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
