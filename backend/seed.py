import json
from database import init_db, SessionLocal, User, Course, Batch, Enrollment, DemoBooking, Inquiry, Certificate

COURSES_DATA = [
    {
        "title": "Full Stack Python Web Development",
        "category": "Software Engineering",
        "description": "Master modern web app development using Python 3, Django, Flask, FastAPI, React 18, and PostgreSQL/SQLite with real-world enterprise projects.",
        "duration": "16 Weeks (4 Months)",
        "price": 899,
        "discount_price": 499,
        "level": "Beginner to Pro",
        "rating": 4.9,
        "reviews_count": 340,
        "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
        "syllabus": [
            {"module": "Module 1: Python Fundamentals & Data Structures", "topics": ["Variables, Control Flow, Functions", "OOP Principles & File Handling", "Database basics with SQLite"]},
            {"module": "Module 2: Backend with Flask & FastAPI", "topics": ["RESTful API Architecture", "SQLAlchemy ORM & Migrations", "JWT Authentication & CORS"]},
            {"module": "Module 3: Frontend Mastery with React.js", "topics": ["React Hooks & Context API", "Vite build tool & Component Architecture", "Axios API Integration"]},
            {"module": "Module 4: Capstone Enterprise Project & Cloud Deployment", "topics": ["Dockerizing Fullstack Apps", "CI/CD Deployment to Render/Vercel", "System Design & Mock Interviews"]}
        ],
        "trainer_name": "Alexander Hayes",
        "trainer_role": "Ex-Google Staff Engineer (12+ Yrs Exp)",
        "mode": "Live Online & Offline Hybrid",
        "tags": "100% Placement Support, Live Capstone, 24/7 Doubt Helpline"
    },
    {
        "title": "Artificial Intelligence & Machine Learning Specialist",
        "category": "Data & AI",
        "description": "Deep dive into Supervised/Unsupervised ML, Deep Learning with PyTorch, NLP, Computer Vision, and Generative AI LLMs.",
        "duration": "20 Weeks (5 Months)",
        "price": 1199,
        "discount_price": 699,
        "level": "Intermediate",
        "rating": 4.95,
        "reviews_count": 285,
        "image_url": "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60",
        "syllabus": [
            {"module": "Module 1: Math & Python for Data Science", "topics": ["NumPy, Pandas, Vectorized Ops", "Linear Algebra & Statistics", "Data Visualization with Seaborn"]},
            {"module": "Module 2: Classical Machine Learning", "topics": ["Regression & Classification Algorithms", "Decision Trees & Random Forests", "Model Evaluation & Hyperparameter Tuning"]},
            {"module": "Module 3: Deep Learning & Neural Networks", "topics": ["PyTorch & TensorFlow Fundamentals", "Convolutional Neural Networks (CNN)", "Recurrent Networks & Transformers"]},
            {"module": "Module 4: Generative AI & LLM Engineering", "topics": ["LangChain & Vector Databases (Chroma)", "Fine-Tuning Open Source LLMs", "Building RAG AI Agents"]}
        ],
        "trainer_name": "Dr. Sophia Lin",
        "trainer_role": "Principal AI Researcher & PhD MIT",
        "mode": "Live Interactive Classes",
        "tags": "Hot Skill 2026, GPU Lab Access, Capstone Portfolio"
    },
    {
        "title": "AWS Cloud Architect & DevOps Engineering",
        "category": "Cloud & Infrastructure",
        "description": "Learn Kubernetes, Docker, Terraform, CI/CD pipelines, Ansible, AWS Core Services (EC2, S3, RDS, Lambda) for cloud infrastructure.",
        "duration": "14 Weeks (3.5 Months)",
        "price": 999,
        "discount_price": 549,
        "level": "Intermediate",
        "rating": 4.88,
        "reviews_count": 412,
        "image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
        "syllabus": [
            {"module": "Module 1: Cloud Foundations & AWS Core", "topics": ["VPC, Subnets, EC2, IAM Security", "S3 Storage & RDS Database Clusters", "Serverless Lambda & API Gateway"]},
            {"module": "Module 2: Infrastructure as Code (IaC)", "topics": ["Terraform Automation Modules", "Ansible Configuration Management", "CloudFormation Templates"]},
            {"module": "Module 3: Containers & Kubernetes Orchestration", "topics": ["Docker Image Optimization & Security", "Kubernetes Pods, Deployments & Services", "Helm Charts & Ingress Controllers"]},
            {"module": "Module 4: Enterprise CI/CD & Observability", "topics": ["GitHub Actions & Jenkins Pipelines", "Prometheus & Grafana Monitoring", "AWS Certified Solutions Architect Prep"]}
        ],
        "trainer_name": "Marcus Vance",
        "trainer_role": "Lead DevOps Architect at AWS Partner",
        "mode": "Weekend & Weekday Batches",
        "tags": "AWS Exam Voucher, Real Production Labs, High Salary"
    },
    {
        "title": "Ethical Hacking & Cyber Security Master",
        "category": "Cybersecurity",
        "description": "Master Penetration Testing, Network Security, Web Application Security, Digital Forensics, and SOC Analyst methodologies.",
        "duration": "16 Weeks (4 Months)",
        "price": 950,
        "discount_price": 520,
        "level": "Beginner to Advanced",
        "rating": 4.87,
        "reviews_count": 198,
        "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
        "syllabus": [
            {"module": "Module 1: Ethical Hacking Foundations", "topics": ["Footprinting & Reconnaissance", "Nmap Scanning & Vulnerability Assessment", "Wireshark Packet Analysis"]},
            {"module": "Module 2: Web App Security & OWASP Top 10", "topics": ["SQL Injection & Cross-Site Scripting", "Burp Suite Pro Techniques", "API Security Testing"]},
            {"module": "Module 3: System Hacking & Malware Analysis", "topics": ["Metasploit Exploitation Framework", "Privilege Escalation (Windows & Linux)", "Ransomware Analysis"]},
            {"module": "Module 4: SOC Operations & Incident Response", "topics": ["SIEM Tools (Splunk & ELK)", "Threat Hunting & Incident Handling", "CEH Certification Training"]}
        ],
        "trainer_name": "David Miller",
        "trainer_role": "Certified Ethical Hacker (CEH & CISSP)",
        "mode": "Hands-on Cyber Lab",
        "tags": "CEH Aligned, Live Range Practice, 100% Practical"
    },
    {
        "title": "React 19 & Next.js Full Stack Engineering",
        "category": "Frontend & Web",
        "description": "Build high-performance web applications with React 19, TypeScript, Next.js App Router, Tailwind CSS, Zustand, and Server Actions.",
        "duration": "12 Weeks (3 Months)",
        "price": 799,
        "discount_price": 429,
        "level": "Beginner to Intermediate",
        "rating": 4.92,
        "reviews_count": 520,
        "image_url": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
        "syllabus": [
            {"module": "Module 1: Modern JavaScript & TypeScript", "topics": ["ES6+ Async/Await & Promises", "TypeScript Static Types & Interfaces", "DOM Manipulation & Performance"]},
            {"module": "Module 2: React 19 Core & Hooks", "topics": ["Component Lifecycle & Custom Hooks", "State Management (Zustand / Redux)", "Component Styling with Tailwind CSS"]},
            {"module": "Module 3: Next.js 15 App Architecture", "topics": ["Server Components & SSR / SSG", "Server Actions & API Routes", "Database integration with Prisma ORM"]},
            {"module": "Module 4: Production Deployment & Testing", "topics": ["Jest & React Testing Library", "Vercel Analytics & SEO Best Practices", "Building Enterprise Dashboard App"]}
        ],
        "trainer_name": "Elena Rostova",
        "trainer_role": "Senior Frontend Architect",
        "mode": "Live Online & Recorded",
        "tags": "TypeScript, Next.js 15, Portfolio Ready"
    },
    {
        "title": "Data Analytics & Power BI Business Intelligence",
        "category": "Data & AI",
        "description": "Transform raw data into actionable business intelligence using SQL, Advanced Excel, Power BI DAX, and Python Data Analytics.",
        "duration": "10 Weeks (2.5 Months)",
        "price": 699,
        "discount_price": 379,
        "level": "Beginner Friendly",
        "rating": 4.85,
        "reviews_count": 310,
        "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
        "syllabus": [
            {"module": "Module 1: SQL Database & Querying", "topics": ["Complex Joins, Subqueries & CTEs", "Window Functions & Aggregation", "Database Schema Design"]},
            {"module": "Module 2: Advanced Excel for Business Analytics", "topics": ["PivotTables & Dynamic Arrays", "Power Query Data Transformation", "VBA & Macro Automation"]},
            {"module": "Module 3: Power BI Dashboards & DAX", "topics": ["Building Interactive Dashboards", "DAX Measures & Time Intelligence", "Power BI Service & Workspace Sharing"]},
            {"module": "Module 4: Python Data Wrangling", "topics": ["Exploratory Data Analysis with Pandas", "Automated PDF/Excel Reporting", "Real Business Case Studies"]}
        ],
        "trainer_name": "Rachel Adams",
        "trainer_role": "Lead Data Consultant at McKinsey Alumni",
        "mode": "Online & Hybrid",
        "tags": "Non-Tech Friendly, High Demand, Resume Building"
    }
]

BATCHES_DATA = [
    {
        "course_id": 1,
        "batch_code": "PY-FEB26-A",
        "start_date": "2026-09-15",
        "timings": "7:00 AM - 9:00 AM (Mon - Fri)",
        "mode": "Live Online",
        "seats_total": 25,
        "seats_left": 4,
        "instructor": "Alexander Hayes",
        "status": "Filling Fast"
    },
    {
        "course_id": 1,
        "batch_code": "PY-FEB26-B",
        "start_date": "2026-09-20",
        "timings": "10:00 AM - 1:00 PM (Sat - Sun)",
        "mode": "Offline Campus",
        "seats_total": 20,
        "seats_left": 2,
        "instructor": "Alexander Hayes",
        "status": "Almost Full"
    }
]

CERTIFICATES_DATA = [
    {
        "certificate_code": "CERT-2026-PY892",
        "student_name": "Daniel Kim",
        "course_title": "Full Stack Python Web Development",
        "issue_date": "2026-08-28",
        "grade": "Distinction (A+)",
        "instructor_name": "Alexander Hayes"
    }
]

def seed():
    init_db()
    session = SessionLocal()

    # Check if Users seeded
    if session.query(User).count() == 0:
        print("Seeding Auth Users (Student & Admin)...")
        student_user = User(
            name="Daniel Kim",
            email="student@example.com",
            phone="+1 555-492-1049",
            password="student123",
            role="student"
        )
        admin_user = User(
            name="Executive Director",
            email="admin@techacademy.pro",
            phone="+1 800-555-8324",
            password="admin123",
            role="admin"
        )
        session.add(student_user)
        session.add(admin_user)
        session.commit()

    if session.query(Course).count() == 0:
        print("Seeding database with courses...")
        for item in COURSES_DATA:
            course = Course(
                title=item["title"],
                category=item["category"],
                description=item["description"],
                duration=item["duration"],
                price=item["price"],
                discount_price=item["discount_price"],
                level=item["level"],
                rating=item["rating"],
                reviews_count=item["reviews_count"],
                image_url=item["image_url"],
                syllabus_json=json.dumps(item["syllabus"]),
                trainer_name=item["trainer_name"],
                trainer_role=item["trainer_role"],
                mode=item["mode"],
                tags=item["tags"]
            )
            session.add(course)
        session.commit()

        print("Seeding batches...")
        for b in BATCHES_DATA:
            batch = Batch(
                course_id=b["course_id"],
                batch_code=b["batch_code"],
                start_date=b["start_date"],
                timings=b["timings"],
                mode=b["mode"],
                seats_total=b["seats_total"],
                seats_left=b["seats_left"],
                instructor=b["instructor"],
                status=b["status"]
            )
            session.add(batch)
        session.commit()

        print("Seeding verifiable certificates...")
        for c in CERTIFICATES_DATA:
            cert = Certificate(
                certificate_code=c["certificate_code"],
                student_name=c["student_name"],
                course_title=c["course_title"],
                issue_date=c["issue_date"],
                grade=c["grade"],
                instructor_name=c["instructor_name"]
            )
            session.add(cert)
        
        # Add sample student enrollment for Daniel Kim
        enrollment = Enrollment(
            student_name="Daniel Kim",
            student_email="student@example.com",
            student_phone="+1 555-492-1049",
            course_id=1,
            course_title="Full Stack Python Web Development",
            batch_code="PY-FEB26-A",
            total_fee=499.0,
            payment_status="Completed"
        )
        session.add(enrollment)
        session.commit()

    session.close()
    print("Database verification & auth seeder finished!")

if __name__ == "__main__":
    seed()
