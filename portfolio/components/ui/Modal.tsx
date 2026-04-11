'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '@/types/ui.types';
import { classNameGenerator } from '@/lib/className';

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  className,
  header: _header,
  showCloseButton = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      previousFocusRef.current = document.activeElement as HTMLElement;
      const focusable = dialogRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    } else {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
  if (!open || !mounted) return null;

  return createPortal(
    <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500'
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={classNameGenerator(
          'relative z-10 w-full max-w-4xl rounded-2xl border border-deep-700/40 bg-deep-950 p-1 shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500 ease-out flex flex-col',
          className,
        )}>

        <div className='relative flex flex-col h-full max-h-[90vh] overflow-hidden rounded-xl bg-deep-950'>

          {showCloseButton && (
            <button
              type='button'
              aria-label='Close'
              onClick={onClose}
              className='absolute right-6 top-6 z-50 rounded-full p-3 bg-deep-900/80 text-deep-200 border border-deep-700/30 hover:bg-deep-600 hover:text-white transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-deep-400/40
            '>
              <span aria-hidden>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='group-hover:rotate-90 transition-transform duration-300'>
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
              </span>
            </button>
          )}

          {title && (
            <div className='px-8 pt-8 pb-6 sm:px-12 sm:pt-12 flex flex-col items-center text-center'>
              <h3 className='text-3xl sm:text-4xl font-black text-white tracking-tight'>
                {title}
              </h3>
              <div className='mt-4 h-[3px] w-16 rounded-full bg-deep-500' />
            </div>
          )}

          <div className='flex-1 overflow-y-auto px-8 pb-8 sm:px-12 sm:pb-12 custom-scrollbar'>
            {children}
          </div>

          {footer && (
            <div className='px-8 py-6 sm:px-12 sm:py-8 bg-deep-900/30 border-t border-deep-700/20'>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
