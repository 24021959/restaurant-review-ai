
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Scraper dummy: placeholder, pronto per implementazione vera a chiavi inserite.
serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    // Qui in futuro userai la Google API! 
    // Per ora log e dummy
    const { restaurantId, businessProfileId, googleApiKey } = await req.json();

    console.log(
      "Tentativo scraping recensioni Google:",
      JSON.stringify({ restaurantId, businessProfileId, googleApiKey })
    );

    // Simula recensioni trovate
    return new Response(
      JSON.stringify({
        reviews: [],
        message: "Scraping placeholder: nessuna recensione trovata (collega API KEY per funzionamento reale)",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (err: any) {
    console.error("Errore scraping:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Errore generico scraping" }),
      { headers: corsHeaders, status: 500 }
    );
  }
});
