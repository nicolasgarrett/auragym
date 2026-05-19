import { motion, AnimatePresence } from "motion/react";
import { X, Lock, Zap, Shield, Sparkles, ChevronRight, User } from "lucide-react";
import { useAura, MEMBER_RANKS } from "../contexts/AuraContext";

export default function RankUpgradeModal() {
  const { isRankModalOpen, setIsRankModalOpen, currentRank, user, login, activeTab, setActiveTab } = useAura();

  const handleUpgradeClick = () => {
    setIsRankModalOpen(false);
    // If we're not on home tab, switch first
    if (activeTab !== "home") {
      setActiveTab("home");
    }
    setTimeout(() => {
      document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <AnimatePresence>
      {isRankModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsRankModalOpen(false)}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-black border border-white/10 p-6 md:p-10 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] overflow-hidden my-8"
          >
            {/* Glowing top line: rose if Apex, cyan if apprentice/titan */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-[2px] bg-gradient-to-r from-transparent ${currentRank.id === 'apex' ? 'via-rose-500/80' : 'via-cyan-500/80'} to-transparent`} />

            {/* Close Button */}
            <button
              onClick={() => setIsRankModalOpen(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-[140]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-500 text-[9px] font-black uppercase tracking-[0.15em] mb-4">
                <Lock className="w-3 h-3 fill-rose-500/10" />
                <span>Protocolo Restrito</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-black uppercase italic tracking-tighter text-white leading-none">
                RANKS DE <span className={currentRank.id === 'apex' ? 'text-rose-500' : 'text-cyan-400'}>MEMBROS</span>
              </h3>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-2 max-w-sm mx-auto leading-relaxed">
                O Modo Aura é reservado para nossos atletas de elite para otimização visual profunda do ecossistema.
              </p>
            </div>

            {/* Current status display */}
            <div className="bg-white/[0.02] border border-white/5 p-4 rounded-3xl flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <span className="text-[7px] text-slate-500 font-extrabold uppercase tracking-widest block font-mono">SEU STATUS ATUAL</span>
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    {user ? user.displayName || "Atleta" : "Convidado Desconectado"}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[7px] text-slate-500 font-extrabold uppercase tracking-widest block font-mono">RANK</span>
                <span className={`text-xs font-black uppercase tracking-widest ${currentRank.textClass} flex items-center gap-1.5`}>
                  <Shield className="w-3.5 h-3.5 fill-current/10" />
                  {currentRank.name}
                </span>
              </div>
            </div>

            {/* Grid of Ranks */}
            <div className="space-y-4 mb-8">
              {MEMBER_RANKS.map((rank) => {
                const isCurrent = currentRank.id === rank.id;
                const isUnlocked = rank.level >= 2;

                return (
                  <div
                    key={rank.id}
                    className={`relative p-5 rounded-3xl border transition-all duration-300 ${
                      isCurrent
                        ? rank.id === 'apex'
                          ? "bg-rose-950/5 border-rose-500/35"
                          : rank.id === 'titan'
                            ? "bg-cyan-950/5 border-cyan-500/35"
                            : "bg-white/[0.04] border-slate-700/50"
                        : "bg-white/[0.01] border-white/5"
                    }`}
                  >
                    {isCurrent && (
                      <div className={`absolute top-4 right-5 text-[8px] font-black uppercase px-2.5 py-0.5 rounded tracking-widest text-black ${
                        rank.id === 'apex' ? 'bg-rose-500' : 'bg-cyan-500'
                      }`}>
                        Seu Rank
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-2xl border ${rank.borderClass}`}>
                        <Shield className={`w-5 h-5 ${rank.textClass} fill-current/10`} />
                      </div>

                      <div className="flex-grow space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-black uppercase italic ${rank.textClass}`}>
                            {rank.name}
                          </h4>
                          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                            {rank.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                          {rank.description}
                        </p>

                        <div className="pt-1.5 flex flex-wrap gap-2 items-center">
                          <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">
                            Mínimo: {rank.minPlan}
                          </span>
                          
                          {isUnlocked ? (
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1 ${
                              rank.id === 'apex'
                                ? "text-rose-500 bg-rose-500/5 border border-rose-500/10"
                                : "text-[#06B6D4] bg-[#06B6D4]/5 border border-[#06B6D4]/10"
                            }`}>
                              <Zap className="w-2.5 h-2.5 fill-current" />
                              Modo Aura Liberado
                            </span>
                          ) : (
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 bg-white/[0.01] border border-white/5 px-2 py-0.5 rounded flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" />
                              Modo Aura Bloqueado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              {user ? (
                <button
                  onClick={handleUpgradeClick}
                  className={`w-full py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] text-black hover:opacity-95 transition-all flex items-center justify-center gap-2 group cursor-pointer ${
                    currentRank.id === 'apex'
                      ? "bg-gradient-to-r from-rose-400 to-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.2)]"
                      : "bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Elevar meu Rank Agora</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsRankModalOpen(false);
                    login().catch(console.error);
                  }}
                  className="w-full py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] bg-white text-black hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Entrar e se Matricular</span>
                </button>
              )}
              
              <button
                onClick={() => setIsRankModalOpen(false)}
                className="w-full py-4 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-white/10 hover:bg-white/5 transition-colors text-slate-400"
              >
                Voltar ao Treino
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
