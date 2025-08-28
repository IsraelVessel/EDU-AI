export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  preferredLanguage: string;
  joinDate: string;
  progress: {
    readingLevel: number;
    mathLevel: number;
    completedLessons: number;
    totalLessons: number;
    streakDays: number;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'reading' | 'math' | 'science' | 'health' | 'nutrition';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  content: string;
  isCompleted: boolean;
  isDownloaded: boolean;
}

export interface ReadingExercise {
  id: string;
  title: string;
  text: string;
  difficulty: string;
  targetWords: string[];
  completed: boolean;
}

export interface HomeworkProblem {
  id: string;
  subject: 'math' | 'science';
  problem: string;
  solution: string;
  steps: string[];
  imageUrl?: string;
}

export interface ProgressData {
  date: string;
  readingScore: number;
  mathScore: number;
  lessonsCompleted: number;
}

export type Language = 'en' | 'es' | 'fr' | 'sw';

export interface ContentPack {
  id: string;
  name: string;
  description: string;
  size: string;
  lessons: number;
  language: Language;
  isDownloaded: boolean;
  downloadProgress: number;
}

export interface ParentUpdate {
  id: string;
  studentName: string;
  parentPhone: string;
  message: string;
  type: 'progress' | 'achievement' | 'reminder';
  sentAt: string;
}