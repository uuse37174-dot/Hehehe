/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TermIcon, ShieldAlert, CheckCircle, HelpCircle, AlertCircle } from "lucide-react";
import { SimulationConfig, SimulationStep } from "../types";

interface TerminalSimulatorProps {
  config: SimulationConfig;
  onSuccess: () => void;
  levelId: number;
}

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "system";
}

export default function TerminalSimulator({ config, onSuccess, levelId }: TerminalSimulatorProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: config.welcomeMessage, type: "system" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [loadingLines, setLoadingLines] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const currentStep: SimulationStep | undefined = config.steps[currentStepIndex];

  // Auto scroll terminal to the bottom on log additions
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loadingLines]);

  // Reset simulation when level ID changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setHistory([{ text: config.welcomeMessage, type: "system" }]);
    setIsCompleted(false);
    setInputValue("");
    setCommandHistory([]);
    setHistoryPointer(-1);
  }, [levelId, config]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim();
    if (!command) return;

    // Log the user input command
    const newHistory = [...history, { text: `guest@hackroad:~$ ${command}`, type: "input" as const }];
    setHistory(newHistory);
    setInputValue("");

    // Add command to navigation history
    const updatedCmdHistory = [...commandHistory, command];
    setCommandHistory(updatedCmdHistory);
    setHistoryPointer(updatedCmdHistory.length);

    // Normalize command strings for comparison (remove extraneous spaces, single vs double quotes)
    const normalize = (str: string) => 
      str.toLowerCase()
         .replace(/\s+/g, " ")
         .replace(/['"]/g, '"')
         .trim();

    const normalizedInput = normalize(command);

    if (normalizedInput === "clear") {
      setHistory([]);
      return;
    }

    if (normalizedInput === "help") {
      setHistory([
        ...newHistory,
        { text: "=== HACKROAD TERM DIRECTIVES ===", type: "system" },
        { text: "help         - Display this manual info board.", type: "system" },
        { text: "hint         - Inspect details of the current challenge goal.", type: "system" },
        { text: "clear        - Flush terminal buffer lines.", type: "system" },
        { text: "status       - Enumerate completed labs progress.", type: "system" },
        { text: "=================================", type: "system" }
      ]);
      return;
    }

    if (normalizedInput === "hint") {
      if (currentStep) {
        setHistory([
          ...newHistory,
          { text: `[HINT] Goal: ${currentStep.instruction}`, type: "system" },
          { text: `Try running this: ${currentStep.hint}`, type: "system" }
        ]);
      } else {
        setHistory([...newHistory, { text: "No active level steps found.", type: "error" }]);
      }
      return;
    }

    if (normalizedInput === "status") {
      setHistory([
        ...newHistory,
        { text: `Lab: Level ${levelId} - Step ${currentStepIndex + 1} of ${config.steps.length}`, type: "system" },
        { text: `Completed: ${isCompleted ? "YES (Mark as complete button active)" : "NO"}`, type: "system" }
      ]);
      return;
    }

    // Check if input matches target command
    if (currentStep && normalizedInput === normalize(currentStep.expectedCommand)) {
      setLoadingLines(true);
      
      // Simulate real-world scanning latencies (300-800ms)
      setTimeout(() => {
        setLoadingLines(false);
        const outputs = currentStep.expectedOutput.split("\n");
        const addedLines: TerminalLine[] = outputs.map(line => ({ text: line, type: "output" as const }));
        
        addedLines.push({ 
          text: `[✓] Goal achieved: ${currentStep.instruction.substring(0, 35)}...`, 
          type: "success" as const 
        });

        const updatedIndex = currentStepIndex + 1;
        if (updatedIndex < config.steps.length) {
          setCurrentStepIndex(updatedIndex);
          addedLines.push({ 
            text: `\n[!] NEXT STEP UNLOCKED:\n>> ${config.steps[updatedIndex].instruction}`, 
            type: "system" as const 
          });
          setHistory([...newHistory, ...addedLines]);
        } else {
          setIsCompleted(true);
          addedLines.push({ 
            text: "\n[★★★★★] SIMULATION RESOLVED SUCCESSFULLY! [★★★★★]\nAll vulnerabilities mapped. You have gained administrative clearance for this level. The 'Mark as Complete' button is now unlocked!", 
            type: "success" as const 
          });
          setHistory([...newHistory, ...addedLines]);
          onSuccess(); // Trigger parent completed state
        }
      }, 600);
    } else {
      // Wrong command typed
      setHistory([
        ...newHistory,
        { text: `Error: Command not recognized or failed payload audit.`, type: "error" },
        { text: `Type 'hint' if you are stuck or read the required topics tab.`, type: "system" }
      ]);
    }
  };

  // Keyboard navigation for command history (Up / Down keys)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyPointer > 0) {
        const newPointer = historyPointer - 1;
        setHistoryPointer(newPointer);
        setInputValue(commandHistory[newPointer]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer < commandHistory.length - 1) {
        const newPointer = historyPointer + 1;
        setHistoryPointer(newPointer);
        setInputValue(commandHistory[newPointer]);
      } else {
        setHistoryPointer(commandHistory.length);
        setInputValue("");
      }
    }
  };

  return (
    <div id={`term-sim-${levelId}`} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[480px]">
      
      {/* Terminal Titlebar */}
      <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 pl-2">
            <TermIcon className="w-3.5 h-3.5 text-green-500" />
            root@hackroad:~
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-mono">
            Interactive Console
          </span>
        </div>
      </div>

      {/* active Goal header banner */}
      {currentStep && (
        <div className="bg-zinc-900/40 border-b border-zinc-800/60 p-3 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="text-zinc-500 font-mono font-medium block uppercase tracking-wider text-[9px]">
              Active Objective (Step {currentStepIndex + 1} of {config.steps.length})
            </span>
            <p className="text-zinc-300 font-mono">{currentStep.instruction}</p>
          </div>
        </div>
      )}

      {/* Terminal Log Output Buffer */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs select-text">
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input" ? "text-zinc-300" :
              line.type === "error" ? "text-red-400" :
              line.type === "success" ? "text-green-400 font-bold" :
              line.type === "system" ? "text-cyan-400/80" : "text-green-500/95"
            }`}
          >
            {line.text}
          </div>
        ))}

        {loadingLines && (
          <div className="text-green-500 flex items-center gap-1.5 animate-pulse">
            <span>[*] Processing injection payload</span>
            <span className="inline-block animate-bounce font-sans">...</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Command input prompt form */}
      <form onSubmit={handleCommandSubmit} className="bg-zinc-950 border-t border-zinc-900 p-3 flex items-center">
        <span className="text-green-500 font-mono text-xs mr-2 shrink-0">
          <span className="hidden sm:inline">guest@hackroad:~$</span>
          <span className="inline sm:hidden">~$</span>
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isCompleted || loadingLines}
          placeholder={isCompleted ? "Simulation resolved! Proceed to completion." : "Type command... (or 'hint', 'help')"}
          className="flex-1 bg-transparent text-green-400 outline-none border-none font-mono text-xs w-full disabled:opacity-50"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {!isCompleted && (
          <button 
            type="button" 
            onClick={() => handleCommandSubmit({ preventDefault: () => {} } as React.FormEvent)}
            className="text-[10px] bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 px-2 py-1 rounded font-mono transition"
          >
            Run
          </button>
        )}
      </form>
    </div>
  );
}
