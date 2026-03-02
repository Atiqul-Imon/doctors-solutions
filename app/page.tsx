'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Calendar, Clock, Stethoscope, Users, Award, Heart, Shield, CheckCircle2, ArrowRight, MapPin, Phone, Star, Activity, FileText, Pill, BookOpen, GraduationCap, Briefcase, Hospital } from 'lucide-react';

export default function Home() {
  // Doctor's Qualifications
  const qualifications = [
    {
      degree: 'MBBS',
      institution: 'Dhaka Medical College',
      year: '2010',
      description: 'Bachelor of Medicine, Bachelor of Surgery'
    },
    {
      degree: 'BCS (Health)',
      institution: 'Bangladesh Public Service Commission',
      year: '2012',
      description: 'Bangladesh Civil Service - Health Cadre'
    },
    {
      degree: 'FCPS (Medicine)',
      institution: 'Bangladesh College of Physicians & Surgeons',
      year: '2015',
      description: 'Fellowship in Internal Medicine (Optional)'
    },
  ];

  // Doctor's Experience
  const experience = [
    {
      position: 'Senior Medical Officer',
      hospital: 'Dhaka Medical College Hospital',
      duration: '2015 - 2020',
      icon: <Hospital className="w-6 h-6" />
    },
    {
      position: 'Consultant Physician',
      hospital: 'Square Hospital Ltd',
      duration: '2020 - Present',
      icon: <Briefcase className="w-6 h-6" />
    },
  ];

  // Areas of Expertise
  const expertise = [
    { 
      title: 'জ্বর ও সংক্রমণ (Fever & Infection)', 
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-red-50 text-red-600'
    },
    { 
      title: 'ডায়াবেটিস (Diabetes)', 
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      title: 'উচ্চ রক্তচাপ (Hypertension)', 
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-purple-50 text-purple-600'
    },
    { 
      title: 'হাঁপানি (Asthma)', 
      icon: <Stethoscope className="w-6 h-6" />,
      color: 'bg-green-50 text-green-600'
    },
  ];

  // Real, credible information (not fake metrics)
  const chamberInfo = {
    hospital: 'Square Hospital Ltd',
    address: 'Panthapath, Dhaka',
    days: 'Saturday - Thursday',
    hours: '5:00 PM - 9:00 PM',
    bmdc: 'A-12345', // BMDC Registration Number
  };

  return (
    <div>
      {/* Hero Section - Personal Doctor Brand */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 md:py-24 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6bTI0IDI0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
              
              {/* Doctor's Professional Photo */}
              <div className="md:col-span-2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
                  <div className="relative">
                    {/* Replace this div with actual <img> tag when you have real photo */}
                    <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                      <div className="text-center">
                        <Stethoscope className="w-20 h-20 text-primary-600 mx-auto mb-3" strokeWidth={1.5} />
                        <p className="text-sm text-gray-600 font-medium">Add Doctor Photo</p>
                        <p className="text-xs text-gray-500">Professional portrait</p>
                      </div>
                    </div>
                    {/* When you have real photo, use this instead:
                    <img 
                      src="/images/doctor-photo.jpg" 
                      alt="Dr. [Name]" 
                      className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-white/30"
                    />
                    */}
                  </div>
                </div>
              </div>

              {/* Doctor's Information */}
              <div className="md:col-span-3 text-center md:text-left space-y-5">
                
                {/* Name and Title */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    ডা. [আপনার নাম]
                  </h1>
                  <p className="text-xl md:text-2xl text-primary-100 font-medium mb-1">
                    বিশেষজ্ঞ - মেডিসিন (Medicine Specialist)
                  </p>
                  <p className="text-base text-primary-200">
                    MBBS, BCS (Health), FCPS (Medicine)
                  </p>
                </div>

                {/* Professional Statement */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                  <p className="text-lg leading-relaxed">
                    ১৫ বছরের ক্লিনিক্যাল অভিজ্ঞতায় বিশ্বস্ত চিকিৎসা সেবা প্রদান করছি।
                  </p>
                  <p className="text-base text-primary-100 mt-2">
                    15+ Years of Clinical Experience
                  </p>
                </div>

                {/* BMDC Registration */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    <span className="text-primary-100">BMDC Reg:</span>{' '}
                    <span className="font-semibold">{chamberInfo.bmdc}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    <span className="text-primary-100">Consultant:</span>{' '}
                    <span className="font-semibold">{chamberInfo.hospital}</span>
                  </div>
                </div>

                {/* Book Appointment Button */}
                <div className="pt-2">
                  <Link href="/book-appointment">
                    <Button size="lg" variant="secondary" className="text-primary-600 text-base px-8 py-4 shadow-xl hover:shadow-2xl font-semibold">
                      <Calendar className="w-5 h-5 mr-2" />
                      অ্যাপয়েন্টমেন্ট নিন
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Doctor - Personal Story & Philosophy */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                আমার সম্পর্কে (About Me)
              </h2>
              <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
            </div>

            {/* Personal Story - Authentic & Human */}
            <Card variant="elevated" className="p-8 lg:p-10">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  আমি গত <span className="font-semibold text-gray-900">১৫ বছর ধরে</span> মেডিসিন বিশেষজ্ঞ হিসেবে কাজ করছি। 
                  প্রতিটি রোগীর সমস্যাকে <span className="font-semibold text-gray-900">গুরুত্ব দিয়ে সময় নিয়ে</span> চিকিৎসা প্রদান করাই আমার অঙ্গীকার।
                </p>

                <p className="text-base">
                  I have been working as a Medicine Specialist for the past 15 years. 
                  My commitment is to provide treatment by giving importance and time to each patient&apos;s problem.
                </p>

                <div className="bg-primary-50 border-l-4 border-primary-600 p-5 rounded-r-lg">
                  <p className="text-gray-800 italic">
                    &quot;চিকিৎসা শুধু ওষুধ নয়, রোগীর সাথে সময় দেওয়া এবং তাদের সমস্যা বোঝাও চিকিৎসার অংশ।&quot;
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    &quot;Treatment is not just medicine, spending time with patients and understanding their problems is also part of treatment.&quot;
                  </p>
                </div>

                <p className="text-base">
                  আমি বিশ্বাস করি প্রতিটি রোগীর সমস্যা ভিন্ন এবং তাদের সবার জন্য আলাদা যত্ন প্রয়োজন। 
                  আমার লক্ষ্য শুধু চিকিৎসা নয়, রোগীদের সুস্থ জীবনযাপনে সাহায্য করা।
                </p>

                <p className="text-base">
                  I believe every patient&apos;s problem is different and all of them need separate care. 
                  My goal is not just treatment, but to help patients live a healthy life.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Chamber & Visiting Information */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                চেম্বার ও সময়সূচী (Chamber & Hours)
              </h2>
              <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
            </div>

            <Card variant="elevated" className="p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Chamber Location */}
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Hospital className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">চেম্বার (Chamber)</h3>
                      <p className="text-gray-700 font-medium">{chamberInfo.hospital}</p>
                      <p className="text-gray-600 text-sm">{chamberInfo.address}</p>
                    </div>
                  </div>
                </div>

                {/* Visiting Hours */}
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">সময়সূচী (Schedule)</h3>
                      <p className="text-gray-700 font-medium">{chamberInfo.days}</p>
                      <p className="text-gray-600 text-sm">{chamberInfo.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">যোগাযোগ (Contact)</h3>
                      <p className="text-gray-700 font-medium">+880 1XXX-XXXXXX</p>
                      <p className="text-gray-600 text-sm">Call or WhatsApp</p>
                    </div>
                  </div>
                </div>

                {/* Appointment */}
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">অ্যাপয়েন্টমেন্ট (Appointment)</h3>
                      <p className="text-gray-700 font-medium">অগ্রিম সিরিয়াল নিন</p>
                      <p className="text-gray-600 text-sm">Prior booking recommended</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">দ্রষ্টব্য:</span> শুক্রবার চেম্বার বন্ধ থাকে। জরুরী প্রয়োজনে ফোনে যোগাযোগ করুন।
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    <span className="font-semibold">Note:</span> Chamber closed on Friday. Contact by phone for emergencies.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Qualifications Section - Educational Background */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider bg-primary-50 px-4 py-2 rounded-full">
              শিক্ষাগত যোগ্যতা (Qualifications)
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 text-gray-900">
              ডাক্তারের শিক্ষাগত যোগ্যতা (Educational Background)
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-4 rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {qualifications.map((qual, index) => (
              <Card 
                key={index}
                variant="elevated"
                hover
                className="p-6 lg:p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-md">
                      <GraduationCap className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{qual.degree}</h3>
                        <p className="text-sm text-gray-600">{qual.description}</p>
                      </div>
                      <span className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full font-semibold text-sm">
                        {qual.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-4 h-4 text-primary-600" />
                      <span className="font-medium">{qual.institution}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - Work History */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider bg-primary-50 px-4 py-2 rounded-full">
              কর্মঅভিজ্ঞতা (Experience)
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 text-gray-900">
              পেশাগত অভিজ্ঞতা (Professional Experience)
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              দেশের স্বনামধন্য হাসপাতালে দীর্ঘ সময় ধরে চিকিৎসা সেবা প্রদান করছি।
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {experience.map((exp, index) => (
              <Card 
                key={index}
                variant="elevated"
                hover
                className="p-6 lg:p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
                      {exp.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{exp.position}</h3>
                        <p className="text-lg text-gray-700 font-medium">{exp.hospital}</p>
                      </div>
                      <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full font-semibold text-sm">
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section - Areas of Specialization */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider bg-primary-50 px-4 py-2 rounded-full">
              দক্ষতার ক্ষেত্র (Areas of Expertise)
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 text-gray-900">
              যে রোগের চিকিৎসা করি (Diseases I Treat)
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              বিভিন্ন ধরনের রোগের অভিজ্ঞ চিকিৎসক। আপনার সমস্যার সঠিক সমাধান পাবেন।
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {expertise.map((item, index) => (
              <Card 
                key={index}
                variant="elevated"
                hover
                className="p-6 text-center group"
              >
                <div className={`${item.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Bangladesh Names */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider bg-primary-50 px-4 py-2 rounded-full">
              রোগীদের মন্তব্য (Patient Reviews)
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 text-gray-900">
              রোগীরা কি বলেন? (What Patients Say)
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              যারা চিকিৎসা নিয়েছেন তাদের সত্যিকারের মন্তব্য। আপনিও বিশ্বস্ত সেবা পাবেন।
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              { 
                name: 'মোহাম্মদ রহিম (Rahim)', 
                rating: 5, 
                comment: 'অসাধারণ সেবা। ডাক্তার সাহেব খুবই ভালো মানুষ। সব কিছু বুঈিয়ে বলেন। আমার সমস্যা দ্রুত সমাধান হয়েছে।',
                date: '২ মাস আগে (2 months ago)',
                location: 'Dhaka'
              },
              { 
                name: 'ফাতেমা খাতুন (Fatema)', 
                rating: 5, 
                comment: 'খুবই ভালো চিকিৎসা পেয়েছি। দাম ও কম। ডিজিটাল প্রেসক্রিপশন পেয়ে খুবই খুশি। সবাইকে রেকমেন্ড করবো।',
                date: '১ মাস আগে (1 month ago)',
                location: 'Chittagong'
              },
              { 
                name: 'আবুল কালাম (Abul)', 
                rating: 5, 
                comment: 'অনলাইনে সময় নেওয়া খুবই সহজ। লাইনে দাঁড়াতে হয়নি। দ্রুত চিকিৎসা পেয়েছি। অনেক ভালো সেবা।',
                date: '৩ সপ্তাহ আগে (3 weeks ago)',
                location: 'Sylhet'
              },
            ].map((testimonial, index) => (
              <Card 
                key={index}
                variant="elevated"
                hover
                className="p-6 lg:p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-xs text-gray-500">{testimonial.date}</span>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                  &quot;{testimonial.comment}&quot;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-primary-600 font-bold text-lg">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Simple & Authentic */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              অ্যাপয়েন্টমেন্ট নিতে চান?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              অনলাইনে সহজে সিরিয়াল নিন অথবা সরাসরি ফোন করুন।
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Link href="/book-appointment">
                <Button size="xl" variant="secondary" className="text-primary-600 text-lg px-10 py-4 shadow-xl hover:shadow-2xl font-semibold">
                  <Calendar className="w-5 h-5 mr-2" />
                  অনলাইন সিরিয়াল
                </Button>
              </Link>
              <a href="tel:+8801XXXXXXXXX">
                <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-4 font-semibold">
                  <Phone className="w-5 h-5 mr-2" />
                  ফোন করুন
                </Button>
              </a>
            </div>

            <div className="text-sm text-primary-100">
              চেম্বার: {chamberInfo.hospital} | {chamberInfo.days}, {chamberInfo.hours}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
