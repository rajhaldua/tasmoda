import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hekbihljgwridkrvcggg.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhla2JpaGxqZ3dyaWRrcnZjZ2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MjA4OTUsImV4cCI6MjEwODA5Njg5NX0.jXWm8ey7vwjvqNNDuAfXqqN9WBcj2txN6Bk4SDSTiME';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
