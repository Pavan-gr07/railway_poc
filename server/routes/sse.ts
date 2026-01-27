import { Router, RequestHandler } from "express";
import { AnnouncementRecord } from "@shared/api";

const router = Router();

// Store active SSE connections
const sseClients = new Set<any>();

export function broadcastAnnouncement(record: AnnouncementRecord) {
  const message = `data: ${JSON.stringify({ type: "new_announcement", data: record })}\n\n`;

  sseClients.forEach((client) => {
    try {
      client.write(message);
    } catch (error) {
      console.error("Failed to send SSE message:", error);
      sseClients.delete(client);
    }
  });
}

// SSE endpoint for real-time announcements
export const handleAnnouncementStream: RequestHandler = (req, res) => {
  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Add client to active connections
  sseClients.add(res);
  console.log(`SSE client connected. Total: ${sseClients.size}`);

  // Send initial connection confirmation
  res.write('data: {"type": "connected"}\n\n');

  // Keep connection alive with heartbeat
  const heartbeat = setInterval(() => {
    try {
      res.write(": heartbeat\n\n");
    } catch (error) {
      clearInterval(heartbeat);
      sseClients.delete(res);
    }
  }, 30000); // Every 30 seconds

  // Handle client disconnect
  req.on("close", () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
    res.end();
    console.log(`SSE client disconnected. Total: ${sseClients.size}`);
  });

  req.on("error", () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
};

router.get("/stream", handleAnnouncementStream);

export default router;
