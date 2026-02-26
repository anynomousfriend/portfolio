'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Animate in/out
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Notify robot when modal opens/closes so it peeks at the corner
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        const rect = modalRef.current?.getBoundingClientRect();
        window.dispatchEvent(new CustomEvent('robot:modal-open', {
          detail: rect ? { left: rect.left, bottom: rect.bottom } : null,
        }));
      }, 50);
      return () => clearTimeout(t);
    } else {
      window.dispatchEvent(new CustomEvent('robot:modal-close'));
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!visible || !mounted) return null;

  const RESUME_PATH = '/Subhankar_Choudhury_Resume.pdf';

  const content = (
    <div ref={modalRef} className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-bold text-zinc-100 tracking-tight">
            Subhankar&apos;s <span className="text-indigo-400">Résumé</span>
          </h2>
          <p className="text-[10px] text-zinc-500 font-mono">Blockchain & Full-Stack Engineer</p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Fullscreen */}
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 border border-zinc-700 hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-indigo-500/5 transition-all"
          >
            <Maximize2 className="size-3" />
            {!isMobile && 'Fullscreen'}
          </a>

          {/* Download */}
          <a
            href={RESUME_PATH}
            download="Subhankar_Choudhury_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-all"
          >
            <Download className="size-3" />
            {!isMobile && 'Download'}
          </a>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-all ml-1"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 min-h-0 bg-zinc-950 relative">
        <iframe
          src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
          className="w-full h-full border-0"
          title="Subhankar Choudhury Resume"
        />
      </div>
    </div>
  );

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[99] backdrop-blur-sm bg-zinc-950/60 transition-all duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={handleBackdropClick}
      />

      {isMobile ? (
        /* Mobile: tall bottom sheet */
        <div
          className={cn(
            'fixed z-[101] bottom-0 left-0 right-0 h-[90vh] bg-zinc-900/95 border-t border-zinc-800 rounded-t-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col',
            open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
          )}
        >
          {/* Top glow line */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-36 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-indigo-500/10 blur-xl rounded-full" />
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-zinc-700" />
          </div>
          {content}
        </div>
      ) : (
        /* Desktop: centered large modal */
        <div
          className={cn(
            'fixed z-[101] inset-0 flex items-center justify-center p-8 pointer-events-none'
          )}
        >
          <div
            className={cn(
              'relative w-full max-w-3xl h-[85vh] bg-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 origin-center flex flex-col pointer-events-auto overflow-hidden',
              open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            )}
          >
            {/* Top glow line */}
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-36 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-indigo-500/10 blur-xl rounded-full" />
            {content}
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
