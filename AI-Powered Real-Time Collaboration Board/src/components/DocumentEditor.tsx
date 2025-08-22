import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  Sparkles,
  Wand2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentEditorProps {
  onAIAssist: (prompt: string, context: string) => void;
}

export function DocumentEditor({ onAIAssist }: DocumentEditorProps) {
  const [content, setContent] = useState(`# Intelligent Collaborative Platform

Welcome to our revolutionary collaboration space where creativity meets productivity.

## Key Features

- **Real-time Whiteboard**: Draw, sketch, and brainstorm together
- **Smart Document Editor**: Rich text editing with AI assistance  
- **Live Collaboration**: See your teammates' cursors and edits in real-time
- **AI-Powered Suggestions**: Get intelligent content recommendations

Start collaborating by selecting a tool from the sidebar or begin typing here...`);

  const [isAIProcessing, setIsAIProcessing] = useState(false);

  const formatButtons = [
    { icon: Bold, action: 'bold', tooltip: 'Bold' },
    { icon: Italic, action: 'italic', tooltip: 'Italic' },
    { icon: Underline, action: 'underline', tooltip: 'Underline' },
    { icon: AlignLeft, action: 'align-left', tooltip: 'Align Left' },
    { icon: AlignCenter, action: 'align-center', tooltip: 'Align Center' },
    { icon: AlignRight, action: 'align-right', tooltip: 'Align Right' },
    { icon: List, action: 'bullet-list', tooltip: 'Bullet List' },
    { icon: ListOrdered, action: 'numbered-list', tooltip: 'Numbered List' },
    { icon: Quote, action: 'quote', tooltip: 'Quote' },
    { icon: Code, action: 'code', tooltip: 'Code Block' },
  ];

  const handleFormat = (action: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newContent = content;

    switch (action) {
      case 'bold':
        newContent = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        break;
      case 'italic':
        newContent = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
        break;
      case 'bullet-list':
        newContent = content.substring(0, start) + `\n- ${selectedText}\n` + content.substring(end);
        break;
      case 'numbered-list':
        newContent = content.substring(0, start) + `\n1. ${selectedText}\n` + content.substring(end);
        break;
      case 'quote':
        newContent = content.substring(0, start) + `\n> ${selectedText}\n` + content.substring(end);
        break;
      case 'code':
        newContent = content.substring(0, start) + `\`\`\`\n${selectedText}\n\`\`\`` + content.substring(end);
        break;
    }

    setContent(newContent);
  };

  const handleAIAssist = async (type: 'improve' | 'summarize' | 'expand') => {
    if (!content.trim()) return;
    
    setIsAIProcessing(true);
    
    const prompts = {
      improve: 'Improve this text for clarity and engagement',
      summarize: 'Create a concise summary of this content',
      expand: 'Expand this content with more details and examples'
    };

    try {
      // Simulate AI processing with mock responses
      const mockResponses = {
        improve: content.replace(/\b\w+/g, (word) => word.length > 3 ? word + '+' : word),
        summarize: `**Summary:** ${content.split(' ').slice(0, 20).join(' ')}...`,
        expand: content + '\n\n**Additional Details:**\n- Enhanced functionality\n- Improved user experience\n- Better performance'
      };

      setTimeout(() => {
        setContent(mockResponses[type]);
        setIsAIProcessing(false);
      }, 1500);
      
    } catch (error) {
      setIsAIProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-xl overflow-hidden">
      {/* Editor Toolbar */}
      <div className="glass-panel border-b border-border/50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {formatButtons.map((button) => (
              <Button
                key={button.action}
                variant="ghost"
                size="icon"
                className="w-8 h-8 hover:bg-white/10"
                title={button.tooltip}
                onClick={() => handleFormat(button.action)}
              >
                <button.icon size={14} />
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAIAssist('improve')}
              disabled={isAIProcessing}
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:from-primary/20 hover:to-accent/20"
            >
              <Wand2 size={14} className="mr-1" />
              Improve
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAIAssist('summarize')}
              disabled={isAIProcessing}
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:from-primary/20 hover:to-accent/20"
            >
              <Sparkles size={14} className="mr-1" />
              Summarize
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAIAssist('expand')}
              disabled={isAIProcessing}
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:from-primary/20 hover:to-accent/20"
            >
              <Sparkles size={14} className="mr-1" />
              Expand
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full resize-none border-none bg-transparent text-foreground placeholder:text-muted-foreground focus:ring-0 font-mono text-sm leading-relaxed"
          placeholder="Start writing your collaborative document..."
        />
      </div>

      {/* Status Bar */}
      <div className="glass-panel border-t border-border/50 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{content.length} characters</span>
            <span>{content.split('\n').length} lines</span>
            <span>{content.split(' ').length} words</span>
          </div>
          <div className="flex items-center gap-2">
            {isAIProcessing && (
              <div className="flex items-center gap-1">
                <Sparkles size={12} className="animate-spin text-primary" />
                <span className="text-primary">AI processing...</span>
              </div>
            )}
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span>Auto-saved</span>
          </div>
        </div>
      </div>
    </div>
  );
}