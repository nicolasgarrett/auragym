import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, Loader2 } from "lucide-react";
import { signUpWithEmail, loginWithEmail } from "../lib/firebase";
import { useAura } from "../contexts/AuraContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuraMode } = useAura();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
      onClose();
    } catch (err: any) {
      console.error("Auth submission error:", err);
      const errorCode = err.code || "";
      const errorMsg = err.message || "";
      
      let friendlyError = "Ocorreu um erro no sistema. Por favor, tente novamente.";
      
      if (errorCode === "auth/email-already-in-use" || errorMsg.includes("auth/email-already-in-use")) {
        friendlyError = "Este e-mail de atleta já está cadastrado em nossa matilha.";
      } else if (errorCode === "auth/weak-password" || errorMsg.includes("auth/weak-password")) {
        friendlyError = "A senha de acesso deve conter no mínimo 6 caracteres.";
      } else if (errorCode === "auth/invalid-email" || errorMsg.includes("auth/invalid-email")) {
        friendlyError = "O formato do e-mail inserido é inválido. Tente novamente.";
      } else if (
        errorCode === "auth/wrong-password" || 
        errorCode === "auth/user-not-found" || 
        errorCode === "auth/invalid-credential" ||
        errorMsg.includes("wrong-password") ||
        errorMsg.includes("user-not-found") ||
        errorMsg.includes("invalid-credential")
      ) {
        friendlyError = "E-mail ou senha incorretos. Verifique suas credenciais de acesso.";
      } else if (err.message) {
        friendlyError = err.message;
      }
      
      setError(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={`relative w-full max-w-md border p-10 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden ${
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
                {isLogin ? "Bem-vindo de" : "Crie seu"} <br />
                <span className={isAuraMode ? 'text-aura' : 'text-accent'}>{isLogin ? "Volta" : "Legado"}</span>
              </h2>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest opacity-60">
                {isLogin ? "Acesse seu portal de elite" : "Junte-se à nova era da biologia"}
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase font-bold tracking-widest p-4 rounded-2xl mb-8 text-center leading-relaxed"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative group">
                  <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 transition-colors ${isAuraMode ? 'group-focus-within:text-aura' : 'group-focus-within:text-accent'}`} />
                  <input
                    type="text"
                    placeholder="NOME COMPLETO"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold uppercase tracking-widest focus:border-accent outline-none transition-all placeholder:text-slate-700"
                  />
                </div>
              )}

              <div className="relative group">
                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 transition-colors ${isAuraMode ? 'group-focus-within:text-aura' : 'group-focus-within:text-accent'}`} />
                <input
                  type="email"
                  placeholder="SEU E-MAIL"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold uppercase tracking-widest focus:border-accent outline-none transition-all placeholder:text-slate-700"
                />
              </div>

              <div className="relative group">
                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 transition-colors ${isAuraMode ? 'group-focus-within:text-aura' : 'group-focus-within:text-accent'}`} />
                <input
                  type="password"
                  placeholder="SUA SENHA"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold uppercase tracking-widest focus:border-accent outline-none transition-all placeholder:text-slate-700"
                />
              </div>

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
                    <span>{isLogin ? "ENTRAR AGORA" : "FINALIZAR CADASTRO"}</span>
                    <Mail className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-slate-500 hover:text-white text-[10px] uppercase font-black tracking-[0.2em] transition-colors"
              >
                {isLogin ? "Não tem conta? Cadastrar Elite" : "Já tem conta? Entrar no Sistema"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
