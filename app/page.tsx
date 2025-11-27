'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
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
      {/* Hero Section - Enhanced Professional Design */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white min-h-[92vh] flex items-center overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6bTI0IDI0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 animate-pulse-slow"></div>
        
        {/* Decorative gradient circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-medical-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Accepting New Patients Badge */}
              <div className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full border border-white/30 animate-fade-in hover:scale-105 transition-transform">
                <div className="w-2.5 h-2.5 bg-medical-green rounded-full animate-pulse shadow-lg shadow-medical-green/50"></div>
                <span className="text-sm font-semibold">Accepting New Patients</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Compassionate Care,{' '}
                <span className="text-yellow-300 drop-shadow-lg">Exceptional</span> Health
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl lg:text-2xl text-primary-50 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Board-certified internal medicine physician with 15+ years of experience dedicated to providing comprehensive, personalized medical care.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link href="/book-appointment">
                  <Button size="lg" variant="secondary" className="text-primary-600 text-base px-8 py-4 shadow-xl hover:shadow-2xl font-semibold">
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-base font-semibold">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Statistics Row */}
              <div className="grid grid-cols-4 gap-4 lg:gap-6 pt-8 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 bg-gradient-to-b from-white to-primary-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-primary-100 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Enhanced Doctor Card */}
            <div className="flex justify-center lg:justify-end animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary-400/30 rounded-3xl blur-2xl transform scale-110"></div>
                
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-10 lg:p-12 shadow-2xl max-w-md w-full transform hover:scale-105 transition-all duration-300 border border-white/20">
                  {/* Medical Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg animate-float">
                      <Plus className="w-16 h-16 text-white" strokeWidth={3} />
                    </div>
                  </div>
                  
                  {/* Doctor Name */}
                  <h2 className="text-3xl lg:text-4xl font-bold text-center mb-2 text-white">Dr. [Name]</h2>
                  
                  {/* Specialty */}
                  <p className="text-center text-primary-100 mb-6 text-lg font-medium">Internal Medicine</p>
                  
                  {/* Credentials & Badge */}
                  <div className="space-y-4">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <div className="glass px-4 py-2 rounded-full border border-white/30">
                        <span className="text-white font-semibold text-sm">MD</span>
                      </div>
                      <div className="glass px-4 py-2 rounded-full border border-white/30">
                        <span className="text-white font-semibold text-sm">Board Certified</span>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                        ))}
                      </div>
                      <span className="text-white/90 font-semibold">5.0 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar - Enhanced */}
      <section className="bg-white border-b border-gray-200 -mt-16 relative z-10 shadow-elevated">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <div className="text-center md:text-left">
                  <span className="font-bold text-gray-900 block">{feature.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">Medical Services</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-medical-teal mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive healthcare services designed to meet your unique medical needs with excellence, 
              cutting-edge technology, and compassionate care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card 
                key={index} 
                variant="elevated"
                hover
                className="p-8 animate-scale-in group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                  {service.description}
                </p>
                <Link href="/services" className="text-primary-600 font-semibold flex items-center group/link">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Enhanced */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-medical-teal/10"></div>
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

      {/* Testimonials/Reviews Section - Enhanced */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">What Our Patients Say</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-medical-teal mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real feedback from patients who trust us with their health and wellbeing
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'John Doe', rating: 5, comment: 'Exceptional care and attention. Dr. [Name] is truly dedicated to patient wellbeing. The best medical experience I\'ve had.', date: '2 months ago' },
              { name: 'Sarah Smith', rating: 5, comment: 'Professional, compassionate, and thorough. Highly recommend this practice. The staff is amazing and the care is top-notch.', date: '1 month ago' },
              { name: 'Michael Johnson', rating: 5, comment: 'The best medical care I\'ve ever received. Outstanding service and expertise. I feel truly cared for here.', date: '3 weeks ago' },
            ].map((testimonial, index) => (
              <Card 
                key={index}
                variant="elevated"
                hover
                className="p-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-xs text-gray-500">{testimonial.date}</span>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic text-sm md:text-base">
                  &quot;{testimonial.comment}&quot;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-primary-600 font-bold text-lg">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">Verified Patient</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="section-padding bg-gradient-medical text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2MmgtMnYtMmgyem0wLTI0djJoLTJ2LTJoMnptMjQgMjR2MmgtMnYtMmgyem0wLTI0djJoLTJ2LTJoMnYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 animate-pulse-slow"></div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">Get Started Today</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Schedule Your Visit?
            </h2>
            <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Take the first step towards better health. Book your appointment online today and experience 
              exceptional medical care tailored to your unique needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/book-appointment">
                <Button size="xl" variant="secondary" className="text-primary-600 text-lg px-10 py-4 shadow-xl hover:shadow-2xl font-bold">
                  Book Appointment Now
                  <Calendar className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-4 font-bold">
                  Contact Us
                </Button>
              </Link>
            </div>
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm">
                <span className="font-semibold">Appointments Available This Week</span> • Same-day appointments available • Insurance accepted
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
