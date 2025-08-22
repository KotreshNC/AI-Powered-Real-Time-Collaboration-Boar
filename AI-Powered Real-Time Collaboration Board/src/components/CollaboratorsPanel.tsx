import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Crown, Edit, Eye, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Editor' | 'Viewer';
  status: 'editing' | 'viewing' | 'away';
  avatar?: string;
  initials: string;
  color: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'edit' | 'view' | 'create';
}

const mockCollaborators: Collaborator[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Owner',
    status: 'editing',
    initials: 'JD',
    color: '#3B82F6'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'Editor',
    status: 'editing',
    initials: 'SC',
    color: '#10B981'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Editor',
    status: 'viewing',
    initials: 'MJ',
    color: '#F59E0B'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Viewer',
    status: 'away',
    initials: 'ED',
    color: '#EC4899'
  }
];

const mockActivity: Activity[] = [
  { id: '1', user: 'Sarah', action: 'added a new section', timestamp: '2 min ago', type: 'create' },
  { id: '2', user: 'Mike', action: 'is viewing the document', timestamp: '5 min ago', type: 'view' },
  { id: '3', user: 'John', action: 'created a new drawing', timestamp: '8 min ago', type: 'create' },
];

export function CollaboratorsPanel() {
  return (
    <div className="glass-panel rounded-xl p-4 space-y-6 animate-slide-up w-80">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
          <h3 className="font-semibold">Collaborators ({mockCollaborators.length})</h3>
        </div>
        <Button variant="ghost" size="icon" className="tool-btn">
          <Plus size={16} />
        </Button>
      </div>

      {/* Collaborators List */}
      <div className="space-y-3">
        {mockCollaborators.map((collaborator) => (
          <div key={collaborator.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="relative">
              <Avatar className="w-10 h-10 ring-2 ring-opacity-30" style={{ '--ring-color': collaborator.color } as React.CSSProperties}>
                <AvatarImage src={collaborator.avatar} />
                <AvatarFallback 
                  className="text-white font-medium"
                  style={{ backgroundColor: collaborator.color }}
                >
                  {collaborator.initials}
                </AvatarFallback>
              </Avatar>
              <div className={cn(
                "presence-indicator absolute -bottom-0.5 -right-0.5",
                collaborator.status
              )} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm truncate">{collaborator.name}</p>
                {collaborator.role === 'Owner' && (
                  <Crown size={12} className="text-yellow-400 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {collaborator.status === 'editing' && <Edit size={10} />}
                {collaborator.status === 'viewing' && <Eye size={10} />}
                <span className="capitalize">{collaborator.status}</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-xs font-medium text-muted-foreground">{collaborator.role}</p>
              <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-white/10">
                <MoreHorizontal size={12} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-muted-foreground">Recent Activity</h4>
        <div className="space-y-2">
          {mockActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-2 text-xs">
              <div className={cn(
                "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                activity.type === 'create' && "bg-green-400",
                activity.type === 'edit' && "bg-blue-400",
                activity.type === 'view' && "bg-gray-400"
              )} />
              <div className="space-y-1">
                <p className="text-foreground">
                  <span className="font-medium">{activity.user}</span>{' '}
                  {activity.action}
                </p>
                <p className="text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Actions */}
      <div className="flex gap-2 pt-2 border-t border-border">
        <Button variant="default" className="flex-1">Share</Button>
        <Button variant="outline" className="flex-1">History</Button>
      </div>
    </div>
  );
}