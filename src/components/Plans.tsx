import { CheckCircle2, Zap } from "lucide-react";
import { useAura } from "../contexts/AuraContext";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

export default function Plans() {
  const { isAuraMode, user, openCheckout } = useAura();
  const [billingCycle, setBillingCycle] = useState<"mensal" | "anual">("mensal");

  // Automatically switch billing cycle to annual when Aura Mode is active, ensuring relative pricing
  useEffect(() => {
    if (isAuraMode) {
      setBillingCycle("anual");
    } else {
      setBillingCycle("mensal");
    }
  }, [isAuraMode]);

  const standardPlans = [
    {
      name: "Silver",
      priceMensal: "79",
      priceAnual: "59",
      annualTotal: "708",
      features: [
        "Acesso à Musculação",
        "App Aura Training",
        "Vestiários Executivos",
      ],
      popular: false,
    },
    {
      name: "Gold",
      priceMensal: "159",
      priceAnual: "119",
      annualTotal: "1428",
      features: [
        "Todas as Modalidades",
        "Bioimpedância Mensal",
        "Acesso em 2 unidades",
        "Nutricionista (Trimestral)",
      ],
      popular: true,
    },
    {
      name: "Black",
      priceMensal: "209",
      priceAnual: "159",
      annualTotal: "1908",
      features: [
        "Acesso Total & Ilimitado",
        "Personal Support",
        "Amenities Exclusivos",
        "Acompanhamento Físico",
        "Guest Pass Ilimitado",
      ],
      popular: false,
    },
  ];

  const auraPlans = [
    {
      name: "Hybrid Lite",
      priceMensal: "119",
      priceAnual: "89",
      annualTotal: "1068",
      features: [
        "Metodologia Híbrida Aura",
        "Tracking Básico",
        "Recuperação Ativa",
        "Comunidade Aura Pro",
      ],
      popular: false,
    },
    {
      name: "Hybrid Max",
      priceMensal: "189",
      priceAnual: "139",
      annualTotal: "1668",
      features: [
        "Acesso Ilimitado 24/7",
        "Análise Biomecânica",
        "Suplementação Aura",
        "Personal Híbrido",
        "Aura Lounge VIP",
      ],
      popular: true,
    },
    {
      name: "Apex Elite",
      priceMensal: "329",
      priceAnual: "249",
      annualTotal: "2988",
      features: [
        "Biohacking Individual",
        "Exames Sanguíneos",
        "Crioterapia Ilimitada",
        "Acompanhamento 360º",
        "Concierge de Saúde",
      ],
      popular: false,
    },
  ];

  const rawPlans = isAuraMode ? auraPlans : standardPlans;
  const plans = rawPlans.map(p => ({
    name: p.name,
    price: billingCycle === "anual" ? p.priceAnual : p.priceMensal,
    annualTotal: p.annualTotal,
    features: p.features,
    popular: p.popular,
  }));

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handlePlanSelect = (plan: {name: string, price: string, isAnnual: boolean}) => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      const formattedName = plan.isAnnual ? `${plan.name} — Anual` : plan.name;
      openCheckout(formattedName, plan.price, "intro");
    }
  };

  return (
    <section id="planos" className="py-20 md:py-32 bg-slate-950/30 px-4 md:px-0">
      <div className="max-w-7xl mx-auto md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <span className={`${isAuraMode ? 'text-aura border-aura/20 bg-aura/5' : 'text-accent border-accent/20 bg-accent/5'} px-3 md:px-4 py-1.5 rounded-full font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px] border transition-colors duration-500`}>
            {isAuraMode ? 'Planos Bio-Performance' : 'Planos de Performance'}
          </span>
          <h2 className="text-4xl md:text-8xl font-display font-black uppercase italic mt-6 tracking-tighter leading-none">
            INVISTA NO SEU <span className={isAuraMode ? 'text-aura glow-accent' : 'text-accent glow-accent'}>LEGADO</span>
          </h2>
          <p className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-widest mt-4">
            Escolha o melhor formato para atingir seu próximo rank físico
          </p>

          {/* Billing Cycle Selector Toggle */}
          <div className="flex justify-center mt-10 md:mt-12 overflow-x-auto pb-4 md:pb-0 scrollbar-none">
            <div className={`p-1.5 rounded-2xl md:rounded-[2rem] border flex items-center gap-1.5 backdrop-blur-md shrink-0 ${isAuraMode ? 'bg-[#0a0304] border-red-500/10' : 'bg-slate-900/50 border-white/5'}`}>
              <button
                onClick={() => setBillingCycle("mensal")}
                className={`px-6 py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap ${
                  billingCycle === "mensal"
                    ? (isAuraMode ? "bg-red-500 text-black font-black" : "bg-accent text-white font-black")
                    : "text-slate-500 hover:text-white"
                }`}
              >
                MENSAL
              </button>
              <button
                onClick={() => setBillingCycle("anual")}
                className={`px-6 py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-3 whitespace-nowrap ${
                  billingCycle === "anual"
                    ? (isAuraMode ? "bg-red-500 text-black font-black" : "bg-accent text-white font-black")
                    : "text-slate-500 hover:text-white"
                }`}
              >
                ANUAL (-25%)
                <span className={`px-2 py-0.5 rounded-lg text-[8px] font-mono font-black ${billingCycle === "anual" ? 'bg-black/20 text-black' : (isAuraMode ? 'bg-red-500/10 text-red-500' : 'bg-accent/10 text-accent')}`}>
                  VIP
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 md:p-10 rounded-[2.5rem] md:rounded-[4rem] border transition-all duration-700 ${
                plan.popular 
                  ? (isAuraMode ? "bg-aura/10 border-aura shadow-[0_0_60px_rgba(34,211,238,0.15)] scale-100 md:scale-105" : "bg-accent/10 border-accent shadow-[0_0_60px_rgba(139,92,246,0.15)] scale-100 md:scale-105") 
                  : "bg-white/[0.02] border-white/10"
              }`}
            >
              {plan.popular && (
                <div className={`absolute top-0 right-10 -translate-y-1/2 text-white text-[9px] font-black uppercase px-5 py-1.5 rounded-full border tracking-widest ${isAuraMode ? 'bg-aura text-black border-aura' : 'bg-accent border-accent shadow-lg shadow-accent/20'}`}>
                  Mais Escolhido
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-2xl md:text-3xl font-black uppercase italic tracking-tighter ${plan.popular ? (isAuraMode ? "text-aura" : "text-accent") : "text-white"}`}>
                  {plan.name}
                </h3>
                {isAuraMode && <Zap className="w-5 h-5 text-aura" />}
              </div>
              
              <div className="flex flex-col gap-1 mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] md:text-xs font-black uppercase text-slate-500 tracking-widest">R$</span>
                  <span className="text-6xl md:text-7xl font-display font-black text-white italic tracking-tighter leading-none">
                    {plan.price}
                  </span>
                  <span className="text-[10px] md:text-xs font-black uppercase text-slate-500 tracking-widest">/mês</span>
                </div>
                {billingCycle === "anual" && (
                  <span className={`text-[9px] font-black uppercase tracking-widest ${isAuraMode ? 'text-red-500/80' : 'text-accent/80'}`}>
                    Faturado anualmente (R$ {plan.annualTotal}/ano)
                  </span>
                )}
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-4">
                    <div className={`p-1 rounded-full ${isAuraMode ? "bg-aura/10 text-aura" : "bg-accent/10 text-accent"}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePlanSelect({ name: plan.name, price: plan.price, isAnnual: billingCycle === "anual" })}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] transition-all cursor-pointer shadow-xl active:scale-95 ${
                  plan.popular
                    ? (isAuraMode ? "bg-aura text-black hover:bg-white shadow-aura/20" : "bg-accent text-white hover:bg-white hover:text-black shadow-accent/20")
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                Assinar Plano
              </button>
            </div>
          ))}
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
}
