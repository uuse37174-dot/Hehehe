/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useStore } from "../store";
import { LEVELS } from "../data/levels";
import { Difficulty, Phase, Level } from "../types";
import { Lock, Unlock, Check, Search, Filter, Award, ChevronRight, HelpCircle, LayoutGrid } from "lucide-react";

interface RoadmapProps {
  onSelectLevel: (level: Level) => void;
}

export default function Roadmap({ onSelectLevel }: RoadmapProps) {
  const { 
    completedLevels, 
    unlockedLevels,
    searchQuery,
    difficultyFilter,
    phaseFilter,
    setSearchQuery,
    setDifficultyFilter,
    setPhaseFilter,
    user
  } = useStore();

  // Filter levels list based on user selection in search/filter bars
  const filteredLevels = LEVELS.filter((level) => {
    const matchesSearch = level.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          level.targetApp.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          level.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = difficultyFilter === "All" || level.difficulty === difficultyFilter;
    const matchesPhase = phaseFilter === "All" || level.phase === phaseFilter;

    return matchesSearch && matchesDifficulty && matchesPhase;
  });

  // Count milestones per phase
  const getPhaseStats = (phase: Phase) => {
    const phaseLevels = LEVELS.filter(l => l.phase === phase);
    const completed = phaseLevels.filter(l => completedLevels.includes(l.id)).length;
    return { completed, total: phaseLevels.length };
  };

  const phases = [
    { name: Phase.BeginnerFoundations, stats: getPhaseStats(Phase.BeginnerFoundations), desc: "Gain solid operational understanding of Linux commands, computer networking structures, and system security fundamentals." },
    { name: Phase.IntermediateWebNetwork, stats: getPhaseStats(Phase.IntermediateWebNetwork), desc: "Master active port enumeration, target cataloging, and critical OWASP vulnerabilities like SQL injection, XSS, and CSRF." },
    { name: Phase.AdvancedExploitation, stats: getPhaseStats(Phase.AdvancedExploitation), desc: "Perform deep binary analyses, analyze memory registers for overflows, audit S3 cloud configurations, and hook active mobile app systems." },
    { name: Phase.ExpertRedTeaming, stats: getPhaseStats(Phase.ExpertRedTeaming), desc: "Enact advanced enterprise operations like Kerberoasting, golden token deployments, and refine standard bug bounty disclosure practices." }
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-6 font-sans">
      
      {/* Filtering sidebar panel */}
      <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg h-fit space-y-5 lg:sticky lg:top-24">
        <div>
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2">Filter Roadmap</h3>
          <p className="text-[11px] text-zinc-500">Search through the 100 progressive levels of the cybersecurity curriculum.</p>
        </div>

        {/* Search Input bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search app, topic, CVE..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:border-green-500 outline-none transition"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-mono text-zinc-500 uppercase">Difficulty</label>
          <div className="flex flex-wrap gap-1.5">
            {["All", ...Object.values(Difficulty)].map((diff) => (
              <button
                key={diff}
                id={`filter-diff-${diff}`}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-2.5 py-1 text-[10px] font-mono rounded border transition cursor-pointer ${
                  difficultyFilter === diff
                    ? "bg-green-500/10 border-green-500/50 text-green-400"
                    : "bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Phase Select List */}
        <div className="space-y-1.5 border-t border-zinc-800 pt-3.5">
          <label className="text-[9px] font-mono text-zinc-500 uppercase">Phase Tracks</label>
          <div className="flex flex-col gap-1.5">
            <button
              id="filter-phase-all"
              onClick={() => setPhaseFilter("All")}
              className={`w-full text-left px-3 py-2 text-[11px] font-mono rounded border transition cursor-pointer ${
                phaseFilter === "All"
                  ? "bg-green-500/10 border-green-500/50 text-green-400"
                  : "bg-zinc-950 border-zinc-800/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              All Phases (1-100)
            </button>
            {phases.map((p) => (
              <button
                key={p.name}
                id={`filter-phase-${p.name.replace(/\s+/g, "-")}`}
                onClick={() => setPhaseFilter(p.name)}
                className={`w-full text-left px-3 py-2 text-[11px] font-mono rounded border transition flex justify-between items-center gap-2 cursor-pointer ${
                  phaseFilter === p.name
                    ? "bg-green-500/10 border-green-500/50 text-green-400 font-medium"
                    : "bg-zinc-950 border-zinc-800/60 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span className="break-words whitespace-normal text-left mr-2">{p.name}</span>
                <span className="text-[9px] bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 shrink-0">
                  {p.stats.completed}/{p.stats.total}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Help Info card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-[10px] leading-relaxed text-zinc-400 font-mono">
          <HelpCircle className="w-4 h-4 text-green-500 mb-1.5" />
          To complete the roadmap, resolve each level by studying the required syllabus topics, passing its 50-question assess test, and solving the interactive hacking shell simulation.
        </div>
      </div>

      {/* Main Roadmap Path timeline */}
      <div className="lg:col-span-3 space-y-12">
        
        {/* Iterate over each phase group if filtering allows */}
        {phases.map((ph) => {
          // Filter levels inside this specific phase
          const levelsInPhase = filteredLevels.filter((l) => l.phase === ph.name);
          if (levelsInPhase.length === 0) return null;

          return (
            <div key={ph.name} className="space-y-6">
              
              {/* Phase header banner */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
                <div className="space-y-1">
                  <span className="text-[10px] text-green-500 font-mono font-bold uppercase tracking-wider">
                    Syllabus Phase Track
                  </span>
                  <h2 className="text-md font-mono font-bold text-white uppercase">{ph.name}</h2>
                  <p className="text-[11px] text-zinc-400 max-w-xl font-sans leading-relaxed">{ph.desc}</p>
                </div>
                
                {/* Stats badge */}
                <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-center font-mono shrink-0">
                  <span className="text-[9px] text-zinc-500 block uppercase font-bold">Progress</span>
                  <span className="text-sm text-green-400 font-bold">{ph.stats.completed} / {ph.stats.total}</span>
                  <span className="text-[9px] text-zinc-500 block">Levels</span>
                </div>
              </div>

              {/* Levels Grid Layout */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {levelsInPhase.map((level) => {
                  const isCompleted = completedLevels.includes(level.id);
                  const isUnlocked = user?.isAdmin || unlockedLevels.includes(level.id);

                  let borderStyle = "border-zinc-800/80 bg-zinc-900/40 opacity-50";
                  let textStyle = "text-zinc-500";
                  let hoverEffect = "";

                  if (isCompleted) {
                    borderStyle = "border-green-500/40 bg-green-950/5 shadow-[0_0_15px_rgba(0,200,83,0.04)]";
                    textStyle = "text-green-400";
                    hoverEffect = "hover:border-green-500/60 hover:shadow-[0_0_20px_rgba(0,200,83,0.08)] cursor-pointer";
                  } else if (isUnlocked) {
                    borderStyle = "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-850/80 shadow-md";
                    textStyle = "text-zinc-300";
                    hoverEffect = "hover:border-green-500/30 hover:shadow-[0_0_15px_rgba(0,200,83,0.05)] cursor-pointer";
                  }

                  return (
                    <div
                      key={level.id}
                      id={`level-node-${level.id}`}
                      onClick={() => isUnlocked && onSelectLevel(level)}
                      className={`rounded-xl border p-4 transition duration-300 relative flex flex-col justify-between min-h-[145px] ${borderStyle} ${hoverEffect}`}
                    >
                      {/* Top Row: Level Num & Locks */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] bg-zinc-950 border border-zinc-800/80 px-2 py-0.5 rounded-md font-mono text-zinc-400">
                          LVL {level.id}
                        </span>
                        
                        {/* Lock / Unlock State */}
                        <div className="shrink-0">
                          {isCompleted ? (
                            <div className="bg-green-500/20 text-green-400 p-1 rounded-md border border-green-500/30">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          ) : isUnlocked ? (
                            <div className="bg-zinc-950 text-zinc-400 p-1 rounded-md border border-zinc-800">
                              <Unlock className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="bg-zinc-950 text-zinc-600 p-1 rounded-md border border-zinc-800">
                              <Lock className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Level Title & App details */}
                      <div className="space-y-1">
                        <h4 className={`text-[12.5px] font-mono font-bold tracking-tight line-clamp-1 ${isUnlocked ? "text-white" : "text-zinc-500"}`}>
                          {level.title}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-zinc-500 font-mono">App:</span>
                          <span className={`text-[10px] font-mono truncate max-w-[150px] ${isUnlocked ? "text-green-500/80" : "text-zinc-600"}`}>
                            {level.targetApp}
                          </span>
                        </div>
                      </div>

                      {/* Footer Row: Difficulty and Launch details */}
                      <div className="flex items-center justify-between gap-2 mt-4 border-t border-zinc-950/60 pt-2.5">
                        <span className={`text-[9px] uppercase font-mono tracking-wider font-semibold ${
                          level.difficulty === Difficulty.Beginner ? "text-green-400" :
                          level.difficulty === Difficulty.Intermediate ? "text-amber-400" :
                          level.difficulty === Difficulty.Advanced ? "text-purple-400" : "text-red-400"
                        }`}>
                          {level.difficulty}
                        </span>

                        {isUnlocked && (
                          <span className="text-[9px] font-mono text-zinc-400 flex items-center gap-0.5 group hover:text-green-400 transition">
                            Open Workspace
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}

        {/* Empty Search Fallback */}
        {filteredLevels.length === 0 && (
          <div className="text-center py-16 bg-zinc-950 border border-zinc-900 rounded-xl space-y-3">
            <LayoutGrid className="w-12 h-12 text-zinc-700 mx-auto" />
            <div>
              <h4 className="text-sm font-mono font-bold text-white">No Matching Audits Found</h4>
              <p className="text-xs text-zinc-500">Adjust your search parameters, selected difficulty, or phase filters.</p>
            </div>
            <button
              id="btn-reset-filters"
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("All");
                setPhaseFilter("All");
              }}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-xs font-mono rounded hover:bg-zinc-800 transition text-zinc-400 hover:text-white cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
