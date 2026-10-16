import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import QRCode from 'qrcode';
import { X, Copy, Check, Share2, Download, QrCode, Phone, Sparkles } from 'lucide-react';
import { BUSINESS_DATA } from '../types';
import { downloadVCard } from '../utils/vcard';
import { soundManager } from '../utils/audio';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const [qrType, setQrType] = useState<'card' | 'whatsapp'>('card');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const cardUrl = typeof window !== 'undefined' ? window.location.href : 'https://autovision.digital';
  const whatsappUrl = `https://wa.me/${BUSINESS_DATA.whatsappClean}?text=${encodeURIComponent(
    'Hola Jesús Emiliano, escaneé tu código QR y me pongo en contacto desde tu tarjeta digital AutoVisión.'
  )}`;

  const activeUrl = qrType === 'card' ? cardUrl : whatsappUrl;

  useEffect(() => {
    if (!isOpen) return;

    // Generate high resolution QR Code with dark background & crisp contrast
    QRCode.toDataURL(activeUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: '#030712',
        light: '#22d3ee' // Neon Cyan light module
      },
      errorCorrectionLevel: 'H'
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('QR Generation Error:', err);
      });
  }, [isOpen, activeUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    soundManager.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AutoVisión - Jesús Emiliano Espinoza Velázquez',
          text: 'Tarjeta digital de AutoVisión LED y Polarizados en Guasave, Sinaloa. Car Audio, Luces LED y Polarizados.',
          url: cardUrl
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch {
        // user cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const handleDownloadContact = () => {
    soundManager.playClick();
    downloadVCard();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-sm rounded-3xl bg-slate-950 border border-cyan-500/50 p-6 flex flex-col items-center shadow-[0_0_40px_rgba(6,182,212,0.35)] z-10"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-4">
            <div className="p-2 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-400 mb-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <QrCode className="w-6 h-6" />
            </div>
            <h3
              className="text-lg font-black uppercase text-white tracking-wide"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Escanear Tarjeta Digital
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Apunta la cámara de cualquier celular iPhone o Android
            </p>
          </div>

          {/* Toggle Type */}
          <div className="w-full flex rounded-xl bg-slate-900 p-1 border border-slate-800 mb-4">
            <button
              onClick={() => {
                soundManager.playClick();
                setQrType('card');
              }}
              type="button"
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                qrType === 'card'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ver Tarjeta Web
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setQrType('whatsapp');
              }}
              type="button"
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                qrType === 'whatsapp'
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Abrir WhatsApp
            </button>
          </div>

          {/* QR Code Container with Neon Frame */}
          <div className="relative p-3 rounded-2xl bg-black border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Código QR AutoVisión"
                className="w-48 h-48 rounded-lg object-contain"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-xs text-cyan-400">
                Generando código QR...
              </div>
            )}

            {/* Center Logo Badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-cyan-400 flex items-center justify-center shadow-lg p-1">
                <span className="text-[10px] font-black text-cyan-300 italic tracking-tighter">
                  AV
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details summary */}
          <div className="mt-3 text-center">
            <p className="text-xs font-bold text-white tracking-wide">
              {BUSINESS_DATA.name}
            </p>
            <p className="text-[11px] text-cyan-400 font-mono">
              {BUSINESS_DATA.whatsappNumber}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-2 gap-2 mt-4">
            {/* Save to contacts (.vcf) */}
            <button
              onClick={handleDownloadContact}
              type="button"
              className="min-h-[42px] py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer touch-manipulation"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Guardar Contacto</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopy}
              type="button"
              className="min-h-[42px] py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer touch-manipulation"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>

          {/* Web Share API */}
          <button
            onClick={handleShare}
            type="button"
            className="w-full min-h-[40px] mt-2 py-2 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer touch-manipulation"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{shareSuccess ? '¡Compartido!' : 'Compartir con un Amigo'}</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
