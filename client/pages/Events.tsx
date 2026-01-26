import { AlertCircle } from "lucide-react";

export default function Events() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Event Log</h1>
        <p className="text-muted-foreground mt-1">
          View system events, data transfer logs, and audit trail
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Event Log Module</h2>
        <p className="text-muted-foreground mb-6">
          This page will provide comprehensive event logging features:
        </p>
        <ul className="text-left max-w-md mx-auto text-muted-foreground space-y-2 mb-6">
          <li>• Data transfer failure tracking</li>
          <li>• System event audit trail</li>
          <li>• Configurable log retention (45/90 days)</li>
          <li>• Advanced filtering and search</li>
          <li>• Export capabilities for analysis</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">
          Ask me to build this section with specific features you need!
        </p>
      </div>
    </div>
  );
}
