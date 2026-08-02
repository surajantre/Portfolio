// ============================================================================
// lib/content.ts
// Single source of truth for every piece of copy on the site.
// Sections import typed data from here — no hardcoded resume copy anywhere else.
// ============================================================================

export const identity = {
  fullName: "Suraj Antre",
  firstName: "Suraj",
  title: "Senior Full Stack Python Developer",
  tagline: "FastAPI, Django, React & Next.js · AWS, Docker, CI/CD",
  location: "Pune, Maharashtra, India",
  permanentAddress: "A/p-Songaon, Rahuri, Ahilyanagar, Maharashtra – 413711",
  phone: "+91 9373645949",
  phoneHref: "tel:+919373645949",
  emailPrimary: "mr.surajantre@gmail.com",
  emailSecondary: "surajantre7777@gmail.com",
  linkedin: "https://www.linkedin.com/in/suraj-antre",
  github: "https://github.com/SurajAntre7777",
  legacyPortfolio: "https://surajantre.github.io/Portfolio",
  resumeUrl: "/resume/Suraj-Antre-CV.pdf",
  openToWork: true,
  availability: "Immediately available",
} as const;

export const summary = `Senior Full Stack Python Developer with 3+ years of experience building
scalable, production-grade web applications using FastAPI, Django, React, Next.js, and AWS.
Strong in backend-heavy systems, REST APIs, role-based access control (RBAC), CI/CD, Docker, and
cloud infrastructure. Has shipped ERP, EHS, and AI-enabled platforms used by 100+ active users.
Focused on performance, security, and maintainable system design.`;

export const heroKeywords = [
  "Python",
  "FastAPI",
  "Django",
  "React.js",
  "Next.js",
  "AWS",
  "Docker",
  "CI/CD",
];

// ----------------------------------------------------------------------------
// Skills
// ----------------------------------------------------------------------------

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "JavaScript", "TypeScript"],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      "FastAPI",
      "Django",
      "Django REST Framework",
      "REST APIs",
      "JWT / OAuth",
      "Microservices",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Material UI",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Weaviate", "FAISS"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    items: [
      "AWS EC2",
      "ECS",
      "ECR",
      "S3",
      "RDS",
      "Lambda",
      "IAM",
      "CloudWatch",
      "VPC",
      "Route 53",
      "Cognito",
      "Docker",
      "Kubernetes (basic)",
      "Terraform",
      "GitHub Actions",
      "Jenkins",
    ],
  },
  {
    id: "deploy",
    label: "Deployment Platforms",
    items: [
      "AWS EC2/Lambda/ECR/ECS",
      "Railway",
      "Render",
      "Vercel",
      "Netlify",
      "Contabo",
    ],
  },
  {
    id: "automation",
    label: "Automation / AI Tooling",
    items: ["LangFlow", "n8n"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman", "Agile/Scrum"],
  },
  { id: "foundation", label: "Foundation", items: ["Java", "C", "DSA", "SQL"] },
];

export const spokenLanguages = [
  { language: "English", level: "Professional" },
  { language: "Hindi", level: "Native / Fluent" },
  { language: "Marathi", level: "Native" },
];

// ----------------------------------------------------------------------------
// Experience
// ----------------------------------------------------------------------------

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  teamSize?: string;
  tech: string[];
  points: string[];
  current?: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    id: "dproots",
    role: "Senior Software Engineer",
    company: "Dproots AI Pvt. Ltd.",
    period: "June 2026 – Present",
    location: "Pune",
    tech: ["Python", "FastAPI", "Django", "React", "Next.js", "AWS"],
    points: [
      "Currently driving full-stack engineering initiatives at Dproots AI.",
    ],
    current: true,
  },
  {
    id: "protegk",
    role: "Full Stack Engineer",
    company: "Protegk IT",
    period: "August 2025 – April 2026",
    location: "Pune",
    teamSize: "4–5",
    tech: [
      "Python",
      "Django",
      "REST APIs",
      "HTML",
      "CSS",
      "JavaScript",
      "SQLite",
      "Docker",
      "CI/CD",
      "AWS",
    ],
    points: [
      "Built backend-centric ERP systems with complex business logic and relational data models.",
      "Implemented RBAC across HR, Contractor, Billing, and Project roles.",
      "Built core ERP modules: HR management, contractor onboarding, billing workflows, project tracking.",
      "Built dashboards and data-entry workflows using HTML, CSS, JS, Bootstrap, and Tailwind CSS.",
      "Shipped features via Docker, AWS, and CI/CD for stable, repeatable deploys.",
    ],
  },
  {
    id: "codewise",
    role: "Full Stack Developer",
    company: "The Code Wise",
    period: "June 2024 – August 2025",
    location: "Pune",
    teamSize: "3–4",
    tech: [
      "Python",
      "FastAPI",
      "ReactJS",
      "Next.js",
      "MySQL",
      "LangFlow",
      "n8n",
      "Docker",
      "AWS",
      "GitHub Actions",
    ],
    points: [
      "Built QueryMate, a document query platform for PDFs/Excel using vector search.",
      "Designed CI/CD pipelines (GitHub Actions, Docker, AWS ECR), cutting deploy time by up to ~80%.",
      "Automated AWS infrastructure with Terraform (ECS clusters, Dockerized services).",
      "Built a WhatsApp Chatbot for automated report access and support.",
    ],
  },
  {
    id: "freelance",
    role: "Freelance Full Stack Developer",
    company: "Self-employed",
    period: "February 2023 – June 2024",
    location: "Pune",
    tech: [
      "Python",
      "Java",
      "Django",
      "FastAPI",
      "Next.js",
      "ReactJS",
      "MySQL",
      "PostgreSQL",
      "AWS",
      "Weaviate",
      "LangFlow",
    ],
    points: [
      "Delivered 3+ full-stack projects end-to-end — backend, frontend, and deployment.",
      "Designed relational database schemas in MySQL and PostgreSQL.",
    ],
  },
  {
    id: "sourcecode",
    role: "Full Stack Developer Intern",
    company: "Source Code Technologies",
    period: "October 2023 – July 2024",
    location: "Pune",
    tech: ["Python", "FastAPI", "Authentication", "ReactJS", "MySQL", "AWS"],
    points: [
      "Hands-on with Python OOP and authentication workflows in production-style apps.",
    ],
  },
  {
    id: "zensar",
    role: "Zensar ESD Program Student",
    company: "Zensar Technologies",
    period: "September 2022 – October 2023",
    location: "Apprenticeship",
    tech: [],
    points: [
      "Completed the Zensar Extended Software Development apprenticeship program.",
    ],
  },
  {
    id: "elite",
    role: "Web Developer Intern",
    company: "Elite Software",
    period: "January 2023 – March 2023",
    location: "Pune",
    tech: [
      "HTML",
      "CSS",
      "JS",
      "Bootstrap",
      "Next.js",
      "Tailwind",
      "Python",
      "MySQL",
      "Terraform",
      "GitHub Actions",
      "Netlify",
      "Contabo",
      "Railway",
    ],
    points: [
      "Built responsive business websites and contributed backend services for dynamic content.",
    ],
  },
  {
    id: "ninfinity",
    role: "Intern",
    company: "N Infinity Info Solutions",
    period: "November 2021 – February 2022",
    location: "Pune",
    tech: [],
    points: [
      "Early internship experience in a professional software development environment.",
    ],
  },
];

// ----------------------------------------------------------------------------
// Projects
// ----------------------------------------------------------------------------

export type Project = {
  id: string;
  title: string;
  blurb: string;
  stack: string[];
  highlights: string[];
  category: "ERP & Enterprise" | "AI & Data" | "Automation" | "Web Platforms";
  metric?: string;
  githubUrl: string;
  liveUrl?: string;
  gradient: [string, string];
};

export const projects: Project[] = [
  {
    id: "epc360",
    title: "EPC 360 Infra ERP System",
    blurb:
      "Centralized ERP for EPC companies covering HR, Contractor Management, Billing, and Project Operations.",
    stack: [
      "Python",
      "Django",
      "REST APIs",
      "HTML",
      "CSS",
      "JavaScript",
      "SQLite",
      "Docker",
    ],
    highlights: [
      "RBAC-secured HR and financial data across multiple roles.",
      "HR module plus Contractor Billing module — work orders, invoices, payment tracking.",
      "100+ active users across 10+ modules in production.",
    ],
    category: "ERP & Enterprise",
    metric: "100+ active users",
    githubUrl: "https://github.com/SurajAntre7777",
    gradient: ["#3b82f6", "#8b5cf6"],
  },
  {
    id: "ehs",
    title: "EHS Management System",
    blurb:
      "Digitizes workplace Environment, Health & Safety compliance from incident logging to corrective action.",
    stack: ["Python", "Django", "HTML", "CSS", "JavaScript", "SQLite"],
    highlights: [
      "Incident reporting and investigation lifecycle management.",
      "Hazard identification and tracking with structured, auditable data models.",
      "Safety-audit data collection workflows for daily operations.",
    ],
    category: "ERP & Enterprise",
    githubUrl: "https://github.com/SurajAntre7777",
    gradient: ["#10b981", "#0ea5e9"],
  },
  {
    id: "querymate",
    title: "QueryMate — Document Query Platform",
    blurb:
      "Web-based system to extract insights from PDFs and Excel files via semantic vector search.",
    stack: [
      "Python",
      "FastAPI",
      "ReactJS",
      "Weaviate",
      "FAISS",
      "LangFlow",
      "AWS Cognito",
      "n8n",
    ],
    highlights: [
      "Semantic (vector) search over unstructured documents.",
      "Secured with AWS Cognito authentication.",
      "Deployed on AWS for scalable access.",
    ],
    category: "AI & Data",
    githubUrl: "https://github.com/SurajAntre7777",
    gradient: ["#8b5cf6", "#ec4899"],
  },
  {
    id: "whatsapp-bot",
    title: "WhatsApp Chatbot — Report Automation",
    blurb:
      "Automated report delivery over WhatsApp, linked to customer records.",
    stack: ["Python", "MySQL", "Meta WhatsApp API"],
    highlights: [
      "Linked customer mobile numbers with stored reports.",
      "Integrated with QueryMate for document Q&A via chat.",
    ],
    category: "Automation",
    githubUrl: "https://github.com/SurajAntre7777",
    gradient: ["#22c55e", "#14b8a6"],
  },
  {
    id: "ocr-pipeline",
    title: "OCR Document Processing System",
    blurb:
      "Automated data extraction from PDFs, images, ZIPs, Excel, and FTP sources using OCR + LLM pipelines.",
    stack: ["Python", "LLaMA", "Next.js", "MySQL", "AWS", "AWS Cognito"],
    highlights: [
      "OCR and LLM-based extraction pipelines.",
      "Deployed for scalable document processing.",
    ],
    category: "AI & Data",
    githubUrl: "https://github.com/SurajAntre7777",
    gradient: ["#f59e0b", "#ef4444"],
  },
  {
    id: "assetpro",
    title: "AssetPro — Intelligent Asset Tracking",
    blurb:
      "QR-code-based asset lifecycle tracking with real-time monitoring and alerts.",
    stack: [
      "Django",
      "Django REST",
      "Next.js",
      "Tailwind CSS",
      "SQLite",
      "Jenkins",
      "AWS",
    ],
    highlights: [
      "QR-code scanning for full asset lifecycle management.",
      "Real-time monitoring, alerts, and status dashboards.",
      "Tracked 5,000+ assets with reliable data visibility.",
    ],
    category: "ERP & Enterprise",
    metric: "5,000+ assets tracked",
    githubUrl: "https://github.com/SurajAntre7777",
    gradient: ["#06b6d4", "#3b82f6"],
  },
  {
    id: "swarajcab",
    title: "SwarajCab — Cab Booking & Service",
    blurb:
      "Booking and service website with an optimized PostgreSQL backend on AWS EC2.",
    stack: ["Next.js", "Tailwind CSS", "FastAPI", "PostgreSQL", "AWS EC2"],
    highlights: [
      "FastAPI backend handling booking requests and data management.",
      "Optimized PostgreSQL schema, deployed on EC2.",
    ],
    category: "Web Platforms",
    githubUrl: "https://github.com/SurajAntre7777",
    gradient: ["#eab308", "#f97316"],
  },
  {
    id: "elixir",
    title: "Elixir — Drug Template Generation",
    blurb:
      "Generates structured pharmaceutical documents and templates for controlled customer access.",
    stack: ["Python", "FastAPI", "ReactJS", "MySQL", "AWS", "AWS Cognito"],
    highlights: [
      "Structured document generation for pharmaceutical templates.",
      "Cognito-secured customer access and downloads.",
    ],
    category: "Web Platforms",
    githubUrl: "https://github.com/SurajAntre7777",
    gradient: ["#a855f7", "#6366f1"],
  },
  {
    id: "punemumbaitravels",
    title: "PuneMumbaiTravels",
    blurb:
      "Travel company website with blogs and booking info, automated infra via Terraform.",
    stack: [
      "Next.js",
      "Tailwind CSS",
      "Python",
      "PostgreSQL",
      "Terraform",
      "GitHub Actions",
      "Netlify",
      "Contabo",
      "Railway",
    ],
    highlights: [
      "99.9% uptime with improved SEO and user engagement.",
      "Infrastructure automated via Terraform and GitHub Actions.",
    ],
    category: "Web Platforms",
    metric: "99.9% uptime",
    githubUrl: "https://github.com/SurajAntre7777",
    gradient: ["#ef4444", "#ec4899"],
  },
];

export const projectCategories = [
  "All",
  "ERP & Enterprise",
  "AI & Data",
  "Automation",
  "Web Platforms",
] as const;

// ----------------------------------------------------------------------------
// Education
// ----------------------------------------------------------------------------

export type EducationEntry = {
  id: string;
  degree: string;
  institute: string;
  period: string;
  detail: string;
};

export const education: EducationEntry[] = [
  {
    id: "be",
    degree: "B.E., Computer Engineering",
    institute:
      "Dr. D. Y. Patil College of Engineering & Innovation, Pune (SPPU)",
    period: "July 2020 – June 2024",
    detail: "CGPA 7.83",
  },
  {
    id: "hsc",
    degree: "Higher Secondary (HSC)",
    institute:
      "Bapuji Sahadu Kadu Patil Junior College of Science & Arts, Satral",
    period: "Apr 2019 – May 2020",
    detail: "62.31%",
  },
  {
    id: "ssc",
    degree: "Secondary School (SSC)",
    institute: "Nanasaheb Sahadu Kadu Patil Vidyalaya, Satral",
    period: "Apr 2017 – May 2018",
    detail: "85.20%",
  },
];

// ----------------------------------------------------------------------------
// Certifications (structured, non-gallery)
// ----------------------------------------------------------------------------

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  period: string;
  mode: string;
};

export const certifications: Certification[] = [
  {
    id: "aws-devops",
    name: "DevOps on AWS",
    issuer: "AWS Training & Certification",
    period: "Aug 2025",
    mode: "Online",
  },
  {
    id: "alison-devops",
    name: "Diploma in DevOps Engineering",
    issuer: "Alison",
    period: "Jan – May 2021",
    mode: "Online",
  },
  {
    id: "gamaka-python",
    name: "Python: Basic & Advanced",
    issuer: "GAMAKA",
    period: "May – Jul 2022",
    mode: "Offline, Pune",
  },
  {
    id: "li-critical-thinking",
    name: "Critical Thinking for Better Judgment and Decision-Making",
    issuer: "LinkedIn Learning",
    period: "—",
    mode: "Online",
  },
  {
    id: "li-one-on-one",
    name: "How to Have Productive One-on-One Meetings",
    issuer: "LinkedIn Learning",
    period: "—",
    mode: "Online",
  },
  {
    id: "li-managing-teams",
    name: "Managing Teams",
    issuer: "LinkedIn Learning",
    period: "—",
    mode: "Online",
  },
  {
    id: "li-career-skills",
    name: "Introduction to Career Skills in Software Development",
    issuer: "LinkedIn Learning",
    period: "—",
    mode: "Online",
  },
  {
    id: "tcs-ion",
    name: "Career Edge — Young Professional",
    issuer: "TCS iON",
    period: "—",
    mode: "Online",
  },
  {
    id: "infosys-dsa",
    name: "Data Structures and Algorithms Using Java: An Interactive Way",
    issuer: "Infosys Springboard",
    period: "—",
    mode: "Online",
  },
  {
    id: "coursera-cloud-security",
    name: "Preparing for Your Professional Cloud Security Engineer Journey",
    issuer: "Coursera",
    period: "—",
    mode: "Online",
  },
  {
    id: "simplilearn",
    name: "Simplilearn Certificate",
    issuer: "Simplilearn",
    period: "—",
    mode: "Online",
  },
];

// Gallery images copied from the provided asset archive.
// A handful of identifiable ones get proper titles; the rest are labeled generically.
// NOTE: personal HR documents (offer letter, allotment letter, internship completion
// letter, learner verification) were intentionally excluded from this public gallery.
export type CertImage = {
  id: string;
  src: string;
  title: string;
};

export const certificateGallery: CertImage[] = [
  {
    id: "tcs",
    src: "/images/certs/tcs-ion-career-edge.jpg",
    title: "TCS iON Career Edge — Young Professional",
  },
  {
    id: "infosys-dsa",
    src: "/images/certs/infosys-dsa-java.jpg",
    title: "Infosys — Data Structures & Algorithms (Java)",
  },
  {
    id: "infosys-security",
    src: "/images/certs/infosys-backend-security.jpg",
    title: "Infosys — Back-End App Security",
  },
  {
    id: "coursera-cloud",
    src: "/images/certs/coursera-cloud-security.jpg",
    title: "Coursera — Cloud Security Engineer Journey",
  },
  {
    id: "coursera-generic",
    src: "/images/certs/coursera-certificate.jpg",
    title: "Coursera — Certificate of Completion",
  },
  {
    id: "alison",
    src: "/images/certs/alison-devops-diploma.jpg",
    title: "Alison — Diploma in DevOps Engineering",
  },
  {
    id: "simplilearn",
    src: "/images/certs/simplilearn-certificate.jpg",
    title: "Simplilearn Certificate",
  },
  {
    id: "java-cert",
    src: "/images/certs/java-certification-course.jpg",
    title: "Java Certification Course",
  },
  {
    id: "udemy",
    src: "/images/certs/udemy-course-completion.jpg",
    title: "Course Completion Certificate",
  },
  {
    id: "code-fiesta",
    src: "/images/certs/code-fiesta-participation.jpg",
    title: "Code Fiesta — Certificate of Participation",
  },
  {
    id: "participation",
    src: "/images/certs/certificate-of-participation.png",
    title: "Certificate of Participation",
  },
  {
    id: "c01",
    src: "/images/certs/certificate-of-completion-01.jpg",
    title: "Certificate of Completion",
  },
  {
    id: "c02",
    src: "/images/certs/certificate-of-completion-02.jpg",
    title: "Certificate of Completion",
  },
  {
    id: "c03",
    src: "/images/certs/certificate-of-completion-03.jpg",
    title: "Certificate of Completion",
  },
  {
    id: "c04",
    src: "/images/certs/certificate-of-completion-04.jpg",
    title: "Certificate of Completion",
  },
  {
    id: "c05",
    src: "/images/certs/certificate-of-completion-05.jpeg",
    title: "Certificate of Completion",
  },
  {
    id: "c06",
    src: "/images/certs/certificate-of-completion-06.jpeg",
    title: "Certificate of Completion",
  },
  {
    id: "c07",
    src: "/images/certs/certificate-of-completion-07.jpeg",
    title: "Certificate of Completion",
  },
  {
    id: "c08",
    src: "/images/certs/certificate-of-completion-08.jpeg",
    title: "Certificate of Completion",
  },
  {
    id: "c09",
    src: "/images/certs/certificate-of-completion-09.jpeg",
    title: "Certificate of Completion",
  },
  {
    id: "c10",
    src: "/images/certs/certificate-of-completion-10.jpeg",
    title: "Certificate of Completion",
  },
  {
    id: "c11",
    src: "/images/certs/certificate-of-completion-11.png",
    title: "Certificate of Completion",
  },
  {
    id: "c12",
    src: "/images/certs/certificate-of-completion-12.png",
    title: "Certificate of Completion",
  },
  {
    id: "c13",
    src: "/images/certs/certificate-of-completion-13.jpeg",
    title: "Certificate of Completion",
  },
  {
    id: "c14",
    src: "/images/certs/certificate-of-completion-14.png",
    title: "Certificate of Completion",
  },
  {
    id: "c15",
    src: "/images/certs/certificate-of-completion-15.png",
    title: "Certificate of Completion",
  },
  {
    id: "c16",
    src: "/images/certs/certificate-of-completion-16.png",
    title: "Certificate of Completion",
  },
  {
    id: "c17",
    src: "/images/certs/certificate-of-completion-17.png",
    title: "Certificate of Completion",
  },
  {
    id: "c18",
    src: "/images/certs/certificate-of-completion-18.png",
    title: "Certificate of Completion",
  },
  {
    id: "c19",
    src: "/images/certs/certificate-of-completion-19.png",
    title: "Certificate of Completion",
  },
  {
    id: "c20",
    src: "/images/certs/certificate-of-completion-20.png",
    title: "Certificate of Completion",
  },
];

// ----------------------------------------------------------------------------
// Achievements (animated counters)
// ----------------------------------------------------------------------------

export type Achievement = {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
};

export const achievements: Achievement[] = [
  { id: "repos", label: "GitHub Repositories", value: 39, suffix: "+" },
  {
    id: "streak",
    label: "GitHub Contribution Streak",
    value: 6,
    suffix: "+ mo",
  },
  { id: "hackerrank", label: "HackerRank Java Rating", value: 5, suffix: "★" },
  {
    id: "assignments",
    label: "HackerRank Assignments Solved",
    value: 50,
    suffix: "+",
  },
  { id: "users", label: "Active Users (EPC 360 ERP)", value: 100, suffix: "+" },
  {
    id: "assets",
    label: "Assets Tracked (AssetPro)",
    value: 5000,
    suffix: "+",
  },
  {
    id: "deploy",
    label: "CI/CD Deploy-Time Reduction",
    value: 80,
    suffix: "%",
    prefix: "up to ",
  },
];

// ----------------------------------------------------------------------------
// Services
// ----------------------------------------------------------------------------

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: "server" | "layout" | "cloud" | "shield" | "workflow" | "database";
};

export const services: Service[] = [
  {
    id: "backend",
    title: "Backend & API Engineering",
    description:
      "Designing scalable REST APIs and backend systems with FastAPI and Django — clean architecture, RBAC, and secure authentication.",
    icon: "server",
  },
  {
    id: "frontend",
    title: "Frontend Application Development",
    description:
      "Building responsive, production-grade interfaces with React, Next.js, and Tailwind CSS.",
    icon: "layout",
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure & DevOps",
    description:
      "Provisioning and automating AWS infrastructure with Terraform, Docker, and CI/CD pipelines (GitHub Actions, Jenkins).",
    icon: "cloud",
  },
  {
    id: "security",
    title: "Access Control & Security",
    description:
      "Implementing RBAC, JWT/OAuth, and AWS Cognito-secured authentication across multi-role enterprise systems.",
    icon: "shield",
  },
  {
    id: "ai-automation",
    title: "AI-Enabled Automation",
    description:
      "Building document intelligence and automation tools with vector search (Weaviate, FAISS), LangFlow, and n8n.",
    icon: "workflow",
  },
  {
    id: "data",
    title: "Database Design",
    description:
      "Designing relational and vector database schemas across MySQL, PostgreSQL, MongoDB, and SQLite for scale and consistency.",
    icon: "database",
  },
];

// ----------------------------------------------------------------------------
// Coding profiles
// ----------------------------------------------------------------------------

export const codingProfiles = [
  {
    id: "github",
    label: "GitHub",
    handle: "@SurajAntre7777",
    url: identity.github,
    stat: "39+ repositories",
  },
  {
    id: "hackerrank",
    label: "HackerRank",
    handle: "5-star Java rating",
    url: "#",
    stat: "50+ assignments solved",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "@suraj-antre",
    url: identity.linkedin,
    stat: "Full professional history",
  },
] as const;

// ----------------------------------------------------------------------------
// Personal
// ----------------------------------------------------------------------------

export const personal = {
  hobbies: ["Programming", "Travelling", "Continuous Learning"],
  strengths: [
    "Self-motivated",
    "Quick learner",
    "Strong leadership",
    "Smart decision-making",
  ],
};

export const siteMeta = {
  title: "Suraj Antre — Senior Full Stack Python Developer",
  description:
    "Portfolio of Suraj Antre, a Senior Full Stack Python Developer specializing in FastAPI, Django, React, Next.js, and AWS cloud infrastructure.",
  url: "https://surajantre.dev",
};
