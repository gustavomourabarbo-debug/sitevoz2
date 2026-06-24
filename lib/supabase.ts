import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null as any;

export type News = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string;
  featured_image: string | null;
  author: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Interview = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  guest_name: string;
  guest_role: string | null;
  video_url: string | null;
  featured_image: string | null;
  duration: string | null;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

