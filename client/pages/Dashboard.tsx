import {
  BarChart3,
  Train,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Radio,
  TrendingUp,
  Activity,
  Send,
  Pause,
  Volume2,
  Mic,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StatusCard {
  label: string;
  value: string | number;
  status: "success" | "warning" | "error" | "neutral";
  icon: React.ReactNode;
}

interface TrainRecord {
  trainNo: string;
  destination: string;
  platform: number;
  eta: string;
  displayStatus: "sent" | "pending";
  lastUpdate: string;
}

interface DisplayBoard {
  id: string;
  location: string;
  status: "online" | "offline" | "error";
  lastSync: string;
  healthScore: number;
}

export default function Dashboard() {
  // Mock data
  const statusCards: StatusCard[] = [
    {
      label: "System Status",
      value: "Online",
      status: "success",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      label: "Active Trains",
      value: "24",
      status: "neutral",
      icon: <Train className="w-6 h-6" />,
    },
    {
      label: "Pending Syncs",
      value: "3",
      status: "warning",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      label: "Display Boards",
      value: "42/42",
      status: "success",
      icon: <Radio className="w-6 h-6" />,
    },
  ];

  const recentTrains: TrainRecord[] = [
    {
      trainNo: "12345",
      destination: "New Delhi",
      platform: 1,
      eta: "14:30",
      displayStatus: "sent",
      lastUpdate: "2 min ago",
    },
    {
      trainNo: "12346",
      destination: "Mumbai",
      platform: 2,
      eta: "14:45",
      displayStatus: "sent",
      lastUpdate: "5 min ago",
    },
    {
      trainNo: "12347",
      destination: "Bangalore",
      platform: 3,
      eta: "15:00",
      displayStatus: "pending",
      lastUpdate: "1 min ago",
    },
    {
      trainNo: "12348",
      destination: "Hyderabad",
      platform: 4,
      eta: "15:15",
      displayStatus: "pending",
      lastUpdate: "Just now",
    },
  ];

  const displayBoards: DisplayBoard[] = [
    {
      id: "AVDB-01",
      location: "Platform 1",
      status: "online",
      lastSync: "2 sec ago",
      healthScore: 98,
    },
    {
      id: "AVDB-02",
      location: "Platform 2",
      status: "online",
      lastSync: "1 sec ago",
      healthScore: 95,
    },
    {
      id: "AVDB-03",
      location: "Platform 3",
      status: "online",
      lastSync: "3 sec ago",
      healthScore: 100,
    },
    {
      id: "AVDB-04",
      location: "Main Concourse",
      status: "error",
      lastSync: "45 sec ago",
      healthScore: 42,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Integrated Passenger Information System
        </h1>
        <p className="text-muted-foreground mt-1">Central Display Center (CDC) Dashboard</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card, idx) => (
          <div
            key={idx}
            className={cn(
              "rounded-lg p-4 border",
              card.status === "success"
                ? "bg-success/5 border-success/20 text-foreground"
                : card.status === "warning"
                  ? "bg-warning/5 border-warning/20 text-foreground"
                  : card.status === "error"
                    ? "bg-destructive/5 border-destructive/20 text-foreground"
                    : "bg-card border-border text-foreground"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-bold mt-2">{card.value}</p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-lg",
                  card.status === "success"
                    ? "bg-success/10 text-success"
                    : card.status === "warning"
                      ? "bg-warning/10 text-warning"
                      : card.status === "error"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-foreground"
                )}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mode Toggle & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Operation Mode</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
              <span>Auto Mode</span>
              <Zap className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium">
              <span>Manual Mode</span>
              <Pause className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium text-foreground">
            <span>Send to Displays</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">System Health</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-success">94%</span>
            <span className="text-sm text-muted-foreground pb-1">healthy</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-3">
            <div className="bg-success h-full rounded-full" style={{ width: "94%" }} />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Trains */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <Train className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Recent Trains</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                    Train No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                    Platform
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                    ETA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                    Display Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentTrains.map((train, idx) => (
                  <tr key={idx} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {train.trainNo}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{train.destination}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{train.platform}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{train.eta}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                          train.displayStatus === "sent"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        )}
                      >
                        {train.displayStatus === "sent" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {train.displayStatus === "sent" ? "Sent" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h2 className="text-lg font-semibold text-foreground">Alerts</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
              <p className="text-sm font-medium text-foreground">Display Board Offline</p>
              <p className="text-xs text-muted-foreground mt-1">AVDB-04 (Main Concourse) offline</p>
            </div>
            <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
              <p className="text-sm font-medium text-foreground">Sync Failed</p>
              <p className="text-xs text-muted-foreground mt-1">3 trains pending sync to displays</p>
            </div>
            <div className="p-3 rounded-lg bg-success/5 border border-success/20">
              <p className="text-sm font-medium text-foreground">API Healthy</p>
              <p className="text-xs text-muted-foreground mt-1">All REST API endpoints responding</p>
            </div>
          </div>
        </div>
      </div>

      {/* Display Boards Health */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Display Board Health</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayBoards.map((board) => (
              <div
                key={board.id}
                className={cn(
                  "p-4 rounded-lg border",
                  board.status === "online"
                    ? "bg-success/5 border-success/20"
                    : board.status === "error"
                      ? "bg-destructive/5 border-destructive/20"
                      : "bg-muted/5 border-border"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{board.id}</p>
                    <p className="text-xs text-muted-foreground">{board.location}</p>
                  </div>
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      board.status === "online"
                        ? "bg-success animate-pulse"
                        : board.status === "error"
                          ? "bg-destructive"
                          : "bg-muted"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Health Score</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-foreground">{board.healthScore}%</span>
                      {board.healthScore >= 90 && (
                        <TrendingUp className="w-4 h-4 text-success" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Last sync: {board.lastSync}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
