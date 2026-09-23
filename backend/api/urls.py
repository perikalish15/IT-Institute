from django.urls import path
from api import views

urlpatterns = [
    path('health', views.health_check),
    path('auth/login', views.auth_login),
    path('auth/register', views.auth_register),
    path('admin/enroll-student', views.admin_enroll_student),
    path('student/courses', views.get_student_courses),
    path('courses', views.courses_list_create),
    path('courses/<int:course_id>', views.course_detail),
    path('batches', views.batches_list_create),
    path('demo-booking', views.book_demo),
    path('demo-bookings', views.list_demo_bookings),
    path('enrollments', views.enrollments_list_create),
    path('inquiries', views.inquiries_list_create),
    path('certificates', views.verify_certificate),
    path('certificates/<path:code_or_name>', views.verify_certificate),
    path('stats', views.get_stats),
]
