export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  month: string;
  type: string;
  brief: string;
  description: string;
  location: string;
  organizer?: string;
  partner?: string;
  contact?: string;
  platform?: string;
  capacity?: number;
  duration?: string;
  timeframe?: string;
  schedule?: ScheduleItem[];
  partnershipNotes?: string[];
  lumaUrl?: string;
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Lua Fundamentals 2026: From Syntax to Script',
    date: 'April, 2026',
    month: 'April',
    type: 'Online Seminar / Technical Workshop',
    brief: 'A two-hour technical workshop on Lua scripting, hosted in partnership with DICT Region VIII.',
    description:
      'An online seminar and technical workshop covering Lua syntax basics through to real-world scripting integration. Organized by Aris L. Artates Jr. in partnership with DICT Region VIII, the event runs on a DICT Zoom account with a capacity of 300 participants.',
    location: 'DICT Zoom (Online)',
    organizer: 'Aris L. Artates Jr.',
    partner: 'DICT Region VIII — Department of Information and Communications Technology',
    contact: 'Claire Fernandez (DICT)',
    platform: 'DICT Zoom Account',
    capacity: 300,
    duration: '2 hours and 20 minutes',
    timeframe: '12:55 PM - 3:15 PM',
    schedule: [
      { time: '12:55 PM - 1:05 PM', activity: 'Pre-Event / Waiting Period' },
      { time: '1:05 PM - 1:20 PM',  activity: 'Opening Program + DICT Partner Segment - Cybersecurity awareness and ICT initiatives' },
      { time: '1:20 PM - 1:50 PM',  activity: 'Part 1: Lua Syntax Basics + Activity' },
      { time: '1:50 PM - 1:55 PM',  activity: 'Q&A - Part 1' },
      { time: '1:55 PM - 2:05 PM',  activity: 'Break' },
      { time: '2:05 PM - 3:05 PM',  activity: 'Part 2: Lua Integration & Live Demo' },
      { time: '3:05 PM - 3:12 PM',  activity: 'Q&A - Part 2' },
      { time: '3:12 PM - 3:15 PM',  activity: 'Closing Remarks' },
    ],
    partnershipNotes: [
      'DICT Region VIII has a reserved 15-minute slot at the start of the program to discuss cybersecurity awareness and regional ICT programs.',
      'The event trailer and promotional materials will feature the DICT logo as the official partner.',
      'Coordination is ongoing regarding receipt of a high-resolution logo and specific branding or speaker requirements from DICT.',
    ],
    lumaUrl: "https://luma.com/embed/event/evt-RmEy6gjQwHyIKtF/simple",
  },
];
