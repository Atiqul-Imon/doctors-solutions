'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSubmitMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // TODO: Implement contact form submission API
    setTimeout(() => {
      setSubmitMessage('Thank you for your message. We will get back to you soon!');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      details: ['123 Medical Center Road', 'Dhaka, Bangladesh', 'ZIP: 1200'],
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: ['+880 1234 567890', 'Emergency: +880 1234 567891'],
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: ['info@doctorportfolio.com', 'appointments@doctorportfolio.com'],
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Closed'],
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2MmgtMnYtMmgyem0wLTI0djJoLTJ2LTJoMnptMjQgMjR2MmgtMnYtMmgyem0wLTI0djJoLTJ2LTJoMnYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 animate-pulse-slow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Get in touch with us for appointments, inquiries, or any questions you may have. 
              We&apos;re here to help you with your healthcare needs.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card 
                key={index} 
                className="p-6 text-center bg-white shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${info.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-10 shadow-xl bg-white animate-slide-in-left hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Send us a Message</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="+880 1234 567890"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                      placeholder="Please tell us how we can help you..."
                    />
                  </div>
                  {submitMessage && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${
                      submitMessage.includes('Thank you') 
                        ? 'bg-green-50 border-2 border-green-200 text-green-800' 
                        : 'bg-red-50 border-2 border-red-200 text-red-800'
                    }`}>
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>{submitMessage}</span>
                    </div>
                  )}
                  <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-4" size="lg">
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-5 h-5 inline mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 animate-slide-in-right hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Quick Response</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Response Time</div>
                      <div className="text-sm text-gray-600">Within 24 hours</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Emergency Support</div>
                      <div className="text-sm text-gray-600">Available 24/7</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white border-2 border-gray-100">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Visit Our Clinic</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We welcome walk-in patients, but we recommend scheduling an appointment 
                  in advance to ensure availability.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900 mb-1">Office Hours</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Mon - Fri: 9:00 AM - 5:00 PM</div>
                      <div>Saturday: 9:00 AM - 1:00 PM</div>
                      <div>Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
