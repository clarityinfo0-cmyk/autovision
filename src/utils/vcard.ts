import { BUSINESS_DATA } from '../types';

export function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Espinoza Velázquez;Jesús Emiliano;;;
FN:Jesús Emiliano Espinoza Velázquez
ORG:${BUSINESS_DATA.company} - ${BUSINESS_DATA.tagline}
TITLE:Especialista en Car Audio, Luces LED y Polarizados
TEL;TYPE=CELL,VOICE,WHATSAPP:${BUSINESS_DATA.whatsappNumber}
ADR;TYPE=WORK:;;${BUSINESS_DATA.location};;;;
NOTE:AutoVisión - Car Audio, Luces LED & Láser, Polarizados Nanocerámicos y Accesorios Exclusivos.
URL:${window.location.href}
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Jesus_Emiliano_AutoVision.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
