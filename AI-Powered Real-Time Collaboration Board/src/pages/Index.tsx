import { useState } from 'react';
import { Header } from '@/components/Header';
import { Toolbar } from '@/components/Toolbar';
import { Canvas } from '@/components/Canvas';
import { CollaboratorsPanel } from '@/components/CollaboratorsPanel';
import { DocumentEditor } from '@/components/DocumentEditor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PenTool, FileText, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTool, setActiveTool] = useState('pen');
  const [strokeColor, setStrokeColor] = useState('#8B5CF6');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [activeTab, setActiveTab] = useState('whiteboard');
  const { toast } = useToast();

  const handleAIAssist = async (prompt: string, context: string) => {
    toast({
      title: "AI Assistant",
      description: "Processing your request...",
    });
    
    // Mock AI response for demo
    setTimeout(() => {
      toast({
        title: "AI Suggestions Ready",
        description: "Your content has been enhanced with AI assistance.",
      });
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools */}
        <div className="w-20 p-4 space-y-4 border-r border-border/50">
          <Toolbar
            activeTool={activeTool}
            onToolChange={setActiveTool}
            strokeColor={strokeColor}
            onColorChange={setStrokeColor}
            strokeWidth={strokeWidth}
            onStrokeWidthChange={setStrokeWidth}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col p-4 gap-4">
          {/* Tab Navigation */}
          <div className="glass-panel rounded-xl p-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-transparent">
                <TabsTrigger 
                  value="whiteboard" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <PenTool size={16} />
                  Whiteboard
                </TabsTrigger>
                <TabsTrigger 
                  value="document" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <FileText size={16} />
                  Document
                </TabsTrigger>
                <TabsTrigger 
                  value="ai" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Zap size={16} />
                  AI Assistant
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-4 h-[calc(100vh-200px)]">
                <TabsContent value="whiteboard" className="h-full m-0">
                  <Canvas
                    activeTool={activeTool}
                    strokeColor={strokeColor}
                    strokeWidth={strokeWidth}
                  />
                </TabsContent>
                
                <TabsContent value="document" className="h-full m-0">
                  <DocumentEditor onAIAssist={handleAIAssist} />
                </TabsContent>
                
                <TabsContent value="ai" className="h-full m-0">
                  <div className="h-full glass-panel rounded-xl p-8 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center">
                        <Zap size={24} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">AI Assistant</h3>
                      <p className="text-muted-foreground max-w-md">
                        Your intelligent collaboration partner. Use the AI buttons in the document editor
                        or whiteboard to get smart suggestions and improvements.
                      </p>
                      <Button 
                        className="bg-gradient-to-r from-primary to-accent"
                        onClick={() => setActiveTab('document')}
                      >
                        Try AI in Document Editor
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar - Collaborators */}
        <div className="w-80 p-4">
          <CollaboratorsPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
