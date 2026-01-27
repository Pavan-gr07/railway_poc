import { createAnnouncementRecord } from "./announcements";

export interface Train {
  id: string;
  trainNumber: string;
  name: string;
  source: string;
  destination: string;
  platform: string;
  eta: string;
  etd: string;
  status: "on-time" | "delayed" | "boarding" | "cancelled";
  delayMinutes: number;
}

export const trainDB = {
  trains: new Map<string, Train>(),
};

export function initializeTrains() {
  const trains: Train[] = [
    {
      id: "1",
      trainNumber: "12345",
      name: "Express Delhi",
      source: "Mumbai",
      destination: "Delhi",
      platform: "1",
      eta: "14:30",
      etd: "14:45",
      status: "on-time",
      delayMinutes: 0,
    },
    {
      id: "2",
      trainNumber: "12346",
      name: "Shatabdi Express",
      source: "Mumbai",
      destination: "Pune",
      platform: "2",
      eta: "12:15",
      etd: "12:30",
      status: "delayed",
      delayMinutes: 15,
    },
    {
      id: "3",
      trainNumber: "12347",
      name: "Rajdhani Express",
      source: "Mumbai",
      destination: "Bangalore",
      platform: "3",
      eta: "16:00",
      etd: "16:15",
      status: "boarding",
      delayMinutes: 0,
    },
    {
      id: "4",
      trainNumber: "12348",
      name: "Premier Express",
      source: "Mumbai",
      destination: "Goa",
      platform: "4",
      eta: "18:00",
      etd: "18:15",
      status: "on-time",
      delayMinutes: 0,
    },
    {
      id: "5",
      trainNumber: "12349",
      name: "Intercity Express",
      source: "Mumbai",
      destination: "Ahmedabad",
      platform: "5",
      eta: "20:00",
      etd: "20:15",
      status: "cancelled",
      delayMinutes: 0,
    },
  ];

  trains.forEach((train) => {
    trainDB.trains.set(train.id, train);
  });
}

export function getTrains(): Train[] {
  return Array.from(trainDB.trains.values());
}

export function getTrain(id: string): Train | undefined {
  return trainDB.trains.get(id);
}

export function updateTrain(
  id: string,
  updates: Partial<Train>,
): Train | undefined {
  const train = trainDB.trains.get(id);
  if (!train) return undefined;

  const updated = { ...train, ...updates };
  trainDB.trains.set(id, updated);

  // Trigger announcements based on status changes
  triggerAnnouncementForTrainUpdate(train, updated);

  return updated;
}

function triggerAnnouncementForTrainUpdate(oldTrain: Train, newTrain: Train) {
  // Train delay detected
  if (oldTrain.status !== "delayed" && newTrain.status === "delayed") {
    createAnnouncementRecord(
      "tpl_delay_1",
      "train_delay",
      `Train number ${newTrain.trainNumber} is delayed by approximately ${newTrain.delayMinutes} minutes`,
      "en",
      newTrain.trainNumber,
    );
  }

  // Train cancelled
  if (oldTrain.status !== "cancelled" && newTrain.status === "cancelled") {
    createAnnouncementRecord(
      "tpl_cancel_1",
      "train_cancellation",
      `Train number ${newTrain.trainNumber} to ${newTrain.destination} has been cancelled`,
      "en",
      newTrain.trainNumber,
    );
  }

  // Boarding started
  if (oldTrain.status !== "boarding" && newTrain.status === "boarding") {
    createAnnouncementRecord(
      "tpl_boarding_1",
      "boarding_started",
      `Boarding has started for train number ${newTrain.trainNumber} on platform ${newTrain.platform}`,
      "en",
      newTrain.trainNumber,
    );
  }

  // Platform change
  if (oldTrain.platform !== newTrain.platform) {
    createAnnouncementRecord(
      "tpl_platform_1",
      "platform_change",
      `Train number ${newTrain.trainNumber} will now depart from platform ${newTrain.platform}. Please move to the correct platform`,
      "en",
      newTrain.trainNumber,
    );
  }
}
