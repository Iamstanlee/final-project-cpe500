import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number, currency?: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency ?? 'NGN',
  }).format(amount / 100);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

export function generateRandomId() {
  const length = Math.floor(Math.random() * 3) + 7; // Generate a random number between 5 and 7
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdehklmnopqrstuvwxz0123456789';
  let result = '1'; // Start with the prefix 1

  for (let i = 0; i < length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {}
}

export function isProduction(): boolean {
  return !window.location.origin.includes('localhost');
}

export const deserialize = <T>(data: string | T): T => {
  try {
    return JSON.parse(data as string) as T;
  } catch (e) {
    return data as T;
  }
};

export const serialize = <T>(data: T): string => {
  return JSON.stringify(data);
};
