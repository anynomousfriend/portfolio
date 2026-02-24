'use client';

import { useState, useEffect, useRef, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  anchorRef?: RefObject<HTMLButtonElement | null>;
}

export function ContactModal({ open, onClose, anchorRef }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Detect mobile on mount and resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Compute position from anchor button (desktop only)
  useEffect(() => {
    if (open && anchorRef?.current && !isMobile) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [open, anchorRef, isMobile]);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Reset form when opened
  useEffect(() => {
    if (open) {
      setName('');
      setEmail('');
      setMessage('');
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open]);

  // Notify robot when modal opens/closes — send modal rect so robot can stand at its corner
  useEffect(() => {
    if (open) {
      // Give the popover a tick to render and compute its position
      const t = setTimeout(() => {
        const rect = popoverRef.current?.getBoundingClientRect();
        window.dispatchEvent(new CustomEvent('robot:modal-open', {
          detail: rect ? { left: rect.left, bottom: rect.bottom } : null,
        }));
      }, 50);
      return () => clearTimeout(t);
    } else {
      window.dispatchEvent(new CustomEvent('robot:modal-close'));
    }
  }, [open]);

  // Close on Escape or click outside
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const onClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [onClose, anchorRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
      window.dispatchEvent(new CustomEvent('robot:celebrate'));
      setTimeout(() => onClose(), 2500);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!visible || (!pos && !isMobile) || !mounted) return null;

  const content = (
    <div className="p-6">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
      >
        <X className="size-3.5" />
      </button>

      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
          <style>{`
            @keyframes confetti-fly {
              0%   { opacity: 0; transform: scale(0) translate(0, 0); }
              30%  { opacity: 1; transform: scale(1) translate(var(--tx), var(--ty)); }
              100% { opacity: 0; transform: scale(0.8) translate(var(--tx), var(--ty)); }
            }
            @keyframes check-bounce {
              0%   { transform: scale(0); opacity: 0; }
              60%  { transform: scale(1.15); opacity: 1; }
              80%  { transform: scale(0.92); }
              100% { transform: scale(1); }
            }
            @keyframes shimmer {
              0%   { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
          `}</style>

          {/* Confetti burst */}
          <div className="relative flex items-center justify-center">
            {(['🎉','✨','🎊','💫','⭐','🌟','🎈','🪄'] as const).map((emoji, i) => {
              const angle = (i / 8) * 360;
              const rad = (angle * Math.PI) / 180;
              const dist = 48 + (i % 3) * 10;
              const tx = `${Math.round(Math.cos(rad) * dist)}px`;
              const ty = `${Math.round(Math.sin(rad) * dist)}px`;
              return (
                <span
                  key={i}
                  className="absolute text-lg pointer-events-none select-none"
                  style={{
                    '--tx': tx,
                    '--ty': ty,
                    animation: `confetti-fly 1.1s ease-out ${i * 0.07}s both`,
                  } as React.CSSProperties}
                >
                  {emoji}
                </span>
              );
            })}

            {/* Glow ring + checkmark */}
            <div
              className="relative size-16 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                boxShadow: '0 0 0 1px rgba(99,102,241,0.25), 0 0 20px 4px rgba(99,102,241,0.18)',
                animation: 'check-bounce 0.55s cubic-bezier(0.34,1.56,0.64,1) both',
              }}
            >
              <div className="size-14 rounded-full bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-emerald-400/30 flex items-center justify-center">
                <CheckCircle className="size-7 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold text-zinc-100 tracking-tight">You're all set! 🎉</p>
            <p className="text-zinc-400 text-sm">I'll reply within 24h — excited to connect!</p>
          </div>

          {/* Shimmering divider */}
          <div
            className="w-32 h-px rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #6366f1, #818cf8, #6366f1, transparent)',
              backgroundSize: '200% auto',
              animation: 'shimmer 2s linear infinite',
            }}
          />
        </div>
      ) : (
        <>
          <div className="mb-5">
            <h2 className="text-base font-bold text-zinc-100 tracking-tight">
              Let's work <span className="text-indigo-400">together</span>
            </h2>
            <p className="text-zinc-500 text-xs mt-0.5">Drop me a message — I'll reply within 24h.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); window.dispatchEvent(new CustomEvent('robot:input-typing')); }}
                  onFocus={() => window.dispatchEvent(new CustomEvent('robot:input-focus'))}
                  placeholder="John Doe"
                  required
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all w-full text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); window.dispatchEvent(new CustomEvent('robot:input-typing')); }}
                  onFocus={() => window.dispatchEvent(new CustomEvent('robot:input-focus'))}
                  placeholder="you@example.com"
                  required
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all w-full text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Message</label>
              <textarea
                value={message}
                onChange={e => { setMessage(e.target.value); window.dispatchEvent(new CustomEvent('robot:input-typing')); }}
                onFocus={() => window.dispatchEvent(new CustomEvent('robot:input-focus'))}
                placeholder="Tell me about your project..."
                required
                rows={4}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all w-full text-sm resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-xs">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg py-2.5 font-medium transition-all text-sm mt-1"
            >
              {status === 'loading' ? (
                <><Loader2 className="size-3.5 animate-spin" /> Sending...</>
              ) : (
                <><Send className="size-3.5" /> Send message</>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[99] backdrop-blur-sm bg-zinc-950/30 transition-all duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {isMobile ? (
        /* Mobile: bottom sheet */
        <div
          ref={popoverRef}
          className={cn(
            'fixed z-[101] bottom-0 left-0 right-0 bg-zinc-900/95 border-t border-zinc-800 rounded-t-2xl shadow-2xl backdrop-blur-xl transition-all duration-300',
            open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
          )}
        >
          {/* Top glow line */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-36 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-indigo-500/10 blur-xl rounded-full" />
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-zinc-700" />
          </div>
          {content}
        </div>
      ) : (
        /* Desktop: popover anchored to button */
        <div
          ref={popoverRef}
          style={{ top: pos!.top, right: pos!.right }}
          className={cn(
            'fixed z-[101] w-[380px] bg-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 origin-top-right',
            open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          )}
        >
          {/* Top glow line */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-36 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-indigo-500/10 blur-xl rounded-full" />
          {/* Arrow pointing up to button */}
          <div className="absolute -top-[6px] right-5 size-3 rotate-45 bg-zinc-900 border-l border-t border-zinc-800" />
          {content}
        </div>
      )}
    </>,
    document.body
  );
}
