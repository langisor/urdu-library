import { Inter, Noto_Naskh_Arabic, Noto_Nastaliq_Urdu } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const naskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-naskh',
});

export const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-nastaliq',
});