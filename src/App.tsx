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
import BackgroundMusic from "./components/BackgroundMusic";
import Chatbot from "./components/Chatbot";
import PaymentModal from "./components/PaymentModal";
import PrivacyTermsModal from "./components/PrivacyTermsModal";
import RankUpgradeModal from "./components/RankUpgradeModal";
import AuraOverrideTransition from "./components/AuraOverrideTransition";
import { useAura } from "./contexts/AuraContext";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const { activeCheckout, closeCheckout, isAuraMode, activeTab } = useAura();
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
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />
      
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
