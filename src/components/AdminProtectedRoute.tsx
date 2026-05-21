import React, { useState } from "react";
import { useAura } from "../contexts/AuraContext";
import { ShieldAlert, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { isAdmin, user } = useAura();
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a server-side check. 
    // Here we use a symbolic password for the demo as requested.
    if (password === "Aura2026") {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("Senha de acesso mestre incorreta.");
      setPassword("");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-zinc-900/50 border border-red-500/20 rounded-[2.5rem] p-10 text-center backdrop-blur-xl"
        >
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-4">Acesso Negado</h1>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest leading-relaxed mb-8">
            Esta área é restrita a administradores master. Seu acesso foi registrado e bloqueado.
          </p>
          <div className="text-[10px] font-mono text-zinc-700 bg-black/40 p-4 rounded-xl">
            UID: {user?.uid || "ANONYMOUS_VOID"}
            <br />
            IP_LOG: ENCRYPTED_AURA_GATE
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl"
        >
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">Autenticação Mestre</h1>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Insira a chave de acesso Alpha</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-black/50 border ${error ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 px-6 text-center text-xl tracking-[0.5em] focus:border-accent outline-none transition-all`}
                autoFocus
              />
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-[9px] font-black uppercase tracking-widest text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              className="w-full py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-accent transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Validar Acesso <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Conexão Segura AES-256</span>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
