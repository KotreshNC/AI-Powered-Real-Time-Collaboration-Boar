import { Button } from "@/components/ui/button";
import { 
  Pen, 
  Minus, 
  Square, 
  Circle, 
  ArrowUpRight, 
  Type, 
  Eraser, 
  Palette,
  ZoomIn,
  ZoomOut,
  Hand,
  Undo,
  Redo
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  strokeColor: string;
  onColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
}

const tools = [
  { id: 'pen', icon: Pen, label: 'Free Draw' },
  { id: 'line', icon: Minus, label: 'Line' },
  { id: 'rectangle', icon: Square, label: 'Rectangle' },
  { id: 'ellipse', icon: Circle, label: 'Ellipse' },
  { id: 'arrow', icon: ArrowUpRight, label: 'Arrow' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'eraser', icon: Eraser, label: 'Eraser' },
];

const colors = [
  '#8B5CF6', '#EF4444', '#10B981', '#F59E0B', '#3B82F6', 
  '#EC4899', '#14B8A6', '#F97316', '#8B5A2B', '#000000'
];

const strokeWidths = [1, 2, 4, 8, 12];

export function Toolbar({ 
  activeTool, 
  onToolChange, 
  strokeColor, 
  onColorChange,
  strokeWidth,
  onStrokeWidthChange 
}: ToolbarProps) {
  return (
    <div className="glass-panel rounded-xl p-3 space-y-4 animate-slide-up">
      {/* Drawing Tools */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Tools
        </div>
        <div className="grid grid-cols-2 gap-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id)}
              className={cn(
                "tool-btn group relative",
                activeTool === tool.id && "active"
              )}
              title={tool.label}
            >
              <tool.icon size={18} />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none">
                {tool.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Tools */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Actions
        </div>
        <div className="grid grid-cols-2 gap-1">
          <button className="tool-btn group" title="Undo">
            <Undo size={18} />
          </button>
          <button className="tool-btn group" title="Redo">
            <Redo size={18} />
          </button>
          <button className="tool-btn group" title="Zoom In">
            <ZoomIn size={18} />
          </button>
          <button className="tool-btn group" title="Pan">
            <Hand size={18} />
          </button>
        </div>
      </div>

      {/* Stroke Width */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Stroke Width
        </div>
        <div className="flex flex-col gap-1">
          {strokeWidths.map((width) => (
            <button
              key={width}
              onClick={() => onStrokeWidthChange(width)}
              className={cn(
                "w-full h-8 rounded-lg flex items-center justify-center transition-all",
                "hover:bg-white/10",
                strokeWidth === width && "bg-primary/20 border border-primary"
              )}
            >
              <div 
                className="rounded-full bg-foreground"
                style={{ 
                  width: Math.max(width * 1.5, 2), 
                  height: Math.max(width * 1.5, 2) 
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Colors
        </div>
        <div className="grid grid-cols-2 gap-1">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={cn(
                "w-full h-8 rounded-lg transition-all hover:scale-105",
                strokeColor === color && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
              )}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}