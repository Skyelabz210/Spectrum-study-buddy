export type SpectrumCalendarEvent = {
  id: string;
  title: string;
  dateISO: string;
  dateLabel: string;
  arrivalTime: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  location: string;
  scheduleNote: string;
  checklist: string[];
  confirmationInstruction: string;
};

export const SPECTRUM_CALENDAR_SOURCE = {
  source: "Outlook Calendar",
  verifiedAtISO: "2026-07-13",
  verifiedAtLabel: "July 13, 2026",
  itemCount: 1,
  scope: "Connected primary calendar",
  status: "Calendar verified",
  privacyBoundary:
    "Personal contact details, mailbox addresses, event identifiers, and Outlook links are excluded from the app bundle.",
  authorityNote:
    "The live Outlook event and orientation email control if the time, location, or first-day instructions change.",
} as const;

export const SPECTRUM_ORIENTATION_EVENT: SpectrumCalendarEvent = {
  id: "spectrum-orientation-2026-08-11",
  title: "Spectrum New Hire Orientation — First Day",
  dateISO: "2026-08-11",
  dateLabel: "Tuesday, August 11, 2026",
  arrivalTime: "9:45 AM",
  startTime: "10:00 AM",
  endTime: "7:00 PM",
  timeZone: "Central Time",
  location:
    "10130 Highway 151, Suite 200, San Antonio, TX 78251 — second floor",
  scheduleNote:
    "Training is scheduled for 10:00 AM–7:00 PM Central. The calendar notes Sundays and Mondays off.",
  checklist: [
    "Arrive around 9:45 AM Central so check-in is complete before training begins.",
    "Check in with Security on the second floor.",
    "Bring acceptable I-9 documents; keep document images out of this app.",
    "Wear business-casual attire.",
  ],
  confirmationInstruction:
    "Reply to the orientation email to confirm receipt of the instructions.",
};
