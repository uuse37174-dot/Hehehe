/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserState, QuizProgress, Note } from "./types";

const INITIAL_STATE = {
  completedLevels: [] as number[],
  unlockedLevels: [1] as number[],
  xp: 0,
  quizProgress: {} as Record<number, QuizProgress>,
  notes: [] as Note[],
  currentLevelId: null as number | null,
  searchQuery: "",
  difficultyFilter: "All",
  phaseFilter: "All",
  matrixRainEnabled: true,
  activeTab: "roadmap" as "roadmap" | "ethical_guidelines" | "terminal_cheatsheet",
  user: null as { email: string; isAdmin: boolean } | null,
};

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      login: (email: string, password: string) => {
        const isAdmin = email.trim() === "beatbounce181@gmail.com" && password === "Dayal@123Avijit@123";
        set({ user: { email: email.trim(), isAdmin } });
        return isAdmin;
      },

      logout: () => {
        set({ 
          user: null,
          currentLevelId: null,
          activeTab: "roadmap"
        });
      },

      unlockLevel: (levelId: number) =>
        set((state) => {
          if (state.unlockedLevels.includes(levelId)) return {};
          return { unlockedLevels: [...state.unlockedLevels, levelId] };
        }),

      completeLevel: (levelId: number) =>
        set((state) => {
          const completed = state.completedLevels.includes(levelId)
            ? state.completedLevels
            : [...state.completedLevels, levelId];
          
          // XP Reward for completing a level
          const alreadyCompleted = state.completedLevels.includes(levelId);
          const xpBonus = alreadyCompleted ? 0 : 500;

          // Unlock next level up to 100
          const nextLevelId = levelId + 1;
          const unlocked = [...state.unlockedLevels];
          if (nextLevelId <= 100 && !unlocked.includes(nextLevelId)) {
            unlocked.push(nextLevelId);
          }

          return {
            completedLevels: completed,
            unlockedLevels: unlocked,
            xp: state.xp + xpBonus,
          };
        }),

      saveQuizProgress: (levelId: number, score: number, passed: boolean, answers: Record<number, number>) =>
        set((state) => {
          const updatedProgress = {
            ...state.quizProgress,
            [levelId]: { levelId, score, passed, answers },
          };

          // Reward 100 XP for passing a quiz for the first time
          const wasPassed = state.quizProgress[levelId]?.passed;
          const xpReward = passed && !wasPassed ? 200 : 0;

          return {
            quizProgress: updatedProgress,
            xp: state.xp + xpReward,
          };
        }),

      saveNote: (levelId: number, title: string, content: string) =>
        set((state) => {
          const existingIndex = state.notes.findIndex(
            (n) => n.levelId === levelId && n.title.toLowerCase() === title.toLowerCase()
          );

          const newNote: Note = {
            id: existingIndex >= 0 ? state.notes[existingIndex].id : Math.random().toString(36).substr(2, 9),
            levelId,
            title,
            content,
            createdAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
          };

          let updatedNotes = [...state.notes];
          if (existingIndex >= 0) {
            updatedNotes[existingIndex] = newNote;
          } else {
            updatedNotes.unshift(newNote); // Put newest notes at top
          }

          return { notes: updatedNotes };
        }),

      deleteNote: (noteId: string) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== noteId),
        })),

      addXP: (amount: number) =>
        set((state) => ({ xp: state.xp + amount })),

      setCurrentLevelId: (levelId: number | null) =>
        set({ currentLevelId: levelId }),

      setSearchQuery: (query: string) =>
        set({ searchQuery: query }),

      setDifficultyFilter: (filter: string) =>
        set({ difficultyFilter: filter }),

      setPhaseFilter: (phase: string) =>
        set({ phaseFilter: phase }),

      setMatrixRainEnabled: (enabled: boolean) =>
        set({ matrixRainEnabled: enabled }),

      setActiveTab: (tab: "roadmap" | "ethical_guidelines" | "terminal_cheatsheet") =>
        set({ activeTab: tab }),

      resetProgress: () =>
        set({
          completedLevels: [],
          unlockedLevels: [1],
          xp: 0,
          quizProgress: {},
          notes: [],
          currentLevelId: null,
          searchQuery: "",
          difficultyFilter: "All",
          phaseFilter: "All",
          activeTab: "roadmap",
          user: null,
        }),
    }),
    {
      name: "hackroad-user-progress-v1", // local storage key
    }
  )
);
