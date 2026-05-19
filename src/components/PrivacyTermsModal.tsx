import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, Lock, Eye, FileText, CheckCircle } from "lucide-react";

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAuraMode: boolean;
}

export default function PrivacyTermsModal({ isOpen, onClose, isAuraMode }: PrivacyTermsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-2xl border p-6 md:p-10 rounded-[36px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85)] max-h-[85vh] overflow-y-auto ${
              isAuraMode
                ? "bg-black border-red-500/20 text-slate-100 shadow-red-500/5"
                : "bg-slate-950 border-white/10 text-slate-200"
            }`}
          >
            {/* Red glow indicator for AuraMode */}
            {isAuraMode && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-red-600 shadow-[0_0_15px_#ff0033] opacity-60" />
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Header */}
            <div className="mb-8 pr-10">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl ${isAuraMode ? "bg-red-500/10 text-red-500" : "bg-accent/10 text-accent"}`}>
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-black uppercase tracking-tight text-white leading-none">
                    Políticas & Termos
                  </h3>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mt-1">
                    Última Atualização: Maio de 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-6 text-xs text-slate-400 leading-relaxed font-normal">
              <p>
                Bem-vindo à <strong className="text-white">AuraGym</strong>. Ao acessar esta plataforma, tornar-se um membro de nossas células de impacto ou registrar dados de biofeedback em nosso sistema, você concorda com nossos Termos de Privacidade e Condições de Uso.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Eye className={`w-4 h-4 ${isAuraMode ? "text-red-500" : "text-accent"}`} />
                  1. Coleta de Dados Biométricos & Telemetria
                </h4>
                <p>
                  Para fins exclusivo de calibragem de aparelhos de biotensão muscular e otimização metabólica personalizada, caso você opte pelo uso do MODO AURA do aplicativo, coletamos dados voluntários tais como: frequência cardíaca máxima estimada, peso sob carga, taxa de repolarização em repouso e histórico de estresse mecânico. Jamais compartilhamos esses dados críticos com seguradoras ou terceiros.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Lock className={`w-4 h-4 ${isAuraMode ? "text-red-500" : "text-accent"}`} />
                  2. Segurança Biológica & Tecnológica
                </h4>
                <p>
                  Sua identidade no ecossistema AuraGym é criptografada fim-a-fim. As credenciais geradas para check-in por aproximação utilizam chaves criptográficas rotativas armazenadas de forma segura. Nossos servidores em Cloud Run garantem segurança integral contra invasões e vazamentos.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <FileText className={`w-4 h-4 ${isAuraMode ? "text-red-500" : "text-accent"}`} />
                  3. Condições de Utilização do Espaço
                </h4>
                <p>
                  O agendamento de aulas de treinamento funcional, modalidades de musculação livre e aulas experimentais (Yoga, Crossfit, Fit Dance, Lutas táticas) exige a confirmação do termo de aptidão física. O usuário declara sob sua responsabilidade não possuir impedimentos médicos que inviabilizem a execução dos movimentos biomecânicos de alta intensidade recomendados por nossos profissionais graduados.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <CheckCircle className={`w-4 h-4 ${isAuraMode ? "text-red-500" : "text-accent"}`} />
                  4. Cancelamento de Planos e Estornos
                </h4>
                <p>
                  Todas as transações realizadas no cartão de crédito, PIX ou boletos são intermediadas pela AuraPay, respeitando estritamente o Código de Defesa do Consumidor. A assinatura pode ser descontinuada a qualquer instante em seu Portal de Membro, suspendendo futuros faturamentos recorrentes imediatos no próximo ciclo.
                </p>
              </div>
            </div>

            {/* Footer Accept CTA */}
            <div className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isAuraMode ? "border-red-500/10" : "border-white/5"
            }`}>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Respeitamos a LGPD Brasileira & GDPR Internacional
              </span>
              <button
                onClick={onClose}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  isAuraMode
                    ? "bg-red-500 text-black hover:bg-red-400"
                    : "bg-white text-black hover:bg-slate-200"
                }`}
              >
                Compreendi e Aceito
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
