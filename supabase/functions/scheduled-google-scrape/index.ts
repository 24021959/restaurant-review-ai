
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
  // Client Postgres amministrativo per bypassare RLS
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } }
  );
  // 1. Trova tutte le business profile attive con id google associato
  const { data: profiles } = await supabase.from("business_profiles").select("*").not("google_business_id", "is", null);
  if (!profiles || profiles.length === 0) {
    console.log("Nessun profilo con id Google business");
    return new Response(JSON.stringify({ ok: true, msg: "Nessun profilo trovato" }), { headers: corsHeaders });
  }
  // 2. Per ognuno richiama lo scraping tramite funzione edge già esistente (puoi gestire le vere chiavi Google in future step)
  for (const prof of profiles) {
    try {
      // Simula scraping: nel reale chiameresti la funzione scraping vera!
      // const res = await fetch(...);
      // Qui aggiungeresti la logica di scraping vero
      // e di salvataggio recensioni + generazione risposta ai!
      console.log("Simulazione scraping per attività:", prof.business_name, prof.id);
      // Log scraping nel DB
      await supabase.from("scraping_logs").insert({
        business_profile_id: prof.id,
        status: "success",
        message: "Eseguito scraping simulato"
      });
    } catch (e) {
      await supabase.from("scraping_logs").insert({
        business_profile_id: prof.id,
        status: "failure",
        message: (e && e.message) || "Errore scraping"
      });
    }
  }
  return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders });
});
