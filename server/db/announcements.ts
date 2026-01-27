import { AnnouncementTemplate, AnnouncementRecord } from "@shared/api";

// Broadcast callback
let broadcastCallback: ((record: AnnouncementRecord) => void) | null = null;

export function setBroadcastCallback(cb: (record: AnnouncementRecord) => void) {
  broadcastCallback = cb;
}

// In-memory database for announcements
export const announcementDB = {
  templates: new Map<string, AnnouncementTemplate>(),
  records: new Map<string, AnnouncementRecord>(),
};

// Initialize with default templates
export function initializeAnnouncementTemplates() {
  const defaultTemplates: AnnouncementTemplate[] = [
    {
      id: "tpl_delay_1",
      name: "Train Delay - General",
      triggerType: "train_delay",
      textEnglish: "Train number {trainNumber} is delayed by approximately {minutes} minutes",
      textHindi: "ट्रेन संख्या {trainNumber} लगभग {minutes} मिनट की देरी से है",
      textRegional: "Train {trainNumber} is delayed by {minutes} minutes",
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "tpl_cancel_1",
      name: "Train Cancellation",
      triggerType: "train_cancellation",
      textEnglish: "Train number {trainNumber} to {destination} has been cancelled",
      textHindi: "ट्रेन संख्या {trainNumber} से {destination} तक रद्द कर दी गई है",
      textRegional: "Train {trainNumber} to {destination} is cancelled",
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "tpl_platform_1",
      name: "Platform Change",
      triggerType: "platform_change",
      textEnglish: "Train number {trainNumber} will now depart from platform {newPlatform}. Please move to the correct platform",
      textHindi: "ट्रेन संख्या {trainNumber} अब प्लेटफॉर्म {newPlatform} से प्रस्थान करेगी। कृपया सही प्लेटफॉर्म पर जाएं",
      textRegional: "Train {trainNumber} now departing from platform {newPlatform}",
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "tpl_boarding_1",
      name: "Boarding Started",
      triggerType: "boarding_started",
      textEnglish: "Boarding has started for train number {trainNumber} on platform {platform}",
      textHindi: "ट्रेन संख्या {trainNumber} के लिए प्लेटफॉर्म {platform} पर बोर्डिंग शुरू हो गई है",
      textRegional: "Boarding started for train {trainNumber} on platform {platform}",
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "tpl_health_1",
      name: "Display Health Alert",
      triggerType: "health_alert",
      textEnglish: "Alert: Display board {displayId} in {location} is offline. Please attend immediately",
      textHindi: "चेतावनी: {location} में डिस्प्ले बोर्ड {displayId} ऑफलाइन है। कृपया तुरंत ध्यान दें",
      textRegional: "Alert: Display {displayId} at {location} is offline",
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  defaultTemplates.forEach((template) => {
    announcementDB.templates.set(template.id, template);
  });
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function createAnnouncementTemplate(
  name: string,
  triggerType: any,
  textEnglish: string,
  textHindi: string,
  textRegional: string
): AnnouncementTemplate {
  const id = `tpl_${generateId()}`;
  const template: AnnouncementTemplate = {
    id,
    name,
    triggerType,
    textEnglish,
    textHindi,
    textRegional,
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  announcementDB.templates.set(id, template);
  return template;
}

export function createAnnouncementRecord(
  templateId: string,
  triggerType: any,
  message: string,
  language: "en" | "hi" | "regional",
  trainNumber?: string
): AnnouncementRecord {
  const id = `rec_${generateId()}`;
  const record: AnnouncementRecord = {
    id,
    templateId,
    triggerType,
    trainNumber,
    message,
    language,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  announcementDB.records.set(id, record);
  return record;
}

export function getAnnouncementRecord(id: string): AnnouncementRecord | undefined {
  return announcementDB.records.get(id);
}

export function updateAnnouncementRecord(
  id: string,
  updates: Partial<AnnouncementRecord>
): AnnouncementRecord | undefined {
  const record = announcementDB.records.get(id);
  if (!record) return undefined;

  const updated = { ...record, ...updates };
  announcementDB.records.set(id, updated);
  return updated;
}

export function getRecentAnnouncements(limit: number = 20): AnnouncementRecord[] {
  return Array.from(announcementDB.records.values())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}
