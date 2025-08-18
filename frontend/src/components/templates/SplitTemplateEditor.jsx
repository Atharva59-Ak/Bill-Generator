import React from 'react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "react-resizable-panels";
import { Card } from '../ui/card';

const SplitTemplateEditor = ({ template, children, previewContent }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[600px] rounded-lg border"
    >
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <div className="w-full">
            {children}
          </div>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6 bg-muted/20 dark:bg-muted/10">
          <Card className="w-full h-full overflow-auto shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Template Preview</h3>
              {previewContent}
            </div>
          </Card>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SplitTemplateEditor;