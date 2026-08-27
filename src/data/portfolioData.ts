export interface CVTrack {
  id: string;
  name: string;
  role: string;
  tagline: string;
  fileName: string;
  filePath: string;
  iconName: string;
  badgeColor: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Internship' | 'Contract' | 'Part-time';
  description: string[];
  technologies: string[];
}

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  date: string;
  identifier: string;
  description: string;
  link?: string;
  highlightTags: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  period: string;
  category: 'Full-Stack' | 'AI / ML' | 'Cloud & DevOps' | 'QA & Testing' | 'Mobile & Systems';
  techStack: string[];
  bullets: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  image: string;
  stats?: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: { name: string; level?: 'Expert' | 'Advanced' | 'Proficient'; hot?: boolean }[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface VolunteerRole {
  role: string;
  organization: string;
  period: string;
  description?: string;
}

export interface Achievement {
  title: string;
  event: string;
  year: string;
  description: string;
  badge?: string;
}

export interface Referee {
  name: string;
  title: string;
  department: string;
  institution: string;
  email: string;
  phone: string;
}

export const portfolioData = {
  personal: {
    name: 'Dinojan Vivekanantharasa',
    shortName: 'Dinojan V.',
    title: 'Full-Stack Developer & AI / DevOps Engineer',
    currentStatus: 'Computer Engineering Undergrad @ Univ of Ruhuna',
    bio: 'A passionate Computer Engineering undergraduate with professional experience across full-stack development, AI/ML engineering, and cloud infrastructure. Proven track record of owning systems end-to-end—from designing reactive frontends and scalable APIs, to deploying LLM/RAG pipelines and automating cloud CI/CD infrastructure.',
    email: 'dinojv21@gmail.com',
    phone: '+94 779703874',
    location: 'Vavuniya, Sri Lanka',
    github: 'https://github.com/Dinojan9901',
    linkedin: 'https://linkedin.com/in/dinojan',
    stats: [
      { label: 'Years Experience', value: '1+' },
      { label: 'Projects Completed', value: '12+' },
      { label: 'Academic Publications', value: '1' },
      { label: 'Specialized Tracks', value: '4' },
    ],
  },

  cvTracks: [
    {
      id: 'fullstack',
      name: 'Full-Stack & General CV',
      role: 'Full-Stack Software Engineer',
      tagline: 'Comprehensive overview of web engineering, backend systems, and cloud experience.',
      fileName: 'Dinojan_Vivekanantharasa_CV.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_CV.pdf',
      iconName: 'Code',
      badgeColor: '#3b82f6',
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning CV',
      role: 'AI / ML Systems Engineer',
      tagline: 'Specialized in LLMs, QLoRA fine-tuning, RAG pipelines, and deep learning architectures.',
      fileName: 'Dinojan_Vivekanantharasa_AI.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_AI.pdf',
      iconName: 'Brain',
      badgeColor: '#8b5cf6',
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud CV',
      role: 'Cloud & DevOps Engineer',
      tagline: 'Focused on Docker, Kubernetes, Jenkins, GitHub Actions, Terraform IaC, and AWS cloud.',
      fileName: 'Dinojan_Vivekanantharasa_DevOps.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_DevOps.pdf',
      iconName: 'Cloud',
      badgeColor: '#06b6d4',
    },
    {
      id: 'qa',
      name: 'QA & Test Automation CV',
      role: 'QA & Test Automation Engineer',
      tagline: 'Expert in Playwright E2E, Postman automated API testing, regression, and CI/CD quality gates.',
      fileName: 'Dinojan_Vivekanantharasa_QA.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_QA.pdf',
      iconName: 'ShieldCheck',
      badgeColor: '#10b981',
    },
    {
      id: 'standard',
      name: 'Standard Resume',
      role: 'Software Engineering Resume',
      tagline: 'Standard concise resume format suitable for generic software developer applications.',
      fileName: 'resume.pdf',
      filePath: '/assets/resume.pdf',
      iconName: 'FileText',
      badgeColor: '#f59e0b',
    },
  ] as CVTrack[],

  experiences: [
    {
      role: 'Full Stack Developer',
      company: 'Yarl Ventures (PVT) Ltd',
      location: 'Jaffna, Sri Lanka',
      period: 'December 2025 – May 2026',
      type: 'Full-time',
      description: [
        'Owned end-to-end delivery of production systems including EDUS LMS and MediMan telemedicine platform, building reactive React/TypeScript frontends, robust Node.js REST APIs, and high-performance MongoDB data layers.',
        'Managed CI/CD deployment pipelines, Nginx reverse proxy configuration with SSL termination, and AWS deployment infrastructure while collaborating in an Agile team through daily scrums and peer code reviews.',
        'Integrated multi-role RBAC permission models, PayHere payment gateways with digital student wallets, and real-time Socket.IO chat.',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Nginx', 'Docker', 'CI/CD', 'Socket.IO'],
    },
    {
      role: 'Full Stack Developer Intern',
      company: 'Yarl Ventures (PVT) Ltd',
      location: 'Jaffna, Sri Lanka',
      period: 'May 2025 – November 2025',
      type: 'Internship',
      description: [
        'Developed full-stack features across MERN architecture applications, contributing to accessible UI components, backend API endpoints, and database schema optimizations.',
        'Conducted extensive manual and automated API testing using Postman collections to validate RESTful endpoints across 19+ application modules.',
        'Gained rigorous hands-on experience with production Git workflows, containerized Docker deployments, and cloud monitoring under senior engineer mentorship.',
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Postman', 'Git', 'Docker', 'ClickUp', 'AWS CloudWatch'],
    },
  ] as WorkExperience[],

  publication: {
    title: 'AutoGradePro: An Automated Grading System for Short-Answer Assessments Using Rule-Based Methods and Large Language Models',
    authors: ['G. S. J. Venujan', 'M. F. A. Munsif', 'V. Dinojan', 'T. Jegan', 'G. G. N. Sandamali'],
    venue: 'Proceedings of Academic Sessions 2026, University of Ruhuna, Sri Lanka',
    date: 'March 2026',
    identifier: 'Abstract ABS-064 | ISSN 2362-0412',
    description: 'Pioneered an AI grading platform combining rule-based heuristics with fine-tuned Large Language Model semantic evaluation for short-answer educational assessments, supporting PDF/DOCX/TXT multi-format ingestion and rubric-aligned scoring.',
    link: 'https://github.com/Dinojan9901/AutoGradePro_Client',
    highlightTags: ['LLM Semantic Matching', 'Rule-Based Heuristics', 'Next.js', 'Django', 'Ollama'],
  } as Publication,

  projects: [
    {
      id: 'traces',
      title: 'TRACES – Post-Quantum Vehicular Network Defense',
      tagline: 'Three-stage LLM anomaly detection cascade & zero-trust blockchain governance for IoV',
      period: 'Dec 2025 – Present',
      category: 'AI / ML',
      featured: true,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      stats: '200-Vehicle Simulation Validated',
      techStack: ['Python', 'NS-3', 'Qwen2.5-7B', 'Hyperledger Fabric', 'PyTorch', 'Zero-Trust'],
      bullets: [
        'Designed a novel three-stage LLM-based anomaly detection cascade with zero-trust blockchain governance for vehicular networks (VANET/IoV).',
        'Validated system resilience against Byzantine attacks and quantum-era threat models across a 200-vehicle network simulation in NS-3.',
        'Integrated Qwen2.5-7B lightweight inference for decentralized real-time packet threat assessment.',
      ],
      githubUrl: 'https://github.com/Dinojan9901',
    },
    {
      id: 'edus-lms',
      title: 'EDUS LMS – Enterprise Learning Management System',
      tagline: 'Production-ready educational platform with 4-role RBAC, live chat, and payment gateway',
      period: 'Apr 2026 – May 2026',
      category: 'Full-Stack',
      featured: true,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      stats: '103 User Actions Across 19 Modules',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PayHere', 'AWS S3', 'Playwright'],
      bullets: [
        'Built full production LMS with 4-role RBAC (Admin, Teacher, Student, Parent) verified across 103 user permissions in 19 modules.',
        'Integrated PayHere payment engine with real-time student wallet tracking, attendance analytics, and live Socket.IO chat.',
        'Authored automated end-to-end regression suites using Playwright ensuring high reliability before production deployment.',
      ],
      githubUrl: 'https://github.com/Dinojan9901',
    },
    {
      id: 'rag-finance',
      title: 'AI-Powered Financial Document Q&A (RAG)',
      tagline: 'Enterprise RAG pipeline with high-precision vector retrieval and evaluation benchmarks',
      period: 'Jan 2026 – May 2026',
      category: 'AI / ML',
      featured: true,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      stats: 'Hit@1 Retrieval = 1.000 | 84% Keyword Recovery',
      techStack: ['Python', 'FastAPI', 'Streamlit', 'ChromaDB', 'Sentence-Transformers', 'Docker'],
      bullets: [
        'Engineered an end-to-end RAG system for dense financial reports achieving Hit@1 retrieval score of 1.000 and 84% gold keyword recovery vs <1% for ungrounded LLMs.',
        'Built interactive Streamlit and FastAPI microservices containerized with Docker for rapid document ingestion and hybrid dense-sparse vector querying.',
      ],
      githubUrl: 'https://github.com/Dinojan9901',
    },
    {
      id: 'quickdeliver',
      title: 'QuickDeliver – Cloud-Native Food Delivery Platform',
      tagline: 'Microservices architecture with Nginx gateway load balancing and RabbitMQ messaging',
      period: 'Jan 2026 – Apr 2026',
      category: 'Cloud & DevOps',
      featured: true,
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
      stats: 'Asynchronous Event-Driven Architecture',
      techStack: ['Docker', 'Nginx', 'Node.js', 'Express', 'RabbitMQ', 'GitHub Actions', 'Postman'],
      bullets: [
        'Built a microservices architecture containerized via Docker with Nginx API gateway round-robin load balancing and RabbitMQ asynchronous messaging queues.',
        'Created automated GitHub Actions CI/CD workflows executing integration and smoke test suites on pull requests.',
      ],
      githubUrl: 'https://github.com/Dinojan9901',
    },
    {
      id: 'mediman',
      title: 'MediMan – Telemedicine Healthcare Platform',
      tagline: 'Full-stack telemedicine admin dashboard with AWS S3 and automated CI/CD SSH deployment',
      period: 'May 2025 – Mar 2026',
      category: 'Full-Stack',
      featured: true,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      stats: 'SSH Automated Production CD',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'AWS S3', 'AWS CloudWatch', 'GitHub Actions'],
      bullets: [
        'Built telemedicine dashboard supporting doctor onboarding, appointment scheduling, patient records, and prescription uploads.',
        'Architected automated CI/CD pipeline deploying updates via SSH to production with Nginx reverse proxy and CloudWatch logging.',
      ],
      githubUrl: 'https://github.com/Dinojan9901',
    },
    {
      id: 'autograde-pro',
      title: 'AutoGradePro – AI Automated Grading System',
      tagline: 'Published academic AI grading research with multi-format doc parsing and Ollama LLM',
      period: 'Jun 2024 – May 2025',
      category: 'Full-Stack',
      featured: true,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      stats: 'Published in Academic Sessions 2026',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Django', 'PostgreSQL', 'Ollama', 'AWS EC2'],
      bullets: [
        'Designed frontend in Next.js/TypeScript and connected to Django REST API for LLM-assisted short answer grading.',
        'Integrated parsing for Word, PDF, and TXT files, deployed on AWS EC2 with RDS database.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/AutoGradePro_Client',
    },
    {
      id: 'library-system',
      title: 'Library Management System (DevOps/IaC)',
      tagline: 'Containerized MERN with Jenkins automated CI/CD, Terraform, and Ansible on AWS',
      period: 'Dec 2024 – Apr 2025',
      category: 'Cloud & DevOps',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
      techStack: ['Docker Compose', 'Jenkins', 'Terraform', 'Ansible', 'AWS EC2', 'MERN Stack'],
      bullets: [
        'Provisioned cloud infrastructure on AWS EC2 using Terraform IaC and automated server configuration with Ansible.',
        'Built Jenkins CI/CD pipeline triggered via GitHub webhooks with automated Docker Compose container builds.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Library_Management',
    },
    {
      id: 'ecg-classification',
      title: 'ECG Arrhythmia Image Classification (CNN)',
      tagline: 'Deep convolutional neural network trained on MIT-BIH and PTB diagnostic datasets',
      period: 'Dec 2024 – Apr 2025',
      category: 'AI / ML',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
      techStack: ['Python', 'TensorFlow', 'CNN', 'Transfer Learning', 'Scikit-learn', 'NumPy'],
      bullets: [
        'Developed deep convolutional neural network for ECG arrhythmia detection using MIT-BIH and PTB datasets.',
        'Engineered signal-to-spectrogram preprocessing pipeline and achieved high classification accuracy with transfer learning.',
      ],
      githubUrl: 'https://github.com/Dinojan9901',
    },
    {
      id: 'ai-assistant',
      title: 'Personal AI Assistant Web App',
      tagline: 'Conversational assistant with OpenAI API, JWT authentication, and persistent memory',
      period: 'Apr 2025 – May 2025',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'JWT'],
      bullets: [
        'Built interactive AI assistant with natural language task execution, smart reminders, and context memory.',
        'Implemented JWT authentication, secure session handling, and MongoDB conversation storage.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/AI_Assistant_App',
    },
    {
      id: 'healthcare-app',
      title: 'Healthcare Mobile Application',
      tagline: 'Cross-platform Flutter application with Firebase real-time database and auth',
      period: 'Jun 2024 – Nov 2024',
      category: 'Mobile & Systems',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      techStack: ['Flutter', 'Dart', 'Firebase', 'C++', 'Swift'],
      bullets: [
        'Designed mobile UI for doctor discovery, patient medical record tracking, and real-time appointment booking.',
        'Integrated Firebase Authentication, Firestore, and Cloud Messaging for instant notifications.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Healthcare_Mobile_Application',
    },
    {
      id: 'shift-tracker',
      title: 'Employee Shift Tracker (IaC)',
      tagline: 'MERN stack application deployed to Render via render.yaml declarative IaC',
      period: 'Apr 2025 – May 2025',
      category: 'Cloud & DevOps',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      techStack: ['MERN Stack', 'Render', 'render.yaml IaC', 'Git', 'Environment Config'],
      bullets: [
        'Deployed shift tracking platform with declarative `render.yaml` infrastructure-as-code and environment secrets management.',
        'Integrated automated branch preview environments for continuous testing.',
      ],
      githubUrl: 'https://github.com/Dinojan9901',
    },
    {
      id: 'file-sharing',
      title: 'Multithreaded Socket File Sharing System',
      tagline: 'Concurrent client-server file transmission in Java with GUI and packet verification',
      period: 'Dec 2024 – Feb 2025',
      category: 'Mobile & Systems',
      image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=800&q=80',
      techStack: ['Java', 'Sockets', 'Multithreading', 'Java Swing', 'TCP/IP'],
      bullets: [
        'Implemented concurrent multithreaded server handling simultaneous client file transfers over TCP sockets.',
        'Engineered error-checking checksums and a Java Swing user interface.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/File_Sharing_App',
    },
  ] as Project[],

  skillGroups: [
    {
      category: 'Programming & Web',
      icon: 'Code2',
      skills: [
        { name: 'TypeScript', level: 'Advanced', hot: true },
        { name: 'JavaScript (ES6+)', level: 'Expert', hot: true },
        { name: 'Python', level: 'Advanced', hot: true },
        { name: 'React.js', level: 'Advanced', hot: true },
        { name: 'Next.js (App Router)', level: 'Advanced', hot: true },
        { name: 'Node.js / Express', level: 'Advanced', hot: true },
        { name: 'FastAPI', level: 'Proficient' },
        { name: 'Django', level: 'Proficient' },
        { name: 'C++', level: 'Proficient' },
        { name: 'Java', level: 'Proficient' },
        { name: 'HTML5 & CSS3', level: 'Expert' },
      ],
    },
    {
      category: 'AI / ML & LLM Engineering',
      icon: 'Brain',
      skills: [
        { name: 'LLM Fine-Tuning (QLoRA)', level: 'Advanced', hot: true },
        { name: 'RAG Pipelines', level: 'Advanced', hot: true },
        { name: 'ChromaDB / Vector Search', level: 'Advanced', hot: true },
        { name: 'Ollama & Qwen2.5-7B', level: 'Advanced', hot: true },
        { name: 'TensorFlow / PyTorch', level: 'Proficient' },
        { name: 'Scikit-learn', level: 'Advanced' },
        { name: 'Sentence-Transformers', level: 'Advanced' },
        { name: 'OpenAI & Groq APIs', level: 'Advanced' },
        { name: 'Hyperledger Fabric', level: 'Proficient' },
      ],
    },
    {
      category: 'DevOps, Cloud & Infrastructure',
      icon: 'Cloud',
      skills: [
        { name: 'Docker & Docker Compose', level: 'Advanced', hot: true },
        { name: 'CI/CD (GitHub Actions)', level: 'Advanced', hot: true },
        { name: 'Jenkins', level: 'Proficient' },
        { name: 'Nginx (Reverse Proxy & Load Balancing)', level: 'Advanced', hot: true },
        { name: 'Terraform & Ansible (IaC)', level: 'Proficient' },
        { name: 'AWS (EC2, S3, RDS, CloudWatch)', level: 'Proficient', hot: true },
        { name: 'Render & Vercel', level: 'Advanced' },
        { name: 'Linux / Bash Scripting', level: 'Advanced' },
      ],
    },
    {
      category: 'QA, Automation & Databases',
      icon: 'CheckCircle2',
      skills: [
        { name: 'Playwright (E2E Automation)', level: 'Advanced', hot: true },
        { name: 'Postman (API Testing & Assertions)', level: 'Expert', hot: true },
        { name: 'MongoDB', level: 'Advanced' },
        { name: 'PostgreSQL & MySQL', level: 'Advanced' },
        { name: 'Regression & Integration Testing', level: 'Expert' },
        { name: 'UAT & Smoke Testing', level: 'Advanced' },
        { name: 'JIRA & ClickUp', level: 'Proficient' },
        { name: 'Git & GitHub Workflows', level: 'Expert' },
      ],
    },
  ] as SkillGroup[],

  softSkills: [
    'Time Management & Workload Balancing',
    'Agile / Scrum Collaboration',
    'Technical Communication & Mentorship',
    'Root-Cause Problem Solving',
    'Goal-Oriented Execution',
    'Adaptability to Emerging Tech Stacks',
  ],

  languages: [
    { name: 'English', proficiency: 'Professional / Fluent' },
    { name: 'Tamil', proficiency: 'Native' },
    { name: 'Sinhala', proficiency: 'Basic' },
  ],

  education: [
    {
      degree: 'BSc.Eng (Honours) in Computer Engineering',
      institution: 'Faculty of Engineering, University of Ruhuna, Galle, Sri Lanka',
      period: 'Mar 2022 – Nov 2027 (Expected)',
      details: [
        'Relevant Coursework: Data Structures and Algorithms, Software Engineering Principles, Object-Oriented Design Patterns, Cloud Computing, Operating Systems, Database Systems, Network Programming, High Performance Computing.',
        'Completed extensive Soft Skill Development (2022–2024).',
      ],
    },
    {
      degree: 'GCE Advanced Level (Physical Science Stream)',
      institution: 'V/Vavuniya Tamil Madhya Maha Vidyalayam',
      period: 'Completed Aug 2018',
      details: ['Combined Mathematics, Physics, Chemistry'],
    },
  ] as Education[],

  volunteering: [
    {
      role: 'Demonstrator – Software Engineering Zone',
      organization: 'ReXtro 2025 Silver Jubilee Engineering Exhibition, Faculty of Engineering, Univ. of Ruhuna',
      period: 'Dec 2025',
      description: 'Demonstrated software engineering systems and mentored visiting high school and university delegates.',
    },
    {
      role: 'Member',
      organization: 'IESL (Institution of Engineers, Sri Lanka), Galle Branch',
      period: 'Apr 2024 – Present',
      description: 'Active participant in engineering professional development and networking workshops.',
    },
    {
      role: 'Member',
      organization: 'IEEE Student Branch, University of Ruhuna',
      period: 'Sep 2023 – Dec 2024',
      description: 'Organized and coordinated technical hackathons, guest lectures, and student coding events.',
    },
    {
      role: 'Treasurer',
      organization: "All University Students' Development Association, Vavuniya",
      period: 'May 2021 – Apr 2024',
      description: 'Managed organization finances, budgeting, accounting records, and youth welfare programs.',
    },
    {
      role: 'Senior Prefect',
      organization: 'V/Vavuniya Tamil Madhya Maha Vidyalayam',
      period: 'July 2017 – July 2018',
      description: 'Led the student council body and coordinated school-wide disciplinary & academic activities.',
    },
  ] as VolunteerRole[],

  achievements: [
    {
      title: 'IEEE Xtreme 18.0 (2024)',
      event: 'Global 24-Hour Competitive Programming Contest',
      year: '2024',
      description: 'Competed in a 3-member team solving hard algorithmic and mathematical problems in a continuous 24-hour sprint.',
      badge: 'Global Contest',
    },
    {
      title: 'IEEE INSL Southern Provincial Competition',
      event: 'IEEE Sri Lanka Section',
      year: 'Oct 2024',
      description: 'Competed in provincial innovation and tech startup challenge.',
      badge: 'Provincial Finalist',
    },
    {
      title: 'FIDE 100 Commemorative Chess Event (Open Category)',
      event: 'Galle Division Chess Championship',
      year: '2024',
      description: 'Competed in open category celebrating the international FIDE centenary.',
      badge: 'FIDE Rated',
    },
    {
      title: '3rd Runner-Up in Provincial Level Under-19 Chess',
      event: 'Northern Provincial School Games',
      year: '2015 & 2016',
      description: 'Awarded 3rd runner-up honors in competitive provincial inter-school chess championships.',
      badge: '3rd Runner-Up',
    },
  ] as Achievement[],

  referees: [
    {
      name: 'Dr. Kushan Sudheera',
      title: 'Senior Lecturer',
      department: 'Department of Electrical and Information Engineering',
      institution: 'Faculty of Engineering, University of Ruhuna, Sri Lanka',
      email: 'kushan@eie.ruh.ac.lk',
      phone: '+94 719693164',
    },
    {
      name: 'Dr. Nadeesha Sandamali',
      title: 'Senior Lecturer',
      department: 'Department of Electrical and Information Engineering',
      institution: 'Faculty of Engineering, University of Ruhuna, Sri Lanka',
      email: 'nadeesha@eie.ruh.ac.lk',
      phone: '+94 719693318',
    },
  ] as Referee[],
};
