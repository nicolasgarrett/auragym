import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Mail, Save, Loader2, Zap, Shield, Brain, Plus, FileText, Trash2, Upload, Layout, Flame, Trophy, Star, TrendingUp, Award } from "lucide-react";
import { useAura } from "../contexts/AuraContext";
import RestTimer from "./RestTimer";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { profile, updateProfile, isAuraMode, currentRank, setIsRankModalOpen, user, isAdmin } = useAura();
  const [name, setName] = useState("");
  const [auraEnabled, setAuraEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.displayName || "");
      setAuraEnabled(profile.auraModeEnabled || false);
    }
  }, [profile, isOpen]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({ 
        displayName: name, 
        auraModeEnabled: auraEnabled 
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={`relative w-full max-w-md max-h-[90vh] border p-8 md:p-10 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-y-auto custom-scrollbar ${
              isAuraMode ? "bg-black border-aura/20 shadow-aura/5" : "bg-[#020617] border-white/10"
            }`}
          >
            {/* Background Accent */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent ${isAuraMode ? 'via-aura' : 'via-accent'} to-transparent opacity-50`} />

            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-10">
              <h2 className="text-4xl font-display font-black uppercase italic mb-3 tracking-tighter leading-none">
                Seu <span className={isAuraMode ? 'text-aura' : 'text-accent'}>Perfil</span>
              </h2>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest opacity-60">
                Gerencie sua identidade no ecossistema
              </p>
            </div>

            {/* Gamification Dashboard */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-20 transition-transform group-hover:scale-125">
                  <Flame className="w-8 h-8 text-orange-500" />
                </div>
                <div className="relative z-10">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">Workout Streak</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black italic tracking-tighter text-white">🔥 {profile?.streak || 0}</span>
                    <span className="text-[9px] font-bold text-slate-500 mb-1.5">DIAS</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 relative overflow-hidden group text-right">
                <div className="absolute top-0 left-0 p-3 opacity-20 transition-transform group-hover:scale-125">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <div className="relative z-10">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">Nível Global</span>
                  <div className="flex items-end justify-end gap-2">
                    <span className="text-3xl font-black italic tracking-tighter text-white">LVL {profile?.level || 1}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* XP PROGRESS BAR */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 mb-8 relative group overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Progresso de Experiência</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-300">
                  {profile?.xp ? (profile.xp % 1000) : 0} / 1000 XP
                </span>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(profile?.xp ? (profile.xp % 1000) : 0) / 10}%` }}
                  className={`h-full ${isAuraMode ? 'bg-aura shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-accent shadow-[0_0_10px_rgba(6,182,212,0.5)]'} rounded-full`}
                />
              </div>
              <p className="mt-3 text-[8px] text-zinc-500 font-bold uppercase tracking-widest text-center">
                Ganhe mais <span className="text-white">XP</span> finalizando seus treinos diários e batendo metas.
              </p>
            </div>

            {/* BADGES / ACHIEVEMENTS */}
            {profile?.badges && profile.badges.length > 0 && (
              <div className="mb-8 p-6 bg-white/[0.01] border border-white/5 rounded-3xl">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5" /> Conquistas Desbloqueadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.badges.map((badge: string, i: number) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${isAuraMode ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-accent/10 border-accent/20 text-accent'}`}
                    >
                      <Trophy className="w-3 h-3" />
                      <span className="text-[9px] font-black uppercase tracking-widest">{badge}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* REST TIMER INTEGRATION */}
            <div className="mb-8">
              <RestTimer />
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 pl-2">Display Name</label>
                <div className="relative group">
                  <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 transition-colors ${isAuraMode ? 'group-focus-within:text-aura' : 'group-focus-within:text-accent'}`} />
                  <input
                    type="text"
                    placeholder="NOME"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold uppercase tracking-widest focus:border-accent outline-none transition-all placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2 opacity-50 cursor-not-allowed">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 pl-2">E-mail (Permanente)</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <input
                    type="email"
                    disabled
                    value={profile?.email || ""}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold uppercase tracking-widest outline-none"
                  />
                </div>
              </div>

              <div className={`p-6 rounded-3xl border transition-all duration-500 ${isAuraMode ? 'bg-aura/5 border-aura/20' : 'bg-white/[0.03] border-white/10'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className={`w-5 h-5 ${auraEnabled && currentRank.level >= 2 ? 'text-aura fill-aura' : 'text-slate-600'}`} />
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Protocolo Aura</h4>
                      <p className="text-[8px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">Ativar estética avançada por padrão</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (currentRank.level < 2) {
                        setIsRankModalOpen(true);
                      } else {
                        setAuraEnabled(!auraEnabled);
                      }
                    }}
                    className={`w-12 h-6 rounded-full transition-all relative ${auraEnabled && currentRank.level >= 2 ? 'bg-aura' : 'bg-slate-800'}`}
                  >
                    <motion.div
                      animate={{ x: auraEnabled && currentRank.level >= 2 ? 24 : 4 }}
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/[0.03] p-4 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/[0.05] transition-colors" onClick={() => setIsRankModalOpen(true)}>
                <Shield className={`w-4.5 h-4.5 ${isAuraMode ? 'text-aura' : 'text-accent'}`} />
                <div className="flex-grow">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block">Nível de Acesso & Rank</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${currentRank.textClass}`}>
                    {currentRank.name} ({profile?.plan || "Silver"} Member)
                  </span>
                </div>
                <div className="text-[8px] font-black uppercase tracking-widest text-[#06B6D4] border border-[#06B6D4]/20 bg-[#06B6D4]/5 px-2 py-1 rounded">
                  Ver Ranks
                </div>
              </div>

              {/* ADMIN SUPREME BIO-OVERRIDE */}
              {isAdmin && (
                <div className="border border-red-500/25 bg-red-950/5 rounded-3xl p-5 space-y-4 shadow-[0_0_20px_rgba(255,42,0,0.05)]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-red-500 font-mono">
                      PAINEL BIO-ADMINISTRATIVO 🐺: CONECTADO
                    </span>
                  </div>
                  
                  <p className="text-[8.5px] uppercase tracking-wider text-slate-400 font-bold font-mono leading-relaxed">
                    Você possui privilégios de OVERRIDE total da Matilha AuraGym. Modifique os canais biométricos globais abaixo:
                  </p>

                  <div className="space-y-3.5 pt-1">
                    {/* Simulated pulse tracking */}
                    <div className="flex items-center justify-between text-xs bg-black/40 p-3 rounded-xl border border-red-500/5">
                      <div>
                        <span className="text-[7.5px] font-semibold text-slate-500 uppercase block tracking-widest leading-none">OVERCLOCK METABÓLICO</span>
                        <span className="text-[9.5px] font-black text-red-400 uppercase tracking-widest font-mono">148 BPM // SISTEMA SUPREMADO</span>
                      </div>
                      <div className="w-24 h-5 bg-red-950/20 border border-red-500/20 rounded-lg overflow-hidden relative flex items-center justify-center font-mono text-[8px] font-black text-red-500">
                        <div className="absolute top-0 left-0 h-full bg-red-500/10 w-4/5 animate-pulse" />
                        OVERCLOCK ON
                      </div>
                    </div>

                    {/* Security access clearance flag */}
                    <div className="flex items-center justify-between text-xs bg-black/40 p-3 rounded-xl border border-red-500/5">
                      <div>
                        <span className="text-[7.5px] font-semibold text-slate-500 uppercase block tracking-widest leading-none">AUTORIZAÇÃO DE PROTOCOLO</span>
                        <span className="text-[9.5px] font-black text-red-400 uppercase tracking-widest font-mono">APEX SOBERANO MASTER</span>
                      </div>
                      <span className="text-[7.5px] font-black tracking-widest text-black bg-red-500 px-2 py-1 rounded">
                        MAX BYPASS
                      </span>
                    </div>

                    {/* Session rollback reset button */}
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('auragym_admin_force');
                        window.location.reload();
                      }}
                      className="w-full py-2.5 rounded-xl border border-red-500/30 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-black font-mono text-[8.5px] font-black uppercase tracking-[0.2em] transition-all text-center"
                    >
                      REVOGAR ADMIN (SESSÃO PADRÃO)
                    </button>
                  </div>
                </div>
              )}

              <button
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-lg shadow-black/20 group ${
                  isAuraMode 
                  ? "bg-aura text-black hover:bg-aura-dark" 
                  : "bg-accent text-white hover:bg-accent-dark"
                }`}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <span>{success ? "PERFIL ATUALIZADO" : "SALVAR ALTERAÇÕES"}</span>
                    <Save className="w-4 h-4 opacity-50 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
