import Link from 'next/link';
import { Mail, Phone, MapPin, Calendar, Facebook, Linkedin, Twitter, Instagram, Shield, Award, CheckCircle2, Stethoscope } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/book-appointment', label: 'Book Appointment' },
  ];

  const services = [
    { href: '/services', label: 'General Consultation' },
    { href: '/services', label: 'Cardiology' },
    { href: '/services', label: 'Internal Medicine' },
    { href: '/services', label: 'Preventive Care' },
  ];

  const patientResources = [
    { href: '/', label: 'Patient Portal' },
    { href: '/', label: 'Health Tips' },
    { href: '/', label: 'Forms & Downloads' },
    { href: '/', label: 'FAQs' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6bTI0IDI0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Trust Indicators Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-12 border-b border-gray-800">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="bg-primary-500/20 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Licensed &</div>
              <div className="font-semibold text-white">Certified</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="bg-medical-green/20 p-3 rounded-lg">
              <Award className="w-6 h-6 text-medical-green" />
            </div>
            <div>
              <div className="text-sm text-gray-400">15+ Years</div>
              <div className="font-semibold text-white">Experience</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="bg-primary-500/20 p-3 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">5000+</div>
              <div className="font-semibold text-white">Patients</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="bg-medical-green/20 p-3 rounded-lg">
              <Stethoscope className="w-6 h-6 text-medical-green" />
            </div>
            <div>
              <div className="text-sm text-gray-400">24/7</div>
              <div className="font-semibold text-white">Emergency</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-xl font-bold">Dr. Portfolio</div>
                <div className="text-xs text-gray-400 font-medium">Medical Excellence</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Providing exceptional medical care with decades of experience, cutting-edge technology, 
              and a compassionate approach to healing. Your health is our priority.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="bg-gray-800 hover:bg-primary-600 p-3 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="bg-gray-800 hover:bg-primary-600 p-3 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="bg-gray-800 hover:bg-primary-600 p-3 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="bg-gray-800 hover:bg-primary-600 p-3 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group text-sm">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group text-sm">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Patient Resources</h3>
            <ul className="space-y-3">
              {patientResources.map((resource, index) => (
                <li key={index}>
                  <Link href={resource.href} className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group text-sm">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0 group-hover:text-primary-300 transition-colors" />
                <div className="text-gray-400 text-sm">
                  <div>123 Medical Center Road</div>
                  <div>Dhaka, Bangladesh</div>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0 group-hover:text-primary-300 transition-colors" />
                <div className="text-gray-400 text-sm">
                  <a href="tel:+8801234567890" className="hover:text-primary-400 transition-colors block">+880 1234 567890</a>
                  <a href="tel:+8801234567891" className="hover:text-primary-400 transition-colors block">Emergency: +880 1234 567891</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0 group-hover:text-primary-300 transition-colors" />
                <div className="text-gray-400 text-sm">
                  <a href="mailto:info@doctorportfolio.com" className="hover:text-primary-400 transition-colors block">info@doctorportfolio.com</a>
                  <a href="mailto:appointments@doctorportfolio.com" className="hover:text-primary-400 transition-colors block">appointments@doctorportfolio.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Calendar className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0 group-hover:text-primary-300 transition-colors" />
                <div className="text-gray-400 text-sm">
                  <div>Mon - Fri: 9:00 AM - 5:00 PM</div>
                  <div>Saturday: 9:00 AM - 1:00 PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Doctor Portfolio. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-end">
              <Link href="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                HIPAA Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
