import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw, Clock, Bell, BellOff, Volume2 } from "lucide-react";

interface RestTimerProps {
  initialSeconds?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export default function RestTimer({ initialSeconds = 60, onComplete, autoStart = false }: RestTimerProps) {
  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem("auragym_rest_timer_seconds");
    const endTimestamp = localStorage.getItem("auragym_rest_timer_end");
    
    if (endTimestamp) {
      const remaining = Math.max(0, Math.ceil((parseInt(endTimestamp) - Date.now()) / 1000));
      return remaining;
    }
    return saved ? parseInt(saved) : initialSeconds;
  });
  
  const [isActive, setIsActive] = useState(() => {
    return localStorage.getItem("auragym_rest_timer_active") === "true" || autoStart;
  });
  
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("auragym_rest_timer_muted") === "true";
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playBeep = useCallback(() => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.error("Audio beep failed", e);
    }
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem("auragym_rest_timer_seconds", seconds.toString());
    localStorage.setItem("auragym_rest_timer_active", isActive.toString());
    localStorage.setItem("auragym_rest_timer_muted", isMuted.toString());

    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      
      const endTimestamp = Date.now() + seconds * 1000;
      localStorage.setItem("auragym_rest_timer_end", endTimestamp.toString());
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (seconds === 0 && isActive) {
        setIsActive(false);
        localStorage.removeItem("auragym_rest_timer_end");
        playBeep();
        if (onComplete) onComplete();
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, seconds, onComplete, playBeep, isMuted]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
    localStorage.removeItem("auragym_rest_timer_end");
  };

  const setDuration = (secs: number) => {
    setIsActive(false);
    setSeconds(secs);
    localStorage.removeItem("auragym_rest_timer_end");
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] -mr-16 -mt-16 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-xl">
            <Clock className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white">Cronômetro de Descanso</h3>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Mantenha a intensidade</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`p-2 rounded-xl transition-all ${isMuted ? 'bg-zinc-800 text-zinc-500' : 'bg-accent/20 text-accent'}`}
        >
          {isMuted ? <BellOff className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="text-center mb-8 relative">
        <motion.div 
          key={seconds}
          initial={{ scale: 0.9, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-6xl font-black italic tracking-tighter ${seconds <= 10 && isActive ? 'text-red-500 animate-pulse' : 'text-white'}`}
        >
          {formatTime(seconds)}
        </motion.div>
        {isActive && (
          <motion.div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent/30 rounded-full overflow-hidden"
          >
            <motion.div 
              className="h-full bg-accent"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: seconds, ease: "linear" }}
            />
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[30, 45, 60].map(s => (
          <button
            key={s}
            onClick={() => setDuration(s)}
            className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${seconds === s ? 'bg-accent text-white' : 'bg-white/5 text-zinc-500 hover:bg-white/10'}`}
          >
            {s}s
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-[0.25em] text-[10px] transition-all ${isActive ? 'bg-zinc-800 text-white' : 'bg-white text-black hover:bg-accent hover:text-white'}`}
        >
          {isActive ? <><Pause className="w-4 h-4" /> Pausar</> : <><Play className="w-4 h-4" /> Iniciar</>}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 bg-white/5 rounded-xl hover:bg-white/10 text-zinc-500 hover:text-white transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      
      <AnimatePresence>
        {seconds === 0 && !isActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-accent/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6"
          >
            <Bell className="w-12 h-12 text-white mb-4 animate-bounce" />
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-2">Descanso Finalizado!</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-6">Próxima série agora.</p>
            <button 
              onClick={resetTimer}
              className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
            >
              OK, VOLTAR
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
