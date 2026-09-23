import json
from django.db import models
from django.utils import timezone

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30, blank=True, default='')
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=20, default='student')
    created_at = models.DateTimeField(auto_now_add=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "role": self.role
        }

class Course(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.CharField(max_length=50)
    price = models.FloatField()
    discount_price = models.FloatField()
    level = models.CharField(max_length=50, default='Beginner to Advanced')
    rating = models.FloatField(default=4.8)
    reviews_count = models.IntegerField(default=120)
    image_url = models.TextField(blank=True, default='')
    syllabus_json = models.TextField(default='[]')
    trainer_name = models.CharField(max_length=100)
    trainer_role = models.CharField(max_length=150)
    mode = models.CharField(max_length=50, default='Online & Offline')
    tags = models.CharField(max_length=250, default='Top Rated, Job Guarantee')

    def to_dict(self):
        try:
            syllabus = json.loads(self.syllabus_json) if self.syllabus_json else []
        except Exception:
            syllabus = []
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "description": self.description,
            "duration": self.duration,
            "price": self.price,
            "discount_price": self.discount_price,
            "level": self.level,
            "rating": self.rating,
            "reviews_count": self.reviews_count,
            "image_url": self.image_url,
            "syllabus": syllabus,
            "trainer_name": self.trainer_name,
            "trainer_role": self.trainer_role,
            "mode": self.mode,
            "tags": [t.strip() for t in self.tags.split(',')] if self.tags else []
        }

class Batch(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='batches')
    batch_code = models.CharField(max_length=50, unique=True)
    start_date = models.CharField(max_length=50)
    timings = models.CharField(max_length=100)
    mode = models.CharField(max_length=50, default='Live Online')
    seats_total = models.IntegerField(default=30)
    seats_left = models.IntegerField(default=5)
    instructor = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default='Filling Fast')

    def to_dict(self):
        return {
            "id": self.id,
            "course_id": self.course_id,
            "batch_code": self.batch_code,
            "start_date": self.start_date,
            "timings": self.timings,
            "mode": self.mode,
            "seats_total": self.seats_total,
            "seats_left": self.seats_left,
            "instructor": self.instructor,
            "status": self.status
        }

class Enrollment(models.Model):
    student_name = models.CharField(max_length=100)
    student_email = models.CharField(max_length=120)
    student_phone = models.CharField(max_length=30)
    course_id = models.IntegerField()
    course_title = models.CharField(max_length=200)
    batch_code = models.CharField(max_length=50)
    total_fee = models.FloatField()
    payment_status = models.CharField(max_length=50, default='Completed')
    enrolled_at = models.DateTimeField(auto_now_add=True)

    def to_dict(self):
        return {
            "id": self.id,
            "student_name": self.student_name,
            "student_email": self.student_email,
            "student_phone": self.student_phone,
            "course_id": self.course_id,
            "course_title": self.course_title,
            "batch_code": self.batch_code,
            "total_fee": self.total_fee,
            "payment_status": self.payment_status,
            "enrolled_at": self.enrolled_at.strftime("%Y-%m-%d %H:%M") if self.enrolled_at else ""
        }

class DemoBooking(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    course_interest = models.CharField(max_length=200)
    slot_date = models.CharField(max_length=50)
    slot_time = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default='Confirmed')
    created_at = models.DateTimeField(auto_now_add=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "course_interest": self.course_interest,
            "slot_date": self.slot_date,
            "slot_time": self.slot_time,
            "status": self.status,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M") if self.created_at else ""
        }

class Inquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    course_name = models.CharField(max_length=200, blank=True, default='')
    message = models.TextField()
    status = models.CharField(max_length=50, default='New')
    created_at = models.DateTimeField(auto_now_add=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "course_name": self.course_name,
            "message": self.message,
            "status": self.status,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M") if self.created_at else ""
        }

class Certificate(models.Model):
    certificate_code = models.CharField(max_length=50, unique=True)
    student_name = models.CharField(max_length=100)
    course_title = models.CharField(max_length=200)
    issue_date = models.CharField(max_length=50)
    grade = models.CharField(max_length=20, default='A+')
    instructor_name = models.CharField(max_length=100, default='Dr. Aris Vance')

    def to_dict(self):
        return {
            "id": self.id,
            "certificate_code": self.certificate_code,
            "student_name": self.student_name,
            "course_title": self.course_title,
            "issue_date": self.issue_date,
            "grade": self.grade,
            "instructor_name": self.instructor_name
        }
