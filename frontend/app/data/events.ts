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

/**
 * A photo or video archived from a public Facebook post. The media is
 * embedded straight from Facebook (nothing is re-uploaded) and plays in
 * place inside the event modal.
 *
 * `url` is the post's normal permalink, e.g.
 *   video: "https://www.facebook.com/<page>/videos/<id>/"
 *   photo/text post: "https://www.facebook.com/<page>/posts/<id>"
 */
export interface ArchiveItem {
  /** 'video' uses Facebook's video player; 'post' renders photo/text posts. */
  type: 'video' | 'post';
  url: string;
  caption?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  /** ISO date ("YYYY-MM-DD" or full datetime). Enables precise status detection + countdowns. */
  startDate?: string;
  /** ISO date. Defaults to end of startDate's day when omitted. */
  endDate?: string;
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
  /** Facebook photos/videos shown as the event's archive once it has run. */
  archive?: ArchiveItem[];
}

export const staticEvents: Event[] = [
  {
    id: '1',
    title: 'Lua Fundamentals 2026: From Syntax to Script',
    date: 'April, 2026',
    month: 'April',
    type: 'Online Seminar / Technical Workshop',
    brief: 'A two-hour technical workshop on Lua scripting, hosted in partnership with DICT Region VIII.',
    description: 'An online seminar and technical workshop covering Lua syntax basics through to real-world scripting integration. Organized by Aris L. Artates Jr. in partnership with DICT Region VIII.',
    location: 'Zoom (Online)',
    organizers: [
      { name: 'Aris L. Artates Jr.',    title: 'Developer' },
      { name: 'Ronald Arjay Cinco',     title: 'AMA Computer Science Undergrad',      photo: '/photos/Arjay.jpg' },
      { name: 'Zachary James Zimmerman',title: 'AMA Computer Science Undergrad',      photo: '/photos/zachary.jpg' },
      { name: 'Gian Tan',               title: 'AMA Computer Engineering Undergrad' },
      { name: 'Jerecho Portillo',       title: 'AMA Information Technology Undergrad',photo: '/photos/Jerecho.png' },
    ],
    speakers: [
      { name: 'Claire P. Fernandez', title: 'IT Officer, DICT Regional Office VIII', photo: '/photos/Claire.png' },
      { name: 'Felix Leo Flores',    title: 'Fullstack Developer',                   photo: '/photos/Felix.jpg' },
    ],
    partners: [
      { name: 'DICT Region VIII', title: 'Department of Information and Communications Technology', photo: '/photos/dict.png' },
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

