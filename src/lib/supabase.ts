import { createClient } from '@supabase/supabase-js';

// Get environment variables with proper validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || supabaseUrl === 'your-project-url' || !supabaseUrl.startsWith('https://')) {
  throw new Error(
    'Missing or invalid VITE_SUPABASE_URL. Please click "Connect to Supabase" button to set up your project.'
  );
}

if (!supabaseKey || supabaseKey === 'your-anon-key') {
  throw new Error(
    'Missing VITE_SUPABASE_ANON_KEY. Please click "Connect to Supabase" button to set up your project.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);