import { Server as HTTPServer } from "http";
import { createAnnouncementRecord, announcementDB } from "./db/announcements";

interface WebSocketMessage {
  type: string;
  data: any;
}

class AnnouncementWebSocketServer {
  private clients: Set<any> = new Set();
  private server: HTTPServer | null = null;

  initialize(httpServer: HTTPServer) {
    this.server = httpServer;

    // Try to use ws package if available, otherwise fallback
    try {
      const WebSocket = require("ws");
      const wss = new WebSocket.Server({ server: httpServer });

      wss.on("connection", (ws: any) => {
        console.log("WebSocket client connected");
        this.clients.add(ws);

        ws.on("message", (message: string) => {
          try {
            const parsed = JSON.parse(message);
            this.handleMessage(ws, parsed);
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        });

        ws.on("close", () => {
          console.log("WebSocket client disconnected");
          this.clients.delete(ws);
        });

        ws.on("error", (error: any) => {
          console.error("WebSocket error:", error);
          this.clients.delete(ws);
        });
      });
    } catch (error) {
      console.log(
        "ws package not available, WebSocket functionality disabled",
        error,
      );
    }
  }

  private handleMessage(ws: any, message: WebSocketMessage) {
    switch (message.type) {
      case "ping":
        ws.send(JSON.stringify({ type: "pong" }));
        break;
      case "get_announcements":
        const templates = Array.from(announcementDB.templates.values());
        const records = Array.from(announcementDB.records.values())
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 50);
        ws.send(
          JSON.stringify({
            type: "announcements_update",
            data: { templates, records },
          }),
        );
        break;
    }
  }

  broadcast(message: WebSocketMessage) {
    const messageStr = JSON.stringify(message);
    this.clients.forEach((client) => {
      try {
        if (client.readyState === 1) {
          // OPEN
          client.send(messageStr);
        }
      } catch (error) {
        console.error("Failed to broadcast message:", error);
      }
    });
  }

  broadcastAnnouncement(record: any) {
    this.broadcast({
      type: "new_announcement",
      data: record,
    });
  }
}

export const wsServer = new AnnouncementWebSocketServer();
