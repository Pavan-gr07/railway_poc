import { Router, RequestHandler } from "express";
import {
  announcementDB,
  createAnnouncementTemplate,
  createAnnouncementRecord,
  updateAnnouncementRecord,
  getRecentAnnouncements,
} from "../db/announcements";
import {
  CreateAnnouncementTemplateRequest,
  AnnouncementListResponse,
} from "@shared/api";

const router = Router();

// Get all announcement templates and recent records
export const handleGetAnnouncements: RequestHandler = (req, res) => {
  const templates = Array.from(announcementDB.templates.values()).filter(
    (t) => t.enabled,
  );
  const records = getRecentAnnouncements(50);

  const response: AnnouncementListResponse = {
    templates,
    records,
  };

  res.status(200).json(response);
};

// Create a new announcement template
export const handleCreateAnnouncementTemplate: RequestHandler = (req, res) => {
  const body = req.body as CreateAnnouncementTemplateRequest;

  if (!body.name || !body.triggerType || !body.textEnglish) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const template = createAnnouncementTemplate(
    body.name,
    body.triggerType,
    body.textEnglish,
    body.textHindi,
    body.textRegional,
  );

  res.status(201).json(template);
};

// Trigger an automatic announcement
export const handleTriggerAnnouncement: RequestHandler = (req, res) => {
  const { templateId, language = "en", trainNumber, variables = {} } = req.body;

  const template = announcementDB.templates.get(templateId);
  if (!template) {
    return res.status(404).json({ error: "Template not found" });
  }

  if (!template.enabled) {
    return res.status(400).json({ error: "Template is disabled" });
  }

  // Get the text based on language
  let text: string;
  switch (language) {
    case "hi":
      text = template.textHindi;
      break;
    case "regional":
      text = template.textRegional;
      break;
    case "en":
    default:
      text = template.textEnglish;
  }

  // Replace variables in the text
  let finalText = text;
  Object.entries(variables).forEach(([key, value]) => {
    finalText = finalText.replace(`{${key}}`, String(value));
  });

  const record = createAnnouncementRecord(
    templateId,
    template.triggerType,
    finalText,
    language as "en" | "hi" | "regional",
    trainNumber,
  );

  res.status(201).json(record);
};

// Mark announcement as announced
export const handleMarkAnnouncementAnnounced: RequestHandler = (req, res) => {
  const { id } = req.params;
  const { audioUrl } = req.body;

  const record = updateAnnouncementRecord(id, {
    status: "announced",
    announcedAt: new Date().toISOString(),
    audioUrl,
  });

  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }

  res.status(200).json(record);
};

// Mark announcement as failed
export const handleMarkAnnouncementFailed: RequestHandler = (req, res) => {
  const { id } = req.params;

  const record = updateAnnouncementRecord(id, {
    status: "failed",
  });

  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }

  res.status(200).json(record);
};

// Set up routes
router.get("/", handleGetAnnouncements);
router.post("/templates", handleCreateAnnouncementTemplate);
router.post("/trigger", handleTriggerAnnouncement);
router.post("/:id/announced", handleMarkAnnouncementAnnounced);
router.post("/:id/failed", handleMarkAnnouncementFailed);

export default router;
