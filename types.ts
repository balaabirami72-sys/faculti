
export type Zone = 'Staff Room' | 'Lecture Hall 1' | 'Lecture Hall 2' | 'Lecture Hall 3' | 'Lecture Hall 4' | 'Lecture Hall 5' | 'Admin Block' | 'Unknown';

export enum Status {
  AVAILABLE = 'Available',
  IN_CLASS = 'In Class',
  BUSY = 'Busy/Meeting',
  DND = 'Do Not Disturb',
  OFFLINE = 'Offline'
}

export interface FacultyMember {
  id: string;
  name: string;
  department: string;
  email: string;
  avatar: string;
  currentZone: Zone;
  isDNDOverride: boolean;
  lastUpdated: string;
}

export interface StatusConfig {
  label: Status;
  color: string;
  bgColor: string;
  icon: string;
}
