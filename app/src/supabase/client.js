// src/supabase/client.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hazmlaizatcdpfozzsxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhem1sYWl6YXRjZHBmb3p6c3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MzU0MDksImV4cCI6MjA2MTQxMTQwOX0.6ZWNHnDDE_NCRuBMrEIH-zkE02OpwojRd_zsKqgx8_A';

export const supabase = createClient(supabaseUrl, supabaseKey);
