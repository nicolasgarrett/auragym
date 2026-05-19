import { Instagram, Youtube, Facebook, Mail, MapPin, Clock, Dumbbell } from "lucide-react";
import { useAura } from "../contexts/AuraContext";

interface FooterProps {
  onOpenPrivacy?: () => void;
}

export default function Footer({ onOpenPrivacy }: FooterProps) {
  const { setActiveTab } = useAura();

  const linksMap = [
    { name: "Sobre Nós", href: "#sobre-nos" },
    { name: "Modalidades", href: "#modalidades" },
    { name: "Planos", href: "#planos" },
    { name: "Blog", href: "#blog" }
  ];

  const handleNavLinkClick = (name: string, href: string) => {
    if (name === "Home") {
      setActiveTab("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name === "Sobre Nós") {
      setActiveTab("sobre-nos");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name === "Blog") {
      setActiveTab("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveTab("home");
      const targetId = href.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-accent" />
              <span onClick={() => handleNavLinkClick("Home", "#home")} className="font-display text-2xl font-bold tracking-tighter uppercase italic cursor-pointer">
                Aura<span className="text-accent">Gym</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">
              Elevando o conceito de treinamento físico ao patamar da arte e exclusividade. Onde a ciência encontra o alto rendimento.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/auraperformancegym" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-accent/20 hover:text-accent transition-all duration-300"
                title="AuraGym no Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com/auraperformancegym" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-accent/20 hover:text-accent transition-all duration-300"
                title="Canal do YouTube AuraGym"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/auraperformancegym" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-accent/20 hover:text-accent transition-all duration-300"
                title="Página do Facebook AuraGym"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Links Rápidos</h4>
            <div className="flex flex-col gap-4">
              {linksMap.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => handleNavLinkClick(link.name, link.href)} 
                  className="text-left text-zinc-500 hover:text-white hover:translate-x-1 transition-all text-sm uppercase tracking-tight font-medium cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Localização</h4>
            <div className="space-y-4">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Av.+Paulista,+1200+-+Bela+Vista,+S%C3%A3o+Paulo+-+SP" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-start gap-3 hover:text-slate-200 transition-colors group"
                title="Ver rota no Google Maps"
              >
                <MapPin className="w-5 h-5 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-zinc-500 group-hover:text-zinc-300 text-sm leading-relaxed">
                  Av. Paulista, 1200 Concept Unit <br />
                  Bela Vista, São Paulo - SP
                </p>
              </a>
              <a 
                href="mailto:contato@auragym.com.br" 
                className="flex items-center gap-3 hover:text-slate-200 transition-colors group"
                title="Clique para enviar um e-mail"
              >
                <Mail className="w-5 h-5 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-zinc-500 group-hover:text-zinc-300 text-sm">contato@auragym.com.br</p>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Horários</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-zinc-300 font-bold mb-1">Segunda - Sexta</p>
                  <p className="text-zinc-500">05:00 - 23:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-zinc-300 font-bold mb-1">Sábados & Domingos</p>
                  <p className="text-zinc-500">08:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 uppercase tracking-widest">
          <p>© 2026 Aura Performance Gym. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <button 
              onClick={(e) => { e.preventDefault(); onOpenPrivacy?.(); }}
              className="hover:text-zinc-400 cursor-pointer"
            >
              Privacidade
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); onOpenPrivacy?.(); }}
              className="hover:text-zinc-400 cursor-pointer"
            >
              Termos de Uso
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
