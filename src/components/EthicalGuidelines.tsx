/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, ShieldAlert, Scale, CheckCircle, AlertTriangle } from "lucide-react";

export default function EthicalGuidelines() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-zinc-300 font-sans">
      {/* Hero Banner Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8 relative overflow-hidden shadow-[0_0_30px_rgba(0,200,83,0.05)]">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-[0.03]">
          <ShieldCheck className="w-96 h-96 text-green-500" />
        </div>
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-mono font-bold text-white mb-2">
              The Ethical Guard & White Hat Code of Conduct
            </h1>
            <p className="text-sm text-zinc-400">
              Ethical hacking, also known as penetration testing, is the practice of probing systems for vulnerabilities with explicit, written authorization from the system owners. In this space, trust and adherence to legal frameworks are absolute.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        
        {/* Core Principles */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6">
          <h2 className="text-lg font-mono font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" /> Core Principles
          </h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs font-mono mt-0.5">1</span>
              <div>
                <strong className="text-white block">Prior Authorization</strong>
                Never, under any circumstances, probe, scan, or attack a system or network without explicit, written, and signed legal consent from the authorized decision makers.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs font-mono mt-0.5">2</span>
              <div>
                <strong className="text-white block">Respect Privacy & Data</strong>
                If during an audit you stumble upon highly confidential personal information (PII), proprietary business records, or user credentials, cease enumeration in that area and report it immediately. Do not copy, download, or share it.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs font-mono mt-0.5">3</span>
              <div>
                <strong className="text-white block">Maintain System Integrity</strong>
                Avoid destructive testing (like Denial of Service, formatting drives, deleting configs) unless explicitly requested in the Scope of Work. Leave systems exactly as you found them.
              </div>
            </li>
          </ul>
        </div>

        {/* Legal Boundaries */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6">
          <h2 className="text-lg font-mono font-bold text-white mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-red-500" /> Legal Frameworks & Acts
          </h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">CFAA (Computer Fraud and Abuse Act)</strong>
                In the United States, accessing a computer system 'without authorization' or 'exceeding authorized access' is a federal offense that carries steep fines and prison terms, regardless of whether you had 'good intentions'.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Computer Misuse Act 1990 (UK)</strong>
                In the United Kingdom, unauthorized access to computer material, unauthorized access with intent to commit further offenses, or unauthorized acts causing damage carry severe custodial sentences.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Safe Harbor & Bug Bounties</strong>
                Many companies publish official 'Vulnerability Disclosure Policies' (VDP). Probing these systems is safe ONLY if you comply strictly with their stated guidelines, domains in scope, and disclosure clauses.
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Code of Ethics Alert */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-8 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
        <div>
          <h3 className="text-md font-mono font-bold text-white mb-1">IMPORTANT SECURITY NOTE</h3>
          <p className="text-sm text-zinc-400">
            HackRoad does not collect, record, or verify proofs of physical hacking against the target apps listed in our roadmap. All levels contain simulated virtual environments. If you perform physical testing on real applications, you must do so ONLY through their official bug bounty channels (such as HackerOne or Bugcrowd) and under safe harbor.
          </p>
        </div>
      </div>

      {/* Educational Dedication */}
      <div className="text-center py-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 font-mono">
          "The greatest defense is a profound understanding of offense." - HackRoad Syllabus
        </p>
      </div>
    </div>
  );
}
