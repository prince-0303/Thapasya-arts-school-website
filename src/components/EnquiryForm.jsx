import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { submitEnquiry } from '../api';

// eslint-disable-next-line no-unused-vars
const InputWrapper = ({ icon: Icon, children }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-primary/60 group-focus-within:text-primary transition-colors" />
    </div>
    {children}
  </div>
);

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    try {
      await submitEnquiry(formData);
      setStatus({ type: 'success', message: 'Your enquiry has been sent successfully! We will contact you soon.' });
      setFormData({ full_name: '', email: '', phone: '', message: '' }); // reset form
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to send your enquiry. Please verify your details or try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry-form" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">Course Enquiry</h2>
          <p className="text-gray-500 text-lg">Interested in learning? Send us a message and we'll connect with you shortly.</p>
        </div>

        <div className="bg-background rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
          
          {/* Subtle Decorative elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {status.message && (
              <div className={`p-4 rounded-xl border ${status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                {status.message}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <InputWrapper icon={User}>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                />
              </InputWrapper>

              <InputWrapper icon={Phone}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                />
              </InputWrapper>
            </div>

            <InputWrapper icon={Mail}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
              />
            </InputWrapper>

            <InputWrapper icon={MessageSquare}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="How can we help you?"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm resize-none"
              />
            </InputWrapper>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-primary text-white px-8 py-3.5 rounded-xl font-medium tracking-wide hover:bg-primary-hover transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Submit Enquiry'}</span>
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
