import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ricardo Santos",
      role: "Atleta Profissional",
      content: "A infraestrutura da Aura é incomparável. Os equipamentos da technogym mudaram meu nível de treino.",
      image: "https://i.pravatar.cc/150?u=ricardo"
    },
    {
      name: "Juliana Mendes",
      role: "Empresária",
      content: "O ambiente é exclusivo e o acompanhamento nutricional faz toda a diferença na minha rotina corrida.",
      image: "https://i.pravatar.cc/150?u=juliana"
    },
    {
      name: "Marcus Vinícius",
      role: "Membro Black",
      content: "Melhor investimento que fiz na minha saúde. A Aura não é apenas uma academia, é um estilo de vida.",
      image: "https://i.pravatar.cc/150?u=marcus"
    }
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs">Prova Social</span>
          <h2 className="text-4xl font-display font-black uppercase italic mt-2 tracking-tighter">
            O QUE DIZEM NOSSOS <span className="text-accent">MEMBROS ELITE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[32px] bg-white/5 border border-white/10 relative"
            >
              <Quote className="absolute top-8 right-8 w-8 h-8 text-accent/20" />
              <p className="text-zinc-300 italic mb-8 font-light leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border border-accent/50" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-tight">{t.name}</h4>
                  <p className="text-accent text-[10px] font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
