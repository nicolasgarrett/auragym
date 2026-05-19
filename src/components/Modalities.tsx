import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAura } from "../contexts/AuraContext";
import { 
  CalendarRange, 
  Clock, 
  Users, 
  Flame, 
  Activity, 
  Sparkles, 
  Check, 
  Plus, 
  Info,
  Dumbbell,
  Sword,
  Compass,
  Zap,
  X,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Award
} from "lucide-react";

interface Modality {
  title: string;
  tag: string;
  description: string;
  longDescription: string;
  image: string;
  calories: string;
  duration: string;
  focus: string;
  equipment: string[];
}

interface ScheduleItem {
  time: string;
  trainer: string;
  spots: number;
  maxSpots: number;
  level: string;
}

export default function Modalities() {
  const { isAuraMode, openCheckout } = { ...useAura() };
  const [selectedModality, setSelectedModality] = useState<Modality | null>(null);
  const [activeTab, setActiveTab] = useState<"seg-qua" | "qui-sab">("seg-qua");

  // Premium database of modalities with their high-quality photos
  const modalitiesList: Modality[] = [
    {
      title: "Musculação",
      tag: "Força & Biomecânica",
      description: "Equipamentos de alta biotensão e cinesiologia biomecânica de elite.",
      longDescription: "Nosso parque de força conta com equipamentos importados com polias de resistência inteligente e biomecânica rotativa avançada. É o ambiente perfeito para hipertrofia segmentada, reconstrução de tecidos e ganho de força absoluta.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
      calories: "450 - 600 kcal/h",
      duration: "50 min",
      focus: "Miofibrilar / Densidade Muscular",
      equipment: ["Carga Livre Biomecânica", "Cabo Inteligente", "Polias de Resistência Variável"]
    },
    {
      title: "Crossfit",
      tag: "Intensidade Absoluta",
      description: "Treinamento funcional em circuito de altíssima aceleração metabólica.",
      longDescription: "Exercícios funcionais de levantamento de peso olímpico (LPO) e ginástica olímpica acelerada. O WOD é planejado em blocos intervalados para testagem contínua de limites pulmonares e energia física indomável.",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200",
      calories: "750 - 900 kcal/h",
      focus: "Resistência Cardiovascular & Explosão",
      duration: "60 min",
      equipment: ["Kettlebells de Ferro Duro", "Barras de Aço Olímpicas", "Anilhas Emborrachadas"]
    },
    {
      title: "Yoga",
      tag: "Equilíbrio & Reset Neural",
      description: "Sincronização entre respiração lenta e reordenação articular.",
      longDescription: "Uma imersão zen projetada para atletas de alto impacto. Focado na descompressão de vértebras, relaxamento miofascial, flexibilidade de quadril profunda e controle cortical de ansiedade no estresse do dia a dia.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
      calories: "250 - 350 kcal/h",
      focus: "Mobilidade Articular / Redução Cortisol",
      duration: "50 min",
      equipment: ["Tapetes de Cortiça Pro", "Blocos de Apoio Biodegradáveis", "Faixas de Tração Térmica"]
    },
    {
      title: "Lutas",
      tag: "Tática de Strike",
      description: "Boxe clássico e treinos intensivos de Muay Thai com professores campeões.",
      longDescription: "Trabalho tático de movimentação de ringue, combinações aeróbicas de golpes, chutes médios e esquivas de alta rotação. Ideal para queima calórica violenta e desenvolvimento de reflexos de defesa pessoal.",
      image: "https://images.unsplash.com/photo-1514994667787-b48ca37155f0?auto=format&fit=crop&q=80&w=1200",
      calories: "700 - 850 kcal/h",
      focus: "Agilidade Lateral & Resistência Aeróbica",
      duration: "60 min",
      equipment: ["Sacos de Pancada de 60kg", "Luvas de Couro Premium", "Cordas de Pular Pesadas"]
    },
    {
      title: "Fit Dance",
      tag: "Ritmo & Cardio Coreográfico",
      description: "Sessões contagiantes de coreografias dinâmicas com queima rápida de calorias.",
      longDescription: "A fusão perfeita entre diversão rítmica e depletamento energético. Desenvolvido para movimentação corporal completa e controle cardio através de passos modernos de dança em turmas energizadas.",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1200",
      calories: "500 - 650 kcal/h",
      focus: "Aceleração Cardiorrespiratória Divertida",
      duration: "50 min",
      equipment: ["Sistema de Som Holográfico", "Luzes Estroboscópicas Reativas"]
    },
    {
      title: "Treino Híbrido",
      tag: "Protocolo Regenerativo Aura",
      description: "Nossa metodologia original: força mecânica unida a sprints cardiovasculares.",
      longDescription: "A maior criação da AuraGym. Une a musculação pesada para musculatura sólida e circuitos aeróbicos em blocos intervalados, finalizando com terapia de banheira à gelo. Otimiza o metabolismo por 48 horas inteiras.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200",
      calories: "850 - 1000 kcal/h",
      focus: "Combustão Metabólica Total & Hipertrofia",
      duration: "70 min",
      equipment: ["Gaiolas de Agachamento Livres", "Remo Ergonômico de Resistência a Água", "Banheira de Gelo Crioterapêutica"]
    }
  ];

  // Specific schedule options per category (for the booking picker)
  const scheduleData: { [key: string]: { [key: string]: ScheduleItem[] } } = {
    "Musculação": {
      "seg-qua": [
        { time: "06:00 - 07:00", trainer: "Alexandre Silva", spots: 12, maxSpots: 20, level: "Livre" },
        { time: "09:00 - 10:00", trainer: "Mariana Costa", spots: 18, maxSpots: 20, level: "Livre" },
        { time: "18:00 - 19:00", trainer: "Alexandre Silva", spots: 20, maxSpots: 20, level: "Alta Intensidade" }
      ],
      "qui-sab": [
        { time: "08:00 - 09:00", trainer: "Mariana Costa", spots: 10, maxSpots: 20, level: "Livre" },
        { time: "14:00 - 15:00", trainer: "Alexandre Silva", spots: 5, maxSpots: 20, level: "Livre" },
        { time: "19:00 - 20:00", trainer: "Bio-Eng Staff", spots: 15, maxSpots: 20, level: "Protocolo Aura" }
      ]
    },
    "Crossfit": {
      "seg-qua": [
        { time: "06:30 - 07:30", trainer: "Coach Ramirez", spots: 8, maxSpots: 18, level: "Alta Intensidade" },
        { time: "20:15 - 21:15", trainer: "Coach Ramirez", spots: 17, maxSpots: 18, level: "Alta Intensidade" }
      ],
      "qui-sab": [
        { time: "08:30 - 09:30", trainer: "Coach Ramirez", spots: 9, maxSpots: 18, level: "Intermediário" },
        { time: "17:00 - 18:00", trainer: "Coach Ramirez", spots: 15, maxSpots: 18, level: "Avançado" }
      ]
    },
    "Yoga": {
      "seg-qua": [
        { time: "08:00 - 09:00", trainer: "Profª Helena Silveira", spots: 14, maxSpots: 15, level: "Iniciante" },
        { time: "17:30 - 18:30", trainer: "Profª Helena Silveira", spots: 12, maxSpots: 15, level: "Intermediário" }
      ],
      "qui-sab": [
        { time: "07:00 - 08:00", trainer: "Profª Helena Silveira", spots: 10, maxSpots: 15, level: "Iniciante" },
        { time: "11:00 - 12:00", trainer: "Profª Helena Silveira", spots: 8, maxSpots: 15, level: "Intermediário" }
      ]
    },
    "Lutas": {
      "seg-qua": [
        { time: "19:00 - 20:00", trainer: "Mestre Minotauro", spots: 15, maxSpots: 20, level: "Avançado" }
      ],
      "qui-sab": [
        { time: "12:00 - 13:00", trainer: "Mestre Minotauro", spots: 11, maxSpots: 20, level: "Intermediário" },
        { time: "19:30 - 20:30", trainer: "Mestre Minotauro", spots: 14, maxSpots: 20, level: "Avançado" }
      ]
    },
    "Fit Dance": {
      "seg-qua": [
        { time: "12:00 - 13:00", trainer: "Camila Santos", spots: 16, maxSpots: 25, level: "Iniciante" }
      ],
      "qui-sab": [
        { time: "10:00 - 11:00", trainer: "Camila Santos", spots: 22, maxSpots: 25, level: "Iniciante" },
        { time: "18:00 - 19:15", trainer: "Camila Santos", spots: 19, maxSpots: 25, level: "Intermediário" }
      ]
    },
    "Treino Híbrido": {
      "seg-qua": [
        { time: "10:00 - 11:30", trainer: "Alexandre Silva", spots: 5, maxSpots: 20, level: "Avançado" },
        { time: "21:35 - 22:30", trainer: "Bio-Eng Staff", spots: 3, maxSpots: 15, level: "Protocolo Aura" }
      ],
      "qui-sab": [
        { time: "15:00 - 16:30", trainer: "Alexandre Silva", spots: 8, maxSpots: 20, level: "Alta Intensidade" },
        { time: "20:45 - 21:45", trainer: "Alexandre Silva", spots: 12, maxSpots: 15, level: "Protocolo Aura" }
      ]
    }
  };

  const currentModalitiesSchedules = selectedModality 
    ? (scheduleData[selectedModality.title === "Luta" ? "Lutas" : selectedModality.title] || scheduleData["Musculação"])[activeTab]
    : [];

  const handleBooking = (modalityTitle: string, time: string) => {
    openCheckout(`${modalityTitle} — [AULA EXPERIMENTAL REATIVA]`, "Gratuito", "trial_form");
    setSelectedModality(null);
  };

  return (
    <section 
      id="modalidades" 
      className={`py-28 relative transition-all duration-1000 overflow-hidden ${
        isAuraMode 
          ? "bg-black text-white" 
          : "bg-slate-950 text-slate-200"
      }`}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.01]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {isAuraMode ? (
        /* =========================================================================
           MODO AURA: SEVERE HIGH-CONTRAST PURE RED & BLACK GLITCH LAYOUT
           ========================================================================= */
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header block with extreme warning status */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-10 border-b border-red-600/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-red-600 text-black text-[9px] font-black uppercase tracking-[0.25em] mb-4 shadow-[0_0_15px_rgba(255,0,51,0.5)]">
                <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
                SISTEMA INVASIVO AURA RED
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none italic select-none">
                SÉRIES DE <span className="text-red-500 glow-accent italic animate-pulse">ALTO ESTRESSE</span>
              </h2>
            </div>
            
            <div className="max-w-md text-left">
              <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest leading-relaxed mb-4">
                O CATÁLOGO DE TREINO EM REVOLTA: Clique sobre qualquer célula abaixo para desmembrar o cronograma e agendar sua entrada grátis de alta tensão.
              </p>
              <div className="flex items-center gap-2 border border-red-600/30 bg-red-600/5 px-4 py-2.5 rounded-lg">
                <Zap className="w-4 h-4 text-red-500 animate-bounce" />
                <span className="text-[9px] text-red-400 font-mono font-black uppercase tracking-widest">
                  ALERTA: CARDIO REATIVO & CRIOGENIA INSTANTÂNEA ATIVA
                </span>
              </div>
            </div>
          </div>

          {/* Catalog grid with the beautiful previous photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modalitiesList.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedModality(item)}
                className="group relative h-96 rounded-none border border-red-600/20 hover:border-red-600 bg-zinc-950 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,0,51,0.15)]"
              >
                {/* Immersive background image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 group-hover:scale-105 transition-all duration-750"
                  referrerPolicy="no-referrer"
                />
                
                {/* Red tinted ambient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-red-950/20 opacity-90 group-hover:opacity-80 transition-opacity" />
                
                {/* Brutalist Warning Lines inside hover */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top sector info */}
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono tracking-widest text-red-500 font-bold bg-red-950/40 px-2.5 py-1 uppercase rounded border border-red-500/20">
                      CÉLULA CRÍTICA {index + 1}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono font-bold">
                      {item.calories.split(" ")[0]} KCAL
                    </span>
                  </div>

                  {/* Bottom title & description details */}
                  <div className="space-y-3">
                    <span className="text-[8px] font-black tracking-widest text-red-400 uppercase">
                      // {item.tag}
                    </span>
                    <h3 className="text-3xl font-display font-black uppercase italic tracking-wide text-white">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* Immersive fake click button */}
                    <div className="pt-3 border-t border-red-600/10 flex items-center justify-between group-hover:border-red-600/30 transition-colors">
                      <span className="text-[8px] text-red-500 font-black tracking-widest group-hover:animate-pulse">
                        SISTEMA DE AGENDAMENTO [CLICK]
                      </span>
                      <Plus className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      ) : (
        /* =========================================================================
           STANDARD CLIENT: PREMIUM LUXURY COLD SLATE MINIMALIST DECK
           ========================================================================= */
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-white/5">
            <div>
              <span className="text-accent font-black uppercase tracking-[0.25em] text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                CATÁLOGO EXCLUSIVO
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic mt-3 tracking-tighter leading-none text-white">
                NOSSAS <span className="text-accent glow-accent">MODALIDADES</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-md">
              Selecione o programa de sua preferência abaixo para examinar os benefícios, instalações exclusivas e agendar sua sessão cortesia premium.
            </p>
          </div>

          {/* Grid Layout of modalities using original gorgeous photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modalitiesList.map((item, index) => {
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedModality(item)}
                  className="group relative h-96 overflow-hidden rounded-[36px] bg-zinc-950 border border-white/5 hover:border-accent/40 cursor-pointer transition-all duration-500 hover:shadow-[0_12px_40px_rgba(6,182,212,0.1)]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/90 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                        {item.tag.split(" ")[0]}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                        {item.tag}
                      </span>
                      <h3 className="text-2xl font-display font-black uppercase italic text-white flex items-center gap-2">
                        {item.title}
                        <Plus className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-zinc-400 text-xs font-normal leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#06B6D4]">
                        <span>Detalhes & Horários</span>
                        <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      )}

      {/* MODALITY INFORMATION AND RESERVATION (AGENDAMENTO) OVERLAY MODAL */}
      <AnimatePresence>
        {selectedModality && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModality(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className={`relative w-full max-w-4xl border rounded-[36px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto ${
                isAuraMode 
                  ? "bg-[#090203] border-red-500/20 text-slate-100" 
                  : "bg-slate-950 border-white/10 text-slate-200"
              }`}
            >
              <button
                onClick={() => setSelectedModality(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/60 border border-white/10 hover:border-white/30 text-white z-10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Side: Photo & Key details of Class */}
                <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[300px] border-r border-white/5 bg-zinc-900">
                  <img
                    src={selectedModality.image}
                    alt={selectedModality.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 lg:opacity-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#090203] via-black/70 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-[#090203]/90 lg:to-[#090203]" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border max-w-max mb-3 ${
                      isAuraMode ? "bg-red-500 text-black border-red-500" : "bg-accent/10 border-accent/20 text-accent"
                    }`}>
                      {selectedModality.tag}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-black uppercase italic text-white mb-2">
                      {selectedModality.title}
                    </h2>
                    <p className="text-zinc-400 text-xs font-semibold uppercase leading-relaxed tracking-wider mb-6">
                      {selectedModality.description}
                    </p>

                    <div className="space-y-2.5 border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-widest text-zinc-300">
                      <div className="flex items-center gap-2">
                        <Flame className={`w-4 h-4 ${isAuraMode ? "text-red-500" : "text-accent"}`} />
                        <span>QUEIMA: {selectedModality.calories}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${isAuraMode ? "text-red-500" : "text-accent"}`} />
                        <span>DURAÇÃO: {selectedModality.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className={`w-4 h-4 ${isAuraMode ? "text-red-500" : "text-accent"}`} />
                        <span>FOCO: {selectedModality.focus}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Long info & Reservation/Schedule Scheduler Table (Agendamento) */}
                <div className="lg:col-span-7 p-8 md:p-10 space-y-6">
                  
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">SOBRE A ATIVIDADE</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal uppercase tracking-wider">
                      {selectedModality.longDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">MATERIAIS E EQUIPAMENTO ENVOLVIDOS</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedModality.equipment.map((eq) => (
                        <span key={eq} className="bg-white/[0.02] border border-white/5 rounded-lg px-3 py-1.5 text-[9px] uppercase font-bold tracking-widest text-slate-400">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Scheduler block (Tela de Agendamento) */}
                  <div className="pt-4 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 font-black tracking-widest uppercase">GRADE DE HORÁRIOS DISPONÍVEIS</span>
                      
                      {/* Day Tab Selector */}
                      <div className={`flex p-1 rounded-xl border ${
                        isAuraMode ? "bg-black border-red-500/10" : "bg-white/[0.02] border-white/5"
                      }`}>
                        <button
                          onClick={() => setActiveTab("seg-qua")}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                            activeTab === "seg-qua"
                              ? (isAuraMode ? "bg-red-500 text-black" : "bg-accent text-white")
                              : "text-zinc-500 hover:text-white"
                          }`}
                        >
                          SEG - QUA
                        </button>
                        <button
                          onClick={() => setActiveTab("qui-sab")}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                            activeTab === "qui-sab"
                              ? (isAuraMode ? "bg-red-500 text-black" : "bg-accent text-white")
                              : "text-zinc-500 hover:text-white"
                          }`}
                        >
                          QUI - SÁB
                        </button>
                      </div>
                    </div>

                    {/* Schedule listings list */}
                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {currentModalitiesSchedules.length === 0 ? (
                        <div className="text-center py-6 text-[10px] uppercase font-bold text-slate-500">
                          Sem horários listados para esses dias.
                        </div>
                      ) : (
                        currentModalitiesSchedules.map((slot, index) => {
                          const isFull = slot.spots >= slot.maxSpots;
                          return (
                            <div 
                              key={index}
                              className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                                isAuraMode 
                                  ? "bg-black/40 border-red-500/10 hover:border-red-500/20" 
                                  : "bg-white/[0.01] border-white/5 hover:border-white/10"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Clock className={`w-3.5 h-3.5 ${isAuraMode ? "text-red-500" : "text-accent"}`} />
                                <div className="space-y-0.5">
                                  <p className="text-xs font-mono font-bold text-white">{slot.time}</p>
                                  <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">
                                    COACH: <span className="text-zinc-300">{slot.trainer}</span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="hidden sm:block text-right">
                                  <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest bg-white/[0.02] px-2 py-0.5 rounded mr-2">
                                    {slot.level}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {slot.spots}/{slot.maxSpots} vagas
                                  </span>
                                </div>

                                <button
                                  disabled={isFull}
                                  onClick={() => handleBooking(selectedModality.title, slot.time)}
                                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                                    isFull 
                                      ? "bg-white/5 text-slate-600 cursor-not-allowed"
                                      : (isAuraMode ? "bg-red-500 text-black hover:bg-red-400 font-black font-mono shadow-[0_0_15px_rgba(255,0,51,0.2)]" : "bg-accent/20 hover:bg-accent text-accent hover:text-white border border-accent/20")
                                  }`}
                                >
                                  {isFull ? "Esgotado!" : "Confirmar Agendamento"}
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Minimal helper to replace chevron in the card
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2} 
      stroke="currentColor" 
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
