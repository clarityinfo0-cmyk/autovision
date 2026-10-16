import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CheckCircle2, ShieldCheck, Clock, MessageSquare, Wrench } from 'lucide-react';
import { ServiceItem, BUSINESS_DATA } from '../types';
import { soundManager } from '../utils/audio';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBook
}) => {
  if (!service) return null;

  const isCyan = service.accentColor === 'cyan';

  const handleBookNow = () => {
    soundManager.playClick();
    onBook(service);
  };

  const handleDirectWhatsApp = () => {
    soundManager.playClick();
    const encoded = encodeURIComponent(
      `Hola Jesús Emiliano, vi en tu tarjeta digital el servicio de *${service.title}* y me gustaría pedirte más información o una cotización para mi auto.`
    );
    window.open(`https://wa.me/${BUSINESS_DATA.whatsappClean}?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md max-h-[92vh] sm:max-h-[85vh] bg-slate-950 border-t sm:border border-slate-800 sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-2xl z-10"
        >
          {/* Top grab bar on mobile */}
          <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            type="button"
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-black/90 transition-colors backdrop-blur-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto overflow-x-hidden flex-1 pb-6">
            {/* Hero Image */}
            <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute bottom-3 left-4 right-4">
                <span
                  className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md mb-1.5 ${
                    isCyan
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/40'
                  }`}
                >
                  {service.badge}
                </span>
                <h2
                  className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-tight"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {service.title}
                </h2>
                <p className="text-xs text-slate-300">{service.subtitle}</p>
              </div>
            </div>

            <div className="px-5 pt-3 space-y-4">
              {/* Description */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <p className="text-sm text-slate-200 leading-relaxed">
                  {service.description} Realizamos trabajos garantizados con herramientas de precisión y acabados estéticos de grado exhibición.
                </p>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-3 gap-2">
                {service.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-center text-center"
                  >
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                      {spec.label}
                    </span>
                    <span className="text-xs font-bold text-white mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Lo que incluye este servicio:</span>
                </h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isCyan ? 'text-cyan-400' : 'text-fuchsia-400'
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quality Guarantee Box */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-cyan-950/30 to-blue-950/30 border border-cyan-800/40">
                <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Garantía AutoVisión</p>
                  <p className="text-slate-400">
                    Instalaciones limpias sin cortar cables originales. Cuidamos cada detalle de tu auto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="p-4 pb-safe bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-md flex flex-col gap-2 shrink-0">
            <button
              onClick={handleBookNow}
              type="button"
              className="w-full min-h-[46px] py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer touch-manipulation"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Cita para este Servicio</span>
            </button>

            <button
              onClick={handleDirectWhatsApp}
              type="button"
              className="w-full min-h-[42px] py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/50 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer touch-manipulation"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Preguntar por WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
