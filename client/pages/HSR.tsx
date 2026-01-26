import { Activity } from "lucide-react";

export default function HSR() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Health Status Report (HSR)
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor LED health status of all display boards
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Health Status Report (HSR)
        </h2>
        <p className="text-muted-foreground mb-6">
          This page will display comprehensive health status information:
        </p>
        <ul className="text-left max-w-md mx-auto text-muted-foreground space-y-2 mb-6">
          <li>• Mirror images of all display boards</li>
          <li>• LED health status for each board</li>
          <li>• Real-time diagnostic data</li>
          <li>• Component-level monitoring</li>
          <li>• Historical health trends</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">
          Ask me to build this section with specific features you need!
        </p>
      </div>
    </div>
  );
}
