import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, ArrowRight, RotateCcw, Award, DollarSign } from 'lucide-react';

export default function CareerRoadmap({ onSelectCourseById }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    background: '',
    goal: '',
    workStyle: '',
  });
  const [recommendation, setRecommendation] = useState(null);

  const handleSelect = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate recommendation
      calculateRecommendation(updated);
    }
  };

  const calculateRecommendation = (ans) => {
    if (ans.goal === 'ai' || ans.workStyle === 'math') {
      setRecommendation({
        courseId: 2,
        title: 'Artificial Intelligence & Machine Learning Specialist',
        matchScore: '98% Match',
        avgSalary: '$115,000 / year',
        reason: 'Based on your interest in algorithms, data patterns, and future-tech automation.',
        roadmap: ['Python Foundations', 'Math & Statistics', 'Machine Learning Models', 'Deep Learning & PyTorch', 'Generative AI & LLMs']
      });
    } else if (ans.goal === 'cloud' || ans.workStyle === 'infra') {
      setRecommendation({
        courseId: 3,
        title: 'AWS Cloud Architect & DevOps Engineering',
        matchScore: '96% Match',
        avgSalary: '$120,000 / year',
        reason: 'Your preference for system architecture, Linux servers, and cloud infrastructure fits DevOps perfectly.',
        roadmap: ['Linux & VPC Network', 'AWS Core Services', 'Docker Containers', 'Kubernetes Orchestration', 'Terraform & CI/CD']
      });
    } else if (ans.goal === 'security') {
      setRecommendation({
        courseId: 4,
        title: 'Ethical Hacking & Cyber Security Master',
        matchScore: '97% Match',
        avgSalary: '$105,000 / year',
        reason: 'You thrive in problem solving, threat analysis, penetration testing, and protecting digital assets.',
        roadmap: ['Network Fundamentals', 'Ethical Hacking Basics', 'Web App Vulnerabilities', 'Penetration Testing', 'SOC Operations']
      });
    } else {
      setRecommendation({
        courseId: 1,
        title: 'Full Stack Python Web Development',
        matchScore: '99% Match',
        avgSalary: '$95,000 / year',
        reason: 'Python Full Stack is the #1 versatile career path with high demand across startups and tech giants.',
        roadmap: ['Python 3 Basics & OOP', 'Database SQL/SQLite', 'Flask & FastAPI Backend', 'React.js Frontend', 'Cloud Deployment']
      });
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ background: '', goal: '', workStyle: '' });
    setRecommendation(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-100 relative overflow-hidden">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
            <Compass className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Interactive Tech Career Guidance Tool</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Find Your Ideal <span className="emerald-text-gradient">IT Career Path</span>
          </h2>
          <p className="text-slate-600 text-sm">
            Not sure which course to pick? Answer 3 quick questions to generate your personalized learning roadmap & salary expectation.
          </p>
        </div>

        {/* Progress Bar */}
        {!recommendation && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
              <span>Question {step} of 3</span>
              <span>{Math.round((step / 3) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Quiz Steps */}
        {!recommendation ? (
          <div className="max-w-lg mx-auto space-y-4">
            
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-bold text-slate-900 text-lg text-center">1. What is your educational background?</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleSelect('background', 'non-tech')}
                    className="p-4 text-left rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all font-semibold text-sm text-slate-800 flex items-center justify-between"
                  >
                    <span>Non-IT / Fresh Graduate (Arts, Commerce, Science)</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => handleSelect('background', 'cs-student')}
                    className="p-4 text-left rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all font-semibold text-sm text-slate-800 flex items-center justify-between"
                  >
                    <span>Computer Science / IT Graduate or Student</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => handleSelect('background', 'working-prof')}
                    className="p-4 text-left rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all font-semibold text-sm text-slate-800 flex items-center justify-between"
                  >
                    <span>Working Professional Looking to Switch to IT</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-bold text-slate-900 text-lg text-center">2. What goal excites you the most?</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleSelect('goal', 'fullstack')}
                    className="p-4 text-left rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all font-semibold text-sm text-slate-800 flex items-center justify-between"
                  >
                    <span>Building Web Apps, Websites & Databases</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => handleSelect('goal', 'ai')}
                    className="p-4 text-left rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all font-semibold text-sm text-slate-800 flex items-center justify-between"
                  >
                    <span>Building AI Models, Neural Networks & Chatbots</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => handleSelect('goal', 'cloud')}
                    className="p-4 text-left rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all font-semibold text-sm text-slate-800 flex items-center justify-between"
                  >
                    <span>Managing Cloud Servers, AWS & Kubernetes</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => handleSelect('goal', 'security')}
                    className="p-4 text-left rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all font-semibold text-sm text-slate-800 flex items-center justify-between"
                  >
                    <span>Ethical Hacking, Hacking Defenses & Security</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-bold text-slate-900 text-lg text-center">3. What is your preferred work style?</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleSelect('workStyle', 'coding')}
                    className="p-4 text-left rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all font-semibold text-sm text-slate-800 flex items-center justify-between"
                  >
                    <span>Writing Logic, Features & Solving Coding Puzzles</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => handleSelect('workStyle', 'math')}
                    className="p-4 text-left rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all font-semibold text-sm text-slate-800 flex items-center justify-between"
                  >
                    <span>Analyzing Data Insights, Charts & Statistics</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => handleSelect('workStyle', 'infra')}
                    className="p-4 text-left rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all font-semibold text-sm text-slate-800 flex items-center justify-between"
                  >
                    <span>Automating Deployments & Systems Reliability</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Result Recommendation View */
          <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
            
            <div className="emerald-gradient-bg p-6 rounded-3xl text-white text-center relative shadow-lg">
              <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {recommendation.matchScore}
              </span>
              <h3 className="text-2xl font-extrabold mt-3">{recommendation.title}</h3>
              <p className="text-emerald-100 text-xs mt-2 max-w-lg mx-auto">{recommendation.reason}</p>

              <div className="mt-4 inline-flex items-center space-x-2 bg-black/20 px-4 py-2 rounded-xl text-sm font-bold text-emerald-200">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Estimated Starting Salary: {recommendation.avgSalary}</span>
              </div>
            </div>

            {/* Roadmap Visual */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-base text-center">Your 5-Step Learning Roadmap</h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {recommendation.roadmap.map((stage, idx) => (
                  <div key={idx} className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 text-center">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold inline-flex items-center justify-center mb-1">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-bold text-slate-800 leading-tight">{stage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onSelectCourseById(recommendation.courseId)}
                className="emerald-btn px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>View Full Course & Syllabus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={resetQuiz}
                className="emerald-btn-outline px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
