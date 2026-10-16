import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { AutoVisionLogo } from './AutoVisionLogo';
import { TechParticles } from './TechParticles';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'dark' | 'drl' | 'ignition' | 'reveal' | 'ready'>('dark');
  const [isMuted, setIsMuted] = useState(!soundManager.isEnabled);
  const TOTAL_DURATION_MS = 6000;
  const [timeLeft, setTimeLeft] = useState(6);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Sequence timing calibrated for exactly 6.0 seconds of premium flow
    const t1 = setTimeout(() => {
      setPhase('drl');
    }, 800);

    const t2 = setTimeout(() => {
      setPhase('ignition');
      soundManager.playEngineStartup();
    }, 2000);

    const t3 = setTimeout(() => {
      setPhase('reveal');
    }, 3400);

    const t4 = setTimeout(() => {
      setPhase('ready');
    }, 4800);

    // Auto-advance after exactly 6 seconds (6000ms)
    const t5 = setTimeout(() => {
      onComplete();
    }, TOTAL_DURATION_MS);

    // Progress bar & countdown ticker
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / TOTAL_DURATION_MS) * 100, 100);
      setProgress(pct);
      const remainingSeconds = Math.max(0, Math.ceil((TOTAL_DURATION_MS - elapsed) / 1000));
      setTimeLeft(remainingSeconds);
    }, 50);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearInterval(interval);
    };
  }, [onComplete]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const active = soundManager.toggleSound();
    setIsMuted(!active);
    if (active) {
      soundManager.playEngineStartup();
    }
  };

  const handleSkipOrEnter = () => {
    soundManager.playClick();
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black text-white overflow-hidden p-6 select-none cursor-pointer"
        onClick={handleSkipOrEnter}
      >
        {/* Floating Cyber Dust and Sparks */}
        <TechParticles count={28} />

        {/* Ambient Top Controls */}
        <div className="w-full flex items-center justify-between z-20 max-w-md pt-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] font-semibold tracking-wider text-cyan-300 uppercase">
              AutoVisión Experience ({timeLeft}s)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              type="button"
              className="p-2 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors backdrop-blur-md"
              title={isMuted ? 'Activar Sonido' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSkipOrEnter();
              }}
              type="button"
              className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-full backdrop-blur-md transition-all active:scale-95"
            >
              Saltar
            </button>
          </div>
        </div>

        {/* Center Automotive Stage */}
        <div className="relative w-full max-w-sm flex flex-col items-center justify-center my-auto">
          {/* Sports Car Front Grille & Headlight Silhouette */}
          <div className="relative w-full flex flex-col items-center">
            {/* Projector Beams */}
            <div className="relative w-full h-36 flex items-center justify-between px-6">
              {/* Left Headlight */}
              <div className="relative flex items-center justify-center">
                {/* DRL light bar */}
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: phase !== 'dark' ? 1 : 0,
                    width: phase !== 'dark' ? 64 : 0
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-cyan-200 rounded-full shadow-[0_0_15px_#22d3ee]"
                />
                {/* Main Laser Lens */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: phase === 'ignition' || phase === 'reveal' || phase === 'ready' ? [0.8, 1.3, 1] : 0,
                    opacity: phase === 'ignition' || phase === 'reveal' || phase === 'ready' ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-5 h-5 rounded-full bg-white shadow-[0_0_35px_#06b6d4,0_0_70px_#38bdf8] border border-cyan-200"
                />
                {/* Left Headlight Beam Cone */}
                {(phase === 'ignition' || phase === 'reveal' || phase === 'ready') && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0, 0.8, 0.45], scaleY: 1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-12 -left-16 w-44 h-48 pointer-events-none origin-bottom-right rotate-[25deg] bg-gradient-to-t from-cyan-400/40 via-cyan-300/10 to-transparent blur-xl"
                  />
                )}
              </div>

              {/* Center Automotive Grille Silhouette & Neon Badge */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-2 bg-slate-900 border-b border-cyan-500/40 rounded-sm mb-1" />
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
              </div>

              {/* Right Headlight */}
              <div className="relative flex items-center justify-center">
                {/* DRL light bar */}
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: phase !== 'dark' ? 1 : 0,
                    width: phase !== 'dark' ? 64 : 0
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-1.5 bg-gradient-to-l from-transparent via-cyan-400 to-cyan-200 rounded-full shadow-[0_0_15px_#22d3ee]"
                />
                {/* Main Laser Lens */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: phase === 'ignition' || phase === 'reveal' || phase === 'ready' ? [0.8, 1.3, 1] : 0,
                    opacity: phase === 'ignition' || phase === 'reveal' || phase === 'ready' ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-5 h-5 rounded-full bg-white shadow-[0_0_35px_#ec4899,0_0_70px_#f43f5e] border border-pink-200"
                />
                {/* Right Headlight Beam Cone */}
                {(phase === 'ignition' || phase === 'reveal' || phase === 'ready') && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0, 0.8, 0.45], scaleY: 1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-12 -right-16 w-44 h-48 pointer-events-none origin-bottom-left -rotate-[25deg] bg-gradient-to-t from-pink-500/40 via-pink-400/10 to-transparent blur-xl"
                  />
                )}
              </div>
            </div>

            {/* Ground underglow reflection */}
            <motion.div
              animate={{
                opacity: phase !== 'dark' ? [0.3, 0.7, 0.5] : 0,
                scale: phase !== 'dark' ? [0.95, 1.05, 1] : 0.9
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="w-64 h-8 -mt-6 bg-gradient-to-r from-cyan-500/30 via-pink-500/30 to-cyan-500/30 blur-2xl rounded-full"
            />
          </div>

          {/* Logo Reveal with Shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: phase === 'reveal' || phase === 'ready' ? 1 : 0,
              y: phase === 'reveal' || phase === 'ready' ? 0 : 20
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-col items-center text-center"
          >
            <AutoVisionLogo size="lg" />

            {/* Owner Pill Tagline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-3 px-4 py-1 rounded-full border border-cyan-400/50 bg-cyan-950/40 text-cyan-300 text-xs font-medium tracking-wide shadow-[0_0_12px_rgba(6,182,212,0.3)] backdrop-blur-md"
            >
              Jesús Emiliano Espinoza Velázquez
            </motion.div>

            <p className="mt-2 text-xs text-slate-400 tracking-wider font-light">
              CAR AUDIO · ILUMINACIÓN LED · POLARIZADO CERÁMICO
            </p>
          </motion.div>
        </div>

        {/* Bottom CTA / Action */}
        <div className="w-full max-w-sm flex flex-col items-center gap-3 z-20 pb-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSkipOrEnter}
            className="relative w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2 overflow-hidden group border border-cyan-300/40"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Entrar a la Tarjeta ({timeLeft}s)</span>
          </motion.button>

          {/* Micro Progress Bar for 6 seconds */}
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-500 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="w-full flex items-center justify-between text-[10px] text-slate-400 px-1 font-mono">
            <span>Iniciando en {timeLeft}s</span>
            <span>Toca para ingresar</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
