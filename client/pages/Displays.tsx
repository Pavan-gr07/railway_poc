import { Monitor } from "lucide-react";

export default function Displays() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Display Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure and manage AVDB and VDB display boards
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Monitor className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Display Management Module
        </h2>
        <p className="text-muted-foreground mb-6">
          This page will contain display board management including:
        </p>
        <ul className="text-left max-w-md mx-auto text-muted-foreground space-y-2 mb-6">
          <li>• Display board inventory and status</li>
          <li>• Real-time health monitoring</li>
          <li>• Content scheduling and management</li>
          <li>• Display configuration settings</li>
          <li>• Failure alerts and troubleshooting</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">
          Ask me to build this section with specific features you need!
        </p>
      </div>
    </div>
  );
}
