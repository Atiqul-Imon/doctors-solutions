'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

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
      {/* Hero Section - Enhanced */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6bTI0IDI0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 animate-pulse-slow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">Get In Touch</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">Contact Us</h1>
            <p className="text-lg md:text-xl text-primary-50 leading-relaxed max-w-3xl mx-auto">
              Get in touch with us for appointments, inquiries, or any questions you may have. 
              We&apos;re here to help you with your healthcare needs.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Contact Information Cards - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <Card 
                key={index}
                variant="elevated"
                hover
                className="p-6 lg:p-8 text-center animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${info.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm md:text-base font-medium">{detail}</p>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Interactive Map Section */}
          <div className="mb-16 animate-fade-in-up">
            <Card variant="elevated" className="p-0 overflow-hidden">
              <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200">
                {/* Map Placeholder - Replace with actual map integration (Google Maps, Mapbox, etc.) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">123 Medical Center Road</h3>
                    <p className="text-gray-600">Dhaka, Bangladesh</p>
                    <p className="text-sm text-gray-500 mt-2">Click to open in Google Maps</p>
                  </div>
                </div>
                {/* Map integration would go here */}
                {/* Example: <iframe src="https://www.google.com/maps/embed?..." /> */}
              </div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form - Enhanced */}
            <div className="lg:col-span-2">
              <Card variant="elevated" className="p-10 lg:p-12 animate-slide-in-left">
                <div className="inline-block mb-4">
                  <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Send us a Message</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Send us a Message</h2>
                <p className="text-gray-600 mb-8 text-base md:text-lg">
                  Fill out the form below and we&apos;ll get back to you as soon as possible. We typically respond within 24 hours.
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-gray-300"
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

            {/* Additional Information - Enhanced */}
            <div className="space-y-6">
              <Card variant="elevated" hover className="p-8 bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-200 animate-slide-in-right">
                <div className="inline-block mb-4">
                  <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Quick Response</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Quick Response</h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors group">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-bold text-gray-900">Response Time</div>
                      <div className="text-sm text-gray-600">Within 24 hours</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors group">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-bold text-gray-900">Emergency Support</div>
                      <div className="text-sm text-gray-600">Available 24/7</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card variant="elevated" hover className="p-8 bg-white">
                <div className="inline-block mb-4">
                  <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Visit Our Clinic</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Visit Our Clinic</h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                  We welcome walk-in patients, but we recommend scheduling an appointment 
                  in advance to ensure availability.
                </p>
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                    <div className="font-bold text-gray-900 mb-2">Office Hours</div>
                    <div className="text-sm text-gray-600 space-y-1 font-medium">
                      <div>Mon - Fri: 9:00 AM - 5:00 PM</div>
                      <div>Saturday: 9:00 AM - 1:00 PM</div>
                      <div>Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <Card variant="elevated" className="p-10 lg:p-12">
              <div className="text-center mb-10">
                <div className="inline-block mb-4">
                  <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">FAQ</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
                <p className="text-gray-600 text-base md:text-lg">
                  Find answers to common questions about our services and appointment booking process.
                </p>
              </div>
              
              <FAQAccordion />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ Accordion Component
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment through our online booking system on the "Book Appointment" page, or you can call us directly at +880 1234 567890. We recommend booking in advance to secure your preferred time slot.',
    },
    {
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring a valid ID, insurance card (if applicable), list of current medications, and any relevant medical records or test results from previous visits to other healthcare providers.',
    },
    {
      question: 'Do you accept insurance?',
      answer: 'Yes, we accept most major insurance plans. Please contact our office before your appointment to verify your insurance coverage and understand your benefits.',
    },
    {
      question: 'What are your office hours?',
      answer: 'Our office is open Monday through Friday from 9:00 AM to 5:00 PM, and Saturdays from 9:00 AM to 1:00 PM. We are closed on Sundays. Emergency services are available 24/7.',
    },
    {
      question: 'Can I get same-day appointments?',
      answer: 'Same-day appointments may be available depending on our schedule. We recommend calling early in the morning for the best chance of securing a same-day appointment.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We require at least 24 hours notice for appointment cancellations. Late cancellations or no-shows may be subject to a cancellation fee. Please call us as soon as possible if you need to reschedule.',
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-primary-300 transition-colors">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors group"
          >
            <span className="font-bold text-gray-900 text-base md:text-lg pr-4 group-hover:text-primary-600 transition-colors">
              {faq.question}
            </span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-primary-600 transition-colors" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 animate-fade-in-up">
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
