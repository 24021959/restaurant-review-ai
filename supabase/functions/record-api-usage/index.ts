
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

    const { keyId, timestamp } = await req.json();

    // Registra l'utilizzo in una tabella di log
    const { error } = await supabaseClient
      .from('api_usage_logs')
      .insert({
        api_key_id: keyId,
        used_at: timestamp,
        request_type: 'google_business_api'
      });

    if (error) throw error;

    // Aggiorna il contatore di utilizzo della chiave
    const { error: updateError } = await supabaseClient
      .from('google_api_keys')
      .update({ 
        last_used_at: timestamp,
        total_requests: supabaseClient.sql`total_requests + 1`
      })
      .eq('id', keyId);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ success: true }),
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
