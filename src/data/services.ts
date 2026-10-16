import { ServiceItem } from '../types';

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'car-audio',
    title: 'CAR AUDIO / INSTALACIONES',
    subtitle: 'Sistemas de sonido de alta fidelidad',
    description: 'Sistemas de sonido de alta gama e instalacion profesional.',
    image: '/src/assets/images/service_car_audio_1792141695031.jpg',
    badge: 'ALTA FIDELIDAD',
    accentColor: 'magenta',
    features: [
      'Fabricación e integración de cajones acústicos a la medida',
      'Instalación y calibración de amplificadores digitales y DSP',
      'Sets de medios, tweeters y subwoofers de marcas líderes (Focal, JL Audio, Mosconi)',
      'Insonorización acústica profesional en puertas y cajuela para eliminar ruidos',
      'Cableado 100% cobre certificado y fusileras de protección para seguridad eléctrica'
    ],
    specs: [
      { label: 'Tiempo estimado', value: '4 - 8 horas' },
      { label: 'Garantía', value: '1 año en mano de obra' },
      { label: 'Marcas', value: 'JL Audio, Focal, Pioneer, Alpine' }
    ],
    whatsappMessage: 'Hola Jesús Emiliano, me interesa agendar una cita para cotizar o instalar un sistema de *CAR AUDIO* en mi vehículo.',
  },
  {
    id: 'luces-led',
    title: 'LUCES LED / INSTALACIONES',
    subtitle: 'Retrofit e iluminación de alto rendimiento',
    description: 'Iluminación premium y montaje especializado.',
    image: '/src/assets/images/service_led_lights_1792141696092.jpg',
    badge: 'LUZ LÁSER & BI-LED',
    accentColor: 'cyan',
    features: [
      'Cambio y actualización de focos LED Canbus sin testigo de error en tablero',
      'Instalación de lupas y proyectores Bi-LED / Láser de corte perfecto',
      'Tiras DRL dinámicas con luz diurna y direccionales secuenciales',
      'Iluminación interior ambiental oculta estilo Mercedes / Audi controlable por app',
      'Faros de niebla de penetración profunda para carretera y clima adverso'
    ],
    specs: [
      { label: 'Tiempo estimado', value: '2 - 5 horas' },
      { label: 'Garantía', value: '6 a 12 meses en iluminación' },
      { label: 'Potencia', value: 'Hasta 20,000 lúmenes reales' }
    ],
    whatsappMessage: 'Hola Jesús Emiliano, quiero agendar una cita para checar e instalar *LUCES LED / RETROFIT* en mi auto.',
  },
  {
    id: 'polarizados',
    title: 'POLARIZADOS / TINTING',
    subtitle: 'Nanocerámica y control térmico avanzado',
    description: 'Privacidad y protección térmica avanzadas.',
    image: '/src/assets/images/service_polarizado_tint_1792141696385.jpg',
    badge: '99% PROTECCIÓN UV',
    accentColor: 'cyan',
    features: [
      'Películas nanocerámicas de rechazo térmico extremo (hasta 88% calor infrarrojo)',
      '100% bloqueo de rayos UV perjudiciales que dañan piel e interiores',
      'Corte milimétrico especializado y termoformado sin burbujas',
      'Tonos legales y personalizados: 5% (Limo), 20% (Medio), 35% (Claro), 70% (Parabrisas térmico transparente)',
      'Visibilidad nocturna HD sin reflejos distorsionados'
    ],
    specs: [
      { label: 'Tiempo estimado', value: '2 - 3 horas' },
      { label: 'Garantía', value: '3 a 5 años anti-decoloración' },
      { label: 'Tecnología', value: 'Nano-Ceramic IR Rejection' }
    ],
    whatsappMessage: 'Hola Jesús Emiliano, me gustaría agendar una cita para polarizar mi vehículo con *PELÍCULA CERÁMICA / POLARIZADO*.',
  },
  {
    id: 'accesorios',
    title: 'VENTA DE ACCESORIOS',
    subtitle: 'Equipamiento y personalización exclusiva',
    description: 'Equipamiento exclusivo y personalización.',
    image: '/src/assets/images/service_car_accessories_1792141696343.jpg',
    badge: 'ESTILO & CONFORT',
    accentColor: 'magenta',
    features: [
      'Volantes en fibra de carbono real, forrados en piel perforada o alcántara',
      'Kits de pedales deportivos y pomos de palanca de cambios ergonómicos',
      'Fundas de llave de lujo, llaveros automotrices y aromatizantes premium',
      'Portacelulares magnéticos con carga inalámbrica rápida Qi',
      'Kits de cuidado automotriz: ceras cerámicas, microfibras y limpiadores'
    ],
    specs: [
      { label: 'Disponibilidad', value: 'Stock inmediato y bajo pedido' },
      { label: 'Instalación', value: 'Disponible en taller' },
      { label: 'Calidad', value: 'Materiales grado automotriz' }
    ],
    whatsappMessage: 'Hola Jesús Emiliano, me interesan varios *ACCESORIOS* y opciones de personalización para mi vehículo.',
  }
];
