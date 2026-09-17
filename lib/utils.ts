import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatETB(amount: number | string | { toString(): string }): string {
  const numeric = typeof amount === 'number' ? amount : Number(amount.toString());
  if (isNaN(numeric)) return '0 ETB';
  return `${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(numeric)} ETB`;
}
