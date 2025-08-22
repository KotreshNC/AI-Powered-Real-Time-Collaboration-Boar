import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Share, 
  Settings, 
  Download, 
  Upload,
  Sparkles,
  Wifi,
  Clock
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="glass-panel border-b border-border/50 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo & Project */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Synapse Studio
              </h1>
            </div>
          </div>
          
          <div className="w-px h-6 bg-border" />
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
            <Input 
              defaultValue="Intelligent Collaborative Platform" 
              className="bg-transparent border-none text-sm font-medium min-w-[200px]"
            />
          </div>
        </div>

        {/* Center Section - Status */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Wifi size={12} />
            <span>4 collaborators</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>Last saved: now</span>
          </div>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="tool-btn">
            <Upload size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="tool-btn">
            <Download size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="tool-btn">
            <Settings size={16} />
          </Button>
          
          <div className="w-px h-6 bg-border" />
          
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            <Share size={16} className="mr-2" />
            Share
          </Button>
          
          <Avatar className="w-8 h-8 ring-2 ring-primary/30">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}