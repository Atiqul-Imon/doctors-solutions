'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary-50 border-b border-primary-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm">
            <div className="flex items-center gap-6 mb-2 md:mb-0">
              <div className="flex items-center gap-2 text-primary-700">
                <Phone className="w-4 h-4" />
                <span className="font-medium">+880 1234 567890</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-primary-700">
                <Calendar className="w-4 h-4" />
                <span>Mon - Sat: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
            <div className="text-primary-700 font-medium">
              Emergency: 24/7 Available
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary-600 text-white w-12 h-12 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">D</span>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">Dr. Portfolio</div>
              <div className="text-xs text-gray-500">Medical Excellence</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2 rounded-lg font-medium ${
                  isActive(link.href)
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-appointment"
              className="ml-4 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700"
            >
              Book Appointment
            </Link>
            <Link
              href="/login"
              className="ml-2 text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50"
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
              <Link
                href="/book-appointment"
                className="bg-primary-600 text-white px-4 py-3 rounded-lg font-medium text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Appointment
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
