/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Modalities from "./components/Modalities";
import Differentials from "./components/Differentials";
import BlogSection from "./components/BlogSection";
import Plans from "./components/Plans";
import StoreSection from "./components/StoreSection";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import AdminDashboard from "./components/AdminDashboard";
import WorkoutSession from "./components/WorkoutSession";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import BackgroundMusic from "./components/BackgroundMusic";
import Chatbot from "./components/Chatbot";
import PaymentModal from "./components/PaymentModal";
import PrivacyTermsModal from "./components/PrivacyTermsModal";
import RankUpgradeModal from "./components/RankUpgradeModal";
import AuraOverrideTransition from "./components/AuraOverrideTransition";
import AttendanceCalendar from "./components/AttendanceCalendar";
import { useAura } from "./contexts/AuraContext";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const { activeCheckout, closeCheckout, isAuraMode, activeTab, isAdmin, user } = useAura();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Always scroll to top when activeTab changes, ensuring true page-like navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [activeTab]);

  return (
    <main className="relative">
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 origin-left z-[55] ${isAuraMode ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.5)]'}`}
        style={{ scaleX }}
      />

      {(user || isAdmin) && <AttendanceCalendar />}
      
      <Navbar />

      {activeTab === "home" && (
        <>
          <Hero />
          <Modalities />
          <Differentials />
          <Testimonials />
          <Plans />
          {isAuraMode && <StoreSection />}
        </>
      )}

      {activeTab === "sobre-nos" && (
        <div className="pt-20">
          <AboutSection />
        </div>
      )}

      {activeTab === "blog" && (
        <div className="pt-20">
          <BlogSection />
        </div>
      )}

      {activeTab === "treino" && (
        <WorkoutSession />
      )}

      {activeTab === "admin" && (
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      )}

      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      <BackgroundMusic />
      <Chatbot />

      <PaymentModal 
        isOpen={!!activeCheckout}
        onClose={closeCheckout}
        planName={activeCheckout?.planName || ""}
        planPrice={activeCheckout?.planPrice || ""}
        initialStep={activeCheckout?.initialStep}
      />

      <PrivacyTermsModal 
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        isAuraMode={isAuraMode}
      />

      <RankUpgradeModal />
      <AuraOverrideTransition />
    </main>
  );
}
