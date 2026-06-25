/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Level, Difficulty, Phase, SimulationConfig } from "../types";

// Helper lists of real-world apps to distribute across our 100 progressive levels
const APPS_BEGINNER = [
  { name: "MyLocalShell", desc: "A custom localized Linux virtual machine." },
  { name: "PersonalPortfolio", desc: "A developer's public HTML website." },
  { name: "StaticBlog", desc: "A simple Markdown-based static blogging site." },
  { name: "QuickCalc", desc: "A basic client-side JavaScript calculator app." },
  { name: "HackerGuestbook", desc: "An open, unmoderated visitor greeting page." },
  { name: "SchoolPortal", desc: "A mock educational student grade query board." },
  { name: "RetroForum", desc: "A classic phpBB-style bulletin board discussion app." },
  { name: "LocalEStore", desc: "A mock shopping cart hosting static products." },
  { name: "SimpleChat", desc: "An unencrypted instant messenger socket server." },
  { name: "LibrarySys", desc: "A local public library catalogue query system." }
];

const APPS_INTERMEDIATE = [
  { name: "Wikipedia API", desc: "The public querying endpoint for the online encyclopedia." },
  { name: "Discord Webhook", desc: "A team messaging server endpoint that handles chat hooks." },
  { name: "Reddit Forums", desc: "A massive public community aggregation board with comment fields." },
  { name: "Zoom Web Gateway", desc: "The portal managing web-based conference call connections." },
  { name: "WordPress CMS", desc: "A widely-used content management site with plugin extensions." },
  { name: "Trello Boards", desc: "A kanban-style project collaboration tool with ticket cards." },
  { name: "Spotify Web player", desc: "An audio streaming app loaded with play list queries." },
  { name: "Airbnb Bookings", desc: "A residential lodging booking platform with reservation IDs." },
  { name: "Shopify Checkout", desc: "An e-commerce purchase portal verifying shopping carts." },
  { name: "Uber Ride Router", desc: "A ride-sharing system managing trip coordination details." },
  { name: "Medium Publishers", desc: "A publishing site hosting thousands of customized domains." },
  { name: "Pinterest Board", desc: "An image bookmarking portal allowing user image uploads." },
  { name: "WhatsApp Gateway", desc: "A messaging API routing text payloads between nodes." },
  { name: "Telegram Bot API", desc: "An interactive command webhook server for chat automation." }
];

const APPS_ADVANCED = [
  { name: "GitHub Repository", desc: "A hosted Git code management hub containing public/private code." },
  { name: "Dropbox Storage", desc: "A cloud-based file synchronization and storage service." },
  { name: "Slack Workspaces", desc: "An enterprise-grade team communications application." },
  { name: "AWS Console Portal", desc: "The web GUI governing cloud server and cluster allocations." },
  { name: "Heroku App Engine", desc: "A platform-as-a-service supporting dynamic node deployments." },
  { name: "Docker Hub Registry", desc: "A registry service hosting thousands of compiled container images." },
  { name: "Jenkins Build Server", desc: "A continuous integration deployment server running build scripts." },
  { name: "Kubernetes Dashboard", desc: "An administrative visualizer managing container scaling." },
  { name: "NPM Registry Hub", desc: "A package publishing library feeding developers dependencies." },
  { name: "Apex Banking App", desc: "An Android-based banking platform storing client card details." },
  { name: "Apple Wallet Core", desc: "An iOS payment management app verifying electronic cards." },
  { name: "Tesla Connected Car", desc: "An API dashboard regulating telemetry and lock statuses." }
];

const APPS_EXPERT = [
  { name: "Google Search Engine", desc: "The indexer query system processing global search strings." },
  { name: "Facebook Profiles", desc: "A massive social graph tracking user credentials and posts." },
  { name: "Stripe Payment API", desc: "A payment processor auditing credit cards and merchant payouts." },
  { name: "PayPal Sandbox", desc: "A transaction sandbox simulating wire and checkout payments." },
  { name: "Salesforce CRM", desc: "An enterprise sales database managing massive company lists." },
  { name: "Netflix Stream Engine", desc: "A high-performance media server serving video bitstreams." },
  { name: "Microsoft Azure Core", desc: "A virtualization engine managing enterprise directories." },
  { name: "Cloudflare DNS Gateway", desc: "A global caching network shielding sites from DDoS attempts." },
  { name: "Pentagon Portal (Simulated)", desc: "A highly secure gateway regulating military directory assets." },
  { name: "SpaceX Launch Systems", desc: "An API managing rocket stage metrics and telemetry parameters." }
];

// Topics pool mapped by difficulty
const TOPICS_BEGINNER = ["linux_foundations", "networking_basics"];
const TOPICS_INTERMEDIATE = ["reconnaissance", "scanning_enumeration", "owasp_sqlmap", "owasp_xss", "owasp_csrf", "owasp_idor", "auth_bypass"];
const TOPICS_ADVANCED = ["reverse_engineering", "cloud_security", "mobile_hacking"];
const TOPICS_EXPERT = ["linux_foundations", "networking_basics", "reconnaissance", "scanning_enumeration", "owasp_sqlmap", "owasp_xss", "owasp_csrf", "owasp_idor", "auth_bypass", "reverse_engineering", "cloud_security", "mobile_hacking"];

// Programmatic Level List builder to output exactly 100 fully detailed levels
function buildLevels(): Level[] {
  const levelsList: Level[] = [];

  for (let id = 1; id <= 100; id++) {
    // Determine difficulty, phase, and topic mappings based on level number
    let difficulty: Difficulty;
    let phase: Phase;
    let topics: string[];
    let appInfo: { name: string; desc: string };

    if (id <= 25) {
      difficulty = Difficulty.Beginner;
      phase = Phase.BeginnerFoundations;
      topics = [...TOPICS_BEGINNER];
      appInfo = APPS_BEGINNER[(id - 1) % APPS_BEGINNER.length];
    } else if (id <= 55) {
      difficulty = Difficulty.Intermediate;
      phase = Phase.IntermediateWebNetwork;
      // Stagger topics so users learn one or two at a time
      const index = (id - 26) % TOPICS_INTERMEDIATE.length;
      topics = [TOPICS_INTERMEDIATE[index], "reconnaissance"];
      appInfo = APPS_INTERMEDIATE[(id - 26) % APPS_INTERMEDIATE.length];
    } else if (id <= 85) {
      difficulty = Difficulty.Advanced;
      phase = Phase.AdvancedExploitation;
      const index = (id - 56) % TOPICS_ADVANCED.length;
      topics = [TOPICS_ADVANCED[index], "scanning_enumeration"];
      appInfo = APPS_ADVANCED[(id - 56) % APPS_ADVANCED.length];
    } else {
      difficulty = Difficulty.Expert;
      phase = Phase.ExpertRedTeaming;
      topics = [...TOPICS_EXPERT];
      appInfo = APPS_EXPERT[(id - 86) % APPS_EXPERT.length];
    }

    // Handcraft titles for milestones, and procedurally generate distinct names for intermediate ones
    let title = "";
    if (id === 1) title = "Linux Terminal Basics & File Exploration";
    else if (id === 2) title = "Introduction to Packet Diagnostics & ICMP";
    else if (id === 25) title = "Hacking Foundations Capstone Challenge";
    else if (id === 26) title = "Active Reconnaissance with Nmap SYN Scans";
    else if (id === 30) title = "Exploiting SQL Injection (SQLi) with SQLmap";
    else if (id === 40) title = "Insecure Direct Object Reference (IDOR) Testing";
    else if (id === 55) title = "Intermediate Web Pen-Testing Capstone";
    else if (id === 56) title = "Debugging Assemblies & Buffer Overflows";
    else if (id === 70) title = "SSRF Exploits against Cloud Metadata Engines";
    else if (id === 80) title = "Mobile App Frida Scripting & Hooking";
    else if (id === 85) title = "Advanced Binary Exploitation Capstone";
    else if (id === 86) title = "Active Directory Enumeration & Kerberoasting";
    else if (id === 100) title = "Ultimate Ethical Hacking Master Mastery Project";
    else {
      // Procedural title based on primary topic
      const cleanTopic = topics[0].replace("_", " ");
      const capitalizedTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1);
      title = `${capitalizedTopic} Assessment on ${appInfo.name}`;
    }

    // Target app naming
    const targetAppName = id === 1 ? "Local Linux VM" : `${appInfo.name} (v${id}.1.${id * 2})`;
    const targetAppDesc = id === 1 ? "A standard sandbox environment setup to practice terminal commands." : `A simulation environment representing security tests against ${appInfo.name} endpoints. ${appInfo.desc}`;
    const appStoreSearch = appInfo.name.replace(" API", "").replace(" Webhook", "").replace(" Gateway", "").replace(" Forums", "").replace(" Boards", "").replace(" player", "").replace(" Bookings", "").replace(" Checkout", "").replace(" Ride Router", "").replace(" Publishers", "").replace(" Board", "").replace(" Repository", "").replace(" Storage", "").replace(" Workspaces", "").replace(" Portal", "").replace(" App Engine", "").replace(" Registry", "").replace(" Build Server", "").replace(" Dashboard", "").replace(" Hub", "").replace(" App", "").replace(" Core", "").replace(" Car", "").replace(" Engine", "").replace(" Profiles", "").replace(" Payment API", "").replace(" Sandbox", "").replace(" CRM", "").replace(" Server", "").replace(" Gateway", "").replace(" Systems", "");

    // Generate step-by-step interactive command simulation based on level type
    const simulation = compileSimulation(id, topics[0], targetAppName);

    levelsList.push({
      id,
      title,
      difficulty,
      phase,
      targetApp: targetAppName,
      targetAppDescription: targetAppDesc,
      appStoreSearchTerm: appStoreSearch,
      topics,
      simulation,
    });
  }

  return levelsList;
}

// Generates an interactive Terminal Hacking Simulation matching the level topic
function compileSimulation(levelId: number, primaryTopic: string, appName: string): SimulationConfig {
  const targetHost = `target-${appName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.sec`;
  
  if (primaryTopic === "linux_foundations") {
    return {
      welcomeMessage: `HACKROAD TERM-V1.0 - OFFLINE PRACTICE SANDBOX\nTarget Machine: ${targetHost}\nYour Task: Explore the local directories, check configurations, and find the admin pass flag.\nType 'help' to list available local tools or commands.`,
      targetIpOrDomain: targetHost,
      steps: [
        {
          id: "step-1",
          instruction: "List all contents in the current directory, including hidden parameters, using 'ls -la'.",
          hint: "Type the exact command: 'ls -la'",
          expectedCommand: "ls -la",
          expectedOutput: "total 16\ndrwxr-xr-x 2 root root 4096 Jun 25 12:00 .\ndrwxr-xr-x 4 root root 4096 Jun 25 12:00 ..\n-rw-r--r-- 1 root root  124 Jun 25 12:00 .secret_config\n-rw-r--r-- 1 root root   45 Jun 25 12:00 notes.txt"
        },
        {
          id: "step-2",
          instruction: "Display the contents of the hidden file '.secret_config' using 'cat'.",
          hint: "Use 'cat .secret_config' to inspect the hidden config file.",
          expectedCommand: "cat .secret_config",
          expectedOutput: "=== LOCAL SHELL CONFIGURATION ===\nADMIN_PASSWORD_HASH = '$2b$12$K89sR91m829AjsHq921as'\nFLAG_TOKEN = 'FLAG{L1NUX_T3RM1N4L_H4CK_SUCC3SS}'\n================================="
        },
        {
          id: "step-3",
          instruction: "Locate active SUID files on the server using 'find / -perm -4000 -type f 2>/dev/null' to check for privilege escalation options.",
          hint: "Copy and run: 'find / -perm -4000 -type f 2>/dev/null'",
          expectedCommand: "find / -perm -4000 -type f 2>/dev/null",
          expectedOutput: "/bin/ping\n/usr/bin/passwd\n/usr/local/bin/custom_backup (SUID DETECTED!)"
        }
      ]
    };
  }

  if (primaryTopic === "networking_basics") {
    return {
      welcomeMessage: `NETWORK ANALYTICS ENGINE\nTarget Server: ${targetHost} (10.10.12.8)\nTask: Diagnose network connectivity and analyze listening TCP sockets.`,
      targetIpOrDomain: "10.10.12.8",
      steps: [
        {
          id: "net-1",
          instruction: "Verify network connectivity by sending 3 ping packets to the target IP using 'ping -c 3 10.10.12.8'.",
          hint: "Type: 'ping -c 3 10.10.12.8'",
          expectedCommand: "ping -c 3 10.10.12.8",
          expectedOutput: "PING 10.10.12.8 (10.10.12.8) 56(84) bytes of data.\n64 bytes from 10.10.12.8: icmp_seq=1 ttl=64 time=0.45 ms\n64 bytes from 10.10.12.8: icmp_seq=2 ttl=64 time=0.48 ms\n64 bytes from 10.10.12.8: icmp_seq=3 ttl=64 time=0.41 ms\n--- 10.10.12.8 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2012ms"
        },
        {
          id: "net-2",
          instruction: "Lookup DNS A records for the host domain using 'dig +short target.com'.",
          hint: "Type: 'dig +short target.com'",
          expectedCommand: "dig +short target.com",
          expectedOutput: "10.10.12.8"
        },
        {
          id: "net-3",
          instruction: "Inspect active open listening ports using 'netstat -tulnp' to see what ports are listening.",
          hint: "Type: 'netstat -tulnp'",
          expectedCommand: "netstat -tulnp",
          expectedOutput: "Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      824/sshd\ntcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      901/nginx\ntcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN      1014/mysqld"
        }
      ]
    };
  }

  if (primaryTopic === "scanning_enumeration") {
    return {
      welcomeMessage: `RECONNAISSANCE SCANNER v4.2\nTarget: ${targetHost}\nIdentify open network pathways and discover hidden web administrative paths.`,
      targetIpOrDomain: targetHost,
      steps: [
        {
          id: "scan-1",
          instruction: "Execute a detailed Nmap service scan with version detection (-sV) and OS detection (-O) on the target host.",
          hint: "Type: 'nmap -sV -O " + targetHost + "'",
          expectedCommand: `nmap -sV -O ${targetHost}`,
          expectedOutput: `Starting Nmap 7.92 ( https://nmap.org )\nNmap scan report for ${targetHost}\nPORT    STATE SERVICE  VERSION\n22/tcp  open  ssh      OpenSSH 8.2p1 (Ubuntu)\n80/tcp  open  http     Apache httpd 2.4.41\n443/tcp open  ssl/http Apache httpd 2.4.41\nOS details: Linux 5.4 - 5.10\nService Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`
        },
        {
          id: "scan-2",
          instruction: "Use Gobuster to search for hidden directories using a standard wordlist: 'gobuster dir -u http://" + targetHost + "/ -w common.txt'.",
          hint: "Type: 'gobuster dir -u http://" + targetHost + "/ -w common.txt'",
          expectedCommand: `gobuster dir -u http://${targetHost}/ -w common.txt`,
          expectedOutput: `===============================================================\nGobuster v3.1.0\n===============================================================\n[+] Url:                     http://${targetHost}/\n[+] Wordlist:                common.txt\n===============================================================\n/index.html          (Status: 200) [Size: 1045]\n/assets              (Status: 301) [Size: 312]\n/admin               (Status: 401) [Size: 182] (ADMIN PORTAL FOUND!)\n/db-backup.sql       (Status: 200) [Size: 52409] (LEAKED DATA!)`
        }
      ]
    };
  }

  if (primaryTopic === "owasp_sqlmap") {
    return {
      welcomeMessage: `AUTOMATED PEN-TESTING AGENT: SQLMAP CORE\nTarget Endpoint: http://${targetHost}/item.php?id=12\nTask: Verify SQL Injection parameter vulnerability and extract system databases.`,
      targetIpOrDomain: `http://${targetHost}/item.php?id=12`,
      steps: [
        {
          id: "sql-1",
          instruction: "Test the 'id' parameter for SQL Injection and enumerate available databases using '--dbs'.",
          hint: "Type: 'sqlmap -u \"http://" + targetHost + "/item.php?id=12\" --dbs'",
          expectedCommand: `sqlmap -u "http://${targetHost}/item.php?id=12" --dbs`,
          expectedOutput: `[+] GET parameter 'id' is vulnerable! Type: boolean-based blind, error-based, UNION query.\n[+] available databases [3]:\n(*) information_schema\n(*) client_db\n(*) production_secrets`
        },
        {
          id: "sql-2",
          instruction: "List all tables inside the 'production_secrets' database using '--tables' parameter.",
          hint: "Type: 'sqlmap -u \"http://" + targetHost + "/item.php?id=12\" -D production_secrets --tables'",
          expectedCommand: `sqlmap -u "http://${targetHost}/item.php?id=12" -D production_secrets --tables`,
          expectedOutput: `[+] Database: production_secrets\n[+] Tables [2]:\n| admin_credentials |\n| system_settings   |`
        },
        {
          id: "sql-3",
          instruction: "Dump the data from 'admin_credentials' table to extract passwords using '--dump'.",
          hint: "Type: 'sqlmap -u \"http://" + targetHost + "/item.php?id=12\" -D production_secrets -T admin_credentials --dump'",
          expectedCommand: `sqlmap -u "http://${targetHost}/item.php?id=12" -D production_secrets -T admin_credentials --dump`,
          expectedOutput: `[+] Database: production_secrets\n[+] Table: admin_credentials\n+----+---------+----------------------------------+\n| id | user    | password_hash                    |\n+----+---------+----------------------------------+\n| 1  | admin   | 21232f297a57a5a743894a0e4a801fc3 |\n+----+---------+----------------------------------+\n[+] Hash decodes to MD5: 'admin123' (WEAK PASSWORD EXPOSED!)`
        }
      ]
    };
  }

  // Fallback / default simulation configuration for other security subjects (XSS, CSRF, IDOR, mobile, cloud)
  return {
    welcomeMessage: `HACKROAD SECURE INTERCONNECT - SIMULATION LAB v${levelId}\nTarget Asset: ${appName}\nPractice testing and security validation scripts.`,
    targetIpOrDomain: targetHost,
    steps: [
      {
        id: "gen-1",
        instruction: `Deploy reconnaissance probes to evaluate ${appName} security rules. Type: 'test-port -v http://${targetHost}'`,
        hint: `Type: 'test-port -v http://${targetHost}'`,
        expectedCommand: `test-port -v http://${targetHost}`,
        expectedOutput: `[*] Connecting to http://${targetHost}...\n[+] Port 80, 443 active.\n[*] Auditing HTTP headers...\n[-] CSP Header: Missing!\n[-] X-Frame-Options: Missing!\n[+] Target is vulnerable to intercept and framing attacks.`
      },
      {
        id: "gen-2",
        instruction: `Run the verification exploit payload to trigger the educational simulation flag. Type: 'verify-exploit --target ${targetHost}'`,
        hint: `Type: 'verify-exploit --target ${targetHost}'`,
        expectedCommand: `verify-exploit --target ${targetHost}`,
        expectedOutput: `[+] Launching security validation exploit against ${appName}...\n[+] Payload executed successfully!\n[+] Security alert triggered: Simulated vulnerability successfully resolved.\n[+] FLAG: FLAG{HACK_ROAD_LVL_${levelId}_COMPLETED}`
      }
    ]
  };
}

export const LEVELS = buildLevels();

export function getLevelById(id: number): Level | undefined {
  return LEVELS.find(l => l.id === id);
}
