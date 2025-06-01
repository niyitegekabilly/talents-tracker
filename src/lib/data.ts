
import { Talent, Achievement, Event, Evaluation } from './types';

// Mock data for the application
export const talents: Talent[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Baptiste',
    photoUrl: '/placeholder.svg',
    dateOfBirth: '2005-03-15',
    gender: 'Male',
    discipline: 'Football',
    team: 'U18',
    currentStage: 'Advanced',
    joinedAt: '2018-09-01',
    contactPhone: '+123456789',
    contactEmail: 'jean.baptiste@example.com',
    bio: 'Talented midfielder with excellent vision and passing ability.'
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Jolie',
    photoUrl: '/placeholder.svg',
    dateOfBirth: '2006-07-22',
    gender: 'Female',
    discipline: 'Athletics',
    currentStage: 'Elite',
    joinedAt: '2019-01-15',
    contactEmail: 'marie.jolie@example.com',
    bio: 'Exceptional sprinter who has consistently improved over the past two years.'
  },
  {
    id: '3',
    firstName: 'Thomas',
    lastName: 'Dubois',
    photoUrl: '/placeholder.svg',
    dateOfBirth: '2000-11-05',
    gender: 'Male',
    discipline: 'Basketball',
    team: 'Senior',
    currentStage: 'Professional',
    joinedAt: '2015-08-20',
    contactPhone: '+987654321',
    contactEmail: 'thomas.dubois@example.com',
    bio: 'Professional point guard with leadership qualities and excellent court vision.'
  },
  {
    id: '4',
    firstName: 'Sophie',
    lastName: 'Martin',
    photoUrl: '/placeholder.svg',
    dateOfBirth: '2008-04-30',
    gender: 'Female',
    discipline: 'Modern Dance',
    currentStage: 'Developing',
    joinedAt: '2020-02-10',
    contactEmail: 'sophie.martin@example.com',
    bio: 'Passionate dancer with a natural talent for contemporary dance styles.'
  },
  {
    id: '5',
    firstName: 'Adama',
    lastName: 'Kone',
    photoUrl: '/placeholder.svg',
    dateOfBirth: '2007-09-12',
    gender: 'Male',
    discipline: 'Football',
    team: 'Academy',
    currentStage: 'Beginner',
    joinedAt: '2021-06-01',
    contactPhone: '+246813579',
    contactEmail: 'adama.kone@example.com',
    bio: 'Young defender with good physical attributes and room for development.'
  },
];

export const achievements: Achievement[] = [
  {
    id: '1',
    talentId: '1',
    title: 'Regional Tournament MVP',
    description: 'Named Most Valuable Player in the regional youth tournament.',
    awardedAt: '2022-05-15',
    category: 'Individual Award'
  },
  {
    id: '2',
    talentId: '2',
    title: 'National Junior Championship - Gold Medal',
    description: 'Won gold in the 100m sprint at the National Junior Championship.',
    awardedAt: '2022-07-22',
    category: 'Competition Medal'
  },
  {
    id: '3',
    talentId: '3',
    title: 'Professional League Contract',
    description: 'Signed first professional contract with top-tier basketball team.',
    awardedAt: '2021-09-30',
    category: 'Professional Milestone'
  }
];

export const evaluations: Evaluation[] = [
  {
    id: '1',
    talentId: '1',
    evaluatorName: 'Coach Pierre',
    date: '2022-12-10',
    scores: [
      { category: 'Technical Skills', score: 8, maxScore: 10 },
      { category: 'Tactical Understanding', score: 7, maxScore: 10 },
      { category: 'Physical Fitness', score: 9, maxScore: 10 },
      { category: 'Mental Strength', score: 8, maxScore: 10 }
    ],
    overallRating: 8,
    comments: 'Jean continues to show excellent progress in all areas. His physical fitness is exceptional.'
  },
  {
    id: '2',
    talentId: '2',
    evaluatorName: 'Coach Michelle',
    date: '2023-01-15',
    scores: [
      { category: 'Speed', score: 10, maxScore: 10 },
      { category: 'Technique', score: 8, maxScore: 10 },
      { category: 'Mental Strength', score: 9, maxScore: 10 },
      { category: 'Consistency', score: 8, maxScore: 10 }
    ],
    overallRating: 9,
    comments: 'Marie has exceptional natural speed and has improved her starting technique.'
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Regional Football Tournament',
    description: 'Annual regional tournament for youth categories.',
    startDate: '2023-06-15',
    endDate: '2023-06-20',
    location: 'Regional Sports Complex',
    disciplines: ['Football'],
    teams: ['Academy', 'U18'],
    participants: ['1', '5']
  },
  {
    id: '2',
    title: 'National Athletics Championship',
    description: 'Premier national athletics competition for junior athletes.',
    startDate: '2023-07-10',
    endDate: '2023-07-12',
    location: 'National Stadium',
    disciplines: ['Athletics'],
    participants: ['2']
  },
  {
    id: '3',
    title: 'Annual Dance Showcase',
    description: 'Showcase of talent across different dance styles.',
    startDate: '2023-08-05',
    location: 'Cultural Center',
    disciplines: ['Modern Dance', 'Traditional Dance'],
    participants: ['4']
  }
];

export const disciplineStats = [
  { discipline: 'Football', count: 45, percentChange: 12 },
  { discipline: 'Athletics', count: 28, percentChange: 5 },
  { discipline: 'Basketball', count: 22, percentChange: -3 },
  { discipline: 'Karate', count: 15, percentChange: 8 },
  { discipline: 'Modern Dance', count: 30, percentChange: 15 },
  { discipline: 'Traditional Dance', count: 18, percentChange: 0 },
  { discipline: 'Orchestra', count: 25, percentChange: 7 },
  { discipline: 'Swimming', count: 17, percentChange: 10 }
];

export const disciplineColors = {
  'Football': '#4F46E5',
  'Athletics': '#10B981',
  'Basketball': '#F59E0B',
  'Karate': '#EF4444',
  'Modern Dance': '#EC4899',
  'Traditional Dance': '#8B5CF6',
  'Orchestra': '#6366F1',
  'Swimming': '#0EA5E9'
};

export const stageColors = {
  'Beginner': '#D1FAE5',
  'Developing': '#A7F3D0',
  'Advanced': '#6EE7B7',
  'Elite': '#34D399',
  'Professional': '#10B981'
};
