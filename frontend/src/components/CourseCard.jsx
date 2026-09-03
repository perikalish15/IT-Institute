import React from 'react';
import { Star, Clock, UserCheck, BookOpen, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export default function CourseCard({ course, onSelectCourse, onEnroll }) {
  const discountPercent = Math.round(((course.price - course.discount_price) / course.price) * 100);

  return (
    <div className="bg-white rounded-2xl border border-emerald-100/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      <div>
        {/* Card Header Image & Badges */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
          
          {/* Level Badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full shadow-md border border-emerald-200">
            {course.level}
          </div>

          {/* Discount Pill */}
          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            Save {discountPercent}%
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-3 left-3 text-xs font-semibold text-emerald-300 flex items-center space-x-1">
            <Tag className="w-3.5 h-3.5 text-emerald-400" />
            <span>{course.category}</span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 space-y-3">
          
          {/* Rating & Duration */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className="flex items-center space-x-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">{course.rating}</span>
              <span className="text-slate-400">({course.reviews_count})</span>
            </div>
            <div className="flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Course Title */}
          <h3 
            onClick={() => onSelectCourse(course)}
            className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
            {course.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(Array.isArray(course.tags) ? course.tags : (course.tags || '').split(',')).map((tag, idx) => (
              <span 
                key={idx} 
                className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-md border border-emerald-100"
              >
                ✓ {tag.trim()}
              </span>
            ))}
          </div>

          {/* Instructor Detail */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Lead Mentor</p>
              <p className="font-bold text-slate-800">{course.trainer_name}</p>
              <p className="text-[10px] text-slate-500 truncate max-w-[170px]">{course.trainer_role}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tuition Fee</p>
              <div className="flex items-baseline space-x-1">
                <span className="text-xs text-slate-400 line-through">${course.price}</span>
                <span className="text-base font-extrabold text-emerald-700">${course.discount_price}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => onSelectCourse(course)}
          className="emerald-btn-outline w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Syllabus</span>
        </button>
        <button
          onClick={() => onEnroll(course)}
          className="emerald-btn w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 shadow-sm"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
