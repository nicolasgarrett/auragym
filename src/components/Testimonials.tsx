import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ricardo Santos",
      role: "Atleta Profissional",
      content: "A infraestrutura da Aura é incomparável. Os equipamentos da technogym mudaram meu nível de treino.",
      image: "https://i.pravatar.cc/150?img=11"
    },
    {
      name: "Juliana Mendes",
      role: "Empresária",
      content: "O ambiente é exclusivo e o acompanhamento nutricional faz toda a diferença na minha rotina corrida.",
      image: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Marcus Vinícius",
      role: "Membro Black",
      content: "Melhor investimento que fiz na minha saúde. A Aura não é apenas uma academia, é um estilo de vida.",
      image: "https://i.pravatar.cc/150?img=12"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-zinc-950 px-4 md:px-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Prova Social</span>
          <h2 className="text-3xl md:text-4xl font-display font-black uppercase italic mt-2 tracking-tighter">
            O QUE DIZEM NOSSOS <span className="text-accent">MEMBROS ELITE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white/5 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-colors flex flex-col justify-between"
            >
              <Quote className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-12 md:h-12 text-accent/10 transition-transform group-hover:scale-110" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <p className="text-zinc-300 text-sm md:text-base italic mb-8 md:mb-10 font-light leading-relaxed md:pr-8">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-accent/20 overflow-hidden shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-tight">{t.name}</h4>
                    <p className="text-accent text-[9px] md:text-[10px] font-black uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
