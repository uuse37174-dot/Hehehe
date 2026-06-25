/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Difficulty {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert"
}

export enum Phase {
  BeginnerFoundations = "Beginner Foundations", // Levels 1-25
  IntermediateWebNetwork = "Intermediate Web & Network Hacking", // Levels 26-55
  AdvancedExploitation = "Advanced Exploitation & Post-Exploitation", // Levels 56-85
  ExpertRedTeaming = "Expert Red Teaming & Bug Bounty Mastery" // Levels 86-100
}

export interface TopicDetail {
  id: string;
  title: string;
  category: string;
  analogy: string;
  explanation: string;
  realWorldExample: string;
  commands: { cmd: string; desc: string }[];
  tools: string[];
  prevention: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicId: string;
}

export interface SimulationStep {
  id: string;
  instruction: string;
  hint: string;
  expectedCommand: string; // command user needs to type, or click action
  expectedOutput: string; // output returned upon success
}

export interface SimulationConfig {
  welcomeMessage: string;
  targetIpOrDomain: string;
  steps: SimulationStep[];
}

export interface Level {
  id: number;
  title: string;
  difficulty: Difficulty;
  phase: Phase;
  targetApp: string;
  targetAppDescription: string;
  appStoreSearchTerm: string;
  topics: string[]; // Topic IDs that are covered/required
  simulation: SimulationConfig;
  customCodeSnippet?: string; // Code snippet relevant to this level's hack
}

export interface QuizProgress {
  levelId: number;
  score: number;
  passed: boolean;
  answers: Record<number, number>; // index of selected answer for each question index
}

export interface Note {
  id: string;
  levelId: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface UserState {
  completedLevels: number[]; // IDs of completed levels
  unlockedLevels: number[]; // IDs of unlocked levels (Level 1 unlocked by default)
  xp: number;
  quizProgress: Record<number, QuizProgress>; // key is levelId
  notes: Note[];
  currentLevelId: number | null; // Currently viewing level, null means roadmap view
  searchQuery: string;
  difficultyFilter: string;
  phaseFilter: string;
  matrixRainEnabled: boolean;
  activeTab: "roadmap" | "ethical_guidelines" | "terminal_cheatsheet";
  user: { email: string; isAdmin: boolean } | null;
  
  // Actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  unlockLevel: (levelId: number) => void;
  completeLevel: (levelId: number) => void;
  saveQuizProgress: (levelId: number, score: number, passed: boolean, answers: Record<number, number>) => void;
  saveNote: (levelId: number, title: string, content: string) => void;
  deleteNote: (noteId: string) => void;
  addXP: (amount: number) => void;
  setCurrentLevelId: (levelId: number | null) => void;
  setSearchQuery: (query: string) => void;
  setDifficultyFilter: (filter: string) => void;
  setPhaseFilter: (filter: string) => void;
  setMatrixRainEnabled: (enabled: boolean) => void;
  setActiveTab: (tab: "roadmap" | "ethical_guidelines" | "terminal_cheatsheet") => void;
  resetProgress: () => void;
}
