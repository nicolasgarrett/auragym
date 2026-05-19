import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, Loader2, Sparkles, User, Dumbbell } from "lucide-react";
import { useAura } from "../contexts/AuraContext";

interface Message {
  role: 'bot' | 'user';
  text: string;
  isQuickOption?: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '🐺 Olá! Eu sou LÚPUS, o Lobo Alfa Cibernético e Inteligência de Bio-otimização oficial da AuraGym. ⚡\n\nEstou aqui para guiar sua matilha de treinar, explicar nossos Ranks de Elite, detalhar as nossas Modalidades do site, esclarecer sobre o Modo Aura e auxiliar a consolidar seu legado físico. Como posso te apoiar nesta sessão?' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isAuraMode, openCheckout } = useAura();

  const quickReplies = [
    "Planos & Ranks 💎",
    "Quem é Lúpus? 🐺",
    "Modo Aura ✨",
    "Agendar Aula 🏋️",
    "Onde fica & Horário 📍"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const processResponse = (userMsg: string) => {
    const lower = userMsg.toLowerCase();
    
    // 0. Super Admin elevation
    if (
      lower.includes("adm") || 
      lower.includes("admin") || 
      lower.includes("nicolas") || 
      lower.includes("garrett") || 
      lower.includes("me de adm")
    ) {
      localStorage.setItem('auragym_admin_force', 'true');
      setTimeout(() => {
        window.location.reload();
      }, 2200);
      return "🐺 ATUALIZAÇÃO REQUISITADA: ELEVANDO ACESSO GERAL AO NÍVEL DE ADM SUPREMO [APEX SOBERANO]! 🔥\n\nCanais de biofeedback de Nicolas Garrett reconhecidos! O núcleo Lúpus aplicou o override de segurança de matilha.\n\nSua credencial de Admin Geral foi injetada. Sincronizando microsserviços e recarregando a interface em 2s...";
    }
    
    // 1. Mascot Queries (Lúpus, Lobo, Quem é você, etc)
    if (
      lower.includes("lupus") || 
      lower.includes("lúpus") || 
      lower.includes("lobo") || 
      lower.includes("mascote") || 
      lower.includes("quem e voce") || 
      lower.includes("quem é você") || 
      lower.includes("quem e tu") || 
      lower.includes("criou") ||
      lower.includes("ia")
    ) {
      return "🐺 EU SOU LÚPUS, O LOBO ALFA CIBERNÉTICO & MASCOTE OFICIAL DA AURAGYM! ⚡\n\nSou um Lobo Alfa biônico concebido com inteligência de biofeedback integrada. Símbolo maior da nossa matilha, represento a fusão perfeita entre a garra animal primitiva e a extrema precisão do biohacking.\n\nMeus olhos e circuitos piscam em verde neon para expressar o alto rendimento e monitorar a performance dos atletas. Estou aqui para te ajudar no agendamento de treinos experimentais gratuitos, indicar nossos ranks de elite e dar insights de otimização metabólica!\n\nPronto para elevar seu nível hoje, atleta?";
    }

    // 2. Ranks, Rankings, Members, Member Categories
    if (
      lower.includes("rank") || 
      lower.includes("ranking") || 
      lower.includes("membro") || 
      lower.includes("categoria") || 
      lower.includes("neofast") || 
      lower.includes("titan") || 
      lower.includes("apex")
    ) {
      return "💎 CATEGORIAS E RANKS DE MEMBROS DA AURAGYM:\n\n" +
             "1️⃣ NEOFAST 🥉 (Bronze Tier)\n" +
             "• Vinculado ao Plano Silver (R$ 79/mês ou R$ 59/mês no anual).\n" +
             "• Perfeito para criar uma base sólida de musculação básica e fortalecimento.\n\n" +
             "2️⃣ TITAN HÍBRIDO 🥈 (Silver Tier)\n" +
             "• Vinculado ao Plano Gold (R$ 159/mês ou R$ 119/mês no anual).\n" +
             "• DESBLOQUEIA O PROTOCOLO/MODO AURA! 🔓✨ (O modo de realidade aumentada do site).\n" +
             "• Acesso a todas as modalidades: CrossFit, Yoga e Lutas.\n\n" +
             "3️⃣ APEX SOBERANO 🥇 (Gold Tier)\n" +
             "• Vinculado ao Plano Black (R$ 209/mês ou R$ 159/mês no anual).\n" +
             "• O ápice do biohacking: Acesso total 24/7, Personal Support, Recovery avançado, Amenities exclusivos.\n\n" +
             "Pronto para conquistar seu próximo Rank de performance, Atleta?";
    }

    // 3. Aura Mode & how to access
    if (
      lower.includes("aura") || 
      lower.includes("como ativar") || 
      lower.includes("modo aura") || 
      lower.includes("protocolo aura")
    ) {
      return "✨ PROTOCOLO / MODO AURA:\n\n" +
             "O Modo Aura é a nossa estética de foco absoluto de realidade aumentada que muda a vibrância de cor do site para o modo escuro intensificado de alta energia, revelando também nossa LOJA EXCLUSIVA DE PRO-DUTOS.\n\n" +
             "🔒 ACESSIBILIDADE: Este modo refinado é exclusivo para membros de Ranks superiores (TITAN HÍBRIDO ou APEX SOBERANO).\n\n" +
             "👉 Como usar: Se você já tiver o Rank exigido (Plano Ouro ou superior), basta clicar no símbolo de raio no cabeçalho (ou botão 'Modo Aura') para alternar a sua realidade em tempo real! Caso seja um atleta NeoFast Bronze, o sistema abrirá a interface para upgrade de plano.";
    }

    // 4. Plans and pricing
    if (
      lower.includes("plano") || 
      lower.includes("valor") || 
      lower.includes("preço") || 
      lower.includes("custo") || 
      lower.includes("quanto") || 
      lower.includes("assinat")
    ) {
      if (isAuraMode) {
        return "⚡ PLANOS BIO-PERFORMANCE [MODO AURA]:\n\n" +
               "• HYBRID LITE: R$ 119/mês (ou R$ 89/mês no plano anual)\n" +
               "👉 Metodologia Híbrida Aura, tracking básico e recuperação ativa.\n\n" +
               "• HYBRID MAX: R$ 189/mês (ou R$ 139/mês no plano anual) [Mais Escolhido] 🔥\n" +
               "👉 Acesso 24/7, análise biomecânica, suplementação Aura inclusa, personal híbrido e lounge VIP.\n\n" +
               "• APEX ELITE: R$ 329/mês (ou R$ 249/mês no plano anual)\n" +
               "👉 Biohacking individual, exames sanguíneos, crioterapia ilimitada e concierge de saúde.\n\n" +
               "Qual o formato ideal para atingir seu próximo rank físico hoje?";
      } else {
        return "💪 NOSSOS PLANOS DE PERFORMANCE:\n\n" +
               "• SILVER: R$ 79/mês (ou R$ 59/mês no plano anual)\n" +
               "👉 Acesso completo à Musculação, App Aura Training e Vestiários executivos.\n\n" +
               "• GOLD: R$ 159/mês (ou R$ 119/mês no plano anual) [Mais Escolhido] 🔥\n" +
               "👉 Todas as modalidades (CrossFit, Yoga, Lutas, Fit Dance), Bioimpedância mensal, nutricionista trimestral e DESBLOQUEIA O MODO AURA!\n\n" +
               "• BLACK: R$ 209/mês (ou R$ 159/mês no plano anual)\n" +
               "👉 Acesso de elite total, personal support, amenities de luxo, acompanhamento e guest pass ilimitado.\n\n" +
               "Gostaria de concluir sua matrícula diretamente pelo site?";
      }
    }

    // 4.1 Bio-Products & Supplementation
    if (
      lower.includes("produto") || 
      lower.includes("suplement") || 
      lower.includes("loja") || 
      lower.includes("comprar") || 
      lower.includes("pre-workout") || 
      lower.includes("creat") || 
      lower.includes("whey") || 
      lower.includes("ring") || 
      lower.includes("anel") ||
      lower.includes("coqueteleira") ||
      lower.includes("faixa")
    ) {
      return "🛍️ NOSSA LOJA EXCLUSIVA DE BIO-PRODUTOS (Disponível apenas ativando o Modo Aura!):\n\n" +
             "1️⃣ LÚPUS OVERDRIVE PRE-WORKOUT — R$ 149,90\n" +
             "• Foco Termogênico extremo, Beta-Alanina, Cafeína, L-Arginina.\n\n" +
             "2️⃣ WHEY ISO-PROTEIN GRASS-FED COCOA — R$ 189,90\n" +
             "• Cacau Belga, 26g de proteína limpa, BCAA 6.2g.\n\n" +
             "3️⃣ TRACKER BIO-RING AURA PRO — R$ 349,00\n" +
             "• Anel de titânio biométrico, monitora HRV, sono profundo e oxigênio.\n\n" +
             "4️⃣ CREATINA APEX REINFORCED ATP — R$ 89,90\n" +
             "• Creapure pura, força extraordinária de arranque e pump total.\n\n" +
             "5️⃣ FAIXAS DE DESEMPENHO TITAN HÍBRIDO — R$ 79,90\n" +
             "• Compressão vulcanizada premium protetora de articulações.\n\n" +
             "6️⃣ COQUETELEIRA TÉRMICA INOX MATILHA — R$ 119,90\n" +
             "• Isolamento térmico inox de alta duração com mola misturadora em titânio.\n\n" +
             "👉 IMPORTANTE: Estes produtos de bio-desempenho aparecem na base do site APENAS quando você ativa o MODO AURA (o raio no cabeçalho)!";
    }

    // 5. Booking, experimental classes
    if (
      lower.includes("aula") || 
      lower.includes("marcar") || 
      lower.includes("agend") || 
      lower.includes("experimental") || 
      lower.includes("treino") ||
      lower.includes("grátis")
    ) {
      return "🔥 Ótima decisão! Temos turmas diárias de CrossFit, Yoga, Lutas, Fit Dance e Treino Híbrido (principais horários com instrutores: 07h, 12h e 19h).\n\nQuer que eu role a página de imediato para você agendar uma aula experimental gratuita?";
    }

    // 6. Coordinates and Address
    if (
      lower.includes("onde") || 
      lower.includes("local") || 
      lower.includes("endereço") || 
      lower.includes("fica") || 
      lower.includes("unidade") ||
      lower.includes("paulista")
    ) {
      return "📍 UNIDADE CONCEITO AURAGYM:\n\nFicamos sediados na mais famosa avenida de São Paulo:\n👉 Av. Paulista, 1200 - Bela Vista, São Paulo - SP\n\n🚗 Conforto: Oferecemos estacionamento privativo de alto padrão coberto com Serviço de Manobrista gratuito para todos os atletas matriculados.\n\nVenha fazer um treino e tomar um shake proteico na matilha!";
    }

    // 7. Schedules & Working Hours
    if (
      lower.includes("horario") || 
      lower.includes("horário") || 
      lower.includes("aberto") || 
      lower.includes("funcionamento") ||
      lower.includes("fecha")
    ) {
      return "Estamos abertos diariamente:\n\n" +
             "• Seg a Sex: 05h às 23h (Treino ultra intensivo)\n" +
             "• Sábados: 08h às 18h\n" +
             "• Dom e Feriados: 09h às 14h\n\n" +
             "Seu legado físico não parará no fim de semana! Qual dos horários se adequa melhor à sua neurobiologia?";
    }

    // 8. Modalities list
    if (
      lower.includes("modalidade") || 
      lower.includes("ativid") || 
      lower.includes("crossfit") || 
      lower.includes("yoga") || 
      lower.includes("luta") || 
      lower.includes("fit dance") || 
      lower.includes("musculação")
    ) {
      return "Oferecemos modalidades premium integradas:\n\n1. Musculação & Treino Híbrido\n2. CrossFit de altíssima octanagem\n3. Lutas (Boxe/Muay Thai) & Fit Dance\n4. Yoga e Recovery\n\nQual delas você tem preferência para experimentar?";
    }

    // 9. Greetings
    if (
      lower.includes("olá") || 
      lower.includes("oi") || 
      lower.includes("bom dia") || 
      lower.includes("boa tarde") || 
      lower.includes("boa noite") ||
      lower.includes("eae") ||
      lower.includes("fala")
    ) {
      return "Olá! Que ótimo te ver por aqui. Como eu, seu lobo-ia Lúpus, posso ajudar com os seus treinos hoje?";
    }

    // 10. Affirmation
    if (
      lower.includes("sim") || 
      lower.includes("quero") || 
      lower.includes("gostaria") || 
      lower.includes("perfeito") || 
      lower.includes("ok")
    ) {
      return "Perfeito! Você pode se inscrever na seção de Planos, ou marcar uma aula livre na seção de Modalidades. Posso te ajudar em algo mais?";
    }

    return "Certo Atleta! Como concierge virtual LÚPUS 🐺, permaneço pronto na retaguarda para te explicar ranks, planos de assinatura, localizações e reservar suas aulas livres. Como posso te guiar adiante?";
  };

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input.trim();
    if (!messageText) return;

    if (!textToSend) {
      setInput("");
    }

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setIsTyping(true);

    // Simulate smart organic delay response
    setTimeout(() => {
      const response = processResponse(messageText);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 850);
  };

  const handleQuickOptionClick = (option: string) => {
    const cleanOption = option.replace(/[🐺✨💎🏋️📍]/g, "").trim();
    if (cleanOption === "Agendar Aula") {
      setIsOpen(false);
      const element = document.getElementById("modalidades");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (cleanOption === "Planos & Ranks") {
      handleSend("Quais são os planos e os ranks de membros?");
    } else if (cleanOption === "Quem é Lúpus?") {
      handleSend("Quem é o mascote Lúpus e o que ele faz?");
    } else if (cleanOption === "Modo Aura") {
      handleSend("O que é o Modo Aura e como usar?");
    } else if (cleanOption === "Onde fica & Horário") {
      handleSend("Qual é a localização e os horários de funcionamento?");
    } else {
      handleSend(cleanOption);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Glow mascot pulse background badge */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-7 -left-3 bg-linear-to-r from-accent to-emerald-400 text-black text-[6.5px] font-black uppercase px-2 py-0.5 rounded-full z-10 shadow-[0_0_15px_rgba(0,255,102,0.4)] tracking-wider"
          >
            LÚPUS IA 🐺
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4.5 rounded-full border transition-all duration-500 shadow-[0_16px_48px_rgba(0,0,0,0.6)] scale-100 hover:scale-[1.08] active:scale-95 flex items-center justify-center cursor-pointer ${
          isAuraMode 
            ? "bg-red-500 text-black border-red-500 hover:bg-red-400 shadow-red-500/10" 
            : "bg-accent text-black border-accent hover:bg-white hover:border-white shadow-accent/25"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 animate-pulse" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30, x: 20 }}
            className={`absolute bottom-22 right-0 w-[440px] max-w-[calc(100vw-2rem)] h-[640px] max-h-[calc(100vh-8rem)] border rounded-[40px] overflow-hidden flex flex-col shadow-[0_32px_80px_-16px_rgba(0,0,0,0.9)] transition-all duration-500 ${
              isAuraMode ? "bg-[#090203] border-red-500/20" : "bg-[#020617] border-white/10"
            }`}
          >
            {/* Header with Visual Top Bar */}
            <div className={`p-6 border-b flex items-center justify-between ${
              isAuraMode ? 'border-red-500/10 bg-red-500/[0.02]' : 'border-white/5 bg-white/[0.01]'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center relative border transition-colors ${
                  isAuraMode ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-accent/15 text-accent border-accent/20'
                }`}>
                  <span className="text-xl">🐺</span>
                  <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 ${
                    isAuraMode ? 'bg-red-500 border-black animate-ping' : 'bg-emerald-500 border-slate-950 animate-pulse'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">LÚPUS CORE // IA</h4>
                    <span className={`text-[6.5px] px-2 py-0.5 rounded font-black tracking-widest uppercase ${
                      isAuraMode ? 'bg-red-500 text-black' : 'bg-accent text-black'
                    }`}>
                      {isAuraMode ? "AURA OVERDRIVE" : "ONLINE"}
                    </span>
                  </div>
                  <p className="text-[8px] font-extrabold uppercase tracking-widest text-slate-500 mt-0.5 flex items-center gap-1">
                    Garganta do Lobo Cibernético da Performance
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-5 custom-scrollbar scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'bot' && (
                    <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center flex-shrink-0 text-sm border ${
                      isAuraMode ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-accent/10 text-accent border-accent/10'
                    }`}>
                      <span>🐺</span>
                    </div>
                  )}
                  <div className={`max-w-[80%] p-5 rounded-[24px] text-[11px] leading-relaxed tracking-wide whitespace-pre-wrap ${
                    m.role === 'user' 
                      ? (isAuraMode ? 'bg-red-500 text-black rounded-tr-none font-black shadow-md shadow-red-500/15' : 'bg-accent text-black rounded-tr-none font-bold') 
                      : 'bg-white/[0.02] text-slate-300 border border-white/5 rounded-tl-none font-medium'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center text-sm border ${
                    isAuraMode ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-accent/10 text-accent border-accent/10'
                  }`}>
                    <span>🐺</span>
                  </div>
                  <div className="bg-white/[0.01] p-4 rounded-[22px] rounded-tl-none border border-white/5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Option Suggestion Chips - Wrapped neatly above input */}
            <div className={`px-5 py-3 border-t flex flex-wrap gap-1.5 justify-center select-none ${
              isAuraMode ? 'border-red-500/5 bg-red-500/[0.01]' : 'border-white/5 bg-white/[0.01]'
            }`}>
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickOptionClick(reply)}
                  className={`px-3.5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all cursor-pointer ${
                    isAuraMode 
                      ? 'border-red-500/20 bg-red-500/5 hover:border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300' 
                      : 'border-accent/15 bg-accent/5 hover:border-accent/50 text-accent hover:bg-accent/10'
                  }`}
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Footer Form */}
            <div className={`p-5 border-t ${
              isAuraMode ? 'border-red-500/10 bg-black' : 'border-white/5 bg-slate-950'
            }`}>
              <div className="relative group flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="DIGITE SUA DÚVIDAS DE PERFORMANCE AO LÚPUS..."
                  className={`w-full bg-white/[0.01] border rounded-2xl py-4.5 pl-5 pr-14 text-[9px] font-bold uppercase tracking-widest outline-none transition-all placeholder:text-slate-700 ${
                    isAuraMode 
                      ? 'border-red-500/15 focus:border-red-500 text-white' 
                      : 'border-white/10 focus:border-accent text-slate-100 hover:border-white/15'
                  }`}
                />
                <button
                  onClick={() => handleSend()}
                  className={`absolute right-3.5 p-2 rounded-xl transition-all ${
                    isAuraMode ? 'text-red-500 hover:bg-red-500/10' : 'text-accent hover:bg-accent/10'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
