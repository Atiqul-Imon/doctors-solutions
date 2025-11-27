'use client';

import Card from '@/components/ui/Card';
import { Stethoscope, Heart, Brain, Baby, Eye, Pill, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Services() {
  const services = [
    {
      title: 'General Consultation',
      description: 'Comprehensive health checkups and consultations for all your medical needs. Regular health monitoring and preventive care.',
      icon: <Stethoscope className="w-10 h-10" />,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      features: ['Health Assessment', 'Preventive Care', 'Follow-up Visits'],
    },
    {
      title: 'Cardiology',
      description: 'Heart health assessment, cardiovascular disease management, and preventive cardiac care.',
      icon: <Heart className="w-10 h-10" />,
      color: 'bg-red-50 text-red-600 border-red-100',
      features: ['ECG Testing', 'Heart Monitoring', 'Cardiac Rehabilitation'],
    },
    {
      title: 'Neurology',
      description: 'Neurological evaluation and treatment for conditions affecting the brain and nervous system.',
      icon: <Brain className="w-10 h-10" />,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      features: ['Neurological Exams', 'Headache Treatment', 'Nerve Disorders'],
    },
    {
      title: 'Pediatrics',
      description: 'Comprehensive healthcare services for children, from infancy through adolescence.',
      icon: <Baby className="w-10 h-10" />,
      color: 'bg-pink-50 text-pink-600 border-pink-100',
      features: ['Child Health', 'Vaccinations', 'Growth Monitoring'],
    },
    {
      title: 'Ophthalmology',
      description: 'Eye care services including vision testing, eye disease treatment, and eye health maintenance.',
      icon: <Eye className="w-10 h-10" />,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      features: ['Eye Exams', 'Vision Correction', 'Eye Disease Treatment'],
    },
    {
      title: 'Internal Medicine',
      description: 'Diagnosis and treatment of adult diseases, focusing on comprehensive care for complex medical conditions.',
      icon: <Pill className="w-10 h-10" />,
      color: 'bg-green-50 text-green-600 border-green-100',
      features: ['Disease Management', 'Chronic Care', 'Medication Review'],
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
              <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">Our Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">Our Medical Services</h1>
            <p className="text-lg md:text-xl text-primary-50 leading-relaxed max-w-3xl mx-auto">
              Comprehensive healthcare services delivered with excellence, compassion, and the latest medical technology 
              to ensure optimal patient care and outcomes.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-16 relative z-10">
        {/* Services Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card 
              key={index}
              variant="elevated"
              hover
              className="p-8 lg:p-10 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${service.color} w-20 h-20 rounded-xl flex items-center justify-center mb-6 border-2 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                {service.description}
              </p>
              <div className="space-y-3 mb-8 pt-4 border-t border-gray-100">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 group/feature">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 group-hover/feature:scale-110 transition-transform" />
                    <span className="text-gray-700 text-sm md:text-base font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/book-appointment" className="text-primary-600 font-semibold flex items-center group/link hover:text-primary-700 transition-colors">
                Book Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-2 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>

          {/* Additional Information Section - Enhanced */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card variant="elevated" hover className="p-10 lg:p-12 bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-200 animate-slide-in-left">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Why Choose Us</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">Why Choose Our Services?</h3>
            <div className="space-y-4">
              {[
                'Expert medical professionals with years of experience',
                'State-of-the-art medical equipment and facilities',
                'Personalized treatment plans for each patient',
                'Comprehensive care from diagnosis to recovery',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors group">
                  <CheckCircle2 className="w-6 h-6 text-primary-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 leading-relaxed text-sm md:text-base font-medium">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="elevated" hover className="p-10 lg:p-12 bg-white animate-slide-in-right">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Our Approach</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">Our Approach</h3>
            <p className="text-gray-700 leading-relaxed mb-8 text-sm md:text-base">
              We believe in providing comprehensive, patient-centered care that addresses not just the symptoms, 
              but the root cause of health issues. Our approach combines evidence-based medicine with a compassionate 
              understanding of each patient&apos;s unique needs.
            </p>
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg hover:bg-white transition-colors">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-b from-primary-500 to-primary-700 bg-clip-text text-transparent mb-2">24/7</div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">Emergency Care</div>
                </div>
                <div className="p-4 rounded-lg hover:bg-white transition-colors">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-b from-primary-500 to-primary-700 bg-clip-text text-transparent mb-2">100%</div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">Confidential</div>
                </div>
                <div className="p-4 rounded-lg hover:bg-white transition-colors">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-b from-primary-500 to-primary-700 bg-clip-text text-transparent mb-2">98%</div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">Satisfaction</div>
                </div>
              </div>
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
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">Need More Information?</h3>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                If you have questions about our services or would like to schedule a consultation, 
                please don&apos;t hesitate to contact us. We&apos;re here to help you understand your options 
                and find the best care for your needs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="xl" variant="secondary" className="text-primary-600 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/book-appointment">
                  <Button size="xl" variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-bold hover:bg-white/10">
                    Book Appointment
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
