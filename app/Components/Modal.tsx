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

/* ================= INPUT ================= */
const InputField = ({ icon: Icon, name, placeholder, value, onChange, error }: any) => (
  <div>
    <div className="relative">
      <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        name={name}
        placeholder={placeholder}
        className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/70 backdrop-blur-lg border outline-none transition ${
          error ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'
        }`}
        value={value}
        onChange={onChange}
      />
    </div>

    {error && (
      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <AlertCircle size={12} />
        {error}
      </p>
    )}
  </div>
);

/* ================= SELECT ================= */
const SelectField = ({ icon: Icon, name, value, onChange, children, error }: any) => (
  <div>
    <div className="relative">
      <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full pl-11 pr-10 py-3 rounded-xl bg-white/70 backdrop-blur-lg border outline-none appearance-none ${
          error ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'
        }`}
      >
        {children}
      </select>

      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </div>

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName) newErrors.fullName = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!formData.phone) newErrors.phone = "Required";
    if (!formData.course) newErrors.course = "Required";
    if (!formData.city) newErrors.city = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate() || !agreed) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        city: ''
      });

      setTimeout(() => closeModal(), 2000);

    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* OVERLAY */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden"
          >
            {/* GRADIENT BG */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-90" />
            <div className="absolute inset-0 backdrop-blur-2xl" />

            <div className="relative bg-white/90 p-8 rounded-3xl">

              {/* CLOSE */}
              <button onClick={closeModal} className="absolute top-5 right-5 text-gray-500">
                <X size={20} />
              </button>

              {/* HEADER */}
              <h2 className="text-2xl font-black mb-2 text-gray-900">
                🚀 Start Your Admission
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                Fill the form and get expert guidance
              </p>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">

                <InputField icon={User} name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} error={errors.fullName} />

                <InputField icon={Mail} name="email" placeholder="Email" value={formData.email} onChange={handleChange} error={errors.email} />

                <InputField icon={Phone} name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} error={errors.phone} />

                <InputField icon={MapPin} name="city" placeholder="City" value={formData.city} onChange={handleChange} error={errors.city} />

                <SelectField icon={BookOpen} name="course" value={formData.course} onChange={handleChange} error={errors.course}>
                  <option value="">Select Course</option>
                  <option value="mba">MBA</option>
                  <option value="bba">BBA</option>
                  <option value="mca">MCA</option>
                </SelectField>

                {/* STATUS */}
                {status === 'success' && (
                  <div className="text-green-600 flex items-center gap-2 text-sm">
                    <CheckCircle size={16} /> Submitted Successfully
                  </div>
                )}
                {status === 'error' && (
                  <div className="text-red-500 flex items-center gap-2 text-sm">
                    <AlertCircle size={16} /> Fix errors
                  </div>
                )}

                {/* CHECKBOX */}
                <label className="flex gap-2 text-xs text-gray-600">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                  I agree to Terms
                </label>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl text-white font-bold transition-all"
                  style={{
                    background: 'linear-gradient(135deg,#2563EB,#4F46E5)',
                    boxShadow: '0 10px 30px rgba(37,99,235,0.3)'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Counselling'}
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