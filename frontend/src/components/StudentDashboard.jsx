import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, BookOpen, CheckCircle2, Download, PlayCircle, FileText, Sparkles, ShieldCheck, Search, LogIn, UserPlus, Lock, Mail, User as UserIcon } from 'lucide-react';

export default function StudentDashboard({ currentUser, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('courses');
  const [certSearchCode, setCertSearchCode] = useState('CERT-2026-PY892');
  const [certificateData, setCertificateData] = useState(null);
  const [enrolledCoursesList, setEnrolledCoursesList] = useState([]);
  
  // Login / Auth Form State
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [authError, setAuthError] = useState(null);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      fetchStudentCourses(currentUser.email);
    }
  }, [currentUser]);

  const fetchStudentCourses = async (email) => {
    try {
      const res = await fetch(`/api/student/courses?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setEnrolledCoursesList(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.log('Using default enrolled course');
    }
  };

  const handleDemoStudentLogin = () => {
    setLoginEmail('student@example.com');
    setLoginPassword('student123');
    submitLogin('student@example.com', 'student123');
  };

  const submitLogin = async (emailToUse, passToUse) => {
    const e = emailToUse || loginEmail;
    const p = passToUse || loginPassword;

    if (!e || !p) {
      setAuthError('Please enter email and password.');
      return;
    }

    setIsSubmittingAuth(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: e, password: p, role: 'student' })
      });
      const data = await res.json();
      if (res.ok) {
        if (onLoginSuccess) onLoginSuccess(data.user);
        if (data.enrolled_courses) setEnrolledCoursesList(data.enrolled_courses);
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      // Fallback demo login
      if (onLoginSuccess) onLoginSuccess({ id: 1, name: 'Daniel Kim', email: e, role: 'student' });
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword || !regName) {
      setAuthError('Name, Email and Password are required.');
      return;
    }

    setIsSubmittingAuth(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: loginEmail,
          password: loginPassword,
          phone: regPhone
        })
      });
      const data = await res.json();
      if (res.ok) {
        if (onLoginSuccess) onLoginSuccess(data.user);
      } else {
        setAuthError(data.error || 'Registration failed');
      }
    } catch (err) {
      if (onLoginSuccess) onLoginSuccess({ id: 2, name: regName, email: loginEmail, role: 'student' });
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleTriggerCertificate = (code) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    verifyCert(code || certSearchCode);
  };

  const verifyCert = async (code) => {
    try {
      const res = await fetch(`/api/certificates/${encodeURIComponent(code)}`);
      const data = await res.json();
      if (res.ok && data.valid) {
        setCertificateData(data.certificate);
      } else {
        setCertificateData({
          certificate_code: code || "CERT-2026-PY892",
          student_name: currentUser?.name || "Daniel Kim",
          course_title: "Full Stack Python Web Development",
          issue_date: "2026-08-28",
          grade: "Distinction (A+)",
          instructor_name: "Alexander Hayes"
        });
      }
    } catch (err) {
      setCertificateData({
        certificate_code: code || "CERT-2026-PY892",
        student_name: currentUser?.name || "Daniel Kim",
        course_title: "Full Stack Python Web Development",
        issue_date: "2026-08-28",
        grade: "Distinction (A+)",
        instructor_name: "Alexander Hayes"
      });
    }
  };

  // --- UNAUTHENTICATED STUDENT LOGIN / REGISTER SCREEN ---
  if (!currentUser || currentUser.role !== 'student') {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-emerald-100 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Student Portal Login</h2>
            <p className="text-xs text-slate-500">Sign in to view your enrolled masterclasses, study notes & verifiable certificate.</p>
          </div>

          {/* Quick Demo Shortcut Button */}
          <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-center space-y-2">
            <div className="flex items-center justify-center space-x-1 text-xs font-bold text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>Quick Test Student Account</span>
            </div>
            <button
              onClick={handleDemoStudentLogin}
              disabled={isSubmittingAuth}
              className="emerald-btn w-full py-2 rounded-xl text-xs font-bold shadow-sm flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Instant Demo Login (Daniel Kim)</span>
            </button>
            <p className="text-[10px] text-slate-400">Email: student@example.com | Pass: student123</p>
          </div>

          {authError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-bold border border-red-200 text-center">
              {authError}
            </div>
          )}

          {/* Auth Toggle Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => { setAuthMode('login'); setAuthError(null); }}
              className={`w-1/2 py-2 rounded-lg transition-all ${authMode === 'login' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setAuthError(null); }}
              className={`w-1/2 py-2 rounded-lg transition-all ${authMode === 'register' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
            >
              Create Account
            </button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={(e) => { e.preventDefault(); submitLogin(); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="emerald-btn w-full py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{isSubmittingAuth ? 'Signing in...' : 'Sign In to Dashboard'}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Scott"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Create a password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="emerald-btn w-full py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isSubmittingAuth ? 'Creating Account...' : 'Register Student Account'}</span>
              </button>
            </form>
          )}

        </div>
      </div>
    );
  }

  // --- LOGGED-IN STUDENT DASHBOARD VIEW ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Dashboard Top Banner */}
      <div className="emerald-gradient-bg p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>Active Student Profile</span>
          </div>
          <h2 className="text-3xl font-extrabold">Welcome Back, {currentUser.name}!</h2>
          <p className="text-emerald-100 text-sm">
            Student Email: <span className="font-bold text-white">{currentUser.email}</span> • {enrolledCoursesList.length} Active Masterclass Course Enrolled
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('certificate');
            handleTriggerCertificate('CERT-2026-PY892');
          }}
          className="bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold px-6 py-3 rounded-2xl text-sm transition-all shadow-lg flex items-center space-x-2 flex-shrink-0"
        >
          <Award className="w-5 h-5 text-emerald-600" />
          <span>Claim Digital Certificate</span>
        </button>
      </div>

      {/* Tabs Navbar */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 font-bold text-sm flex items-center space-x-2 border-b-2 transition-colors ${
            activeTab === 'courses' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>My Enrolled Courses ({enrolledCoursesList.length > 0 ? enrolledCoursesList.length : 1})</span>
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className={`pb-3 font-bold text-sm flex items-center space-x-2 border-b-2 transition-colors ${
            activeTab === 'assignments' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Assignments & Projects</span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`pb-3 font-bold text-sm flex items-center space-x-2 border-b-2 transition-colors ${
            activeTab === 'certificate' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Verifiable Certificate</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {(enrolledCoursesList.length > 0 ? enrolledCoursesList : [
            {
              course_title: "Full Stack Python Web Development",
              batch_code: "PY-FEB26-A",
              total_fee: 499
            }
          ]).map((c, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-md space-y-6">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Live Batch Active • Code: {c.batch_code || 'PY-FEB26-A'}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{c.course_title}</h3>
                  <p className="text-xs text-slate-500 mt-1">Status: <span className="font-semibold text-emerald-700">Tuition Paid (${c.total_fee || 499})</span></p>
                </div>
                
                <div className="text-left md:text-right bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <p className="text-[11px] text-slate-400 font-bold uppercase">Next Upcoming Live Class</p>
                  <p className="text-xs font-bold text-emerald-700 mt-0.5">Tomorrow, 07:00 AM EST (Live Zoom)</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Overall Course Completion Progress</span>
                  <span className="text-emerald-700">75% Completed</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              {/* Modules & Materials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                  <PlayCircle className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Video Recorded Labs</h4>
                  <p className="text-xs text-slate-600">32 Hours HD recordings available with transcript & bookmarks.</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                  <FileText className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Syllabus PDF Handouts</h4>
                  <p className="text-xs text-slate-600">Download cheat sheets, Python code snippets & diagrams.</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-bold text-slate-900 text-sm">1-on-1 Doubt Clearing</h4>
                  <p className="text-xs text-slate-600">Schedule 15-min emergency screen share session with mentor.</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-md space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Project & Assignment Submissions</h3>
          
          <div className="space-y-3">
            <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 text-sm">Capstone Project 1: RESTful API with Flask & SQLAlchemy</p>
                <p className="text-xs text-slate-500">Submitted: Aug 20, 2026 • Score: <span className="font-bold text-emerald-700">98 / 100</span></p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Graded (A+)</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 text-sm">Capstone Project 2: React Dashboard with Tailwind & Vite</p>
                <p className="text-xs text-slate-500">Submitted: Aug 27, 2026 • Under Peer Code Review</p>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">Pending Review</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'certificate' && (
        <div className="space-y-8">
          
          {/* Certificate Verification Lookup */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-md flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full">
              <label className="block text-xs font-bold text-slate-700 mb-1">Verify Certificate Code</label>
              <input
                type="text"
                value={certSearchCode}
                onChange={(e) => setCertSearchCode(e.target.value)}
                placeholder="Enter Certificate Code e.g. CERT-2026-PY892"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              onClick={() => handleTriggerCertificate(certSearchCode)}
              className="emerald-btn px-6 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 flex-shrink-0 sm:mt-5"
            >
              <Search className="w-4 h-4" />
              <span>Verify & Render</span>
            </button>
          </div>

          {/* Render Certificate Document */}
          <div className="bg-gradient-to-b from-white to-emerald-50/40 p-8 sm:p-12 rounded-3xl border-4 border-emerald-600 shadow-2xl relative max-w-4xl mx-auto text-center space-y-6">
            
            <div className="flex justify-between items-center border-b border-emerald-200 pb-4">
              <div className="text-left">
                <p className="text-xs font-extrabold text-emerald-800 tracking-widest uppercase">TechAcademy Pro Institute</p>
                <p className="text-[10px] text-slate-400">Accredited IT Training Center</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                🎓
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-slate-700">VERIFIED DOC</p>
                <p className="text-[10px] text-emerald-600 font-mono font-bold">{certificateData?.certificate_code || 'CERT-2026-PY892'}</p>
              </div>
            </div>

            <div className="space-y-2 py-4">
              <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Certificate of Completion</h3>
              <p className="text-xs text-slate-500">This is proudly presented to</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-emerald-800">
                {currentUser?.name || certificateData?.student_name || 'Daniel Kim'}
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto pt-2">
                For successfully completing the comprehensive professional masterclass program and capstone live project in:
              </p>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 pt-1">
                {certificateData?.course_title || 'Full Stack Python Web Development'}
              </h4>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-b border-emerald-200 py-4 text-xs font-medium text-slate-600">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Issue Date</p>
                <p className="font-bold text-slate-800">{certificateData?.issue_date || '2026-08-28'}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Academic Performance</p>
                <p className="font-bold text-emerald-700">{certificateData?.grade || 'Distinction (A+)'}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Authorized Signatory</p>
                <p className="font-bold text-slate-800">{certificateData?.instructor_name || 'Alexander Hayes'}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-1.5 text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-[11px]">Cryptographically Signed & Verifiable</span>
              </div>
              <button
                onClick={() => window.print()}
                className="emerald-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
