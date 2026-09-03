import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenDemoModal }) {
  return (
    <footer className="bg-slate-900 text-white border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                Tech<span className="text-emerald-400">Academy</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Premier A-to-Z IT Training & Certification Institute. Empowering students and working professionals with job-aligned technical skills.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO 9001:2026 Certified Institute</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Top Programs</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => setActiveTab('catalog')} className="hover:text-emerald-400 transition-colors">Python Full Stack Development</button></li>
              <li><button onClick={() => setActiveTab('catalog')} className="hover:text-emerald-400 transition-colors">Artificial Intelligence & ML</button></li>
              <li><button onClick={() => setActiveTab('catalog')} className="hover:text-emerald-400 transition-colors">AWS Cloud Architecture & DevOps</button></li>
              <li><button onClick={() => setActiveTab('catalog')} className="hover:text-emerald-400 transition-colors">Ethical Hacking & Cyber Security</button></li>
              <li><button onClick={() => setActiveTab('catalog')} className="hover:text-emerald-400 transition-colors">React 19 & Next.js Engineering</button></li>
            </ul>
          </div>

          {/* Tools & Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Student Tools</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => setActiveTab('roadmap')} className="hover:text-emerald-400 transition-colors">Career Quiz Generator</button></li>
              <li><button onClick={() => setActiveTab('calculator')} className="hover:text-emerald-400 transition-colors">Tuition & Scholarship Calculator</button></li>
              <li><button onClick={() => setActiveTab('student')} className="hover:text-emerald-400 transition-colors">Student Portal & Certificate</button></li>
              <li><button onClick={() => setActiveTab('placement')} className="hover:text-emerald-400 transition-colors">Placement Wall & Partners</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:text-emerald-400 transition-colors">Admin Management Panel</button></li>
            </ul>
          </div>

          {/* Contact & Branches */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Campus & Support</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+1 (800) 555-TECH (24/7 Helpline)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>admissions@techacademy.pro</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Tech Park Tower, 5th Floor, Silicon Valley, CA & 12 Global Campus Centers</span>
              </div>
            </div>
            
            <button
              onClick={onOpenDemoModal}
              className="mt-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              Book Free Campus Visit
            </button>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 TechAcademy Institute. All Rights Reserved. Designed with White & Emerald Green Theme.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Admission</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Accreditation</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
