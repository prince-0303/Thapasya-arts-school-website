import React, { useState, useEffect } from 'react';
import { submitBooking } from '../api';

const BookingModal = ({ isOpen, onClose, initialCourseId, courses }) => {
  const [formData, setFormData] = useState({
    course_ids: initialCourseId ? [initialCourseId] : [],
    place: '',
    event_date: '',
    event_time: '',
    duration_hours: '',
    people_count: '',
    client_name: '',
    contact_phone: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        course_ids: initialCourseId ? [initialCourseId] : [],
        place: '',
        event_date: '',
        event_time: '',
        duration_hours: '',
        people_count: '',
        client_name: '',
        contact_phone: '',
        description: ''
      }));
      setSuccess(false);
      setError(null);
    }
  }, [isOpen, initialCourseId]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleCourse = (courseId) => {
    setFormData(prev => {
      const isSelected = prev.course_ids.includes(courseId);
      if (isSelected) {
        return { ...prev, course_ids: prev.course_ids.filter(id => id !== courseId) };
      } else {
        return { ...prev, course_ids: [...prev.course_ids, courseId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.course_ids.length === 0) {
      setError("Please select at least one program to book.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dateTimeString = `${formData.event_date}T${formData.event_time}:00`;
      const combinedDateTime = new Date(dateTimeString).toISOString();

      const bookingPayload = {
        course_ids: formData.course_ids.map(id => parseInt(id)),
        place: formData.place,
        event_date_time: combinedDateTime,
        duration_hours: parseFloat(formData.duration_hours),
        people_count: parseInt(formData.people_count),
        client_name: formData.client_name,
        contact_phone: formData.contact_phone,
        description: formData.description
      };

      await submitBooking(bookingPayload);
      setSuccess(true);
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md transition-opacity">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col transform transition-all">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">Book a Program</h2>
            <p className="text-sm text-gray-500 font-light mt-1">Schedule our artists for your upcoming event</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors shadow-sm border border-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          {success ? (
            <div className="text-center py-16 flex flex-col items-center justify-center animate-pulse-slow">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-green-200 transform rotate-3">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3">Booking Requested!</h3>
              <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed">
                Thank you. We'll be in touch shortly to finalize the details of your event.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-sm border border-red-100 flex items-center gap-3 font-medium">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </div>
              )}

              {/* Programs Multi-Select area */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-2 block">1. Select Programs</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {courses
                    .filter(course => initialCourseId ? course.id === initialCourseId : true)
                    .map(course => {
                    const isSelected = formData.course_ids.includes(course.id);
                    return (
                      <button
                        type="button"
                        key={course.id}
                        onClick={() => {
                          if (!initialCourseId) toggleCourse(course.id);
                        }}
                        className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                          isSelected 
                            ? 'bg-gray-900 border-gray-900 text-white shadow-md' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                        } ${initialCourseId && 'cursor-default pointer-events-none'}`}
                      >
                        <span className="truncate pr-2">{course.name}</span>
                        <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-gray-300 group-hover:border-gray-500'}`}>
                          {isSelected && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-100 h-px w-full my-8"></div>

              <div className="space-y-6">
                <label className="text-sm font-semibold text-gray-800 uppercase tracking-wider block">2. Event Details</label>
                
                {/* Modern Inputs Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1 group-focus-within:text-gray-900 transition-colors">Client Name</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <input type="text" name="client_name" required value={formData.client_name} onChange={handleChange} 
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent hover:bg-gray-100 focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 rounded-2xl outline-none transition-all text-gray-900 font-medium placeholder-gray-400" 
                        placeholder="Organization or Individual" 
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1 group-focus-within:text-gray-900 transition-colors">Contact Phone</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      </div>
                      <input type="tel" name="contact_phone" required value={formData.contact_phone} onChange={handleChange} 
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent hover:bg-gray-100 focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 rounded-2xl outline-none transition-all text-gray-900 font-medium placeholder-gray-400" 
                        placeholder="+91 98765 43210" 
                      />
                    </div>
                  </div>

                  <div className="relative group sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1 group-focus-within:text-gray-900 transition-colors">Venue / Location</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <input type="text" name="place" required value={formData.place} onChange={handleChange} 
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent hover:bg-gray-100 focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 rounded-2xl outline-none transition-all text-gray-900 font-medium placeholder-gray-400" 
                        placeholder="Full address of the event" 
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1 group-focus-within:text-gray-900 transition-colors">Event Date</label>
                    <input type="date" name="event_date" required value={formData.event_date} onChange={handleChange} 
                      className="w-full px-4 py-3.5 bg-gray-50 border border-transparent hover:bg-gray-100 focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 rounded-2xl outline-none transition-all text-gray-900 font-medium placeholder-gray-400" 
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1 group-focus-within:text-gray-900 transition-colors">Event Time</label>
                    <input type="time" name="event_time" required value={formData.event_time} onChange={handleChange} 
                      className="w-full px-4 py-3.5 bg-gray-50 border border-transparent hover:bg-gray-100 focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 rounded-2xl outline-none transition-all text-gray-900 font-medium placeholder-gray-400" 
                    />
                  </div>
                </div>
              </div>

               <div className="bg-gray-100 h-px w-full my-8"></div>

              <div className="space-y-6">
                 <label className="text-sm font-semibold text-gray-800 uppercase tracking-wider block">3. Performance Scale</label>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1 group-focus-within:text-gray-900 transition-colors">Duration (Hrs)</label>
                    <input type="number" name="duration_hours" required min="0.5" step="0.5" value={formData.duration_hours} onChange={handleChange} 
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent hover:bg-gray-100 focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 rounded-2xl outline-none transition-all text-gray-900 font-medium placeholder-gray-400" 
                      placeholder="e.g. 2"
                    />
                  </div>
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1 group-focus-within:text-gray-900 transition-colors">Participants Count</label>
                    <input type="number" name="people_count" required min="1" value={formData.people_count} onChange={handleChange} 
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent hover:bg-gray-100 focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 rounded-2xl outline-none transition-all text-gray-900 font-medium placeholder-gray-400" 
                      placeholder="e.g. 50"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1 group-focus-within:text-gray-900 transition-colors">Additional Notes</label>
                  <textarea name="description" rows="3" value={formData.description} onChange={handleChange} 
                    className="w-full px-4 py-3.5 bg-gray-50 border border-transparent hover:bg-gray-100 focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 rounded-2xl outline-none transition-all text-gray-900 font-medium placeholder-gray-400 resize-none" 
                    placeholder="Tell us any specific requirements..."
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-white shadow-[0_-20px_20px_-15px_rgba(255,255,255,1)]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3.5 rounded-2xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-2xl font-medium bg-gray-900 hover:bg-gray-800 text-white transition-all shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-lg disabled:opacity-70 disabled:shadow-none flex items-center justify-center gap-2 min-w-[200px]"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Booking Request
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
