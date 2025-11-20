'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Calendar, Clock, Stethoscope, Users, Award, Heart, Shield, CheckCircle2, ArrowRight, Plus, Star } from 'lucide-react';

export default function Home() {
  const services = [
    {
      title: 'General Consultation',
      description: 'Comprehensive health checkups and consultations for all your medical needs with personalized care.',
      icon: <Stethoscope className="w-8 h-8" />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Follow-up Care',
      description: 'Ongoing medical care and monitoring for existing conditions to ensure optimal recovery.',
      icon: <Clock className="w-8 h-8" />,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Patient Care',
      description: 'Dedicated attention to your health and wellness journey with compassionate medical support.',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  const features = [
    { icon: <Award className="w-6 h-6" />, text: 'Board Certified' },
    { icon: <Heart className="w-6 h-6" />, text: 'Compassionate Care' },
    { icon: <Shield className="w-6 h-6" />, text: 'Trusted Service' },
    { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Proven Results' },
  ];

  const stats = [
    { value: '15+', label: 'Years' },
    { value: '5000+', label: 'Patients' },
    { value: '98%', label: 'Satisfaction' },
    { value: '5.0', label: 'Rating' },
  ];

  return (
    <div>
      {/* Hero Section - Matching the provided design */}
      <section className="relative bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-700 text-white min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2MmgtMnYtMmgyem0wLTI0djJoLTJ2LTJoMnptMjQgMjR2MmgtMnYtMmgyem0wLTI0djJoLTJ2LTJoMnYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20 animate-pulse-slow"></div>
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Accepting New Patients Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 animate-fade-in">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Accepting New Patients</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Compassionate Care,{' '}
                <span className="text-yellow-300">Exceptional</span> Health
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-cyan-50 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Board-certified internal medicine physician with 15+ years of experience in comprehensive medical care.
              </p>

              {/* CTA Button */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link href="/book-appointment">
                  <Button size="lg" variant="secondary" className="text-blue-700 text-lg px-8 py-4 shadow-xl hover:shadow-2xl">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Book Appointment
                  </Button>
                </Link>
              </div>

              {/* Statistics Row */}
              <div className="grid grid-cols-4 gap-6 pt-8 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-cyan-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Doctor Card */}
            <div className="flex justify-center lg:justify-end animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="bg-blue-800 rounded-3xl p-12 shadow-2xl max-w-md w-full transform hover:scale-105 transition-transform duration-300">
                  {/* Medical Cross Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                      <Plus className="w-16 h-16 text-white" strokeWidth={3} />
                    </div>
                  </div>
                  
                  {/* Doctor Name */}
                  <h2 className="text-3xl font-bold text-center mb-2 text-white">Dr. [Name]</h2>
                  
                  {/* Specialty */}
                  <p className="text-center text-cyan-200 mb-8 text-lg">Internal Medicine</p>
                  
                  {/* MD Badge */}
                  <div className="flex justify-center">
                    <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30">
                      <span className="text-white font-semibold">MD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-gray-100 -mt-16 relative z-10 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 animate-fade-in-up hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary-50 text-primary-600 p-3 rounded-lg">
                  {feature.icon}
                </div>
                <span className="font-semibold text-gray-800">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Medical Services</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive healthcare services designed to meet your unique medical needs with excellence and compassion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <Link href="/services" className="text-primary-600 font-semibold flex items-center group">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Why Choose Our Medical Practice?
              </h2>
              <div className="w-24 h-1 bg-primary-600 mb-8"></div>
              <div className="space-y-6">
                {[
                  { title: 'Expert Medical Team', desc: 'Board-certified physicians with years of experience' },
                  { title: 'State-of-the-Art Facilities', desc: 'Modern equipment and cutting-edge technology' },
                  { title: 'Personalized Care', desc: 'Tailored treatment plans for each patient' },
                  { title: 'Comprehensive Services', desc: 'Full range of medical services under one roof' },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex gap-4 group animate-fade-in-up hover:translate-x-2 transition-transform duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-12 text-center border-2 border-primary-200 shadow-xl animate-slide-in-right hover:scale-105 transition-transform duration-300">
              <div className="text-6xl font-bold text-primary-600 mb-4">15+</div>
              <div className="text-2xl font-semibold text-gray-900 mb-2">Years of Experience</div>
              <div className="text-gray-600 mb-8">Serving patients with dedication and excellence</div>
              <div className="grid grid-cols-2 gap-6">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl font-bold text-primary-600 mb-1">5000+</div>
                  <div className="text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">What Our Patients Say</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from patients who trust us with their health
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'John Doe', rating: 5, comment: 'Exceptional care and attention. Dr. [Name] is truly dedicated to patient wellbeing.' },
              { name: 'Sarah Smith', rating: 5, comment: 'Professional, compassionate, and thorough. Highly recommend this practice.' },
              { name: 'Michael Johnson', rating: 5, comment: 'The best medical care I\'ve ever received. Outstanding service and expertise.' },
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">&quot;{testimonial.comment}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">Patient</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2MmgtMnYtMmgyem0wLTI0djJoLTJ2LTJoMnptMjQgMjR2MmgtMnYtMmgyem0wLTI0djJoLTJ2LTJoMnYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 animate-pulse-slow"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Schedule Your Visit?</h2>
            <p className="text-xl mb-10 text-cyan-50 max-w-2xl mx-auto leading-relaxed">
              Take the first step towards better health. Book your appointment online today and experience 
              exceptional medical care tailored to your needs.
            </p>
            <Link href="/book-appointment">
              <Button size="lg" variant="secondary" className="text-blue-700 text-lg px-10 py-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Book Appointment Now
                <Calendar className="w-5 h-5 inline ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
