import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Eye } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onOpenDetails: (service: ServiceItem) => void;
  onBookAppointment: (service: ServiceItem) => void;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onOpenDetails,
  onBookAppointment,
  index
}) => {
  const isCyan = service.accentColor === 'cyan';

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenDetails(service);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookAppointment(service);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
      className={`group relative flex flex-col justify-between rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-black/95 backdrop-blur-md transition-all duration-300 hover:shadow-lg ${
        isCyan
          ? 'border border-cyan-400/70 hover:border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
          : 'border border-fuchsia-500/70 hover:border-pink-400 shadow-[0_0_12px_rgba(217,70,239,0.25)]'
      }`}
    >
      {/* Ambient background glow inside card */}
      <div
        className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none ${
          isCyan ? 'bg-cyan-500/20' : 'bg-fuchsia-500/20'
        }`}
      />

      <div className="relative flex flex-col w-full">
        {/* Clickable Image Showcase */}
        <div
          onClick={handleImageClick}
          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group/img border border-white/10 bg-slate-950 shadow-inner"
          title={`Ver detalles de ${service.title}`}
        >
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-108 group-hover/img:brightness-110"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = 'true';
                target.src = `/images/${service.id}.jpg`;
              }
            }}
          />

          {/* Scrim overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Badge */}
          <div className="absolute top-1.5 left-1.5 z-10">
            <span
              className={`px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-md backdrop-blur-md shadow-sm ${
                isCyan
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-400/40'
                  : 'bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-400/40'
              }`}
            >
              {service.badge}
            </span>
          </div>

          {/* Clickable hint icon */}
          <div className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/70 border border-white/20 text-white/90 text-[10px] backdrop-blur-md opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
            <Eye className="w-3 h-3 text-cyan-300" />
            <span className="text-[9px] font-medium tracking-tight">Ver foto</span>
          </div>

          {/* Hover Shimmer Line */}
          <div className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-sweep" />
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-2.5 flex flex-col flex-grow">
          {/* Title */}
          <h3
            onClick={handleImageClick}
            className={`font-black text-xs sm:text-[13px] tracking-tight leading-tight uppercase cursor-pointer hover:underline ${
              isCyan
                ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                : 'text-fuchsia-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]'
            }`}
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            {service.title}
          </h3>

          {/* Description matching exact text from user picture */}
          <p className="mt-1 text-[11px] sm:text-[11.5px] leading-snug text-slate-300 font-normal line-clamp-2">
            {service.description}
          </p>
        </div>
      </div>

      {/* "Agendar Cita" Button matching user image */}
      <div className="relative mt-2 pt-1 w-full">
        <button
          onClick={handleBookClick}
          type="button"
          className="w-full min-h-[40px] py-2 px-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-cyan-400/80 hover:border-cyan-300 text-cyan-300 hover:text-white font-bold text-[11px] sm:text-xs tracking-wide shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
        >
          <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">Agendar Cita</span>
        </button>
      </div>
    </motion.div>
  );
};
