import os
import json
import random
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, SessionLocal, User, Course, Batch, Enrollment, DemoBooking, Inquiry, Certificate
from seed import seed

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

init_db()
try:
    seed()
except Exception as e:
    print("Seed info:", e)

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "online", "system": "TechAcademy Institute API v1.0", "timestamp": datetime.utcnow().isoformat()})

# --- AUTH ENDPOINTS ---
@app.route("/api/auth/login", methods=["POST"])
def auth_login():
    data = request.json or {}
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()
    role_requested = data.get("role")

    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    session = SessionLocal()
    user = session.query(User).filter(User.email.ilike(email)).first()
    
    if not user or user.password != password:
        session.close()
        return jsonify({"error": "Invalid email credentials or password."}), 401
        
    if role_requested and user.role != role_requested and user.role != "admin":
        session.close()
        return jsonify({"error": f"Access denied. Account role is '{user.role}', expected '{role_requested}'."}), 403

    user_dict = user.to_dict()
    
    enrolled_courses = []
    if user.role == "student":
        enrollments = session.query(Enrollment).filter(Enrollment.student_email.ilike(email)).all()
        for e in enrollments:
            enrolled_courses.append(e.to_dict())
            
    session.close()
    return jsonify({
        "message": "Login successful!",
        "user": user_dict,
        "enrolled_courses": enrolled_courses
    })

@app.route("/api/auth/register", methods=["POST"])
def auth_register():
    data = request.json or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()
    phone = data.get("phone", "")

    if not name or not email or not password:
        return jsonify({"error": "Name, email and password are required."}), 400

    session = SessionLocal()
    existing = session.query(User).filter(User.email.ilike(email)).first()
    if existing:
        session.close()
        return jsonify({"error": "Account already exists with this email address."}), 400

    user = User(
        name=name,
        email=email,
        phone=phone,
        password=password,
        role="student"
    )
    session.add(user)
    session.commit()
    res = user.to_dict()
    session.close()
    return jsonify({"message": "Registration successful!", "user": res}), 201

# --- ADMIN CREATES STUDENT ACCOUNT & ENROLLMENT ---
@app.route("/api/admin/enroll-student", methods=["POST"])
def admin_enroll_student():
    data = request.json or {}
    name = (data.get("student_name") or "").strip()
    email = (data.get("student_email") or "").strip().lower()
    password = (data.get("password") or "student123").strip()
    phone = data.get("student_phone", "+1 555-000-0000")
    course_id = int(data.get("course_id", 1))
    course_title = data.get("course_title", "Full Stack Python Web Development")
    batch_code = data.get("batch_code", "PY-FEB26-A")
    total_fee = float(data.get("total_fee", 499.0))
    payment_status = data.get("payment_status", "Completed")

    if not name or not email:
        return jsonify({"error": "Student name and email are required."}), 400

    session = SessionLocal()

    # Create or update Student Auth User account
    user = session.query(User).filter(User.email.ilike(email)).first()
    if not user:
        user = User(
            name=name,
            email=email,
            phone=phone,
            password=password,
            role="student"
        )
        session.add(user)
        session.commit()
    else:
        user.name = name
        user.phone = phone
        user.password = password
        session.commit()

    # Create Enrollment
    enrollment = Enrollment(
        student_name=name,
        student_email=email,
        student_phone=phone,
        course_id=course_id,
        course_title=course_title,
        batch_code=batch_code,
        total_fee=total_fee,
        payment_status=payment_status
    )
    session.add(enrollment)

    # Issue verifiable certificate
    cert_code = f"CERT-2026-{random.randint(10000, 99999)}"
    cert = Certificate(
        certificate_code=cert_code,
        student_name=name,
        course_title=course_title,
        issue_date=datetime.now().strftime("%Y-%m-%d"),
        grade="Distinction (A+)",
        instructor_name="TechAcademy Academic Board"
    )
    session.add(cert)

    session.commit()
    res = enrollment.to_dict()
    res["certificate_code"] = cert_code
    res["login_email"] = email
    res["login_password"] = password
    session.close()

    return jsonify({
        "message": f"Student account created for {name}!",
        "enrollment": res,
        "credentials": {
            "name": name,
            "email": email,
            "password": password
        }
    }), 201

# --- STUDENT OWNED COURSES ---
@app.route("/api/student/courses", methods=["GET"])
def get_student_courses():
    email = request.args.get("email", "").strip().lower()
    if not email:
        return jsonify([])
        
    session = SessionLocal()
    enrollments = session.query(Enrollment).filter(Enrollment.student_email.ilike(email)).all()
    res = [e.to_dict() for e in enrollments]
    session.close()
    return jsonify(res)

# --- COURSES ENDPOINTS ---
@app.route("/api/courses", methods=["GET"])
def get_courses():
    session = SessionLocal()
    category = request.args.get("category")
    search = request.args.get("q")
    
    query = session.query(Course)
    if category and category != "All":
        query = query.filter(Course.category == category)
    if search:
        query = query.filter(Course.title.ilike(f"%{search}%") | Course.description.ilike(f"%{search}%"))
        
    courses = query.all()
    result = [c.to_dict() for c in courses]
    session.close()
    return jsonify(result)

@app.route("/api/courses/<int:course_id>", methods=["GET"])
def get_course_detail(course_id):
    session = SessionLocal()
    course = session.query(Course).filter(Course.id == course_id).first()
    if not course:
        session.close()
        return jsonify({"error": "Course not found"}), 404
    
    batches = session.query(Batch).filter(Batch.course_id == course_id).all()
    data = course.to_dict()
    data["upcoming_batches"] = [b.to_dict() for b in batches]
    session.close()
    return jsonify(data)

@app.route("/api/courses", methods=["POST"])
def create_course():
    data = request.json or {}
    required = ["title", "category", "description", "duration", "price", "discount_price", "trainer_name", "trainer_role"]
    for r in required:
        if not data.get(r):
            return jsonify({"error": f"Missing required field: {r}"}), 400
            
    session = SessionLocal()
    syllabus = data.get("syllabus", [])
    course = Course(
        title=data["title"],
        category=data["category"],
        description=data["description"],
        duration=data["duration"],
        price=float(data["price"]),
        discount_price=float(data["discount_price"]),
        level=data.get("level", "Beginner to Advanced"),
        image_url=data.get("image_url", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"),
        syllabus_json=json.dumps(syllabus),
        trainer_name=data["trainer_name"],
        trainer_role=data["trainer_role"],
        mode=data.get("mode", "Online & Offline"),
        tags=",".join(data.get("tags", ["Top Rated"])) if isinstance(data.get("tags"), list) else data.get("tags", "Top Rated")
    )
    session.add(course)
    session.commit()
    res = course.to_dict()
    session.close()
    return jsonify({"message": "Course created successfully!", "course": res}), 201

# --- BATCHES ENDPOINTS ---
@app.route("/api/batches", methods=["GET"])
def get_batches():
    session = SessionLocal()
    batches = session.query(Batch).all()
    res = [b.to_dict() for b in batches]
    session.close()
    return jsonify(res)

@app.route("/api/batches", methods=["POST"])
def create_batch():
    data = request.json or {}
    session = SessionLocal()
    code = f"BTH-{random.randint(1000, 9999)}"
    batch = Batch(
        course_id=data.get("course_id", 1),
        batch_code=data.get("batch_code", code),
        start_date=data.get("start_date", "2026-10-01"),
        timings=data.get("timings", "7:00 PM - 9:00 PM"),
        mode=data.get("mode", "Live Online"),
        seats_total=int(data.get("seats_total", 30)),
        seats_left=int(data.get("seats_left", 30)),
        instructor=data.get("instructor", "Senior Lead"),
        status="Filling Fast"
    )
    session.add(batch)
    session.commit()
    res = batch.to_dict()
    session.close()
    return jsonify({"message": "Batch created!", "batch": res}), 201

# --- DEMO BOOKING ENDPOINT ---
@app.route("/api/demo-booking", methods=["POST"])
def book_demo():
    data = request.json or {}
    for f in ["name", "email", "phone", "course_interest"]:
        if not data.get(f):
            return jsonify({"error": f"Missing field: {f}"}), 400
            
    session = SessionLocal()
    booking = DemoBooking(
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        course_interest=data["course_interest"],
        slot_date=data.get("slot_date", "Tomorrow"),
        slot_time=data.get("slot_time", "06:00 PM"),
        status="Confirmed"
    )
    session.add(booking)
    session.commit()
    res = booking.to_dict()
    session.close()
    return jsonify({"message": "Free Live Demo Class Booked!", "booking": res}), 201

@app.route("/api/demo-bookings", methods=["GET"])
def list_demo_bookings():
    session = SessionLocal()
    bookings = session.query(DemoBooking).order_by(DemoBooking.id.desc()).all()
    res = [b.to_dict() for b in bookings]
    session.close()
    return jsonify(res)

# --- ENROLLMENT ENDPOINT ---
@app.route("/api/enrollments", methods=["POST"])
def register_enrollment():
    data = request.json or {}
    for f in ["student_name", "student_email", "student_phone", "course_id", "course_title"]:
        if not data.get(f):
            return jsonify({"error": f"Missing field: {f}"}), 400
            
    session = SessionLocal()
    
    # Auto register student auth account if not present
    existing_user = session.query(User).filter(User.email.ilike(data["student_email"].strip())).first()
    if not existing_user:
        new_u = User(
            name=data["student_name"],
            email=data["student_email"].strip().lower(),
            phone=data["student_phone"],
            password="student123",
            role="student"
        )
        session.add(new_u)
    
    enrollment = Enrollment(
        student_name=data["student_name"],
        student_email=data["student_email"],
        student_phone=data["student_phone"],
        course_id=int(data["course_id"]),
        course_title=data["course_title"],
        batch_code=data.get("batch_code", "GEN-2026-A"),
        total_fee=float(data.get("total_fee", 499.0)),
        payment_status="Completed"
    )
    session.add(enrollment)

    # Issue verifiable certificate
    cert_code = f"CERT-2026-{random.randint(10000, 99999)}"
    cert = Certificate(
        certificate_code=cert_code,
        student_name=data["student_name"],
        course_title=data["course_title"],
        issue_date=datetime.now().strftime("%Y-%m-%d"),
        grade="Distinction (A+)",
        instructor_name="TechAcademy Academic Board"
    )
    session.add(cert)

    session.commit()
    res = enrollment.to_dict()
    res["certificate_code"] = cert_code
    session.close()
    return jsonify({"message": "Enrollment successful!", "enrollment": res}), 201

@app.route("/api/enrollments", methods=["GET"])
def get_enrollments():
    session = SessionLocal()
    enrollments = session.query(Enrollment).order_by(Enrollment.id.desc()).all()
    res = [e.to_dict() for e in enrollments]
    session.close()
    return jsonify(res)

# --- INQUIRIES ENDPOINT ---
@app.route("/api/inquiries", methods=["POST"])
def create_inquiry():
    data = request.json or {}
    if not data.get("name") or not data.get("email") or not data.get("message"):
        return jsonify({"error": "Name, email and message are required."}), 400
        
    session = SessionLocal()
    inquiry = Inquiry(
        name=data["name"],
        email=data["email"],
        phone=data.get("phone", "N/A"),
        course_name=data.get("course_name", "General Counseling"),
        message=data["message"],
        status="New"
    )
    session.add(inquiry)
    session.commit()
    res = inquiry.to_dict()
    session.close()
    return jsonify({"message": "Inquiry submitted!", "inquiry": res}), 201

@app.route("/api/inquiries", methods=["GET"])
def list_inquiries():
    session = SessionLocal()
    inquiries = session.query(Inquiry).order_by(Inquiry.id.desc()).all()
    res = [i.to_dict() for i in inquiries]
    session.close()
    return jsonify(res)

# --- CERTIFICATES VERIFICATION ---
@app.route("/api/certificates/<path:code_or_name>", methods=["GET"])
@app.route("/api/certificates", methods=["GET"])
def verify_certificate(code_or_name=None):
    term = (code_or_name or request.args.get("code") or request.args.get("q") or "").strip()
    if not term:
        return jsonify({"valid": False, "message": "Search code or student name required."}), 400

    session = SessionLocal()
    cert = session.query(Certificate).filter(
        (Certificate.certificate_code.ilike(term)) | 
        (Certificate.student_name.ilike(f"%{term}%"))
    ).first()
    
    if not cert:
        session.close()
        return jsonify({"valid": False, "message": "No certificate record found."}), 404
        
    res = cert.to_dict()
    session.close()
    return jsonify({"valid": True, "certificate": res})

# --- ADMIN STATS ENDPOINT ---
@app.route("/api/stats", methods=["GET"])
def get_stats():
    session = SessionLocal()
    total_courses = session.query(Course).count()
    total_students = session.query(Enrollment).count() + 14850
    total_demos = session.query(DemoBooking).count() + 320
    total_inquiries = session.query(Inquiry).count()
    
    revenue_sum = sum(e.total_fee for e in session.query(Enrollment).all()) + 482500.0
    
    res = {
        "total_courses": total_courses,
        "total_students": total_students,
        "total_demo_bookings": total_demos,
        "total_inquiries": total_inquiries,
        "total_revenue": revenue_sum,
        "hiring_partners": 420,
        "placement_rate": "98.4%",
        "avg_salary": "$94,000 / yr"
    }
    session.close()
    return jsonify(res)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
