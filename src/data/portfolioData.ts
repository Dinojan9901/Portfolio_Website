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
}

export const portfolioData = {
  personal: {
    name: 'Dinojan Vivekanantharasa',
    shortName: 'Dinojan V.',
    title: 'Full-Stack Developer & AI / DevOps Engineer',
    currentStatus: 'Computer Engineering Graduate, University of Ruhuna',
    bio: 'A fresh Computer Engineering graduate with a year of professional full-stack experience building and running two live production platforms. I work across React/TypeScript frontends, Node.js APIs, LLM and RAG systems, event-driven data pipelines, and the CI/CD that ships them, owning features end to end within Agile teams.',
    email: 'dinojv21@gmail.com',
    phone: '+94 779703874',
    location: 'Vavuniya, Sri Lanka',
    github: 'https://github.com/Dinojan9901',
    linkedin: 'https://linkedin.com/in/dinojan',
    stats: [
      { label: 'Year of Professional Experience', value: '1' },
      { label: 'Live Production Platforms', value: '2' },
      { label: 'Academic Publication', value: '1' },
      { label: 'RAG Retrieval Hit@1', value: '1.000' },
    ],
  },

  cvTracks: [
    {
      id: 'software',
      name: 'Software Engineering CV',
      role: 'Software / Full-Stack Engineer',
      tagline: 'Production web platforms, REST APIs, real-time features, and event-driven microservices.',
      fileName: 'Dinojan_Vivekanantharasa_Software.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_Software.pdf',
      iconName: 'Code',
      badgeColor: '#3b82f6',
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning CV',
      role: 'AI / ML Engineer',
      tagline: 'LLM and RAG pipelines, QLoRA fine-tuning, and rigorous evaluation against baselines.',
      fileName: 'Dinojan_Vivekanantharasa_AI.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_AI.pdf',
      iconName: 'Brain',
      badgeColor: '#8b5cf6',
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud CV',
      role: 'DevOps / Cloud Engineer',
      tagline: 'Docker, CI/CD with GitHub Actions and Jenkins, Terraform and Ansible, AWS, and streaming pipelines with Prometheus and Grafana.',
      fileName: 'Dinojan_Vivekanantharasa_DevOps.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_DevOps.pdf',
      iconName: 'Cloud',
      badgeColor: '#06b6d4',
    },
    {
      id: 'combined',
      name: 'Combined CV',
      role: 'Full-Stack + AI + DevOps',
      tagline: 'One overview across full-stack development, AI/ML, data pipelines, and cloud infrastructure.',
      fileName: 'Dinojan_Vivekanantharasa_Combined.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_Combined.pdf',
      iconName: 'Layers',
      badgeColor: '#f59e0b',
    },
    {
      id: 'qa',
      name: 'QA & Testing CV',
      role: 'QA / Software Test Engineer',
      tagline: 'Test planning, Postman API testing, RBAC verification, regression testing, and evaluation-driven projects.',
      fileName: 'Dinojan_Vivekanantharasa_QA.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_QA.pdf',
      iconName: 'ShieldCheck',
      badgeColor: '#10b981',
    },
    {
      id: 'embedded',
      name: 'Embedded Systems CV',
      role: 'Embedded / Hardware Engineer',
      tagline: 'Microcontroller control systems, GSM communication, analog circuit design, and performance-critical C++.',
      fileName: 'Dinojan_Vivekanantharasa_Embedded.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_Embedded.pdf',
      iconName: 'Cpu',
      badgeColor: '#ef4444',
    },
    {
      id: 'networking',
      name: 'Networking & Infrastructure CV',
      role: 'Network / IT Infrastructure Engineer',
      tagline: 'Linux and AWS production systems, Nginx reverse proxies and load balancing, and system monitoring.',
      fileName: 'Dinojan_Vivekanantharasa_Networking.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_Networking.pdf',
      iconName: 'Network',
      badgeColor: '#14b8a6',
    },
  ] as CVTrack[],

  experiences: [
    {
      role: 'Full Stack Developer',
      company: 'Yarl Ventures (PVT) Ltd',
      location: 'Jaffna, Sri Lanka',
      period: 'Dec 2025 - May 2026',
      type: 'Full-time',
      description: [
        'Built EDUS LMS end to end (React 19, TypeScript, Node.js, MongoDB, Redis): 4-role RBAC, attendance, homework with S3 uploads, and Socket.IO real-time chat.',
        'Delivered real-time notifications (Socket.IO, Firebase push) and PayHere payments with student wallets.',
        'Continued owning the MediMan telemedicine platform, shipping features and managing releases through GitHub Actions CI/CD behind an Nginx reverse proxy.',
      ],
      technologies: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Socket.IO', 'AWS S3', 'PayHere', 'GitHub Actions'],
    },
    {
      role: 'Full Stack Developer Intern',
      company: 'Yarl Ventures (PVT) Ltd',
      location: 'Jaffna, Sri Lanka',
      period: 'May 2025 - Nov 2025',
      type: 'Internship',
      description: [
        'Built the MediMan admin panel (React 19, TypeScript, Ant Design, Node.js, MongoDB) for managing doctors, clinics, users, appointments, and transactions.',
        'Added server-side pagination, search, and filtering, and reduced API payloads through selective field projection on medical-record and consultation endpoints.',
        'Integrated Nodemailer email, Twilio SMS/OTP, and Firebase topic push; built wallet withdrawal and account-deletion approval workflows with role-based access.',
        'Tested APIs with Postman collections and traced production issues through AWS CloudWatch logs.',
      ],
      technologies: ['React 19', 'TypeScript', 'Ant Design', 'Node.js', 'MongoDB', 'Twilio', 'Firebase', 'Postman', 'AWS CloudWatch'],
    },
  ] as WorkExperience[],

  publication: {
    title: 'AutoGradePro: An Automated Grading System for Short-Answer Assessments Using Rule-Based Methods and Large Language Models',
    authors: ['G. S. J. Venujan', 'M. F. A. Munsif', 'V. Dinojan', 'T. Jegan', 'G. G. N. Sandamali'],
    venue: 'Proceedings of Academic Sessions 2026, University of Ruhuna, Sri Lanka',
    date: 'March 2026',
    identifier: 'Abstract ABS-064 | ISSN 2362-0412',
    description: 'A grading platform that pairs rule-based checks with local LLM semantic matching (Ollama), so short answers are scored on meaning rather than exact keywords. Accepts TXT, DOCX, and PDF submissions.',
    link: 'https://github.com/Dinojan9901/AutoGradePro',
    highlightTags: ['LLM Semantic Matching', 'Rule-Based Checks', 'Next.js', 'Django', 'Ollama'],
  } as Publication,

  projects: [
    {
      id: 'traces',
      title: 'TRACES - Post-Quantum Vehicular Network Defense',
      tagline: 'Three-stage LLM anomaly detection cascade with post-quantum cryptography and zero-trust governance',
      period: 'Dec 2025 - Sep 2026',
      category: 'AI / ML',
      featured: true,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      stats: '200-Vehicle NS-3 Simulation',
      techStack: ['Python', 'NS-3', 'Qwen2.5-7B', 'QLoRA', 'Hyperledger Fabric', 'ML-KEM / Falcon'],
      bullets: [
        'Designed a three-stage LLM anomaly-detection cascade using a QLoRA fine-tuned Qwen2.5-7B, validated on a 200-vehicle NS-3 vehicular network simulation.',
        'Goes beyond classical VANET security by pairing post-quantum cryptography (ML-KEM-1024, Falcon-1024) with Hyperledger Fabric zero-trust governance.',
      ],
    },
    {
      id: 'fleet-lambda',
      title: 'Real-Time Fleet Operations Platform',
      tagline: 'Lambda architecture: real-time streaming view reconciled against an exact batch layer',
      period: 'May 2026 - Aug 2026',
      category: 'Cloud & DevOps',
      featured: true,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      stats: '12 Vehicles | ~6 Events/s Streamed',
      techStack: ['Kafka', 'Spark Structured Streaming', 'Airflow', 'FastAPI', 'Prometheus', 'Grafana', 'Docker Compose'],
      bullets: [
        'Streams telemetry from 12 simulated vehicles through Kafka into a Spark Structured Streaming speed layer and a Parquet data lake, served through a FastAPI API.',
        'An Airflow batch layer reconciles daily costs exactly against an external cost file, correcting the approximate real-time view; Prometheus alert rules and Grafana track pipeline health.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/miniproject-fleet-lambda',
    },
    {
      id: 'rag-finance',
      title: 'AI-Powered Financial Document Q&A (RAG)',
      tagline: 'Grounded answers over 10-K and SEC filings, each with a page-level citation',
      period: 'Jan 2026 - May 2026',
      category: 'AI / ML',
      featured: true,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      stats: 'Hit@1 = 1.000 | 84% vs <1% Keyword Recovery',
      techStack: ['Python', 'FastAPI', 'Streamlit', 'ChromaDB', 'Sentence-Transformers', 'Llama 3.3 70B', 'Docker'],
      bullets: [
        'Grounds Llama 3.3 70B in 10-K, earnings, and SEC PDFs through ChromaDB retrieval (800-token chunks, MiniLM embeddings), answering with page-level citations.',
        'Evaluated on financial-qa-10K: Hit@1 retrieval of 1.000 and 84% gold-keyword recovery vs under 1% for an ungrounded LLM; deployed live with a free local fallback.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Financial-QA-System',
      liveUrl: 'https://financial-app-system-bcffpkdt88dxp8krfjg7pd.streamlit.app/',
    },
    {
      id: 'quickdeliver',
      title: 'QuickDeliver - Cloud-Native Food Delivery Platform',
      tagline: 'Microservices behind an Nginx gateway with RabbitMQ-decoupled notifications',
      period: 'Jan 2026 - Apr 2026',
      category: 'Cloud & DevOps',
      featured: true,
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
      stats: 'Horizontally Scaled Order Service',
      techStack: ['Node.js', 'Express', 'MongoDB', 'RabbitMQ', 'Nginx', 'Docker', 'GitHub Actions'],
      bullets: [
        'Split the system into auth, order, and notification microservices behind an Nginx API gateway that load-balances horizontally scaled order-service replicas.',
        'Decoupled notifications through RabbitMQ so order placement never blocks on downstream services; JWT auth, per-service databases, and GitHub Actions CI/CD.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/delivery-system',
    },
    {
      id: 'autograde-pro',
      title: 'AutoGradePro - AI Automated Grading System',
      tagline: 'Published grading platform that scores short answers on meaning, not keywords',
      period: 'Jun 2024 - May 2025',
      category: 'AI / ML',
      featured: true,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      stats: 'Published, Academic Sessions 2026',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Django', 'PostgreSQL', 'Ollama'],
      bullets: [
        'Hybrid grader pairing rule-based checks with local LLM semantic matching (Ollama), so short answers are scored on meaning rather than exact keywords.',
        'Built the responsive Next.js/TypeScript frontend, supporting TXT, DOCX, and PDF submissions with role-based access.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/AutoGradePro',
    },
    {
      id: 'edus-lms',
      title: 'EDUS LMS - Learning Management System',
      tagline: 'Production LMS with 4-role RBAC, real-time chat, and payments (built at Yarl Ventures)',
      period: 'Apr 2026 - May 2026',
      category: 'Full-Stack',
      featured: true,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      stats: '103 User Actions Across 19 Modules',
      techStack: ['React 19', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'Socket.IO', 'AWS S3', 'PayHere'],
      bullets: [
        'Built a production LMS with 4-role RBAC verified across 103 user actions in 19 modules, plus attendance and homework workflows with S3 storage.',
        'Delivered Socket.IO real-time chat, a 3-surface notification system, and PayHere payments with student wallets.',
      ],
      liveUrl: 'https://lms.edustutor.com/',
    },
    {
      id: 'mediman',
      title: 'MediMan - Telemedicine Admin Platform',
      tagline: 'Admin panel for a live telemedicine platform (built at Yarl Ventures)',
      period: 'May 2025 - Mar 2026',
      category: 'Full-Stack',
      featured: true,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      stats: 'Live in Production',
      techStack: ['React 19', 'TypeScript', 'Ant Design', 'Node.js', 'MongoDB', 'Twilio', 'Firebase', 'AWS'],
      bullets: [
        'Built admin modules for doctors, clinics, users, appointments, and wallets, with server-side pagination and field projection to cut API payload sizes.',
        'Integrated Twilio SMS/OTP, Nodemailer email, and Firebase push, and shipped releases through GitHub Actions CI/CD behind an Nginx reverse proxy.',
      ],
      liveUrl: 'https://mediman.life/',
    },
    {
      id: 'hpc-bfs',
      title: 'Parallel Graph Processing (HPC)',
      tagline: 'The same BFS in OpenMP, MPI, and CUDA, benchmarked against a serial baseline',
      period: 'Dec 2025 - Apr 2026',
      category: 'Mobile & Systems',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      stats: '89.4% Parallel Fraction',
      techStack: ['C++17', 'OpenMP', 'MPI', 'CUDA'],
      bullets: [
        'Implemented parallel BFS in OpenMP (atomic CAS, thread-local frontiers), MPI (1D partitioning, Allgatherv), and CUDA (CSR), all matching a serial baseline exactly.',
        'Amdahl analysis gave an 89.4% parallel fraction and a 9.43x CPU speedup ceiling, with gains emerging above 100k vertices.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/HPC-BFS-Report',
    },
    {
      id: 'library-system',
      title: 'Library Management System (DevOps/IaC)',
      tagline: 'Commit-to-cloud automation for a containerized MERN stack on AWS',
      period: 'Dec 2024 - Apr 2025',
      category: 'Cloud & DevOps',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
      techStack: ['Docker Compose', 'Jenkins', 'Terraform', 'Ansible', 'AWS EC2', 'MERN Stack'],
      bullets: [
        'GitHub webhooks trigger a Jenkins pipeline that builds Docker images and redeploys the containerized MERN stack to AWS EC2.',
        'Provisioned EC2 with Terraform and configured hosts with Ansible, making the whole environment reproducible from code.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Library_Management',
    },
    {
      id: 'ecg-classification',
      title: 'ECG Image Classification (CNN)',
      tagline: 'Transfer-learning CNN trained on the MIT-BIH and PTB datasets',
      period: 'Dec 2024 - Apr 2025',
      category: 'AI / ML',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
      techStack: ['Python', 'TensorFlow', 'CNN', 'Transfer Learning'],
      bullets: [
        'Developed a CNN for ECG classification on the MIT-BIH and PTB datasets using transfer learning.',
        'Built the full pipeline from preprocessing through training to evaluation.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/ECG_Image_Classification',
    },
    {
      id: 'gsm-smart-home',
      title: 'GSM-Based Smart Home Automation',
      tagline: 'Microcontroller control over the cellular network, with no Wi-Fi needed',
      period: 'Jun 2024 - Nov 2024',
      category: 'Mobile & Systems',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      techStack: ['Arduino', 'C++', 'GSM (AT Commands)', 'Sensors', 'Relays'],
      bullets: [
        'Built a microcontroller control system that monitors and switches the home over the cellular network via GSM, so it works without Wi-Fi or internet access.',
        'Integrated temperature, gas, and LDR sensors with calibration routines, relay switching, and LCD output.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Smart_Home_Automation_System',
    },
    {
      id: 'ai-assistant',
      title: 'Personal AI Assistant Web App',
      tagline: 'Full-stack conversational assistant with OpenAI and persistent chat history',
      period: 'Apr 2025 - May 2025',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'JWT'],
      bullets: [
        'Built a full-stack conversational assistant with OpenAI integration and persistent chat history stored in MongoDB.',
        'Implemented JWT authentication and secure session handling.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/AI_Assistant_App',
    },
    {
      id: 'healthcare-app',
      title: 'Healthcare Mobile Application',
      tagline: 'Cross-platform Flutter app with Firebase authentication and real-time data',
      period: 'Jun 2024 - Nov 2024',
      category: 'Mobile & Systems',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      techStack: ['Flutter', 'Dart', 'Firebase', 'C++', 'Swift'],
      bullets: [
        'Designed UI screens for login, dashboards, appointment scheduling, and patient history.',
        'Integrated Firebase for real-time database synchronisation and authentication.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Healthcare_Mobile_Application',
    },
    {
      id: 'shift-tracker',
      title: 'Employee Shift Tracker (IaC)',
      tagline: 'MERN app deployed to Render with declarative render.yaml infrastructure-as-code',
      period: 'Apr 2025 - May 2025',
      category: 'Cloud & DevOps',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      techStack: ['MERN Stack', 'Render', 'render.yaml IaC', 'Git'],
      bullets: [
        'Deployed a MERN stack to Render using render.yaml infrastructure-as-code with Git-based deployment and secrets management.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Employee_Shift_Tracker',
      liveUrl: 'https://employeeshift.onrender.com',
    },
    {
      id: 'file-sharing',
      title: 'Multithreaded Socket File Sharing System',
      tagline: 'Concurrent client-server file transfer in Java with a Swing GUI',
      period: 'Dec 2024 - Feb 2025',
      category: 'Mobile & Systems',
      image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=800&q=80',
      techStack: ['Java', 'Sockets', 'Multithreading', 'Java Swing', 'TCP/IP'],
      bullets: [
        'Implemented a multithreaded server that handles simultaneous client file transfers over TCP sockets.',
        'Built the desktop client interface with Java Swing.',
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
        { name: 'JavaScript (ES6+)', level: 'Advanced', hot: true },
        { name: 'Python', level: 'Advanced', hot: true },
        { name: 'React.js', level: 'Advanced', hot: true },
        { name: 'Next.js', level: 'Advanced', hot: true },
        { name: 'Node.js / Express', level: 'Advanced', hot: true },
        { name: 'Socket.IO', level: 'Proficient' },
        { name: 'FastAPI', level: 'Proficient' },
        { name: 'Django', level: 'Proficient' },
        { name: 'C++', level: 'Proficient' },
        { name: 'Java', level: 'Proficient' },
      ],
    },
    {
      category: 'AI / ML & Data',
      icon: 'Brain',
      skills: [
        { name: 'LLM Fine-Tuning (QLoRA)', level: 'Advanced', hot: true },
        { name: 'RAG Pipelines', level: 'Advanced', hot: true },
        { name: 'ChromaDB / Vector Search', level: 'Advanced', hot: true },
        { name: 'Kafka & Spark Streaming', level: 'Proficient', hot: true },
        { name: 'Airflow', level: 'Proficient' },
        { name: 'TensorFlow / PyTorch', level: 'Proficient' },
        { name: 'Scikit-learn', level: 'Proficient' },
        { name: 'Sentence-Transformers', level: 'Proficient' },
        { name: 'Ollama, OpenAI & Groq APIs', level: 'Proficient' },
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
        { name: 'Prometheus & Grafana', level: 'Proficient' },
        { name: 'RabbitMQ', level: 'Proficient' },
        { name: 'Linux / Bash', level: 'Proficient' },
      ],
    },
    {
      category: 'QA, Testing & Databases',
      icon: 'CheckCircle2',
      skills: [
        { name: 'Postman (API Testing)', level: 'Advanced', hot: true },
        { name: 'Playwright', level: 'Proficient' },
        { name: 'Regression & Integration Testing', level: 'Advanced' },
        { name: 'MongoDB', level: 'Advanced', hot: true },
        { name: 'PostgreSQL & MySQL', level: 'Proficient' },
        { name: 'Redis', level: 'Proficient' },
        { name: 'JIRA & ClickUp', level: 'Proficient' },
        { name: 'Git & GitHub Workflows', level: 'Advanced' },
      ],
    },
  ] as SkillGroup[],

  softSkills: [
    'Time Management & Workload Balancing',
    'Agile / Scrum Collaboration',
    'Clear Technical Communication',
    'Root-Cause Problem Solving',
    'Goal-Oriented Execution',
    'Adaptability to New Tech Stacks',
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
      period: 'Mar 2022 - Sep 2026',
      details: [
        'Relevant Coursework: Data Structures and Algorithms, Software Engineering Principles, Object-Oriented Design Patterns, Cloud Computing, Operating Systems, Database Systems, Network Programming, High Performance Computing.',
        'Soft Skill Development (2022 - 2024).',
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
      role: 'Demonstrator - Software Engineering Zone',
      organization: 'ReXtro 2025 Silver Jubilee Engineering Exhibition, Faculty of Engineering, Univ. of Ruhuna',
      period: 'Dec 2025',
      description: 'Demonstrated software engineering projects to exhibition visitors.',
    },
    {
      role: 'Member',
      organization: 'IESL (Institution of Engineers, Sri Lanka), Galle Branch',
      period: 'Apr 2024 - Present',
    },
    {
      role: 'Member',
      organization: 'IEEE Student Branch, University of Ruhuna',
      period: 'Sep 2023 - Dec 2024',
    },
    {
      role: 'Treasurer',
      organization: "All University Students' Development Association, Vavuniya",
      period: 'May 2021 - Apr 2024',
      description: "Managed the association's finances and accounting records.",
    },
    {
      role: 'Senior Prefect',
      organization: 'V/Vavuniya Tamil Madhya Maha Vidyalayam',
      period: 'Jul 2017 - Jul 2018',
    },
  ] as VolunteerRole[],

  achievements: [
    {
      title: 'IEEE Xtreme 18.0 (2024)',
      event: 'Global 24-Hour Competitive Programming Contest',
      year: '2024',
      description: 'Competed in a 3-member team solving algorithmic problems over a continuous 24-hour contest.',
      badge: 'Global Contest',
    },
    {
      title: 'IEEE INSL Southern Provincial Competition',
      event: 'IEEE Sri Lanka Section',
      year: 'Oct 2024',
      description: 'Competed in the IEEE INSL Southern Provincial Competition on 30 October 2024.',
      badge: 'Provincial',
    },
  ] as Achievement[],

  referees: [
    {
      name: 'Dr. Kushan Sudheera',
      title: 'Senior Lecturer',
      department: 'Department of Electrical and Information Engineering',
      institution: 'Faculty of Engineering, University of Ruhuna, Sri Lanka',
    },
    {
      name: 'Dr. Nadeesha Sandamali',
      title: 'Senior Lecturer',
      department: 'Department of Electrical and Information Engineering',
      institution: 'Faculty of Engineering, University of Ruhuna, Sri Lanka',
    },
  ] as Referee[],
};
