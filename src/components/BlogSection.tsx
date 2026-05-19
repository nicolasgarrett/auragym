import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAura } from "../contexts/AuraContext";
import { BookOpen, Calendar, Clock, User, X, Sparkles, ChevronRight, Share2, Heart } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  category: "Biohacking" | "Nutrição" | "Treino Híbrido" | "Mindset";
  summary: string;
  content: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  image: string;
  likes: number;
}

export default function BlogSection() {
  const { isAuraMode } = useAura();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Crioterapia Extrema: A ciência do gelo no pós-treino biomecânico",
      category: "Biohacking",
      summary: "Descubra como o choque térmico controlado acelera a proliferação celular mitocondrial e reduz dores mecânicas em até 68% nas primeiras 4 horas.",
      content: `O uso deliberado do frio como terapia regenerativa não é novidade, mas a cronometragem científica de imersão rápida em gelo traz novos segredos de performance biomecânica. 

Ao imergir seu corpo em banheiras de água a 4°C por exatamente 8 a 12 minutos logo após uma sessão intensa de Treino Híbrido ou CrossFit, acontece uma vasoconstrição extrema periférica induzida pelo estresse hormonal positivo (hormese). 

ESTUDOS RECENTES DE PERFORMANCE:
1. Redução Sistêmica da Inflamação: O frio inibe as citocinas pró-inflamatórias imediatas.
2. Estimulação de Tecido Adiposo Castanho: Ativação metabólica mitocondrial contínua pós-treino.
3. Repolarização Neural Rápida: Alívio instantâneo do sistema simpático superaquecido, estimulado por picos cardíacos.

COMO EXECUTA-SE NO PROTOCOLO AURA:
Basta acionar seu coach de recuperação para agendar os blocos de crioterapia localizados em nosso SPA regenerativo após sua aula. É recomendado realizar sessões com orientação, garantindo que o batimento cardíaco permaneça sob total controle respiratório.`,
      author: "Dra. Larissa Mendes",
      role: "Ph.D em Cinesiologia Clínica",
      date: "14 de Maio, 2026",
      readTime: "5 min de leitura",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800",
      likes: 124
    },
    {
      id: 2,
      title: "Como sincronizar levantamento de peso e blocos anaeróbicos sem fadigar o SNC",
      category: "Treino Híbrido",
      summary: "Intercalar LPO pesado com sprints cíclicos exige cálculo neural refinado. Conheça as estratégias de pausa ativa fundamentais.",
      content: `Treinar múltiplos domínios metabólicos na mesma semana é a maior virtude do atleta moderno, mas também o seu maior risco se realizado sem estruturação neurológica. O Sistema Nervoso Central (SNC) possui um limite de disparo de biotensão elétrica por período biológico.

Se você executa agachamentos com 85% de 1RM e imediatamente inicia rounds de salto na caixa com burpees sem a proporção de restabelecimento correspondente, a fadiga periférica impede o ganho hipertrófico pretendido.

REGRAS DE CONTROLE NEURAL:
• Proporção de Coeficiente Mecânico: Nunca faça blocos de força explosiva após fadiga muscular local extrema. Os blocos de LPO vêm sempre primeiro na grade.
• Respiração Consciente Coerente: Manter a expiração lenta entre blocos metabólicos restaura o fluxo vagal imediatamente, acalmando os tremores espinhais involuntários.
• O Segredo do Potássio / Sódio Intracelular: A suplementação com eletrólitos líquidos de alta absorção durante e após as séries previne cãibras nervosas crônicas.`,
      author: "Coach Ramirez",
      role: "Diretor Técnico AuraGym / Treinador Olímpico",
      date: "08 de Maio, 2026",
      readTime: "7 min de leitura",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
      likes: 98
    },
    {
      id: 3,
      title: "Nutrição Cronometrada: Otimizando carboidratos para reatividade metabólica",
      category: "Nutrição",
      summary: "Entenda por que consumir carboidratos simples de fácil assimilação 40 minutos antes do cardio rítmico transforma gordura em energia explosiva.",
      content: `A ingestão de macronutrientes deve obedecer ao seu pulso biológico de atividade. Consumir alimentos calóricos errados antes de aulas rápidas como o Fit Dance ou Lutas resulta em cansaço estomacal e indisposição.

O segredo está no controle da insulina. Utilizar carboidratos cíclicos inteligentes (como palatinose pura ou amido de aveia fino) promove um suprimento uniforme de glicogênio muscular sem forçar picos insulínicos negativos.

RECOMENDAÇÕES DE SUPLEMENTAÇÃO PRÁTICA:
1. Pré-Atividade (40min antes): Carboidratos complexos agregados a eletrólitos minerais e sementes ricas em nitrogênio (como beterraba em pó).
2. Intra-Treino: Apenas água com pitadas de sal marinho natural e aminoácidos de restabelecimento.
3. Janela de Resolução (Até 90min após): Proteínas hidrolisadas puras associadas a antioxidantes (como mirtilos ou açaí liofilizado) para neutralização do estresse oxidativo das células de impacto.`,
      author: "Dr. Felipe Neves",
      role: "Nutricionista Funcional de Alto Rendimento",
      date: "29 de Abril, 2026",
      readTime: "4 min de leitura",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
      likes: 156
    },
    {
      id: 4,
      title: "A mente inabalável e a regulação de cortisol sob treinamento intensivo",
      category: "Mindset",
      summary: "Estudo prático sobre como técnicas de modulação da respiração derivadas da Yoga controlam o estresse psicológico durante treinos exaustivos.",
      content: `O cansaço físico não habita unicamente as fibras musculares, mas sim o córtex pré-frontal. Diante da dor sob carga extrema, a mente aciona respostas associadas ao medo instintivo, elevando as taxas de cortisol na corrente sanguínea.

Aprender a desacelerar a respiração em momentos de foco crítico permite ao praticante continuar o protocolo mecânico mesmo diante de extrema queimação calórica.

TÉCNICAS DE REGULAÇÃO DO COMPORTAMENTO:
• A técnica do Duplo Suspiro: Inspirar duas vezes pelo nariz seguidamente e expirar de forma longa pela boca. Três ciclos acionam o esvaziamento de adrenal do SNC de forma impressionante.
• Focalização Visual: Fixar os olhos em um único ponto geométrico do ambiente durante as séries táticas impede a dispersão da atenção mental.
• Treinamento de Amplitude Emocional: Ver a dor de esforço físico saudável como um aliado no processo de forjar seu legado físico.`,
      author: "Helena Silveira",
      role: "Professora e Facilitadora de Práticas Corporais",
      date: "12 de Abril, 2026",
      readTime: "6 min de leitura",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      likes: 210
    }
  ];

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPosts.includes(id)) {
      setLikedPosts(prev => prev.filter(pId => pId !== id));
    } else {
      setLikedPosts(prev => [...prev, id]);
    }
  };

  const filteredPosts = blogPosts.filter(p => {
    if (activeCategory === "Todos") return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section 
      id="blog" 
      className={`py-28 relative overflow-hidden transition-all duration-1000 border-t ${
        isAuraMode 
          ? "bg-black text-white border-red-500/10" 
          : "bg-slate-950 text-slate-200 border-white/5"
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/35 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block according to aura/ambient mode */}
        {isAuraMode ? (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-red-500/10">
            <div>
              <div className="inline-flex items-center gap-1 bg-red-950/20 border border-red-500/30 text-red-500 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                CONTEÚDOS DE BIO-MECÂNICA CRÍTICA
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none italic">
                RELATÓRIOS DO <span className="text-red-500 glow-accent italic animate-pulse">FRONT CIVIL</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase max-w-sm mt-3 leading-relaxed">
              Estudos empíricos e análises científicas exclusivas elaboradas por médicos e treinadores para elevar o nível de consciência fisiológica dos membros.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-white/5">
            <div>
              <span className="text-accent font-black uppercase tracking-[0.25em] text-xs flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-accent" />
                AURA INTELLECT
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter leading-none text-white">
                CIÊNCIA DA <span className="text-accent glow-accent">PERFORMANCE</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm">
              Artigos técnicos e guias escritos pela nossa equipe de médicos esportivos, nutricionistas de elite e fisiologistas corporais.
            </p>
          </div>
        )}

        {/* Filter Toolbar selection */}
        <div className={`flex flex-wrap items-center gap-2 mb-12 py-3 border-b ${
          isAuraMode ? "border-red-500/5 text-slate-300" : "border-white/5 text-slate-300"
        }`}>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mr-4">FILTRAR ASSUNTOS:</span>
          {["Todos", "Biohacking", "Treino Híbrido", "Nutrição", "Mindset"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveCategory(item)}
              className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                activeCategory === item
                  ? (isAuraMode ? "bg-red-500 text-black shadow-lg shadow-red-500/25 font-extrabold" : "bg-accent text-white shadow-lg shadow-accent/20")
                  : "bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-white/5"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Blog Post cards bento/deck layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`group rounded-[28px] overflow-hidden border transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                  isAuraMode 
                    ? "bg-[#050102] border-red-500/10 hover:border-red-500/40 hover:scale-[1.02]" 
                    : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:scale-[1.02]"
                }`}
              >
                <div>
                  {/* Photo area */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                    
                    {/* Category tag */}
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                      isAuraMode
                        ? "bg-red-500 text-black border-red-500"
                        : "bg-accent text-white border-accent"
                    }`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Body textual information */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-slate-500 text-[9px] font-mono tracking-wider">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm font-black uppercase tracking-tight text-white line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-3 font-medium uppercase tracking-wider">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Footer with author information and likes */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center font-display font-black text-xs text-slate-300">
                      {post.author[0]}
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-200 leading-none">{post.author}</p>
                      <p className="text-[7px] text-zinc-500 mt-0.5 uppercase tracking-widest">{post.role.slice(0, 15)}...</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleLike(post.id, e)}
                      className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-red-500 transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      <span className="font-mono">{isLiked ? post.likes + 1 : post.likes}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* BLOG OVERLAY MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              layoutId={`post-container-${selectedPost.id}`}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className={`relative w-full max-w-3xl border rounded-[40px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto ${
                isAuraMode 
                  ? "bg-[#090203] border-red-500/20 text-slate-100" 
                  : "bg-slate-950 border-white/10 text-slate-200"
              }`}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/60 border border-white/10 hover:border-white/30 text-white z-10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image Header */}
              <div className="relative h-72">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#090203] via-black/30 to-transparent" />
                <span className={`absolute bottom-6 left-6 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  isAuraMode
                    ? "bg-red-500 text-black border-red-500"
                    : "bg-accent text-white border-accent"
                }`}>
                  {selectedPost.category}
                </span>
              </div>

              {/* Content text */}
              <div className="p-8 md:p-12 space-y-6">
                
                {/* Meta details */}
                <div className="flex items-center gap-4 text-slate-500 text-[10px] font-mono tracking-widest uppercase">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedPost.readTime}
                  </span>
                </div>

                {/* Primary Title */}
                <h1 className="text-2xl md:text-4xl font-display font-black uppercase text-white tracking-tight leading-tight">
                  {selectedPost.title}
                </h1>

                {/* Author card bio inside article */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center font-display font-black text-accent text-base">
                    {selectedPost.author[0]}
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-white uppercase tracking-wider">{selectedPost.author}</h5>
                    <p className="text-[8px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">{selectedPost.role}</p>
                  </div>
                </div>

                {/* Content body layout */}
                <div className="text-[12px] text-slate-300 leading-relaxed font-normal whitespace-pre-wrap uppercase tracking-wider space-y-4">
                  {selectedPost.content}
                </div>

                {/* Bottom shares and interactives */}
                <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                  <button
                    onClick={(e) => handleLike(selectedPost.id, e)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${
                      likedPosts.includes(selectedPost.id)
                        ? "bg-red-500/10 border-red-500/30 text-red-500"
                        : "bg-white/5 border-white/5 hover:bg-white/10 text-slate-400"
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    Curtir Relatório
                  </button>

                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Aura Intellect Research © 2026
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
