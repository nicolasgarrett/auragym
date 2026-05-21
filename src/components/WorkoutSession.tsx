import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dumbbell, CheckCircle2, Play, Flame, TrendingUp, Trophy, History, ArrowRight, Timer } from "lucide-react";
import { useAura } from "../contexts/AuraContext";
import RestTimer from "./RestTimer";

export default function WorkoutSession() {
  const { profile, completeWorkout, isAuraMode } = useAura();
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [setsCompleted, setSetsCompleted] = useState<boolean[]>(new Array(4).fill(false));
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);

  const exercises = [
    { name: "Agachamento Livre", sets: 4, reps: "10-12", load: "80kg" },
    { name: "Leg Press 45°", sets: 4, reps: "12-15", load: "220kg" },
    { name: "Extensora", sets: 3, reps: "15", load: "60kg" },
    { name: "Afundo com Halteres", sets: 3, reps: "12 (cada lado)", load: "20kg" },
  ];

  const currentExercise = exercises[currentExerciseIdx];

  const handleCompleteSet = (idx: number) => {
    const newSets = [...setsCompleted];
    newSets[idx] = !newSets[idx];
    setSetsCompleted(newSets);

    if (!newSets[idx]) return; // If unchecking, don't trigger rest

    // Auto-trigger rest timer as requested
    setShowRestTimer(true);
  };

  const handleNextExercise = () => {
    if (currentExerciseIdx < exercises.length - 1) {
      setCurrentExerciseIdx(prev => prev + 1);
      setSetsCompleted(new Array(exercises[currentExerciseIdx + 1].sets).fill(false));
      setShowRestTimer(false);
    } else {
      setIsWorkoutFinished(true);
    }
  };

  const handleFinishWorkout = async () => {
    await completeWorkout();
    setIsWorkoutFinished(false);
    setCurrentExerciseIdx(0);
    setSetsCompleted(new Array(4).fill(false));
  };

  if (isWorkoutFinished) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-zinc-900 border border-accent/20 rounded-[3rem] p-12 text-center shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Trophy className="w-12 h-12 text-accent" />
          </div>
          
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-4">Treino Finalizado!</h2>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest leading-relaxed mb-10">
            Excelente performance. Você empurrou seus limites hoje. Sincronize seu progresso com a matilha.
          </p>

          <button
            onClick={handleFinishWorkout}
            className="w-full py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-95"
          >
            Confirmar Conclusão
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-10 md:pb-20 lg:grid lg:grid-cols-12 gap-6 md:gap-10">
      {/* Session Controls */}
      <div className="lg:col-span-8 space-y-6 md:space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 md:pb-8 border-b border-white/5 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isAuraMode ? 'bg-aura/10 text-aura' : 'bg-accent/10 text-accent'} text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-4 border border-current/20`}>
              <Play className="w-3 h-3 fill-current" /> SESSÃO ATIVA: PROTOCOLO {isAuraMode ? 'AURA-X' : 'REGULAR'}
            </div>
            <h1 className="text-3xl md:text-6xl font-display font-black uppercase italic tracking-tighter leading-none">
              TREINO DE <span className={isAuraMode ? 'text-aura' : 'text-accent'}>PERNAS</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white/[0.03] p-4 md:p-4 rounded-[2rem] md:rounded-3xl border border-white/5 w-full md:w-auto">
            <div className="text-left flex-1 md:flex-none">
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 block">Tempo Total</span>
              <span className="text-xl font-mono font-bold text-white tracking-tighter">00:42:15</span>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl">
              <History className="w-5 h-5 text-zinc-400" />
            </div>
          </div>
        </header>

        {/* Current Exercise Card */}
        <motion.div 
          key={currentExerciseIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-900/40 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 md:mb-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">Exercício {currentExerciseIdx + 1} de {exercises.length}</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black uppercase italic tracking-tighter text-white">{currentExercise.name}</h2>
            </div>
            <div className="grid grid-cols-3 md:flex items-center gap-3 w-full md:w-auto">
                <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/5 text-center flex-1">
                  <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Séries</span>
                  <span className="text-lg font-black text-white leading-none">{currentExercise.sets}</span>
                </div>
                <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/5 text-center flex-1">
                  <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Reps</span>
                  <span className="text-lg font-black text-white leading-none">{currentExercise.reps}</span>
                </div>
                <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/5 text-center flex-1">
                  <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Carga</span>
                  <span className="text-lg font-black text-accent leading-none">{currentExercise.load}</span>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
            {setsCompleted.map((done, i) => (
              <button
                key={i}
                onClick={() => handleCompleteSet(i)}
                className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all flex flex-col items-center justify-center gap-3 md:gap-4 group ${done ? 'bg-accent/10 border-accent text-accent' : 'bg-white/[0.02] border-white/10 text-zinc-500 hover:bg-white/[0.05] hover:border-white/20'}`}
              >
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Série {i + 1}</span>
                {done ? (
                  <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 fill-accent text-black" />
                ) : (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xs md:text-sm font-black">{i + 1}</span>
                  </div>
                )}
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest opacity-50">{done ? 'CONCLUÍDA' : 'PENDENTE'}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleNextExercise}
            disabled={!setsCompleted.every(Boolean)}
            className="w-full py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black"
          >
            {currentExerciseIdx === exercises.length - 1 ? 'Finalizar Treino' : 'Próximo Exercício'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Global Progress */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-black uppercase tracking-widest text-zinc-300">Intensidade: <span className="text-white">92%</span></span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-xs font-black uppercase tracking-widest text-zinc-300">Volume Total: <span className="text-white">3,240 kg</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Sincronização Lúpus Ativa</span>
          </div>
        </div>
      </div>

      {/* Side Utilities */}
      <div className="lg:col-span-4 space-y-8">
        <div className="sticky top-32 space-y-8">
          <AnimatePresence>
            {showRestTimer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-accent flex items-center gap-2">
                    <Timer className="w-4 h-4" /> JANELA DE RECUPERAÇÃO
                  </h3>
                  <button onClick={() => setShowRestTimer(false)} className="text-zinc-600 hover:text-white text-[9px] font-black uppercase tracking-widest">Fechar</button>
                </div>
                <RestTimer autoStart={true} onComplete={() => setShowRestTimer(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          <aside className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-6">Status da Matilha</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">XP Ganho Hoje</p>
                  <p className="text-xl font-black text-white italic tracking-tighter">+850 XP</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </div>
              
              <div className="h-px bg-white/5" />
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Progresso do Nível</span>
                  <span className="text-[9px] font-mono font-bold text-accent">LVL {profile?.level || 1}</span>
                </div>
                <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[65%]" />
                </div>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-3">
                <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 text-center">
                  <span className="text-[18px] font-black text-white italic">🔥 {profile?.streak || 0}</span>
                  <p className="text-[7px] font-black uppercase tracking-widest text-zinc-500 mt-1">Ofensiva</p>
                </div>
                <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 text-center">
                  <span className="text-[18px] font-black text-white italic">🏆 {profile?.badges?.length || 0}</span>
                  <p className="text-[7px] font-black uppercase tracking-widest text-zinc-500 mt-1">Conquistas</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
