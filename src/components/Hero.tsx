import { motion } from "motion/react";
import { ArrowRight, Star, Zap } from "lucide-react";
import { useAura } from "../contexts/AuraContext";

export default function Hero() {
  const { isAuraMode, openCheckout } = useAura();

  const handleFreeTrialClick = () => {
    if (isAuraMode) {
      openCheckout("Hybrid Max", "189", "trial_form");
    } else {
      openCheckout("Gold", "159", "trial_form");
    }
  };

  const handleScrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={isAuraMode 
            ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000" // Premium energy abstract aura background
            : "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=2000" // Neon style fitness action athletic background
          }
          alt="Gym Hero Aura"
          className={`w-full h-full object-cover transition-all duration-1000 ${isAuraMode ? 'opacity-30 scale-105' : 'opacity-30 scale-100'}`}
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 transition-colors duration-1000 ${isAuraMode ? 'bg-linear-to-t from-black via-black/90 to-black/20' : 'bg-linear-to-t from-zinc-950 via-zinc-950/50 to-transparent'}`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          key={isAuraMode ? 'aura' : 'standard'}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-6 md:mb-8"
        >
          <div className={`border backdrop-blur-sm px-4 md:px-6 py-2 rounded-full flex items-center gap-2 md:gap-3 transition-colors duration-500 ${isAuraMode ? 'bg-aura/10 border-aura/20' : 'bg-accent/10 border-accent/20'}`}>
            {isAuraMode ? <Zap className="w-4 h-4 text-aura fill-aura" /> : <Star className="w-4 h-4 text-accent fill-accent" />}
            <span className={`text-[9px] md:text-xs font-black uppercase tracking-[0.25em] transition-colors duration-500 ${isAuraMode ? 'text-aura' : 'text-accent'}`}>
              {isAuraMode ? 'Protocolo Híbrido Ativado' : 'Exclusividade Aura'}
            </span>
          </div>
        </motion.div>

        <motion.h1
          key={isAuraMode ? 'title-aura' : 'title-std'}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl sm:text-7xl md:text-[120px] lg:text-[140px] font-black uppercase italic tracking-[-0.05em] leading-[0.9] md:leading-[0.85] mb-8"
        >
          {isAuraMode ? (
            <>ATLETA <span className="text-aura glow-accent">HÍBRIDO</span><br />SEM LIMITES</>
          ) : (
            <>POTENCIAL <br /><span className="text-accent glow-accent">EXTRAORDINÁRIO</span></>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-400 text-[10px] md:text-lg max-w-xl mx-auto mb-10 md:mb-12 font-bold uppercase tracking-[0.2em] leading-relaxed px-4 opacity-70"
        >
          {isAuraMode 
            ? "O ápice da biologia humana através de metodologias que unem força extrema e resistência cardiovascular de elite."
            : "Equipamentos de nível mundial e ambiente exclusivo para quem não aceita menos que a excelência absoluta."
          }
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={handleFreeTrialClick}
            className={`px-12 py-5 rounded-[24px] font-black transition-all flex items-center gap-3 group w-full sm:w-auto justify-center text-[10px] uppercase tracking-[0.2em] shadow-2xl ${isAuraMode ? 'bg-aura hover:bg-aura-dark text-black shadow-aura/20' : 'bg-accent hover:bg-accent-dark text-white shadow-accent/20'}`}
          >
            {isAuraMode ? 'Inicie seu Legado' : 'Agendar Aula Gratuita'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-70" />
          </button>
          <button 
            onClick={handleScrollToPlans}
            className="bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-3xl border border-white/10 px-12 py-5 rounded-[24px] font-black transition-all w-full sm:w-auto uppercase text-[10px] tracking-[0.2em] text-white shadow-2xl"
          >
            Explorar Planos
          </button>
        </motion.div>
      </div>
    </section>
  );
}
