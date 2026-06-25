/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useStore } from "./store";
import { getLevelById } from "./data/levels";
import Navbar from "./components/Navbar";
import Roadmap from "./components/Roadmap";
import LevelWorkspace from "./components/LevelWorkspace";
import EthicalGuidelines from "./components/EthicalGuidelines";
import TerminalCheatsheet from "./components/TerminalCheatsheet";
import MatrixRain from "./components/MatrixRain";
import { LoginPage } from "./components/LoginPage";
import { ShieldCheck, Info, Terminal, RefreshCw, Award } from "lucide-react";

export default function App() {
  const { 
    currentLevelId, 
    setCurrentLevelId, 
    activeTab, 
    setActiveTab, 
    completedLevels, 
    xp,
    user
  } = useStore();

  const activeLevel = currentLevelId ? getLevelById(currentLevelId) : null;

  if (!user) {
    return (
      <div className="relative min-h-screen bg-zinc-950">
        <MatrixRain />
        <LoginPage />
      </div>
    );
  }

  return (
    <div id="app-root" className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-x-hidden selection:bg-green-500/20 selection:text-green-400">
      
      {/* Background Matrix rain code streams */}
      <MatrixRain />

      {/* Header Dashboard Nav bar */}
      <Navbar />

      {/* Main Educational Application Portal Container */}
      <main id="main-container" className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 relative z-10">
        
        {/* Dynamic Route Rendering based on Active State */}
        {activeLevel ? (
          // Individual level learning workspace
          <LevelWorkspace 
            level={activeLevel} 
            onBack={() => setCurrentLevelId(null)} 
          />
        ) : (
          // Main tabbed views
          <>
            {activeTab === "roadmap" && (
              <div className="space-y-6">
                
                {/* Dashboard Jumbotron Banner */}
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl">
                  {/* Subtle vector background decal */}
                  <div className="absolute right-0 top-0 translate-x-20 -translate-y-20 opacity-5 pointer-events-none select-none">
                    <Terminal className="w-96 h-96 text-green-500" />
                  </div>
                  
                  <div className="max-w-2xl space-y-4">
                    <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500 animate-pulse" />
                      Cyber Security Academy
                    </span>
                    <h2 className="text-2xl md:text-4xl font-mono font-bold text-white tracking-tight leading-tight">
                      Master Authorized Pen-Testing, Step-By-Step
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                      Welcome to <strong className="text-white">HackRoad</strong>. This syllabus takes you from absolute terminal beginner (Level 1) through advanced web application testing, reverse engineering memory assemblies, auditing cloud storage assets, to elite enterprise-grade Red Teaming.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-mono text-zinc-500 pt-1">
                      <span>• 100 Progressive Milestones</span>
                      <span>• 5,000 Questions</span>
                      <span>• 100% Free & Offline-First</span>
                    </div>
                  </div>
                </div>

                {/* Levels Roadmap list */}
                <Roadmap onSelectLevel={(lvl) => setCurrentLevelId(lvl.id)} />
              </div>
            )}

            {activeTab === "terminal_cheatsheet" && (
              <TerminalCheatsheet />
            )}

            {activeTab === "ethical_guidelines" && (
              <EthicalGuidelines />
            )}
          </>
        )}
      </main>

      {/* Persistent global warning footer bar */}
      <footer id="global-footer" className="bg-zinc-950 border-t border-zinc-900 py-4 px-4 text-center text-[11px] font-mono text-zinc-600 relative z-10 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 HackRoad. Designed strictly for defensive, educational, and authorized pen-testing research.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-400 transition cursor-help" title="Local browser IndexedDB storage status: ACTIVE">Offline Persistence: LocalStorage</span>
            <span className="text-green-500/60 font-bold">White Hat Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
