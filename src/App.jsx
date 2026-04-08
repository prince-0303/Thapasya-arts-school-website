import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCard from './components/CourseCard';
import ProgramBooking from './components/ProgramBooking';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

import { getCourses } from './api';

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCourseForBooking, setSelectedCourseForBooking] = useState(null);

  const handleBookProgram = (courseId) => {
    setSelectedCourseForBooking(courseId);
    setIsBookingModalOpen(true);
  };

  const handleCustomBook = () => {
    setSelectedCourseForBooking(null);
    setIsBookingModalOpen(true);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to load courses from API");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background relative font-sans">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Programs Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">Our Disciplines</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6 relative">
               <div className="absolute w-12 h-1 bg-primary-light mx-auto left-6 rounded-full blur-sm"></div>
            </div>
            <p className="text-gray-500 max-w-2xl mx-auto font-light text-lg">
              Explore our comprehensive programs guided by distinguished maestros dedicated to preserving authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              <p className="text-gray-500 col-span-full">Loading courses...</p>
            ) : courses.length > 0 ? (
              courses.map((course, index) => (
                <CourseCard 
                  key={index} 
                  courseId={course.id}
                  title={course.name} 
                  description={course.description}
                  imageSrc={course.image_url}
                  onBook={handleBookProgram}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No courses available at the moment.</p>
            )}
          </div>
        </section>

        <ProgramBooking onCustomBook={handleCustomBook} />
        <EnquiryForm />
      </main>

      <Footer />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        initialCourseId={selectedCourseForBooking}
        courses={courses}
      />
    </div>
  );
}

export default App;
