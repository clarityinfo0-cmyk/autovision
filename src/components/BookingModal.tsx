import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  Send,
  Car,
  Clock,
  User,
  MessageSquare,
  MapPin,
  Home,
  Wrench,
  Check,
  AlertCircle
} from 'lucide-react';
import { ServiceItem, BUSINESS_DATA } from '../types';
import { SERVICES_LIST } from '../data/services';

interface BookingModalProps {
  isOpen: boolean;
  initialService?: ServiceItem | null;
  onClose: () => void;
}

const ALL_SERVICES_OPTION = {
  id: 'all',
  title: 'COTIZACIÓN GENERAL / PAQUETE COMPLETO',
  badge: 'PAQUETE COMPLETO',
  accentColor: 'cyan' as const
};

// Specific sub-services mapped to each category
const SERVICE_WORK_TYPES: Record<string, string[]> = {
  'car-audio': [
    'Suministro e Instalación Completa (Equipo de taller incluido)',
    'Solo Mano de Obra / Instalación (Ya tengo mi equipo)',
    'Instalación de Subwoofer / Bajo y Amplificador',
    'Calibración de Audio, Ajuste de DSP y Ecualización',
    'Insonorización Acústica (Puertas / Cajuela) y Cajón a la Medida'
  ],
  'luces-led': [
    'Suministro e Instalación de Focos LED Canbus (Equipo del taller)',
    'Solo Instalación de Focos LED (Ya cuento con los focos)',
    'Instalación de Proyectores / Lupas Bi-LED o Láser',
    'Tiras DRL Dinámicas / Luces Diurnas Secuenciales',
    'Iluminación Ambiental Interior Oculta (Estilo Mercedes / Audi)',
    'Faros de Niebla y Barras LED'
  ],
  'polarizados': [
    'Suministro e Instalación Nanocerámica Completa (Todos los vidrios)',
    'Polarizado Laterales y Medallón Trasero',
    'Parabrisas Delantero Térmico Nanocerámico (Control solar)',
    'Retiro de Polarizado Viejo / Dañado + Instalación Nueva',
    'Tono Privacidad 5% / Medio 20% / Claro 35% / 70% Térmico'
  ],
  'accesorios': [
    'Suministro e Instalación de Volante de Fibra de Carbono',
    'Instalación de Accesorios Deportivos (Pedales, Pomos, Paletas)',
    'Kits de Accesorios Interiores, Fundas de Llave y Aromatizantes',
    'Búsqueda y Cotización de Accesorio Especial Bajo Pedido'
  ],
  'all': [
    'Paquete Premium Completo (Audio + Luces LED + Polarizado)',
    'Revisión Integral y Cotización de Varios Trabajos',
    'Cotización para Flotilla o Más de un Vehículo'
  ]
};

// 1-Hour difference appointment slots
const ONE_HOUR_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM'
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  initialService,
  onClose
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService ? initialService.id : 'all'
  );
  const [selectedWorkType, setSelectedWorkType] = useState<string>('');
  const [serviceLocation, setServiceLocation] = useState<'taller' | 'domicilio'>('taller');
  const [homeAddress, setHomeAddress] = useState('');
  const [clientName, setClientName] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [dateMode, setDateMode] = useState<'quick' | 'picker'>('quick');
  const [quickDay, setQuickDay] = useState('Hoy mismo');
  const [customDate, setCustomDate] = useState('');
  const [preferredHourSlot, setPreferredHourSlot] = useState(ONE_HOUR_SLOTS[1]); // Default 10:00 AM - 11:00 AM
  const [notes, setNotes] = useState('');

  // Keep synced if initialService changes
  useEffect(() => {
    if (initialService) {
      setSelectedServiceId(initialService.id);
      const works = SERVICE_WORK_TYPES[initialService.id] || [];
      setSelectedWorkType(works[0] || '');
    } else {
      setSelectedServiceId('all');
      setSelectedWorkType(SERVICE_WORK_TYPES['all'][0]);
    }
  }, [initialService, isOpen]);

  // Update default work type whenever service changes
  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const works = SERVICE_WORK_TYPES[serviceId] || [];
    setSelectedWorkType(works[0] || '');
  };

  if (!isOpen) return null;

  const currentService =
    selectedServiceId === 'all'
      ? ALL_SERVICES_OPTION
      : SERVICES_LIST.find((s) => s.id === selectedServiceId) || SERVICES_LIST[0];

  const availableWorkTypes = SERVICE_WORK_TYPES[selectedServiceId] || [];

  const getEffectiveDate = () => {
    if (dateMode === 'picker' && customDate) {
      return customDate;
    }
    return quickDay;
  };

  const buildWhatsAppMessage = () => {
    const greeting = '🏎️ *SOLICITUD DE CITA - AUTOVISIÓN*';
    const lines = [
      greeting,
      'Hola Jesús Emiliano, me comunico desde tu tarjeta digital para agendar una cita:',
      '',
      `🔧 *Servicio:* ${currentService.title}`,
      `⚙️ *Modalidad del trabajo:* ${selectedWorkType || availableWorkTypes[0] || 'A convenir'}`,
      serviceLocation === 'domicilio'
        ? `🏠 *Lugar de atención:* SERVICIO A DOMICILIO (+ Costo extra de traslado)`
        : `🏢 *Lugar de atención:* En Taller AutoVisión (Guasave, Sinaloa)`,
      serviceLocation === 'domicilio' && homeAddress.trim()
        ? `📍 *Dirección / Referencia:* ${homeAddress.trim()}`
        : '',
      vehicle.trim() ? `🚗 *Vehículo / Modelo / Año:* ${vehicle.trim()}` : '',
      `📅 *Fecha solicitada:* ${getEffectiveDate()}`,
      `⏰ *Horario (rango de 1 hora):* ${preferredHourSlot}`,
      clientName.trim() ? `👤 *Cliente:* ${clientName.trim()}` : '',
      notes.trim() ? `💬 *Detalles o preguntas:* ${notes.trim()}` : '',
      '',
      '¿Tendrías disponibilidad para confirmarme el espacio y la cotización? ¡Gracias!'
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const message = buildWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${BUSINESS_DATA.whatsappClean}?text=${encoded}`;

    window.open(url, '_blank');
    onClose();
  };

  const handleFastDirectWhatsApp = () => {
    const directMessage = encodeURIComponent(
      `Hola Jesús Emiliano, quiero cotizar y agendar una cita para *${currentService.title}* (${selectedWorkType || 'Servicio'}). ¿Tienes disponibilidad?`
    );
    window.open(`https://wa.me/${BUSINESS_DATA.whatsappClean}?text=${directMessage}`, '_blank');
    onClose();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 27, stiffness: 320 }}
          className="relative w-full max-w-md max-h-[92vh] sm:max-h-[88vh] bg-slate-950 border-t sm:border border-cyan-500/50 sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.35)] z-10"
        >
          {/* Mobile grab handle */}
          <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

          {/* Close button */}
          <button
            onClick={() => {
                        onClose();
            }}
            type="button"
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-slate-800/80 bg-slate-900/50 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(37,211,102,0.3)] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3
                className="text-base sm:text-lg font-black uppercase text-white tracking-wide"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Agendar Cita en AutoVisión
              </h3>
              <p className="text-[11px] text-slate-400">
                Jesús Emiliano · Taller o a Domicilio · Guasave
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSendWhatsApp} className="overflow-y-auto p-4 space-y-4 flex-1">
            {/* STEP 1: Service Category Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                <span>1. Selecciona el Servicio:</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {SERVICES_LIST.map((srv) => {
                  const isSelected = srv.id === selectedServiceId;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => handleServiceChange(srv.id)}
                      className={`p-2 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="line-clamp-1">{srv.title}</span>
                      <span className="text-[9.5px] text-slate-400 font-normal mt-0.5">
                        {srv.badge}
                      </span>
                    </button>
                  );
                })}

                {/* 5th Option: All */}
                <button
                  type="button"
                  onClick={() => handleServiceChange('all')}
                  className={`p-2 rounded-xl text-left text-xs font-semibold border col-span-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedServiceId === 'all'
                      ? 'bg-fuchsia-950/80 border-fuchsia-400 text-fuchsia-200 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span>COTIZACIÓN GENERAL / VARIOS SERVICIOS</span>
                  <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-fuchsia-900/60 text-fuchsia-300">
                    Paquete Completo
                  </span>
                </button>
              </div>
            </div>

            {/* STEP 2: Coincident Specific Work Type (Suministro, Instalación, etc.) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-cyan-300 mb-1.5 flex items-center justify-between">
                <span>2. Tipo de Trabajo para {currentService.title}:</span>
                <span className="text-[9.5px] font-normal text-slate-400">Coincide con tu servicio</span>
              </label>
              <div className="space-y-1.5">
                {availableWorkTypes.map((work, idx) => {
                  const isChecked = selectedWorkType === work;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                                            setSelectedWorkType(work);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer flex items-center gap-2.5 ${
                        isChecked
                          ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-sm ring-1 ring-cyan-400/50'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'border-cyan-400 bg-cyan-500 text-black'
                            : 'border-slate-600 bg-slate-950'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="leading-snug">{work}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: Location - Taller vs Servicio a Domicilio con costo extra */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>3. Modalidad de Atención:</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                                    setServiceLocation('taller');
                  }}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    serviceLocation === 'taller'
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-xs text-white">En Taller</span>
                  </div>
                  <span className="text-[10px] text-slate-300">
                    Instalación en taller AutoVisión (Guasave)
                  </span>
                  <span className="text-[9.5px] mt-1 font-semibold text-emerald-400">
                    Sin costo adicional
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                                    setServiceLocation('domicilio');
                  }}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    serviceLocation === 'domicilio'
                      ? 'bg-amber-950/70 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs text-white">A Domicilio</span>
                  </div>
                  <span className="text-[10px] text-slate-300">
                    Vamos hasta tu casa, cochera o trabajo
                  </span>
                  <span className="text-[9.5px] mt-1 font-semibold text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> + Costo extra de traslado
                  </span>
                </button>
              </div>

              {/* Conditional address field if "A Domicilio" is selected */}
              {serviceLocation === 'domicilio' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/40"
                >
                  <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                    Dirección o Colonia de atención (Guasave y alrededores):
                  </label>
                  <input
                    type="text"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    placeholder="Ej. Col. Del Bosque, calle Nogales #340"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-500/50 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <p className="text-[9.5px] text-amber-400/90 mt-1">
                    * El costo adicional de viáticos y traslado se cotiza según tu ubicación exacta.
                  </p>
                </motion.div>
              )}
            </div>

            {/* STEP 4: Date selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>4. Día Deseado:</span>
              </label>

              {/* Quick day presets */}
              <div className="grid grid-cols-4 gap-1.5 mb-1.5">
                {['Hoy mismo', 'Mañana', 'Este Sábado', 'Lo antes posible'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                                        setDateMode('quick');
                      setQuickDay(d);
                    }}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-bold tracking-tight text-center border transition-all cursor-pointer ${
                      dateMode === 'quick' && quickDay === d
                        ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Specific Date Picker Option */}
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  min={todayStr}
                  value={customDate}
                  onChange={(e) => {
                    setCustomDate(e.target.value);
                    setDateMode('picker');
                  }}
                  className={`flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border text-xs focus:outline-none focus:border-cyan-400 ${
                    dateMode === 'picker' && customDate
                      ? 'border-cyan-400 text-cyan-200'
                      : 'border-slate-800 text-slate-400'
                  }`}
                />
                {dateMode === 'picker' && customDate && (
                  <span className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Fecha seleccionada
                  </span>
                )}
              </div>
            </div>

            {/* STEP 5: 1-Hour Difference Time Slots */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>5. Horario (Rango de 1 hora de diferencia):</span>
                </span>
                <span className="text-[9.5px] font-normal text-cyan-400 font-mono">1 hr máx</span>
              </label>

              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {ONE_HOUR_SLOTS.map((slot) => {
                  const isSlotSelected = preferredHourSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                                            setPreferredHourSlot(slot);
                      }}
                      className={`p-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                        isSlotSelected
                          ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-sm ring-1 ring-cyan-400'
                          : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 6: Vehicle & Client Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Auto / Modelo / Año</span>
                </label>
                <input
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="Ej. GMC Sierra 2024 / Honda Civic"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tu Nombre (opcional)</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej. Carlos Moreno"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                ¿Algún requerimiento especial o detalle adicional? (opcional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Quisiera saber si incluye arnés o si requiero comprar algo extra..."
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none"
              />
            </div>

            {/* Live Message Preview */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Mensaje que se enviará por WhatsApp:
                </span>
                {serviceLocation === 'domicilio' && (
                  <span className="text-[9.5px] text-amber-400 font-semibold">
                    🏠 Domicilio (+ Costo extra)
                  </span>
                )}
              </div>
              <p className="text-[10.5px] text-slate-300 font-mono whitespace-pre-wrap leading-tight bg-black/50 p-2 rounded-lg border border-slate-800">
                {buildWhatsAppMessage()}
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="pt-1 space-y-2">
              <button
                type="submit"
                className="w-full min-h-[48px] py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(37,211,102,0.45)] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer touch-manipulation"
              >
                <Send className="w-4 h-4" />
                <span>Confirmar y Enviar Cita a WhatsApp</span>
              </button>

              {/* Fast Direct WhatsApp Bypass Button */}
              <button
                type="button"
                onClick={handleFastDirectWhatsApp}
                className="w-full py-2 text-center text-[11px] text-slate-400 hover:text-emerald-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Preguntar directo por WhatsApp sin llenar formulario</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
