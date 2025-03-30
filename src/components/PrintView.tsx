
import React from 'react';

interface PrintViewProps {
  content: React.ReactNode;
  visible: boolean;
}

const PrintView: React.FC<PrintViewProps> = ({ content, visible }) => {
  return (
    <div className={`print-preview ${visible ? '' : 'print-preview-hidden'}`}>
      {content}
    </div>
  );
};

export default PrintView;
