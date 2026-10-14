// Single source of truth for all portfolio content.
// Inline **double asterisks** render as emphasised text.

export type YearMonth = `${number}-${string}`;

export const PROFILE = {
  name: "Abdulla Alawad",
  initials: "AA",
  role: "Senior Full-Stack AI & Data Systems Engineer",
  location: "Dubai, United Arab Emirates",
  locationShort: "Dubai, UAE",
  timezone: "Asia/Dubai",
  email: "mustafaalawad073@gmail.com",
  phone: "+971 50 272 8321",
  phoneHref: "tel:+971502728321",
  yearsExperience: "6+",
  headline:
    "I architect agentic AI platforms and the distributed data infrastructure underneath them — from multi-agent systems and production RAG to the interfaces people actually use.",
  summary:
    "Senior Full-Stack AI Architect with 6+ years building, engineering, and scaling enterprise-grade intelligence applications and production distributed data infrastructure. I design autonomous agentic workflows (LangGraph, CrewAI), production generative AI systems (RAG), and high-performance interfaces (React, Next.js), backed by ML pipelines (PyTorch) and data engineering frameworks (Airflow, Spark, Kafka) that hold up under strict enterprise SLAs.",
  focus: [
    "Multi-agent systems with self-correction loops",
    "Production RAG with re-ranking & guardrails",
    "Streaming, event-driven data pipelines",
    "Full-stack delivery: FastAPI to Next.js",
  ],
  coreStack: ["LangGraph", "RAG", "FastAPI", "Next.js", "Airflow", "Kafka", "Spark", "PyTorch"],
  // Optional profile links, e.g. { label: "LinkedIn", href: "https://linkedin.com/in/..." }
  links: [] as { label: string; href: string }[],
};

export const METRICS = [
  { value: "6+", label: "Years shipping production systems", context: "2020 — present" },
  { value: "25K+", label: "Active users on a global RAG platform", context: "ITI Concierge · 100+ countries" },
  { value: "98%", label: "Verified answer accuracy", context: "TruLens grounding guardrails" },
  { value: "45%", label: "Support tickets resolved autonomously", context: "LangGraph service desk" },
  { value: "1M+", label: "Pages ingested into vector stores", context: "Airflow pipelines · Pryon" },
  { value: "$150K", label: "Annual cloud spend eliminated", context: "Caching & query optimisation" },
  { value: "40%", label: "Lower geospatial processing latency", context: "Dispatch & routing engine" },
  { value: "25%", label: "Peak-traffic throughput gain", context: "Database optimisation · Careem" },
];

export type Role = {
  id: string;
  company: string;
  title: string;
  start: YearMonth;
  end: YearMonth | null;
  location: string;
  bullets: string[];
  stack: string[];
};

export const EXPERIENCE: Role[] = [
  {
    id: "bujorean",
    company: "Bujorean Consulting",
    title: "Senior Full-Stack AI Architect",
    start: "2025-11",
    end: null,
    location: "Brussels, Belgium",
    bullets: [
      "Architect **enterprise production platforms** merging LangGraph multi-agent systems, autonomous self-correction loops, and distributed microservices.",
      "Deploy **high-performance GenAI systems** leveraging advanced RAG, cross-encoder re-ranking, and semantic search to achieve **98% response accuracy**.",
      "Ship **secure async APIs and rich UI modules** using FastAPI, Django, and React/Next.js to deliver end-to-end full-stack AI capabilities.",
    ],
    stack: ["LangGraph", "RAG", "Cross-Encoders", "FastAPI", "Django", "React", "Next.js"],
  },
  {
    id: "netguru",
    company: "Netguru",
    title: "Senior AI/ML & Data Engineer",
    start: "2024-06",
    end: "2025-11",
    location: "Poznań, Poland",
    bullets: [
      "Engineered **8+ core microservices** and multi-agent workflows handling autonomous decision-making loops and tool-calling interfaces.",
      "Designed scalable **data engineering ingestion channels** transforming chaotic multi-format media assets into clean vector database schemas.",
      "Collaborated on full-stack web architectures using Next.js (SSR/Streaming) to optimise frontend performance for live LLM tokens.",
    ],
    stack: ["Multi-Agent", "Function Calling", "Vector DBs", "Next.js", "Python"],
  },
  {
    id: "pryon",
    company: "Pryon",
    title: "Full-Stack Generative AI Engineer",
    start: "2022-09",
    end: "2024-04",
    location: "Raleigh, NC, US",
    bullets: [
      "Co-designed **2 enterprise AI retrieval engines** optimising query expansion and hybrid keyword-vector search for sub-second, multi-turn agent execution.",
      "Built **10+ automated data engineering pipelines** using Apache Airflow to ingest **1M+ pages** of unstructured data into high-density vector databases.",
      "Coded **15+ high-concurrency async FastAPI services** handling real-time stream processing, tokenisation, and LLM prompt orchestration.",
    ],
    stack: ["Hybrid Retrieval", "Airflow", "FastAPI", "Elasticsearch", "Vector DBs"],
  },
  {
    id: "careem",
    company: "Careem",
    title: "Distributed Systems & Data Engineer",
    start: "2020-06",
    end: "2022-08",
    location: "Dubai, UAE",
    bullets: [
      "Scaled core **Super App systems** handling millions of concurrent users using event-driven architectures and distributed data networks.",
      "Engineered **10+ critical microservices** for high-throughput geospatial routing, predictive matching algorithms, and secure payments.",
      "Optimised legacy database indexing and execution paths, accelerating peak-traffic data throughput by **25%**.",
    ],
    stack: ["Event-Driven", "Kafka", "Microservices", "PostgreSQL", "Redis", "Java"],
  },
];

export const EDUCATION = {
  degree: "B.S. Computer Science",
  school: "Curtin University of Technology",
  start: "2016-01" as YearMonth,
  end: "2020-12" as YearMonth,
  period: "2016 – 2020",
  location: "Dubai, UAE",
};

export const LANGUAGES = [
  { name: "Arabic", level: 5, label: "Native" },
  { name: "English", level: 4, label: "Professional" },
];

export type Project = {
  id: string;
  name: string;
  kind: string;
  period: string;
  live?: boolean;
  metrics: { value: string; label: string }[];
  flow: string[];
  bullets: string[];
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "iti-concierge",
    name: "ITI Concierge",
    kind: "Global RAG Platform",
    period: "08/2025 – Present",
    live: true,
    metrics: [
      { value: "25K+", label: "active users" },
      { value: "98%", label: "answer accuracy" },
    ],
    flow: ["Org docs", "Hybrid retrieval", "Re-rank", "TruLens guardrails", "Token stream"],
    bullets: [
      "Architected an enterprise, full-stack **RAG knowledge platform** scaling to **25,000+ active users** across 100+ countries, using Next.js for real-time LLM token streaming.",
      "Engineered deterministic grounding guardrails using **TruLens**, eliminating hallucination risk to reach a verified **98% answer accuracy** against organisational documentation.",
    ],
    stack: ["Next.js", "RAG", "TruLens", "Cross-Encoders", "FastAPI"],
  },
  {
    id: "service-desk",
    name: "Agentic Service Desk",
    kind: "Multi-Agent System",
    period: "10/2024 – 05/2025",
    metrics: [
      { value: "45%", label: "tickets auto-resolved" },
      { value: "Live", label: "execution path tracing" },
    ],
    flow: ["Ticket in", "LangGraph router", "Tool calls", "Self-correction", "Resolved"],
    bullets: [
      "Developed a production multi-agent routing system using **LangGraph** to automate internal technical support and trace live agent execution paths.",
      "Orchestrated autonomous self-correction loops and tool-calling interfaces that **resolved 45% of incoming pipeline tickets** without human intervention.",
    ],
    stack: ["LangGraph", "Function Calling", "LangSmith", "Python"],
  },
  {
    id: "multimodal-ingestion",
    name: "Multimodal AI Ingestion Engine",
    kind: "Distributed Data Pipeline",
    period: "06/2023 – 04/2024",
    metrics: [
      { value: "3", label: "modalities: vision, text, audio" },
      { value: "Milvus", label: "clustered vector store" },
    ],
    flow: ["Media assets", "Vision-LLM · OCR · ASR", "Kafka", "Spark", "Milvus"],
    bullets: [
      "Designed a distributed pipeline leveraging **Vision-LLMs, OCR, and audio-to-text tokenisers** to turn chaotic multi-format media into clean database schemas.",
      "Used **Kafka streams and Apache Spark** to load high-density embeddings into scalable **Milvus** cluster vector databases.",
    ],
    stack: ["Kafka", "Apache Spark", "Milvus", "Vision-LLMs", "OCR"],
  },
  {
    id: "dispatch-routing",
    name: "Enterprise Dispatch & Routing Engine",
    kind: "Event-Driven Matching",
    period: "08/2020 – 12/2021",
    metrics: [
      { value: "−40%", label: "geospatial latency" },
      { value: "$150K", label: "saved per year" },
    ],
    flow: ["Live events", "Matching", "Geo routing", "Distributed cache", "Dispatch"],
    bullets: [
      "Architected a real-time event-driven matching system processing **millions of daily concurrent payloads**, lowering geospatial processing latency by 40%.",
      "Optimised distributed caching layers and legacy execution paths, **cutting infrastructure cloud spend by $150K annually**.",
    ],
    stack: ["Event-Driven", "Kafka", "Redis", "PostgreSQL", "Microservices"],
  },
];

export const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "Generative AI & Agentic",
    items: ["LangGraph", "LangChain", "LlamaIndex", "MCP", "CrewAI", "AutoGen", "Semantic Kernel", "AI Agents", "Multi-Agent Systems", "Function Calling", "Prompt Engineering", "Promptflow"],
  },
  {
    category: "Machine Learning & LLMOps",
    items: ["PyTorch", "TensorFlow", "Hugging Face", "Scikit-Learn", "Predictive Modeling", "Semantic Search", "Cross-Encoders", "TruLens", "Ragas", "LangSmith", "Phoenix", "MLflow", "W&B"],
  },
  {
    category: "Data Engineering",
    items: ["Apache Airflow", "Apache Spark", "Kafka", "Solace", "ETL/ELT", "Distributed Systems", "Event-Driven Architecture", "Stream Processing", "Ingestion Pipelines", "Schema Design"],
  },
  {
    category: "Vector Search & Databases",
    items: ["Pinecone", "Milvus", "Qdrant", "Chroma", "PGVector", "Elasticsearch", "OpenSearch", "PostgreSQL", "MongoDB", "Redis", "Hybrid Retrieval"],
  },
  {
    category: "Backend & Cloud",
    items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "FastAPI", "Django", "Flask", "Node.js", "Microservices", "REST", "GraphQL", "restQL", "AWS", "Docker", "Kubernetes", "OpenTelemetry"],
  },
  {
    category: "Frontend & Mobile",
    items: ["React", "Next.js", "React Native", "HTML5", "CSS3", "TailwindCSS", "Redux", "Zustand", "Micro-frontends"],
  },
];
