import React from 'react';
import { Search, Sparkles, CheckCircle2, ShieldCheck, Users, Briefcase, Award, ArrowRight, PlayCircle } from 'lucide-react';

export default function HeroSection({ searchFilter, setSearchFilter, selectedCategory, setSelectedCategory, onOpenDemoModal, stats }) {
  const categories = ['All', 'Software Engineering', 'Data & AI', 'Cloud & Infrastructure', 'Cybersecurity', 'Frontend & Web'];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-white py-12 lg:py-16 border-b border-emerald-100/60">
      
      {/* Background Decor Graphic Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-teal-200/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Emerald Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full border border-emerald-300/80 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>#1 Rated IT Training Institute in 2026</span>
              <span className="hidden sm:inline-block text-emerald-400">•</span>
              <span className="hidden sm:inline-block text-emerald-700 font-medium">Over 50,000+ Graduated</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Master In-Demand <br className="hidden sm:inline"/>
              <span className="emerald-text-gradient">IT Skills & Land Your</span> <br/>
              Dream Tech Job.
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              End-to-end hands-on training institute. Learn Python Fullstack, AI/ML, Cloud DevOps & Cybersecurity with 1-on-1 mentorship, live production projects, and guaranteed placement assistance.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-semibold text-slate-700 pt-1">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>1-on-1 Live Mentorship</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Real Enterprise Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Placement Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Verifiable Certificates</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Flexible Evening/Weekend</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Free Resume & Mock HR</span>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="pt-2">
              <div className="relative max-w-xl bg-white rounded-2xl p-2 shadow-xl shadow-emerald-900/5 border border-emerald-200/80 flex items-center">
                <Search className="w-5 h-5 text-emerald-600 ml-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search courses e.g. Python, AI, AWS, Cyber..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-3 pr-4 py-2.5 text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 placeholder-slate-400 font-medium"
                />
                <button
                  onClick={onOpenDemoModal}
                  className="emerald-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 flex-shrink-0"
                >
                  <span>Free Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center space-x-2 overflow-x-auto pt-4 pb-2 scrollbar-none">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
                  Categories:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glassmorphic Institute Preview Board */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-emerald-900/10 border border-emerald-100 relative">
                
                <div className="relative rounded-2xl overflow-hidden mb-6 group">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                    alt="Students in Live Tech Workshop"
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                    <div className="flex items-center space-x-3 text-white">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center cursor-pointer hover:bg-emerald-400 transition-colors shadow-lg">
                        <PlayCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-300">Live Campus Preview</p>
                        <p className="text-sm font-bold">Watch Institute Classroom & Lab Session</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Success Pill 1 */}
                <div className="bg-white p-3.5 rounded-2xl shadow-lg border border-emerald-100 flex items-center space-x-3 mb-3 hover:border-emerald-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900">Highest Salary Package</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                        2026 Batch
                      </span>
                    </div>
                    <p className="text-base font-extrabold text-emerald-600">$145,000 / Year (Cloud Architect)</p>
                  </div>
                </div>

                {/* Floating Success Pill 2 */}
                <div className="bg-emerald-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-200 font-medium">Placement Guarantee</p>
                      <p className="text-sm font-bold text-white">420+ Corporate Hiring Partners</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-800 text-emerald-100 px-2.5 py-1 rounded-full font-bold">
                    98.4% Rate
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom Live Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-emerald-100 shadow-md">
          <div className="text-center border-r border-slate-100 last:border-none">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{stats?.total_students ? stats.total_students.toLocaleString() : '15,000'}+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Enrolled Learners</p>
          </div>
          <div className="text-center border-r border-slate-100 last:border-none">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{stats?.hiring_partners || '420'}+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Hiring Companies</p>
          </div>
          <div className="text-center border-r border-slate-100 last:border-none">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{stats?.placement_rate || '98.4%'}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Placement Support Success</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">4.9 / 5.0 ★</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Alumni Satisfaction Rating</p>
          </div>
        </div>

      </div>
    </section>
  );
}
