import React from 'react';

export type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  noPadding?: boolean;
  noMinHeight?: boolean;
  customMinHeight?: string;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
};

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  showCloseButton?: boolean;
};

export type ClassValue = string | false | null | undefined;
