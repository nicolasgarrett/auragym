import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronRight, X, UserCheck } from 'lucide-react';
import { useAura } from '../contexts/AuraContext';

export default function AttendanceCalendar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuraMode, currentRank } = useAura();

  React.useEffect(() => {
    // Intentionally left empty to prevent layout shift that was bugging the scroll progress bar
  }, [isOpen]);

  // Mock attendance data for May 2026
  const attendanceDays = [
    2, 4, 6, 7, 9, 11, 13, 16, 18, 20, 21, 23, 25, 26
  ];

  const currentDate = new Date(2026, 4, 26); // May 26, 2026
  const monthName = "Maio 2026";
  const daysInMonth = 31;
  const firstDayOfMonth = new Date(2026, 4, 1).getDay(); // 0 = Sunday

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <>
      <div className="fixed top-24 left-0 z-40">
        <button 
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-3 py-3 rounded-r-2xl border-y border-r border-l-0 shadow-2xl transition-all duration-300 md:hover:pl-4 group ${
            isAuraMode 
              ? 'bg-black border-red-500/30 text-white hover:bg-zinc-900 shadow-red-500/10' 
              : 'bg-black border-accent/30 text-white hover:bg-zinc-900 shadow-accent/10'
          }`}
        >
          <Calendar className={`w-5 h-5 ${isAuraMode ? 'text-red-500' : 'text-accent'} group-hover:scale-110 transition-transform`} />
          <div className="hidden md:block text-left mr-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Presença</p>
            <p className={`text-[11px] font-bold mt-0.5 ${isAuraMode ? 'text-red-400' : 'text-accent'}`}>{attendanceDays.length} Dias</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 left-0 w-[85%] md:w-[400px] h-full z-[70] border-r shadow-[30px_0_60px_rgba(0,0,0,0.8)] overflow-y-auto ${
                isAuraMode ? 'bg-[#090203] border-red-500/20' : 'bg-[#020617] border-accent/20'
              }`}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${isAuraMode ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-accent/10 border-accent/20 text-accent'}`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">Sua Frequência</h2>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{monthName}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className={`p-5 rounded-2xl border mb-8 flex items-center justify-between ${
                  isAuraMode ? 'bg-red-500/5 border-red-500/20' : 'bg-accent/5 border-accent/20'
                }`}>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Dias Treinados</p>
                    <div className="flex items-end gap-2">
                      <span className={`text-4xl font-black italic tracking-tighter leading-none ${isAuraMode ? 'text-red-500' : 'text-accent'}`}>
                        {attendanceDays.length}
                      </span>
                      <span className="text-xs font-bold text-slate-500 mb-1">/ {daysInMonth}</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl ${isAuraMode ? 'bg-red-500/10' : 'bg-accent/10'}`}>
                    <UserCheck className={`w-8 h-8 ${isAuraMode ? 'text-red-500' : 'text-accent'}`} />
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="mb-4 grid grid-cols-7 gap-1 text-center">
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                    <div key={i} className="text-[10px] font-black uppercase text-slate-500 py-2">
                      {day}
                    </div>
                  ))}
                  
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2" />
                  ))}

                  {daysArray.map((day) => {
                    const isAttended = attendanceDays.includes(day);
                    const isToday = day === currentDate.getDate();
                    
                    return (
                      <div key={day} className="p-1">
                        <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                          isAttended 
                            ? (isAuraMode 
                                ? 'bg-red-500 text-black shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                                : 'bg-accent text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]')
                            : isToday 
                              ? 'border-2 border-slate-500 text-white'
                              : 'bg-white/5 text-slate-400'
                        }`}>
                          {day}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Rank Atual</h3>
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${currentRank.bgClass} ${currentRank.borderClass}`}>
                    <div>
                      <p className={`text-xs font-black uppercase tracking-widest ${currentRank.textClass}`}>
                        {currentRank.name}
                      </p>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">
                        Múltiplicador XP: {currentRank.multiplier}x
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
