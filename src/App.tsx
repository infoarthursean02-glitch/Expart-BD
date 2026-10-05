/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
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
import { LiveChatWidget } from './components/LiveChatWidget';
import { getSettings } from './utils/orderStorage';
import { AdminSettings } from './types';
import { Megaphone } from 'lucide-react';

const isCurrentRouteAdmin = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return (
    path === '/admin' || 
    path === '/admin/' || 
    path.startsWith('/admin/') || 
    hash === '#admin' || 
    hash === '#/admin'
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<'web' | 'admin'>(() => {
    return isCurrentRouteAdmin() ? 'admin' : 'web';
  });

  const [settings, setSettings] = useState<AdminSettings>(getSettings());

  useEffect(() => {
    const handleSettingsChange = () => setSettings(getSettings());
    window.addEventListener('expart_settings_changed', handleSettingsChange);

    // Handle Direct URL changes, Refresh, and Browser History (Back/Forward)
    const handleLocationChange = () => {
      if (isCurrentRouteAdmin()) {
        setCurrentView('admin');
      } else {
        setCurrentView('web');
      }
    };

    // Secret shortcut: Ctrl + Shift + A (or Cmd + Shift + A) to open admin panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.history.pushState(null, '', '/admin');
        setCurrentView('admin');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('expart_settings_changed', handleSettingsChange);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeAdmin = () => {
    window.history.pushState(null, '', '/');
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

  // If in dedicated Admin Panel View (Exact URL: /admin or /admin/login)
  if (currentView === 'admin') {
    return <AdminDashboard onBackToWeb={closeAdmin} />;
  }

  // 100% Clean Client-Facing Public Landing Page (Zero Admin buttons/links)
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white flex flex-col font-sans">
      
      {/* Live Announcement Banner (Manageable from Admin Panel) */}
      {settings.announcementActive && settings.announcementText && (
        <div className="bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2 sticky top-0 z-50 shadow-sm">
          <Megaphone className="w-3.5 h-3.5 shrink-0 animate-bounce" />
          <span>{settings.announcementText}</span>
        </div>
      )}

      {/* Sticky Navigation */}
      <Navbar onOrderClick={scrollToOrder} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOrderClick={scrollToOrder} />

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

      {/* 24/7 Smart Automated Live Chat Widget (Right Side) */}
      <LiveChatWidget />
    </div>
  );
}
