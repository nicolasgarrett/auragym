import React, { useState } from "react";
import { ShoppingBag, ChevronRight, Check, Dumbbell, Flame, Sparkles, Star, Zap } from "lucide-react";
import { useAura } from "../contexts/AuraContext";
import AuthModal from "./AuthModal";
import { motion, AnimatePresence } from "motion/react";

interface Product {
  id: number;
  name: string;
  tagline: string;
  category: "Suplementação" | "Acessórios" | "Tecnologia";
  price: number;
  rating: number;
  image: string;
  description: string;
  benefits: string[];
  specs: string;
}

const PREMIUM_BIO_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "LÚPUS OVERDRIVE PRE-WORKOUT",
    tagline: "Foco Termogênico de Matilha",
    category: "Suplementação",
    price: 149.90,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
    description: "Formulado para dilatar canais de energia e fornecer foco neural absoluto. Perfeito para quebrar plateaus de carga.",
    benefits: ["Beta-Alanina pura para tamponamento", "Cafeína anidra de liberação gradual", "L-Arginina para super vascularização"],
    specs: "Pote 300g // Sabor Frutas Silvestres & Menta"
  },
  {
    id: 2,
    name: "WHEY ISO-PROTEIN GRASS-FED COCOA",
    tagline: "Ultra Absorb Hipertrofia Pura",
    category: "Suplementação",
    price: 189.90,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600",
    description: "Proteína isolada purificada a frio derivada de gado alimentado a pasto. Absorção celular instantânea e digestibilidade 100%.",
    benefits: ["26g de proteína de altíssima pureza por porção", "BCAA 6.2g integrado para reconstrução", "Adoçado com Stévia orgânica pura"],
    specs: "Pote de 900g // Cacau Belga Premium"
  },
  {
    id: 3,
    name: "TRACKER BIO-RING AURA PRO",
    tagline: "Métricas Anatômicas Em Tempo Real",
    category: "Tecnologia",
    price: 349.00,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600",
    description: "Anel biométrico em titânio que lê sua frequência cardíaca, variabilidade cardíaca (HRV), temperatura cutânea e ciclos de sono regenerativo.",
    benefits: ["Sincronismo direto com APP AuraGym", "Carregamento magnético rápido premium", "À prova de água em treinos molhados"],
    specs: "Titânio Escovado Aeroespacial // Bateria para 7 dias"
  },
  {
    id: 4,
    name: "CREATINA APEX REINFORCED ATP",
    tagline: "Aumento Máximo de Potência Muscular",
    category: "Suplementação",
    price: 89.90,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600",
    description: "Monohidratada de altíssima micronização. Hidrata as fibras musculares promovendo força volumétrica densa.",
    benefits: ["Volumização celular imediata", "Aumento visível de carga no supino e agachamento", "Sem retenção hídrica subcutânea"],
    specs: "Pote de 300g // Pureza Certificada CREAPURE"
  },
  {
    id: 5,
    name: "FAIXAS DE DESEMPENHO TITAN HÍBRIDO",
    tagline: "Estabilidade Total de Agachamento Articular",
    category: "Acessórios",
    price: 79.90,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600",
    description: "Suporte elástico de compressão vulcanizada focado em proteger patelas e ligamentos nas cargas de elite.",
    benefits: ["Tecnologia de fibra elástica de compressão extrema", "Fechamento Ultra-Velcro de segurança", "Previne lesões e maximiza a força no Squat"],
    specs: "Par de faixas 2m // Material Antifúngico"
  },
  {
    id: 6,
    name: "COQUETELEIRA TÉRMICA INOX MATILHA",
    tagline: "Sua Nutrição na Temperatura Extrema",
    category: "Acessórios",
    price: 119.90,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=600",
    description: "Garante que sua suplementação, shakes ou água permaneçam criogenicamente gelados. Design premium com gravação a laser Lúpus.",
    benefits: ["Parede dupla a vácuo em inox 18/8", "Misturador helicoidal em mola interna", "Livre de bisfenol A (BPA Free)"],
    specs: "750ml // Preto Fosco com detalhes Neon"
  }
];

export default function StoreSection() {
  const { isAuraMode, user, openCheckout } = useAura();
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const categories = ["Todos", "Suplementação", "Acessórios", "Tecnologia"];

  const filteredProducts = activeCategory === "Todos" 
    ? PREMIUM_BIO_PRODUCTS 
    : PREMIUM_BIO_PRODUCTS.filter(p => p.category === activeCategory);

  const handleBuy = (product: Product) => {
    if (!user) {
      setIsAuthOpen(true);
    } else {
      setSelectedProduct(product);
      setPurchaseSuccess(false);
    }
  };

  const confirmPurchase = () => {
    setPurchaseSuccess(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setPurchaseSuccess(false);
    }, 2500);
  };

  return (
    <section id="bio-produtos" className={`py-16 md:py-24 transition-colors duration-1000 ${isAuraMode ? 'bg-black text-white' : 'bg-slate-950/20 text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div className="text-center md:text-left">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] border ${
              isAuraMode ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-[#00ff66]/10 text-[#00ff66] border-[#00ff66]/20"
            }`}>
              <Sparkles className="w-3 h-3 animate-pulse" />
              DESENVOLVIMENTO BIO-OTIMIZADO
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter mt-3 leading-tight text-white">
              ECOSSISTEMA <span className={isAuraMode ? 'text-red-500' : 'text-accent'}>DE PRODUTOS ELITE</span>
            </h2>
            <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-wider mt-3 md:mt-2 max-w-xl mx-auto md:mx-0">
              Equipamentos, suplementos de alto rendimento e tecnologias biomecânicas selecionadas cientificamente para guiar o seu desenvolvimento físico.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? (isAuraMode 
                        ? "bg-red-500 text-black border-red-500" 
                        : "bg-[#00ff66] text-black border-[#00ff66]")
                    : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className={`group relative rounded-[28px] md:rounded-[36px] overflow-hidden border transition-all duration-500 ${
                isAuraMode 
                  ? "bg-[#0c0506]/85 border-red-500/10 hover:border-red-500/30 shadow-[0_4px_30px_rgba(255,51,51,0.03)]" 
                  : "bg-slate-900/40 border-white/5 hover:border-[#00ff66]/30 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
              }`}
            >
              {/* Product Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                  isAuraMode ? "bg-red-500 text-black" : "bg-[#00ff66] text-black"
                }`}>
                  {p.category}
                </span>
                {p.rating === 5.0 && (
                  <span className="bg-amber-400 text-black px-2 py-0.5 rounded-full text-[7px] font-black tracking-widest flex items-center gap-1">
                    <Star className="w-2 h-2 fill-current" /> APEX REVIEWED
                  </span>
                )}
              </div>

              {/* Product Image Box */}
              <div className="h-56 relative overflow-hidden bg-slate-950">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 duration-700 opacity-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>

              {/* Product Contents */}
              <div className="p-6 flex flex-col justify-between h-[300px]">
                <div>
                  <p className="text-[7.5px] font-black uppercase tracking-[0.25em] text-slate-500 font-mono">
                    {p.tagline}
                  </p>
                  <h3 className="text-base font-black uppercase text-white tracking-wide mt-1.5 leading-tight group-hover:text-accent transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed font-medium line-clamp-3">
                    {p.description}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="mt-4 space-y-1.5">
                    {p.benefits.slice(0, 2).map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full ${isAuraMode ? 'bg-red-500' : 'bg-accent'}`} />
                        <span className="text-[9.5px] font-bold uppercase tracking-wide text-slate-400 truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer specs / price & action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[8px] font-semibold text-slate-500 block uppercase tracking-widest leading-none mb-1">PREÇO EXCLUSIVO</span>
                    <span className={`text-lg font-black tracking-tight ${isAuraMode ? 'text-red-400' : 'text-accent'}`}>
                      R$ {p.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleBuy(p)}
                    className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                      isAuraMode 
                        ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-black hover:border-red-500" 
                        : "bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-black hover:border-accent"
                    }`}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    ADQUIRIR
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Product Detail & Mock Checkout Dialog */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 backdrop-blur-md bg-black/80">
            <div className={`w-full max-w-lg rounded-[40px] border p-8 relative overflow-hidden ${
              isAuraMode ? "bg-[#0e0405] border-red-500/30 text-white" : "bg-[#020617] border-white/10 text-white"
            }`}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
              
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                X
              </button>

              {purchaseSuccess ? (
                <div className="text-center py-12 flex flex-col items-center justify-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-bounce ${
                    isAuraMode ? "bg-red-500/20 text-red-500" : "bg-accent/20 text-accent"
                  }`}>
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                    SOLICITAÇÃO DE LEGADO ENVIADA!
                  </h3>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mt-4 max-w-sm">
                    Separamos o seu lote de <span className="text-white font-bold">{selectedProduct.name}</span>! Nosso concierge entrará em contato para agendar a retirada em mãos na unidade Paulista ou entrega VIP.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-slate-500 font-mono text-[8px] font-black uppercase tracking-[0.2em]">{selectedProduct.tagline}</span>
                    <h3 className="text-xl font-black uppercase italic tracking-tight mt-1 text-white">{selectedProduct.name}</h3>
                    <p className="text-[10px] font-mono font-black text-slate-500 uppercase mt-0.5">{selectedProduct.specs}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                      {selectedProduct.description}
                    </p>
                    <div className="space-y-2 mt-2 pt-2 border-t border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Benefícios Chave para seu Legado:</p>
                      {selectedProduct.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-3 w-3 text-accent shrink-0" />
                          <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wide">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[8px] text-slate-500 font-black block uppercase tracking-widest">SUBTOTAL</span>
                      <span className="text-2xl font-black text-white">R$ {selectedProduct.price.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={confirmPurchase}
                      className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer ${
                        isAuraMode 
                          ? "bg-red-500 text-black hover:bg-red-400 shadow-[0_0_20px_rgba(255,0,0,0.25)]" 
                          : "bg-accent text-black hover:bg-white shadow-[0_0_20px_rgba(0,255,102,0.25)]"
                      }`}
                    >
                      CONFIRMAR EXPEDIÇÃO
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
