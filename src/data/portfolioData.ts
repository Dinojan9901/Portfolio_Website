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
  modelUrl?: string;
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
    bio: 'A Computer Engineering graduate with a year of professional full-stack experience building features for two live production platforms. I work across React/TypeScript frontends, Node.js APIs, LLM and RAG systems, event-driven data pipelines, and the CI/CD that ships them, delivering features within Agile teams.',
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
      tagline: 'Production web platforms, REST APIs, Next.js and Spring Boot apps, real-time features, and event-driven microservices.',
      fileName: 'Dinojan_Vivekanantharasa_Software.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_Software.pdf',
      iconName: 'Code',
      badgeColor: '#3b82f6',
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning CV',
      role: 'AI / ML Engineer',
      tagline: 'LLM agents and RAG pipelines, QLoRA fine-tuning, evaluation against baselines, and MLOps with MLflow and Kubernetes (kind).',
      fileName: 'Dinojan_Vivekanantharasa_AI.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_AI.pdf',
      iconName: 'Brain',
      badgeColor: '#8b5cf6',
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud CV',
      role: 'DevOps / Cloud Engineer',
      tagline: 'Docker and Kubernetes (kind), CI/CD with GitHub Actions and Jenkins, Terraform and Ansible, AWS, and streaming pipelines with Prometheus and Grafana.',
      fileName: 'Dinojan_Vivekanantharasa_DevOps.pdf',
      filePath: '/assets/Dinojan_Vivekanantharasa_DevOps.pdf',
      iconName: 'Cloud',
      badgeColor: '#06b6d4',
    },
    {
      id: 'combined',
      name: 'Combined CV',
      role: 'Full-Stack + AI + DevOps',
      tagline: 'One overview across full-stack development, AI/ML and MLOps, data pipelines, and cloud infrastructure.',
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
      tagline: 'Microcontroller control and safety systems, analog circuit design, and performance-critical C++.',
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
        'Built a read-only viewer-admin role across the MediMan telemedicine platform: backend permissions, route protection, and a role-based sidebar and dashboard.',
        'Added MediMan clinic management, visiting doctors linked to clinics, admin appointment rescheduling, bulk SMS/email, and withdrawal edits validated against wallet balances; maintained the GitHub Actions CI/CD pipeline behind an Nginx reverse proxy and ran its production releases.',
        'Contributed to EDUS LMS, a subscription platform with monthly billing: payments, wallets, chat, role-permission testing, and API response optimisation.',
      ],
      technologies: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Socket.IO', 'PayHere', 'GitHub Actions', 'Nginx'],
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
    venue: "Proceedings of the Vice Chancellor's Awards and Academic Sessions 2026, University of Ruhuna, Sri Lanka",
    date: 'March 2026',
    identifier: 'Peer-reviewed abstract ABS-064, p. 35 | ISSN 2362-0412',
    description: 'A grading platform that pairs rule-based checks with local LLM semantic matching (Ollama), so short answers are scored on meaning rather than exact keywords. Accepts TXT, PDF, DOCX, and XLSX submissions. Reported accuracy: 100% on single-word, 92.9% on list-type, 84.6% on numerical and 73.3% on short-phrase answers.',
    link: 'https://github.com/Dinojan9901/AutoGradePro_Client',
    highlightTags: ['LLM Semantic Matching', 'Rule-Based Checks', 'Next.js', 'Django', 'Ollama'],
  } as Publication,

  projects: [
    {
      id: 'larkway',
      title: 'Larkway Support Agent - Policy-Grounded AI Support',
      tagline: 'AI support agent grounded in contracts and policy, with a React + TypeScript frontend, a deterministic policy engine and an MCP server',
      period: 'Aug 2026 - Oct 2026',
      category: 'AI / ML',
      featured: true,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
      stats: '16/16 Live on Gemini & Groq | 156 Tests',
      techStack: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'Claude / Groq / Gemini APIs', 'Tool Calling', 'MCP', 'JWT', 'Vercel'],
      bullets: [
        'AI support agent with 9 tools serving a customer-facing agent and an internal operations console from one codebase, also served over MCP. Retrieval ranks sources by authority (signed contract > policy > docs > past tickets).',
        'A deterministic policy engine computes fees, credits and SLA deadlines, so the LLM never does the money maths. Passes 16/16 live on Gemini and Groq. React + TypeScript frontend with JWT login and server-side roles; 113 backend and 43 frontend tests.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/larkway-support-agent',
      liveUrl: 'https://larkway-support-agent.vercel.app',
    },
    {
      id: 'lendlot',
      title: 'LendLot - Rental Marketplace',
      tagline: 'Next.js 16 rental marketplace with double-booking blocked in the database',
      period: 'Oct 2026',
      category: 'Full-Stack',
      featured: true,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      stats: '152 Tests | Lighthouse 96-100',
      techStack: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL (Neon)', 'Prisma 7', 'Auth.js v5', 'Playwright', 'Upstash Redis', 'Vercel'],
      bullets: [
        'Rental marketplace built with Next.js 16 App Router and strict TypeScript: Server Components with search, filters and pagination in the URL, SEO-ready item pages, and an availability calendar.',
        'Blocks double-booking in the database: of 25 simultaneous requests for the same dates, only 1 is booked. 152 tests (unit, integration, Playwright with axe) run in CI.',
        'Security-hardened: CodeQL, Trivy and Dependabot in CI, CSP and HSTS headers, Upstash rate limiting with 429 responses, and a critical Next.js vulnerability patched (npm audit 7 to 0).',
      ],
      githubUrl: 'https://github.com/Dinojan9901/lendlot',
      liveUrl: 'https://lendlot.vercel.app',
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
        'Added a read-only viewer-admin role, appointment rescheduling, and bulk SMS/email; integrated Twilio, Nodemailer, and Firebase push. Maintained the GitHub Actions CI/CD pipeline and ran its production releases.',
      ],
      liveUrl: 'https://mediman.life/',
    },
    {
      id: 'llm-research-agents',
      title: 'LLM Financial Research Agents & QLoRA Fine-Tune',
      tagline: 'Multi-agent equity research system, plus a fine-tuned risk extractor published on Hugging Face',
      period: 'Sep 2026 - Oct 2026',
      category: 'AI / ML',
      featured: true,
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
      stats: 'Schema-Valid JSON 1/12 to 12/12 (Held-Out)',
      techStack: ['Python', 'LangChain', 'Groq API', 'Pydantic', 'Hugging Face Transformers', 'PEFT / QLoRA', 'TRL', 'Phi-3-mini'],
      bullets: [
        'Fine-tuned Phi-3-mini with QLoRA (4-bit) to extract financial risks as structured JSON: on 12 held-out examples, schema-valid output rose from 1/12 to 12/12 and ROUGE-L from 0.359 to 0.471. Published the adapter on Hugging Face.',
        'Multi-agent research system: a tool-calling agent with autonomous tool selection over 5 tools, and a two-agent pipeline with a typed Pydantic handoff and a critique loop.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/llm-financial-research-agents',
      modelUrl: 'https://huggingface.co/Dino21/financial-risk-extractor-phi3-qlora',
    },
    {
      id: 'portfolio-automation',
      title: 'Portfolio Website: GA4 Analytics & HubSpot Lead Import',
      tagline: 'This site, plus Python tools that report its GA4 data and import event leads into HubSpot',
      period: 'Aug 2026 - Oct 2026',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      stats: 'GA4 Live | HubSpot Tested on a Real Account',
      techStack: ['Next.js 14', 'TypeScript', 'GA4', 'Python', 'GA4 Data API', 'HubSpot CRM API', 'MCP', 'pytest'],
      bullets: [
        'This Next.js site sends 3 custom GA4 events (a contact-form key event, project clicks and CV clicks) with no personal data, and a Python GA4 Data API script builds a weekly week-on-week report.',
        'HubSpot lead import (CLI and MCP tool) cleans messy event-lead CSVs and batch-upserts contacts by email, so re-runs never duplicate; tested on a real HubSpot account. 99 pytest tests across both tools.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Portfolio_Website',
      liveUrl: 'https://dinojan-v.vercel.app',
    },
    {
      id: 'credit-default-mlops',
      title: 'Credit Default MLOps Pipeline',
      tagline: 'Train, register, serve and monitor a credit-default model, with a champion/challenger promotion gate',
      period: 'Oct 2026',
      category: 'AI / ML',
      featured: true,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      stats: 'Test ROC-AUC 0.79 | Drift 15/23 Flagged',
      techStack: ['Python', 'LightGBM', 'Optuna', 'MLflow', 'SHAP', 'FastAPI', 'Kubernetes (kind)', 'Evidently', 'GitHub Actions'],
      bullets: [
        'End-to-end MLOps pipeline for credit-default prediction: LightGBM tuned with Optuna (test ROC-AUC 0.79), tracked in MLflow, registered behind a champion/challenger promotion gate, and explained with SHAP.',
        'FastAPI service deployed to Kubernetes (kind) with probes and resource limits. Scheduled retraining only promotes a challenger that beats the champion, and Evidently flagged 15/23 features on a simulated downturn.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/credit-default-mlops',
    },
    {
      id: 'traces',
      title: 'TRACES - Post-Quantum Vehicular Network Defense',
      tagline: 'Three-stage LLM anomaly detection cascade with post-quantum cryptography and zero-trust governance',
      period: 'Dec 2025 - Sep 2026',
      category: 'AI / ML',
      featured: true,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      stats: '7 Attack Classes | 0.867 Macro-F1',
      techStack: ['Python', 'NS-3', 'Qwen2.5-7B', 'QLoRA', 'Hyperledger Fabric', 'ML-KEM / Falcon'],
      bullets: [
        'Designed a three-stage LLM anomaly-detection cascade using a QLoRA fine-tuned Qwen2.5-7B, validated on a 200-vehicle NS-3 vehicular network simulation. It detects 7 attack classes at 0.867 macro-F1 on held-out data, with a detector running in about 82 µs per window.',
        'Goes beyond classical VANET security by pairing post-quantum cryptography (ML-KEM-1024, Falcon-1024) with Hyperledger Fabric zero-trust governance.',
      ],
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
      id: 'mediconnect',
      title: 'MediConnect - Microservices Clinic Booking',
      tagline: 'Clinic booking on six services behind a rate-limited JWT gateway, with a payment saga',
      period: 'Jul 2026 - Oct 2026',
      category: 'Full-Stack',
      featured: true,
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80',
      stats: '6 Services | 69 End-to-End Checks in CI',
      techStack: ['Node.js', 'Express', 'MongoDB', 'RabbitMQ', 'Redis', 'Docker Compose', 'Nginx', 'React', 'GitHub Actions'],
      bullets: [
        'Designed and built a rate-limited JWT API gateway over six services (auth, booking, payment, records, notification, admin), each owning its database, plus a React UI for patients, doctors and admins.',
        'Payment saga over a transactional outbox to RabbitMQ: an unpaid hold expires and frees the slot, and a booking that cannot be confirmed is refunded. Atomic slot booking prevents double-booking.',
        'Redis caching for doctor search, Ed25519-signed e-prescriptions with public verification, and CI that starts 12 containers with 2 booking replicas and runs 69 end-to-end checks.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Clinic-Appointment-Booking-Platform',
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
        'Built the Nginx API gateway and load balancing, the RabbitMQ messaging, the GitHub Actions CI/CD, and Node.js service code for a cloud-native food delivery platform.',
        'The Nginx gateway load-balances horizontally scaled order-service replicas, while RabbitMQ decouples notifications so order placement never blocks on downstream services.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/delivery-system',
    },
    {
      id: 'task-manager',
      title: 'Full-Stack Task Manager (Spring Boot + React)',
      tagline: 'Layered Spring Boot REST API and a React 19 app, tested in CI',
      period: 'Jul 2026 - Oct 2026',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
      stats: '23 JUnit 5 Tests in CI',
      techStack: ['Java 21', 'Spring Boot 4.1', 'Spring Data JPA', 'PostgreSQL 17', 'React 19', 'Docker Compose', 'Nginx', 'GitHub Actions'],
      bullets: [
        'Layered REST API (controller, service, repository) with DTO records, Bean Validation, and RFC 9457 Problem Details errors, behind a React 19 app served by Nginx.',
        '23 JUnit 5 tests (Mockito, MockMvc, @WebMvcTest, @SpringBootTest), plus frontend lint and build, run in GitHub Actions CI.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/task-manager-springboot-react',
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
        'Grading system that scores short answers on meaning via LLM semantic matching, pairing it with rule-based checks.',
        'Contributed to the Next.js and TypeScript frontend and the Django backend, and tested grading accuracy.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/AutoGradePro_Client',
    },
    {
      id: 'edus-lms',
      title: 'EDUS LMS - Learning Management System',
      tagline: 'Subscription LMS with monthly billing, 4-role RBAC, and real-time chat (contributor at Yarl Ventures)',
      period: 'Sep 2025 - May 2026',
      category: 'Full-Stack',
      featured: true,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      stats: '103 User Actions Across 19 Modules',
      techStack: ['React 19', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'Socket.IO', 'PayHere'],
      bullets: [
        'Tested 4-role RBAC across 103 user actions in 19 modules, and contributed to payments, student wallets, and chat.',
        'Optimised API responses by stripping unused fields and avoiding redundant post-save reads; built tutor profile features (availability, fees, pricing).',
      ],
      liveUrl: 'https://lms.edustutor.com/',
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
      id: 'ecg-classification',
      title: 'ECG Image Classification (CNN)',
      tagline: 'Transfer-learning CNN trained on the MIT-BIH and PTB datasets',
      period: 'Dec 2024 - Apr 2025',
      category: 'AI / ML',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
      stats: '95% Test Accuracy',
      techStack: ['Python', 'TensorFlow / Keras', 'CNN', 'Transfer Learning', 'FastAPI'],
      bullets: [
        'Built a transfer-learning CNN pipeline for ECG images from the MIT-BIH and PTB datasets, from preprocessing through training to evaluation.',
        '95% test accuracy on 24,799 test images, served through a FastAPI inference service with single and batch prediction endpoints.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/ECG_Image_Classification',
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
      id: 'smart-home',
      title: 'Smart Home Automation with Emergency Power Shutdown',
      tagline: 'Arduino home automation that cuts the power automatically when it detects a gas leak',
      period: 'Jun 2024 - Nov 2024',
      category: 'Mobile & Systems',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      techStack: ['Arduino (ATmega328P)', 'C++', 'MQ-2 Gas Sensor', 'Relays', 'PWM', 'I2C LCD', 'Proteus'],
      bullets: [
        'Built the sensors and calibration, main control and safety logic, GSM simulation, hardware, and report for an Arduino (ATmega328P) home automation system.',
        'A detected gas leak cuts the power through a relay automatically, alongside PWM fan and LDR lighting.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Smart_Home_Automation_System',
    },
    {
      id: 'shift-tracker',
      title: 'Employee Shift Tracker (IaC)',
      tagline: 'MERN app deployed to Render with declarative render.yaml infrastructure-as-code',
      period: 'May 2025',
      category: 'Cloud & DevOps',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      techStack: ['React 19', 'Material UI', 'Leaflet', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Render (render.yaml)'],
      bullets: [
        'Responsive React app with dark mode that captures browser geolocation at check-in, breaks, and check-out, shown on Leaflet maps.',
        'Admin dashboard with break-excluded hours and CSV export, deployed to Render with render.yaml infrastructure-as-code.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Employee_Shift_Tracker',
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
        'Implemented JWT authentication.',
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
      techStack: ['Flutter', 'Dart', 'Firebase'],
      bullets: [
        'Contributed to a team-built cross-platform Flutter app with real-time Firebase sync and authentication.',
        'Doctor and patient flows: appointments, availability, prescriptions, and patient history screens.',
      ],
      githubUrl: 'https://github.com/Dinojan9901/Healthcare_Mobile_Application',
    },
    {
      id: 'file-sharing',
      title: 'Java Client-Server File Sharing App',
      tagline: 'Socket-based file transfer in Java with a Swing desktop UI',
      period: 'Dec 2024 - Feb 2025',
      category: 'Mobile & Systems',
      image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=800&q=80',
      techStack: ['Java', 'Sockets', 'Java Swing', 'FlatLaf', 'TCP/IP'],
      bullets: [
        'Built a Java client-server app that transfers files over TCP sockets (ServerSocket and Socket).',
        'Built the desktop client interface with Java Swing and a FlatLaf look and feel.',
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
        { name: 'Spring Boot', level: 'Proficient' },
        { name: 'Prisma', level: 'Proficient' },
        { name: 'C++', level: 'Proficient' },
        { name: 'Java', level: 'Proficient' },
        { name: 'Go (basic)' },
      ],
    },
    {
      category: 'AI / ML & Data',
      icon: 'Brain',
      skills: [
        { name: 'LLM Fine-Tuning (QLoRA)', level: 'Advanced', hot: true },
        { name: 'RAG Pipelines', level: 'Advanced', hot: true },
        { name: 'ChromaDB / Vector Search', level: 'Advanced', hot: true },
        { name: 'MCP (Model Context Protocol)', level: 'Proficient', hot: true },
        { name: 'MLflow', level: 'Proficient', hot: true },
        { name: 'LangChain', level: 'Proficient' },
        { name: 'Kafka & Spark Streaming', level: 'Proficient', hot: true },
        { name: 'Airflow', level: 'Proficient' },
        { name: 'TensorFlow / PyTorch', level: 'Proficient' },
        { name: 'Scikit-learn', level: 'Proficient' },
        { name: 'Sentence-Transformers', level: 'Proficient' },
        { name: 'Ollama, OpenAI, Groq & Gemini APIs', level: 'Proficient' },
      ],
    },
    {
      category: 'DevOps, Cloud & Infrastructure',
      icon: 'Cloud',
      skills: [
        { name: 'Docker & Docker Compose', level: 'Advanced', hot: true },
        { name: 'Kubernetes (kind)', level: 'Proficient', hot: true },
        { name: 'CI/CD (GitHub Actions)', level: 'Advanced', hot: true },
        { name: 'Jenkins', level: 'Proficient' },
        { name: 'Nginx (Reverse Proxy & Load Balancing)', level: 'Advanced', hot: true },
        { name: 'Terraform & Ansible (IaC)', level: 'Proficient' },
        { name: 'AWS (EC2, S3, CloudWatch)', level: 'Proficient', hot: true },
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
      period: 'Feb 2022 - Sep 2026',
      details: [
        'Relevant Coursework: Data Structures and Algorithms, Software Engineering Principles, Object-Oriented Design Patterns, Cloud Computing, Operating Systems, Database Systems, Network Programming, High Performance Computing.',
        'Soft Skill Development (2022 - 2024).',
      ],
    },
    {
      degree: 'GCE Advanced Level (Physical Science Stream)',
      institution: 'V/Vavuniya Tamil Madhya Maha Vidyalayam',
      period: 'Completed Aug 2019',
      details: ['Combined Mathematics, Physics, Chemistry'],
    },
  ] as Education[],

  volunteering: [
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
      period: 'Apr 2023 - Apr 2024',
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
    {
      title: 'Galle Division FIDE 100 Commemorative Chess Event',
      event: 'Open Category',
      year: '2024',
      description: 'Took part in the Galle Division FIDE 100 Commemorative Chess Event (Open Category), 2024.',
      badge: 'Chess',
    },
    {
      title: '3rd Runner-Up, Provincial Under-19 Boys Chess',
      event: 'Provincial Level',
      year: '2015 & 2016',
      description: '3rd Runner-Up, Provincial Level Under-19 Boys Chess, 2015 and 2016.',
      badge: 'Chess',
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
