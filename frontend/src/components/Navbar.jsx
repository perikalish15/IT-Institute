import React, { useState } from 'react';
import { GraduationCap, Sparkles, BookOpen, Calendar, Compass, Calculator, UserCheck, ShieldCheck, Menu, X, Award, LogOut, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenDemoModal, currentUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'catalog', label: 'All Courses', icon: BookOpen },
    { id: 'roadmap', label: 'Career Quiz', icon: Compass },
    { id: 'calculator', label: 'Fees & EMI', icon: Calculator },
    { id: 'placement', label: 'Placements', icon: UserCheck },
    { id: 'student', label: 'Student Portal', icon: Award, badge: currentUser?.role === 'student' ? 'Active' : 'Login' },
    { id: 'admin', label: 'Admin Panel', icon: ShieldCheck, badge: currentUser?.role === 'admin' ? 'Active' : 'Gate' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all duration-200">
      {/* Top Notification Ticker */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-emerald-100">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-emerald-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full pulse-emerald">
              ADMISSIONS OPEN
            </span>
            <span className="truncate">🔥 September 2026 Cohort: Enroll now for 45% Early Bird Scholarship & Live Mentorship.</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-xs font-semibold">
            {currentUser ? (
              <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold">
                Logged in as {currentUser.name} ({currentUser.role})
              </span>
            ) : (
              <span>🔑 Student & Admin Login Ready</span>
            )}
            <span>📞 Helpline: +1 (800) 555-TECH</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('catalog')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900">
                  Tech<span className="text-emerald-600">Academy</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-200 uppercase">
                  PRO
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                A to Z Premier IT Training Institute
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-sm' 
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`ml-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions & User Profile */}
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-800">{currentUser.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Log Out"
                  className="bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 p-2 rounded-xl border border-slate-200 text-xs font-bold flex items-center space-x-1 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('student')}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            <button
              onClick={onOpenDemoModal}
              className="emerald-btn px-4 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
              <span className="hidden sm:inline">Book Demo</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
