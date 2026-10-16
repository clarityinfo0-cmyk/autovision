export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  features: string[];
  specs: { label: string; value: string }[];
  whatsappMessage: string;
  accentColor: 'cyan' | 'magenta' | 'purple' | 'red';
}

export interface BookingFormData {
  serviceId: string;
  clientName: string;
  phone: string;
  vehicleModel: string;
  vehicleYear: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export const BUSINESS_DATA = {
  name: "Jesús Emiliano Espinoza Velázquez",
  company: "AutoVisión",
  tagline: "LED Y POLARIZADOS",
  whatsappNumber: "+52 687 367 5477",
  whatsappClean: "526873675477",
  location: "Guasave, Sinaloa, México",
  hours: "Lun - Sáb: 9:00 AM - 7:00 PM",
  instagram: "@autovision.led",
  facebook: "AutoVisión LED y Polarizados",
  specialties: [
    "Sistemas de Sonido y Car Audio Alta Gama",
    "Retrofit e Instalación de Luces LED y Proyectores",
    "Polarizados Nanocerámicos y Control Solar",
    "Accesorios Exclusivos y Modificaciones Interiores"
  ]
};
