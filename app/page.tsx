'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Calendar, Clock, Stethoscope, MapPin, Phone, Star, Hospital, GraduationCap, Briefcase, Activity, Heart } from 'lucide-react';

export default function Home() {
  const chamberInfo = {
    hospital: 'Square Hospital Ltd',
    address: 'Panthapath, Dhaka',
    days: 'Saturday - Thursday',
    hours: '5:00 PM - 9:00 PM',
    phone: '+880 1XXX-XXXXXX',
    bmdc: 'A-12345',
  };

  const qualifications = [
    { degree: 'MBBS', institution: 'Dhaka Medical College', year: '2010' },
    { degree: 'BCS (Health)', institution: 'Bangladesh PSC', year: '2012' },
    { degree: 'FCPS (Medicine)', institution: 'BCPS', year: '2015' },
  ];

  const experience = [
    { position: 'Senior Medical Officer', hospital: 'Dhaka Medical College Hospital', duration: '2015 - 2020' },
    { position: 'Consultant Physician', hospital: 'Square Hospital Ltd', duration: '2020 - Present' },
  ];

  const expertise = [
    { title: 'জ্বর ও সংক্রমণ', sub: 'Fever & Infection', color: 'bg-rose-50 text-rose-600' },
    { title: 'ডায়াবেটিস', sub: 'Diabetes', color: 'bg-sky-50 text-sky-600' },
    { title: 'উচ্চ রক্তচাপ', sub: 'Hypertension', color: 'bg-violet-50 text-violet-600' },
    { title: 'হাঁপানি', sub: 'Asthma', color: 'bg-emerald-50 text-emerald-600' },
  ];

  const testimonials = [
    { name: 'মোহাম্মদ রহিম', comment: 'ডাক্তার সাহেব সময় নিয়ে সব বুঝিয়ে বলেন। সমস্যা দ্রুত সমাধান হয়েছে।', location: 'Dhaka' },
    { name: 'ফাতেমা খাতুন', comment: 'খুবই ভালো চিকিৎসা। অনলাইনে সিরিয়াল নেওয়া সহজ। সবাইকে রেকমেন্ড করবো।', location: 'Chittagong' },
    { name: 'আবুল কালাম', comment: 'দ্রুত চিকিৎসা পেয়েছি। লাইনে দাঁড়াতে হয়নি। অনেক ভালো সেবা।', location: 'Sylhet' },
  ];

  const testimonialColors = ['bg-primary-500', 'bg-emerald-500', 'bg-violet-500'];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_50%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden ring-4 ring-white/30">
                <Stethoscope className="w-20 h-20 md:w-24 md:h-24 text-primary-600" strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium mb-4">BMDC Reg: {chamberInfo.bmdc}</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">ডা. [আপনার নাম]</h1>
              <p className="text-xl text-primary-100 mb-4">বিশেষজ্ঞ - মেডিসিন | Medicine Specialist</p>
              <p className="text-primary-200 mb-8">MBBS, BCS (Health), FCPS (Medicine) | 15+ Years Experience</p>
              <Link href="/book-appointment">
                <Button variant="secondary" size="lg" className="text-primary-600 font-semibold shadow-xl hover:shadow-2xl">
                  <Calendar className="w-5 h-5 mr-2" />
                  অ্যাপয়েন্টমেন্ট নিন
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="elevated" className="p-6 border-l-4 border-l-primary-500 overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Hospital className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600 font-semibold uppercase tracking-wide">চেম্বার</p>
                <p className="font-bold text-gray-900">{chamberInfo.hospital}</p>
                <p className="text-sm text-gray-600">{chamberInfo.address}</p>
              </div>
            </div>
          </Card>
          <Card variant="elevated" className="p-6 border-l-4 border-l-emerald-500 overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wide">সময়সূচী</p>
                <p className="font-bold text-gray-900">{chamberInfo.days}</p>
                <p className="text-sm text-gray-600">{chamberInfo.hours}</p>
                <p className="text-xs text-amber-600 mt-1 font-semibold">শুক্রবার বন্ধ</p>
              </div>
            </div>
          </Card>
          <Card variant="elevated" className="p-6 border-l-4 border-l-sky-500 overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-7 h-7 text-sky-600" />
              </div>
              <div>
                <p className="text-sm text-sky-600 font-semibold uppercase tracking-wide">যোগাযোগ</p>
                <a href={`tel:${chamberInfo.phone}`} className="font-bold text-gray-900 hover:text-primary-600 block">
                  {chamberInfo.phone}
                </a>
                <p className="text-sm text-gray-600">Call / WhatsApp</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-primary-50/50 to-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">দক্ষতার ক্ষেত্র</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">যে রোগের চিকিৎসা করি</h2>
            <div className="w-16 h-1 bg-primary-500 rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {expertise.map((item, i) => (
              <Card key={i} variant="elevated" hover className="p-6 text-center overflow-visible">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                  {i === 0 && <Activity className="w-8 h-8" />}
                  {i === 1 && <Heart className="w-8 h-8" />}
                  {i === 2 && <Activity className="w-8 h-8" />}
                  {i === 3 && <Stethoscope className="w-8 h-8" />}
                </div>
                <p className="font-bold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600 mt-1">{item.sub}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">কিছু কথা</span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">আমার সম্পর্কে</h2>
            <p className="text-gray-600">About Me</p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            {/* Left - Visual */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative">
                <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-primary-100 to-emerald-100 rounded-2xl flex items-center justify-center shadow-xl">
                  <Stethoscope className="w-20 h-20 md:w-24 md:h-24 text-primary-600" strokeWidth={1.5} />
                </div>
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">15+</span>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  আমি গত <span className="font-bold text-gray-900">১৫ বছর ধরে</span> মেডিসিন বিশেষজ্ঞ হিসেবে কাজ করছি। প্রতিটি রোগীর সমস্যাকে গুরুত্ব দিয়ে সময় নিয়ে চিকিৎসা প্রদান করাই আমার অঙ্গীকার।
                </p>
                <p>
                  I provide treatment by giving time and importance to each patient. My goal is not just prescribing medicine, but helping patients understand their condition and live healthier lives.
                </p>
              </div>

              {/* Philosophy Quote */}
              <div className="bg-primary-50 border-l-4 border-primary-500 rounded-r-xl p-5 md:p-6">
                <p className="text-gray-800 italic font-medium">
                  &quot;চিকিৎসা শুধু ওষুধ নয় — রোগীর সাথে সময় দেওয়া এবং তাদের সমস্যা বোঝাও চিকিৎসার অংশ।&quot;
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Treatment is not just medicine — spending time with patients and understanding their problems is also part of care.
                </p>
              </div>

              {/* Key Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">সময় দেই</p>
                    <p className="text-xs text-gray-600">Time for each patient</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">সহানুভূতি</p>
                    <p className="text-xs text-gray-600">Compassionate care</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">ব্যক্তিগত চিকিৎসা</p>
                    <p className="text-xs text-gray-600">Personalized treatment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials - Timeline Layout */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-emerald-50/40 via-white to-primary-50/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">পেশাগত প্রোফাইল</span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">শিক্ষা ও অভিজ্ঞতা</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Academic excellence and professional journey</p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Qualifications - Timeline style */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">শিক্ষাগত যোগ্যতা</h3>
                  <p className="text-sm text-gray-600">Educational Background</p>
                </div>
              </div>

              <div className="relative space-y-0">
                {/* Vertical timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-primary-300 to-transparent hidden md:block" />

                {qualifications.map((q, i) => (
                  <div key={i} className="relative flex gap-6 mb-8 last:mb-0">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white border-4 border-primary-500 shadow-lg flex items-center justify-center font-bold text-primary-600 text-sm z-10">
                        {q.year.slice(-2)}
                      </div>
                    </div>
                    <div className="flex-1 pb-2">
                      <Card variant="elevated" className="p-6 -ml-1 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{q.degree}</h4>
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-bold text-xs whitespace-nowrap">
                            {q.year}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium">{q.institution}</p>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary-600 uppercase tracking-wider">
                            <span className="w-2 h-2 bg-primary-500 rounded-full" />
                            Degree
                          </span>
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience - Timeline style */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">পেশাগত অভিজ্ঞতা</h3>
                  <p className="text-sm text-gray-600">Professional Experience</p>
                </div>
              </div>

              <div className="relative space-y-0">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-emerald-300 to-transparent hidden md:block" />

                {experience.map((exp, i) => (
                  <div key={i} className="relative flex gap-6 mb-8 last:mb-0">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white border-4 border-emerald-500 shadow-lg flex items-center justify-center z-10 overflow-hidden">
                        <Hospital className="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>
                    <div className="flex-1 pb-2">
                      <Card variant="elevated" className="p-6 -ml-1 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-xs whitespace-nowrap">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium">{exp.hospital}</p>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                            {i === experience.length - 1 ? 'Current Role' : 'Previous'}
                          </span>
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-gray-100">
              <span className="w-2 h-2 bg-primary-500 rounded-full" />
              <span className="text-sm font-semibold text-gray-700">15+ Years Combined Experience</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">রোগীদের ভরসা</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">রোগীদের মন্তব্য</h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} variant="elevated" hover className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 rounded-full" style={{ backgroundColor: i === 0 ? '#3b82f6' : i === 1 ? '#10b981' : '#8b5cf6' }} />
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed relative">&quot;{t.comment}&quot;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-12 h-12 ${testimonialColors[i]} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {t.location}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.2)_0%,_transparent_50%)] pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">অ্যাপয়েন্টমেন্ট নিতে চান?</h2>
          <p className="text-primary-100 mb-8">অনলাইনে সিরিয়াল নিন অথবা ফোন করুন</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-primary-600 font-semibold shadow-lg">
                <Calendar className="w-5 h-5 mr-2" />
                অনলাইন সিরিয়াল
              </Button>
            </Link>
            <a href={`tel:${chamberInfo.phone}`}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10">
                <Phone className="w-5 h-5 mr-2" />
                ফোন করুন
              </Button>
            </a>
          </div>
          <p className="text-sm text-primary-200 mt-8">
            {chamberInfo.hospital} | {chamberInfo.days}, {chamberInfo.hours}
          </p>
        </div>
      </section>
    </div>
  );
}
