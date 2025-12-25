
import { Status, Zone, FacultyMember } from './types';

export const ZONE_STATUS_MAP: Record<Zone, Status> = {
  'Staff Room': Status.AVAILABLE,
  'Lecture Hall 1': Status.IN_CLASS,
  'Lecture Hall 2': Status.IN_CLASS,
  'Lecture Hall 3': Status.IN_CLASS,
  'Lecture Hall 4': Status.IN_CLASS,
  'Lecture Hall 5': Status.IN_CLASS,
  'Admin Block': Status.BUSY,
  'Unknown': Status.OFFLINE
};

export const INITIAL_FACULTY: FacultyMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    department: 'Computer Science',
    email: 's.mitchell@university.edu',
    avatar: 'https://picsum.photos/seed/sarah/200',
    currentZone: 'Staff Room',
    isDNDOverride: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Prof. James Wilson',
    department: 'Mathematics',
    email: 'j.wilson@university.edu',
    avatar: 'https://picsum.photos/seed/james/200',
    currentZone: 'Lecture Hall 3',
    isDNDOverride: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    department: 'Physics',
    email: 'e.rodriguez@university.edu',
    avatar: 'https://picsum.photos/seed/elena/200',
    currentZone: 'Admin Block',
    isDNDOverride: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Prof. David Chen',
    department: 'Engineering',
    email: 'd.chen@university.edu',
    avatar: 'https://picsum.photos/seed/david/200',
    currentZone: 'Lecture Hall 1',
    isDNDOverride: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    department: 'Computer Science',
    email: 'l.thompson@university.edu',
    avatar: 'https://picsum.photos/seed/lisa/200',
    currentZone: 'Staff Room',
    isDNDOverride: false,
    lastUpdated: new Date().toISOString()
  }
];

export const ZONES: Zone[] = [
  'Staff Room',
  'Lecture Hall 1',
  'Lecture Hall 2',
  'Lecture Hall 3',
  'Lecture Hall 4',
  'Lecture Hall 5',
  'Admin Block'
];
