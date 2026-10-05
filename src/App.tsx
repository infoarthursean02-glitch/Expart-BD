/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { WhatIsIncluded } from './components/WhatIsIncluded';
import { EligibilityChecker } from './components/EligibilityChecker';
import { PricingPackage } from './components/PricingPackage';
import { HowItWorks } from './components/HowItWorks';
import { TargetAudience } from './components/TargetAudience';
import { TrustNotice } from './components/TrustNotice';
import { FaqSection } from './components/FaqSection';
import { OrderForm } from './components/OrderForm';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'web' | 'admin'>(() => {
    return window.location.hash === '#admin' ? 'admin' : 'web';
  });

  useEffect(() => {
    // Listen for hash changes (e.g. visiting #admin directly)
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (currentView === 'admin' && window.location.hash !== '#admin') {
        setCurrentView('web');
      }
    };

    // Secret shortcut: Ctrl + Shift + A (or Cmd + Shift + A) to open admin panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.location.hash = 'admin';
        setCurrentView('admin');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentView]);

  const closeAdmin = () => {
    window.location.hash = '';
    setCurrentView('web');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToOrder = () => {
    if (currentView === 'admin') {
      closeAdmin();
    }
    setTimeout(() => {
      const orderElement = document.getElementById('order-form');
      if (orderElement) {
        orderElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // If in dedicated Admin Panel View (accessed via /#admin or secret shortcut)
  if (currentView === 'admin') {
    return <AdminDashboard onBackToWeb={closeAdmin} />;
  }

  // 100% Clean Client-Facing Public Landing Page (Zero Admin buttons/links)
  return (
    <div className="min-h-screen bg-[#0b0714] text-slate-100 selection:bg-orange-500 selection:text-white flex flex-col font-sans">
      {/* Sticky Navigation */}
      <Navbar onOrderClick={scrollToOrder} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOrderClick={scrollToOrder} />

        {/* Section 2: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 3: What's Included */}
        <WhatIsIncluded onOrderClick={scrollToOrder} />

        {/* Interactive Eligibility Self-Audit Tool */}
        <EligibilityChecker onOrderClick={scrollToOrder} />

        {/* Section 4: Special Package */}
        <PricingPackage onOrderClick={scrollToOrder} />

        {/* Section 5: How It Works */}
        <HowItWorks onOrderClick={scrollToOrder} />

        {/* Section 6: Who Is This For? */}
        <TargetAudience />

        {/* Section 7: Trust / Important Notice */}
        <TrustNotice />

        {/* Section 8: FAQ Accordion */}
        <FaqSection />

        {/* Order Form with bKash & Nagad Selection and TrxID automatic verification */}
        <OrderForm />

        {/* Section 9: Final CTA */}
        <FinalCta onOrderClick={scrollToOrder} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
