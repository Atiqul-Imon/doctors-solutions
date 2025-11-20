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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Medical Services</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Comprehensive healthcare services delivered with excellence, compassion, and the latest medical technology.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-12 relative z-10">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-2xl hover:-translate-y-2 border-2 border-gray-100 bg-white transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${service.color} w-20 h-20 rounded-xl flex items-center justify-center mb-6 border-2`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
              <div className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/book-appointment" className="text-primary-600 font-semibold flex items-center group">
                Book Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>

          {/* Additional Information Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-10 bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 animate-slide-in-left hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Why Choose Our Services?</h3>
            <div className="space-y-4">
              {[
                'Expert medical professionals with years of experience',
                'State-of-the-art medical equipment and facilities',
                'Personalized treatment plans for each patient',
                'Comprehensive care from diagnosis to recovery',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-10 bg-white border-2 border-gray-100 animate-slide-in-right hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Approach</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We believe in providing comprehensive, patient-centered care that addresses not just the symptoms, 
              but the root cause of health issues. Our approach combines evidence-based medicine with a compassionate 
              understanding of each patient&apos;s unique needs.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">24/7</div>
                  <div className="text-xs text-gray-600">Emergency Care</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
                  <div className="text-xs text-gray-600">Confidential</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">98%</div>
                  <div className="text-xs text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto">
          <Card className="p-12 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Need More Information?</h3>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              If you have questions about our services or would like to schedule a consultation, 
              please don&apos;t hesitate to contact us. We&apos;re here to help you understand your options 
              and find the best care for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="text-primary-600 px-8 py-4 text-lg">
                  Contact Us
                </Button>
              </Link>
              <Link href="/book-appointment">
                <Button size="lg" variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg hover:bg-white/10">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
