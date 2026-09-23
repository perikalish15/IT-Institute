import os
import json
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

import shutil

LOCAL_DB_PATH = os.path.join(os.path.dirname(__file__), "institute.db")

# Detect Vercel environment or read-only filesystem
if os.environ.get("VERCEL") or not os.access(os.path.dirname(__file__), os.W_OK):
    DB_PATH = "/tmp/institute.db"
    if not os.path.exists(DB_PATH) and os.path.exists(LOCAL_DB_PATH):
        try:
            shutil.copyfile(LOCAL_DB_PATH, DB_PATH)
        except Exception:
            pass
else:
    DB_PATH = LOCAL_DB_PATH

ENGINE = create_engine(f"sqlite:///{DB_PATH}", echo=False, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    phone = Column(String(30), nullable=True)
    password = Column(String(100), nullable=False)
    role = Column(String(20), default="student") # "student" or "admin"
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "role": self.role
        }

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    duration = Column(String(50), nullable=False)
    price = Column(Float, nullable=False)
    discount_price = Column(Float, nullable=False)
    level = Column(String(50), default="Beginner to Advanced")
    rating = Column(Float, default=4.8)
    reviews_count = Column(Integer, default=120)
    image_url = Column(Text, nullable=True)
    syllabus_json = Column(Text, nullable=False)
    trainer_name = Column(String(100), nullable=False)
    trainer_role = Column(String(150), nullable=False)
    mode = Column(String(50), default="Online & Offline")
    tags = Column(String(250), default="Top Rated, Job Guarantee")

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
            "tags": [t.strip() for t in self.tags.split(",")] if self.tags else []
        }

class Batch(Base):
    __tablename__ = "batches"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    batch_code = Column(String(50), nullable=False, unique=True)
    start_date = Column(String(50), nullable=False)
    timings = Column(String(100), nullable=False)
    mode = Column(String(50), default="Live Online")
    seats_total = Column(Integer, default=30)
    seats_left = Column(Integer, default=5)
    instructor = Column(String(100), nullable=False)
    status = Column(String(50), default="Filling Fast")

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

class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String(100), nullable=False)
    student_email = Column(String(120), nullable=False)
    student_phone = Column(String(20), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    course_title = Column(String(200), nullable=False)
    batch_code = Column(String(50), nullable=False)
    total_fee = Column(Float, nullable=False)
    payment_status = Column(String(50), default="Completed")
    enrolled_at = Column(DateTime, default=datetime.utcnow)

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

class DemoBooking(Base):
    __tablename__ = "demo_bookings"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), nullable=False)
    phone = Column(String(20), nullable=False)
    course_interest = Column(String(200), nullable=False)
    slot_date = Column(String(50), nullable=False)
    slot_time = Column(String(50), nullable=False)
    status = Column(String(50), default="Confirmed")
    created_at = Column(DateTime, default=datetime.utcnow)

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

class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), nullable=False)
    phone = Column(String(20), nullable=False)
    course_name = Column(String(200), nullable=True)
    message = Column(Text, nullable=False)
    status = Column(String(50), default="New")
    created_at = Column(DateTime, default=datetime.utcnow)

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

class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    certificate_code = Column(String(50), unique=True, nullable=False)
    student_name = Column(String(100), nullable=False)
    course_title = Column(String(200), nullable=False)
    issue_date = Column(String(50), nullable=False)
    grade = Column(String(10), default="A+")
    instructor_name = Column(String(100), default="Dr. Aris Vance")

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

def init_db():
    Base.metadata.create_all(bind=ENGINE)
