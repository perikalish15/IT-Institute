import React, { useState } from 'react';
import { Calculator, Percent, Sparkles, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';

export default function FeeCalculator({ onOpenDemoModal }) {
  const [courseFee, setCourseFee] = useState(899);
  const [scholarshipPercent, setScholarshipPercent] = useState(25);
  const [emiMonths, setEmiMonths] = useState(6);

  const finalFee = Math.round(courseFee * (1 - scholarshipPercent / 100));
  const monthlyEmi = Math.round(finalFee / emiMonths);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-100">
        
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Transparent Tuition & EMI Estimator</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Tuition Fee & <span className="emerald-text-gradient">Scholarship Calculator</span>
          </h2>
          <p className="text-slate-600 text-sm">
            Calculate your custom scholarship discount, flexible no-cost monthly EMI options, and total savings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Course Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Select IT Masterclass Program
              </label>
              <select
                value={courseFee}
                onChange={(e) => setCourseFee(Number(e.target.value))}
                className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50/50 focus:outline-none focus:border-emerald-500"
              >
                <option value={899}>Full Stack Python Web Development ($899)</option>
                <option value={1199}>Artificial Intelligence & Machine Learning ($1,199)</option>
                <option value={999}>AWS Cloud Architect & DevOps ($999)</option>
                <option value={950}>Ethical Hacking & Cyber Security ($950)</option>
                <option value={799}>React 19 & Next.js Full Stack ($799)</option>
              </select>
            </div>

            {/* Scholarship Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Apply Scholarship Discount
                </label>
                <span className="text-sm font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {scholarshipPercent}% Scholarship
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                step="5"
                value={scholarshipPercent}
                onChange={(e) => setScholarshipPercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                <span>Standard (0%)</span>
                <span>Merit Discount (25%)</span>
                <span>Max Scholarship (45%)</span>
              </div>
            </div>

            {/* EMI Months Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                3. Choose Monthly Payment Tenure (No-Cost EMI)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[3, 6, 12].map((m) => (
                  <button
                    key={m}
                    onClick={() => setEmiMonths(m)}
                    className={`py-3 rounded-2xl text-xs font-bold border transition-all ${
                      emiMonths === m
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    {m} Months Installments
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Card */}
          <div className="lg:col-span-5">
            <div className="emerald-gradient-bg p-6 rounded-3xl text-white shadow-2xl relative overflow-hidden space-y-6">
              
              <div className="space-y-1">
                <p className="text-xs text-emerald-200 font-bold uppercase tracking-wider">Final Net Fee</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-black">${finalFee}</span>
                  <span className="text-sm text-emerald-300 line-through">${courseFee}</span>
                </div>
                <p className="text-xs text-emerald-100 font-medium">
                  🎉 Total Scholarship Savings: <span className="font-bold text-white">${courseFee - finalFee}</span>
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <p className="text-xs text-emerald-200 font-semibold">Easy No-Cost Monthly EMI</p>
                <p className="text-2xl font-extrabold text-white mt-1">
                  ${monthlyEmi} <span className="text-xs font-medium text-emerald-200">/ month</span>
                </p>
                <p className="text-[11px] text-emerald-100 mt-1">
                  For {emiMonths} months • 0% Interest Rate • Instant approval
                </p>
              </div>

              <div className="space-y-2 text-xs text-emerald-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  <span>Includes all live classes, LMS access & lab servers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  <span>Includes Resume Review & Placement Drive Access</span>
                </div>
              </div>

              <button
                onClick={onOpenDemoModal}
                className="w-full bg-white text-emerald-800 hover:bg-emerald-50 font-bold py-3.5 rounded-2xl text-sm transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Claim Scholarship & Book Demo</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
