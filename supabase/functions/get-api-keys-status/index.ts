
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;
    
    if (!user) throw new Error("User not authenticated");

    // Recupera tutte le chiavi attive dell'utente
    const { data: keys, error } = await supabaseClient
      .from('google_api_keys')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true);

    if (error) throw error;

    // Recupera statistiche di utilizzo da una tabella separata (da implementare)
    const keysWithStatus = keys.map((key: any) => {
      const dailyUsage = Math.floor(Math.random() * 8000); // Simulato per ora
      const minuteUsage = Math.floor(Math.random() * 50);
      
      return {
        id: key.id,
        key: atob(key.encrypted_key), // Decodifica (implementare decryption reale)
        dailyUsage,
        dailyLimit: 10000,
        minuteUsage,
        minuteLimit: 100,
        isActive: key.is_active,
        lastUsed: new Date(key.updated_at)
      };
    });

    const allKeysOverLimit = keysWithStatus.every(key => 
      key.dailyUsage >= key.dailyLimit || key.minuteUsage >= key.minuteLimit
    );

    return new Response(
      JSON.stringify({ 
        keys: keysWithStatus,
        allKeysOverLimit 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    );
  }
});
