import { Shield, Sparkles, Apple, Zap, Target, Activity } from "lucide-react";
import { useAura } from "../contexts/AuraContext";

export default function Differentials() {
  const { isAuraMode } = useAura();

  const standardDiffs = [
    {
      title: "Equipamentos de Elite",
      desc: "Linha italiana Technogym e Life Fitness de última geração para biomecânica perfeita.",
      icon: <Shield className="w-10 h-10" />,
    },
    {
      title: "Vestiários de Luxo",
      desc: "Amenities premium, saunas secas e ambiente climatizado para seu pós-treino.",
      icon: <Sparkles className="w-10 h-10" />,
    },
    {
      title: "Foco Nutricional",
      desc: "Acompanhamento direto com nutricionistas esportivos especializados em performance.",
      icon: <Apple className="w-10 h-10" />,
    },
  ];

  const auraDiffs = [
    {
      title: "Metodologia Híbrida",
      desc: "Treinamentos concorrentes otimizados para maximizar hipertrofia e VO2 max simultaneamente.",
      icon: <Zap className="w-10 h-10" />,
    },
    {
      title: "Bio-Rastreamento",
      desc: "Monitoramento contínuo de biomarcadores e variabilidade da frequência cardíaca (VFC).",
      icon: <Activity className="w-10 h-10" />,
    },
    {
      title: "Dieta de Precisão",
      desc: "Planos alimentares baseados em carga glicêmica e timing de nutrientes para performance.",
      icon: <Target className="w-10 h-10" />,
    },
  ];

  const diffs = isAuraMode ? auraDiffs : standardDiffs;

  return (
    <section id="diferenciais" className="py-16 md:py-24 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-1/3 h-full blur-[120px] -z-10 rounded-full transition-colors duration-1000 ${isAuraMode ? 'bg-aura/10' : 'bg-accent/10'}`} />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-8 border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-8 lg:p-16 glass-panel transition-all duration-500 ${isAuraMode ? 'border-aura/10' : ''}`}>
          {diffs.map((item, index) => (
            <div key={item.title} className="relative group p-2 md:p-4 rounded-3xl transition-colors">
              <div className={`mb-4 md:mb-6 transition-all duration-700 ${isAuraMode ? 'text-aura' : 'text-accent'} group-hover:drop-shadow-[0_0_25px_currentColor] group-hover:scale-110`}>
                {item.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold uppercase mb-3 md:mb-4 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
                {item.desc}
              </p>
              {index !== diffs.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
