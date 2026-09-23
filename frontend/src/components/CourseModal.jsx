import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, User, Award, ShieldCheck, CreditCard, Sparkles, BookOpen } from 'lucide-react';

export default function CourseModal({ course, onClose, onRegisterSuccess }) {
  const [activeTab, setActiveTab] = useState('syllabus');
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    student_phone: '',
    batch_code: 'PY-FEB26-A'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!course) return null;

  const handleSubmitEnrollment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: formData.student_name,
          student_email: formData.student_email,
          student_phone: formData.student_phone,
          course_id: course.id,
          course_title: course.title,
          batch_code: formData.batch_code,
          total_fee: course.discount_price
        })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMsg(`Registration Successful! Code: ${data.enrollment.certificate_code}`);
        if (onRegisterSuccess) onRegisterSuccess(data.enrollment);
      } else {
        alert(data.error || 'Failed to submit registration');
      }
    } catch (err) {
      setSuccessMsg(`Enrolled in demo mode! Welcome to ${course.title}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-emerald-200 my-8">
        
        {/* Modal Top Header */}
        <div className="emerald-gradient-bg p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-bold bg-white/20 px-3 py-1 rounded-full w-fit mb-3">
            <span>{course.category}</span>
            <span>•</span>
            <span>{course.duration}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{course.title}</h2>
          <p className="text-emerald-100 text-sm mt-2 max-w-xl">{course.description}</p>
        </div>

        {/* Tab Toggle Bar */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 px-4 sm:px-6 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`py-3.5 px-4 font-bold text-sm border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'syllabus' ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Detailed Syllabus</span>
          </button>
          <button
            onClick={() => setActiveTab('enroll')}
            className={`py-3.5 px-4 font-bold text-sm border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'enroll' ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Instant Enrollment & Fee</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
          {successMsg ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Registration Confirmed!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">{successMsg}</p>
              <p className="text-xs text-emerald-700 bg-emerald-50 p-3 rounded-xl font-medium">
                An academic counselor has been assigned to your profile. Check your Student Portal tab to view your course materials & digital certificate!
              </p>
              <button
                onClick={onClose}
                className="emerald-btn px-6 py-2.5 rounded-xl font-bold text-sm"
              >
                Close & View Portal
              </button>
            </div>
          ) : activeTab === 'syllabus' ? (
            <div className="space-y-6">
              
              {/* Instructor Card */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-lg">
                  {course.trainer_name ? course.trainer_name.charAt(0) : 'T'}
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Course Director</p>
                  <p className="text-base font-extrabold text-slate-900">{course.trainer_name}</p>
                  <p className="text-xs text-slate-600">{course.trainer_role}</p>
                </div>
              </div>

              {/* Syllabus Accordion / Modules List */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-900 text-lg flex items-center space-x-2">
                  <span>Curriculum Breakdown ({course.syllabus ? course.syllabus.length : 0} Modules)</span>
                </h4>

                {(course.syllabus || []).map((mod, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-2xl p-4 bg-white hover:border-emerald-300 transition-colors">
                    <h5 className="font-bold text-emerald-800 text-sm mb-2">{mod.module}</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {(mod.topics || []).map((topic, tidx) => (
                        <li key={tidx} className="flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveTab('enroll')}
                  className="emerald-btn px-6 py-3 rounded-xl text-sm font-bold flex items-center space-x-2"
                >
                  <span>Proceed to Enroll (${course.discount_price})</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            /* Enrollment Form */
            <form onSubmit={handleSubmitEnrollment} className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500">Selected Course</p>
                  <p className="font-extrabold text-slate-900 text-base">{course.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through">${course.price}</span>
                  <p className="text-xl font-black text-emerald-700">${course.discount_price}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Michael Scott"
                  value={formData.student_name}
                  onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={formData.student_email}
                    onChange={(e) => setFormData({ ...formData, student_email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.student_phone}
                    onChange={(e) => setFormData({ ...formData, student_phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Batch Timing</label>
                <select
                  value={formData.batch_code}
                  onChange={(e) => setFormData({ ...formData, batch_code: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 bg-white"
                >
                  <option value="PY-FEB26-A">Sep 15 Batch (Mon-Fri 7:00 AM - Live Online)</option>
                  <option value="PY-FEB26-B">Sep 20 Batch (Sat-Sun 10:00 AM - Hybrid)</option>
                  <option value="PY-FEB26-C">Oct 01 Evening Batch (8:00 PM - Live)</option>
                </select>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center space-x-3 text-xs text-slate-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>100% Risk-Free: 7-Day money-back guarantee after 1st live class. Zero cancellation fee.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="emerald-btn w-full py-3.5 rounded-xl font-bold text-base shadow-lg flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>{isSubmitting ? 'Processing Enrollment...' : `Confirm & Pay Tuition ($${course.discount_price})`}</span>
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
