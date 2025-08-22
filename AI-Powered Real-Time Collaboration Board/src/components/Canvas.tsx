import { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface CanvasProps {
  activeTool: string;
  strokeColor: string;
  strokeWidth: number;
}

export function Canvas({ activeTool, strokeColor, strokeWidth }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        setContext(ctx);
        
        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * devicePixelRatio;
        canvas.height = rect.height * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    }
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent) => {
    if (!context) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / zoom - pan.x;
    const y = (e.clientY - rect.top) / zoom - pan.y;

    if (activeTool === 'pan') {
      setIsDrawing(true);
      return;
    }

    setIsDrawing(true);
    
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth / zoom;
    
    if (activeTool === 'pen') {
      context.beginPath();
      context.moveTo(x, y);
    } else if (activeTool === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
      context.lineWidth = strokeWidth * 2 / zoom;
      context.beginPath();
      context.moveTo(x, y);
    }
  }, [context, activeTool, strokeColor, strokeWidth, zoom, pan]);

  const draw = useCallback((e: React.MouseEvent) => {
    if (!isDrawing || !context) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / zoom - pan.x;
    const y = (e.clientY - rect.top) / zoom - pan.y;

    if (activeTool === 'pan') {
      // Handle panning logic here
      return;
    }

    if (activeTool === 'pen' || activeTool === 'eraser') {
      context.lineTo(x, y);
      context.stroke();
    }
  }, [isDrawing, context, activeTool, zoom, pan]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    if (context) {
      context.closePath();
      // Reset composite operation for eraser
      context.globalCompositeOperation = 'source-over';
    }
  }, [context]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.1));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  };

  return (
    <div className="relative flex-1 overflow-hidden rounded-xl">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-crosshair canvas-grid ${
          activeTool === 'pan' ? 'cursor-grab' : ''
        }`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: 'top left'
        }}
      />

      {/* Canvas Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <div className="glass-panel rounded-lg p-2 flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 hover:bg-white/10"
            onClick={handleZoomOut}
          >
            <ZoomOut size={14} />
          </Button>
          <div className="px-2 py-1 text-xs font-medium min-w-12 text-center">
            {Math.round(zoom * 100)}%
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 hover:bg-white/10"
            onClick={handleZoomIn}
          >
            <ZoomIn size={14} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 hover:bg-white/10"
            onClick={handleReset}
          >
            <RotateCcw size={14} />
          </Button>
        </div>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-4 left-4 glass-panel rounded-lg px-3 py-2">
        <div className="text-xs font-medium">
          Canvas • {activeTool.charAt(0).toUpperCase() + activeTool.slice(1)} Tool
        </div>
      </div>
    </div>
  );
}