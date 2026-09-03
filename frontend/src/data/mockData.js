export const MOCK_COURSES = [
  {
    id: 1,
    title: "Full Stack Python Web Development",
    category: "Software Engineering",
    description: "Master modern web app development using Python 3, Django, Flask, FastAPI, React 18, and PostgreSQL/SQLite with real-world enterprise projects.",
    duration: "16 Weeks (4 Months)",
    price: 899,
    discount_price: 499,
    level: "Beginner to Pro",
    rating: 4.9,
    reviews_count: 340,
    image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    syllabus: [
      { module: "Module 1: Python Fundamentals & Data Structures", topics: ["Variables, Control Flow, Functions", "OOP Principles & File Handling", "Database basics with SQLite"] },
      { module: "Module 2: Backend with Flask & FastAPI", topics: ["RESTful API Architecture", "SQLAlchemy ORM & Migrations", "JWT Authentication & CORS"] },
      { module: "Module 3: Frontend Mastery with React.js", topics: ["React Hooks & Context API", "Vite build tool & Component Architecture", "Axios API Integration"] },
      { module: "Module 4: Capstone Enterprise Project & Cloud Deployment", topics: ["Dockerizing Fullstack Apps", "CI/CD Deployment to Render/Vercel", "System Design & Mock Interviews"] }
    ],
    trainer_name: "Alexander Hayes",
    trainer_role: "Ex-Google Staff Engineer (12+ Yrs Exp)",
    mode: "Live Online & Offline Hybrid",
    tags: ["100% Placement Support", "Live Capstone", "24/7 Doubt Helpline"]
  },
  {
    id: 2,
    title: "Artificial Intelligence & Machine Learning Specialist",
    category: "Data & AI",
    description: "Deep dive into Supervised/Unsupervised ML, Deep Learning with PyTorch, NLP, Computer Vision, and Generative AI LLMs.",
    duration: "20 Weeks (5 Months)",
    price: 1199,
    discount_price: 699,
    level: "Intermediate",
    rating: 4.95,
    reviews_count: 285,
    image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60",
    syllabus: [
      { module: "Module 1: Math & Python for Data Science", topics: ["NumPy, Pandas, Vectorized Ops", "Linear Algebra & Statistics", "Data Visualization with Seaborn"] },
      { module: "Module 2: Classical Machine Learning", topics: ["Regression & Classification Algorithms", "Decision Trees & Random Forests", "Model Evaluation & Hyperparameter Tuning"] },
      { module: "Module 3: Deep Learning & Neural Networks", topics: ["PyTorch & TensorFlow Fundamentals", "Convolutional Neural Networks (CNN)", "Recurrent Networks & Transformers"] },
      { module: "Module 4: Generative AI & LLM Engineering", topics: ["LangChain & Vector Databases (Chroma)", "Fine-Tuning Open Source LLMs", "Building RAG AI Agents"] }
    ],
    trainer_name: "Dr. Sophia Lin",
    trainer_role: "Principal AI Researcher & PhD MIT",
    mode: "Live Interactive Classes",
    tags: ["Hot Skill 2026", "GPU Lab Access", "Capstone Portfolio"]
  },
  {
    id: 3,
    title: "AWS Cloud Architect & DevOps Engineering",
    category: "Cloud & Infrastructure",
    description: "Learn Kubernetes, Docker, Terraform, CI/CD pipelines, Ansible, AWS Core Services (EC2, S3, RDS, Lambda) for cloud infrastructure.",
    duration: "14 Weeks (3.5 Months)",
    price: 999,
    discount_price: 549,
    level: "Intermediate",
    rating: 4.88,
    reviews_count: 412,
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    syllabus: [
      { module: "Module 1: Cloud Foundations & AWS Core", topics: ["VPC, Subnets, EC2, IAM Security", "S3 Storage & RDS Database Clusters", "Serverless Lambda & API Gateway"] },
      { module: "Module 2: Infrastructure as Code (IaC)", topics: ["Terraform Automation Modules", "Ansible Configuration Management", "CloudFormation Templates"] },
      { module: "Module 3: Containers & Kubernetes Orchestration", topics: ["Docker Image Optimization & Security", "Kubernetes Pods, Deployments & Services", "Helm Charts & Ingress Controllers"] },
      { module: "Module 4: Enterprise CI/CD & Observability", topics: ["GitHub Actions & Jenkins Pipelines", "Prometheus & Grafana Monitoring", "AWS Certified Solutions Architect Prep"] }
    ],
    trainer_name: "Marcus Vance",
    trainer_role: "Lead DevOps Architect at AWS Partner",
    mode: "Weekend & Weekday Batches",
    tags: ["AWS Exam Voucher", "Real Production Labs", "High Salary"]
  },
  {
    id: 4,
    title: "Ethical Hacking & Cyber Security Master",
    category: "Cybersecurity",
    description: "Master Penetration Testing, Network Security, Web Application Security, Digital Forensics, and SOC Analyst methodologies.",
    duration: "16 Weeks (4 Months)",
    price: 950,
    discount_price: 520,
    level: "Beginner to Advanced",
    rating: 4.87,
    reviews_count: 198,
    image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
    syllabus: [
      { module: "Module 1: Ethical Hacking Foundations", topics: ["Footprinting & Reconnaissance", "Nmap Scanning & Vulnerability Assessment", "Wireshark Packet Analysis"] },
      { module: "Module 2: Web App Security & OWASP Top 10", topics: ["SQL Injection & Cross-Site Scripting", "Burp Suite Pro Techniques", "API Security Testing"] },
      { module: "Module 3: System Hacking & Malware Analysis", topics: ["Metasploit Exploitation Framework", "Privilege Escalation (Windows & Linux)", "Ransomware Analysis"] },
      { module: "Module 4: SOC Operations & Incident Response", topics: ["SIEM Tools (Splunk & ELK)", "Threat Hunting & Incident Handling", "CEH Certification Training"] }
    ],
    trainer_name: "David Miller",
    trainer_role: "Certified Ethical Hacker (CEH & CISSP)",
    mode: "Hands-on Cyber Lab",
    tags: ["CEH Aligned", "Live Range Practice", "100% Practical"]
  },
  {
    id: 5,
    title: "React 19 & Next.js Full Stack Engineering",
    category: "Frontend & Web",
    description: "Build high-performance web applications with React 19, TypeScript, Next.js App Router, Tailwind CSS, Zustand, and Server Actions.",
    duration: "12 Weeks (3 Months)",
    price: 799,
    discount_price: 429,
    level: "Beginner to Intermediate",
    rating: 4.92,
    reviews_count: 520,
    image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    syllabus: [
      { module: "Module 1: Modern JavaScript & TypeScript", topics: ["ES6+ Async/Await & Promises", "TypeScript Static Types & Interfaces", "DOM Manipulation & Performance"] },
      { module: "Module 2: React 19 Core & Hooks", topics: ["Component Lifecycle & Custom Hooks", "State Management (Zustand / Redux)", "Component Styling with Tailwind CSS"] },
      { module: "Module 3: Next.js 15 App Architecture", topics: ["Server Components & SSR / SSG", "Server Actions & API Routes", "Database integration with Prisma ORM"] },
      { module: "Module 4: Production Deployment & Testing", topics: ["Jest & React Testing Library", "Vercel Analytics & SEO Best Practices", "Building Enterprise Dashboard App"] }
    ],
    trainer_name: "Elena Rostova",
    trainer_role: "Senior Frontend Architect",
    mode: "Live Online & Recorded",
    tags: ["TypeScript", "Next.js 15", "Portfolio Ready"]
  },
  {
    id: 6,
    title: "Data Analytics & Power BI Business Intelligence",
    category: "Data & AI",
    description: "Transform raw data into actionable business intelligence using SQL, Advanced Excel, Power BI DAX, and Python Data Analytics.",
    duration: "10 Weeks (2.5 Months)",
    price: 699,
    discount_price: 379,
    level: "Beginner Friendly",
    rating: 4.85,
    reviews_count: 310,
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    syllabus: [
      { module: "Module 1: SQL Database & Querying", topics: ["Complex Joins, Subqueries & CTEs", "Window Functions & Aggregation", "Database Schema Design"] },
      { module: "Module 2: Advanced Excel for Business Analytics", topics: ["PivotTables & Dynamic Arrays", "Power Query Data Transformation", "VBA & Macro Automation"] },
      { module: "Module 3: Power BI Dashboards & DAX", topics: ["Building Interactive Dashboards", "DAX Measures & Time Intelligence", "Power BI Service & Workspace Sharing"] },
      { module: "Module 4: Python Data Wrangling", topics: ["Exploratory Data Analysis with Pandas", "Automated PDF/Excel Reporting", "Real Business Case Studies"] }
    ],
    trainer_name: "Rachel Adams",
    trainer_role: "Lead Data Consultant at McKinsey Alumni",
    mode: "Online & Hybrid",
    tags: ["Non-Tech Friendly", "High Demand", "Resume Building"]
  }
];

export const MOCK_STATS = {
  total_courses: 8,
  total_students: 14890,
  total_demo_bookings: 345,
  total_inquiries: 89,
  total_revenue: 485000,
  hiring_partners: 420,
  placement_rate: "98.4%",
  avg_salary: "$94,000 / yr"
};

export const MOCK_HIRING_PARTNERS = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" }
];
