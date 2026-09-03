import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CourseCard from './components/CourseCard';
import CourseModal from './components/CourseModal';
import DemoBookingModal from './components/DemoBookingModal';
import CareerRoadmap from './components/CareerRoadmap';
import FeeCalculator from './components/FeeCalculator';
import PlacementPortal from './components/PlacementPortal';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { MOCK_COURSES, MOCK_STATS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [stats, setStats] = useState(MOCK_STATS);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // User Session Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('techacademy_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals
  const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, [selectedCategory]);

  const fetchInitialData = async () => {
    try {
      const url = selectedCategory !== 'All' 
        ? `/api/courses?category=${encodeURIComponent(selectedCategory)}`
        : '/api/courses';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
        }
      }
      
      const statsRes = await fetch('/api/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.log('Backend active or using fallback static data');
    }
  };

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    try {
      localStorage.setItem('techacademy_user', JSON.stringify(userObj));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('techacademy_user');
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = !searchFilter || 
      c.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
      c.description.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSelectCourseById = (id) => {
    const target = courses.find((c) => c.id === id) || MOCK_COURSES[0];
    setSelectedCourseForModal(target);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col font-sans">
      
      {/* Top Emerald Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {activeTab === 'catalog' && (
          <div className="space-y-12 pb-16">
            
            {/* Hero Banner Section */}
            <HeroSection
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onOpenDemoModal={() => setIsDemoModalOpen(true)}
              stats={stats}
            />

            {/* Courses Catalog Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Explore IT Masterclass <span className="emerald-text-gradient">Programs</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Showing {filteredCourses.length} industry-accredited courses with live labs & job guarantee support.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-400">Filter Level:</span>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                    All Levels Included
                  </span>
                </div>
              </div>

              {/* Course Cards Grid */}
              {filteredCourses.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-emerald-100 shadow-sm">
                  <p className="text-lg font-bold text-slate-700">No courses match your search "{searchFilter}"</p>
                  <button
                    onClick={() => { setSearchFilter(''); setSelectedCategory('All'); }}
                    className="emerald-btn px-6 py-2 rounded-xl text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onSelectCourse={(c) => setSelectedCourseForModal(c)}
                      onEnroll={(c) => setSelectedCourseForModal(c)}
                    />
                  ))}
                </div>
              )}

            </section>

          </div>
        )}

        {activeTab === 'roadmap' && (
          <CareerRoadmap
            onSelectCourseById={(id) => {
              handleSelectCourseById(id);
            }}
          />
        )}

        {activeTab === 'calculator' && (
          <FeeCalculator
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
          />
        )}

        {activeTab === 'placement' && (
          <PlacementPortal
            onOpenDemoModal={() => setIsDemoModalOpen(true)}
          />
        )}

        {activeTab === 'student' && (
          <StudentDashboard
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            stats={stats}
            courses={courses}
            onRefreshCourses={fetchInitialData}
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        )}

      </main>

      {/* Course Detail Modal */}
      {selectedCourseForModal && (
        <CourseModal
          course={selectedCourseForModal}
          onClose={() => setSelectedCourseForModal(null)}
          onRegisterSuccess={(enrollment) => {
            fetchInitialData();
            if (!currentUser) {
              handleLoginSuccess({
                id: 88,
                name: enrollment.student_name,
                email: enrollment.student_email,
                role: 'student'
              });
            }
          }}
        />
      )}

      {/* Free Demo Class Reservation Modal */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* Institutional Emerald Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

    </div>
  );
}
