import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Music, List, Disc, X, ExternalLink } from "lucide-react";
import { useAura } from "../contexts/AuraContext";
import { motion, AnimatePresence } from "motion/react";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  url: string;
  youtubeUrl?: string;
}

const PHONK_PLAYLIST: Song[] = [
  {
    id: 1,
    title: "TUCA DONKA (PHONK)",
    artist: "CURSEDEV x Dj Playero",
    duration: "2:52",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    youtubeUrl: "https://youtu.be/34Pl2DTuwoQ?si=YtNK_R6YgCnobTju"
  },
  {
    id: 2,
    title: "LÚPUS OVERDRIVE",
    artist: "Alpha Core Beats",
    duration: "6:12",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 3,
    title: "ALPHA INSTINCT",
    artist: "Drift Phonk Syndicate",
    duration: "7:05",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 4,
    title: "CYBER-MATILHA BASSOUT",
    artist: "GigaChad Phonk Lord",
    duration: "5:44",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 5,
    title: "APEX VIP SOBERANO SHOCK",
    artist: "Aura Noise Overdrive",
    duration: "5:02",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  }
];

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false); // Playlist expanded
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false); // Interactive width expansion
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isAuraMode } = useAura();

  const currentSong = PHONK_PLAYLIST[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Play interrupted or failed."));
      }
    }
  }, [currentSongIndex]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("Audio play failed. User interaction is required."));
      }
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PHONK_PLAYLIST.length);
  };

  const handleBack = () => {
    setCurrentSongIndex((prev) => (prev - 1 + PHONK_PLAYLIST.length) % PHONK_PLAYLIST.length);
  };

  const handleSelectTrack = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(e => console.log("Play failed."));
    }, 50);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // The player expands only when clicked/opened manual state or playlist catalog remains active
  const shouldShowOpen = isPlayerExpanded || isExpanded;

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-start gap-3">
      {/* Expanded Catalog Box */}
      <AnimatePresence>
        {shouldShowOpen && isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className={`w-80 rounded-[28px] p-5 border shadow-2xl backdrop-blur-md ${
              isAuraMode 
                ? "bg-[#090203]/95 border-red-500/20 shadow-red-500/5 text-slate-100" 
                : "bg-[#020617]/95 border-[#00ff66]/20 shadow-[#00ff66]/5 text-slate-100"
            }`}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Music className={`w-4 h-4 ${isAuraMode ? 'text-red-500' : 'text-[#00ff66]'}`} />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-100">
                  CATÁLOGO PHONK ELITE
                </h4>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="text-slate-500 hover:text-white text-[9px] font-black uppercase tracking-wider cursor-pointer"
              >
                FECHAR
              </button>
            </div>

            <div className="space-y-2 max-h-44 overflow-y-auto custom-scrollbar">
              {PHONK_PLAYLIST.map((song, idx) => (
                  <button
                    key={song.id}
                    onClick={() => handleSelectTrack(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border text-[10px] flex items-center justify-between transition-all group cursor-pointer ${
                      currentSongIndex === idx 
                        ? (isAuraMode ? "bg-red-500/10 border-red-500/30 text-white" : "bg-[#00ff66]/10 border-[#00ff66]/30 text-white")
                        : "bg-white/[0.02] border-transparent hover:border-white/10 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex-shrink-0">
                        {currentSongIndex === idx && isPlaying ? (
                          <Disc className={`w-3.5 h-3.5 animate-spin ${isAuraMode ? 'text-red-500' : 'text-accent'}`} />
                        ) : (
                          <span className="text-slate-500 font-mono text-[9px]">0{idx + 1}</span>
                        )}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <p className={`font-bold uppercase tracking-wide truncate ${currentSongIndex === idx ? (isAuraMode ? "text-red-400" : "text-accent") : "text-slate-300"}`}>
                            {song.title}
                          </p>
                          {song.youtubeUrl && (
                            <span className="text-[6px] shrink-0 font-extrabold uppercase font-mono px-1 py-0.2 rounded bg-red-500/15 border border-red-500/20 text-red-500 leading-none">
                              YT CLIP
                            </span>
                          )}
                        </div>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest truncate mt-0.5">{song.artist}</p>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors ml-2">
                      {song.duration}
                    </span>
                  </button>
                ))}
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mini Controller Badge */}
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => {
          if (!shouldShowOpen) {
            setIsPlayerExpanded(true);
          }
        }}
        className={`rounded-full border shadow-lg flex items-center p-2.5 backdrop-blur-md overflow-hidden transition-all duration-300 ${
          isAuraMode 
            ? "bg-[#090203]/90 border-red-500/20 text-slate-100" 
            : "bg-[#020617]/90 border-[#00ff66]/15 text-slate-100"
        } ${shouldShowOpen ? "gap-4 pr-4 pl-2.5 rounded-[32px] max-w-lg cursor-default" : "w-14 h-14 justify-center cursor-pointer hover:scale-105 active:scale-95"}`}
      >
        {/* Disc rotation / play trigger (Compact mode view button / Expand triggers) */}
        <button 
          onClick={(e) => {
            if (shouldShowOpen) {
              e.stopPropagation();
              toggleMusic();
            } else {
              // Clicking when collapsed expands instead of toggling play instantly, preventing accidental music starts
              setIsPlayerExpanded(true);
            }
          }}
          className={`rounded-full flex items-center justify-center relative cursor-pointer group shrink-0 ${
            isPlaying 
              ? (isAuraMode ? "bg-red-500/20 text-red-400" : "bg-[#00ff66]/20 text-accent") 
              : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]"
          } ${shouldShowOpen ? "w-11 h-11" : "w-9 h-9 animate-pulse-glow"}`}
          title="Interagir com o Player"
        >
          <Disc className={`w-5 h-5 ${isPlaying ? "animate-spin" : "group-hover:rotate-45 duration-300"}`} />
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-dashed border-current opacity-35 scale-110 animate-spin" style={{ animationDuration: '6s' }} />
          )}
        </button>

        {/* Small Details Block (Only visible when expanded by hover/click) */}
        {shouldShowOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex flex-col pr-1 w-32 md:w-40"
          >
            <div className="flex items-center justify-between">
              <span className="text-[7px] font-black uppercase text-slate-500 tracking-wider font-mono">
                {isAuraMode ? "AURA TRANCE ACTIVE" : "PLAYLIST DA MATILHA"}
              </span>
              {/* Visualizer bars */}
              <div className="flex items-end gap-0.5 h-3 overflow-hidden shrink-0">
                <span className={`w-0.5 rounded-full ${isAuraMode ? 'bg-red-500' : 'bg-[#00ff66]'} duration-300 ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
                <span className={`w-0.5 rounded-full ${isAuraMode ? 'bg-red-500' : 'bg-[#00ff66]'} duration-150 ${isPlaying ? 'h-2.5 animate-pulse' : 'h-0.5'}`} style={{ animationDelay: '100ms' }} />
                <span className={`w-0.5 rounded-full ${isAuraMode ? 'bg-red-500' : 'bg-[#00ff66]'} duration-500 ${isPlaying ? 'h-3.5 animate-pulse' : 'h-1.5'}`} style={{ animationDelay: '200ms' }} />
                <span className={`w-0.5 rounded-full ${isAuraMode ? 'bg-red-500' : 'bg-[#00ff66]'} duration-200 ${isPlaying ? 'h-2 animate-pulse' : 'h-0.5'}`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
            <span className="text-[9.5px] font-black uppercase tracking-tight truncate text-slate-100 flex items-center gap-1">
              {currentSong.title}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
              <span className="text-[7.5px] font-semibold text-slate-500 uppercase tracking-widest truncate">
                {currentSong.artist}
              </span>
              {currentSong.youtubeUrl && (
                <a
                  href={currentSong.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-0.5 text-[6.5px] font-black tracking-widest uppercase px-1 py-0.2 rounded border transition-all ${
                    isAuraMode 
                      ? "text-red-500 border-red-500/20 bg-red-500/5 hover:bg-red-500 hover:text-black hover:border-red-500" 
                      : "text-accent border-accent/20 bg-accent/5 hover:bg-accent hover:text-black hover:border-accent"
                  }`}
                  title="Ver vídeo oficial no YouTube"
                  onClick={(e) => e.stopPropagation()}
                >
                  CLIP <ExternalLink className="w-1.5 h-1.5" />
                </a>
              )}
            </div>

            {/* Core progress bar & duration timer */}
            {isPlaying && (
              <div className="flex items-center gap-1.5 mt-1.5 w-full">
                <span className="text-[7px] font-mono text-slate-500 shrink-0">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleProgressBarChange}
                  className={`w-full h-1 bg-white/[0.07] rounded-full appearance-none outline-none cursor-pointer range-xs ${isAuraMode ? 'accent-red-500' : 'accent-[#00ff66]'}`}
                />
                <span className="text-[7px] font-mono text-slate-500 shrink-0">{formatTime(duration)}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Controls (Only visible when expanded) */}
        {shouldShowOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-0.5"
          >
            <div className="h-6 w-px bg-white/10 mx-1" />
            
            {/* Back song */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleBack(); }} 
              className="p-1 text-slate-500 hover:text-white rounded-lg transition-colors cursor-pointer" 
              title="Música Anterior"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {/* Core play/pause trigger */}
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMusic(); }} 
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                isPlaying ? (isAuraMode ? "text-red-500" : "text-accent") : "text-slate-400 hover:text-white"
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Next song */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }} 
              className="p-1 text-slate-500 hover:text-white rounded-lg transition-colors cursor-pointer" 
              title="Próxima Música"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {/* Expand playlist toggle */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} 
              className={`p-1 rounded-lg transition-colors cursor-pointer ml-1 ${
                isExpanded ? (isAuraMode ? "text-red-500 bg-white/5" : "text-accent bg-white/5") : "text-slate-500 hover:text-white"
              }`}
              title="Mostrar Catálogo Phonk"
            >
              <List className="w-3.5 h-3.5" />
            </button>

            {/* Mute/Unmute */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} 
              className="p-1 text-slate-500 hover:text-white rounded-lg transition-colors cursor-pointer"
              title={isMuted ? "Ativar Áudio" : "Mutar Áudio"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Collapse completely back button */}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setIsPlayerExpanded(false); 
                setIsExpanded(false); 
              }} 
              className="p-1 text-slate-500 hover:text-[#ff3838] rounded-lg transition-colors cursor-pointer ml-1"
              title="Recolher Player"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </motion.div>

      <audio
        ref={audioRef}
        loop
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}
