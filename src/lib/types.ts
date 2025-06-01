
export type DisciplineCategory = 
  | 'Football'
  | 'Athletics'
  | 'Basketball'
  | 'Karate'
  | 'Modern Dance'
  | 'Traditional Dance'
  | 'Orchestra'
  | 'Swimming';

export type TeamCategory = 
  | 'Academy'
  | 'U18'
  | 'Senior';

export type JourneyStage = 
  | 'Beginner'
  | 'Developing'
  | 'Advanced'
  | 'Elite'
  | 'Professional';

export interface Talent {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  profileImage?: string;
  dateOfBirth: string;
  birthDate?: string;
  gender: 'Male' | 'Female' | 'Other';
  discipline: DisciplineCategory;
  team?: TeamCategory;
  currentStage: JourneyStage;
  joinedAt: string;
  startDate?: string;
  contactPhone?: string;
  contactEmail?: string;
  email?: string;
  phone?: string;
  bio?: string;
  role?: string;
  age?: number;
  status?: string;
  nationality?: string;
  address?: string;
  skills?: {
    name: string;
    level: number;
  }[];
  achievements?: Achievement[];
  evaluations?: Evaluation[];
  eventsParticipated?: Event[];
}

export interface Achievement {
  id: string;
  talentId: string;
  title: string;
  description?: string;
  awardedAt: string;
  category: string;
}

export interface Evaluation {
  id: string;
  talentId: string;
  evaluatorName: string;
  date: string;
  scores: {
    category: string;
    score: number;
    maxScore: number;
    notes?: string;
  }[];
  overallRating: number;
  comments?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  disciplines: DisciplineCategory[];
  teams?: TeamCategory[];
  participants?: string[]; // Talent IDs
}

export interface Competition {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  disciplines: DisciplineCategory[];
  participants: string[]; // Talent IDs
  results?: CompetitionResult[];
}

export interface CompetitionResult {
  talentId: string;
  rank: number;
  score?: number;
  notes?: string;
}

export interface SuccessStory {
  id: string;
  talentId: string;
  title: string;
  content: string;
  publishDate: string;
  featuredImage?: string;
  tags: string[];
}

export interface Report {
  id: string;
  title: string;
  type: 'Performance' | 'Progress' | 'Financial' | 'Attendance' | 'Other';
  generatedDate: string;
  author: string;
  disciplines?: DisciplineCategory[];
  teams?: TeamCategory[];
  period: {
    start: string;
    end: string;
  };
  content?: string;
  metrics?: {
    name: string;
    value: number;
    change?: number;
  }[];
}
