import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAura } from "../contexts/AuraContext";
import { ShieldCheck, History, Milestone, Compass, HeartHandshake, Eye, Sparkles, AlertCircle } from "lucide-react";

export default function AboutSection() {
  const { isAuraMode } = useAura();
  const [activeMilestone, setActiveMilestone] = useState<number>(0);

  const historyMilestones = [
    {
      year: "2019",
      title: "O Laboratório Subterrâneo",
      desc: "Nascido em uma antiga sala industrial no coração de São Paulo, o projeto começou como um experimento de bio-otimização. O Dr. Marcus Sterling, engenheiro aeroespacial e cinesiologista, reuniu atletas de elite para testar uma tese revolucionária: o acoplamento simultâneo de hipertrofia de força mecânica e restabelecimento neural através do oxigênio e feedback.",
      tag: "O COMEÇO"
    },
    {
      year: "2022",
      title: "O Nascimento do Treino Híbrido",
      desc: "Percebendo a lacuna entre a rigidez dos treinos de musculação e o estresse articular excessivo do Crossfit desorientado, foi codificado o Protocolo Híbrido. Misturando cardio reativo e relaxamento miofascial, a marca se estabeleceu como a primeira academia boutique high-performance do país.",
      tag: "EXPANSÃO"
    },
    {
      year: "2026",
      title: "Ecossistema Aura & Tecnologia",
      desc: "Hoje, a AuraGym não é apenas uma academia, mas uma central de biohacking. Equipamentos integrados por sensores contínuos, inteligência artificial integrada para ajustes biométricos em tempo real, assessoria concierge e nutrição baseada em testes celulares individuais.",
      tag: "LIVRE LEGADO"
    }
  ];

  return (
    <section 
      id="sobre-nos" 
      className={`py-16 md:py-28 relative overflow-hidden border-t transition-all duration-1000 ${
        isAuraMode 
          ? "bg-black text-white border-red-500/10" 
          : "bg-slate-950 text-slate-200 border-white/5"
      }`}
    >
      {/* Background visual graphics */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/20 to-transparent pointer-events-none" />
      {isAuraMode && (
        <div className="absolute top-[20%] left-[-10%] w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-red-600/[0.04] blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {isAuraMode ? (
          /* ==========================================================
             MODO AURA: PUNK CYBERNETIC BRUTALIST GRID LAYOUT (RED/BLACK)
             ========================================================== */
          <div className="space-y-12 md:space-y-16">
            
            {/* Header Glitch Section */}
            <div className="border-l-4 border-red-600 pl-4 md:pl-6 pb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/35 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-red-500 font-mono">
                  ORIGENS SECULARES / ARQUIVO-01
                </span>
              </div>
              <h2 className="text-4xl md:text-8xl font-display font-black tracking-tighter uppercase italic leading-tight text-white">
                FORJADO SOB <span className="text-red-500 glow-accent italic animate-pulse">PRESSÃO MÁXIMA</span>
              </h2>
            </div>

            {/* Fictional Story Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
              
              {/* Vertical timeline details */}
              <div className="lg:col-span-5 space-y-8 md:space-y-10">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase italic tracking-wider mb-2">
                    A TESE BIOMÉTRICA DE 2019
                  </h3>
                  <div className="h-[2px] w-1/3 bg-red-600 mb-6" />
                  <p className="text-zinc-400 text-[10px] md:text-xs font-medium uppercase tracking-wider leading-relaxed">
                    Nossa história não pertence ao marketing de massa. AuraGym emergiu de laboratórios científicos clandestinos dedicados à superação genética. No início, testávamos resistência sob frio ártico e LPO sob frequências cardíacas reguladas por oxigênio enriquecido. 
                  </p>
                  <blockquote className="border-l-2 border-red-500 pl-4 mt-6 py-1 text-slate-300 font-bold uppercase tracking-widest text-[9px] md:text-[10px] italic">
                    "O músculo é apenas o veículo. A verdadeira regeneração está no equilíbrio bioquímico celular." <br/>
                    <span className="text-red-500 font-black">— Dr. Marcus Sterling</span>
                  </blockquote>
                </div>

                <div className="p-5 md:p-6 rounded-[24px] md:rounded-3xl bg-zinc-950 border border-red-500/15 relative overflow-hidden">
                  <div className="absolute right-3 top-3">
                    <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 opacity-60" />
                  </div>
                  <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white mb-2">CORES SENSORIAIS</h4>
                  <p className="text-zinc-500 text-[9px] md:text-[10px] uppercase font-bold tracking-widest leading-relaxed">
                    A atmosfera vermelha e escura (AURA) simula taxas de indução adrenal extremas, permitindo que a mente foque 100% no estresse mecânico positivo da fibra. É onde a ciência da força se manifesta.
                  </p>
                </div>
              </div>

              {/* Interactive Milestones Selector */}
              <div className="lg:col-span-7 bg-zinc-950 p-6 md:p-12 rounded-[28px] md:rounded-[36px] border border-zinc-900 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] md:text-[10px] text-zinc-500 font-black tracking-[0.3em] uppercase block mb-5 md:mb-6">
                    MENSURAR EVOLUÇÃO TEMPORAL:
                  </span>

                  <div className="flex gap-2 md:gap-3 mb-8 md:mb-10 overflow-x-auto pb-2 scrollbar-none snap-x">
                    {historyMilestones.map((ms, index) => (
                      <button
                        key={ms.year}
                        onClick={() => setActiveMilestone(index)}
                        className={`px-5 md:px-6 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest font-mono transition-all snap-start ${
                          activeMilestone === index
                            ? "bg-red-500 text-black shadow-lg shadow-red-500/20"
                            : "bg-black border border-zinc-900 text-zinc-500 hover:text-white"
                        }`}
                      >
                        {ms.year}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMilestone}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <span className="text-[10px] font-mono tracking-widest text-red-500 font-extrabold uppercase">
                        {historyMilestones[activeMilestone].tag}
                      </span>
                      <h4 className="text-2xl font-display font-black uppercase text-white tracking-tight">
                        {historyMilestones[activeMilestone].title}
                      </h4>
                      <p className="text-zinc-400 text-[11px] leading-relaxed font-semibold uppercase tracking-wider">
                        {historyMilestones[activeMilestone].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-900 flex justify-between items-center text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  <span>BIO-ENGINEERING LEVEL 04</span>
                  <span>SAO PAULO / ZURICH CONCEPT</span>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* ==========================================================
             STANDARD CLEAN: LUXURIOUS SPACE-SLATE STORYTELLING / CHRONOLOGY
             ========================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Storyteller image/details panel */}
            <div className="space-y-8 pr-4">
              <div>
                <span className="text-accent font-black uppercase tracking-[0.25em] text-xs flex items-center gap-2 mb-3">
                  <Compass className="w-5 h-5 text-accent" />
                  SABER QUEM SOMOS
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter leading-none text-white">
                  UMA FILOSOFIA <br />DE <span className="text-accent glow-accent">ALTA COSTURA</span>
                </h2>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Nenhuma inovação substancial é criada copiando clichês. A AuraGym nasceu em 2019 sob a tutela do Dr. Marcus Sterling, que pretendia desvendar por que academias convencionais tratavam todos de forma idêntica, ignorando a individualidade biométrica.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-white font-black text-3xl font-display italic">5+ ANOS</h4>
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">De pesquisa biomédica integrada à atividade</p>
                </div>
                <div>
                  <h4 className="text-white font-black text-3xl font-display italic">100%</h4>
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">Exclusividade e foco em resultados saudáveis</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 flex gap-4">
                <div className="p-3 bg-accent/10 rounded-2xl text-accent self-start">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-black uppercase tracking-widest">Nossa Missão Fiduciária</h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed mt-1">
                    Cada atleta que adentra nosso espaço possui um passaporte único. Traçamos suas metas usando tecnologia cinesiológica premium para otimizar tempo e energia física.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Interactive chronology milestones grid */}
            <div className="bg-white/[0.01] border border-white/5 p-8 md:p-12 rounded-[40px] space-y-8">
              <span className="text-xs font-black tracking-widest uppercase text-slate-500 block">LINHA DO TEMPO DA MARCA</span>
              
              <div className="space-y-6">
                {historyMilestones.map((item, id) => {
                  return (
                    <div 
                      key={item.year}
                      className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        activeMilestone === id 
                          ? 'bg-accent/5 border-accent shadow-md shadow-accent/5' 
                          : 'bg-transparent border-white/5 hover:border-white/20'
                      }`}
                      onClick={() => setActiveMilestone(id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-black italic font-display text-accent">{item.year}</span>
                        <span className="text-[8px] font-black uppercase bg-white/5 px-2 py-0.5 rounded text-zinc-400 tracking-wider">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="text-white text-sm font-black uppercase tracking-tight">{item.title}</h4>
                      {activeMilestone === id && (
                        <p className="text-zinc-400 text-xs leading-relaxed mt-2 uppercase tracking-wide font-normal">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
