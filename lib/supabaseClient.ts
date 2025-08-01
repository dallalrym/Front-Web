import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gwwkszjprallymbruuzj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3d2tzempwcmFsbHltYnJ1dXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTA4NDIsImV4cCI6MjA2ODE2Njg0Mn0.mJSo67BJ3SJJJd2r_ZNKwlXVfE14gwPBiuGYsJjnjVI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
