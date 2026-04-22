"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../Context/ModalContext';
import { X, User, Mail, Phone, MapPin, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  city: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  course?: string;
  city?: string;
}

const InputField = ({ icon: Icon, type, name, placeholder, value, onChange, required, error }: any) => (
  <div className="relative">
    <Icon size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-500' : 'text-[#3B82F6]'}`} />
    <input
      type={type}
      name={name}
      required={required}
      placeholder={`${placeholder} ${required ? '*' : ''}`}
      className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-1 outline-none transition-all placeholder:text-gray-400 placeholder:font-medium text-gray-800 ${
        error 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
          : 'border-[#DBEAFE] focus:border-[#3B82F6] focus:ring-[#3B82F6]/20'
      }`}
      value={value}
      onChange={onChange}
    />
    {error && (
      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <AlertCircle size={12} />
        {error}
      </p>
    )}
  </div>
);

const SelectField = ({ icon: Icon, name, value, onChange, required, children, error }: any) => (
  <div className="relative">
    <Icon size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-500' : 'text-[#3B82F6]'}`} />
    <select
      name={name}
      required={required}
      className={`w-full pl-12 pr-10 py-3.5 border-2 rounded-xl focus:ring-1 outline-none transition-all text-gray-800 appearance-none bg-white font-medium disabled:text-gray-400 ${
        error 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
          : 'border-[#DBEAFE] focus:border-[#3B82F6] focus:ring-[#3B82F6]/20'
      }`}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
    <svg className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
    {error && (
      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <AlertCircle size={12} />
        {error}
      </p>
    )}
  </div>
);

const Modal: React.FC = () => {
  const { isModalOpen, closeModal } = useModal();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    city: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  // Regex patterns
  const patterns = {
    fullName: /^[a-zA-Z\s]{3,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[6-9]\d{9}$/,
    course: /.+/,
    city: /^[a-zA-Z\s]{2,50}$/
  };

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    if (!value) return 'This field is required';
    
    switch (name) {
      case 'fullName':
        if (!patterns.fullName.test(value)) return 'Name must be 3-50 letters only';
        break;
      case 'email':
        if (!patterns.email.test(value)) return 'Please enter a valid email';
        break;
      case 'phone':
        if (!patterns.phone.test(value)) return 'Please enter a valid 10-digit phone number';
        break;
      case 'course':
        if (!patterns.course.test(value)) return 'Please select a course';
        break;
      case 'city':
        if (!patterns.city.test(value)) return 'City must be 2-50 letters only';
        break;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!agreed) {
      setSubmitStatus('error');
      setSubmitMessage('Please agree to the Terms and Conditions');
      return;
    }

    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormData] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setSubmitStatus('error');
      setSubmitMessage('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email using Resend API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      
      setSubmitStatus('success');
      setSubmitMessage('Thank you! We will contact you soon.');
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        city: ''
      });
      setAgreed(false);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        closeModal();
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}/>
          
          {/* Modal Card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="relative bg-white/95 rounded-3xl w-full max-w-lg max-h-[90vh] shadow-2xl overflow-hidden backdrop-blur-sm flex flex-col">
            
            {/* Soft Blue Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-white/10 pointer-events-none" />

            <div className="relative p-10 z-10 overflow-y-auto flex-1">
              
              {/* Close Button */}
              <button onClick={closeModal} className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
                <X size={20} />
              </button>
              
              {/* Logo & Header */}
              <div className="flex flex-col items-center mb-6">
                <div className="mb-4">
                  <img src="/logo.png" alt="VidyaVriddhi" className="h-10" />
                </div>
                <h2 className="text-2xl font-black text-[#1A1A1B] leading-tight mb-2 tracking-tight">
                  <span className="inline-block mr-1">🚀</span> Start Your Admission Journey
                </h2>
                <p className="text-gray-600 text-sm font-semibold mb-6">Select Your Course</p>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField icon={User} type="text" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleInputChange} error={errors.fullName} />
                
                <InputField icon={Mail} type="email" name="email" placeholder="Email ID" required value={formData.email} onChange={handleInputChange} error={errors.email} />
                
                <InputField icon={Phone} type="tel" name="phone" placeholder="Contact Number" required value={formData.phone} onChange={handleInputChange} error={errors.phone} />

                <InputField icon={MapPin} type="text" name="city" placeholder="City" required value={formData.city} onChange={handleInputChange} error={errors.city} />

                <SelectField icon={BookOpen} name="course" required value={formData.course} onChange={handleInputChange} error={errors.course}>
                  <option value="" disabled className="text-gray-400">Course</option>
                  <option value="online-mba">Online MBA</option>
                  <option value="online-executive-mba">Online Executive MBA</option>
                  <option value="online-bba">Online BBA</option>
                  <option value="online-mca">Online MCA</option>
                  <option value="online-msc">Online M.Sc</option>
                  <option value="online-mcom">Online M.Com</option>
                  <option value="online-ma">Online MA</option>
                  <option value="online-bca">Online BCA</option>
                  <option value="online-bca">Online BCA</option>
                  <option value="online-mca">Online MCA</option>
                  <option value="online-ba">Online BA</option>
                  <option value="distance-mba">Distance MBA</option>
                  <option value="online-btech">Online Btech</option>
                  <option value="general-query">General Query</option>
                </SelectField>

                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                    <span className="text-sm font-medium">{submitMessage}</span>
                  </div>
                )}

                {/* T&C Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input type="checkbox" id="agreed" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6]/20 cursor-pointer" />
                  <label htmlFor="agreed" className="text-[13px] font-medium text-gray-600 leading-relaxed cursor-pointer select-none">
                    By submitting this form, I accept and agree to the <a href="#" className="text-[#3B82F6] font-semibold hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#3B82F6] font-semibold hover:underline">Privacy Policy</a>.
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitting || !agreed} className="w-full font-extrabold py-3.5 rounded-xl transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed bg-[#E0E0E0] text-gray-500 enabled:bg-[#3B82F6] enabled:text-white enabled:hover:bg-[#2563EB] enabled:shadow-lg enabled:shadow-[#3B82F6]/30 enabled:transform enabled:hover:scale-[1.01] flex items-center justify-center gap-2">
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;