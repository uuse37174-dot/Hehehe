/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { useStore } from "../store";
import { 
  ShieldAlert, 
  Terminal, 
  Award, 
  Settings, 
  Search, 
  Filter, 
  RefreshCw, 
  BookOpen, 
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
  LogOut,
  User
} from "lucide-react";

export function getRank(xp: number): { name: string; color: string; nextThreshold: number; prevThreshold: number } {
  if (xp < 1500) return { name: "Script Kiddie", color: "text-red-400 border-red-500/30", nextThreshold: 1500, prevThreshold: 0 };
  if (xp < 6000) return { name: "Cyber Apprentice", color: "text-amber-400 border-amber-500/30", nextThreshold: 6000, prevThreshold: 1500 };
  if (xp < 18000) return { name: "Netsec Operator", color: "text-blue-400 border-blue-500/30", nextThreshold: 18000, prevThreshold: 6000 };
  if (xp < 35000) return { name: "Penetration Tester", color: "text-purple-400 border-purple-500/30", nextThreshold: 35000, prevThreshold: 18000 };
  if (xp < 60000) return { name: "Red Team Specialist", color: "text-cyan-400 border-cyan-500/30", nextThreshold: 60000, prevThreshold: 35000 };
  return { name: "Elite Cyber Commander", color: "text-green-400 border-green-500/30", nextThreshold: 100000, prevThreshold: 60000 };
}

export default function Navbar() {
  const { 
    xp, 
    completedLevels, 
    searchQuery, 
    difficultyFilter, 
    phaseFilter, 
    matrixRainEnabled,
    activeTab,
    user,
    setSearchQuery,
    setDifficultyFilter,
    setPhaseFilter,
    setMatrixRainEnabled,
    setActiveTab,
    resetProgress,
    setCurrentLevelId,
    logout
  } = useStore();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const rank = getRank(xp);
  
  // Calculate XP Progress bar percentage
  const levelXpRange = rank.nextThreshold - rank.prevThreshold;
  const xpInCurrentLevel = xp - rank.prevThreshold;
  const xpPercentage = Math.min(100, Math.max(0, (xpInCurrentLevel / levelXpRange) * 100));

  const completionPercentage = Math.round((completedLevels.length / 100) * 100);

  return (
    <header id="nav-header" className="sticky top-0 z-40 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand Logo & Info */}
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setCurrentLevelId(null);
              setActiveTab("roadmap");
            }}
          >
            <div className="bg-green-500/10 border border-green-500/30 p-2 rounded-lg shadow-[0_0_15px_rgba(0,200,83,0.1)]">
              <Terminal className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-wide font-mono">
                  HACK<span className="text-green-500">ROAD</span>
                </h1>
                <span className="bg-green-500/10 text-green-400 text-[10px] font-mono border border-green-500/20 px-1.5 py-0.5 rounded uppercase">
                  V1.1 Offline
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-sans tracking-tight">Ethical Hacking & Pen-Testing Syllabus</p>
            </div>
          </div>

          {/* Settings trigger for mobile */}
          <button 
            id="btn-settings-mobile"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="md:hidden text-zinc-400 hover:text-white hover:bg-zinc-900 p-2 rounded-lg border border-zinc-800 transition"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* User XP Rank Stats Section */}
        <div className="flex-1 w-full max-w-md bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="text-center shrink-0 flex flex-row sm:flex-col justify-between sm:justify-center items-center gap-2 sm:gap-0">
            <span className="text-[9px] text-zinc-500 font-mono uppercase">Rank</span>
            {user?.isAdmin ? (
              <div className="text-[10px] font-mono font-bold border px-2 py-0.5 rounded bg-zinc-950 text-green-400 border-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.3)] animate-pulse whitespace-nowrap">
                ADMIN BYPASS ACTIVE
              </div>
            ) : (
              <div className={`text-xs font-mono font-bold border px-2 py-0.5 rounded bg-zinc-950 whitespace-nowrap ${rank.color}`}>
                {rank.name}
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
              <span>{xp} XP</span>
              <span>{rank.nextThreshold} XP Limit</span>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800/80">
              <div 
                className="bg-green-500 h-full shadow-[0_0_8px_#00FF33] transition-all duration-500 ease-out" 
                style={{ width: `${xpPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center sm:border-l border-zinc-800 pl-0 sm:pl-3 shrink-0 flex flex-row sm:flex-col justify-between sm:justify-center items-center gap-1 sm:gap-0 border-t sm:border-t-0 border-zinc-800/60 pt-2 sm:pt-0">
            <span className="text-[9px] text-zinc-500 font-mono uppercase">Progress</span>
            <div className="flex items-center sm:flex-col gap-1.5 sm:gap-0">
              <span className="text-sm font-mono font-bold text-green-500">{completionPercentage}%</span>
              <span className="text-[9px] text-zinc-500 block">({completedLevels.length}/100)</span>
            </div>
          </div>
        </div>

        {/* Primary Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 -mx-2 px-2 scroll-smooth shrink-0">
          <button
            id="tab-roadmap"
            onClick={() => {
              setCurrentLevelId(null);
              setActiveTab("roadmap");
            }}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-mono font-medium rounded-lg border transition whitespace-nowrap shrink-0 ${
              activeTab === "roadmap"
                ? "bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_10px_rgba(0,200,83,0.1)]"
                : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/40"
            }`}
          >
            <Layers className="w-4 h-4" />
            Roadmap
          </button>
          
          <button
            id="tab-cheatsheet"
            onClick={() => {
              setCurrentLevelId(null);
              setActiveTab("terminal_cheatsheet");
            }}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-mono font-medium rounded-lg border transition whitespace-nowrap shrink-0 ${
              activeTab === "terminal_cheatsheet"
                ? "bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_10px_rgba(0,200,83,0.1)]"
                : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/40"
            }`}
          >
            <Terminal className="w-4 h-4" />
            CLI Tool Kit
          </button>

          <button
            id="tab-guidelines"
            onClick={() => {
              setCurrentLevelId(null);
              setActiveTab("ethical_guidelines");
            }}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-mono font-medium rounded-lg border transition whitespace-nowrap shrink-0 ${
              activeTab === "ethical_guidelines"
                ? "bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_10px_rgba(0,200,83,0.1)]"
                : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/40"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Ethical Guard
          </button>

          <button
            id="btn-settings-desktop"
            onClick={() => setSettingsOpen(true)}
            className="hidden md:flex text-zinc-400 hover:text-white hover:bg-zinc-900 p-2 rounded-lg border border-zinc-800 transition whitespace-nowrap shrink-0"
          >
            <Settings className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 border-l border-zinc-800/80 pl-2">
            <span className="hidden lg:inline text-[10px] font-mono text-zinc-500 truncate max-w-[120px]" title={user?.email}>
              {user?.email}
            </span>
            <button
              id="btn-logout"
              onClick={() => logout()}
              className="text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 px-2.5 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs font-mono"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Sign Out</span>
            </button>
          </div>
        </div>

      </div>

      {/* Settings Modal Dialog Overlay */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <h2 className="text-lg font-mono font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-500" /> Platform Settings
            </h2>
            
            <div className="space-y-4">
              {/* Matrix Rain Toggle */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-800">
                <div>
                  <span className="text-sm text-white font-mono block">Matrix Code Rain</span>
                  <span className="text-xs text-zinc-500">Toggle ambient background code streams.</span>
                </div>
                <button
                  id="btn-toggle-matrix"
                  onClick={() => setMatrixRainEnabled(!matrixRainEnabled)}
                  className={`px-3 py-1 text-xs font-mono rounded border transition ${
                    matrixRainEnabled 
                      ? "bg-green-500/10 border-green-500/30 text-green-400" 
                      : "bg-zinc-950 border-zinc-800 text-zinc-500"
                  }`}
                >
                  {matrixRainEnabled ? "Active" : "Disabled"}
                </button>
              </div>

              {/* Reset progress */}
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-white font-mono">Reset Educational Data</span>
                <p className="text-xs text-zinc-500">
                  This action permanently deletes all offline records, completed levels, high-score quizzes, and saved notes from your browser's local state. This cannot be undone.
                </p>
                <button
                  id="btn-reset-data"
                  onClick={() => {
                    if (window.confirm("ARE YOU ABSOLUTELY SURE you want to wipe out your progress, level completions, and research notes? This deletes everything.")) {
                      resetProgress();
                      setSettingsOpen(false);
                    }
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 mt-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 rounded-lg text-xs font-mono font-medium transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  Wipe Progress & Data
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
              <button
                id="btn-close-settings"
                onClick={() => setSettingsOpen(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-mono transition"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
