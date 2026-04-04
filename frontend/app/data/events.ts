export interface ScheduleItem {
  time: string;
  activity: string;
}

export type SocialPlatform = 'linkedin' | 'twitter' | 'github' | 'instagram' | 'facebook' | 'website';

export interface Social {
  platform: SocialPlatform;
  url: string;
}

export interface Person {
  name: string;
  title: string;
  photo?: string;
  socials?: Social[];
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
  organizers?: Person[];
  speakers?: Person[];
  partners?: Person[];
  capacity?: number;
  duration?: string;
  timeframe?: string;
  schedule?: ScheduleItem[];
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
      'An online seminar and technical workshop covering Lua syntax basics through to real-world scripting integration. Organized by Aris L. Artates Jr. in partnership with DICT Region VIII.',
    location: 'Zoom (Online)',
    organizers: [
      { name: 'Aris L. Artates Jr.', title: 'Event Organizer' },
      { name: 'TBA', title: 'To Be Announced' },
    ],
    speakers: [
      { name: 'TBA', title: 'To Be Announced' },
    ],
    partners: [
      { name: 'DICT Region VIII', title: 'Department of Information and Communications Technology' },
    ],
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
    lumaUrl: 'https://luma.com/embed/event/evt-RmEy6gjQwHyIKtF/simple',
  },
];
