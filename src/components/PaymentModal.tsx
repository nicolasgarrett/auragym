import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ShieldCheck, 
  AlertCircle, 
  CreditCard, 
  Loader2, 
  Calendar, 
  Clock, 
  Check, 
  Copy, 
  ArrowRight, 
  QrCode, 
  FileText, 
  Sparkles, 
  Smartphone,
  ChevronRight,
  Dumbbell
} from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { useAura } from "../contexts/AuraContext";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  initialStep?: StepType;
}

type StepType = 
  | "intro" 
  | "trial_form" 
  | "trial_success" 
  | "pay_methods" 
  | "pay_cc" 
  | "pay_pix" 
  | "pay_boleto" 
  | "pay_success";

export default function PaymentModal({ isOpen, onClose, planName, planPrice, initialStep = "intro" }: PaymentModalProps) {
  const [step, setStep] = useState<StepType>(initialStep);
  const [loading, setLoading] = useState(false);
  const { isAuraMode, updateProfile } = useAura();

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
    }
  }, [isOpen, initialStep]);

  // Selected payment states
  const [selectedMethod, setSelectedMethod] = useState<"cc" | "pix" | "boleto" | null>(null);

  // Form states
  const [ccNumber, setCcNumber] = useState("");
  const [ccExpiry, setCcExpiry] = useState("");
  const [ccCvv, setCcCvv] = useState("");
  const [ccName, setCcName] = useState("");
  
  // Trial scheduling states
  const [trialDate, setTrialDate] = useState("");
  const [trialTime, setTrialTime] = useState("");
  const [trialModality, setTrialModality] = useState("");

  const [pixCopied, setPixCopied] = useState(false);
  const [boletoCopied, setBoletoCopied] = useState(false);

  // Auto-generate some close future dates for trial
  const getNextDays = () => {
    const dates = [];
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
    for (let i = 1; i <= 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        raw: d.toISOString().split('T')[0],
        dayName: daysOfWeek[d.getDay()],
        dayNum: d.getDate(),
        month: months[d.getMonth()]
      });
    }
    return dates;
  };

  const nextDays = getNextDays();

  const handleClose = () => {
    setStep("intro");
    setSelectedMethod(null);
    setCcNumber("");
    setCcExpiry("");
    setCcCvv("");
    setCcName("");
    setTrialDate("");
    setTrialTime("");
    setTrialModality("");
    onClose();
  };

  const handleBookTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialDate || !trialTime || !trialModality) {
      alert("Por favor, selecione a modalidade, dia e horário.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("trial_success");
    }, 1500);
  };

  const handleProcessPayment = async () => {
    setLoading(true);
    try {
      if (updateProfile) {
        await updateProfile({ plan: planName });
      }
    } catch (e) {
      console.error("Failed to upgrade rank:", e);
    }
    setLoading(false);
    setStep("pay_success");
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020101021126580014br.gov.bcb.pix0136auragym-invoice-subscription-activation-key5204000053039865406159.005802BR5915AuraGym%20Acqua6009Sao%20Paulo62070503***6304CA3F");
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handleCopyBoleto = () => {
    navigator.clipboard.writeText("34191.79001 01043.513184 91020.150008 7 973200000" + planPrice + "00");
    setBoletoCopied(true);
    setTimeout(() => setBoletoCopied(false), 2000);
  };

  // Safe CDN mock keys & qr codes
  const mockPixKey = "auragym-pix-chave-chave-ativa-link-seguro-recorrente";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className={`relative w-full max-w-xl border p-6 md:p-10 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)] transition-all duration-500 overflow-hidden my-8 ${
              isAuraMode 
                ? "bg-black border-aura/20 shadow-aura/5" 
                : "bg-[#040815] border-white/10 shadow-black/80"
            }`}
          >
            {/* Visual Header Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-72 h-1 bg-gradient-to-r from-transparent ${isAuraMode ? 'via-aura' : 'via-accent'} to-transparent opacity-60`} />

            <button onClick={handleClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-[120]">
              <X className="w-5 h-5" />
            </button>

            {/* Step 1: INTRO (Warn / Choose direct vs trial) */}
            {step === "intro" && (
              <div className="text-center">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 ${isAuraMode ? 'bg-aura/10 text-aura border border-aura/10' : 'bg-accent/10 text-accent border border-accent/10'}`}>
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter mb-4 text-white">
                  Seu Legado <span className={isAuraMode ? 'text-aura glow-accent' : 'text-accent glow-accent'}>Inicia Agora</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-md mx-auto">
                  Você escolheu o plano <span className="text-white font-black">{planName}</span> (R$ {planPrice}/mês). 
                  Damos as boas-vindas à elite. Gostaríamos de propor algo extraordinário. Quer fazer uma aula antes de assinar?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option Grid A: Free Trial */}
                  <button
                    onClick={() => setStep("trial_form")}
                    className={`flex flex-col items-center justify-center text-center p-6 rounded-[28px] border transition-all duration-300 relative group overflow-hidden ${
                      isAuraMode 
                        ? 'bg-aura/5 border-aura/10 hover:border-aura/40 hover:bg-aura/[0.08]' 
                        : 'bg-white/[0.02] border-white/15 hover:border-accent/40 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl mb-4 ${isAuraMode ? 'bg-aura/10 text-aura' : 'bg-accent/10 text-accent'}`}>
                      <Calendar className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-white mb-2 leading-none flex items-center gap-1.5">
                      Aula Experimental <span className="text-[8px] bg-emerald-500 text-black px-1.5 py-0.5 rounded font-black">Grátis</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                      Marcar dia & horário para sentir a energia antes do pagamento
                    </span>
                  </button>

                  {/* Option Grid B: Membership Direct */}
                  <button
                    onClick={() => setStep("pay_methods")}
                    className={`flex flex-col items-center justify-center text-center p-6 rounded-[28px] border transition-all duration-300 relative group overflow-hidden ${
                      isAuraMode 
                        ? 'bg-white/5 border-white/10 hover:border-aura/40 hover:bg-white/[0.08]' 
                        : 'bg-accent/5 border-accent/20 hover:border-accent/50 hover:bg-accent/[0.08]'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl mb-4 ${isAuraMode ? 'bg-white/10 text-white' : 'bg-accent/10 text-accent'}`}>
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-white mb-2 leading-none">
                      Matrícula Direta
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                      Acesso imediato à academia, ao app e aos nossos treinos exclusivos
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: TRIAL CALENDAR FORM */}
            {step === "trial_form" && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-black uppercase italic mb-2 tracking-tight">
                    Agende sua <span className={isAuraMode ? 'text-aura' : 'text-accent'}>Experiência</span>
                  </h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Escolha uma modalidade e confirme sua presença gratuita
                  </p>
                </div>

                <form onSubmit={handleBookTrial} className="space-y-6">
                  {/* Select Modality */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                      1. Escolha a atividade
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Musculação", "Treino Híbrido", "Recovery Crítico"].map((mod) => (
                        <button
                          key={mod}
                          type="button"
                          onClick={() => setTrialModality(mod)}
                          className={`py-3.5 rounded-2xl text-[10px] font-extrabold uppercase tracking-wide border transition-all ${
                            trialModality === mod
                              ? isAuraMode
                                ? "bg-aura text-black border-aura"
                                : "bg-accent text-white border-accent"
                              : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
                          }`}
                        >
                          {mod}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Date */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                      2. Escolha o dia
                    </label>
                    <div className="grid grid-cols-4 gap-2.5">
                      {nextDays.map((d) => (
                        <button
                          key={d.raw}
                          type="button"
                          onClick={() => setTrialDate(d.raw)}
                          className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                            trialDate === d.raw
                              ? isAuraMode
                                ? "bg-aura border-aura text-black"
                                : "bg-accent border-accent text-white"
                              : "bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className={`text-[9px] uppercase font-black tracking-widest ${trialDate === d.raw ? 'opacity-80' : 'text-slate-500'}`}>{d.dayName}</span>
                          <span className="text-lg font-black leading-none my-1">{d.dayNum}</span>
                          <span className={`text-[8px] uppercase font-extrabold tracking-widest ${trialDate === d.raw ? 'opacity-80' : 'text-slate-500'}`}>{d.month}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Hour */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                      3. Escolha o horário de entrada
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["07:00", "12:00", "19:00"].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setTrialTime(time)}
                          className={`py-3.5 rounded-2xl text-[10px] font-extrabold uppercase tracking-wide border flex items-center justify-center gap-2 transition-all ${
                            trialTime === time
                              ? isAuraMode
                                ? "bg-aura text-black border-aura"
                                : "bg-accent text-white border-accent"
                              : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 opacity-60" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setStep("intro")}
                      className="px-6 py-4 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-white/10 hover:bg-white/5 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-grow py-4 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] flex items-center justify-center gap-2.5 transition-all ${
                        isAuraMode 
                          ? 'bg-aura text-black hover:bg-aura-dark shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                          : 'bg-accent text-white hover:bg-accent-dark shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                      }`}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>Agendar Hora</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: TRIAL CALENDAR SUCCESS */}
            {step === "trial_success" && (
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isAuraMode ? 'bg-aura/10 text-aura border border-aura/20' : 'bg-green-500/10 text-green-400 border border-green-500/15'}`}>
                  <Check className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="text-3xl font-display font-black uppercase italic mb-2 tracking-tight text-white animate-pulse">
                  Presença <span className={isAuraMode ? 'text-aura' : 'text-emerald-400'}>Confirmada!</span>
                </h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest max-w-sm mx-auto mb-8">
                  Sua credencial de convidado foi emitida com sucesso.
                </p>

                {/* Reservation Summary */}
                <div className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl max-w-md mx-auto mb-10 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Atividade</span>
                    <span className="text-xs font-black uppercase text-white tracking-wide">{trialModality}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Data Agendada</span>
                    <span className="text-xs font-black uppercase text-white tracking-wide">{trialDate.split('-').reverse().join('/')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Check-in e Entrada</span>
                    <span className="text-xs font-black uppercase text-white tracking-wide">A partir das {trialTime}</span>
                  </div>
                </div>

                <p className="text-slate-400 text-[11px] font-light max-w-sm mx-auto mb-10 leading-relaxed">
                  Para pular a burocracia na recepção e já garantir sua ativação de plano corporativo ou de elite logo após, você pode adiantar seus dados de pagamento no sistema agora mesmo. Quer aproveitar?
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 py-4 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-white/10 hover:bg-white/5 transition-all text-slate-300"
                  >
                    Somente Ir à Aula
                  </button>
                  <button
                    onClick={() => setStep("pay_methods")}
                    className={`flex-1 py-4 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                      isAuraMode ? 'bg-aura text-black hover:bg-aura-dark' : 'bg-accent text-white hover:bg-accent-dark'
                    }`}
                  >
                    <span>Fazer Matrícula</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: CHOOSE PAYMENT METHODS */}
            {step === "pay_methods" && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-black uppercase italic mb-2 tracking-tight">
                    Escolha o <span className={isAuraMode ? 'text-aura' : 'text-accent'}>Método</span>
                  </h3>
                  <p className="text-slate-505 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    O faturamento será gerado na ativação oficial da sua conta
                  </p>
                </div>

                {/* Overview Billing Card */}
                <div className="flex justify-between items-center bg-white/[0.03] border border-white/5 p-5 rounded-3xl mb-8">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-505 text-slate-500 block">PLANO SELECIONADO</span>
                    <span className="text-sm font-black uppercase text-white tracking-wider">{planName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-505 text-slate-500 block">MENSALIDADE</span>
                    <span className={`text-base font-black tracking-wider ${isAuraMode ? 'text-aura' : 'text-accent'}`}>R$ {planPrice}/mês</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {/* Option 1: CC */}
                  <button
                    onClick={() => {
                      setSelectedMethod("cc");
                      setStep("pay_cc");
                    }}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all hover:bg-white/[0.03] ${
                      isAuraMode ? 'border-white/10 hover:border-aura/35' : 'border-white/10 hover:border-accent/35'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${isAuraMode ? 'bg-aura/10 text-aura' : 'bg-accent/10 text-accent'}`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Cartão de Crédito</h4>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">Faturamento mensal automático • Ativação imediata</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>

                  {/* Option 2: PIX */}
                  <button
                    onClick={() => {
                      setSelectedMethod("pix");
                      setStep("pay_pix");
                    }}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all hover:bg-white/[0.03] ${
                      isAuraMode ? 'border-white/10 hover:border-aura/35' : 'border-white/10 hover:border-accent/35'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${isAuraMode ? 'bg-aura/10 text-aura' : 'bg-accent/10 text-accent'}`}>
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white">PIX / Chave Cópia e Cola</h4>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">Liberação instantânea • Desconto exclusivo</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>

                  {/* Option 3: Boleto */}
                  <button
                    onClick={() => {
                      setSelectedMethod("boleto");
                      setStep("pay_boleto");
                    }}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all hover:bg-white/[0.03] ${
                      isAuraMode ? 'border-white/10 hover:border-aura/35' : 'border-white/10 hover:border-accent/35'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${isAuraMode ? 'bg-aura/10 text-aura' : 'bg-accent/10 text-accent'}`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Boleto Bancário</h4>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">Compensação em até 48h • Vencimento ágil</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                <div className="flex gap-4 border-t border-white/5 pt-4">
                  <button
                    onClick={() => setStep("intro")}
                    className="px-6 py-4 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: CREDIT CARD PAYMENT */}
            {step === "pay_cc" && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-black uppercase italic mb-2 tracking-tight">
                    Cartão de <span className={isAuraMode ? 'text-aura' : 'text-accent'}>Crédito</span>
                  </h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Preencha os dados de validação segura do cartão
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {/* Visual Premium Mock Card */}
                  <div className={`p-6 rounded-3xl border flex flex-col justify-between h-44 relative overflow-hidden shadow-xl ${
                    isAuraMode 
                      ? "bg-linear-to-br from-[#0a1515] via-black to-[#050b0b] border-aura/15" 
                      : "bg-linear-to-br from-[#101726] via-[#040815] to-[#0d1321] border-white/10"
                  }`}>
                    <div className="flex justify-between items-start">
                      <Dumbbell className={`w-8 h-8 ${isAuraMode ? "text-aura" : "text-accent"}`} />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40">Membro Elite</span>
                    </div>

                    <div className="space-y-1">
                      <div className="font-mono text-base md:text-lg tracking-[0.22em] text-white">
                        {ccNumber ? ccNumber.replace(/(\d{4})/g, '$1 ').trim() : "•••• •••• •••• ••••"}
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="max-w-[190px]">
                          <span className="text-[6px] text-slate-500 block uppercase font-black tracking-widest">Titular</span>
                          <span className="font-bold uppercase tracking-wide text-[10px] truncate block text-slate-100">
                            {ccName || "SEU NOME COMPLETO"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[6px] text-slate-500 block uppercase font-black tracking-widest">Validade</span>
                          <span className="font-mono font-bold text-[10px] text-center text-slate-205 text-white">
                            {ccExpiry || "MM/AA"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form inputs */}
                  <div className="space-y-3">
                    <div className="relative group">
                      <input 
                        type="text" 
                        placeholder="NOME IGUAL NO CARTÃO" 
                        value={ccName}
                        onChange={(e) => setCcName(e.target.value.toUpperCase())}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-bold uppercase tracking-widest focus:border-accent outline-none transition-all placeholder:text-slate-700" 
                      />
                    </div>

                    <div className="relative group">
                      <input 
                        type="text" 
                        placeholder="NÚMERO DO CARTÃO" 
                        value={ccNumber}
                        maxLength={16}
                        onChange={(e) => setCcNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-bold uppercase tracking-widest focus:border-accent outline-none transition-all placeholder:text-slate-700" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="MM/AA" 
                        maxLength={5}
                        value={ccExpiry}
                        onChange={(e) => {
                          let v = e.target.value;
                          if (v.length === 2 && !v.includes('/')) {
                            v += '/';
                          }
                          setCcExpiry(v);
                        }}
                        className="bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-bold uppercase tracking-widest focus:border-accent outline-none transition-all placeholder:text-slate-700" 
                      />
                      <input 
                        type="text" 
                        placeholder="CVV" 
                        maxLength={4}
                        value={ccCvv}
                        onChange={(e) => setCcCvv(e.target.value.replace(/\D/g, ''))}
                        className="bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-bold uppercase tracking-widest focus:border-accent outline-none transition-all placeholder:text-slate-700" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => setStep("pay_methods")}
                    className="px-6 py-4 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleProcessPayment}
                    disabled={loading || !ccName || !ccNumber || !ccExpiry || !ccCvv}
                    className={`flex-grow py-4 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] flex items-center justify-center gap-2.5 transition-all ${
                      isAuraMode 
                        ? 'bg-aura text-black hover:bg-aura-dark shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-40 disabled:cursor-not-allowed' 
                        : 'bg-accent text-white hover:bg-accent-dark shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-40 disabled:cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirmar Assinatura</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: PIX PAYMENT */}
            {step === "pay_pix" && (
              <div className="text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-black uppercase italic mb-2 tracking-tight">
                    Pagamento via <span className={isAuraMode ? 'text-aura' : 'text-accent'}>PIX</span>
                  </h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Ative seu plano imediatamente via QR Code do Banco Central
                  </p>
                </div>

                {/* Simulated QR Code Visual */}
                <div className={`p-6 rounded-[32px] border max-w-xs mx-auto mb-6 flex flex-col items-center justify-center ${
                  isAuraMode ? "bg-[#020508] border-aura/20 shadow-[0_0_30px_rgba(6,182,212,0.05)]" : "bg-white/[0.01] border-white/10"
                }`}>
                  <div className="bg-white p-4 rounded-2xl shadow-inner mb-4">
                    {/* Generative design mock qr vector */}
                    <div className="w-40 h-40 bg-slate-100 flex items-center justify-center relative">
                      <QrCode className="w-36 h-36 text-slate-900" />
                      <div className="absolute w-8 h-8 bg-white flex items-center justify-center rounded-lg shadow-md border border-slate-200">
                        <Dumbbell className="w-5 h-5 text-slate-900" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 block" />
                    AGUARDANDO COMPENSAÇÃO DE REDE...
                  </span>
                </div>

                {/* Copy paste button block */}
                <div className="space-y-4 max-w-md mx-auto mb-8">
                  <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
                    <div className="text-left overflow-hidden">
                      <span className="text-[7px] text-slate-500 font-black uppercase tracking-wider block mb-0.5">CHAVE PIX RECORTADA</span>
                      <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest block truncate">
                        {mockPixKey}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyPix}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                        pixCopied 
                          ? 'bg-emerald-500 text-black' 
                          : isAuraMode ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-accent/15 text-accent hover:bg-accent/25'
                      }`}
                    >
                      {pixCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar PIX</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => setStep("pay_methods")}
                    className="px-6 py-4 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleProcessPayment}
                    className={`flex-grow py-4 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                      isAuraMode ? 'bg-aura text-black hover:bg-aura-dark' : 'bg-accent text-white hover:bg-accent-dark'
                    }`}
                  >
                    <span>Já Efetuei o Pagamento</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: BOLETO PAYMENT */}
            {step === "pay_boleto" && (
              <div className="text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-black uppercase italic mb-2 tracking-tight">
                    Boleto <span className={isAuraMode ? 'text-aura' : 'text-accent'}>Bancário</span>
                  </h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Copie a linha digitável ou baixe o PDF para quitação
                  </p>
                </div>

                <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/5 max-w-md mx-auto mb-8 text-left space-y-4">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <div className="p-3 bg-white/5 rounded-2xl text-slate-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-500 font-black uppercase tracking-widest block">BANCO EMISSOR</span>
                      <span className="text-xs font-black uppercase text-white tracking-widest">AuraPay Intermediação S.A.</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[7px] text-slate-500 font-black uppercase tracking-widest block mb-1">Linha Digitável</span>
                    <div className="flex items-center justify-between gap-4 bg-black/50 p-3.5 rounded-xl border border-white/5">
                      <span className="text-[10px] font-mono font-bold text-slate-300 block truncate">
                        34191.79001 01043.513184 91020.150008 7 973200000{planPrice}00
                      </span>
                      <button
                        onClick={handleCopyBoleto}
                        className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest ${
                          boletoCopied ? 'bg-emerald-500 text-black' : 'bg-white/10 text-slate-300 hover:bg-white/15'
                        }`}
                      >
                        {boletoCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider pt-2">
                    <span className="text-slate-505 text-slate-500">Valor Total</span>
                    <span className="text-white">R$ {planPrice},00</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => setStep("pay_methods")}
                    className="px-6 py-4 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleProcessPayment}
                    className={`flex-grow py-4 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                      isAuraMode ? 'bg-aura text-black hover:bg-aura-dark' : 'bg-accent text-white hover:bg-accent-dark'
                    }`}
                  >
                    <span>Finalizar Inscrição</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 8: PAYMENT SUCCESS */}
            {step === "pay_success" && (
              <div className="text-center">
                {/* Glowing Aura / Accent ring */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 ${
                  isAuraMode 
                    ? "bg-aura/10 text-aura border border-aura/35 shadow-[0_0_50px_rgba(6,182,212,0.4)]" 
                    : "bg-accent/10 text-accent border border-accent/35 shadow-[0_0_50px_rgba(99,102,241,0.4)]"
                }`}>
                  <ShieldCheck className="w-10 h-10 animate-pulse" />
                </div>

                <h3 className="text-3xl font-display font-black uppercase italic mb-3 tracking-tighter leading-none">
                  Bem-vindo à <br />
                  <span className={isAuraMode ? 'text-aura glow-accent animate-pulse' : 'text-accent glow-accent'}>Elite AuraGym!</span>
                </h3>
                
                <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.15em] max-w-sm mx-auto mb-10 leading-relaxed">
                  Sua transação foi processada com segurança e seu legado foi registrado no ecossistema. Detalhes de acesso ao App estão em seu e-mail.
                </p>

                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-left max-w-md mx-auto mb-10 space-y-3">
                  <div className="flex justify-between text-[11px] uppercase font-bold text-slate-400">
                    <span>Status</span>
                    <span className="text-emerald-500 font-extrabold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                      Assinatura Ativa
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase font-bold text-slate-400">
                    <span>Plano Contratado</span>
                    <span className="text-white font-extrabold">{planName}</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase font-bold text-slate-400">
                    <span>Ativação Faturamento</span>
                    <span className="text-white">Aura Cloud Pay Direct</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.18em] text-[10px] shadow-xl ${
                    isAuraMode 
                      ? "bg-white text-black hover:bg-slate-200" 
                      : "bg-accent hover:bg-accent-dark text-white shadow-accent/20"
                  }`}
                >
                  ACESSAR PORTAL DE MEMBRO
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
