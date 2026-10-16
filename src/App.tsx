import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  QrCode,
  Phone,
  RotateCcw,
  UserPlus,
  MapPin,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SERVICES_LIST } from './data/services';
import { BUSINESS_DATA, ServiceItem } from './types';
import { AutoVisionLogo } from './components/AutoVisionLogo';
import { ServiceCard } from './components/ServiceCard';
import { IntroAnimation } from './components/IntroAnimation';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { BookingModal } from './components/BookingModal';
import { QRCodeModal } from './components/QRCodeModal';
import { TechParticles } from './components/TechParticles';
import { downloadVCard } from './utils/vcard';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [phoneFrameMode, setPhoneFrameMode] = useState<'iphone' | 'android' | 'fluid'>('iphone');

  const handleOpenBooking = (service?: ServiceItem) => {
    setBookingService(service || null);
    setIsBookingOpen(true);
  };

  const handleDirectWhatsApp = () => {
    const message = encodeURIComponent(
      'Hola Jesús Emiliano, me pongo en contacto desde tu tarjeta digital AutoVisión para solicitar información.'
    );
    window.open(`https://wa.me/${BUSINESS_DATA.whatsappClean}?text=${message}`, '_blank');
  };

  const handleDirectCall = () => {
    window.open(`tel:${BUSINESS_DATA.whatsappNumber}`, '_self');
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen bg-[#03060f] text-slate-100 flex flex-col items-center justify-center p-0 sm:p-4 select-none relative overflow-x-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-fuchsia-600/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 tire-track-pattern opacity-60" />
      </div>

      {/* Intro Car Headlights Startup Animation */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      {/* Desktop Helper Device Switcher (Visible on desktop to test iPhone/Android fit) */}
      <div className="hidden lg:flex items-center gap-2 mb-3 z-20 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-xs text-slate-400 shadow-md">
        <span className="text-[11px] font-semibold text-slate-300">Modo de visualización:</span>
        <button
          onClick={() => setPhoneFrameMode('iphone')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
            phoneFrameMode === 'iphone'
              ? 'bg-cyan-500 text-black font-bold shadow-sm'
              : 'hover:text-white'
          }`}
        >
          iPhone Pro
        </button>
        <button
          onClick={() => setPhoneFrameMode('android')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
            phoneFrameMode === 'android'
              ? 'bg-cyan-500 text-black font-bold shadow-sm'
              : 'hover:text-white'
          }`}
        >
          Android Galaxy
        </button>
        <button
          onClick={() => setPhoneFrameMode('fluid')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
            phoneFrameMode === 'fluid'
              ? 'bg-cyan-500 text-black font-bold shadow-sm'
              : 'hover:text-white'
          }`}
        >
          Pantalla Completa
        </button>
      </div>

      {/* MAIN DIGITAL BUSINESS CARD CONTAINER */}
      {/* Recreates exactly the phone screen from user's image */}
      <main
        className={`relative z-10 w-full transition-all duration-300 ${
          phoneFrameMode === 'iphone'
            ? 'sm:max-w-[420px]'
            : phoneFrameMode === 'android'
            ? 'sm:max-w-[430px]'
            : 'max-w-md'
        } min-h-screen sm:min-h-[844px] flex flex-col justify-between`}
      >
        {/* The Card Shell with Neon Dual-Gradient Border */}
        <div className="relative w-full min-h-[100dvh] sm:min-h-[844px] bg-[#05070e] sm:rounded-[42px] border-0 sm:border-[2.5px] border-cyan-400/90 shadow-[0_0_30px_rgba(6,182,212,0.35),0_0_60px_rgba(217,70,239,0.2)] overflow-y-auto sm:overflow-hidden no-scrollbar flex flex-col justify-between p-3 sm:p-4.5 pt-safe pb-safe overscroll-y-contain">
          {/* Subtle Outer Neon Rim Gradient Effect */}
          <div className="absolute inset-0 pointer-events-none rounded-[40px] border border-fuchsia-500/30 opacity-70" />

          {/* Background Carbon & Tire Subtle Texture inside card */}
          <div className="absolute inset-0 bg-carbon pointer-events-none opacity-90" />
          <div className="absolute inset-0 tire-track-pattern pointer-events-none opacity-40" />

          {/* Floating Luxury Tech Sparks & Stardust */}
          <TechParticles count={35} />

          {/* CARD TOP TOOLBAR / UTILITIES */}
          <div className="relative z-20 flex items-center justify-between pb-1.5 px-1 border-b border-white/5">
            {/* Quick Location Hint */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate max-w-[150px]">Guasave, Sinaloa</span>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-1.5">
              {/* QR Scan Button */}
              <button
                onClick={() => setIsQROpen(true)}
                type="button"
                className="p-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-950 transition-colors cursor-pointer shadow-sm active:scale-95"
                title="Escanear Código QR"
              >
                <QrCode className="w-3.5 h-3.5" />
              </button>

              {/* Save Contact Button */}
              <button
                onClick={() => downloadVCard()}
                type="button"
                className="p-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer shadow-sm active:scale-95"
                title="Guardar Contacto"
              >
                <UserPlus className="w-3.5 h-3.5" />
              </button>

              {/* Replay Intro Animation */}
              <button
                onClick={handleReplayIntro}
                type="button"
                className="p-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-pink-400 transition-colors cursor-pointer shadow-sm active:scale-95"
                title="Repetir animación de luces de auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CARD HEADER: AutoVisión Logo + Jesús Emiliano Espinoza Velázquez */}
          <div className="relative z-20 flex flex-col items-center text-center mt-1 mb-2.5">
            {/* Top decorative dual neon arch framing the logo, matching original picture */}
            <div className="w-full flex items-center justify-between px-2 mb-1 pointer-events-none opacity-85">
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-400 to-cyan-300 shadow-[0_0_10px_#22d3ee] rounded-full" />
              <div className="h-[2px] w-24 bg-gradient-to-l from-transparent via-pink-500 to-rose-400 shadow-[0_0_10px_#ec4899] rounded-full" />
            </div>

            {/* AutoVisión Logo Badge matching reference image */}
            <AutoVisionLogo size="md" />

            {/* Owner Name Pill matching image: "Jesús Emiliano Espinoza Velázquez" */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-2.5 px-4 py-1 rounded-full border-2 border-cyan-400/90 bg-slate-950/90 shadow-[0_0_16px_rgba(6,182,212,0.45),inset_0_0_8px_rgba(6,182,212,0.25)] backdrop-blur-md flex items-center justify-center"
            >
              <span className="text-[12px] sm:text-[13px] font-bold text-white tracking-wide">
                Jesús Emiliano Espinoza Velázquez
              </span>
            </motion.div>
          </div>

          {/* 2x2 SERVICES GRID matching user image */}
          <div className="relative z-20 grid grid-cols-2 gap-2 sm:gap-2.5 my-auto">
            {SERVICES_LIST.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={idx}
                onOpenDetails={(s) => setSelectedService(s)}
                onBookAppointment={(s) => handleOpenBooking(s)}
              />
            ))}
          </div>

          {/* BOTTOM SECTION: PRIMARY WHATSAPP BUTTON + QUICK ACTIONS */}
          <div className="relative z-20 mt-3 pt-1 flex flex-col gap-2 shrink-0">
            {/* Main Glowing WhatsApp CTA Button matching user photo */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDirectWhatsApp}
              type="button"
              className="relative w-full py-3 sm:py-3.5 px-4 rounded-full bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white font-extrabold text-xs sm:text-[13px] tracking-wider uppercase border-2 border-emerald-300/80 shadow-[0_0_25px_rgba(37,211,102,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2.5 overflow-hidden group cursor-pointer"
            >
              {/* Shimmer light pass */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-sweep pointer-events-none" />

              {/* Authentic WhatsApp Icon */}
              <div className="p-1 rounded-full bg-white/20 text-white flex items-center justify-center">
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>

              <span>CONTACTAR POR WHATSAPP</span>
            </motion.button>

            {/* Quick Secondary Actions: Agendar Cita + Llamar */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleOpenBooking()}
                type="button"
                className="py-2 px-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate">Agendar Cita</span>
              </button>

              <button
                onClick={handleDirectCall}
                type="button"
                className="py-2 px-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">Llamar Directo</span>
              </button>
            </div>

            {/* Contact Micro Info */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-1 border-t border-white/5">
              <span>{BUSINESS_DATA.hours}</span>
              <button
                onClick={() => setIsQROpen(true)}
                className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <QrCode className="w-3 h-3" />
                <span>Ver QR</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL 1: SERVICE DETAILS (Click on any image) */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={(srv) => {
          setSelectedService(null);
          handleOpenBooking(srv);
        }}
      />

      {/* MODAL 2: WHATSAPP APPOINTMENT BOOKING */}
      <BookingModal
        isOpen={isBookingOpen}
        initialService={bookingService}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* MODAL 3: DYNAMIC QR CODE & CONTACT DOWNLOAD */}
      <QRCodeModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
      />
    </div>
  );
}
