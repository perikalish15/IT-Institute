import json
import random
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from api.models import User, Course, Batch, Enrollment, DemoBooking, Inquiry, Certificate
from api.seed import seed_db

def ensure_seeded():
    try:
        seed_db()
    except Exception as e:
        print("Seed check:", e)

@csrf_exempt
def health_check(request):
    ensure_seeded()
    return JsonResponse({
        "status": "online",
        "system": "TechAcademy Institute Django API v1.0",
        "timestamp": datetime.utcnow().isoformat()
    })

@csrf_exempt
def auth_login(request):
    ensure_seeded()
    if request.method != 'POST':
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    try:
        data = json.loads(request.body.decode('utf-8')) if request.body else {}
    except Exception:
        data = {}

    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()
    role_requested = data.get("role")

    if not email or not password:
        return JsonResponse({"error": "Email and password are required."}, status=400)

    user = User.objects.filter(email__iexact=email).first()
    if not user or user.password != password:
        return JsonResponse({"error": "Invalid email credentials or password."}, status=401)

    if role_requested and user.role != role_requested and user.role != "admin":
        return JsonResponse({"error": f"Access denied. Account role is '{user.role}', expected '{role_requested}'."}, status=403)

    user_dict = user.to_dict()
    enrolled_courses = []
    if user.role == "student":
        enrollments = Enrollment.objects.filter(student_email__iexact=email)
        enrolled_courses = [e.to_dict() for e in enrollments]

    return JsonResponse({
        "message": "Login successful!",
        "user": user_dict,
        "enrolled_courses": enrolled_courses
    })

@csrf_exempt
def auth_register(request):
    ensure_seeded()
    if request.method != 'POST':
        return JsonResponse({"error": "Method not allowed"}, status=405)
        
    try:
        data = json.loads(request.body.decode('utf-8')) if request.body else {}
    except Exception:
        data = {}

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()
    phone = data.get("phone", "")

    if not name or not email or not password:
        return JsonResponse({"error": "Name, email and password are required."}, status=400)

    if User.objects.filter(email__iexact=email).exists():
        return JsonResponse({"error": "Account already exists with this email address."}, status=400)

    user = User.objects.create(
        name=name,
        email=email,
        phone=phone,
        password=password,
        role="student"
    )
    return JsonResponse({"message": "Registration successful!", "user": user.to_dict()}, status=201)

@csrf_exempt
def admin_enroll_student(request):
    ensure_seeded()
    if request.method != 'POST':
        return JsonResponse({"error": "Method not allowed"}, status=405)
        
    try:
        data = json.loads(request.body.decode('utf-8')) if request.body else {}
    except Exception:
        data = {}

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
        return JsonResponse({"error": "Student name and email are required."}, status=400)

    user, created = User.objects.get_or_create(
        email__iexact=email,
        defaults={
            "name": name,
            "email": email,
            "phone": phone,
            "password": password,
            "role": "student"
        }
    )
    if not created:
        user.name = name
        user.phone = phone
        user.password = password
        user.save()

    enrollment = Enrollment.objects.create(
        student_name=name,
        student_email=email,
        student_phone=phone,
        course_id=course_id,
        course_title=course_title,
        batch_code=batch_code,
        total_fee=total_fee,
        payment_status=payment_status
    )

    cert_code = f"CERT-2026-{random.randint(10000, 99999)}"
    Certificate.objects.create(
        certificate_code=cert_code,
        student_name=name,
        course_title=course_title,
        issue_date=datetime.now().strftime("%Y-%m-%d"),
        grade="Distinction (A+)",
        instructor_name="TechAcademy Academic Board"
    )

    res = enrollment.to_dict()
    res["certificate_code"] = cert_code
    res["login_email"] = email
    res["login_password"] = password

    return JsonResponse({
        "message": f"Student account created for {name}!",
        "enrollment": res,
        "credentials": {
            "name": name,
            "email": email,
            "password": password
        }
    }, status=201)

@csrf_exempt
def get_student_courses(request):
    ensure_seeded()
    email = (request.GET.get("email") or "").strip().lower()
    if not email:
        return JsonResponse([], safe=False)
        
    enrollments = Enrollment.objects.filter(student_email__iexact=email)
    res = [e.to_dict() for e in enrollments]
    return JsonResponse(res, safe=False)

@csrf_exempt
def courses_list_create(request):
    ensure_seeded()
    if request.method == 'GET':
        category = request.GET.get("category")
        search = request.GET.get("q")
        
        queryset = Course.objects.all()
        if category and category != "All":
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(Q(title__icontains=search) | Q(description__icontains=search))
            
        res = [c.to_dict() for c in queryset]
        return JsonResponse(res, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8')) if request.body else {}
        except Exception:
            data = {}

        required = ["title", "category", "description", "duration", "price", "discount_price", "trainer_name", "trainer_role"]
        for r in required:
            if not data.get(r):
                return JsonResponse({"error": f"Missing required field: {r}"}, status=400)
                
        syllabus = data.get("syllabus", [])
        course = Course.objects.create(
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
        return JsonResponse({"message": "Course created successfully!", "course": course.to_dict()}, status=201)

@csrf_exempt
def course_detail(request, course_id):
    ensure_seeded()
    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        return JsonResponse({"error": "Course not found"}, status=404)
        
    batches = Batch.objects.filter(course=course)
    data = course.to_dict()
    data["upcoming_batches"] = [b.to_dict() for b in batches]
    return JsonResponse(data)

@csrf_exempt
def batches_list_create(request):
    ensure_seeded()
    if request.method == 'GET':
        batches = Batch.objects.all()
        return JsonResponse([b.to_dict() for b in batches], safe=False)
    elif request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8')) if request.body else {}
        except Exception:
            data = {}
            
        course_id = data.get("course_id", 1)
        course = Course.objects.filter(id=course_id).first() or Course.objects.first()
        code = f"BTH-{random.randint(1000, 9999)}"
        
        batch = Batch.objects.create(
            course=course,
            batch_code=data.get("batch_code", code),
            start_date=data.get("start_date", "2026-10-01"),
            timings=data.get("timings", "7:00 PM - 9:00 PM"),
            mode=data.get("mode", "Live Online"),
            seats_total=int(data.get("seats_total", 30)),
            seats_left=int(data.get("seats_left", 30)),
            instructor=data.get("instructor", "Senior Lead"),
            status="Filling Fast"
        )
        return JsonResponse({"message": "Batch created!", "batch": batch.to_dict()}, status=201)

@csrf_exempt
def book_demo(request):
    ensure_seeded()
    if request.method != 'POST':
        return JsonResponse({"error": "Method not allowed"}, status=405)
        
    try:
        data = json.loads(request.body.decode('utf-8')) if request.body else {}
    except Exception:
        data = {}

    for f in ["name", "email", "phone", "course_interest"]:
        if not data.get(f):
            return JsonResponse({"error": f"Missing field: {f}"}, status=400)
            
    booking = DemoBooking.objects.create(
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        course_interest=data["course_interest"],
        slot_date=data.get("slot_date", "Tomorrow"),
        slot_time=data.get("slot_time", "06:00 PM"),
        status="Confirmed"
    )
    return JsonResponse({"message": "Free Live Demo Class Booked!", "booking": booking.to_dict()}, status=201)

@csrf_exempt
def list_demo_bookings(request):
    ensure_seeded()
    bookings = DemoBooking.objects.order_by('-id')
    return JsonResponse([b.to_dict() for b in bookings], safe=False)

@csrf_exempt
def enrollments_list_create(request):
    ensure_seeded()
    if request.method == 'GET':
        enrollments = Enrollment.objects.order_by('-id')
        return JsonResponse([e.to_dict() for e in enrollments], safe=False)
        
    elif request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8')) if request.body else {}
        except Exception:
            data = {}

        for f in ["student_name", "student_email", "student_phone", "course_id", "course_title"]:
            if not data.get(f):
                return JsonResponse({"error": f"Missing field: {f}"}, status=400)
                
        email = data["student_email"].strip().lower()
        if not User.objects.filter(email__iexact=email).exists():
            User.objects.create(
                name=data["student_name"],
                email=email,
                phone=data["student_phone"],
                password="student123",
                role="student"
            )

        enrollment = Enrollment.objects.create(
            student_name=data["student_name"],
            student_email=data["student_email"],
            student_phone=data["student_phone"],
            course_id=int(data["course_id"]),
            course_title=data["course_title"],
            batch_code=data.get("batch_code", "GEN-2026-A"),
            total_fee=float(data.get("total_fee", 499.0)),
            payment_status="Completed"
        )

        cert_code = f"CERT-2026-{random.randint(10000, 99999)}"
        Certificate.objects.create(
            certificate_code=cert_code,
            student_name=data["student_name"],
            course_title=data["course_title"],
            issue_date=datetime.now().strftime("%Y-%m-%d"),
            grade="Distinction (A+)",
            instructor_name="TechAcademy Academic Board"
        )

        res = enrollment.to_dict()
        res["certificate_code"] = cert_code
        return JsonResponse({"message": "Enrollment successful!", "enrollment": res}, status=201)

@csrf_exempt
def inquiries_list_create(request):
    ensure_seeded()
    if request.method == 'GET':
        inquiries = Inquiry.objects.order_by('-id')
        return JsonResponse([i.to_dict() for i in inquiries], safe=False)
    elif request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8')) if request.body else {}
        except Exception:
            data = {}

        if not data.get("name") or not data.get("email") or not data.get("message"):
            return JsonResponse({"error": "Name, email and message are required."}, status=400)
            
        inquiry = Inquiry.objects.create(
            name=data["name"],
            email=data["email"],
            phone=data.get("phone", "N/A"),
            course_name=data.get("course_name", "General Counseling"),
            message=data["message"],
            status="New"
        )
        return JsonResponse({"message": "Inquiry submitted!", "inquiry": inquiry.to_dict()}, status=201)

@csrf_exempt
def verify_certificate(request, code_or_name=None):
    ensure_seeded()
    term = (code_or_name or request.GET.get("code") or request.GET.get("q") or "").strip()
    if not term:
        return JsonResponse({"valid": False, "message": "Search code or student name required."}, status=400)

    cert = Certificate.objects.filter(
        Q(certificate_code__iexact=term) | Q(student_name__icontains=term)
    ).first()

    if not cert:
        return JsonResponse({"valid": False, "message": "No certificate record found."}, status=404)

    return JsonResponse({"valid": True, "certificate": cert.to_dict()})

@csrf_exempt
def get_stats(request):
    ensure_seeded()
    total_courses = Course.objects.count()
    total_students = Enrollment.objects.count() + 14850
    total_demos = DemoBooking.objects.count() + 320
    total_inquiries = Inquiry.objects.count()
    
    revenue_sum = sum(e.total_fee for e in Enrollment.objects.all()) + 482500.0
    
    return JsonResponse({
        "total_courses": total_courses,
        "total_students": total_students,
        "total_demo_bookings": total_demos,
        "total_inquiries": total_inquiries,
        "total_revenue": revenue_sum,
        "hiring_partners": 420,
        "placement_rate": "98.4%",
        "avg_salary": "$94,000 / yr"
    })
