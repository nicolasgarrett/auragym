import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dumbbell, Menu, X, Zap, LogOut, User as UserIcon, Search, Shield } from "lucide-react";
import { useAura } from "../contexts/AuraContext";
import AuthModal from "./AuthModal";
import ProfileModal from "./ProfileModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { isAuraMode, setIsAuraMode, user, handleLogout, activeTab, setActiveTab, currentRank } = useAura();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Modalidades", href: "#modalidades" },
    { name: "Diferenciais", href: "#diferenciais" },
    { name: "Planos", href: "#planos" },
  ];

  // Redirect if in unauthorized tab during Aura Mode
  useEffect(() => {
    if (isAuraMode && (activeTab === "sobre-nos" || activeTab === "blog")) {
      setActiveTab("home");
    }
  }, [isAuraMode, activeTab, setActiveTab]);

  const handleNavLinkClick = (name: string, href: string) => {
    setIsMenuOpen(false);
    if (name === "Home") {
      setActiveTab("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name === "Sobre Nós") {
      setActiveTab("sobre-nos");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name === "Blog") {
      setActiveTab("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveTab("home");
      const targetId = href.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const isLinkActive = (name: string) => {
    if (name === "Home") return activeTab === "home";
    if (name === "Sobre Nós") return activeTab === "sobre-nos";
    if (name === "Blog") return activeTab === "blog";
    return false;
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? "bg-black/60 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          onClick={() => handleNavLinkClick("Home", "#home")}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className={`p-2 rounded-xl transition-colors duration-500 ${isAuraMode ? 'bg-aura/10' : 'bg-accent/10'}`}>
            <Dumbbell className={`w-7 h-7 transition-colors duration-500 ${isAuraMode ? 'text-aura' : 'text-accent'}`} />
          </div>
          <span className="font-display text-2xl font-black tracking-tighter uppercase italic leading-none">
            Aura<span className={isAuraMode ? 'text-aura' : 'text-accent'}>Gym</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link.name);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(link.name, link.href);
                  }}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:opacity-100 px-3 py-1.5 rounded-lg border ${
                    active 
                      ? `${isAuraMode ? 'text-aura opacity-100 bg-white/5 border-white/10' : 'text-accent opacity-100 bg-white/5 border-white/10'}` 
                      : 'opacity-60 hover:text-white border-transparent'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="h-4 w-px bg-white/10 mx-2" />
          
          <button
            onClick={() => setIsAuraMode(!isAuraMode)}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full border transition-all duration-700 group relative overflow-hidden ${
              isAuraMode 
                ? "bg-aura text-black border-aura shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95" 
                : "border-white/10 hover:border-accent/40 text-white hover:bg-accent/5"
            }`}
          >
            <Zap className={`w-3.5 h-3.5 transition-all ${isAuraMode ? "fill-black scale-110" : "fill-transparent group-hover:text-accent"}`} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isAuraMode ? 'Protocolo Aura' : 'Modo Aura'}</span>
          </button>

          {user ? (
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-3 bg-white/[0.03] px-4 py-2 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group"
              >
                <UserIcon className={`w-3.5 h-3.5 transition-colors ${isAuraMode ? 'text-aura' : 'text-accent'}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300 group-hover:text-white transition-colors">{user.displayName?.split(' ')[0]}</span>
                <span className={`px-2 py-0.5 rounded border ${currentRank.borderClass} ${currentRank.textClass} text-[7px] font-black uppercase tracking-widest flex items-center gap-1 shadow-[0_0_15px_rgba(0,0,0,0.4)]`}>
                  <Shield className="w-2 h-2 fill-current/10" />
                  {currentRank.name}
                </span>
              </button>
              <button 
                onClick={handleLogout}
                className="text-slate-600 hover:text-white transition-all hover:scale-110 active:scale-90"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className={`px-8 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 shadow-xl ${
                isAuraMode 
                  ? 'bg-white text-black hover:bg-slate-200' 
                  : 'bg-accent text-white hover:bg-accent-dark shadow-accent/10'
              }`}
            >
              Matricule-se
            </button>
          )}
        </div>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-4 md:hidden overflow-hidden"
          >
            {/* Mobile Search */}
            <div className="relative mb-2">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isAuraMode ? 'text-aura' : 'text-accent'}`} />
              <input 
                type="text" 
                placeholder="Buscar aulas ou informações" 
                className={`w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-slate-600 ${isAuraMode ? 'focus:border-aura' : 'focus:border-accent'}`}
              />
            </div>

            {navLinks.map((link) => {
              const active = isLinkActive(link.name);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(link.name, link.href);
                  }}
                  className={`text-lg font-medium transition-colors ${
                    active 
                      ? `${isAuraMode ? 'text-aura font-black' : 'text-accent font-black'}` 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            {user && (
              <button 
                onClick={() => {
                  setIsProfileModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 bg-white/5 text-white py-3 rounded-xl font-bold uppercase text-xs border border-white/10"
              >
                <UserIcon className="w-4 h-4" />
                Perfil: {user.displayName}
              </button>
            )}

            <button 
              onClick={() => {
                setIsAuraMode(!isAuraMode);
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-aura text-black py-3 rounded-xl font-bold uppercase text-xs"
            >
              <Zap className="w-4 h-4 fill-black" />
              Modo Aura: {isAuraMode ? 'ON' : 'OFF'}
            </button>
            <button 
              onClick={() => {
                user ? handleLogout() : setIsAuthModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="bg-accent text-white w-full py-4 rounded-xl font-bold uppercase text-xs"
            >
              {user ? 'Sair' : 'Matricule-se'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
