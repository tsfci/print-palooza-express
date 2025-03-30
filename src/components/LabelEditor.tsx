
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ZoomIn, ZoomOut, Save } from "lucide-react";
import { toast } from "sonner";

interface LabelEditorProps {
  onGeneratePrintContent: (content: React.ReactNode) => void;
}

interface LabelElement {
  id: string;
  type: 'text' | 'barcode' | 'qrcode' | 'image';
  content: string;
  position: { x: number; y: number };
  selected: boolean;
}

const LabelEditor: React.FC<LabelEditorProps> = ({ onGeneratePrintContent }) => {
  const [zoom, setZoom] = useState(100);
  const [elements, setElements] = useState<LabelElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const addElement = (type: 'text' | 'barcode' | 'qrcode' | 'image') => {
    const id = Date.now().toString();
    const newElement: LabelElement = {
      id,
      type,
      content: type === 'text' ? 'Sample Text' : '12345678',
      position: { x: 50, y: 50 },
      selected: true
    };
    
    // Deselect all other elements
    const updatedElements = elements.map(el => ({
      ...el,
      selected: false
    }));
    
    setElements([...updatedElements, newElement]);
    setSelectedElement(id);
    
    toast.success(`Added new ${type} element`);
  };

  const handleElementClick = (id: string) => {
    setElements(elements.map(el => ({
      ...el,
      selected: el.id === id
    })));
    setSelectedElement(id);
  };

  const saveLabel = () => {
    toast.success("Label saved successfully");
  };

  const handleGeneratePrint = () => {
    const printContent = (
      <div className="print-preview">
        <div 
          className="label-container" 
          style={{ 
            width: '384px',  // 4 inches at 96 DPI
            height: '288px', // 3 inches at 96 DPI
            position: 'relative',
            backgroundColor: 'white'
          }}
        >
          {elements.map(el => (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: `${el.position.x}px`,
                top: `${el.position.y}px`,
                padding: '2px',
                cursor: 'move',
              }}
            >
              {el.type === 'text' && (
                <div className="text-black">{el.content}</div>
              )}
              {el.type === 'barcode' && (
                <div className="flex flex-col items-center">
                  <div className="bg-[url('/barcode-sample.png')] bg-contain bg-no-repeat h-12 w-32"></div>
                  <div className="text-xs mt-1">{el.content}</div>
                </div>
              )}
              {el.type === 'qrcode' && (
                <div className="bg-[url('/qrcode-sample.png')] bg-contain bg-no-repeat h-20 w-20"></div>
              )}
              {el.type === 'image' && (
                <div className="bg-gray-200 h-16 w-16 flex items-center justify-center text-xs text-gray-500">
                  Image
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
    
    onGeneratePrintContent(printContent);
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  return (
    <div className="label-editor-container flex-1 overflow-hidden flex flex-col h-full">
      <div className="bg-gray-50 p-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select defaultValue="4x3">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4x3">4 × 3 in</SelectItem>
              <SelectItem value="4x6">4 × 6 in</SelectItem>
              <SelectItem value="2x1">2 × 1 in</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 bg-white border rounded-md px-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{zoom}%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={saveLabel}
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-100 p-8 flex items-center justify-center">
        <div 
          ref={editorRef}
          className="label-container"
          style={{ 
            width: '384px',  // 4 inches at 96 DPI
            height: '288px', // 3 inches at 96 DPI
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center',
            position: 'relative'
          }}
        >
          {elements.map(el => (
            <div
              key={el.id}
              onClick={() => handleElementClick(el.id)}
              style={{
                position: 'absolute',
                left: `${el.position.x}px`,
                top: `${el.position.y}px`,
                padding: '2px',
                border: el.selected ? '1px dashed #2563eb' : '1px solid transparent',
                cursor: 'move',
                backgroundColor: el.selected ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
              }}
            >
              {el.type === 'text' && (
                <div className="text-black">{el.content}</div>
              )}
              {el.type === 'barcode' && (
                <div className="flex flex-col items-center">
                  <div className="bg-[url('/barcode-sample.png')] bg-contain bg-no-repeat h-12 w-32"></div>
                  <div className="text-xs mt-1">{el.content}</div>
                </div>
              )}
              {el.type === 'qrcode' && (
                <div className="bg-[url('/qrcode-sample.png')] bg-contain bg-no-repeat h-20 w-20"></div>
              )}
              {el.type === 'image' && (
                <div className="bg-gray-200 h-16 w-16 flex items-center justify-center text-xs text-gray-500">
                  Image
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button 
        className="hidden" 
        id="generate-print-button" 
        onClick={handleGeneratePrint}
      >
        Generate Print Content
      </Button>
    </div>
  );
};

export default LabelEditor;
