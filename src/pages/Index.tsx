
import React, { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import LabelEditor from '@/components/LabelEditor';
import PrintView from '@/components/PrintView';
import SettingsDialog from '@/components/SettingsDialog';

const Index = () => {
  const [printContent, setPrintContent] = useState<React.ReactNode | null>(null);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const labelEditorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handlePrint = () => {
    const generatePrintButton = document.getElementById('generate-print-button');
    if (generatePrintButton) {
      generatePrintButton.click();
      setTimeout(() => {
        setIsPrintMode(true);
        setTimeout(() => {
          window.print();
          setIsPrintMode(false);
        }, 100);
      }, 100);
    } else {
      toast({
        title: "Error",
        description: "Could not generate print content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Label template saved successfully!",
    });
  };

  const handleAddText = () => {
    // These functions will be handled by the LabelEditor component
    // to trigger the actual element addition
    if (labelEditorRef.current) {
      // This is a simplified approach - in a real app you'd use refs or callbacks
      const event = new CustomEvent('addText');
      document.dispatchEvent(event);
    }
  };

  const handleAddBarcode = () => {
    // Same concept as handleAddText
    const event = new CustomEvent('addBarcode');
    document.dispatchEvent(event);
  };

  const handleAddQrCode = () => {
    // Same concept as handleAddText
    const event = new CustomEvent('addQrCode');
    document.dispatchEvent(event);
  };

  const handleAddImage = () => {
    // Same concept as handleAddText
    const event = new CustomEvent('addImage');
    document.dispatchEvent(event);
  };

  return (
    <div className="flex flex-col h-screen bg-labelprint-background">
      <Navbar 
        onPrint={handlePrint} 
        onSave={handleSave} 
        onSettings={() => setShowSettings(true)} 
      />
      
      <main className="flex flex-1 overflow-hidden">
        <Sidebar 
          onAddText={handleAddText}
          onAddBarcode={handleAddBarcode}
          onAddQrCode={handleAddQrCode}
          onAddImage={handleAddImage}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden" ref={labelEditorRef}>
          <LabelEditor onGeneratePrintContent={setPrintContent} />
        </div>
      </main>
      
      <PrintView content={printContent} visible={isPrintMode} />
      
      <SettingsDialog 
        open={showSettings} 
        onOpenChange={setShowSettings} 
      />
    </div>
  );
};

export default Index;
