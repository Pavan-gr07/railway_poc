import { Settings } from "lucide-react";

export default function Config() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Configuration</h1>
        <p className="text-muted-foreground mt-1">
          System settings, user management, and display customization
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Configuration Module
        </h2>
        <p className="text-muted-foreground mb-6">
          This page will contain comprehensive system configuration:
        </p>
        <ul className="text-left max-w-md mx-auto text-muted-foreground space-y-2 mb-6">
          <li>• User category management</li>
          <li>• Display color schemes and customization</li>
          <li>• API and integration settings</li>
          <li>• Master data entry forms</li>
          <li>• System preferences and defaults</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">
          Ask me to build this section with specific features you need!
        </p>
      </div>
    </div>
  );
}
