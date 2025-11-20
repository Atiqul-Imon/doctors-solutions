import Link from 'next/link';
import { Mail, Phone, MapPin, Calendar, Facebook, Linkedin, Twitter } from 'lucide-react';

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

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">D</span>
              </div>
              <div>
                <div className="text-lg font-bold">Dr. Portfolio</div>
                <div className="text-xs text-gray-400">Medical Excellence</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Providing exceptional medical care with decades of experience, cutting-edge technology, 
              and a compassionate approach to healing.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <div>123 Medical Center Road</div>
                  <div>Dhaka, Bangladesh</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <div>+880 1234 567890</div>
                  <div>Emergency: +880 1234 567891</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <div>info@doctorportfolio.com</div>
                  <div>appointments@doctorportfolio.com</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
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
            <div className="flex gap-6 text-sm">
              <Link href="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
