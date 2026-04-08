import React from 'react';

const CourseCard = ({ title, description, imageSrc, courseId, onBook }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-gray-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden shrink-0">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-8 flex flex-col items-center text-center flex-grow">
        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 font-light leading-relaxed flex-grow">
          {description}
        </p>
        <button 
          onClick={() => onBook(courseId)}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl transition-colors font-medium text-sm mt-auto shadow-sm"
        >
          Book Program
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
