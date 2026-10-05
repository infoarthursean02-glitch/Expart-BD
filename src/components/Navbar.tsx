import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'হোম', href: '#hero' },
    { name: 'কেন এক্সপার্ট বিডি', href: '#why-us' },
    { name: 'সার্ভিসসমূহ', href: '#whats-included' },
    { name: 'প্যাকেজ', href: '#package' },
    { name: 'যেভাবে কাজ করে', href: '#how-it-works' },
    { name: 'ক্রিয়েটরদের জন্য', href: '#creators' },
    { name: 'প্রশ্ন-উত্তর', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f081c]/95 backdrop-blur-md border-b border-orange-500/20 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Expart BD */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-600/35 group-hover:scale-105 transition-transform">
              <span className="font-black text-xl tracking-tight">E</span>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                Expart <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">BD</span>
              </span>
              <span className="block text-[10px] text-orange-300 font-semibold tracking-wider">
                ফেসবুক মনিটাইজেশন সার্ভিস
              </span>
            </div>
          </a>

          {/* Desktop Nav Links in Bangla */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-orange-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-rose-500 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Button: Order Now */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOrderClick}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-extrabold rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-md shadow-orange-600/30 hover:shadow-orange-600/50 transition-all cursor-pointer active:scale-95"
            >
              <span>অর্ডার করুন (৳২,৯৯৯)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOrderClick}
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-orange-600 text-white"
            >
              অর্ডার করুন
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-orange-500/20 bg-[#160d24] rounded-2xl px-4 shadow-xl">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-300 hover:text-orange-400 text-sm font-semibold py-1.5 px-2 rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOrderClick();
                  }}
                  className="w-full py-2.5 px-4 text-center text-xs font-bold rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md"
                >
                  এখনই অর্ডার করুন (৳২,৯৯৯)
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
