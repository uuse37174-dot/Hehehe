/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { useStore } from "../store";
import { Level, Question, Note } from "../types";
import { TOPICS } from "../data/topics";
import { generateQuestionsForLevel } from "../data/questions";
import TerminalSimulator from "./TerminalSimulator";
import HackerConfetti from "./HackerConfetti";
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Terminal, 
  ChevronLeft, 
  Check, 
  Award, 
  Compass, 
  Search, 
  Edit3, 
  Save, 
  Trash2, 
  Info, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clipboard
} from "lucide-react";

interface LevelWorkspaceProps {
  level: Level;
  onBack: () => void;
}

export default function LevelWorkspace({ level, onBack }: LevelWorkspaceProps) {
  const { 
    completedLevels, 
    completeLevel, 
    quizProgress, 
    saveQuizProgress,
    notes,
    saveNote,
    deleteNote,
    user
  } = useStore();

  const [activeTab, setActiveTab] = useState<"learn" | "quiz" | "simulation" | "notes">("learn");
  const [activeTopicId, setActiveTopicId] = useState<string | null>(level.topics[0] || null);
  const [showConfetti, setShowConfetti] = useState(false);

  // --- Quiz States ---
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState(0);
  
  // Track user's selected answers during current quiz run
  const [answersMap, setAnswersMap] = useState<Record<number, number>>({});

  // --- Hacking Simulation States ---
  const [simCompleted, setSimCompleted] = useState(false);

  // --- Copy Command State ---
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  // --- Notes Scratchpad States ---
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  // Load level quiz questions on mount or level change
  useEffect(() => {
    const questions = generateQuestionsForLevel(level.id, level.topics);
    setQuizQuestions(questions);
    
    // Reset quiz and simulation states for new level
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setAnswered(false);
    setCorrectCount(0);
    setQuizSubmitted(false);
    setAnswersMap({});
    setSimCompleted(false);
    setActiveTab("learn");
    if (level.topics.length > 0) {
      setActiveTopicId(level.topics[0]);
    }

    // Load existing note if any
    const existingNote = notes.find(n => n.levelId === level.id);
    if (existingNote) {
      setNoteTitle(existingNote.title);
      setNoteContent(existingNote.content);
    } else {
      setNoteTitle(`Level ${level.id} security notes`);
      setNoteContent("");
    }
  }, [level, notes]);

  const levelPassedQuiz = user?.isAdmin || !!quizProgress[level.id]?.passed;
  const isLevelCompleted = user?.isAdmin || completedLevels.includes(level.id);

  // Handle quiz option selection
  const handleSelectOption = (optionIdx: number) => {
    if (answered) return;
    setSelectedOption(optionIdx);
  };

  // Submit single question answer
  const handleAnswerSubmit = () => {
    if (selectedOption === null || answered) return;

    setAnswered(true);
    const correctIdx = quizQuestions[currentQuestionIdx].correctIndex;
    const isCorrect = selectedOption === correctIdx;

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    // Record answer
    setAnswersMap(prev => ({
      ...prev,
      [currentQuestionIdx]: selectedOption
    }));
  };

  // Move to next question or show final scores
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setAnswered(false);

    if (currentQuestionIdx + 1 < quizQuestions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Quiz finished
      setQuizSubmitted(true);
      const passed = correctCount >= 35; // 70% of 50 is 35
      saveQuizProgress(level.id, correctCount, passed, answersMap);
    }
  };

  // Restart quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setAnswered(false);
    setCorrectCount(0);
    setQuizSubmitted(false);
    setAnswersMap({});
    setQuizAttempts(prev => prev + 1);
    // Regenerate randomized questions for infinite retries
    const freshQuestions = generateQuestionsForLevel(level.id, level.topics);
    setQuizQuestions(freshQuestions);
  };

  // Save Note scratchpad
  const handleSaveNote = () => {
    if (!noteTitle.trim()) return;
    saveNote(level.id, noteTitle, noteContent);
    alert("Research note successfully saved locally!");
  };

  // Delete note
  const handleDeleteNote = (id: string) => {
    if (window.confirm("Are you sure you want to discard this note?")) {
      deleteNote(id);
      setNoteTitle(`Level ${level.id} security notes`);
      setNoteContent("");
    }
  };

  // Complete level click
  const handleCompleteLevel = () => {
    completeLevel(level.id);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3500);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      
      {/* Confetti Emitter */}
      <HackerConfetti active={showConfetti} />

      {/* Level Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-zinc-800 pb-5">
        <div className="flex items-start gap-3">
          <button
            id="btn-workspace-back"
            onClick={onBack}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-2 rounded-lg text-zinc-400 hover:text-white transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/30 px-2 py-0.5 rounded font-mono font-bold">
                LEVEL {level.id}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                {level.difficulty} • {level.phase}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-mono font-bold text-white tracking-wide">{level.title}</h1>
          </div>
        </div>

        {/* Level complete state card */}
        <div className="flex items-center gap-3">
          {isLevelCompleted ? (
            <div className="bg-green-950/40 border border-green-500/30 px-4 py-2 rounded-xl flex items-center gap-2.5 shadow-[0_0_15px_rgba(0,200,83,0.1)]">
              <Award className="w-5 h-5 text-green-400 animate-pulse" />
              <div>
                <span className="text-[10px] text-green-400 font-mono font-bold uppercase block leading-none">Status</span>
                <span className="text-xs text-white font-mono">Level Accomplished</span>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-zinc-400 animate-spin" style={{ animationDuration: '6s' }} />
              <div>
                <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase block leading-none">Status</span>
                <span className="text-xs text-zinc-500 font-mono">Ongoing Mission</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Secondary Workspace Tab Layout */}
      <div className="flex border-b border-zinc-800 mb-6 overflow-x-auto gap-2">
        <button
          id="ws-tab-learn"
          onClick={() => setActiveTab("learn")}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-medium border-b-2 transition shrink-0 ${
            activeTab === "learn"
              ? "border-green-500 text-green-400 bg-green-500/5"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          1. Required Syllabus
        </button>
        
        <button
          id="ws-tab-quiz"
          onClick={() => setActiveTab("quiz")}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-medium border-b-2 transition shrink-0 ${
            activeTab === "quiz"
              ? "border-green-500 text-green-400 bg-green-500/5"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          2. Assessment Quiz {levelPassedQuiz ? "✓" : `(0/50)`}
        </button>

        <button
          id="ws-tab-simulation"
          disabled={!levelPassedQuiz && !isLevelCompleted}
          onClick={() => setActiveTab("simulation")}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-medium border-b-2 transition shrink-0 ${
            activeTab === "simulation"
              ? "border-green-500 text-green-400 bg-green-500/5"
              : "border-transparent text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
          }`}
          title={!levelPassedQuiz ? "Complete and pass the quiz to unlock this section." : ""}
        >
          <Terminal className="w-4 h-4" />
          3. Hacking Sandbox {simCompleted ? "✓" : ""}
        </button>

        <button
          id="ws-tab-notes"
          onClick={() => setActiveTab("notes")}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-medium border-b-2 transition shrink-0 ${
            activeTab === "notes"
              ? "border-green-500 text-green-400 bg-green-500/5"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          Research Journal
        </button>
      </div>

      {/* --- TAB CONTENT AREA --- */}
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (Main active content pane) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. LEARN TAB */}
          {activeTab === "learn" && (
            <div id="syllabus-content" className="space-y-6">
              
              {/* Target App Intro Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
                <span className="text-[10px] text-green-500 font-mono font-semibold uppercase block tracking-wider mb-1">
                  Target Application
                </span>
                <h3 className="text-lg font-mono font-bold text-white mb-2">{level.targetApp}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">{level.targetAppDescription}</p>
                
                <div className="bg-zinc-950 border border-zinc-800/60 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-500 font-mono">
                    <Search className="w-4 h-4 text-green-500 shrink-0" />
                    <span>Search this on Play Store / App Store:</span>
                    <strong className="text-zinc-300">"{level.appStoreSearchTerm}"</strong>
                  </div>
                  <a 
                    href={`https://play.google.com/store/search?q=${encodeURIComponent(level.appStoreSearchTerm)}`}
                    target="_blank" 
                    referrerPolicy="no-referrer"
                    className="text-[10px] bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded font-mono transition cursor-pointer text-center shrink-0 w-full sm:w-auto"
                  >
                    View Store
                  </a>
                </div>
              </div>

              {/* Topics detail view */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">Required Concepts</h3>
                
                {level.topics.map((tId) => {
                  const t = TOPICS[tId];
                  if (!t) return null;
                  const isExpanded = activeTopicId === tId;

                  return (
                    <div key={tId} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                      <button
                        onClick={() => setActiveTopicId(isExpanded ? null : tId)}
                        className="w-full text-left px-5 py-3.5 flex items-center justify-between hover:bg-zinc-850/30 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-mono">
                            {t.category}
                          </span>
                          <span className="text-sm font-mono font-bold text-white">{t.title}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-zinc-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-500" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-5 border-t border-zinc-800 space-y-4 text-zinc-300 text-sm font-sans leading-relaxed">
                          <div>
                            <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase block mb-1">
                              Explanation & Mechanics
                            </span>
                            <p>{t.explanation}</p>
                          </div>

                          <div className="bg-green-500/5 border-l-2 border-green-500 p-3.5 rounded-r">
                            <span className="text-[10px] text-green-400 font-mono font-semibold uppercase block mb-1">
                              An Intuitive Analogy
                            </span>
                            <p className="text-xs text-zinc-400 italic">"{t.analogy}"</p>
                          </div>

                          <div>
                            <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase block mb-1.5">
                              Real-World Exploit Scenario
                            </span>
                            <p className="text-xs text-zinc-400">{t.realWorldExample}</p>
                          </div>

                          {t.commands.length > 0 && (
                            <div>
                              <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase block mb-2">
                                Crucial Shell Commands & Syntax
                              </span>
                              <div className="space-y-2.5">
                                {t.commands.map((cmd, cIdx) => (
                                  <div key={cIdx} className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-3 flex flex-col gap-2 font-mono text-xs">
                                    <div className="flex justify-between items-start gap-3 w-full min-w-0">
                                      <div className="overflow-x-auto w-full pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                                        <code className="text-green-300 select-all font-bold leading-relaxed whitespace-nowrap block py-0.5">{cmd.cmd}</code>
                                      </div>
                                      <button
                                        onClick={() => copyCommand(cmd.cmd)}
                                        className="text-zinc-500 hover:text-white bg-zinc-900/60 p-1.5 rounded border border-zinc-800/80 hover:border-zinc-700 transition shrink-0"
                                        title="Copy Command"
                                      >
                                        {copiedCmd === cmd.cmd ? (
                                          <Check className="w-3.5 h-3.5 text-green-400" />
                                        ) : (
                                          <Clipboard className="w-3.5 h-3.5" />
                                        )}
                                      </button>
                                    </div>
                                    <p className="text-[11px] text-zinc-400 border-t border-zinc-900/80 pt-1.5 font-sans leading-relaxed">
                                      {cmd.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/60">
                            <div>
                              <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase block mb-1">
                                Common Audit Tools
                              </span>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {t.tools.map((tl, tlIdx) => (
                                  <span key={tlIdx} className="bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-mono px-2 py-0.5 rounded">
                                    {tl}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase block mb-1 text-green-400">
                                Remediation & Defense
                              </span>
                              <p className="text-xs text-zinc-400 leading-relaxed">{t.prevention}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Ready to take quiz callout */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-mono font-bold text-white">Syllabus Read & Understood?</h4>
                  <p className="text-xs text-zinc-400">Unlock the hacking lab by verifying your skills with the 50-question quiz.</p>
                </div>
                <button
                  id="btn-goto-quiz"
                  onClick={() => setActiveTab("quiz")}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-black text-xs font-mono font-bold rounded-lg transition shrink-0 shadow-[0_0_15px_rgba(0,200,83,0.1)] cursor-pointer"
                >
                  Start Quiz
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* 2. QUIZ TAB */}
          {activeTab === "quiz" && (
            <div id="quiz-workspace" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
              
              {!quizSubmitted ? (
                <div className="space-y-6">
                  
                  {/* Quiz header */}
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                    <div>
                      <h3 className="text-md font-mono font-bold text-white flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-green-500" />
                        Level {level.id} Skills Assessment
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                        Answer 50 multiple choice questions correctly. 70% passing threshold ({correctCount}/35 correct).
                      </p>
                    </div>
                    <span className="text-xs font-mono bg-zinc-950 border border-zinc-800 text-green-400 px-3 py-1 rounded">
                      Question {currentQuestionIdx + 1} of 50
                    </span>
                  </div>

                  {/* Quiz progress bar */}
                  <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-green-500 h-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIdx) / 50) * 100}%` }}
                    ></div>
                  </div>

                  {/* Active Question Panel */}
                  {quizQuestions[currentQuestionIdx] && (
                    <div className="space-y-4">
                      <div className="bg-zinc-950 border border-zinc-800/60 p-4 rounded-xl">
                        <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded font-mono">
                          Scenario Question
                        </span>
                        <p className="text-sm font-mono text-zinc-300 mt-2.5 leading-relaxed whitespace-pre-wrap">
                          {quizQuestions[currentQuestionIdx].text}
                        </p>
                      </div>

                      {/* Options Grid */}
                      <div className="grid gap-3">
                        {quizQuestions[currentQuestionIdx].options.map((option, idx) => {
                          const isSelected = selectedOption === idx;
                          const isCorrect = idx === quizQuestions[currentQuestionIdx].correctIndex;

                          let optionStyle = "bg-zinc-950 hover:bg-zinc-850/40 border-zinc-800 text-zinc-300";
                          if (answered) {
                            if (isCorrect) optionStyle = "bg-green-950/30 border-green-500 text-green-400 font-medium";
                            else if (isSelected) optionStyle = "bg-red-950/30 border-red-500 text-red-400";
                            else optionStyle = "bg-zinc-950 border-zinc-800 opacity-40 text-zinc-500";
                          } else if (isSelected) {
                            optionStyle = "bg-green-500/10 border-green-500/60 text-green-400 shadow-[0_0_10px_rgba(0,200,83,0.05)]";
                          }

                          return (
                            <button
                              key={idx}
                              id={`quiz-opt-${idx}`}
                              disabled={answered}
                              onClick={() => handleSelectOption(idx)}
                              className={`w-full text-left p-3.5 rounded-lg border text-xs font-mono flex items-center justify-between transition cursor-pointer ${optionStyle}`}
                            >
                              <span>{option}</span>
                              {answered && isCorrect && <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />}
                              {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Answer Feedback / Explanation block */}
                      {answered && (
                        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-mono space-y-2 animate-fade-in">
                          <div className="flex items-center gap-1.5">
                            {selectedOption === quizQuestions[currentQuestionIdx].correctIndex ? (
                              <span className="text-green-500 font-bold">✓ CORRECT MATCH</span>
                            ) : (
                              <span className="text-red-400 font-bold">✗ INCORRECT PENETRATION</span>
                            )}
                          </div>
                          <p className="text-zinc-400 leading-relaxed">
                            {quizQuestions[currentQuestionIdx].explanation}
                          </p>
                        </div>
                      )}

                      {/* Navigation Trigger Footer */}
                      <div className="flex justify-end pt-2">
                        {!answered ? (
                          <button
                            id="btn-submit-answer"
                            disabled={selectedOption === null}
                            onClick={handleAnswerSubmit}
                            className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-black text-xs font-mono font-bold rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(0,200,83,0.1)] cursor-pointer"
                          >
                            Verify Choice
                          </button>
                        ) : (
                          <button
                            id="btn-next-question"
                            onClick={handleNextQuestion}
                            className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-black text-xs font-mono font-bold rounded-lg transition shadow-[0_0_10px_rgba(0,200,83,0.1)] cursor-pointer"
                          >
                            {currentQuestionIdx + 1 === 50 ? "Complete Exam" : "Next Question"}
                          </button>
                        )}
                      </div>

                    </div>
                  )}

                </div>
              ) : (
                // QUIZ COMPLETED RESULTS SCREEN
                <div className="text-center py-6 space-y-6">
                  <div className="inline-flex bg-zinc-950 border border-zinc-800 p-4 rounded-full mb-2">
                    {correctCount >= 35 ? (
                      <Award className="w-16 h-16 text-green-500 animate-bounce" />
                    ) : (
                      <XCircle className="w-16 h-16 text-red-500 animate-pulse" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-mono font-bold text-white">
                      {correctCount >= 35 ? "ASSESSMENT CERTIFIED!" : "EXAM UNSUCCESSFUL"}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 font-sans">
                      Target App hacking clearance requires a minimum 70% score (35 out of 50 correct).
                    </p>
                  </div>

                  {/* Score circle layout */}
                  <div className="max-w-xs mx-auto bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase block">Your Score</span>
                    <span className="text-3xl font-mono font-bold text-green-500 block my-1">
                      {correctCount} <span className="text-zinc-500 text-sm">/ 50</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono block">
                      Percentage: {Math.round((correctCount / 50) * 100)}%
                    </span>
                  </div>

                  {correctCount >= 35 ? (
                    <div className="space-y-4">
                      <div className="bg-green-950/20 border border-green-500/20 max-w-md mx-auto p-4 rounded-xl text-xs text-green-400 font-mono leading-relaxed">
                        Congratulations! You have demonstrated core theoretical comprehension of the audit methodologies. The Target App and Simulated Hacking Terminal sandbox are now fully unlocked!
                      </div>
                      
                      <div className="flex justify-center gap-3">
                        <button
                          id="btn-goto-sim-tab"
                          onClick={() => {
                            setActiveTab("simulation");
                          }}
                          className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-black text-xs font-mono font-bold rounded-lg transition shadow-[0_0_15px_rgba(0,200,83,0.15)] cursor-pointer"
                        >
                          Open Shell Simulation
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-red-950/20 border border-red-500/20 max-w-md mx-auto p-4 rounded-xl text-xs text-red-400 font-mono leading-relaxed">
                        Vulnerability audit scores did not satisfy credentials. Review the required syllabus topics, command details, and try again. Retries are 100% free with unlimited tries.
                      </div>
                      
                      <div className="flex justify-center gap-3">
                        <button
                          id="btn-retry-quiz"
                          onClick={handleRestartQuiz}
                          className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono rounded-lg transition cursor-pointer"
                        >
                          Retry Assessment
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* 3. SIMULATION TAB */}
          {activeTab === "simulation" && (
            <div id="sim-terminal-pane" className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-400 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono">
                  <Terminal className="w-4 h-4 text-green-500" />
                  <span>Interactive Terminal Sandbox Unlocked</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-sans italic">Type commands matching active instructions</span>
              </div>

              {/* Terminal Element */}
              <TerminalSimulator 
                config={level.simulation} 
                levelId={level.id}
                onSuccess={() => setSimCompleted(true)} 
              />
            </div>
          )}

          {/* 4. NOTES TAB */}
          {activeTab === "notes" && (
            <div id="journal-pane" className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl space-y-4">
              
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-green-500" /> Research Journal
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                    Synthesize, document, and catalog your pen-testing findings for this level. Persistent offline.
                  </p>
                </div>
              </div>

              {/* Input elements */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-zinc-500 font-mono uppercase block mb-1.5">Note Title</label>
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="Enter short summary title..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm font-mono text-white focus:border-green-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 font-mono uppercase block mb-1.5">Findings & Shell Snippets</label>
                  <textarea
                    rows={8}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Type notes here... Write down commands, code templates, CVE definitions, etc."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs font-mono text-zinc-300 focus:border-green-500 outline-none resize-y"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  {notes.some(n => n.levelId === level.id) && (
                    <button
                      id="btn-discard-note"
                      onClick={() => {
                        const note = notes.find(n => n.levelId === level.id);
                        if (note) handleDeleteNote(note.id);
                      }}
                      className="px-4 py-2 bg-red-950/20 hover:bg-red-900/40 text-red-400 border border-red-500/20 rounded-lg text-xs font-mono transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Discard
                    </button>
                  )}
                  <button
                    id="btn-save-note"
                    onClick={handleSaveNote}
                    className="px-5 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(0,200,83,0.1)]"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Note
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Column (Progression Control Sidepanel) */}
        <div className="space-y-6">
          
          {/* Level progress milestone check list */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 mb-4">
              Mission Checklist
            </h4>

            <ul className="space-y-4">
              {/* Step 1: Learn Topics */}
              <li className="flex items-start gap-3">
                <div className="bg-green-500/10 text-green-400 p-1.5 rounded border border-green-500/20 shrink-0">
                  <Check className="w-3.5 h-3.5 text-green-500" />
                </div>
                <div>
                  <strong className="text-white text-xs font-mono block">1. Study Syllabus</strong>
                  <span className="text-[10.5px] text-zinc-400">Review required techniques, analogs, and commands.</span>
                </div>
              </li>

              {/* Step 2: Pass Assessment */}
              <li className="flex items-start gap-3">
                <div className={`p-1.5 rounded border shrink-0 ${
                  levelPassedQuiz 
                    ? "bg-green-500/10 border-green-500/20 text-green-400" 
                    : "bg-zinc-950 border-zinc-800 text-zinc-500"
                }`}>
                  {levelPassedQuiz ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <HelpCircle className="w-3.5 h-3.5" />
                  )}
                </div>
                <div>
                  <strong className="text-white text-xs font-mono block">2. Assessment Exam</strong>
                  <span className="text-[10.5px] text-zinc-400">
                    {levelPassedQuiz 
                      ? "Score card verified (Passed)" 
                      : "Complete the 50-question test with ≥70% score."}
                  </span>
                </div>
              </li>

              {/* Step 3: Complete Simulation */}
              <li className="flex items-start gap-3">
                <div className={`p-1.5 rounded border shrink-0 ${
                  simCompleted 
                    ? "bg-green-500/10 border-green-500/20 text-green-400" 
                    : "bg-zinc-950 border-zinc-800 text-zinc-500"
                }`}>
                  {simCompleted ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Terminal className="w-3.5 h-3.5" />
                  )}
                </div>
                <div>
                  <strong className="text-white text-xs font-mono block">3. Resolve Simulation</strong>
                  <span className="text-[10.5px] text-zinc-400">
                    {simCompleted 
                      ? "Vulnerability simulation resolved." 
                      : "Execute injection shell codes inside simulation tab."}
                  </span>
                </div>
              </li>
            </ul>

            {/* Real world note */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-3.5 mt-5">
              <div className="flex items-start gap-2 text-[10px] leading-relaxed text-zinc-400 font-mono">
                <Info className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-200 block mb-0.5">Real-World Note:</strong>
                  If you ethically probe this app via legal channels (Bug Bounty programs) with certified consent, you do NOT need to present evidence here. Simply complete the simulator to progress.
                </div>
              </div>
            </div>

            {/* Complete level trigger */}
            <div className="mt-5 pt-4 border-t border-zinc-800">
              <button
                id="btn-workspace-complete"
                disabled={!simCompleted && !isLevelCompleted}
                onClick={handleCompleteLevel}
                className={`w-full py-3 rounded-lg font-mono font-bold text-xs flex items-center justify-center gap-2 transition ${
                  simCompleted || isLevelCompleted
                    ? "bg-green-500 hover:bg-green-600 text-black shadow-[0_0_20px_rgba(0,200,83,0.2)]"
                    : "bg-zinc-950 border border-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                <Award className="w-4 h-4" />
                {isLevelCompleted ? "Level Completed (Re-Complete)" : "Mark Level as Completed"}
              </button>
              <p className="text-[9px] text-center text-zinc-500 mt-2 font-mono">
                Earn +500 XP and unlock the next roadmap milestone!
              </p>
            </div>

          </div>

          {/* Research notes library catalog side list */}
          {notes.length > 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 mb-3">
                Saved Notes Journal
              </h4>
              <div className="space-y-3.5 max-h-56 overflow-y-auto">
                {notes.map((n) => (
                  <div key={n.id} className="border-l-2 border-green-500 pl-3 py-1 text-xs">
                    <strong className="text-white block font-mono leading-tight">{n.title}</strong>
                    <span className="text-[10px] text-zinc-500 font-mono">Lvl {n.levelId} • {n.createdAt}</span>
                    <p className="text-zinc-400 line-clamp-2 mt-1">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
