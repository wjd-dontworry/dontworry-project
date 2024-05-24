import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';

const supabaseUrl = 'https://nhziferisiizblgofydt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oemlmZXJpc2lpemJsZ29meWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxODY1OTgsImV4cCI6MjAzMTc2MjU5OH0.WF9-64uSRcAuFJTpjtVnULBpb3YjjG7vfODeNubHfLo';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
