import React, { useState, useEffect } from "react";
import { useAura } from "../contexts/AuraContext";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Zap, AlertTriangle, Eye, Activity, Terminal } from "lucide-react";

export default function AuraOverrideTransition() {
  const { isAuraMode } = useAura();
  const [showOverride, setShowOverride] = useState(false);
  const [bootLogIndex, setBootLogIndex] = useState(0);

  const logs = [
    "LOG: CARREGANDO HARDWARE DE BIOFEEDBACK...",
    "LOG: SINCRONIZANDO IMPLANTES CARDIOVASCULARES...",
    "LOG: ESTABELECENDO MATE DE DADOS COM NÚCLEO LÚPUS...",
    "LOG: ATENTANDO NÍVEL METABÓLICO DE MATILHA...",
    "LOG: CARREGANDO PROTOCOLOGIA DE TREINO HÍBRIDO...",
    "WARNING: LIMITE CARDÍACO OVERRIDE REMOVIDO",
    "LOG: REALIDADE AUMENTADA AURA ATIVA // FOCO 100%"
  ];

  useEffect(() => {
    if (isAuraMode) {
      setShowOverride(true);
      setBootLogIndex(0);

      // Play tech sound
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const playBeep = (freq: number, startTime: number, duration: number) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.05, startTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
          osc.start(startTime);
          osc.stop(startTime + duration);
        };

        // Sequence of tech beeps
        for (let i = 0; i < 12; i++) {
          const startTime = audioCtx.currentTime + (i * 0.08);
          playBeep(600 + Math.random() * 1200, startTime, 0.05);
          // Random static noise bursts
          if (Math.random() > 0.5) {
            playBeep(200 + Math.random() * 300, startTime + 0.02, 0.02);
          }
        }
        // Digital sweep
        const sweepOsc = audioCtx.createOscillator();
        const sweepGain = audioCtx.createGain();
        sweepOsc.connect(sweepGain);
        sweepGain.connect(audioCtx.destination);
        sweepOsc.type = 'sawtooth';
        sweepOsc.frequency.setValueAtTime(50, audioCtx.currentTime);
        sweepOsc.frequency.exponentialRampToValueAtTime(3000, audioCtx.currentTime + 1.5);
        sweepGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        sweepGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
        sweepOsc.start();
        sweepOsc.stop(audioCtx.currentTime + 1.5);

      } catch (e) {
        console.warn("Audio Context blocked or unsupported");
      }
      
      // Step through log indexes rapidly
      const interval = setInterval(() => {
        setBootLogIndex(prev => {
          if (prev < logs.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 250);

      const timeout = setTimeout(() => {
        setShowOverride(false);
      }, 2400);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setShowOverride(false);
    }
  }, [isAuraMode]);

  return (
    <AnimatePresence>
      {showOverride && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-[#030000] flex flex-col items-center justify-center p-6 text-white overflow-hidden font-mono"
        >
          {/* Glowing Red Vignette Background */}
          <div className="absolute inset-0 opacity-90" style={{ backgroundImage: "radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 70%, #1c0205 100%)" }} />
          
          {/* Horizontal lines and TV screen static sweep */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_8px,_6px_100%]" />

          {/* Animated Tech UI corners */}
          <div className="absolute top-8 left-8 border-t-2 border-l-2 border-red-500 w-12 h-12" />
          <div className="absolute top-8 right-8 border-t-2 border-r-2 border-red-500 w-12 h-12" />
          <div className="absolute bottom-8 left-8 border-b-2 border-l-2 border-red-500 w-12 h-12" />
          <div className="absolute bottom-8 right-8 border-b-2 border-r-2 border-red-500 w-12 h-12" />

          {/* Core Content Box */}
          <div className="relative z-10 max-w-xl w-full text-center space-y-8 flex flex-col items-center">
            {/* Warning Alarm Header */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 px-4 py-2 border border-red-500/35 bg-red-950/20 rounded-full text-red-500 text-[9px] font-black tracking-[0.3em] uppercase animate-pulse"
            >
              <AlertTriangle className="w-4.5 h-4.5 animate-bounce" />
              SISTEMA BIO-CRÍTICO DETECTADO
            </motion.div>

            {/* Glowing Biofeedback Icon Grid */}
            <div className="relative my-4">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 w-24 h-24 bg-red-600/20 rounded-full filter blur-xl -translate-x-3 -translate-y-3"
              />
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-18 h-18 border border-dashed border-red-500/40 rounded-full flex items-center justify-center"
              >
                <div className="w-14 h-14 border border-red-500/20 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-red-500 fill-red-500" />
                </div>
              </motion.div>
            </div>

            {/* Simulated Neural Link Pulse */}
            <div className="space-y-2 text-center w-full">
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-wider text-red-500 scale-x-105 select-none drop-shadow-[0_0_8px_rgba(255,42,0,0.5)]">
                AURA OVERDRIVE
              </h2>
              <p className="text-[10px] uppercase text-red-400/60 tracking-[0.25em] font-bold">
                MODO DE FOCO NEUROSENSORIAL ATIVADO
              </p>
            </div>

            {/* Scrolling logs console */}
            <div className="w-full bg-[#050000] border border-red-500/10 rounded-2xl p-5 text-left h-36 flex flex-col justify-between overflow-hidden shadow-2xl relative">
              <div className="absolute top-2 right-4 flex items-center gap-1.5 opacity-40">
                <Terminal className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[7.5px] font-bold tracking-widest text-red-500 uppercase">SYS_LOGS</span>
              </div>
              <div className="space-y-1 overflow-hidden">
                {logs.slice(Math.max(0, bootLogIndex - 3), bootLogIndex + 1).map((log, index) => {
                  const isWarning = log.startsWith("WARNING");
                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`text-[9.5px] uppercase tracking-wide truncate ${
                        isWarning ? "text-red-500 font-extrabold" : "text-slate-400 font-semibold"
                      }`}
                    >
                      {log}
                    </motion.p>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="pt-4 border-t border-red-500/5 mt-3">
                <div className="flex justify-between text-[8px] font-bold tracking-widest text-red-500/60 uppercase mb-2">
                  <span>OVERCLOCKING BIOLÓGICO</span>
                  <span>{Math.round(((bootLogIndex + 1) / logs.length) * 100)}%</span>
                </div>
                <div className="h-1 w-full bg-red-950/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((bootLogIndex + 1) / logs.length) * 100}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </div>
            </div>

            {/* Security Disclaimer */}
            <div className="flex items-center gap-3 text-left w-full max-w-sm pt-4 border-t border-red-500/10">
              <Shield className="w-8 h-8 text-red-500/70 shrink-0" />
              <p className="text-[8.5px] text-slate-500 uppercase tracking-wider leading-relaxed">
                Ao prosseguir, você concorda que o biofeedback e a realidade aumentada de alta frequência exigirão rendimento cardíaco supremo.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
