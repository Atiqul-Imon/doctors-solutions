'use client';

import Card from '@/components/ui/Card';
import { Award, GraduationCap, Briefcase, Stethoscope, Calendar, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function About() {
  const qualifications = [
    'MBBS - Bachelor of Medicine and Bachelor of Surgery',
    'MD - Doctor of Medicine',
    'Board Certified Specialist',
    'Fellowship in Internal Medicine',
  ];

  const specializations = [
    'General Medicine',
    'Internal Medicine',
    'Preventive Care',
    'Chronic Disease Management',
  ];

  const achievements = [
    { year: '2020', title: 'Best Doctor Award', desc: 'Recognized for outstanding patient care' },
    { year: '2018', title: 'Medical Excellence', desc: 'Awarded for clinical expertise' },
    { year: '2015', title: 'Research Publication', desc: 'Published in leading medical journal' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section - Enhanced */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6bTI0IDI0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 animate-pulse-slow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">About Our Doctor</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">About Dr. [Name]</h1>
            <p className="text-lg md:text-xl text-primary-50 leading-relaxed max-w-3xl mx-auto">
              Dedicated healthcare professional committed to providing exceptional medical care 
              with compassion, expertise, and innovation for over 15 years.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-16 relative z-10">
        {/* Profile Card - Enhanced */}
        <div className="max-w-6xl mx-auto mb-20 animate-scale-in">
          <Card variant="elevated" className="p-0 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-10 lg:p-12 text-white flex flex-col justify-center items-center text-center lg:items-start lg:text-left relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative z-10 w-full">
                  {/* Doctor Photo Placeholder - Replace with actual image */}
                  <div className="w-40 h-40 lg:w-48 lg:h-48 bg-white/20 rounded-full flex items-center justify-center mb-6 border-4 border-white/30 mx-auto lg:mx-0 shadow-xl">
                    <span className="text-5xl lg:text-6xl font-bold">DR</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-3">Dr. [Name]</h2>
                  <p className="text-primary-100 mb-2 text-lg font-medium">Senior Medical Consultant</p>
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 flex-wrap">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/30">MD</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/30">Board Certified</span>
                  </div>
                  <div className="space-y-3 w-full pt-6 border-t border-white/20">
                    <a href="mailto:doctor@example.com" className="flex items-center gap-3 hover:text-primary-100 transition-colors group">
                      <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">doctor@example.com</span>
                    </a>
                    <a href="tel:+8801234567890" className="flex items-center gap-3 hover:text-primary-100 transition-colors group">
                      <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">+880 1234 567890</span>
                    </a>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Dhaka, Bangladesh</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 p-10 lg:p-12 bg-white">
                <div className="inline-block mb-4">
                  <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Biography</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">Professional Journey</h3>
                <div className="space-y-5 text-gray-700 leading-relaxed text-base md:text-lg">
                  <p>
                    With over 15 years of extensive experience in the medical field, Dr. [Name] is a highly 
                    skilled and compassionate healthcare professional dedicated to providing the highest quality 
                    medical care to patients. Specializing in internal medicine and general practice, Dr. [Name] 
                    combines clinical expertise with a patient-centered approach to ensure the best possible outcomes.
                  </p>
                  <p>
                    Throughout the career, Dr. [Name] has successfully treated thousands of patients, helping them 
                    achieve better health through personalized treatment plans and comprehensive care approaches. 
                    The practice is committed to staying current with the latest medical advancements and treatment 
                    protocols, ensuring that patients receive the most effective and evidence-based care available.
                  </p>
                  <p>
                    Our philosophy centers on treating each patient with dignity, respect, and empathy, understanding 
                    that good healthcare is built on trust, communication, and a genuine commitment to patient wellbeing.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Qualifications - Enhanced */}
          <Card variant="elevated" hover className="p-8 lg:p-10 animate-slide-in-left">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 p-4 rounded-xl shadow-md">
                <GraduationCap className="w-8 h-8" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Qualifications</h2>
                <p className="text-sm text-gray-500">Education & Certifications</p>
              </div>
            </div>
            <div className="space-y-3">
              {qualifications.map((qual, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-200 group">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 font-medium text-sm md:text-base">{qual}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Specializations - Enhanced */}
          <Card variant="elevated" hover className="p-8 lg:p-10 animate-slide-in-right">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-br from-medical-green/20 to-medical-green/10 text-medical-green p-4 rounded-xl shadow-md">
                <Stethoscope className="w-8 h-8" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Specializations</h2>
                <p className="text-sm text-gray-500">Areas of Expertise</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specializations.map((spec, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-200 rounded-lg text-center hover:border-primary-400 hover:shadow-md transition-all duration-200 group">
                  <span className="text-primary-700 font-semibold text-sm md:text-base group-hover:text-primary-900 transition-colors">{spec}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Experience - Enhanced */}
          <Card variant="elevated" hover className="p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 p-4 rounded-xl shadow-md">
                <Briefcase className="w-8 h-8" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Professional Experience</h2>
                <p className="text-sm text-gray-500">Years of Service</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-b from-primary-500 to-primary-700 bg-clip-text text-transparent mb-2">15+</div>
                <div className="text-xl font-bold text-gray-900 mb-3">Years of Experience</div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Extensive experience in treating patients across various medical conditions with a focus on 
                  personalized care and evidence-based treatment approaches.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-1">5000+</div>
                    <div className="text-sm text-gray-600 font-medium">Patients Treated</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-1">98%</div>
                    <div className="text-sm text-gray-600 font-medium">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Achievements - Enhanced */}
          <Card variant="elevated" hover className="p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 p-4 rounded-xl shadow-md">
                <Award className="w-8 h-8" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Awards & Achievements</h2>
                <p className="text-sm text-gray-500">Recognition & Honors</p>
              </div>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-5 bg-gradient-to-r from-gray-50 to-white border-l-4 border-primary-500 rounded-lg hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-primary-600 font-bold text-lg">{achievement.year}</span>
                    <Award className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 text-base md:text-lg">{achievement.title}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA Section - Enhanced */}
        <div className="max-w-6xl mx-auto">
          <Card variant="gradient" className="p-12 lg:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Schedule a Consultation</h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Ready to take the next step in your health journey? Book an appointment with Dr. [Name] today 
                and experience personalized, compassionate medical care.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/book-appointment">
                  <Button size="xl" variant="secondary" className="text-primary-600 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl">
                    Book Appointment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
