import React from 'react';
import { UserCheck, Award, Briefcase, TrendingUp, Star, Building2, CheckCircle2 } from 'lucide-react';
import { MOCK_HIRING_PARTNERS } from '../data/mockData';

export default function PlacementPortal({ onOpenDemoModal }) {
  const alumniStories = [
    {
      name: "Marcus Brody",
      role: "Cloud DevOps Architect",
      company: "Amazon AWS",
      package: "$135,000 / yr",
      prevRole: "Non-Tech Sales Associate",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      quote: "TechAcademy's hands-on AWS lab sessions gave me the confidence to ace 4 technical interview rounds at Amazon!"
    },
    {
      name: "Priya Sharma",
      role: "Full Stack Python Developer",
      company: "Microsoft",
      package: "$118,000 / yr",
      prevRole: "Fresh CS Graduate",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      quote: "The 1-on-1 mock interviews and capstone code reviews were identical to real-world corporate coding challenges."
    },
    {
      name: "David Chen",
      role: "AI / ML Engineer",
      company: "Meta AI Lab",
      package: "$145,000 / yr",
      prevRole: "Data Analyst",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      quote: "Building PyTorch deep learning models from scratch in class helped me transition into a top-tier Generative AI role."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
          <UserCheck className="w-4 h-4 text-emerald-600" />
          <span>Proven Career Outcomes & Hiring Cell</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Where Our Graduates <span className="emerald-text-gradient">Get Hired</span>
        </h2>
        <p className="text-slate-600 text-base">
          Our dedicated placement cell conducts exclusive corporate hiring drives, mock interviews, and resume optimization sessions for every student.
        </p>
      </div>

      {/* Hiring Partners Wall */}
      <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-lg text-center space-y-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          420+ Corporate Hiring Partners Actively Recruiting From TechAcademy
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {MOCK_HIRING_PARTNERS.map((partner, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-100 hover:border-emerald-200 transition-all flex items-center justify-center h-20 group">
              <span className="font-extrabold text-slate-700 group-hover:text-emerald-700 text-lg tracking-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alumni Success Stories Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 text-center">Featured Alumni Placement Stories</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alumniStories.map((alumni, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{alumni.name}</h4>
                    <p className="text-xs text-emerald-700 font-bold">{alumni.role}</p>
                    <p className="text-[11px] text-slate-500">at <span className="font-semibold text-slate-800">{alumni.company}</span></p>
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Previous: {alumni.prevRole}</span>
                  <span className="font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                    {alumni.package}
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{alumni.quote}"
                </p>
              </div>

              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Bottom Placement CTA */}
      <div className="emerald-gradient-bg p-8 sm:p-12 rounded-3xl text-white text-center space-y-4 shadow-2xl">
        <h3 className="text-3xl font-extrabold">Ready to Become Our Next Placement Success Story?</h3>
        <p className="text-emerald-100 text-sm max-w-xl mx-auto">
          Schedule a free 1-on-1 counseling call with our placement director. Get your resume reviewed and check hiring demand in your city.
        </p>
        <button
          onClick={onOpenDemoModal}
          className="bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold px-8 py-3.5 rounded-2xl text-sm transition-all shadow-lg inline-flex items-center space-x-2"
        >
          <span>Book Free Career Session</span>
        </button>
      </div>

    </div>
  );
}
