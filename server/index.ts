import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import announcementRoutes from "./routes/announcements";
import { initializeAnnouncementTemplates } from "./db/announcements";

export function createServer(): Express {
  const app = express();

  // Initialize data
  initializeAnnouncementTemplates();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Announcement routes
  app.use("/api/announcements", announcementRoutes);

  return app;
}
