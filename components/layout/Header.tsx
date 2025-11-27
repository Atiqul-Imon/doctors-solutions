'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Stethoscope } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className={`bg-white border-b transition-all duration-300 sticky top-0 z-50 ${
      isScrolled 
        ? 'shadow-lg border-gray-200 backdrop-blur-sm bg-white/95' 
        : 'shadow-sm border-gray-100'
    }`}>
      {/* Top Bar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'hidden' : 'block'} bg-gradient-to-r from-primary-50 to-primary-100/50 border-b border-primary-100`}>
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm">
            <div className="flex items-center gap-6 mb-2 md:mb-0">
              <a href="tel:+8801234567890" className="flex items-center gap-2 text-primary-700 hover:text-primary-600 transition-colors group">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">+880 1234 567890</span>
              </a>
              <div className="hidden md:flex items-center gap-2 text-primary-700">
                <Calendar className="w-4 h-4" />
                <span>Mon - Sat: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-medical-green rounded-full animate-pulse"></span>
              <span className="text-primary-700 font-semibold">Emergency: 24/7 Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`container mx-auto px-4 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Stethoscope className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">Dr. Portfolio</div>
              <div className="text-xs text-gray-500 font-medium">Medical Excellence</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book-appointment" className="ml-2">
              <Button variant="primary" size="md" className="shadow-md hover:shadow-lg">
                Book Appointment
              </Button>
            </Link>
            <Link
              href="/login"
              className="ml-2 text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-sm"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg font-medium ${
                    isActive(link.href)
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/book-appointment" onClick={() => setIsMenuOpen(false)} className="mt-2">
                <Button variant="primary" size="md" className="w-full">
                  Book Appointment
                </Button>
              </Link>
              <Link
                href="/login"
                className="text-primary-600 px-4 py-3 rounded-lg font-medium text-center border border-primary-600 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
