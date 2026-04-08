import React from 'react';

const ProgramBooking = ({ onCustomBook }) => {
  return (
    <section id="program-booking" className="py-24 bg-primary/5 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">Book a Performance</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 font-light">
            Elevate your events with authentic classical performances by our acclaimed artists and advanced scholars. From intimate gatherings to grand cultural festivals, Thapasya brings the divine essence of traditional arts to your stage.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 text-xl mb-1">Schedule an Event</h3>
              <p className="text-sm text-gray-500 font-light">Contact our bookings coordinator to discuss your requirements.</p>
            </div>
            <button onClick={onCustomBook} className="whitespace-nowrap bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-xl font-medium transition-colors shadow-lg">
              Contact for Booking
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramBooking;
