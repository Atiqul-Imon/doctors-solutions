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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2MmgtMnYtMmgyem0wLTI0djJoLTJ2LTJoMnptMjQgMjR2MmgtMnYtMmgyem0wLTI0djJoLTJ2LTJoMnYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 animate-pulse-slow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Dr. [Name]</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Dedicated healthcare professional committed to providing exceptional medical care 
              with compassion, expertise, and innovation.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-12 relative z-10">
        {/* Profile Card */}
        <div className="max-w-6xl mx-auto mb-16 animate-scale-in">
          <Card className="p-0 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-12 text-white flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
                <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center mb-6 border-4 border-white/30">
                  <span className="text-6xl font-bold">DR</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Dr. [Name]</h2>
                <p className="text-primary-100 mb-6 text-lg">Senior Medical Consultant</p>
                <div className="space-y-3 w-full">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">doctor@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">+880 1234 567890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 p-12 bg-white">
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Biography</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
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
          {/* Qualifications */}
          <Card className="p-8 shadow-lg animate-slide-in-left hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Qualifications</h2>
            </div>
            <div className="space-y-4">
              {qualifications.map((qual, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{qual}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Specializations */}
          <Card className="p-8 shadow-lg animate-slide-in-right hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 text-green-600 p-4 rounded-xl">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Specializations</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {specializations.map((spec, index) => (
                <div key={index} className="p-4 bg-primary-50 border border-primary-100 rounded-lg text-center">
                  <span className="text-primary-700 font-semibold">{spec}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Experience */}
          <Card className="p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-xl">
                <Briefcase className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Professional Experience</h2>
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-5xl font-bold text-primary-600 mb-2">15+</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">Years of Experience</div>
                <p className="text-gray-600 leading-relaxed">
                  Extensive experience in treating patients across various medical conditions with a focus on 
                  personalized care and evidence-based treatment approaches.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-1">5000+</div>
                    <div className="text-sm text-gray-600">Patients Treated</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-1">98%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-yellow-100 text-yellow-600 p-4 rounded-xl">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Awards & Achievements</h2>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-5 bg-gradient-to-r from-gray-50 to-white border-l-4 border-primary-600 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-primary-600 font-bold text-lg">{achievement.year}</span>
                    <Award className="w-5 h-5 text-yellow-500" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{achievement.title}</h4>
                  <p className="text-gray-600 text-sm">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto">
          <Card className="p-12 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Schedule a Consultation</h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Ready to take the next step in your health journey? Book an appointment with Dr. [Name] today.
            </p>
            <Link href="/book-appointment">
              <Button size="lg" variant="secondary" className="text-primary-600 px-8 py-4 text-lg">
                Book Appointment
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
