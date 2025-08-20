import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

// Debug logging
console.log('Environment variables:', {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  REACT_APP_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY,
  finalUrl: supabaseUrl,
  finalKey: supabaseAnonKey ? '***' : 'undefined'
});

if (!supabaseUrl) {
  console.error('❌ Supabase URL is missing! Please check your .env.local file.');
  throw new Error('Supabase URL is required. Please add NEXT_PUBLIC_SUPABASE_URL to your .env.local file.');
}

if (!supabaseAnonKey) {
  console.error('❌ Supabase anon key is missing! Please check your .env.local file.');
  throw new Error('Supabase anon key is required. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


