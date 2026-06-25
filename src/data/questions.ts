/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from "../types";

// A rich repository of handcrafted core security questions grouped by topic category
export const MASTER_QUESTIONS: Record<string, Omit<Question, "id">[]> = {
  linux_foundations: [
    {
      text: "Which command lists all files in a Linux directory, including hidden files, along with their detailed permissions and ownership?",
      options: ["ls -la", "ls -l", "dir -h", "ls -a"],
      correctIndex: 0,
      explanation: "The 'ls' command lists directory contents. The '-l' flag specifies a long list format showing permissions and ownership, while '-a' includes hidden files (files starting with a dot).",
      topicId: "linux_foundations"
    },
    {
      text: "What does the permission 'rwxr-xr--' represent in octal notation?",
      options: ["755", "754", "644", "750"],
      correctIndex: 1,
      explanation: "In Linux, read (r)=4, write (w)=2, and execute (x)=1. 'rwx' is 4+2+1=7. 'r-x' is 4+0+1=5. 'r--' is 4+0+0=4. Thus, rwxr-xr-- is 754.",
      topicId: "linux_foundations"
    },
    {
      text: "What is the primary security risk of an SUID (Set Owner User ID) binary configured on a system file?",
      options: [
        "It allows any user to modify the file ownership.",
        "It executes the binary with the privileges of the file owner (often root), potentially allowing privilege escalation if vulnerable.",
        "It makes the system vulnerable to network port scanning.",
        "It encrypts the target binary using weak symmetric keys."
      ],
      correctIndex: 1,
      explanation: "SUID binaries run with the permissions of the file owner rather than the user executing them. If a binary owned by 'root' has the SUID bit set and contains vulnerabilities (like buffer overflows or command injection), any unprivileged user can exploit it to execute commands as root.",
      topicId: "linux_foundations"
    },
    {
      text: "Which directory in the Linux Filesystem Hierarchy contains system configuration files, such as host files, network settings, and user password configs?",
      options: ["/bin", "/var", "/etc", "/usr"],
      correctIndex: 2,
      explanation: "The '/etc' directory is reserved for system-wide configuration files in Linux. Binary executables are in '/bin' or '/sbin', dynamic logging data in '/var', and user programs in '/usr'.",
      topicId: "linux_foundations"
    }
  ],
  networking_basics: [
    {
      text: "What are the three packets transmitted during a standard TCP 3-way handshake connection establishment?",
      options: ["SYN, ACK, FIN", "SYN, SYN-ACK, ACK", "RST, SYN, ACK", "SYN, PSH, ACK"],
      correctIndex: 1,
      explanation: "The connection starts with the client sending a SYN (Synchronize). The server responds with SYN-ACK (Synchronize-Acknowledge), and the client finishes with an ACK (Acknowledge) packet.",
      topicId: "networking_basics"
    },
    {
      text: "Which of the following ports is typically used by the Secure Shell (SSH) protocol for encrypted remote administration?",
      options: ["Port 21", "Port 22", "Port 23", "Port 80"],
      correctIndex: 1,
      explanation: "SSH uses Port 22. Port 21 is FTP, Port 23 is Telnet (unencrypted), and Port 80 is HTTP.",
      topicId: "networking_basics"
    },
    {
      text: "What is the primary difference between TCP and UDP protocols?",
      options: [
        "TCP is faster, while UDP is connection-oriented.",
        "TCP operates at the Network Layer, while UDP operates at the Transport Layer.",
        "TCP guarantees delivery of packets via handshakes and sequence checks; UDP is connectionless and does not guarantee delivery.",
        "TCP is used strictly for local networks; UDP is used exclusively on the public internet."
      ],
      correctIndex: 2,
      explanation: "TCP (Transmission Control Protocol) is connection-oriented and ensures reliable delivery. UDP (User Datagram Protocol) is stateless, sending packets immediately without establishing a connection or confirming delivery, which makes it faster but less reliable.",
      topicId: "networking_basics"
    },
    {
      text: "What role does DNS (Domain Name System) play in computer networks?",
      options: [
        "It encrypts web traffic using SSL/TLS.",
        "It translates human-readable domain names into machine-readable IP addresses.",
        "It filters incoming network traffic based on firewall rules.",
        "It routes physical packets across Layer 2 switches."
      ],
      correctIndex: 1,
      explanation: "DNS functions as the phone book of the internet, resolving domain names (like google.com) into physical IP addresses (like 142.250.190.46) so browsers can load internet resources.",
      topicId: "networking_basics"
    }
  ],
  reconnaissance: [
    {
      text: "What is the fundamental difference between passive and active reconnaissance?",
      options: [
        "Passive recon involves direct interaction with the target servers; active recon does not.",
        "Passive recon gathers intelligence from public databases and third-party resources without direct targeting; active recon interacts directly with target assets.",
        "Passive recon requires administrative clearance; active recon is done entirely illegally.",
        "Passive recon uses command-line tools; active recon is performed using only web browsers."
      ],
      correctIndex: 1,
      explanation: "Passive recon leverages public sources (WHOIS, Shodan, Google, DNS) and never sends packets directly to the victim's host, making it undetectable. Active recon directly probes the target (e.g., via port scans) and can be logged by firewalls and IDSs.",
      topicId: "reconnaissance"
    },
    {
      text: "What search query prefix is used in Google Dorking to find specific file types (such as backups or PDFs) hosted on a target domain?",
      options: ["domain:", "typefile:", "filetype:", "exttype:"],
      correctIndex: 2,
      explanation: "In Google Dorking, the 'filetype:' (or 'ext:') operator instructs the search engine to restrict search results to files of a specific extension, such as 'filetype:sql' or 'filetype:conf'.",
      topicId: "reconnaissance"
    },
    {
      text: "What is Shodan primarily used for in ethical hacking?",
      options: [
        "Brute-forcing password hashes.",
        "Searching for internet-connected IoT devices, web servers, and exposed services globally.",
        "Decompiling Android mobile applications.",
        "Monitoring wireless packet handshakes."
      ],
      correctIndex: 1,
      explanation: "Shodan is a search engine designed to scan the entire internet continuously, cataloging open ports, banners, and connected devices (routers, servers, smart cameras, industrial systems), helping hackers find exposed public systems.",
      topicId: "reconnaissance"
    }
  ],
  scanning_enumeration: [
    {
      text: "Why is an Nmap SYN Scan (-sS) often referred to as a 'stealth' or 'half-open' scan?",
      options: [
        "It encrypts the packets sent over the wire.",
        "It does not complete the full TCP 3-way handshake, preventing a formal connection log from being recorded on legacy applications.",
        "It runs entirely in background mode on the local machine.",
        "It changes the MAC address of the host continuously."
      ],
      correctIndex: 1,
      explanation: "In a SYN scan, Nmap sends a SYN packet and waits for a SYN-ACK response. If received, Nmap sends a RST (Reset) packet immediately rather than the final ACK. This prevents a full TCP connection from being completed, which historically bypassed standard application logging.",
      topicId: "scanning_enumeration"
    },
    {
      text: "Which flag is used in Nmap to enable service version detection of open ports?",
      options: ["-sS", "-sV", "-O", "-A"],
      correctIndex: 1,
      explanation: "The '-sV' flag in Nmap instructs the scanner to probe open ports to determine the service name and exact version number. '-sS' is SYN scan, '-O' is OS detection, and '-A' enables aggressive scanning (including OS, version, script, and traceroute).",
      topicId: "scanning_enumeration"
    }
  ],
  owasp_sqlmap: [
    {
      text: "What is the root cause of SQL Injection (SQLi) vulnerabilities in web applications?",
      options: [
        "Running outdated database servers like MySQL 5.5.",
        "Concatenating raw user inputs directly into SQL command strings instead of using prepared statements or parameterized queries.",
        "Allowing public internet traffic on Port 3306 (MySQL).",
        "Using weak passwords for the database admin user."
      ],
      correctIndex: 1,
      explanation: "SQL Injection occurs when user-supplied inputs are combined directly with SQL code as a single string. The database engine executes the user input as code rather than pure data. Prepared statements isolate user data from the SQL commands, eliminating the vulnerability.",
      topicId: "owasp_sqlmap"
    },
    {
      text: "How does an SQLmap query with '--dump' behave when targeting an vulnerable parameter?",
      options: [
        "It wipes out the database completely.",
        "It downloads the tables' data and exports them into a readable text format for analysis.",
        "It uploads a reverse web shell onto the target server.",
        "It launches a Distributed Denial of Service (DDoS) attack."
      ],
      correctIndex: 1,
      explanation: "The '--dump' flag in SQLmap extracts and retrieves the underlying rows and columns of database tables, storing them locally on the tester's machine as a report.",
      topicId: "owasp_sqlmap"
    }
  ],
  owasp_xss: [
    {
      text: "Which type of Cross-Site Scripting (XSS) is saved directly onto the server database and executes whenever any user loads the affected page?",
      options: ["Reflected XSS", "DOM-based XSS", "Stored (Persistent) XSS", "Blind XSS"],
      correctIndex: 2,
      explanation: "Stored XSS is persistent because the malicious payload is stored permanently on the target server (e.g., in a forum post or user profile). Whenever other users visit the page, the payload is retrieved and executed by their browsers.",
      topicId: "owasp_xss"
    },
    {
      text: "What is the best browser security flag configured on cookies to prevent attackers from reading them via client-side JavaScript (XSS)?",
      options: ["Secure", "SameSite=Strict", "HttpOnly", "Path=/"],
      correctIndex: 2,
      explanation: "The 'HttpOnly' flag prevents client-side scripts (JavaScript) from accessing the cookie via `document.cookie`. This prevents session hijacking during an XSS attack because the script cannot steal the session cookie.",
      topicId: "owasp_xss"
    }
  ],
  owasp_csrf: [
    {
      text: "In a Cross-Site Request Forgery (CSRF) attack, which browser property does the attacker exploit?",
      options: [
        "The browser's ability to run Javascript loops.",
        "The automatic attachment of session cookies to outbound HTTP requests destined for a domain the user is logged into.",
        "The browser's local sandbox storage capacity.",
        "The browser's cached DNS records."
      ],
      correctIndex: 1,
      explanation: "Browsers automatically send domain-specific cookies along with any HTTP request made to that domain, even if the request originates from a malicious site. CSRF exploits this behavior to submit requests under the victim's identity.",
      topicId: "owasp_csrf"
    }
  ],
  owasp_idor: [
    {
      text: "What is an Insecure Direct Object Reference (IDOR) vulnerability?",
      options: [
        "An open redirect that forwards users to unsafe websites.",
        "Accessing administrative panels using default credentials.",
        "Accessing internal records or files by modifying key parameters (like IDs) in requests because of missing authorization checks.",
        "Triggering a buffer overflow by sending large payload headers."
      ],
      correctIndex: 2,
      explanation: "IDOR occurs when an app refers to internal database keys directly in user-facing parameters (e.g., `/user?id=12`), and fails to perform proper authorization checks. Changing the 'id' parameter allows users to access resources they do not own.",
      topicId: "owasp_idor"
    }
  ],
  auth_bypass: [
    {
      text: "How does JWT Signature Bypassing (using the 'none' algorithm) occur?",
      options: [
        "By encrypting the JWT with an outdated AES key.",
        "By modifying the JWT header to specify the 'alg' claim as 'none', which some poorly configured libraries accept as valid without verifying any signature.",
        "By brute-forcing the HMAC-SHA256 signature using a dictionary.",
        "By using proxy filters like Burp Suite to change the local cookie expire timestamps."
      ],
      correctIndex: 1,
      explanation: "In JWT structures, the 'alg' header claim defines the cryptographic algorithm used to sign the token. Some flawed libraries processed tokens where 'alg' was set to 'none', accepting them as verified without any cryptographic signature, allowing an attacker to modify user data freely.",
      topicId: "auth_bypass"
    }
  ],
  reverse_engineering: [
    {
      text: "In x86 assembly language, which register acts as the Instruction Pointer, holding the address of the next command to execute?",
      options: ["EAX", "ESP", "EBP", "EIP"],
      correctIndex: 3,
      explanation: "The EIP (Instruction Pointer) register in 32-bit x86 architecture (RIP in 64-bit x64) holds the memory address of the next command to be executed. Overwriting this register is the primary goal of control-flow hijack exploits like buffer overflows.",
      topicId: "reverse_engineering"
    }
  ],
  cloud_security: [
    {
      text: "Which IP address is reserved globally for retrieving Instance Metadata (such as IAM role credentials) on AWS, Azure, and GCP cloud servers?",
      options: ["192.168.1.1", "127.0.0.1", "169.254.169.254", "10.0.0.1"],
      correctIndex: 2,
      explanation: "The link-local IP '169.254.169.254' is the designated Cloud Metadata Endpoint. If a server is vulnerable to Server-Side Request Forgery (SSRF), an attacker can trigger the server to fetch credentials from this URL and return them.",
      topicId: "cloud_security"
    }
  ],
  mobile_hacking: [
    {
      text: "What is Frida used for in mobile application penetration testing?",
      options: [
        "Signing APK files before uploading them to the Google Play Store.",
        "Dynamic instrumentation, allowing testers to inject custom scripts and hook into active Java or Objective-C functions at runtime.",
        "Cracking WPA2 Wi-Fi handshakes.",
        "Running vulnerability scans against remote APIs."
      ],
      correctIndex: 1,
      explanation: "Frida is a dynamic code instrumentation toolkit. It allows security researchers to inject custom snippets of JavaScript into native processes on Android, iOS, Windows, and Linux to hook API methods, dump memory, or bypass security checks like root/jailbreak checks dynamically.",
      topicId: "mobile_hacking"
    }
  ]
};

// Procedural Scenario Generator to compile exactly 50 challenging, highly educational questions for any of the 100 levels
export function generateQuestionsForLevel(levelId: number, topics: string[]): Question[] {
  const list: Question[] = [];
  const primaryTopicId = topics[0] || "linux_foundations";

  // Gather relevant questions from MASTER_QUESTIONS
  const matchingMaster = topics.flatMap(t => {
    const questions = MASTER_QUESTIONS[t] || [];
    return questions.map((q, idx) => ({
      ...q,
      id: `master-${t}-${idx}`
    }));
  });

  // Push master questions first to maintain high quality
  matchingMaster.forEach(q => list.push(q));

  // Generate remaining questions procedurally to make up exactly 50 questions
  const seedMultiplier = levelId * 13;
  let questionIndex = list.length + 1;

  while (list.length < 50) {
    const qNum = questionIndex;
    const deterministicSeed = seedMultiplier + qNum;

    // Use a pool of realistic hacking scenarios, commands, or conceptual questions
    const scenarioType = deterministicSeed % 12;

    let questionText = "";
    let options: string[] = [];
    let correctIndex = 0;
    let explanation = "";

    switch (scenarioType) {
      case 0: // Linux / Shell Command parameter check
        {
          const commands = [
            { cmd: "chmod +x shell.sh", desc: "Adds execute permissions to 'shell.sh' for all users." },
            { cmd: "find / -name flag.txt 2>/dev/null", desc: "Searches for a file named 'flag.txt' while suppressing permission denied errors." },
            { cmd: "grep -i 'password' config.json", desc: "Searches 'config.json' for 'password' case-insensitively." },
            { cmd: "ssh -i id_rsa user@target.com", desc: "Logs in via SSH using a private key identity file named 'id_rsa'." },
            { cmd: "ps -ef", desc: "Displays all active processes running on the operating system." }
          ];
          const choice = commands[deterministicSeed % commands.length];
          questionText = `[Scenario Question #${qNum}] What is the primary purpose of executing the command \`${choice.cmd}\` during a security audit?`;
          options = [
            choice.desc,
            "It scans the network for listening TCP ports.",
            "It establishes an encrypted reverse tunnel to an external firewall.",
            "It decompiles a localized executable binary into assembly instructions."
          ];
          // Shuffle options deterministically
          correctIndex = (deterministicSeed % 4);
          const temp = options[0];
          options[0] = options[correctIndex];
          options[correctIndex] = temp;

          explanation = `Executing \`${choice.cmd}\` is used to: ${choice.desc}. Understanding basic command line arguments is vital during post-exploitation and initial recon.`;
        }
        break;

      case 1: // Nmap / Network Port scanning parameter check
        {
          const scans = [
            { flag: "-sV", desc: "Detect open port service brand and exact version numbers." },
            { flag: "-O", desc: "Enable OS fingerprinting to determine target OS." },
            { flag: "-p-", desc: "Scan all 65,535 possible TCP ports." },
            { flag: "-Pn", desc: "Skip ping discovery, treating all hosts as online. Essential for bypassing ping blocks." },
            { flag: "-sU", desc: "Perform a slower UDP port scan." }
          ];
          const scan = scans[deterministicSeed % scans.length];
          questionText = `[Scenario Question #${qNum}] An ethical hacker runs: \`nmap ${scan.flag} target.com\`. What does the \`${scan.flag}\` parameter instruct the scanner to do?`;
          options = [
            "It forces the scan to run via anonymous Tor proxies.",
            "It automatically executes destructive buffer overflow exploits.",
            scan.desc,
            "It saves the scan logs directly to a encrypted cloud server."
          ];
          correctIndex = 2; // Fixed but we will swap
          const targetIndex = (deterministicSeed % 4);
          const temp = options[2];
          options[2] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `In Nmap, the \`${scan.flag}\` flag is used to ${scan.desc}. This allows security researchers to tune scanning speed, footprint, and accuracy.`;
        }
        break;

      case 2: // OWASP Web vulnerability code snippet review
        {
          const vulnerabilities = [
            {
              code: "app.get('/user', (req, res) => {\n  let query = 'SELECT * FROM users WHERE id = ' + req.query.id;\n  db.query(query);\n});",
              type: "SQL Injection (SQLi)",
              fix: "Use parameterized queries or ORMs instead of string concatenation."
            },
            {
              code: "document.getElementById('welcome').innerHTML = 'Hello ' + location.hash;",
              type: "DOM-based Cross-Site Scripting (DOM XSS)",
              fix: "Use innerText, textContent, or HTML sanitization libraries instead of innerHTML."
            },
            {
              code: "app.get('/invoice', (req, res) => {\n  let invoice = loadInvoice(req.query.id);\n  res.json(invoice);\n});",
              type: "Insecure Direct Object Reference (IDOR)",
              fix: "Validate that the authenticated session user has ownership of the requested invoice ID before returning data."
            },
            {
              code: "app.post('/transfer', (req, res) => {\n  transferFunds(req.session.userId, req.body.to, req.body.amount);\n});",
              type: "Cross-Site Request Forgery (CSRF)",
              fix: "Implement unique anti-CSRF request tokens or set SameSite=Strict on cookies."
            }
          ];
          const vuln = vulnerabilities[deterministicSeed % vulnerabilities.length];
          questionText = `[Scenario Question #${qNum}] Analyze this backend code snippet:\n\n\`\`\`\n${vuln.code}\n\`\`\`\n\nWhat critical vulnerability is present?`;
          options = [
            "Server-Side Request Forgery (SSRF)",
            vuln.type,
            "Buffer Overflow in the memory register",
            "Insecure Cryptographic Hashing"
          ];
          correctIndex = 1;
          const targetIndex = (deterministicSeed % 4);
          const temp = options[1];
          options[1] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `The snippet is vulnerable to ${vuln.type}. Mitigation: ${vuln.fix}`;
        }
        break;

      case 3: // Cryptography & Hashing Concept
        {
          const concepts = [
            { name: "Salting", desc: "Adding random data to inputs before hashing to prevent rainbow table attacks." },
            { name: "Symmetric Encryption", desc: "Encryption algorithm using the SAME secret key for both encryption and decryption." },
            { name: "Asymmetric Encryption", desc: "Cryptography using a Public Key to encrypt and a Private Key to decrypt." },
            { name: "MD5/SHA1", desc: "Deprecated cryptographic hash algorithms with severe collision vulnerabilities." },
            { name: "HMAC", desc: "Hash-based Message Authentication Code combining a secret key with a hashing function to verify integrity and authenticity." }
          ];
          const concept = concepts[deterministicSeed % concepts.length];
          questionText = `[Scenario Question #${qNum}] In security architecture, what is the definition or primary benefit of \`${concept.name}\`?`;
          options = [
            concept.desc,
            "It executes binary files inside a isolated secure virtual sandbox.",
            "It randomizes the memory allocation of the CPU dynamically.",
            "It detects active rootkits hiding inside kernel subsystems."
          ];
          correctIndex = 0;
          const targetIndex = (deterministicSeed % 4);
          const temp = options[0];
          options[0] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `\`${concept.name}\` is defined as: ${concept.desc} This is a critical building block for modern data security.`;
        }
        break;

      case 4: // Hacking Tool Identification
        {
          const tools = [
            { name: "Burp Suite", purpose: "Intercepting, modifying, and analyzing HTTP and WebSocket traffic between browser and server." },
            { name: "Hydra", purpose: "Performing high-speed parallel dictionary brute-force attacks against network protocols like SSH, FTP, and RDP." },
            { name: "Wireshark", purpose: "Capturing, filtering, and performing deep packet inspection of live network traffic." },
            { name: "Ghidra", purpose: "A reverse engineering suite used to decompile and analyze compiled machine-code binaries." },
            { name: "John the Ripper", purpose: "An offline password cracking utility supporting hundreds of password hash types." },
            { name: "Nikto", purpose: "An automated web server scanner that tests for outdated software, server configurations, and default files." }
          ];
          const tool = tools[deterministicSeed % tools.length];
          questionText = `[Scenario Question #${qNum}] What is the primary purpose of the security industry tool \`${tool.name}\`?`;
          options = [
            "Hosting target web pages with pre-built SQL vulnerabilities.",
            "Encrypting S3 cloud storage buckets using proprietary standards.",
            tool.purpose,
            "Generating phishing email templates automatically."
          ];
          correctIndex = 2;
          const targetIndex = (deterministicSeed % 4);
          const temp = options[2];
          options[2] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `\`${tool.name}\` is a standard tool used for: ${tool.purpose}. Penetration testers must master this tool.`;
        }
        break;

      case 5: // Network Packet Headers / OSI Layers
        {
          const layers = [
            { layer: "Layer 7 (Application)", standard: "HTTP, DNS, SSH, FTP, SMTP" },
            { layer: "Layer 4 (Transport)", standard: "TCP, UDP, Port numbering" },
            { layer: "Layer 3 (Network)", standard: "IP addresses, Routers, ICMP, Routing packets" },
            { layer: "Layer 2 (Data Link)", standard: "MAC addresses, Switches, ARP protocol" }
          ];
          const ly = layers[deterministicSeed % layers.length];
          questionText = `[Scenario Question #${qNum}] Under the OSI Model, which protocols or identifiers operate primarily at \`${ly.layer}\`?`;
          options = [
            "Physical fiber cables and bits",
            ly.standard,
            "JSON data serialization engines",
            "SQL queries and database triggers"
          ];
          correctIndex = 1;
          const targetIndex = (deterministicSeed % 4);
          const temp = options[1];
          options[1] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `The OSI \`${ly.layer}\` encapsulates: ${ly.standard}. Network engineers and security analysts use this model to locate bugs and attacks.`;
        }
        break;

      case 6: // Reverse engineering / Binary assembly register
        {
          const registers = [
            { reg: "RAX", role: "Primary accumulator register, frequently used to store the return values of functions." },
            { reg: "RSP", role: "Stack Pointer register, pointing to the current top address of the stack." },
            { reg: "RBP", role: "Base Pointer register, establishing a stable frame pointer for function parameters." },
            { reg: "RIP", role: "Instruction Pointer register, holding the memory address of the next machine instruction to run." }
          ];
          const reg = registers[deterministicSeed % registers.length];
          questionText = `[Scenario Question #${qNum}] During a reverse engineering session in Ghidra or GDB on x64 Linux, what is the role of the \`${reg.reg}\` register?`;
          options = [
            "Storing local environment variables for the operating system.",
            "Holding encrypted Wi-Fi network decryption passphrases.",
            reg.role,
            "Compiling raw Python scripts into system C binaries."
          ];
          correctIndex = 2;
          const targetIndex = (deterministicSeed % 4);
          const temp = options[2];
          options[2] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `In assembly, \`${reg.reg}\` is used for: ${reg.role}. Monitoring registers during debugging reveals how data manipulation causes software overflows.`;
        }
        break;

      case 7: // Mobile Android/iOS Hacking Concept
        {
          const concepts = [
            { name: "Frida Hooking", desc: "Overriding an active function in memory at runtime to return a mock value (e.g., forcing rootCheck() to return false)." },
            { name: "APK Decompilation", desc: "Using apktool or JADX to unpack an compiled Android app into readable resources and Smali code." },
            { name: "SSL Pinning", desc: "A client-side security control that hardcodes the server's public key inside the app, preventing attackers from intercepting traffic with self-signed proxy certs." },
            { name: "Keychain/Keystore", desc: "Secure hardware-backed storage on iOS and Android meant to house encryption keys, passwords, and tokens." }
          ];
          const c = concepts[deterministicSeed % concepts.length];
          questionText = `[Scenario Question #${qNum}] In mobile pen-testing, what does the term \`${c.name}\` represent?`;
          options = [
            c.desc,
            "Injecting malicious SQL payloads into SMS texts.",
            "Overclocking the mobile CPU to brute-force hashes faster.",
            "Intercepting physical cell tower signals over active radio frequencies."
          ];
          correctIndex = 0;
          const targetIndex = (deterministicSeed % 4);
          const temp = options[0];
          options[0] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `\`${c.name}\` refers to: ${c.desc}. Breaking mobile security requires bypasses of these controls using dynamic tools like Frida.`;
        }
        break;

      case 8: // Cloud Security Concept
        {
          const concepts = [
            { name: "SSRF on Metadata Service", desc: "Querying 169.254.169.254 via an SSRF vulnerability to fetch access keys for the cloud instance IAM role." },
            { name: "S3 Bucket Exposure", desc: "A cloud storage configuration failure where access controls (ACLs) are set to public, allowing anyone to read/write backups." },
            { name: "IMDSv2 Upgrade", desc: "Transitioning to session-oriented metadata requests on AWS, requiring a PUT token header, which prevents simple SSRF exploitation." },
            { name: "IAM Principle of Least Privilege", desc: "Restricting cloud roles to have ONLY the absolute minimum permissions needed to run their designated tasks, preventing lateral movement." }
          ];
          const c = concepts[deterministicSeed % concepts.length];
          questionText = `[Scenario Question #${qNum}] In modern cloud penetration testing (AWS/GCP/Azure), which option correctly describes \`${c.name}\`?`;
          options = [
            "A physical access exploit requiring bypass of data center biometrics.",
            "An algorithm that hashes passwords inside containers.",
            c.desc,
            "A protocol that routes fiberoptic traffic between virtual machines."
          ];
          correctIndex = 2;
          const targetIndex = (deterministicSeed % 4);
          const temp = options[2];
          options[2] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `\`${c.name}\` is defined as: ${c.desc}. Cloud configurations are the leading source of breaches in corporate environments.`;
        }
        break;

      case 9: // Penetration Testing Reporting & CVSS
        {
          const metrics = [
            { term: "CVSS Base Score", desc: "A standardized rating from 0.0 (None) to 10.0 (Critical) reflecting the severity of a vulnerability based on exploitability and impact." },
            { term: "Proof of Concept (PoC)", desc: "A working exploit script or step-by-step procedure demonstrating exactly how a vulnerability is triggered, proving its existence to the client." },
            { term: "Remediation Plan", desc: "A technical guide advising developers how to patch the bug, including software updates, code snippets, or config rules." },
            { term: "Scope of Work (SoW)", desc: "A legal document detailing the exact IP ranges, domains, and systems authorized for testing, along with allowed tools and schedule." }
          ];
          const m = metrics[deterministicSeed % metrics.length];
          questionText = `[Scenario Question #${qNum}] Why is \`${m.term}\` considered an indispensable element of a professional penetration testing report?`;
          options = [
            "It automatically generates legal threat letters to security agencies.",
            m.desc,
            "It measures the network ping speeds in real-time.",
            "It converts binary assemblies into standard JavaScript scripts."
          ];
          correctIndex = 1;
          const targetIndex = (deterministicSeed % 4);
          const temp = options[1];
          options[1] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `\`${m.term}\` is vital because: ${m.desc}. Clean reporting is what separates ethical security professionals from malicious hackers.`;
        }
        break;

      case 10: // Passive Recon / DNS records
        {
          const dnsRecords = [
            { type: "MX (Mail Exchanger)", desc: "Specifies the mail servers responsible for receiving email on behalf of the domain." },
            { type: "TXT (Text)", desc: "Contains text information, often hosting verification keys, SPF rules, or DKIM signatures." },
            { type: "CNAME (Canonical Name)", desc: "Maps an alias domain name to the true canonical domain, useful for uncovering subdomains using external hosting." },
            { type: "AXFR (Zone Transfer)", desc: "A protocol request designed to replicate DNS databases. If left enabled publicly, attackers can dump the entire list of subdomains instantly." }
          ];
          const dns = dnsRecords[deterministicSeed % dnsRecords.length];
          questionText = `[Scenario Question #${qNum}] During DNS reconnaissance, what vital intelligence is gathered by querying the \`${dns.type}\` record type?`;
          options = [
            "The physical geographic latitude and longitude coordinates of the server hosting rack.",
            dns.desc,
            "The operating system version and kernel release of the master domain host.",
            "The cleartext administrative database passwords."
          ];
          correctIndex = 1;
          const targetIndex = (deterministicSeed % 4);
          const temp = options[1];
          options[1] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `The DNS \`${dns.type}\` query is used to retrieve: ${dns.desc}. Querying DNS structures gathers structural intelligence without sending direct alerts to the server.`;
        }
        break;

      default: // General security mindset & Ethical Hacking definitions
        {
          const scenarios = [
            { q: "What is the primary difference between a Black Hat and a White Hat hacker?", a: "White Hats operate with explicit legal authorization from the system owner and work to patch bugs, whereas Black Hats operate maliciously without permission." },
            { q: "What does the term 'Zero Day' refer to in vulnerability management?", a: "A newly discovered vulnerability that has no available patch or update from the software vendor, giving developers 'zero days' to fix it before exploitation." },
            { q: "What is a 'Reverse Shell'?", a: "A connection initiated from the target system back to the attacker's listening server, bypassing standard firewall blocks on incoming ports." },
            { q: "What does 'Lateral Movement' refer to in penetration testing?", a: "The techniques used by testers to pivot from an initially compromised server to other systems within the same internal corporate network." }
          ];
          const sc = scenarios[deterministicSeed % scenarios.length];
          questionText = `[Scenario Question #${qNum}] ${sc.q}`;
          options = [
            sc.a,
            "It is a automated testing framework run via specialized hardware microchips.",
            "It refers to configuring secondary load balancers to increase speed.",
            "It refers to encrypting the operating system registry keys recursively."
          ];
          correctIndex = 0;
          const targetIndex = (deterministicSeed % 4);
          const temp = options[0];
          options[0] = options[targetIndex];
          options[targetIndex] = temp;
          correctIndex = targetIndex;

          explanation = `${sc.q} Correct answer is: ${sc.a}. This is fundamental to professional penetration testing methodologies.`;
        }
        break;
    }

    list.push({
      id: `proc-${primaryTopicId}-${levelId}-${qNum}`,
      text: questionText,
      options,
      correctIndex,
      explanation,
      topicId: primaryTopicId
    });

    questionIndex++;
  }

  return list;
}
