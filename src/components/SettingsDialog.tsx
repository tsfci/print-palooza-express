
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const handleSave = () => {
    toast.success("Settings saved successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Print Settings</DialogTitle>
          <DialogDescription>
            Configure your label printer and label settings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-4 border rounded-md p-4">
            <h3 className="text-sm font-medium">Printer Settings</h3>
            
            <div className="space-y-1">
              <Label htmlFor="printer">Printer</Label>
              <Select defaultValue="default">
                <SelectTrigger id="printer">
                  <SelectValue placeholder="Select printer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">System Default</SelectItem>
                  <SelectItem value="zebra">Zebra LP 2844</SelectItem>
                  <SelectItem value="dymo">DYMO LabelWriter 450</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="dpi">Resolution (DPI)</Label>
              <Select defaultValue="300">
                <SelectTrigger id="dpi">
                  <SelectValue placeholder="Select DPI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="200">200 DPI</SelectItem>
                  <SelectItem value="300">300 DPI</SelectItem>
                  <SelectItem value="600">600 DPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4 border rounded-md p-4">
            <h3 className="text-sm font-medium">Label Settings</h3>
            
            <div className="space-y-1">
              <Label htmlFor="label-type">Label Type</Label>
              <Select defaultValue="standard">
                <SelectTrigger id="label-type">
                  <SelectValue placeholder="Select label type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="shipping">Shipping</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="width">Width (in)</Label>
                <Input id="width" type="number" defaultValue="4" min="1" max="12" step="0.1" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="height">Height (in)</Label>
                <Input id="height" type="number" defaultValue="3" min="1" max="12" step="0.1" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="auto-print" />
              <Label htmlFor="auto-print">Auto-print after generation</Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
