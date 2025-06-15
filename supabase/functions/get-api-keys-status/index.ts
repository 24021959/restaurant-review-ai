
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

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      throw new Error('Unauthorized');
    }

    // Ottieni tutte le chiavi dell'utente
    const { data: apiKeys } = await supabaseClient
      .from('google_api_keys')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true);

    if (!apiKeys || apiKeys.length === 0) {
      return new Response(
        JSON.stringify({ 
          keys: [], 
          allKeysOverLimit: true,
          message: 'Nessuna chiave API configurata'
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Calcola l'utilizzo per oggi
    const today = new Date().toISOString().split('T')[0];
    
    const keysWithUsage = await Promise.all(
      apiKeys.map(async (key) => {
        // Conta le richieste di oggi
        const { count: dailyUsage } = await supabaseClient
          .from('api_usage_logs')
          .select('*', { count: 'exact', head: true })
          .eq('api_key_id', key.id)
          .gte('used_at', `${today}T00:00:00.000Z`)
          .lte('used_at', `${today}T23:59:59.999Z`);

        // Conta le richieste dell'ultimo minuto
        const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
        const { count: minuteUsage } = await supabaseClient
          .from('api_usage_logs')
          .select('*', { count: 'exact', head: true })
          .eq('api_key_id', key.id)
          .gte('used_at', oneMinuteAgo);

        return {
          id: key.id,
          key: key.encrypted_key,
          dailyUsage: dailyUsage || 0,
          dailyLimit: key.daily_limit || 10000,
          minuteUsage: minuteUsage || 0,
          minuteLimit: 100, // Limite per minuto
          isActive: key.is_active,
          lastUsed: key.last_used_at ? new Date(key.last_used_at) : new Date()
        };
      })
    );

    const allKeysOverLimit = keysWithUsage.every(key => 
      key.dailyUsage >= key.dailyLimit || key.minuteUsage >= key.minuteLimit
    );

    return new Response(
      JSON.stringify({ 
        keys: keysWithUsage, 
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
